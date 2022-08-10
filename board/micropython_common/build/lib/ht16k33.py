"""
HT16K33-framebuf

Micropython	library for the HT16K33 Matrix16x8
=======================================================

#Preliminary composition	  	    20220620

dahanzimin From the Mixly Team
"""

import framebuf
from micropython import const

_HT16K33_BLINK_CMD 			= const(0x80)
_HT16K33_BLINK_DISPLAYON 	= const(0x01)
_HT16K33_CMD_BRIGHTNESS 	= const(0xE0)
_HT16K33_OSCILATOR_ON 		= const(0x21)

class HT16K33(framebuf.FrameBuffer):
	def __init__(self, i2c, address=0x70, brightness=0.3):
		self._i2c = i2c
		self._address = address	
		self._blink_rate=0
		self._brightness=brightness
		self._buffer = bytearray(16)	
		super().__init__(self._buffer, 16, 8, framebuf.MONO_HMSB)	
		
		self._write_cmd(_HT16K33_OSCILATOR_ON)
		self.blink_rate(0)
		self.set_brightness(brightness)
		self.fill(0)
		self.show()
		
	def _write_cmd(self, val):
		'''I2C write command'''
		self._i2c.writeto(self._address,val.to_bytes(1, 'little'))

	def blink_rate(self, rate=None):
		if rate is None:
			return self._blink_rate
		if not 0 <= rate <= 3:
			raise ValueError("Blink rate must be an integer in the range: 0-3")
		rate = rate & 0x03
		self._blink_rate = rate
		self._write_cmd(_HT16K33_BLINK_CMD | _HT16K33_BLINK_DISPLAYON | rate << 1)
			
	def get_brightness(self):
		return self._brightness

	def set_brightness(self, brightness):
		if not 0.0 <= brightness <= 1.0:
			raise ValueError("Brightness must be a decimal number in the range: 0.0-1.0")
		self._brightness = brightness
		xbright = round(15 * brightness)
		xbright = xbright & 0x0F
		self._write_cmd(_HT16K33_CMD_BRIGHTNESS | xbright)

	def show(self):
		"""Refresh the display and show the changes."""
		self._i2c.writeto_mem(self._address, 0x00, self._buffer)
		
	def set_buffer(self, buffer):
		for i in range(min(len(buffer),len(self._buffer))):
			self._buffer[i] = self._buffer[i] | buffer[i]

	def get_buffer(self):
		return self._buffer	
