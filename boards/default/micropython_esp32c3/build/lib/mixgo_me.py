"""
MixGo ME -Onboard resources

MicroPython library for the MixGo ME -Onboard resources
=======================================================

#Preliminary composition                       20221010

dahanzimin From the Mixly Team
"""

import time,gc
from machine import Pin,SoftI2C,ADC,PWM,RTC

'''i2c-onboard'''
onboard_i2c=SoftI2C(scl = Pin(7), sda = Pin(6), freq = 400000)

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
    print("Warning: Failed to communicate with LTR_553ALS or",e)

'''Matrix8x5'''
try :
    import matrix8x5
    onboard_matrix = matrix8x5.Matrix(8)
except Exception as e:
    print("Warning: Failed to communicate with Matrix8x5 or",e)

'''Magnetic'''
try :
    import mmc5603
    onboard_mmc5603 = mmc5603.MMC5603(onboard_i2c)
except Exception as e:
    print("Warning: Failed to communicate with MMC5603 or",e)

'''2RGB_WS2812'''
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(9), 2, ORDER=(0, 1, 2, 3),multiplex=1)

'''1Buzzer-Music'''
from music import MIDI
onboard_music =MIDI(10)

'''MIC_Sensor'''
class MICSensor:
    def __init__(self):
        self.adc=ADC(Pin(4))
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

onboard_sound = MICSensor()

'''5KEY_Sensor'''
class KEYSensor:
    def __init__(self,range):
        self.adc=ADC(Pin(5))
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
        Pin(5, Pin.IN).irq(handler = handler, trigger = trigger)

B2key = KEYSensor(20)
A1key = KEYSensor(800)
A2key = KEYSensor(1600)
A3key = KEYSensor(2500)
A4key = KEYSensor(3500)

'''1KEY_Button'''
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
        
B1key = Button(9)

'''Reclaim memory'''
gc.collect()
