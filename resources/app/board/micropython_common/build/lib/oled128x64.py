"""
Matrix Displays

Micropython library for the TM1680 Matrix Displays
=======================================================

#Preliminary composition                          20211120

dahanzimin From the Mixly Team
"""

import time
import uincode_font,image_bmp
from ssd1106 import SSD1106_I2C
from framebuf import FrameBuffer

class OLED(SSD1106_I2C):
    """A single matrix."""
    def __init__(self, i2c, width=128, height=64,  address=0x3c, font_address=0x3A0000):
        super().__init__(width, height, i2c, address)
        self._font= uincode_font.Font_B(font_address)
        self._image= image_bmp.Image()
        self._columns = width
        self._rows = height

    def __getitem__(self, key):
        x, y = key
        return self.pixel(x, y)

    def __setitem__(self, key, value):
        x, y = key
        self.pixel(x, y, value)

    def shift(self, x, y, rotate=False):
        """Shift pixels by x and y"""
        if x > 0:  # Shift Right
            for _ in range(x):
                for row in range(0, self.rows):
                    last_pixel = self[self.columns - 1, row] if rotate else 0
                    for col in range(self.columns - 1, 0, -1):
                        self[col, row] = self[col - 1, row]
                    self[0, row] = last_pixel
        elif x < 0:  # Shift Left
            for _ in range(-x):
                for row in range(0, self.rows):
                    last_pixel = self[0, row] if rotate else 0
                    for col in range(0, self.columns - 1):
                        self[col, row] = self[col + 1, row]
                    self[self.columns - 1, row] = last_pixel
        if y > 0:  # Shift Up
            for _ in range(y):
                for col in range(0, self.columns):
                    last_pixel = self[col, self.rows - 1] if rotate else 0
                    for row in range(self.rows - 1, 0, -1):
                        self[col, row] = self[col, row - 1]
                    self[col, 0] = last_pixel
        elif y < 0:  # Shift Down
            for _ in range(-y):
                for col in range(0, self.columns):
                    last_pixel = self[col, 0] if rotate else 0
                    for row in range(0, self.rows - 1):
                        self[col, row] = self[col, row + 1]
                    self[col, self.rows - 1] = last_pixel
        self.show()            

    def shift_right(self,num, rotate=False):
        """Shift all pixels right"""
        self.shift(num, 0, rotate)

    def shift_left(self,num, rotate=False):
        """Shift all pixels left"""
        self.shift(-num, 0, rotate)

    def shift_up(self,num, rotate=False):
        """Shift all pixels up"""
        self.shift(0, -num, rotate)

    def shift_down(self,num, rotate=False):
        """Shift all pixels down"""
        self.shift(0, num, rotate)

    def image(self, path, x=0, y=0,  size=1, invert=0):
        """Set buffer to value of Python Imaging Library image"""
        size=max(round(size),1)
        if type(path) ==str :
            buffer_info,(width, height) = self._image.load(path,invert) 
        elif type(path) ==bytes:
            buffer_info,(width, height) =  self._image.load_py(path,invert)
        else:
            raise ValueError("invalid input")
            
        if width > self.columns or height > self.rows:
            raise ValueError("Image must be less than display ({0}x{1}).".format(self.columns, self.rows))
        self.bitmap((buffer_info,(width, height)), x, y, size)    
        self.show()

    def bitmap(self,buffer, x=0, y=0,size=1):
        """Graphic model display(buffer,(width,height))"""    
        buffer_info,(width,height)=buffer    
        if x < -width*size or x >= self.columns or y < -height*size or y >= self.rows:        
            return            #Limit reasonable display area    
        byteWidth = int((width + 7) / 8)
        for j in range(height):
            for i in range(width):
                if buffer_info[int(j * byteWidth + i / 8)] & (0x80 >> (i & 7)):
                    self.fill_rect(x+i*size, y+j*size, size, size, 1)

    def map_invert(self,own):
        """Graph invert operation"""
        if type(own) in [list,bytes,tuple,bytearray]:
            result=bytearray()
            for i in range(len(own)):
                result.append(~own[i])
            return result
        else:
            raise ValueError("This graphic operation is not supported")

    def map_add(self,own,other):
        """Graph union operation"""
        if type(own) in [list,bytes,tuple,bytearray] and type(other) in [list,bytes,tuple,bytearray]:
            result=bytearray()
            for i in range(min(len(own),len(other))):
                result.append(own[i]|other[i])
            return result
        else:
            raise ValueError("This graphic operation is not supported")

    def map_sub(self,own,other):
        """Graphic subtraction operation"""
        if type(own) in [list,bytes,tuple,bytearray] and type(other) in [list,bytes,tuple,bytearray]:
            result=bytearray()
            for i in range(min(len(own),len(other))):
                result.append((own[i] ^ other[i]) & own[i])
            return result
        else:
            raise ValueError("This graphic operation is not supported")

    def _take_buffer(self,strs,space,size=1):
        '''Get character lattice information first'''
        font_buffer=[]
        font_len=0
        for c in strs:                    
            buffer=self._font.CharData(c)
            font_buffer.append(buffer)
            font_len=font_len+buffer[1][0]*size+space
        return font_len,font_buffer

    def shows(self,data,x=0,y=0,size=1,space=0,center=False):
        """Display character"""
        if data:
            if type(data) in [list,bytes,tuple,bytearray]:
                self.fill(0)
                self.set_buffer(data)
                self.show()    
            else:
                size=max(round(size),1)
                font_len,font_buffer=self._take_buffer(str(data),space,size)
                x=(self.columns-font_len+space)//2 if center else x
                self.fill_rect(x-1,y-1,font_len+2,font_buffer[0][1][1]*size+2,0)
                for buffer in font_buffer:    #Display character
                    self.bitmap(buffer,x,y,size)
                    x=buffer[1][0]*size+x+space
                self.show()

    def frame(self, data, delay=500, size=5):
        """Display one frame per character"""
        if data:
            if type(data) in [list,tuple]:
                for dat in data:
                    if type(dat) in [list,bytes,tuple,bytearray]:
                        self.fill(0)
                        self.set_buffer(dat)
                        self.show()    
                        time.sleep_ms(delay)
            else:
                size=max(round(size),1)
                _,font_buffer=self._take_buffer(str(data),0)
                for buffer in font_buffer:
                    x=(self.columns - buffer[1][0]*size)//2 
                    y=(self.rows - buffer[1][1]*size)//2 
                    self.fill_rect(x-1,y-1,buffer[1][0]*size+2,buffer[1][1]*size+2,0)
                    self.bitmap(buffer,x,y,size=size)
                    self.show()
                    time.sleep_ms(delay) 

    def scroll(self, data, y=0, size=1, space=0, speed=5):
        """Scrolling characters"""
        if data:
            size=max(round(size),1)
            font_len,font_buffer=self._take_buffer(str(data),space,size)
            for i in range(font_len-space+self.columns):    
                x=-i+self.columns
                self.fill_rect(x-1,y-1,self.columns-x+2,font_buffer[0][1][1]*size+2,0)
                for buffer in font_buffer:
                    self.bitmap(buffer,x,y,size)
                    x=buffer[1][0]*size+x+space
                self.show() 
                time.sleep_ms(speed)

    @property
    def columns(self):
        """Read-only property for number of columns"""
        return self._columns

    @property
    def rows(self):
        """Read-only property for number of rows"""
        return self._rows

    """Graph module"""
