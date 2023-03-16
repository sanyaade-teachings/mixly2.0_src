"""
Matrix8x5 Displays

Micropython library for the TM1652 Matrix8x5 Displays
=======================================================

#Preliminary composition      					                20220618
#字库格式:2字节字宽和高，后逐列式，按满字节低位在前 			20220618
#加入字体选择(自动横竖屏)或者外部输入字库		                20220619
#Format unified													20220623

dahanzimin From the Mixly Team
"""

import time
import machine
from tm1652 import TM1652

font4x5_code=b'\x04\x05\x00\x00\x00\x00\x00\x17\x00\x00\x03\x00\x03\x00\x1f\n\x1f\x00\x16\x1f\x1a\x00\x19\x04\x13\x00\n\x15\x1a\x00\x00\x01\x03\x00\x00\x0e\x11\x00\x11\x0e\x00\x00\x15\x0e\x15\x00\x04\x0e\x04\x00\x00\x08\x18\x00\x04\x04\x04\x00\x18\x18\x00\x00\x18\x04\x03\x00\x1f\x11\x1f\x00\x12\x1f\x10\x00\x1d\x15\x17\x00\x15\x15\x1f\x00\x07\x04\x1f\x00\x17\x15\x1d\x00\x1f\x15\x1d\x00\x01\x01\x1f\x00\x1f\x15\x1f\x00\x17\x15\x1f\x00\x1b\x1b\x00\x00\x00\x0b\x1b\x00\x04\n\x11\x00\n\n\n\x00\x11\n\x04\x00\x01\x15\x07\x00\x0e\x15\x16\x00\x1e\x05\x1e\x00\x1f\x15\n\x00\x0e\x11\x11\x00\x1f\x11\x0e\x00\x1f\x15\x15\x00\x1f\x05\x05\x00\x0e\x15\x1d\x00\x1f\x04\x1f\x00\x11\x1f\x11\x00\x08\x11\x0f\x00\x1f\x0c\x12\x00\x1f\x10\x10\x00\x1f\x02\x1f\x00\x1e\x04\x0f\x00\x0e\x11\x0e\x00\x1f\x05\x02\x00\x0e\x19\x1e\x00\x1f\t\x16\x00\x12\x15\t\x00\x01\x1f\x01\x00\x1f\x10\x1f\x00\x0f\x10\x0f\x00\x1f\x08\x1f\x00\x1b\x04\x1b\x00\x07\x1c\x07\x00\x19\x15\x13\x00\x00\x1f\x11\x00\x03\x0c\x10\x00\x11\x1f\x00\x00\x02\x01\x02\x00\x10\x10\x10\x00\x00\x03\x02\x00\n\x16\x1e\x00\x1f\x14\x08\x00\x0c\x12\x12\x00\x08\x14\x1f\x00\x0c\x1a\x14\x00\x04\x1e\x05\x00\x14\x1a\x1e\x00\x1f\x04\x18\x00\x00\x1d\x00\x00\x10\x1d\x00\x00\x1e\x08\x14\x00\x00\x1e\x00\x00\x1e\x04\x1e\x00\x1e\x02\x1e\x00\x0c\x12\x0c\x00\x1e\n\x04\x00\x04\n\x1e\x00\x1e\x04\x02\x00\x12\x15\t\x00\x04\x1e\x14\x00\x1e\x10\x1e\x00\x0e\x10\x0e\x00\x1e\x08\x1e\x00\x12\x0c\x12\x00\x16\x18\x0e\x00\x19\x15\x13\x00\x04\x1f\x11\x00\x00\x1f\x00\x00\x11\x1f\x04\x00\x02\x06\x04\x00\x15\n\x15\x00'
font5x8_code=b'\x05\x08\x00\x00\x00\x00\x00\x00\x00_\x00\x00\x00\x07\x00\x07\x00\x14\x7f\x14\x7f\x14$*\x7f*\x12#\x13\x08db6IV P\x00\x08\x07\x03\x00\x00\x1c"A\x00\x00A"\x1c\x00*\x1c\x7f\x1c*\x08\x08>\x08\x08\x00\x80p0\x00\x08\x08\x08\x08\x08\x00\x00``\x00 \x10\x08\x04\x02>QIE>\x00B\x7f@\x00rIIIF!AIM3\x18\x14\x12\x7f\x10\'EEE9<JII1A!\x11\t\x076III6FII)\x1e\x00\x00\x14\x00\x00\x00@4\x00\x00\x00\x08\x14"A\x14\x14\x14\x14\x14\x00A"\x14\x08\x02\x01Y\t\x06>A]YN|\x12\x11\x12|\x7fIII6>AAA"\x7fAAA>\x7fIIIA\x7f\t\t\t\x01>AAQs\x7f\x08\x08\x08\x7f\x00A\x7fA\x00 @A?\x01\x7f\x08\x14"A\x7f@@@@\x7f\x02\x1c\x02\x7f\x7f\x04\x08\x10\x7f>AAA>\x7f\t\t\t\x06>AQ!^\x7f\t\x19)F&III2\x03\x01\x7f\x01\x03?@@@?\x1f @ \x1f?@8@?c\x14\x08\x14c\x03\x04x\x04\x03aYIMC\x00\x7fAAA\x02\x04\x08\x10 \x00AAA\x7f\x04\x02\x01\x02\x04@@@@@\x00\x03\x07\x08\x00 TTx@\x7f(DD88DDD(8DD(\x7f8TTT\x18\x00\x08~\t\x02\x18\xa4\xa4\x9cx\x7f\x08\x04\x04x\x00D}@\x00 @@=\x00\x7f\x10(D\x00\x00A\x7f@\x00|\x04x\x04x|\x08\x04\x04x8DDD8\xfc\x18$$\x18\x18$$\x18\xfc|\x08\x04\x04\x08HTTT$\x04\x04?D$<@@ |\x1c @ \x1c<@0@<D(\x10(DL\x90\x90\x90|DdTLD\x00\x086A\x00\x00\x00w\x00\x00\x00A6\x08\x00\x02\x01\x02\x04\x02<&#&<'

