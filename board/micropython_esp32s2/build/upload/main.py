import machine
import mixgo_ce
import time


while True:
    print(mixgo_ce.get_temperature())
    time.sleep(0.1)
