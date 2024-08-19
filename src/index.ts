import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

class AESCipher {
    // Static property for the encryption key, converted to a Buffer
    // The key is a 256-bit (32 bytes) string
    static key: Buffer = Buffer.from("JUIPOUHZVBNMJKIOYUSGHYARTYUIOSKQ");

    // Static method to encrypt a given plaintext
    static encrypt(text: string) {
        // Generate a random 16-byte (128-bit) initialization vector (IV)
        const iv: Buffer = randomBytes(16);

        // Create a cipher using the AES-256-CBC algorithm, the key, and the IV
        const cipher = createCipheriv('aes-256-cbc', this.key, iv);

        // Encrypt the plaintext, specifying 'utf-8' as input encoding and 'hex' as output encoding
        let encrypted = cipher.update(text, 'utf-8', 'hex');

        // Finalize the encryption process and append any remaining encrypted data
        encrypted += cipher.final('hex');

        // Return an object containing the encrypted data and the IV used (converted to a hex string)
        return { encryptedData: encrypted, iv: iv.toString('hex') };
    }

    // Static method to decrypt the encrypted data
    static decrypt(encryptedData: string, iv: string) {
        // Create a decipher using the AES-256-CBC algorithm, the key, and the provided IV (converted back from hex to Buffer)
        const decipher = createDecipheriv('aes-256-cbc', this.key, Buffer.from(iv, 'hex'));

        // Decrypt the data, specifying 'hex' as input encoding and 'utf-8' as output encoding
        let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');

        // Finalize the decryption process and append any remaining decrypted data
        decrypted += decipher.final('utf8');

        // Return the decrypted plaintext
        return decrypted;
    }
}

// Example usage
const original = "Hello, I am Smit Monpara";

// Encrypt the original text
let { encryptedData, iv } = AESCipher.encrypt(original);

// Decrypt the encrypted text
let decryptData = AESCipher.decrypt(encryptedData, iv);

// Log the results
console.log("Original:", original);
console.log("Encrypted Data:", encryptedData);
console.log("IV:", iv);
console.log("Decrypted Data:", decryptData);
