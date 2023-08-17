"""
BOT51

Micropython	library for the BOT51(ADC*7, Motor*2*2, Matrix12x12, on/off)
=======================================================

#Preliminary composition					20230812

@dahanzimin From the Mixly Team
"""
import uframebuf
from micropython import const

_BOT51_ADDRESS			= const(0x26)
_BOT5_ID   				= const(0x00)
_BOT51_VBAT				= const(0x01)
_BOT51_PS				= const(0x03)
_BOT51_ALS				= const(0x07)
_BOT51_FLAG				= const(0x0B)
_BOT51_MOTOR			= const(0x0C)
_BOT51_LEDS				= const(0x10)

class BOT51(uframebuf.FrameBuffer_Uincode):
	def __init__(self, i2c_bus, address=_BOT51_ADDRESS, brightness=0.8, font_address=0x3A0000, width=12, height=12):
		self._i2c= i2c_bus
		self._addr = address
		if self._rreg(_BOT5_ID) != 0x26:
			raise AttributeError("Cannot find a BOT51")	
		self._buffer = bytearray((width + 7) // 8 * height)
		super().__init__(self._buffer, width, height, uframebuf.MONO_HMSB)
		self.reset()
		self.font(font_address)
		self.set_brightness(brightness)

	def _wreg(self, reg, val):
		'''Write memory address'''
		self._i2c.writeto_mem(self._addr, reg, val.to_bytes(1, 'little'))

	def _rreg(self, reg, nbytes=1):
		'''Read memory address'''
		self._i2c.writeto(self._addr, reg.to_bytes(1, 'little'))
		return  self._i2c.readfrom(self._addr, nbytes)[0] if nbytes<=1 else self._i2c.readfrom(self._addr, nbytes)[0:nbytes]

	def reset(self):
		"""Reset all registers to default state"""
		for reg in range(_BOT51_MOTOR, _BOT51_MOTOR + 28):
			self._wreg(reg, 0x00)

	def shutdown(self, flag=True):
		"""This function is only available on battery power"""
		if flag:
			self._wreg(_BOT51_FLAG, (self._rreg(_BOT51_FLAG)) & 0XBF)
		else:
			self._wreg(_BOT51_FLAG, (self._rreg(_BOT51_FLAG)) | 0X40)

	def get_brightness(self):
		return self._brightness

	def set_brightness(self, brightness):
		if not 0.0 <= brightness <= 1.0:
			raise ValueError("Brightness must be a decimal number in the range: 0.0-1.0")
		self._brightness = brightness
		self._wreg(_BOT51_FLAG, round(15 * brightness) | (self._rreg(_BOT51_FLAG)) & 0xF0)

	def direction(self, angle=0):
		'''set display direction '''
		if not 0 <= angle <= 3:
			raise ValueError("Direction must be a number in the range: 0~3")
		self._wreg(_BOT51_FLAG, angle << 4 | (self._rreg(_BOT51_FLAG)) & 0xCF)

	def show(self):
		"""Refresh the display and show the changes."""
		self._i2c.writeto_mem(self._addr, _BOT51_LEDS, self._buffer)

	def pwm(self, index, duty=None):
		"""Motor*2*2 PWM duty cycle data register"""
		if not 0 <= index <= 3:
			raise ValueError("Motor port must be a number in the range: 0~3")
		if duty is None:
			return self._rreg(_BOT51_MOTOR + index)
		else:
			if not 0 <= duty <= 255:
				raise ValueError("Duty must be a number in the range: 0~255")
			self._wreg(_BOT51_MOTOR + index, duty)

	def motor(self, index, action, speed=0, atten=0.4):
		speed = round(max(min(speed, 100), -100) * atten)
		if action=="N":
			self.pwm(index * 2, 0)
			self.pwm(index * 2 + 1, 0)
		elif action=="P":
			self.pwm(index * 2, 255)
			self.pwm(index * 2 + 1, 255)
		elif action=="CW":
			if speed >= 0:
				self.pwm(index * 2, 0)
				self.pwm(index * 2 + 1, speed * 255 // 100)
			else:
				self.pwm(index * 2, - speed * 255 // 100)
				self.pwm(index * 2 + 1, 0)
		elif action=="CCW":
			if speed >= 0:
				self.pwm(index * 2, speed * 255 // 100)
				self.pwm(index * 2 + 1, 0)
			else:
				self.pwm(index * 2, 0)
				self.pwm(index * 2 + 1, - speed * 255 // 100)
		elif action=="NC":
			return round(self.pwm(index * 2) * 100 / 255 / atten), round(self.pwm(index * 2 + 1) * 100 / 255 / atten)
		else:
			raise ValueError('Invalid input, valid are "N","P","CW","CCW"')

	def move(self, action, speed=100, atten=0.4):
		if action=="N":
			self.motor(0, "N")
			self.motor(1, "N")
		elif action=="P":
			self.motor(0, "P")
			self.motor(1, "P")
		elif action=="F":
			self.motor(0, "CCW", speed, atten)
			self.motor(1, "CW", speed, atten)
		elif action=="B":
			self.motor(0, "CW", speed, atten)
			self.motor(1, "CCW", speed, atten)
		elif action=="L":
			self.motor(0, "CW", speed, atten)
			self.motor(1, "CW", speed, atten)
		elif action=="R":
			self.motor(0, "CCW", speed, atten)
			self.motor(1, "CCW", speed, atten)
		else:
			raise ValueError('Invalid input, valid are "N","P","F","B","L","R"')  

	def read_bat(self, ratio=5/1023):
		'''Read battery power'''
		vbat= self._rreg(_BOT51_VBAT) << 2 | self._rreg(_BOT51_VBAT + 1) >> 6
		return round(vbat * ratio, 2)

	def read_ps(self, index, ratio=100/1023):
		'''Read proximity sensor values'''
		if not 0 <= index <= 1:
			raise ValueError("Proximity sensor port must be a number in the range: 0,1")
		vps= self._rreg(_BOT51_PS + index * 2) << 2 | self._rreg(_BOT51_PS + index * 2 + 1) >> 6
		return round(vps * ratio, 2)

	def read_als(self, index, ratio=100/255):
		'''Read light sensor values'''
		if not 0 <= index <= 3:
			raise ValueError("Light sensor port must be a number in the range: 0~3")
		vals= self._rreg(_BOT51_ALS + index)
		return round(vals * ratio)

	"""Graph module"""
	HEART_SMALL=b'\x00\x00\x00\x00\x88\x00\xdc\x01\xfe\x03\xfe\x03\xfc\x01\xf8\x00p\x00 \x00\x00\x00\x00\x00'
	HEART=b'\x00\x00\x88\x00\xdc\x01\xfe\x03\xff\x07\xff\x07\xfe\x03\xfc\x01\xf8\x00p\x00 \x00\x00\x00'
	HAPPY=b'\x00\x00\x00\x00\x01\x08\x01\x08\x01\x08\x00\x00\x00\x00\x04\x02\x08\x01\x90\x00`\x00\x00\x00'
	SAD=b'\x00\x00\x00\x00\x07\x0e\x00\x00\x00\x00\x00\x00\x00\x00`\x00\x90\x00\x08\x01\x04\x02\x00\x00'
	SMILE=b'\x00\x00\x00\x00\x01\x08\x03\x0c\x00\x00\x00\x00\x00\x00\x00\x00\x03\x0c\x0e\x07\xf8\x01\x00\x00'
	SILLY=b'\x00\x00\x00\x00\x01\x08\x02\x04\x01\x08\x00\x00\x00\x00\xf8\x01\x08\x01\x90\x00`\x00\x00\x00'
	FABULOUS=b'\x00\x00\x01\x08\x02\x04\x03\x0c\x00\x00\x00\x00\xfe\x07\x02\x04\x02\x04\x04\x02\xf8\x01\x00\x00'
	SURPRISED=b'`\x00`\x00`\x00`\x00`\x00`\x00`\x00`\x00\x00\x00`\x00`\x00\x00\x00'
	ASLEEP=b'\x00\x00\x00\x00\x00\x00\x03\x0c\x00\x00\x00\x00\x00\x00\x00\x00\xf8\x01\x04\x02\xf8\x01\x00\x00'
	ANGRY=b'\x00\x00\x08\x01\x04\x02\x02\x04\x01\x08\x00\x00\x00\x00`\x00\x90\x00\x08\x01\x04\x02\x02\x04'
	CONFUSED=b'\xf0\x00\x98\x01\x0c\x03\x0c\x03\x00\x03\x80\x01\xc0\x00`\x00`\x00\x00\x00`\x00`\x00'
	NO=b'\x00\x00\x00\x00\x04\x02\x08\x01\x90\x00`\x00`\x00\x90\x00\x08\x01\x04\x02\x00\x00\x00\x00'
	YES=b'\x00\x00\x00\x00\x00\x0c\x00\x06\x00\x03\x80\x01\xc3\x00f\x00<\x00\x18\x00\x00\x00\x00\x00'
