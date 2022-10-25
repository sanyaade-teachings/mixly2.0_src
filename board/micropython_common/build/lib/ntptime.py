import utime,gc
from machine import RTC
import usocket as socket
import ustruct as struct

# NTP_DELTA (date(2000, 1, 1) - date(1900, 1, 1)).days * 24*60*60
NTP_DELTA=3155673600

def time(host="pool.ntp.org", utc=28800):
    NTP_QUERY = bytearray(48)
    NTP_QUERY[0] = 0x1B
    addr = socket.getaddrinfo(host, 123)[0][-1]
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.settimeout(1)
        res = s.sendto(NTP_QUERY, addr)
        msg = s.recv(48)
    finally:
        del addr
        s.close()
    gc.collect()
    val = struct.unpack("!I", msg[40:44])[0]
    val = utime.gmtime(val - NTP_DELTA + utc)
    return (val[0], val[1], val[2], val[6] , val[3], val[4], val[5], val[7])

# There's currently no timezone support in MicroPython, and the RTC is set in UTC time.
def settime():
    utime.sleep_ms(100)
    RTC().datetime(time())
