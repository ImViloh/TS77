/**
 * SHA-256 using only arithmetic on values that fit in a JavaScript number.
 * TypeScriptToLua emits the same math for Lua 5.4, which has no crypto library.
 * The Node companion verifies with this function, not a separate implementation.
 */

function add32(left: number, right: number): number {
    return (left + right) % 4294967296;
}

function and32(left: number, right: number): number {
    let out = 0;
    let place = 1;
    for (let index = 0; index < 32; index++) {
        if (Math.floor(left / place) % 2 === 1 && Math.floor(right / place) % 2 === 1) out += place;
        place *= 2;
    }
    return out;
}

function xor32(left: number, right: number): number {
    let out = 0;
    let place = 1;
    for (let index = 0; index < 32; index++) {
        const leftBit = Math.floor(left / place) % 2;
        const rightBit = Math.floor(right / place) % 2;
        if (leftBit !== rightBit) out += place;
        place *= 2;
    }
    return out;
}

function not32(value: number): number {
    return 4294967295 - value;
}

function shr(value: number, shift: number): number {
    return Math.floor(value / Math.pow(2, shift));
}

function rotr(value: number, shift: number): number {
    let out = 0;
    let place = 1;
    for (let index = 0; index < 32; index++) {
        const from = (index + shift) % 32;
        if (Math.floor(value / Math.pow(2, from)) % 2 === 1) out += place;
        place *= 2;
    }
    return out;
}

function readU32(bytes: number[], offset: number): number {
    return bytes[offset] * 16777216 + bytes[offset + 1] * 65536 + bytes[offset + 2] * 256 + bytes[offset + 3];
}

function pushU32(bytes: number[], value: number): void {
    bytes.push(Math.floor(value / 16777216) % 256);
    bytes.push(Math.floor(value / 65536) % 256);
    bytes.push(Math.floor(value / 256) % 256);
    bytes.push(value % 256);
}

const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

export function sha256Bytes(message: number[]): number[] {
    const bytes: number[] = [];
    for (let index = 0; index < message.length; index++) bytes.push(message[index]);
    const bitLength = message.length * 8;
    bytes.push(0x80);
    while (bytes.length % 64 !== 56) bytes.push(0);
    pushU32(bytes, Math.floor(bitLength / 4294967296));
    pushU32(bytes, bitLength % 4294967296);

    let h0 = 0x6a09e667;
    let h1 = 0xbb67ae85;
    let h2 = 0x3c6ef372;
    let h3 = 0xa54ff53a;
    let h4 = 0x510e527f;
    let h5 = 0x9b05688c;
    let h6 = 0x1f83d9ab;
    let h7 = 0x5be0cd19;

    for (let offset = 0; offset < bytes.length; offset += 64) {
        const w: number[] = [];
        for (let index = 0; index < 16; index++) w.push(readU32(bytes, offset + index * 4));
        for (let index = 16; index < 64; index++) {
            const s0 = xor32(xor32(rotr(w[index - 15], 7), rotr(w[index - 15], 18)), shr(w[index - 15], 3));
            const s1 = xor32(xor32(rotr(w[index - 2], 17), rotr(w[index - 2], 19)), shr(w[index - 2], 10));
            w.push(add32(add32(w[index - 16], s0), add32(w[index - 7], s1)));
        }
        let a = h0;
        let b = h1;
        let c = h2;
        let d = h3;
        let e = h4;
        let f = h5;
        let g = h6;
        let h = h7;
        for (let index = 0; index < 64; index++) {
            const s1 = xor32(xor32(rotr(e, 6), rotr(e, 11)), rotr(e, 25));
            const ch = xor32(and32(e, f), and32(not32(e), g));
            const temp1 = add32(add32(add32(add32(h, s1), ch), K[index]), w[index]);
            const s0 = xor32(xor32(rotr(a, 2), rotr(a, 13)), rotr(a, 22));
            const maj = xor32(xor32(and32(a, b), and32(a, c)), and32(b, c));
            const temp2 = add32(s0, maj);
            h = g;
            g = f;
            f = e;
            e = add32(d, temp1);
            d = c;
            c = b;
            b = a;
            a = add32(temp1, temp2);
        }
        h0 = add32(h0, a);
        h1 = add32(h1, b);
        h2 = add32(h2, c);
        h3 = add32(h3, d);
        h4 = add32(h4, e);
        h5 = add32(h5, f);
        h6 = add32(h6, g);
        h7 = add32(h7, h);
    }

    const digest: number[] = [];
    pushU32(digest, h0);
    pushU32(digest, h1);
    pushU32(digest, h2);
    pushU32(digest, h3);
    pushU32(digest, h4);
    pushU32(digest, h5);
    pushU32(digest, h6);
    pushU32(digest, h7);
    return digest;
}

export function utf8Bytes(text: string): number[] {
    const bytes: number[] = [];
    for (let index = 0; index < text.length; index++) {
        let code = text.charCodeAt(index);
        if (code >= 0xd800 && code <= 0xdbff && index + 1 < text.length) {
            const next = text.charCodeAt(index + 1);
            if (next >= 0xdc00 && next <= 0xdfff) {
                code = 0x10000 + (code - 0xd800) * 1024 + (next - 0xdc00);
                index++;
            }
        }
        if (code < 0x80) bytes.push(code);
        else if (code < 0x800) {
            bytes.push(0xc0 + Math.floor(code / 64));
            bytes.push(0x80 + (code % 64));
        } else if (code < 0x10000) {
            bytes.push(0xe0 + Math.floor(code / 4096));
            bytes.push(0x80 + (Math.floor(code / 64) % 64));
            bytes.push(0x80 + (code % 64));
        } else {
            bytes.push(0xf0 + Math.floor(code / 262144));
            bytes.push(0x80 + (Math.floor(code / 4096) % 64));
            bytes.push(0x80 + (Math.floor(code / 64) % 64));
            bytes.push(0x80 + (code % 64));
        }
    }
    return bytes;
}

const HEX = "0123456789abcdef";

export function hexBytes(bytes: number[]): string {
    let out = "";
    for (let index = 0; index < bytes.length; index++) {
        const byte = bytes[index];
        out += HEX.charAt(Math.floor(byte / 16));
        out += HEX.charAt(byte % 16);
    }
    return out;
}

export function sha256Hex(text: string): string {
    return hexBytes(sha256Bytes(utf8Bytes(text)));
}

export function hmacSha256Hex(secret: string, message: string): string {
    const block = 64;
    let key = utf8Bytes(secret);
    if (key.length > block) key = sha256Bytes(key);
    const inner: number[] = [];
    const outer: number[] = [];
    for (let index = 0; index < block; index++) {
        const byte = index < key.length ? key[index] : 0;
        inner.push(xor32(byte, 0x36));
        outer.push(xor32(byte, 0x5c));
    }
    const messageBytes = utf8Bytes(message);
    for (let index = 0; index < messageBytes.length; index++) inner.push(messageBytes[index]);
    const mixed = sha256Bytes(inner);
    for (let index = 0; index < mixed.length; index++) outer.push(mixed[index]);
    return hexBytes(sha256Bytes(outer));
}
