# Andromeda × Solana — Hybrid Vault Plan

## Architecture Overview

### Three-Layer System:
1. **Arweave** - Permanent encrypted storage of private data
2. **Solana** - Ownership proof, hashes, versioning, access control
3. **Supabase** - Day-to-day fast access (cache layer)

## What Goes Where:

| Layer | Data | Visibility |
|-------|------|------------|
| Arweave | Full private data (recipes, formulas, costs, notes) | Encrypted |
| Solana | Hashes, version proofs, ownership, timestamps | Public (hash only) |
| Supabase | Active working data | Private |

## MVP Phases:

### Phase 1: Basic Backup (2-3 days)
- Wallet connect for identity
- Encrypt data with user key
- Upload encrypted blob to Arweave
- Store hash + timestamp on Solana
- Restore from Arweave using wallet signature

### Phase 2: Versioning (1-2 days)
- Track multiple backups over time
- "Snapshot" before major changes
- Version history view
- Restore to specific version

### Phase 3: Sharing (2-3 days)
- Read-only access via wallet signature
- Temporary view permissions (time-limited)
- Collaborator access without tokens
- Role-based (owner vs collaborator)

### Phase 4: Public Verification (1-2 days)
- QR code → public batch page
- Maker chooses which fields are public
- Public production date + batch ID
- Ingredient list (never ratios)

### Phase 5: Advanced (Ongoing)
- Multi-device recovery
- Digital time capsules
- Audit trails
- Portable maker identity

## Key Libraries:
- `@solana/web3.js` - Solana SDK
- `@solana/wallet-adapter-react` - Wallet connection
- `arweave-js` or `@irys/sdk` - Arweave upload
- `tweetnacl` - Encryption/signature verification

## Security:
- AES-256 encryption for private data
- Wallet signature proves ownership
- Public data is hash-only on Solana
- Arweave stores encrypted blobs (useless without key)

## Cost Estimate:
- Arweave storage: ~$0.00001 per KB (one-time, permanent)
- Solana transactions: fraction of a cent each
- Supabase: free tier until scaling

## Implementation Order:
1. Wallet connect + identity
2. Encrypt + upload to Arweave
3. Store hash on Solana
4. Restore flow
5. Versioning
6. Sharing
7. Public verification
8. Advanced features

---

*Source: Grok prompt saved 2026-08-19*
