"""
TM1652-framebuf

Micropython	library for the TM1652 Matrix8x5
=======================================================

#Preliminary composition	  	    			20220614
#Use UART transmission to ensure accuracy	  	20220624

dahanzimin From the Mixly Team
"""

import time
import framebuf
from machine import UART
from micropython import const

_TM1652_REG_ADD	     = const(0x08)		#Display address command
_TM1652_REG_CMD	     = const(0x18)		#Display control command
_TM1652_SET_CUR	     = const(0x08)      #LED current setting 2/8 

class TM1652(framebuf.FrameBuffer):
	def __init__(self, pin, brightness=0.5):
		self._uart=UART(1, tx=pin, baudrate=19200,bits=8, parity=1, stop=1)
		self._buffer = bytearray(5)	
		super().__init__(self._buffer, 8, 5, framebuf.MONO_HMSB)	
		
		self.brightness = brightness
		self._brightness = None
		self.set_brightness(brightness)
		time.sleep_ms(5)
		self.fill(0)
		self.show()
			
	def get_brightness(self):
		return self.brightness

	def set_brightness(self, brightness):
		if not 0.0 <= brightness <= 1.0:
			raise ValueError("Brightness must be a decimal number in the range: 0.0-1.0")
		self.brightness = brightness
		xbright = round(15 * brightness) 
		xbright = ((xbright & 0xA) >>1) | ((xbright & 0x5) <<1)
		xbright = ((xbright & 0xC) >>2) | ((xbright & 0x3) <<2)
		self._brightness = (xbright << 4) | _TM1652_SET_CUR		#高四位倒序|驱动电流

	def show(self):
		"""Refresh the display and show the changes."""
		self._uart.write(bytes([_TM1652_REG_ADD])+self._buffer)
		time.sleep_ms(5)
		self._uart.write(bytes([_TM1652_REG_CMD,self._brightness]))
		time.sleep_ms(5)
		
	def set_buffer(self, buffer):
		for i in range(min(len(buffer),len(self._buffer))):
			self._buffer[i] = self._buffer[i] | buffer[i]

	def get_buffer(self):
		return self._buffer	
