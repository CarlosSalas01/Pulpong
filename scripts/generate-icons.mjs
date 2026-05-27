// scripts/generate-icons.mjs
// Genera icon-192.png e icon-512.png en public/ usando solo Node.js built-ins.
// Uso: node scripts/generate-icons.mjs

import { deflateSync } from 'zlib';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// ── CRC32 ──────────────────────────────────────────────────────────────────
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[i] = c;
}
function crc32(data) {
  let crc = 0xffffffff;
  for (const b of data) crc = crcTable[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

// ── PNG chunk ──────────────────────────────────────────────────────────────
function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.allocUnsafe(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

// ── PNG builder ────────────────────────────────────────────────────────────
function makePng(size, bgRGB, circleRGB) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR: width, height, bit depth=8, color type=2 (RGB)
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const cx = size / 2;
  const cy = size / 2;
  const radius = Math.round(size * 0.42);

  // Scanlines: filter byte (0) + RGB per pixel
  const rows = [];
  for (let y = 0; y < size; y++) {
    const row = Buffer.allocUnsafe(1 + size * 3);
    row[0] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const [r, g, b] = dx * dx + dy * dy <= radius * radius ? circleRGB : bgRGB;
      row[1 + x * 3] = r;
      row[1 + x * 3 + 1] = g;
      row[1 + x * 3 + 2] = b;
    }
    rows.push(row);
  }

  // deflateSync produces zlib-wrapped deflate (RFC 1950) — correct for PNG IDAT
  const idat = deflateSync(Buffer.concat(rows));

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', idat),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── Generate ───────────────────────────────────────────────────────────────
const publicDir = resolve(rootDir, 'public');
mkdirSync(publicDir, { recursive: true });

// Fondo oscuro (#1a1a1a) con círculo rojo (#D63A56) — identidad visual de la app
const bg = [26, 26, 26];
const red = [214, 58, 86];

writeFileSync(resolve(publicDir, 'icon-192.png'), makePng(192, bg, red));
writeFileSync(resolve(publicDir, 'icon-512.png'), makePng(512, bg, red));

console.log('✓ public/icon-192.png generado (192×192)');
console.log('✓ public/icon-512.png generado (512×512)');
console.log('  Reemplaza estos archivos con íconos reales cuando tengas el diseño final.');
