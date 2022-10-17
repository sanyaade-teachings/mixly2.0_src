"""
Radio-ESP-NOW

Micropython library for the Radio-ESP-NOW 
=======================================================
#Preliminary composition            20220228
#Upgrade synchronization            20220701

dahanzimin From the Mixly Team 
"""

from esp import espnow
from ubinascii import hexlify,unhexlify
import network

class ESPNow(espnow.ESPNow):
    def __init__(self,channel=0,txpower=20):
        super().__init__()
        self.active(True)
        self._channel=channel
        self._nic = network.WLAN(network.AP_IF)
        self._nic.active(True)
        self._nic.config(hidden=True,channel=self._channel,txpower=txpower)

        
    def send(self,peer,msg):
        '''Send data after error reporting and effective processing'''    
        try:
            _peer=unhexlify(peer)
            return super().send(_peer, str(msg))
        except OSError as err:
            if len(err.args) < 2:
                raise err
            if err.args[1] == 'ESP_ERR_ESPNOW_NOT_INIT':
                raise OSError("Radio(ESPNOW) is not activated, unable to transmit data") 
            elif err.args[1] == 'ESP_ERR_ESPNOW_IF':
                self._nic.active(True)
            elif err.args[1] == 'ESP_ERR_ESPNOW_NOT_FOUND':
                self.add_peer(_peer,channel=self._channel,ifidx=network.AP_IF)
                return super().send(_peer, str(msg))
            elif err.args[1] == 'ESP_ERR_ESPNOW_NO_MEM':
                raise OSError("internal ESP-NOW buffers are full")  
            elif err.args[1] == 'ESP_ERR_ESPNOW_ARG':
                raise OSError("invalid argument")                 
            else:
                raise err  
                
    def recv(self):
        '''Receive data'''
        if self.any():
            host, msg = super().recv()  
            return hexlify(host).decode(),msg.decode()
        else :
            return None,None

    def set_channel(self,channel,txpower=20):
        self._channel = channel   
        self._nic.config(hidden=True,channel=self._channel,txpower=txpower)        

    def _cb_handle(self, event_code,data):
        '''Callback processing conversion'''
        if self._on_handle:
            self._on_handle(hexlify(data[0]).decode(),data[1].decode())

    def recv_cb(self,recv_cb):
        '''Receive callback'''
        self._on_handle = recv_cb
        if recv_cb:
            self.irq(self._cb_handle)

    def info(self):
        '''Get the paired Mac and rssi'''
        _info=[]
        for i in self.peers_table:
            _info.append((hexlify(i).decode(),self.peers_table[i][0]))
        return _info
            
    @property
    def mac(self):
        '''Get mac address'''
        return hexlify(self._nic.config('mac')).decode()
    