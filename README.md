# [Lemonade](https://elkmire.github.io/Lemonade/) <- Click Here

## 1. Introduction

Lemonade is a secure, browser-based encryption application designed to provide strong message and file encryption without requiring any server-side processing. All cryptographic operations occur entirely within your browser, ensuring your sensitive data never leaves your device.

Key features:
- End-to-end encryption using industry-standard algorithms
- Multiple encryption methods (symmetric and asymmetric)
- Local key storage with password protection
- File and text encryption capabilities
- Progressive Web App support for offline usage
- Dark mode interface

Lemonade was designed as an "alternate security method" with a focus on client-side operations, making it suitable for users who need secure communications without relying on third-party services.

## 2. Getting Started

### Installation Options

Lemonade can be used in two ways:
1. **Browser-based**: Simply navigate to the Lemonade website to use it directly in your browser
2. **Installed PWA**: Install it as a Progressive Web App for offline access and a more app-like experience

### Installing as a PWA

To install Lemonade as a PWA:
1. Navigate to the Settings tab
2. Click the "Install Lemonade App" button when it becomes available
3. Follow your browser's installation prompts

### Initial Setup

Before you can encrypt or decrypt messages, you'll need to create at least one encryption key:
1. Go to the "Key Management" tab
2. Create a new key (details in the Key Management section)
3. Once you have a key, you can begin encrypting and decrypting messages

## 3. Key Management

The "Key Management" tab is where you create, import, export, and manage your encryption keys.

### Creating Keys

To create a new encryption key:
1. Enter a descriptive name in the "Key Name" field
2. Select your desired key type (see Key Types section below)
3. Choose an expiration period (optional but recommended)
4. Enter a strong password (optional but highly recommended)
5. Confirm your password
6. Click "Generate New Key"

### Key Types

Lemonade supports several encryption algorithms, each with different characteristics and security properties:

| Key Type | How It's Used in Lemonade | Security Level | Breaking Difficulty | Best Used For |
|----------|---------------------------|---------------|---------------------|--------------|
| AES-GCM (Symmetric) - 256 bits | Direct encryption of messages/files with a 12-byte IV and 128-bit authentication tag. Used alone or as part of hybrid encryption in RSA and ECC modes. | High | Extremely difficult: 2^256 possible keys, believed to be quantum-resistant. No known practical attacks against properly implemented AES-256. | Fast encryption of large files and messages when both parties can securely share the key. Provides excellent performance even on mobile devices. |
| RSA-OAEP (Asymmetric) - 2048 bits | Used in hybrid mode: generates a random AES key for the actual data encryption, then encrypts this AES key with RSA. Uses SHA-256 for the hash function. | Medium | Difficult with current technology: requires approximately 2^112 operations to break with classical computers. Vulnerable to quantum computers using Shor's algorithm. | Secure messaging where only the recipient's public key is needed for encryption. Allows secure communication without prior exchange of secret keys - the sender only needs the recipient's public key (contained in their .lim file) to encrypt messages that only the recipient can decrypt. |
| RSA-OAEP (Asymmetric) - 4096 bits | Same hybrid approach as 2048-bit RSA, but with larger key size. More resource-intensive during encryption/decryption. | High | Very difficult: requires approximately 2^128 operations with classical computers. Still vulnerable to quantum computing but would require more qubits than 2048-bit. | High-security communications where stronger protection is worth the performance tradeoff. Recommended for particularly sensitive information. |
| ECC (Asymmetric) - P-256 | Creates ephemeral key pairs for forward secrecy. Uses ECDH for shared secret derivation, then derives an AES key to encrypt the actual message. | Medium | Difficult: Security comparable to RSA-3072 (~2^128 operations), but with much shorter key lengths. Vulnerable to quantum attacks. | Efficient secure communications on devices with limited computing power. Offers good security with less computational overhead than equivalent-strength RSA. |
| ECC (Asymmetric) - P-384 | Same approach as P-256 but with larger curve parameters for higher security margin. | High | Very difficult: Equivalent to approximately RSA-7680 (~2^192 operations). Still vulnerable to quantum computing but requires more qubits than P-256. | High-security communications with better performance than RSA-4096. Good balance of strong security and reasonable performance. |

### Password Protection

