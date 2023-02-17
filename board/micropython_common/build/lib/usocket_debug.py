from  usocket import *
 
class socket(socket):
    def __init__(self,*args,debug=False,**kw):
        super().__init__(*args,**kw)
        self._debug=debug
        self.client_len=0
        self.server_len=0

    def write(self,*args):
        super().write(*args)
        self.client_len=min(self.client_len+len(args[0]),65535)
        if self._debug:
            print('client:',args[0])
 
    def readline(self,*args):
        buf=super().readline(*args)
        self.server_len=min(self.server_len+len(buf),65535) if buf else self.server_len
        if self._debug:
            print('server:',buf)
        return buf

    def read(self,*args):
        buf=super().read(*args)
        self.server_len=min(self.server_len+len(buf),65535) if buf else self.server_len
        if self._debug:
            print('server:',buf)
        return buf
