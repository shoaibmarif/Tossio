import fs from 'fs';
import zlib from 'zlib';

function createCoinPNG(size) {
  const width = size;
  const height = size;
  const radius = size * 0.45;
  const cx = size / 2;
  const cy = size / 2;

  // Uncompressed RGBA scanlines (each row begins with filter byte 0)
  const rowBytes = 1 + width * 4;
  const rawData = Buffer.alloc(rowBytes * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        // Coin metallic gradient simulation
        const rimDist = radius - dist;
        if (rimDist < size * 0.05) {
          // Dark gold outer edge
          rawData[pxOffset] = 180;
          rawData[pxOffset + 1] = 83;
          rawData[pxOffset + 2] = 9;
          rawData[pxOffset + 3] = 255;
        } else {
          // Golden gradient
          const factor = Math.max(0, Math.min(1, (x + y) / (size * 1.5)));
          rawData[pxOffset] = Math.round(251 - factor * 70);
          rawData[pxOffset + 1] = Math.round(191 - factor * 90);
          rawData[pxOffset + 2] = Math.round(36 - factor * 26);
          rawData[pxOffset + 3] = 255;
        }
      } else {
        // Transparent
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
      }
    }
  }

  // Deflate IDAT
  const compressedIDAT = zlib.deflateSync(rawData);

  // CRC32 implementation
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const full = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(full), 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth
  ihdrData[9] = 6; // RGBA color type
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace
  const ihdr = makeChunk('IHDR', ihdrData);

  // IDAT
  const idat = makeChunk('IDAT', compressedIDAT);

  // IEND
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

fs.writeFileSync('./public/icon-192.png', createCoinPNG(192));
fs.writeFileSync('./public/icon-512.png', createCoinPNG(512));
console.log('Successfully generated public/icon-192.png and public/icon-512.png');