Adding password protection to your keys provides an additional layer of security. With password protection:
- The key itself is encrypted using a key derived from your password
- You'll need to enter the password each time you use the key
- Even if someone gains access to your device or exported keys, they won't be able to use them without the password

To set a password:
1. When creating a key, enter a strong password in the "Key Password" field
2. The password strength meter will help you evaluate your password's security
3. Confirm the password and generate the key

### Key Expiration

Setting expiration dates for keys is a security best practice:

1. When creating a key, select a time period from the "Key Expiration" dropdown
2. Options range from 30 days to 1 year
3. After expiration, keys will be automatically removed from your key storage
4. This limits the impact of a potentially compromised key

### Importing and Exporting Keys

#### Exporting Individual Keys
1. In the Key Management tab, find the key you want to export
2. Click the "Export" button for that key
3. The key will download as a .lim file (Lemonade Key Format)

For RSA and ECC keys, the .lim file contains both the public and private key components. The public key portion can be safely shared with others to allow them to encrypt messages that only you can decrypt with your private key.

#### Exporting All Keys
1. In the Key Management tab, click "Export All Keys"
2. You'll be prompted to set a password for the backup (highly recommended)
3. All keys will be exported to a single JSON file
4. This JSON contains your complete key collection and should be kept secure

#### Importing Keys
1. In the Key Management tab, click "Import Key"
2. Select a .lim file containing a previously exported key
3. If a key with the same ID exists, you'll be asked if you want to overwrite it

#### Sharing Public Keys
For asymmetric encryption (RSA and ECC), you can:
1. Export your key as a .lim file
2. Share this file with someone who wants to send you encrypted messages
3. They can import your .lim file into their Lemonade app
4. They can then encrypt messages that only you can decrypt

Note: When using password-protected keys, the recipient doesn't need your password to encrypt messages to you, but you'll need your password to decrypt their messages.

### Deleting Keys

To delete a key:
1. In the Key Management tab, find the key you want to delete
2. Click the "Delete" button for that key
3. Confirm the deletion when prompted

To delete all keys:
1. At the bottom of the Key Management tab, click "ZERO ALL KEYS"
2. Confirm the deletion when prompted

## 4. Encrypting Messages

To encrypt a message or file:

1. Navigate to the "Encrypt" tab
2. Enter your message in the "To Encrypt" text area, or click "Browse Files" to select a file
3. Choose an encryption key from the dropdown menu
4. If the key is password-protected, enter the password
5. Click "Encrypt Data"
6. The encrypted output will appear in the "Encrypted Data" text area
7. You can download the encrypted data as a file or copy it to your clipboard

### Key Selection for Encryption

When selecting a key for encryption:

- **For your own use**: Choose any key type you own (AES, RSA, or ECC)
- **For sending to others**:
  - If using symmetric encryption (AES): Both you and the recipient must have the same key (share the .lim file securely)
  - If using asymmetric encryption (RSA or ECC): Use the recipient's public key (contained in their .lim file) to encrypt. They will decrypt with their private key

### File Encryption

When encrypting a file:
1. Click "Browse Files" and select the file you want to encrypt
2. After encryption, the file data will be encrypted and can be downloaded with a .lmn extension (.lmn is the Lemonade encrypted message format)
3. The encrypted file contains both the encrypted data and metadata about the file, including:
   - The original filename
   - File size
   - Encryption algorithm used
   - Key ID used for encryption
   - Timestamp of encryption

## 5. Decrypting Messages

To decrypt a message or file:

1. Navigate to the "Decrypt" tab
2. Paste the encrypted message into the "To Decrypt" text area, or click "Browse Files" to select an encrypted file
3. Choose the appropriate decryption key from the dropdown menu (must be the same key used for encryption)
4. If the key is password-protected, enter the password
5. Click "Decrypt Data"
6. The decrypted output will appear in the "Decrypted Data" text area
7. You can download the decrypted data or copy it to your clipboard

### File Decryption

When decrypting a file:
1. Upload the .lmn file or paste the encrypted file contents into the "To Decrypt" field
2. After decryption, the original file name and size will be displayed
3. You can download the decrypted file with its original name

## 6. Security Settings

The "Settings" tab allows you to configure various security options.

### Storage Options

