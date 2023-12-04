"""
WS2812 RGB

Micropython library for the WS2812 NeoPixel-RGB
=======================================================

#Based on neopixel(Native library)			20220618
#Change support end reuse					20220622

dahanzimin From the Mixly Team
"""

from time import sleep
from machine import bitstream

class NeoPixel:
	def __init__(self, pin, n, bpp=3, timing=1,ORDER=(1, 0, 2, 3),default=None,multiplex=0):
		self.pin = pin
		self.n = n
		self.bpp = bpp
		self.ORDER=ORDER
		self.multiplex=multiplex
		self.buf = bytearray(n * bpp)
		self.timing = (((350, 850, 800, 400) if timing else (800, 1700, 1600, 900))	if isinstance(timing, int) else timing)

		if not self.multiplex:
			self.pin.init(self.pin.OUT,value=default)

		self.fill((0, 0, 0))
		self.write()

	def __len__(self):
		return self.n

	def __setitem__(self, i, v):
		offset = i * self.bpp
		for i in range(self.bpp):
			self.buf[offset + self.ORDER[i]] = v[i] 

	def __getitem__(self, i):
		offset = i * self.bpp
		return tuple(self.buf[offset + self.ORDER[i]] for i in range(self.bpp))

	def fill(self, v):
		b = self.buf
		l = len(self.buf)
		bpp = self.bpp
		for i in range(bpp):
			c = v[i] 
			j = self.ORDER[i]
			while j < l:
				b[j] = c
				j += bpp

	def write(self):
		if self.multiplex:
			self.pin.init(self.pin.OUT)
		bitstream(self.pin, 0, self.timing, self.buf)
		if self.multiplex:
			self.pin.init(self.pin.IN)

	def color_chase(self,R, G, B, wait):
		for i in range(self.n):
			self.__setitem__(i,(R, G, B))
			self.write()
			sleep(wait/1000)

	def rainbow_cycle(self,wait):
		for j in range(255):
			for i in range(self.n):
				rc_index = (i * 256 // self.n) + j
				self.__setitem__(i,self.wheel(rc_index & 255))
			self.write()
			sleep(wait/1000/256)
		self.fill((0, 0, 0))
		self.write()

	def wheel(self,pos):
		if pos < 0 or pos > 255:
			return (0, 0, 0)
		elif pos < 85:
			return (pos * 3, 255 - pos * 3,  0)
		elif pos < 170:
			pos -= 85
			return (255 - pos * 3, 0, pos * 3)
		else:
			pos -= 170
			return (0, pos * 3, 255 - pos * 3)