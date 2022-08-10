"""
MixGo CC -Onboard resources

MicroPython library for the MixGo CC -Onboard resources
=======================================================

#Preliminary composition                20220401
#Instantiate onboard resources          20220623

dahanzimin From the Mixly Team
"""

import time,gc
from machine import Pin,SoftI2C,ADC,PWM,Timer,RTC

'''i2c-onboard'''
onboard_i2c=SoftI2C(scl = Pin(7), sda = Pin(6), freq = 400000)

'''RTC'''
rtc_clock=RTC()

'''ACC-Sensor'''    #Including acceleration,temperature
try :
    import mxc6655xa
    onboard_mxc6655xa = mxc6655xa.MXC6655XA(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with MXC6655XA or",e)
    
'''ALS_PS-Sensor'''    #Including als_vis,als_ir,ps_nl
try :
    import ltr553als
    onboard_ltr553als = ltr553als.LTR_553ALS(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with TR_553ALS or",e)


'''Atmos_Sensor'''    #Including pressure,altitude,temperature
try :
    import hp203x
    onboard_hp203x = hp203x.HP203X(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with HP203X or",e)

'''T&H_Sensor'''    #Including temperature,humidity
try :
    import ahtx0
    onboard_ahtx0 = ahtx0.AHTx0(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with AHTx0 or",e)

'''RFID_Sensor'''    #Including read_card,write_card
try :
    import rc522
    onboard_rc522 = rc522.RC522(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with RC522 or",e)

'''matrix32x12'''    #Including read_card,write_card
try :
    import matrix32x12
    onboard_matrix = matrix32x12.Matrix(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with Matrix32X12 or",e)

'''2RGB_WS2812'''    #color_chase(),rainbow_cycle()方法移至类里
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(8), 4, ORDER=(0, 1, 2, 3))

'''1Buzzer-Music'''
from music import MIDI
onboard_music =MIDI(10)

'''MIC_Sensor'''
class MICSensor:
    def __init__(self):
        self.adc=ADC(Pin(3))
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
            val = self.adc.read()
            values.append(val)
        return max(values) - min(values)

onboard_sound = MICSensor()

'''4KEY_Sensor'''
class KEYSensor:
    def __init__(self,range):
        self.adc=ADC(Pin(2))
        self.adc.atten(ADC.ATTN_11DB) 
        self.range=range
        self.flag = True
    
    def _value(self):
        values = 0
        for _ in range(10):
            values += self.adc.read()
        return (self.range-200)< values//10 < (self.range+200)

    
    def get_presses(self, delay = 1):
        last_time, last_state, presses = time.time(), 0, 0
        while time.time() < last_time + delay:
            time.sleep_ms(50)
            if last_state == 0 and self._value():
                last_state = 1
            if last_state == 1 and not self._value():
                last_state, presses = 0, presses + 1
        return presses

    def is_pressed(self):
        time.sleep(0.02)
        return self._value()

    def was_pressed(self):
        if(self._value() != self.flag):
            self.flag = self._value()
            time.sleep(0.02)
            if self.flag :
                return True
            else:
                return False

A1key = KEYSensor(20)
A2key = KEYSensor(1170)
A3key = KEYSensor(2400)
A4key = KEYSensor(3610)

'''2KEY_Button'''
class Button:
    def __init__(self, pin):
        self.pin = Pin(pin, Pin.IN)
        self.flag = True
        
    def get_presses(self, delay = 1):
        last_time, last_state, presses = time.time(), 0, 0
        while time.time() < last_time + delay:
            time.sleep_ms(50)
            if last_state == 0 and self.pin.value() == 1:
                last_state = 1
            if last_state == 1 and self.pin.value() == 0:
                last_state, presses = 0, presses + 1
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
B2key = Button(4)


'''2LED-Tristate'''    #brightness adjustment range 0-100%    
class LED:
    def __init__(self,timer=2):
        self.flag = True
        Timer(timer).init(freq = 10000, mode = Timer.PERIODIC, callback = self.tim_callback)
        self._pwm=-1 
        self._index_pwm=[0,0]
        
    def _cutonoff(self,val):
        if val == 0:
            Pin(5, Pin.IN)
        elif val == 1:
            Pin(5, Pin.OUT).value(1)
        elif val == -1:
            Pin(5, Pin.OUT).value(0)
        
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
        self.flag=not self.flag

    def setbrightness(self,index,val):
        if not 0 <= val <= 100:
            raise ValueError("Brightness must be in the range: 0-100%")
        self._index_pwm[index-1]=val
        
    def getbrightness(self,index):
        return self._index_pwm[index-1]

    def setonoff(self,index,val):
        if(val == -1):
            if self._index_pwm[index-1] < 50:
                self._index_pwm[index-1]=100
            else:
                self._index_pwm[index-1]=0
        elif(val == 1):
            self._index_pwm[index-1]=100 
        elif(val == 0):
            self._index_pwm[index-1]=0 

    def getonoff(self,index):
        return True if self._index_pwm[index-1]>0 else False

onboard_led=LED()

'''Reclaim memory'''
gc.collect()