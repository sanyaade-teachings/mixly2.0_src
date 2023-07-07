"""
MixGo CC -Onboard resources

MicroPython library for the MixGo CC -Onboard resources
=======================================================

#Preliminary composition                20221010

dahanzimin From the Mixly Team
"""

import time,gc
from machine import Pin,SoftI2C,ADC,PWM,Timer,RTC

'''i2c-onboard'''
onboard_i2c=SoftI2C(scl = Pin(7), sda = Pin(6), freq = 400000)

'''Version judgment'''
if 0x73 in onboard_i2c.scan():
    version=1
elif 0x72 in onboard_i2c.scan():
    version=0
else:
    print("Warning: Mixgo CC board is not detected, which may cause usage errors")

'''RTC'''
rtc_clock=RTC()

'''ACC-Sensor'''
try :
    import mxc6655xa
    onboard_mxc6655xa = mxc6655xa.MXC6655XA(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with MXC6655XA or",e)

'''ALS_PS-Sensor'''
try :
    import ltr553als
    onboard_ltr553als = ltr553als.LTR_553ALS(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with TR_553ALS or",e)

'''Atmos_Sensor'''
try :
    import hp203x
    onboard_hp203x = hp203x.HP203X(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with HP203X or",e)

'''T&H_Sensor'''
try :
    import ahtx0
    onboard_ahtx0 = ahtx0.AHTx0(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with AHTx0 or",e)

'''RFID_Sensor'''
try :
    import rc522
    onboard_rc522 = rc522.RC522(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with RC522 or",e)

'''matrix32x12'''
try :
    import matrix32x12
    onboard_matrix = matrix32x12.Matrix(onboard_i2c, address=0x73 if version else 0x72)     
except Exception as e:
    print("Warning: Failed to communicate with Matrix32X12 or",e)

'''Magnetic'''
try :
    import mmc5603
    onboard_mmc5603 = mmc5603.MMC5603(onboard_i2c)
except Exception as e:
    print("Warning: Failed to communicate with MMC5603 or",e)

'''2RGB_WS2812'''    
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(8), 4, ORDER=(0, 1, 2, 3))

'''1Buzzer-Music'''
from music import MIDI
onboard_music =MIDI(10)

'''MIC_Sensor'''
class MICSensor:
    def __init__(self,pin):
        self.adc=ADC(Pin(pin))
        self.adc.atten(ADC.ATTN_11DB) 
        
    def read(self):
        maxloudness = 0
        for i in range(5):
            loudness = self.sample()  
            if loudness > maxloudness:
                maxloudness = loudness
        return maxloudness  
        
    def sample(self):
        values = []
        for i in range(50):
            val = self.adc.read_u16()
            values.append(val)
        return max(values) - min(values)

onboard_sound = MICSensor(pin=4 if version else 3)

'''4,5KEY_Sensor'''
class KEYSensor:
    def __init__(self, pin, range):
        self.adc=ADC(Pin(pin))
        self.adc.atten(ADC.ATTN_11DB) 
        self.range=range
        self.flag = True
    
    def _value(self):
        values = []
        for _ in range(20):
            values.append(self.adc.read())
            time.sleep(0.001)
        return (self.range-300) < (sum(sorted(values)[5:15])//10) < (self.range+300)
    
    def get_presses(self, delay = 1):
        last_time,presses = time.time(), 0
        while time.time() < last_time + delay:
            time.sleep(0.05)
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
        Pin(pin, Pin.IN).irq(handler = handler, trigger = trigger)

'''2,1KEY_Button'''
class Button:
    def __init__(self, pin):
        self.pin = Pin(pin, Pin.IN)
        self.flag = True

    def get_presses(self, delay = 1):
        last_time,presses = time.time(), 0
        while time.time() < last_time + delay:
            time.sleep(0.05)
            if self.was_pressed():
                presses += 1
        return presses

    def is_pressed(self):
        return not self.pin.value()

    def was_pressed(self, flag = 0):
        if(self.pin.value() != self.flag):
            self.flag = self.pin.value()
            time.sleep(0.02)
            if self.flag:
                return False
            else:
                return True

    def irq(self, handler, trigger):
        self.pin.irq(handler = handler, trigger = trigger)

if version==0:
    B1key = Button(9)
    B2key = Button(4)
    A1key = KEYSensor(2,20)
    A2key = KEYSensor(2,1170)
    A3key = KEYSensor(2,2400)
    A4key = KEYSensor(2,3610)    

else:
    B1key = Button(9)
    B2key = KEYSensor(5,20)
    A1key = KEYSensor(5,800)
    A2key = KEYSensor(5,1600)
    A3key = KEYSensor(5,2500)
    A4key = KEYSensor(5,3500)

'''2-LED'''     # Dual resources  
class LED:
    __species = {}
    __first_init = True
    def __new__(cls, pin, *args, **kwargs):
        if pin not in cls.__species.keys():
            cls.__first_init = True
            cls.__species[pin]=object.__new__(cls)
        return cls.__species[pin] 

    def __init__(self, pin):
         if self.__first_init:
            self.__first_init = False
            self._pin =PWM(Pin(pin),duty_u16=65535)
            self.setbrightness(0)
        
    def setbrightness(self,val):
        if not 0 <= val <= 100:
            raise ValueError("Brightness must be in the range: 0-100%")
        self._brightness=val
        self._pin.duty_u16(65535-val*65535//100)

    def getbrightness(self):
        return self._brightness

    def setonoff(self,val):
        if(val == -1):
            self.setbrightness(100)  if self._brightness<50 else self.setbrightness(0) 
        elif(val == 1):
            self.setbrightness(100) 
        elif(val == 0):
            self.setbrightness(0) 
            
    def getonoff(self):
        return True if self._brightness>0 else False

#LED with function call / L1(IO20),L2(IO21)
if version==0:
    def ledonoff(pin,val=None):
        print("Warning: Old version, without this function")

    def ledbrightness(pin,val=None):
        print("Warning: Old version, without this function")  
else:
    def ledonoff(pin,val=None):
        return LED(pin).getonoff()  if val is None  else LED(pin).setonoff(val)

    def ledbrightness(pin,val=None):
        return LED(pin).getbrightness()  if val is None  else LED(pin).setbrightness(val)

'''Reclaim memory'''
gc.collect()
