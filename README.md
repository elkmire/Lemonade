# [Lemonade](https://elkmire.github.io/Lemonade/) <- Click Here

# Lemonade: Offline Encryption System

## Table of Contents
1. [Overview](#overview)
2. [Key Management](#key-management)
3. [Encryption/Decryption Operations](#encryptiondecryption-operations)
4. [File Types](#file-types)
5. [PWA Installation](#pwa-installation)
6. [Technical Specifications](#technical-specifications)
7. [Security Considerations](#security-considerations)

## Overview

Lemonade is an offline encryption system operating without external servers or cloud services. It processes all cryptographic operations locally, ensuring complete data isolation and independence from network connectivity.

**Core Capabilities:**
- Offline cryptographic operations
- Multiple encryption standards (AES-256, RSA-4096, ECC P-384)
- Local key generation and management
- Text and file encryption support
- Progressive Web App functionality

## Key Management

### Key Creation Process
1. Navigate to **Key Management** tab
2. Specify key name
3. Select encryption algorithm:
   - **AES-GCM (256-bit)**: Symmetric encryption
   - **RSA-OAEP (2048/4096-bit)**: Asymmetric encryption
   - **ECC (P-256/P-384)**: Elliptic curve cryptography
4. Set expiration timeframe (recommended)
5. Create key password (strongly recommended)
6. Generate key

### Security Classification
- **HIGH**: Password-protected AES-256, RSA-4096, or ECC-P384
- **MEDIUM**: Password-protected RSA-2048 or ECC-P256
- **LOW**: Any key without password protection

### Key Import/Export Functions
- Export public keys (.lim)
- Export private keys (.lem)
- Export state (all keys)
- Import key files

## Encryption/Decryption Operations

### Encryption Protocol
1. Select **Encrypt** tab
2. Input text or select file
3. Choose encryption key
4. Enter key password if applicable
5. Execute encryption
6. Download or copy output

### Decryption Protocol
1. Select **Decrypt** tab
2. Input encrypted text or select .lmn file
3. Select appropriate key
4. Enter key password if applicable
5. Execute decryption
6. Access decrypted content

## File Types

| Extension | Content | Security Protocol |
|-----------|---------|-------------------|
| .lim | Key exchange file | Secure distribution only (contains full key for AES) |
| .lem | Private key file | Strictly confidential |
| .state | Complete key backup | Strictly confidential |
| .lmn | Encrypted data | Standard distribution |

**Security Notice**: AES .lim files contain the complete encryption key and must be transmitted via secure channels only. RSA/ECC .lim files contain only public keys and have lower distribution security requirements.

## PWA Installation

Install as offline application:
1. Access **Settings** tab
2. Locate "Install App" section
3. Execute installation process
4. Confirm browser installation prompts

## Technical Specifications

### Cryptographic Implementation

1. **AES-GCM**
   - 256-bit key length
   - 12-byte initialization vectors
   - 128-bit authentication tags

2. **RSA-OAEP**
   - 2048/4096-bit key options
   - SHA-256 hash function
   - Hybrid encryption architecture

3. **ECC**
   - P-256/P-384 curves
   - ECDH key agreement
   - HKDF derivation function

4. **Password Security**
   - PBKDF2 with SHA-256
   - Configurable iterations (default: 100,000)
   - 16-byte random salt generation

### Security Architecture

- **Data Isolation**: Zero external data transmission
- **Memory Protection**: Secure in-memory handling with post-operation clearing
- **Storage Options**: IndexedDB with optional encryption or session-only mode
- **Encryption Format**: Metadata/content separation with version-specific markers

## Security Considerations

### System Boundaries

1. **Browser Environment**
   - WebCrypto API implementation dependency
   - Browser storage limitations
   - CSP security model constraints

2. **Device Security**
   - No protection against compromised devices
   - Local malware vulnerability

3. **Implementation Limitations**
   - No cross-device synchronization
   - Manual key management requirements
   - No key revocation mechanism

### Operational Security Protocol

1. **Key Management**
   - Implement password protection for all keys
   - Utilize separate keys for distinct security contexts
   - Configure appropriate expiration parameters
   - Maintain secure key backups

2. **System Hygiene**
   - Restrict usage to trusted devices
   - Implement session-only mode for sensitive operations
   - Sanitize browser data on shared systems

3. **Distribution Protocol**
   - Never distribute .lem files
   - Transmit .lim files via secure channels only
   - Verify recipient identity before key distribution
   - Store .state files in secure offline storage

4. **Operational Parameters**
   - Consider air-gapped operation for maximum security
   - Generate high-security keys on network-isolated devices
   - Implement distinct keys for different sensitivity levels

*Lemonade is a client-side application. All encryption and decryption operations are performed locally in your browser. No data is sent to any server, ensuring maximum privacy and security.*
