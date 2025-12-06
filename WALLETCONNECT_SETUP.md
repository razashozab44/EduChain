# WalletConnect Web SDK Setup Guide

This guide helps you set up WalletConnect v2 for your STEM Chain application.

## What's Implemented

Your app now supports both **MetaMask** and **WalletConnect** for wallet connections:
- **MetaMask**: Desktop users (browser extension)
- **WalletConnect**: Mobile users (QR code scanning with any mobile wallet)

## Step 1: Get Your Project ID

1. Go to [WalletConnect Cloud Dashboard](https://cloud.walletconnect.com)
2. Sign up or log in with your account
3. Create a new project
4. Copy your **Project ID**

## Step 2: Add Project ID to Your Code

Open `/workspaces/EduChain/app.js` and find this line (around line 328):

```javascript
const projectId = 'YOUR_PROJECT_ID'; // Get from https://cloud.walletconnect.com
```

Replace `'YOUR_PROJECT_ID'` with your actual Project ID:

```javascript
const projectId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'; // Example
```

## Step 3: Test the Integration

### Desktop Testing (MetaMask)
1. Open `quiz.html` in your browser
2. Click **Connect Wallet**
3. Select **MetaMask** from dropdown
4. Approve the connection
5. You should see quiz topics appear

### Mobile Testing (WalletConnect)
1. Open `quiz.html` on mobile browser
2. Click **Connect Wallet**
3. Select **WalletConnect (Mobile)** from dropdown
4. A modal with QR code appears
5. Open a mobile wallet app (MetaMask Mobile, Trust Wallet, etc.)
6. Scan the QR code
7. Approve the connection in your wallet app
8. Quiz topics will appear

## How It Works

### File Changes

#### `quiz.html`
- Added WalletConnect Modal SDK from CDN
- Includes wallet selection dropdown (MetaMask or WalletConnect)

#### `app.js`
- `initWalletConnectModal()`: Sets up WalletConnect with your Project ID
- `connectMetaMask()`: Handles MetaMask connection
- `connectWalletConnect()`: Handles WalletConnect connection via modal
- `handleWalletConnected()`: Unified handler for both wallet types
- `connectWallet()`: Main function that routes to correct wallet
- `checkWalletConnection()`: Checks for existing session

### Supported Wallets

With WalletConnect, users can connect using:
- MetaMask (Mobile)
- Trust Wallet
- Rainbow
- Coinbase Wallet
- And 300+ other wallets!

## Configuration Details

```javascript
wcModal = new window.WalletConnectModal.WalletConnectModal({
    projectId: projectId,
    chains: [8453, 84532],           // Base Mainnet & Base Sepolia
    methods: [
        'eth_sendTransaction',        // Send transactions
        'eth_signMessage',            // Sign messages
        'eth_sign',                   // Legacy signing
        'personal_sign'               // Personal sign
    ],
    events: ['chainChanged', 'accountsChanged']
});
```

## Blockchain Networks

- **Base Mainnet**: Chain ID `8453`
- **Base Sepolia Testnet**: Chain ID `84532`

## Troubleshooting

### "WalletConnect not available" error
- Ensure the WalletConnect Modal SDK loaded correctly
- Check browser console for network errors
- Try refreshing the page

### QR code not appearing
- Ensure JavaScript is enabled
- Check that `projectId` is set correctly
- Verify WalletConnect CDN is accessible

### Transaction fails after connection
- Check that you're on the correct network (Base)
- Verify you have funds for gas fees
- Check console for detailed error messages

## Advanced: Signing Transactions

After wallet connection, you can sign and send transactions:

```javascript
// Example: Mint NFT badge
const tx = await contract.mint(
    userAddress,
    "ipfs://your-badge-uri"
);
await tx.wait();
```

The `signer` object is automatically set up for both MetaMask and WalletConnect.

## Support

- [WalletConnect Documentation](https://docs.walletconnect.com)
- [WalletConnect Cloud Dashboard](https://cloud.walletconnect.com)
- [Base Chain Documentation](https://docs.base.org)

---

**Next Steps:**
1. Replace `YOUR_PROJECT_ID` with your real ID
2. Test with MetaMask on desktop
3. Test with WalletConnect on mobile
4. Deploy to production!
