class Crypt {
    constructor(obj){
        this.crypto = obj.crypto;
    }
    decryptMessage(data, iv, key) {
        try {
            iv = Buffer.from(iv, 'hex');
            const decipher = this.crypto.createDecipheriv('aes-256-cbc', key, iv);
            const decryptedBuffer = Buffer.concat([decipher.update(Buffer.from(data, 'hex')), decipher.final()]);
            return decryptedBuffer.toString('utf8');
        } catch {
            console.log('[msgcrypt.js] Decrypt failed!', err);
        }
    }
    encryptMessage(data, key) {
        try {
            const iv = this.crypto.randomBytes(16);
            const cipher = this.crypto.createCipheriv('aes-256-cbc', key, iv);
            const encryptedBuffer = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
            const encryptedMessage = encryptedBuffer.toString('hex');
            return ({ data: encryptedMessage, iv: iv.toString('hex') });
        } catch (err) {
            console.log('[msgcrypt.js] Encrypt failed!', err);
        }
    }
}
module.exports = Crypt;