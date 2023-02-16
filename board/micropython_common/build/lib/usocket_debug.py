from  usocket import *
 
class socket(socket):
    def __init__(self,*args,debug=True,**kw):
        super().__init__(*args,**kw)
        self._debug=debug
        self.client_len=0
        self.server_len=0

    def write(self,*args):
        super().write(*args)
        if self._debug:
            print('client:',args[0])
            self.client_len+=len(args[0])

    def readline(self,*args):
        buf=super().readline(*args)
        if self._debug:
            print('server:',buf)
            self.server_len+=len(buf)
        return buf
           
    def read(self,*args):
        buf=super().read(*args)
        if self._debug:
            print('server:',buf)
            self.server_len+=len(buf)
        return buf