class BitmapFont:
	'''Ascall code font reading data'''
	def __init__(self,font_code):
		self._font_code=font_code
		self.font_width, self.font_height = font_code[0],font_code[1]

	def chardata(self, ch):
		if  0x20 <= ord(ch) <=0x7f:
			char_index= 2 + (ord(ch)-32) * self.font_width 
			buffer=self._font_code[char_index : char_index + self.font_width]
			return buffer,(self.font_width, self.font_height)
		else:
			return None,(self.font_width, self.font_height)

class Matrix(TM1652):
	"""A single matrix."""
	_columns = 8
	_rows = 5
	_font=BitmapFont(font4x5_code)

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

	def font(self,font):
		"""Font selection or externally defined font code"""
		if type(font) in [list,bytes,tuple,bytearray]:
			self._font=BitmapFont(font)
		elif font==1:
			self._font=BitmapFont(font4x5_code)
		elif font==2:
			self._font=BitmapFont(font5x8_code)
		else:
			raise ValueError("This font selection is not supported")

	def bitmap(self,buffer, x=0, y=0):
		"""Graphic model display(buffer,(width,height))"""	
		buffer_info,(width,height)=buffer
		if x < -width or x >= self.columns or y < -height or y >= self.rows:		
			return			#Limit reasonable display area
		for char_x in range(width):
			for char_y in range(height):
				if (buffer_info[char_x] >>char_y) & 0x1:
					self.pixel(x + char_x, y + char_y, 1) if height<=self.rows else self.pixel(y + char_y,self.rows-(x + char_x), 1)

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

	def shows(self,data,space=0,center=True):
		"""Display character"""
		self.fill(0)
		if type(data) in [list,bytes,tuple,bytearray]:
			self.set_buffer(data)
			self.show()	
		else:
			data=str(data)
			x=(self.columns - len(data)*(self._font.font_width+space)+space)//2 if center else 0
			for char in data:
				self.bitmap(self._font.chardata(char),x) 
				x=self._font.font_width+x+space
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
			data=str(data)
			x=(self.columns - self._font.font_width)//2 
			for char in data:
				self.fill(0)
				self.bitmap(self._font.chardata(char),x)
				self.show()
				time.sleep_ms(delay) 

	def scroll(self,data,space=0,speed=100):
		"""Scrolling characters"""
		data=str(data)
		str_len=len(data)*(self._font.font_width+space)-space
		for i in range(str_len+self.columns+1):	
			x=-i+self.columns
			self.fill(0)
			for char in data:
				self.bitmap(self._font.chardata(char),x)
				x=self._font.font_width+x+space
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
	HEART=b'\x14>>\x1c\x08'
	HEART_SMALL=b'\x00\x14>\x1c\x08'
	HAPPY=b'f\x00B$\x18'
	SAD=b'$B\x18$B'
	SMILE=b'B\xa5\x00$\x18'
	SILLY=b'\xa5B\x18$\x18'
	FABULOUS=b'B\xa5\x00<\x18'
	SURPRISED=b'\x08\x08\x08\x00\x08'
	ASLEEP=b'\xe7\x00\x18$\x18'
	ANGRY=b'\xa5B\x18$B'
	CONFUSED=b'\x1c\x10\x18\x00\x08'
