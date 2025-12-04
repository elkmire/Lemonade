# [LC6](https://elkmire.github.io/Lemonade/) <- Click Here

# LC6: Offline Encryption System

## Table of Contents
1. [Overview](#overview)
2. [Key Management](#key-management)
3. [Encryption/Decryption Operations](#encryptiondecryption-operations)
4. [File Types](#file-types)
5. [PWA Installation](#pwa-installation)
6. [Air-Gap Implementation Strategy](#air-gap-implementation-strategy)
7. [Technical Specifications](#technical-specifications)
8. [Security Considerations](#security-considerations)

## Overview

LC6 (also called "Lemonade") is a browser-based encryption tool designed for secure message and file encryption with zero network dependencies. The application runs entirely in your browser, ensuring your sensitive data never leaves your device during the encryption or decryption process.

**Key Features:**
- Complete offline functionality
- Multiple encryption algorithms (AES, RSA, ECC)
- Key generation and management with expiration
- Password-protected keys
- Digital signatures for message authentication
- File encryption with drag-and-drop support
- Progressive Web App capabilities for offline use
- Customizable dark mode themes (Lemon, Burnt, Zulu)
- A "Learn" tab to understand the app's features
- Zero server dependencies

LC6 stores all encryption keys and settings locally in your browser's protected storage. This design creates a "trust nothing" security model where you maintain complete control over your encryption keys and data.

## Key Management

### Creating Keys

1. Navigate to the **Key Management** tab
2. Enter a name for your key in the "Key Name" field
3. Select the key type:
   - **AES-GCM (Symmetric)** - 256 bits: Fastest option, same key encrypts and decrypts
   - **RSA-OAEP (Asymmetric)** - 2048 bits: Public/private key pair, moderate security
   - **RSA-OAEP (Asymmetric)** - 4096 bits: Public/private key pair, higher security
   - **ECC (Asymmetric)** - P-256: Elliptic curve public/private key pair, compact
   - **ECC (Asymmetric)** - P-384: Elliptic curve with higher security level
   - **ECC (Asymmetric)** - P-521: Elliptic curve with the highest security level

4. Set an expiration period (optional but recommended)
5. Add a key password (highly recommended)
   - Password strength is displayed dynamically
   - Green indicates a strong password
6. Click "Generate New Key"

### Understanding Key Types

**Symmetric Keys (AES):**
- Same key used for both encryption and decryption
- Simpler to use but requires secure key exchange
- Best for personal use or when you can securely share the key

**Asymmetric Keys (RSA/ECC):**
- Creates a key pair: public key (for encryption) and private key (for decryption)
- Public key can be freely shared with others who want to send you encrypted messages
- Private key must be kept secure and never shared
- Best for communication between multiple parties

### Key Security Badges

Keys display security level badges based on their configuration:
- **HIGH**: Strong encryption with password protection and expiration
- **MEDIUM**: Good encryption with some security features
- **LOW**: Basic encryption with minimal additional protections

### Exporting and Importing Keys

**Exporting:**
1. In the Key Management tab, find the key you want to export
2. Click "Export" for an AES key or "Export Public" for asymmetric keys
3. To export a private key (high-risk operation):
   - Click "Private Key"
   - Confirm the security warning
   - Add a password to protect the exported private key

**Importing:**
1. Click "Import Key"
2. Select the key file (.lim or .lem)
3. Enter the password if the key is protected

### Key State Management

For backup and transfer between devices:
1. Click "Export State" to export all keys
2. Password-protect your exported state (highly recommended)
3. Use "Import State" on another device to restore your keys

### Emergency Key Deletion

The "ZERO ALL KEYS" button permanently deletes all keys from your browser storage. Use this in emergency situations when you need to quickly remove all cryptographic material.

### Theming

LC6 includes several dark mode themes to customize the application's appearance. You can choose from the following themes in the **Settings** tab:
- **Lemon:** A zesty theme.
- **Burnt:** A theme with orange and brown tones.
- **Zulu:** A theme with magenta and pink tones.

## Encryption/Decryption Operations

### Encrypting Messages or Files

1. Navigate to the **Encrypt** tab
2. Enter your message in the text area or click "Browse Files" to select a file
3. Select your encryption key from the dropdown
4. Enter the key password if required
5. (Optional) Enter an "Extra Option" for an additional layer of obfuscation
6. (Optional) Set the "Iterate" count to re-encrypt the data multiple times
7. Click "Encrypt Data"
8. Copy the encrypted output or download as a file

### Decrypting Messages or Files

1. Navigate to the **Decrypt** tab
2. Paste the encrypted data or click "Browse Files" to select an encrypted file
3. Select the appropriate decryption key
   - For AES: use the same key used for encryption
   - For RSA/ECC: use the private key corresponding to the public key used for encryption
4. Enter the key password if required
5. If an "Extra Option" was used during encryption, enter the same value
6. Set the "Iterate" count to the same value used during encryption
7. Click "Decrypt Data"
8. View the decrypted output or download the decrypted file

### Digital Signatures

When using asymmetric keys (RSA or ECC), you can digitally sign your messages to prove their authenticity and integrity.

**Signing a Message:**
1. On the **Encrypt** tab, enable the "Sign Message" toggle after selecting an asymmetric key.
2. The encrypted output will include a digital signature.

**Verifying a Signature:**
1. On the **Decrypt** tab, enable the "Verify Signature" toggle.
2. After decryption, the application will confirm whether the signature is valid. A valid signature ensures the message was sent by the holder of the private key and was not tampered with.

### File Handling

When encrypting files:
1. The file is read into memory without uploading to any server
2. File metadata (name, size) is preserved in the encryption
3. Download the encrypted file with the ".lmn" extension
4. When decrypted, the original filename is restored

## File Types

Lemonade uses several file extensions to differentiate between encrypted data and key files:

| Extension | Description |
|-----------|-------------|
| `.lmn` | Encrypted data file |
| `.lim` | Public key or AES key export |
| `.lem` | Private key export (highly sensitive) |
| `.state` | Full application state export with all keys |

### File Format Details

**Key Files**:
- Contain JSON-structured data with Base64-encoded cryptographic material
- May include additional metadata like creation date and expiration
- Private key files (.lem) should always be password-protected

## PWA Installation

Lemonade can be installed as a Progressive Web App for offline access:

1. Open LC6.html in a supported browser (Chrome, Edge, or Safari on iOS)
2. Go to the **Settings** tab
3. Click "Install Lemonade App" when the button is enabled
4. Confirm the installation prompt from your browser

After installation:
- The app will appear on your device's home screen or app launcher
- It can run entirely offline

## Air-Gap Implementation Strategy

For maximum security, Lemonade can be deployed in an air-gapped environment:

### Setup Phase

1. **Initial Transfer**:
   - Transfer LC6.html to an air-gapped computer via a fresh, write-once USB drive
   - Scan the file with an offline virus scanner as a precaution
   - Open the file in a browser on the air-gapped system

2. **Key Generation**:
   - Generate all encryption keys on the air-gapped system
   - Configure strong passwords and expiration dates
   - Export public keys only for asymmetric encryption

### Operational Usage

1. **Encrypting on Air-Gapped System**:
   - Compose sensitive messages or prepare files on the air-gapped computer
   - Encrypt using Lemonade
   - Save the encrypted data to a clean USB drive

2. **Transferring Encrypted Data**:
   - Move the USB drive to an internet-connected computer
   - Send the encrypted data via any channel (even unsecured)
   - The encryption ensures confidentiality regardless of transmission method

3. **Receiving Encrypted Data**:
   - Download encrypted messages to a USB drive
   - Transfer to the air-gapped system
   - Decrypt using your private key that never left the secure environment

### Key Exchange Procedures

For asymmetric encryption in an air-gapped environment:

1. **Public Key Distribution**:
   - Generate key pairs on the air-gapped machine
   - Export only public keys (.lim files)
   - Share public keys with communication partners

2. **Private Key Protection**:
   - Never export private keys unless absolutely necessary
   - If export is required, use password protection and secure transfer
   - Consider generating new keys periodically

3. **Emergency Procedures**:
   - Use the "ZERO ALL KEYS" function in case of compromise
   - Configure "Session-only mode" in settings for heightened security periods

## Learn Section

LC6 includes a new **Learn** tab that provides a comprehensive overview of the application's features. This section is designed to help users understand the core concepts of encryption, key management, and security best practices. It covers:
- **Core Functionality:** A detailed explanation of the Encrypt and Decrypt tabs, including digital signatures, the "Extra Option" for obfuscation, and the "Iterate" feature.
- **Key Management:** An overview of the different key types (AES, RSA, ECC), how to generate and manage them, and the importance of key passwords.
- **Settings:** An explanation of the various security and appearance settings that can be configured.

## Technical Specifications

### Encryption Algorithms

**AES-GCM (Symmetric)**:
- Key length: 256 bits
- Initialization Vector (IV): 12 bytes (96 bits)
- Authentication tag: 128 bits
- PBKDF2 for password-based key derivation

**RSA-OAEP (Asymmetric)**:
- Key sizes: 2048 or 4096 bits
- Hash function: SHA-256
- Public exponent: 65537 (0x10001)
- PKCS#8 format for private keys
- SubjectPublicKeyInfo (SPKI) format for public keys

**ECC (Elliptic Curve)**:
- Curves: P-256, P-384, or P-521
- ECDH for key agreement
- AES-GCM for payload encryption
- HKDF for key derivation

### Digital Signature Algorithms

**RSA-PSS**:
- Used for digital signatures with RSA keys
- Hash function: SHA-512
- Salt length: 32 bytes

**ECDSA**:
- Used for digital signatures with ECC keys
- Hash function: SHA-512

### Storage Security

**Storage Options**:
- IndexedDB (default, more secure)
- LocalStorage (fallback)
- Session-only mode (keys erased when browser closes)

**Password Protection**:
- PBKDF2 key derivation
- Configurable iterations (100,000 to 500,000)
- Individual key password protection
- Optional global enforcement of password protection

## Security Considerations

### Strengths

1. **Zero Network Exposure**:
   - No data leaves your device during encryption/decryption
   - No server dependencies or API calls
   - Works completely offline

2. **Modern Cryptography**:
   - Industry-standard encryption algorithms
   - Secure key generation using Web Crypto API
   - Forward secrecy with ephemeral keys in asymmetric operations

3. **Defense-in-Depth**:
   - Password-protected keys
   - Automatic key expiration
   - Session-only mode option
   - Emergency key zeroing function

### Limitations and Best Practices

1. **Browser Security**:
   - Security depends on browser integrity
   - Use updated, mainstream browsers
   - Consider using a dedicated browser profile for encryption tasks

2. **Key Management**:
   - Browser storage is not impervious to sophisticated malware
   - Export and backup keys securely
   - Consider hardware-based key storage for the highest security needs

3. **Metadata Considerations**:
   - Encrypted messages still reveal timing and size information
   - Consider regular communication patterns to minimize traffic analysis
   - Be mindful of device timestamps embedded in metadata

4. **Physical Security**:
   - For highest security, use on an air-gapped computer
   - Be aware of shoulder-surfing during key entry
   - Consider screen privacy filters for public use

5. **Clear Memory**:
   - Close the browser after sensitive operations
   - Enable session-only mode for maximum security

### Recommended Security Configuration

For maximum security:
1. Enable "Enforce password protection for keys"
2. Enable "Enforce key expiration"
3. Set PBKDF2 iterations to 500,000 (balance of security vs. speed)
4. Enable "Session-only mode" for highly sensitive operations
5. Use the dark mode interface to reduce visual signature
6. Regularly generate new keys and securely delete old ones

By following these practices and understanding the technical foundations of LC6/Lemonade, you can achieve a high level of communications security, even against sophisticated adversaries.

*Lemonade is a client-side application. All encryption and decryption operations are performed locally in your browser. No data is sent to any server, ensuring maximum privacy and security.*