#### IndexedDB vs LocalStorage
- **Use IndexedDB for key storage**: Enabled by default. IndexedDB provides more secure and robust storage for your keys.
- **Session-only mode**: When enabled, keys aren't saved when the browser closes, providing additional security at the cost of convenience.

### Security Parameters

#### Password Protection and Key Expiration
- **Enforce password protection for keys**: When enabled, all new keys must have password protection.
- **Enforce key expiration**: When enabled, all new keys must have an expiration date.

#### PBKDF2 Iterations
This setting controls how many iterations are used when deriving keys from passwords:
- Higher values provide better security but slower performance
- Lower values are faster but provide less protection against brute force attacks
- Default is 100,000 iterations

### Security Posture

Each key displays its security level:
- **HIGH**: Password-protected keys using AES-256, RSA-4096, or ECC P-384
- **MEDIUM**: Password-protected keys using RSA-2048 or ECC P-256
- **LOW**: Any key without password protection

## 7. Progressive Web App Features

Lemonade is built as a Progressive Web App (PWA), which provides several advantages:

### Offline Capability
- Once installed, Lemonade works entirely offline
- All encryption/decryption happens locally in your browser
- No internet connection required after initial installation

### Installation
- Install Lemonade on your device for quick access
- Chromium-based or Safari required
- Works on desktop and mobile devices
- Runs in a standalone window without browser controls

### Updates
- Lemonade automatically checks for updates when online
- Updates are applied when the app is restarted
- Your keys and settings are preserved during updates

## 8. Security Best Practices

For maximum security when using Lemonade:

### Key Management
- Use password protection for all keys
- Set expiration dates for sensitive keys
- Export and backup your keys regularly, with password protection
- Use stronger key types (AES-256, RSA-4096, ECC P-384) for sensitive data

### Application Settings
- Enable "Enforce password protection" and "Enforce key expiration"
- Consider using "Session-only mode" for temporary encryption needs
- Use higher PBKDF2 iterations (200,000+) for stronger password protection

### Safe Usage
- Keep your device and browser updated
- Be cautious about who can access your device
- Clear the decrypted data after use by clicking "Clear All"

## 9. Troubleshooting

### Common Issues and Solutions

#### "Invalid password or corrupted key" Error
- Make sure you're using the correct password for the key
- If you've forgotten the password, you cannot recover the key - you'll need to create a new one

#### "This message was not encrypted with the selected key" Error
- Make sure you're using the same key that was used to encrypt the message
- If you're decrypting a message from someone else, ensure you have the correct key

#### Storage Issues
- If keys aren't being saved, check your browser's privacy settings
- Some private browsing modes prevent persistent storage
- Try switching between IndexedDB and localStorage in settings

#### Installation Problems
- PWA installation requires a secure context (HTTPS)
- Some browsers have specific requirements for PWA installation (Chromium or Safari)
- Ensure you're using a modern, updated browser

## 10. Technical Details

### Encryption Algorithms

#### AES-GCM
- 256-bit key length
- 12-byte IV (Initialization Vector)
- 128-bit authentication tag
- Used for direct encryption or as part of hybrid encryption

#### RSA-OAEP
- Available in 2048-bit and 4096-bit key lengths
- Uses SHA-256 for the hash function
- Used in a hybrid scheme with AES-GCM for message encryption

#### ECC (Elliptic Curve Cryptography)
- Available with P-256 and P-384 curves
- Used with ECDH for key exchange
- Paired with AES-GCM for hybrid encryption

### Password-Based Key Derivation

- Uses PBKDF2 (Password-Based Key Derivation Function 2)
- Configurable iteration count (default: 100,000)
- SHA-256 hash function
- 16-byte random salt per key
- Derives a 256-bit key used for AES-GCM encryption of the actual cryptographic keys

### Local Storage

Two primary storage mechanisms:
- IndexedDB: Primary storage method, more secure and with larger capacity
- localStorage: Fallback storage method with broader compatibility

When using password protection, the keys themselves are encrypted before storage using the derived key from the password.

### Data Processing

All cryptographic operations happen client-side using the Web Cryptography API:
- No data is ever sent to a server
- Encryption/decryption occurs entirely in the browser
- The service worker provides offline capability while maintaining security

---

*Lemonade is a client-side application. All encryption and decryption operations are performed locally in your browser. No data is sent to any server, ensuring maximum privacy and security.*
