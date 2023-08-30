"""
Yuankong Zi Onboard resources

Micropython    library for the Yuankong Zi Onboard resources
=======================================================

#Preliminary composition                   20230818
#S3定时器ID(-1,0,1,2,3(led))

dahanzimin From the Mixly Team
"""

import time, gc, st7735, sdcard
from machine import Pin, I2C, SPI, ADC, PWM, RTC, Timer

'''RTC'''
rtc_clock = RTC()

'''I2C-onboard'''
onboard_i2c = I2C(0)

'''SPI-onboard'''
onboard_spi = SPI(1, baudrate=50000000, polarity=0, phase=0)

'''TFT/128*160'''
onboard_tft = st7735.ST7735(onboard_spi, 160, 128, dc_pin=18, cs_pin=45, bl_pin=14, font_address=0x3A0000)

'''ACC-Sensor'''
try :
	import mxc6655xa
	onboard_mxc6655xa = mxc6655xa.MXC6655XA(onboard_i2c)     
except Exception as e:
	print("Warning: Failed to communicate with MXC6655XA (ACC Sensor) or",e)

'''ALS_PS-Sensor'''
try :
	import ltr553als
	onboard_ltr553als = ltr553als.LTR_553ALS(onboard_i2c)     
except Exception as e:
	print("Warning: Failed to communicate with TR_553ALS (ALS&PS Sensor) or",e)

'''BPS-Sensor'''
try :
	import hp203x
	onboard_hp203x = hp203x.HP203X(onboard_i2c)     
except Exception as e:
	print("Warning: Failed to communicate with HP203X (BPS Sensor) or",e)

'''THS-Sensor'''
try :
	import ahtx0
	onboard_ahtx0 = ahtx0.AHTx0(onboard_i2c)     
except Exception as e:
	print("Warning: Failed to communicate with AHTx0 (THS Sensor) or",e)

'''RFID-Sensor'''
try :
	import rc522
	onboard_rc522 = rc522.RC522(onboard_i2c)     
except Exception as e:
	print("Warning: Failed to communicate with RC522 (RFID Sensor) or",e)

'''MGS-Sensor'''
try :
	import mmc5603
	onboard_mmc5603 = mmc5603.MMC5603(onboard_i2c)
except Exception as e:
	print("Warning: Failed to communicate with MMC5603 (MGS Sensor) or",e)

'''2RGB_WS2812'''    
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(38), 4)


'''5KEY_Sensor'''
class KEYSensor:
	def __init__(self, pin, range):
		self.pin = pin
		self.adc = ADC(Pin(pin))
		self.adc.atten(ADC.ATTN_11DB) 
		self.range = range
		self.flag = True
	
	def _value(self):
		values = []
		for _ in range(20):
			values.append(self.adc.read())
			time.sleep_ms(1)
		return (self.range-300) < (sum(sorted(values)[5:15])//10) < (self.range+300)
	
	def get_presses(self, delay = 1):
		last_time,presses = time.time(), 0
		while time.time() < last_time + delay:
			time.sleep_ms(50)
			if self.was_pressed():
				presses += 1
		return presses

	def is_pressed(self):
		return self._value()

	def was_pressed(self):
		if(self._value() != self.flag):
			self.flag = self._value()
			if self.flag :
				return True
			else:
				return False

	def irq(self, handler, trigger):
		Pin(self.pin, Pin.IN).irq(handler = handler, trigger = trigger)

'''1KEY_Button'''
class Button(KEYSensor):
	def __init__(self, pin):
		self.pin = pin
		self.key = Pin(pin, Pin.IN)
		self.flag = True

	def _value(self):
		return not self.key.value()

B1key = Button(0)
B2key = KEYSensor(17,0)
A1key = KEYSensor(17,650)
A2key = KEYSensor(17,1370)
A3key = KEYSensor(17,2200)
A4key = KEYSensor(17,3100)

'''2-TouchPad'''
class Touch_Pad:
	__species = {}
	__first_init = True
	def __new__(cls, pin, *args, **kwargs):
		if pin not in cls.__species.keys():
			cls.__first_init = True
			cls.__species[pin]=object.__new__(cls)
		return cls.__species[pin]   

	def __init__(self, pin, default=30000):
		if self.__first_init:
			self.__first_init = False
			from machine import TouchPad
			self._pin = TouchPad(Pin(pin))
			self.raw = self._pin.read()
			if self.raw >= default * 1.5:
				self.raw = default

	def touch(self,value=None ):
		return self._pin.read() > value if value else  self._pin.read()

#Touch with function call
def touched(pin,value=60000):
	return Touch_Pad(pin).touch(value)

def touch_slide(pina, pinb):
	return ((Touch_Pad(pina).touch() - Touch_Pad(pina).raw) - (Touch_Pad(pinb).touch() - Touch_Pad(pinb).raw)) // 10

'''2LED-Tristate'''
class LED:
	def __init__(self, pin, timer_id=3):
		self._pin = pin
		self._pwm = -1 
		self.flag = True
		self._index_pwm = [0,0]
		Timer(timer_id, freq = 6000, mode = Timer.PERIODIC, callback = self.tim_callback)

	def _cutonoff(self,val):
		if val == 0:
			Pin(self._pin, Pin.IN)
		elif val == 1:
			Pin(self._pin, Pin.OUT).value(1)
		elif val == -1:
			Pin(self._pin, Pin.OUT).value(0)
		
	def tim_callback(self,tim):
		self._pwm +=1
		if self._pwm > 100:
			self._pwm = 0
		if self.flag:
			if self._pwm < self._index_pwm[0]: 
				self._cutonoff(1)
			else:
				self._cutonoff(0)
		else:
			if self._pwm < self._index_pwm[1]: 
				self._cutonoff(-1)
			else:
				self._cutonoff(0)		
		self.flag = not self.flag

	def setbrightness(self,index,val):
		if not 0 <= val <= 100:
			raise ValueError("Brightness must be in the range: 0~100%")
		self._index_pwm[index-1] = val
		
	def getbrightness(self,index):
		return self._index_pwm[index-1]

	def setonoff(self,index,val):
		if(val == -1):
			if self._index_pwm[index-1] < 50:
				self._index_pwm[index-1] = 100
			else:
				self._index_pwm[index-1] = 0
		elif(val == 1):
			self._index_pwm[index-1] = 100 
		elif(val == 0):
			self._index_pwm[index-1] = 0 

	def getonoff(self,index):
		return True if self._index_pwm[index-1] > 0 else False

onboard_led=LED(42, timer_id=3)

'''2 Proximity Sensor'''
class Proximity:
	def __init__(self, pin_t, pin_r):
		self._ir_r = ADC(Pin(pin_r))
		self._ir_r.atten(ADC.ATTN_11DB) 
		self._ir_t = Pin(pin_t, Pin.OUT)

	def _samlpe(self):
		values = []
		for _ in range(20):
			values.append(self._ir_r.read_u16())
			time.sleep_us(100)
		return sum(sorted(values)[5:15])//10
	
	def ps_nl(self):
		self._ir_t.value(1)
		time.sleep_ms(1)
		value_on = self._samlpe()
		self._ir_t.value(0)
		time.sleep_ms(1)
		value_off = self._samlpe()
		return value_on - value_off

onboard_psa = Proximity(21, 15)
onboard_psb = Proximity(21, 13)





'''Reclaim memory'''
gc.collect()
