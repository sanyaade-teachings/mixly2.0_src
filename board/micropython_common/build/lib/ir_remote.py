"""
IR_Remote

MicroPython library for the IR_Remote(NEC)
=======================================================

#Preliminary composition				20220401
#Resources from the network

dahanzimin From the Mixly Team
"""

from machine import Pin, PWM
import time
import _thread
import gc

class _Const:
	NEC_HDR_MARK = 9000
	NEC_HDR_SPACE = 4500
	NEC_BIT_MARK = 560
	NEC_BIT_MINM = 400

class IRrecv:
	def __init__(self, pin, callback=None):
		self.pulse_buffer = []
		self._prev_time = 0
		self.callback = callback
		self.waittime = 150             #time in milliseconds
		self.recv = Pin(pin, Pin.IN, Pin.PULL_UP)
		self.recv.irq(trigger=Pin.IRQ_RISING | Pin.IRQ_FALLING,handler=self._pulse_width_record)
		_thread.start_new_thread(self._ir_recv_thread, ())

	def _pulse_width_record(self, pin):
		"""record the width of th IR remote signal."""
		self._time = time.ticks_us()
		if self._prev_time == 0:
			self._prev_time = self._time
			return
		self.pulse_buffer.append(self._time - self._prev_time)
		self._prev_time = self._time

	def _lead_cheak(self):
		"""function to cheak the lead code """
		offset = 0.3
		return int(_Const.NEC_HDR_MARK * (1-offset)) < self.pulse_buffer[0] < int(_Const.NEC_HDR_MARK*(1+offset))  \
			and int(_Const.NEC_HDR_SPACE*(1-offset)) < self.pulse_buffer[1] < int(_Const.NEC_HDR_SPACE*(1+offset))

	def decode_pulse_nec(self):
		"""decode IR signal of NEC"""
		recv_bytes = bytearray(0)
		index = 0
		if self._lead_cheak():
			for i in range(4):
				byte = 0
				for j in range(8):
					index = 16 * i + 2 * j + 2
					_Const.NEC_BIT_MARK = max(_Const.NEC_BIT_MINM,min(_Const.NEC_BIT_MARK, self.pulse_buffer[index]))
					if (self.pulse_buffer[index] + self.pulse_buffer[index + 1]) > _Const.NEC_BIT_MARK * 4:
						byte |= 1 << j
				recv_bytes.append(byte)
			return bytes(recv_bytes)

	def _ir_recv_thread(self):
		'''Enable _ Thread constantly scans the infrared signal'''
		while True:
			if (time.ticks_us()-self._prev_time) > self.waittime * 1000 and self.pulse_buffer != []:
				if self._lead_cheak():
					if len(self.pulse_buffer) >= 66:
						decode = self.decode_pulse_nec()
						self.pulse_buffer = []
						self._prev_time = 0
						if self.callback != None:
							self.callback(hex(decode[0]),hex(decode[2]))     
					else:
						print("Warning: Buffer length too short!")
						self.pulse_buffer = []
						self._prev_time = 0
				else:
					print("Warning: Buffer lead code error!")
					self.pulse_buffer = []
					self._prev_time = 0
				gc.collect()

	def set_callback(self, callback=None):
		"""function to allow the user to set"""
		self.callback = callback


class IRTransmit:
	__species = {}
	__first_init = True
	
	def __new__(cls, pin, *args, **kwargs):
		if pin not in cls.__species.keys():
			cls.__first_init = True
			cls.__species[pin]=object.__new__(cls)
		return cls.__species[pin]	
		
	def __init__(self,pin):
		if self.__first_init:
			self.__first_init = False
			self.ir_transmit = PWM(Pin(pin), duty=0, freq=38000)
		
	def _mark(self,us):
		self.ir_transmit.duty(512)
		time.sleep_us(us)

	def _space(self,us):
		self.ir_transmit.duty(0)
		time.sleep_us(us)

	def _bit(self, bit):
		self._mark(_Const.NEC_BIT_MARK)
		if bit:
			self._space(_Const.NEC_BIT_MARK*3)
		else:
			self._space(_Const.NEC_BIT_MARK)

	def _generate_bits(self,addr,cmd):
		if type(addr) == bytes : 
			addr = int.from_bytes(addr,'little')&0xff
		if type(cmd) == bytes : 
			cmd = int.from_bytes(cmd,'little')&0xff
		self._payload =[]
		for i in range(4):
			self._payload.append([])
		for i in range(8):
			if (addr>>i)&0x01:
				self._payload[0].append(1)
				self._payload[1].append(0)
			else:
				self._payload[0].append(0)
				self._payload[1].append(1)
		for i in range(8):
			if (cmd>>i)&0x01:
				self._payload[2].append(1)
				self._payload[3].append(0)
			else:
				self._payload[2].append(0)
				self._payload[3].append(1)

	def send(self,address,command):
		"""send NEC data"""
		self._generate_bits(address,command)
		self._mark(_Const.NEC_HDR_MARK)
		self._space(_Const.NEC_HDR_SPACE)
		for i in range(4):
			for j in range(8):
				self._bit(self._payload[i][j])
		self._mark(560)
		self._space(40000)

def IRsend(pin,address,command):
	IRTransmit(pin).send(address,command)
	gc.collect()
