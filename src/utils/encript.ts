'use client'
import * as CryptoJS from 'crypto-js';
const KEY = process.env.NEXT_PUBLIC_ENCRIPTED_CLIENT_KEY
export function encrypt(text:string) {
    return CryptoJS.AES.encrypt(text, KEY!).toString();
}
