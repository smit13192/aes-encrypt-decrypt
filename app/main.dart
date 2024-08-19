import 'package:encrypt/encrypt.dart';

class AESCipher {
  static String key = "JUIPOUHZVBNMJKIOYUSGHYARTYUIOSKQ";
  // Static method for encryption
  static Map<String, String> encrypt(String plaintext) {
    // Convert the key into a 256-bit format
    final key256 = Key.fromUtf8(key);

    // Generate a random 128-bit IV (Initialization Vector)
    final iv128 = IV.fromSecureRandom(16);

    // Create an AES encrypter in CBC mode
    final encrypter = Encrypter(AES(key256, mode: AESMode.cbc));

    // Encrypt the plaintext using the key and IV
    final encrypted = encrypter.encrypt(plaintext, iv: iv128);

    // Return the encrypted data and IV as hexadecimal strings
    return {'encryptedData': encrypted.base16, 'iv': iv128.base16};
  }

  // Static method for decryption
  static String decrypt(String encryptedData, String iv) {
    // Convert the key into a 256-bit format
    final key256 = Key.fromUtf8(key);

    // Convert the IV from a hexadecimal string back into bytes
    final iv128 = IV.fromBase16(iv);

    // Create an AES encrypter in CBC mode
    final encrypter = Encrypter(AES(key256, mode: AESMode.cbc));

    // Decrypt the encrypted data using the key and IV
    final decrypted =
        encrypter.decrypt(Encrypted.fromBase16(encryptedData), iv: iv128);

    // Return the decrypted plaintext
    return decrypted;
  }
}

void main() {

  // Example of using the encrypt method
  final plaintext = "Hello, my name is Smit Monpara 🚀🚀";
  final encryptedValue = AESCipher.encrypt(plaintext);
  final decryptedData = AESCipher.decrypt(encryptedValue['encryptedData']!, encryptedValue['iv']!);

  // Print the encrypted and decrypted values
  print("Original: $plaintext");
  print("Encrypted Data: ${encryptedValue['encryptedData']}");
  print("IV: ${encryptedValue['iv']}");
  print("Decrypted Data: $decryptedData");
}
