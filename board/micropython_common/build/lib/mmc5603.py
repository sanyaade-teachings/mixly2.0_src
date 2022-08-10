"""
MMC5603

Micropython library for the MMC5603NJ（Magnetic）
=======================================================

#Preliminary composition	       		20220716

dahanzimin From the Mixly Team
"""
import time,math
from micropython import const

MMC5603_ADDRESS	     		 = const(0x30)

MMC5603_REG_DATA			 = const(0x00)
MMC5603_REG_TMP				 = const(0x09)
MMC5603_REG_ODR	    		 = const(0x1A)
MMC5603_REG_CTRL0	    	 = const(0x1B)
MMC5603_REG_CTRL1	    	 = const(0x1C)
MMC5603_REG_CTRL2	    	 = const(0x1D)

MMC5603_REG_X_THD            = const(0x1E)
MMC5603_REG_Y_THD            = const(0x1F)
MMC5603_REG_Z_THD            = const(0x20)
MMC5603_REG_ST_X_VAL	     = const(0x27)
MMC5603_REG_DEVICE_ID	 	 = const(0x39)

class MMC5603:
	def __init__(self, i2c_bus):
		self._device = i2c_bus
		self._address = MMC5603_ADDRESS	
		#/* Check product ID */
		if self._chip_id() != 0x10:
			raise AttributeError("Cannot find a MMC5603")

		self._reset()
		#/* Auto self-test registers configuration */	
		self._Auto_SelfTest_Configuration()
		#/* Do SET operation */
		self._set()
		#/* Work mode setting */
		self._Continuous_Mode_With_Auto_SR(0x00, 50)
		time.sleep(0.3)
	
	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	def _rreg(self, reg,nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]


	def _chip_id(self):  
		return self._rreg(MMC5603_REG_DEVICE_ID)
			
	def _Auto_SelfTest_Configuration(self):
		st_thd_reg=[0,0,0]
		st_thr_data=[0,0,0]
		#/* Read trim data from reg 0x27-0x29 */
		_buffer=self._rreg(MMC5603_REG_ST_X_VAL,3)
		for i in range(0, 3, 1):
			st_thr_data[i]=(_buffer[i]-128)*32
			if st_thr_data[i] < 0:
				st_thr_data[i]=-st_thr_data[i]
			st_thd=(st_thr_data[i]-st_thr_data[i]//5)//8
			if st_thd > 255:
				st_thd_reg[i]=0xFF
			else:
				st_thd_reg[i]=st_thd
			#print(st_thd_reg[i],i)
		#/* Write threshold into the reg 0x1E-0x20 */	
		self._wreg(MMC5603_REG_X_THD, st_thd_reg[0])	
		self._wreg(MMC5603_REG_Y_THD, st_thd_reg[1])	
		self._wreg(MMC5603_REG_Z_THD, st_thd_reg[2])
		
	def _set(self):
		#/* Write 0x08 to register 0x1B, set SET bit high */
		self._wreg(MMC5603_REG_CTRL0, 0X08)
		#/* Delay to finish the SET operation */
		time.sleep(0.01)
		
	def _reset(self):
		#/* Write 0x08 to register 0x1B, set SET bit high */
		self._wreg(MMC5603_REG_CTRL0, 0X10)
		#/* Delay to finish the SET operation */
		time.sleep(0.01)		

	def _Continuous_Mode_With_Auto_SR(self,bandwith,sampling_rate):
		#/* Write reg 0x1C, Set BW<1:0> = bandwith */
		self._wreg(MMC5603_REG_CTRL1, bandwith)
		#/* Write reg 0x1A, set ODR<7:0> = sampling_rate */
		self._wreg(MMC5603_REG_ODR, sampling_rate)
		#/* Write reg 0x1B */
		#/* Set Auto_SR_en bit '1', Enable the function of automatic set/reset */
		#/* Set Cmm_freq_en bit '1', Start the calculation of the measurement period according to the ODR*/	
		self._wreg(MMC5603_REG_CTRL0, 0X80|0X20)
		#/* Write reg 0x1D */
		#/* Set Cmm_en bit '1', Enter continuous mode */	
		self._wreg(MMC5603_REG_CTRL2, 0x10)
		
	def getdata(self): 
		#/* Read register data */
		_buffer=self._rreg( MMC5603_REG_DATA,6)
		#/* Transform to unit Gauss */
		X_out=((_buffer[0] << 8 | _buffer[1])-32768)/1024
		Y_out=((_buffer[2] << 8 | _buffer[3])-32768)/1024
		Z_out=((_buffer[4] << 8 | _buffer[5])-32768)/1024
		
		#T_out=self._Read_Reg(MMC5603_REG_TMP)
		#print("TMP",T_out)
		return (X_out,Y_out,Z_out)
		
	def getangle(self):
		X,Y,Z=self.getdata()
		return math.atan2(Y, X)*(180 / math.pi) + 180
	