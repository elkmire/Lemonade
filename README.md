# [Lemonade](https://elkmire.github.io/Lemonade/) <- Click Here

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Key Management](#key-management)
4. [Encrypting & Decrypting](#encrypting--decrypting)
5. [Security Features](#security-features)
6. [File Types](#file-types)
7. [Installation as a PWA](#installation-as-a-pwa)
8. [Settings & Configuration](#settings--configuration)
9. [Troubleshooting & FAQ](#troubleshooting--faq)

## Introduction

Lemonade is a secure, browser-based encryption tool designed for privacy-conscious users who want to protect their sensitive communications without relying on third-party services. The app's name reflects its philosophy: making encryption refreshingly simple.

### Key Benefits

- **Zero-server architecture**: All encryption happens in your browser - no data is ever sent to remote servers
- **Military-grade encryption**: Uses industry-standard AES-256, RSA-2048/4096, and ECC encryption
- **Works offline**: Can be installed as a Progressive Web App (PWA) for use without internet
- **No accounts required**: No sign-ups, no tracking, and no personal information collected
- **Open design**: Straightforward, auditable code
- **Cross-device compatibility**: Export and import keys between different devices

## Getting Started

### Interface Overview

Lemonade features a clean, intuitive interface with four main tabs:

1. **Encrypt**: Encrypt messages or files with your selected encryption key
2. **Decrypt**: Decrypt messages or files with the appropriate key
3. **Key Management**: Create, import, export, and manage your encryption keys
4. **Settings**: Configure application preferences and security settings

### First-time Setup

When you first open Lemonade, you'll want to:

1. Generate at least one encryption key (see [Key Management](#key-management))
2. Configure your security settings (see [Settings & Configuration](#settings--configuration))
3. Consider installing the app as a PWA for offline use (see [Installation as a PWA](#installation-as-a-pwa))

## Key Management

Lemonade's security is built around encryption keys that you create and control. Understanding the different key types and how to manage them is essential.

### Key Types

Lemonade supports three main types of encryption:

1. **AES-GCM (Symmetric)**: 
   - Uses the same key for encryption and decryption
   - 256-bit encryption strength (very secure)
   - Best for: Personal data encryption or when you can securely share the key with recipients

2. **RSA-OAEP (Asymmetric)**:
   - Uses a key pair: public key (for encryption) and private key (for decryption)
   - Available in 2048-bit and 4096-bit strength
   - Best for: Secure communication where recipients can encrypt with your public key, but only you can decrypt with your private key

3. **ECC (Elliptic Curve Cryptography)**:
   - Modern asymmetric encryption with smaller key sizes
   - Available in P-256 and P-384 curves
   - Best for: Similar use cases as RSA but with better performance and smaller encrypted data

### Generating Keys

To create a new encryption key:

1. Navigate to the "Key Management" tab
2. Enter a descriptive name for your key
3. Select the key type from the dropdown menu
4. Set an expiration date (recommended for security)
5. Create a strong password to protect your key (highly recommended)
6. Click "Generate New Key"

### Key Password Protection

When you protect a key with a password:
- You'll need to enter the password each time you use the key
- The key is encrypted on your device with that password
- If you forget the password, the key cannot be recovered

### Importing & Exporting Keys

Lemonade allows you to share and backup keys:

**Exporting Keys**:
1. In the "Key Management" tab, find the key you want to export
2. For asymmetric keys (RSA/ECC), click "Export Public" to share your public key with others
3. For all key types, you can export the complete key (including private components, if applicable)
4. Use "Export Private Key" with extreme caution - only for backup or transfer to your own devices

**Importing Keys**:
1. Click "Import Key" in the "Key Management" tab
2. Select the key file (.lim for public keys, .lem for private keys)
3. Follow the prompts, entering any required passwords

**Backing Up All Keys**:
1. Click "Export State" to create a backup of all your keys
2. Enter a password to protect the backup file
3. Store the .state file securely

## Encrypting & Decrypting

### Encrypting Messages

1. Navigate to the "Encrypt" tab
2. Type or paste your message in the "To Encrypt" field
3. Select an encryption key from the dropdown
4. Enter the key password if required
5. Click "Encrypt Data"
6. Copy the encrypted output or download it as a file

### Encrypting Files

1. On the "Encrypt" tab, click "Browse Files"
2. Select the file you want to encrypt
3. Choose an encryption key
4. Click "Encrypt Data"
5. Download the encrypted file (.lmn format)

### Decrypting Messages

1. Navigate to the "Decrypt" tab
2. Paste the encrypted message in the "To Decrypt" field
3. Select the appropriate decryption key
4. Enter the key password if required
5. Click "Decrypt Data"
6. View the decrypted message

### Decrypting Files

1. On the "Decrypt" tab, click "Browse Files"
2. Select the encrypted file (.lmn format)
3. Choose the appropriate decryption key
4. Click "Decrypt Data"
5. Download the decrypted file

## Security Features

### Local-Only Processing

Lemonade operates entirely within your browser:
- No data is transmitted to any server
- All cryptographic operations are performed using the Web Crypto API
- No analytics or tracking code is included

### Key Storage Security

Your keys are stored in one of two locations, depending on your settings:
- Browser's IndexedDB (default, more secure)
- Local storage (fallback option)

Both options keep data on your device only, but IndexedDB provides better isolation.

### Optional Security Enhancements

Lemonade offers additional security options:
- **Session-only mode**: Keys are deleted when the browser closes
- **Password enforcement**: Require passwords for all keys
- **Key expiration**: Automatically invalidate keys after a specified period
- **PBKDF2 Iterations**: Adjust the computational work factor for password derivation

### Security Indicators

Keys display security badges:
- **HIGH**: AES-256, RSA-4096, or ECC-P384 with password protection
- **MEDIUM**: RSA-2048 or ECC-P256 with password protection
- **LOW**: Any key without password protection

## File Types

Lemonade uses several file extensions:

- **.lim**: Public key file (can be shared safely)
  - Contains only the public portion of an asymmetric key
  - Used by others to encrypt messages only you can decrypt
  - Safe to share via email, messaging, etc.

- **.lem**: Private key file (keep secure!)
  - Contains the private portion of an asymmetric key
  - Can decrypt messages encrypted with the corresponding public key
  - Should be password-protected and kept strictly confidential

- **.state**: Application state backup
  - Contains all your keys (both public and private)
  - Should always be encrypted with a strong password
  - For personal backup or transfer to your own devices only

- **.lmn**: Encrypted file
  - Contains data encrypted with Lemonade
  - Can be decrypted only with the appropriate key

## Installation as a PWA

Lemonade can be installed as a Progressive Web App, allowing it to:
- Work offline without an internet connection
- Launch from your device's home screen or app menu
- Run in its own window without browser chrome

To install: (Must be Chromium-based browser or Safari for IOS)

1. Navigate to the "Settings" tab
2. Find the "Install App" section
3. Click "Install Lemonade App" (button will be enabled when installation is available)

Alternatively, Safari provides an installation icon in the address bar or menu when a site can be installed as a PWA.

### PWA Benefits

- **Offline Access**: Use Lemonade without internet connectivity
- **Enhanced Security**: Runs in an isolated context
- **Better Performance**: Faster loading times after installation
- **Reduced Browser Dependencies**: Works more like a native app

## Settings & Configuration

### Storage Options

- **Use IndexedDB**: More secure key storage (recommended)
- **Session-only mode**: Keys aren't saved when browser closes

### Security Parameters

- **Enforce password protection**: Require passwords for all keys
- **Enforce key expiration**: Require expiration dates for all keys
- **PBKDF2 Iterations**: Higher values increase security but may slow down password processing

### Appearance

- **Dark Mode**: Toggle between light and dark themes

### Saving Settings

Click "Save Settings" to apply any changes. Settings are stored locally on your device.

## Troubleshooting & FAQ

### I forgot my key password. Can I recover it?

No. Lemonade uses strong encryption for password protection. If you forget a key password, that key cannot be recovered. This is a security feature, not a bug.

### Can I use Lemonade to encrypt emails?

Lemonade doesn't integrate directly with email clients, but you can:
1. Encrypt your message in Lemonade with a securely shared symmetric key (.lim) or other user's public asymmetric key (.lim)
2. Copy the encrypted text
3. Paste it into your email

### Is my data sent to any servers?

No. Lemonade operates entirely within your browser. No data is ever sent to remote servers—your messages, files, and keys never leave your device.

### How do I share an encrypted file with someone?

1. Obtain their public key file (.lim) or shared symmetric key file (.lim)
2. Import the key in your Lemonade app
3. Encrypt your file using their public key or shared symmetric key
4. Send them the encrypted file (.lmn)
5. They can decrypt it using their private key or shared symmetric key

### What if I need to use Lemonade on multiple devices?

You have two options:
1. Export individual keys and import them on each device
2. Export your entire state (.state file), and import it on each device

### What encryption standards does Lemonade use?

- AES-GCM with 256-bit keys for symmetric encryption
- RSA-OAEP with SHA-256 for asymmetric encryption (2048 or 4096-bit keys)
- ECDH with P-256 or P-384 curves for elliptic curve encryption
- PBKDF2 for key derivation from passwords

### Why does Lemonade use local storage instead of servers?

1. **Security**: No server means no central point of attack
2. **Privacy**: Your data never leaves your device
3. **Reliability**: Works offline and doesn't depend on server availability
4. **Simplicity**: No accounts, payments, or maintenance required

---

*Lemonade is a client-side application. All encryption and decryption operations are performed locally in your browser. No data is sent to any server, ensuring maximum privacy and security.*
