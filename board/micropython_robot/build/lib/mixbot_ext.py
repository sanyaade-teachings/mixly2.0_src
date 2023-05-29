"""
Mixbot-EXT

Micropython library for the Mixbot-External integrated I2C equipment
=======================================================

@dahanzimin From the Mixly Team
"""
import i2cdevice
from mixbot import ext_i2c

'''Motor'''
ext_motor = i2cdevice.Motor(ext_i2c)

'''Traffic light'''
ext_traffic = i2cdevice.Traffic_LED(ext_i2c)

'''LED /RGBYW'''
ext_rled = i2cdevice.R_LED(ext_i2c)
ext_gled = i2cdevice.G_LED(ext_i2c)
ext_bled = i2cdevice.B_LED(ext_i2c)
ext_yled = i2cdevice.Y_LED(ext_i2c)
ext_wled = i2cdevice.W_LED(ext_i2c)

'''button*5'''
ext_button = i2cdevice.Buttonx5(ext_i2c)

'''collision sensor'''
ext_collision = i2cdevice.Button(ext_i2c)

'''Infrared sensor'''
ext_infrared = i2cdevice.Infrared(ext_i2c)

'''Potentiometer'''
ext_potentiometer = i2cdevice.Dimmer(ext_i2c)

'''Color sensor'''
ext_color = i2cdevice.Color_ID(ext_i2c)

'''Servo Motor'''
ext_servo = i2cdevice.Motor_servo(ext_i2c)
