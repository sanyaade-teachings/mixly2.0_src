"""
Matrix Displays

Micropython library for the TM1680 Matrix Displays
=======================================================

#Preliminary composition      					20211120
#Add word positive and negative display  		20211216
#Repair and keep tm1680 consistent   			20220224
#Fix character display				   			20220307
#Format unified									20220623

dahanzimin From the Mixly Team
"""

from tm1680 import TM1680
import uincode_font
import time

class Matrix(TM1680):
	"""A single matrix."""
	_columns = 32
	_rows = 12

	def __init__(self, i2c, font_address=0x3A0000, address=0x72, brightness=0.3):
		super().__init__(i2c, address, brightness)
		self._font= uincode_font.Font_B(font_address)

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

	def image(self, img):
		"""Set buffer to value of Python Imaging Library image"""
		imwidth, imheight = img.size
		if imwidth != self.columns or imheight != self.rows:
			raise ValueError("Image must be same dimensions as display ({0}x{1}).".format(self.columns, self.rows))
		pixels = img.convert("1").load()
		for x in range(self.columns):  # yes this double loop is slow,
			for y in range(self.rows):  #  but these displays are small!
				self.pixel(x, y, pixels[(x, y)])

	def bitmap(self,buffer, x=0, y=0):
		"""Graphic model display(buffer,(width,height))"""	
		buffer_info,(width,height)=buffer	
		if x < -width or x >= self.columns or y < -height or y >= self.rows:		
			return			#Limit reasonable display area		
		width_Byte=width//8+1	
		for k in range(height):
			for j in range(width_Byte):
				for i in range(8):
					asc = buffer_info[k * width_Byte + j]
					if asc>>(7-i) & 0x01:
						self.pixel(i+j*8+x,k+y,1)

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

	def _take_buffer(self,strs,space):
		'''Get character lattice information first'''
		font_buffer=[]
		font_len=0
		for c in strs:					
			buffer=self._font.CharData(c)
			font_buffer.append(buffer)
			font_len=font_len+buffer[1][0]+space
		return font_len,font_buffer

	def shows(self,data,space=-1,center=True):
		"""Display character"""
		self.fill(0)
		if type(data) in [list,bytes,tuple,bytearray]:
			self.set_buffer(data)
			self.show()	
		else:
			font_len,font_buffer=self._take_buffer(str(data),space)
			x=(self.columns-font_len+space)//2 if center else 0
			for buffer in font_buffer:	#Display character
				self.bitmap(buffer,x)
				x=buffer[1][0]+x+space
			self.show()
		
	def frame(self,data,delay=500):
		"""Display one frame per character"""
		if type(data) in [list,tuple]:
			for dat in data:
				if type(dat) in [list,bytes,tuple,bytearray]:
					self.fill(0)
					self.set_buffer(dat)
					self.show()	
					time.sleep_ms(delay)
		else:
			_,font_buffer=self._take_buffer(str(data),0)
			for buffer in font_buffer:
				self.fill(0)
				x=(self.columns - buffer[1][0])//2 
				self.bitmap(buffer,x)
				self.show()
				time.sleep_ms(delay) 

	def scroll(self,data,space=0,speed=50):
		"""Scrolling characters"""
		font_len,font_buffer=self._take_buffer(str(data),space)
		for i in range(font_len-space+self.columns):	
			x=-i+self.columns
			self.fill(0)
			for buffer in font_buffer:
				self.bitmap(buffer,x)
				x=buffer[1][0]+x+space
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
	HEART_SMALL=b'\x00\x00\x00\x00\x00\x00\x00\x00\x00 \x02\x00\x00p\x07\x00\x00\xf8\x0f\x00\x00\xf8\x0f\x00\x00\xf0\x07\x00\x00\xe0\x03\x00\x00\xc0\x01\x00\x00\x80\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
	HEART=b'\x00\x00\x00\x00\x00 \x02\x00\x00p\x07\x00\x00\xf8\x0f\x00\x00\xfc\x1f\x00\x00\xfc\x1f\x00\x00\xf8\x0f\x00\x00\xf0\x07\x00\x00\xe0\x03\x00\x00\xc0\x01\x00\x00\x80\x00\x00\x00\x00\x00\x00'
	HAPPY=b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x07\xe0\x00\x00\x07\xe0\x00\x00\x07\xe0\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\x08\x00\x00 \x04\x00\x00@\x02\x00\x00\x80\x01\x00\x00\x00\x00\x00'
	SAD=b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x1cx\x00\x00\x02\x80\x00\x00\x01\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\x01\x00\x00@\x02\x00\x00 \x04\x00\x00\x10\x08\x00\x00\x00\x00\x00'
	SMILE=b'\x00\x00\x00\x00\xe0\x03\xc0\x070\x06`\x0c\x98\x0c0\x19\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x03\xc0\x00\x00\x0ep\x00\x008\x1c\x00\x00\xe0\x07\x00\x00\x00\x00\x00'
	SILLY=b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x06`\x00\x00\t\x90\x00\x00\x06`\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe0\x07\x00\x00 \x04\x00\x00@\x02\x00\x00\x80\x01\x00\x00\x00\x00\x00'
	FABULOUS=b'\x00\x00\x00\x00\x80\x07\xe0\x01@\x08\x10\x02\xc0\x0f\xf0\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00\xf8\x1f\x00\x00\x08\x10\x00\x00\x08\x10\x00\x00\x10\x08\x00\x00\xe0\x07\x00\x00\x00\x00\x00'
	SURPRISED=b'\x00\x80\x01\x00\x00\x80\x01\x00\x00\x80\x01\x00\x00\x80\x01\x00\x00\x80\x01\x00\x00\x80\x01\x00\x00\x80\x01\x00\x00\x80\x01\x00\x00\x00\x00\x00\x00\x80\x01\x00\x00\x80\x01\x00\x00\x00\x00\x00'
	ASLEEP=b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\x0f\xf0\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe0\x07\x00\x00\x10\x08\x00\x00\xe0\x07\x00\x00\x00\x00\x00'
	ANGRY=b'\x00\x00\x00\x00\x80 \x04\x01\x00\x11\x88\x00\x00\nP\x00\x00\x04 \x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\x01\x00\x00@\x02\x00\x00 \x04\x00\x00\x10\x08\x00\x00\x08\x10\x00'
	CONFUSED=b'\x00\xc0\x03\x00\x00`\x06\x00\x000\x0c\x00\x000\x0c\x00\x00\x00\x0c\x00\x00\x00\x06\x00\x00\x00\x03\x00\x00\x80\x01\x00\x00\x80\x01\x00\x00\x00\x00\x00\x00\x80\x01\x00\x00\x80\x01\x00'
	NO=b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\x08\x00\x00 \x04\x00\x00@\x02\x00\x00\x80\x01\x00\x00\x80\x01\x00\x00@\x02\x00\x00 \x04\x00\x00\x10\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00'
	YES=b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xc0\x00\x00\x00`\x00\x00\x000\x00\x00\x00\x18\x00\x000\x0c\x00\x00`\x06\x00\x00\xc0\x03\x00\x00\x80\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00'
