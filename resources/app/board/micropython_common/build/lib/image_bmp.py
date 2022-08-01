"""
Image-BMP

Micropython library for the Image-BMP(BMP tO Bitmap)
=======================================================

#Preliminary composition					20220716
#Based on mpython 							20220716
		
dahanzimin From the Mixly Team
"""
import gc

class Image:
    def load(self, path, invert=0):
        self.invert = invert
        with open(path, 'rb') as file:
            image_type = file.read(2).decode()
            file.seek(0)
            img_arrays = bytearray(file.read())
            if image_type == 'P4':
                buffer = self._pbm_decode(img_arrays)
            elif image_type == 'BM':
                buffer = self._bmp_decode(img_arrays)
            else:
                raise TypeError("Unsupported image format {}".format(image_type))
            gc.collect()
            return buffer 			#Return image data, character width and height (pixels)

    def load_py(self, name, invert=0):
        self.invert = invert
        image_type = name[0:2]
        if image_type == b'P4':
            buffer = self._pbm_decode(name)
        elif image_type == b'BM':
            buffer = self._bmp_decode(name)
        else:
            raise TypeError("Unsupported image format {}".format(image_type))
        gc.collect()
        return buffer           #Return image data, character width and height (pixels)

    def _pbm_decode(self, img_arrays):
        next_value = bytearray()
        pnm_header = []
        stat = True
        index = 3
        while stat:
            next_byte = bytes([img_arrays[index]])
            if next_byte == b"#":
                while bytes([img_arrays[index]]) not in [b"", b"\n"]:
                    index += 1
            if not next_byte.isdigit():
                if next_value:
                    pnm_header.append(int("".join(["%c" % char for char in next_value])))
                    next_value = bytearray()
            else:
                next_value += next_byte
            if len(pnm_header) == 2:
                stat = False
            index += 1
        pixel_arrays = img_arrays[index:]
        if self.invert == 1:
            for i in range(len(pixel_arrays)):
                pixel_arrays[i] = (~pixel_arrays[i]) & 0xff
        return pixel_arrays,(pnm_header[0], pnm_header[1])		

    def _bmp_decode(self, img_arrays):
        file_size = int.from_bytes(img_arrays[2:6], 'little')
        offset = int.from_bytes(img_arrays[10:14], 'little')
        width = int.from_bytes(img_arrays[18:22], 'little')
        height = int.from_bytes(img_arrays[22:26], 'little')
        bpp = int.from_bytes(img_arrays[28:30], 'little')
        if bpp != 1:
            raise TypeError("Only support 1 bit color bmp")
        line_bytes_size = (bpp * width + 31) // 32 * 4
        array_size = width * abs(height) // 8
        pixel_arrays = bytearray(array_size)
        if width % 8:
            array_row = width // 8 + 1
        else:
            array_row = width // 8
        array_col = height
        for i in range(array_col):
            for j in range(array_row):
                index = -(array_row * (i + 1) - j)
                _offset = offset + i * line_bytes_size + j
                if self.invert == 0:
                    pixel_byte = (~img_arrays[_offset]) & 0xff
                else:
                    pixel_byte = img_arrays[_offset]
                pixel_arrays[index] = pixel_byte
        return pixel_arrays,(width, height)
