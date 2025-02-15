import * as CryptoJS from 'crypto-js';

const KEY = process.env.ENCRIPTED_KEY

export function decrypt(ciphertext:string) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, KEY!);
    return bytes.toString(CryptoJS.enc.Utf8);
}
