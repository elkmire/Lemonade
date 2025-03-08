# [Lemonade](https://elkmire.github.io/Lemonade/) <- Click Here

# Lemonade User Manual

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Key Management](#key-management)
   - [Creating Keys](#creating-keys)
   - [Key Types](#key-types)
   - [Password Protection](#password-protection)
   - [Key Expiration](#key-expiration)
   - [Importing and Exporting Keys](#importing-and-exporting-keys)
4. [Encrypting Messages](#encrypting-messages)
5. [Decrypting Messages](#decrypting-messages)
6. [Security Settings](#security-settings)
   - [Storage Options](#storage-options)
   - [Security Parameters](#security-parameters)
   - [Auto-Timeout](#auto-timeout)
   - [Data Protection](#data-protection)
7. [Progressive Web App Features](#progressive-web-app-features)
8. [Security Best Practices](#security-best-practices)
9. [Troubleshooting](#troubleshooting)
10. [Technical Details](#technical-details)

## Introduction

Lemonade is a secure, browser-based application for message encryption and decryption. It employs modern cryptographic algorithms to ensure your communications remain private. All cryptographic operations are performed locally in your browser, and no data is sent to any servers, providing a high level of privacy and security.

**Key Features:**
- Strong encryption using industry-standard algorithms (AES, RSA, ECC)
- Local-only storage of encryption keys
- Password protection for sensitive keys
- Key management with expiration dates
- Progressive Web App capabilities for offline use
- Dark/light mode support
- Session timeout for additional security

## Getting Started

### Interface Overview

Lemonade has four main tabs:
1. **Encrypt** - For encrypting new messages
2. **Decrypt** - For decrypting messages you've received
3. **Key Management** - For creating, importing, exporting, and managing your encryption keys
4. **Settings** - For configuring security and application preferences

To begin using Lemonade, you'll first need to create at least one encryption key.

## Key Management

### Creating Keys

1. Navigate to the **Key Management** tab
2. Fill in the following fields:
   - **Key Name**: A descriptive name for your key
   - **Key Type**: Select the encryption algorithm (see [Key Types](#key-types) below)
   - **Key Expiration**: Optional expiration date for the key
   - **Key Password**: Recommended for additional security
3. Click **Generate New Key**

### Key Types

Lemonade supports the following encryption methods:

- **AES-GCM (Symmetric) - 256 bits**:
  - Fast and efficient
  - Same key is used for both encryption and decryption
  - Best for personal use or when you can securely share the key
  
- **RSA-OAEP (Asymmetric) - 2048 bits**:
  - Creates a key pair (public and private keys)
  - Messages encrypted with the public key can only be decrypted with the private key
  - Moderate security level
  
- **RSA-OAEP (Asymmetric) - 4096 bits**:
  - Similar to 2048-bit RSA but with stronger security
  - Slower performance but higher security
  
- **ECC (Asymmetric) - P-256**:
  - Elliptic Curve Cryptography
  - Provides strong security with smaller key sizes than RSA
  - Good balance of security and performance
  
- **ECC (Asymmetric) - P-384**:
  - Higher security variant of ECC
  - Recommended for highly sensitive information

### Password Protection

For added security, keys can be protected with a password:

1. Enter a strong password in the **Key Password** field
2. Confirm the password in the **Confirm Password** field
3. The password strength meter will indicate how secure your password is

**Note:** If you forget a key password, there is no recovery method - the key becomes unusable.

### Key Expiration

Setting an expiration date for keys is a security best practice:

1. Select a timeframe from the **Key Expiration** dropdown
2. The key will automatically be deleted after this period
3. This helps limit exposure if a key is compromised

### Importing and Exporting Keys

**Exporting Keys:**
1. In the **Key Management** tab, find the key you want to export
2. Click the **Export** button next to the key
3. The key will be copied to your clipboard or saved as a file

**Exporting All Keys:**
1. Click the **Export All Keys** button
2. Enter a password to protect your key backup (highly recommended)
3. A file containing all keys will be downloaded to your device

**Importing Keys:**
1. Click the **Import Key** button
2. Paste the exported key data when prompted
3. If a key with the same ID exists, you'll be asked whether to overwrite it

## Encrypting Messages

1. Navigate to the **Encrypt** tab
2. Enter your message in the **Message to Encrypt** field
3. Select a key from the **Encryption Key** dropdown
4. If the key is password-protected, enter the password
5. Click **Encrypt Message**
6. The encrypted message will appear in the **Encrypted Message** field
7. Use **Copy to Clipboard** to copy the message for sharing

## Decrypting Messages

1. Navigate to the **Decrypt** tab
2. Paste the encrypted message in the **Encrypted Message** field
3. Select the corresponding key from the **Decryption Key** dropdown
   - This must be the same key used for encryption (for AES)
   - Or the corresponding private key (for RSA and ECC)
4. If the key is password-protected, enter the password
5. Click **Decrypt Message**
6. The decrypted message will appear in the **Decrypted Message** field

## Security Settings

Navigate to the **Settings** tab to configure security options.

### Storage Options

- **Use IndexedDB for key storage**: Provides more secure storage than localStorage
- **Session-only mode**: Keys aren't saved when the browser closes (maximum security)

### Security Parameters

- **Enforce password protection for keys**: Requires all keys to have password protection
- **Enforce key expiration**: Requires all keys to have an expiration date
- **PBKDF2 Iterations**: Higher values provide stronger protection against brute-force attacks (at the cost of performance)

### Auto-Timeout

- **Enable inactivity timeout**: Automatically locks the application after a period of inactivity
- **Timeout after inactivity**: Sets the duration before the timeout occurs

### Data Protection

- **Auto-clear clipboard**: Automatically clears sensitive data from the clipboard after a set period
- **Clear clipboard after**: Sets the duration before clipboard clearing occurs

## Progressive Web App Features

Lemonade can be installed as a Progressive Web App (PWA), allowing it to run offline and providing a more app-like experience:

1. Go to the **Settings** tab
2. Under **Progressive Web App**, click **Install/Update**
3. Follow the browser prompts to install the application

You can also install the PWA through your browser's interface (usually an icon in the address bar).

## Security Best Practices

For maximum security when using Lemonade:

1. **Use strong passwords** for your keys
2. **Set expiration dates** for all keys
3. **Use the session-only mode** for highly sensitive operations
4. **Enable auto-timeout** to prevent unauthorized access when you're away
5. **Use RSA-4096 or ECC-P384** for the most sensitive information
6. **Regularly generate new keys** and discard old ones
7. **Back up your keys** securely with password protection
8. **Don't share your private keys** or passwords through insecure channels
9. **Verify key IDs** when decrypting to ensure you're using the correct key
10. **Enable auto-clear clipboard** to prevent sensitive data from lingering

## Troubleshooting

### Common Issues and Solutions

1. **"Invalid password or corrupted key" error**
   - Double-check your password
   - Ensure the key hasn't been tampered with

2. **"This message was not encrypted with the selected key" error**
   - Select the correct key that was used for encryption
   - For asymmetric encryption, make sure you're using the corresponding private key

3. **"Invalid encrypted message format" error**
   - Ensure the entire encrypted message was copied, including the `--LM--` and `--ZM--` markers
   - Check for extra spaces or line breaks

4. **Key import fails**
   - Ensure you're pasting the complete exported key data
   - Verify the key data hasn't been corrupted or modified

5. **Browser storage issues**
   - Clear browser cache and reload if keys aren't saving
   - Try using a different browser if IndexedDB isn't working

## Technical Details

Lemonade implements the following cryptographic standards:

- **AES-GCM**: Advanced Encryption Standard with Galois/Counter Mode, 256-bit keys
- **RSA-OAEP**: RSA with Optimal Asymmetric Encryption Padding, 2048 or 4096-bit keys
- **ECDH**: Elliptic Curve Diffie-Hellman key exchange with P-256 or P-384 curves
- **PBKDF2**: Password-Based Key Derivation Function 2 for secure key derivation from passwords
- **SHA-256**: Secure Hash Algorithm for cryptographic operations

All cryptographic operations use the Web Cryptography API (SubtleCrypto), a standardized browser API for performing secure cryptographic operations.

Security features include:
- Secure memory handling with garbage collection
- Input validation and sanitization
- Protection against timing attacks
- Secure key storage with password-based encryption
- Automatic inactivity timeout

---

*Lemonade is a client-side application. All encryption and decryption operations are performed locally in your browser. No data is sent to any server, ensuring maximum privacy and security.*
