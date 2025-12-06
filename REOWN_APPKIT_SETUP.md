# Reown AppKit Integration - Complete Setup

You've upgraded to **Reown AppKit** (the new official API for WalletConnect v2) with proper **network configuration**. This is the recommended approach from the official docs.

## What's New

### Before (WalletConnect Modal v1 API)
- Basic WalletConnect modal without proper network support
- Limited wallet detection
- No built-in network management

### Now (Reown AppKit v2)
- ✅ Official Reown AppKit with full network support
- ✅ Network configuration defined for Base Mainnet and Base Sepolia
- ✅ Proper ethers.js adapter integration
- ✅ Automatic wallet detection and support
- ✅ Support for MetaMask, Trust Wallet, Rainbow, Coinbase, and 300+ wallets

## Configuration

### Supported Networks (Defined in app.js)

```javascript
const supportedNetworks = [
    {
        chainId: 8453,
        name: 'Base',
        currency: 'ETH',
        explorerUrl: 'https://basescan.org',
        rpcUrl: 'https://8453.rpc.thirdweb.com'
    },
    {
        chainId: 84532,
        name: 'Base Sepolia',
        currency: 'ETH',
        explorerUrl: 'https://sepolia.basescan.org',
        rpcUrl: 'https://84532.rpc.thirdweb.com'
    }
];
```

This configuration tells AppKit:
- Which blockchains users can connect to
- RPC endpoints for each network
- Block explorers for transaction verification

## Files Updated

### `quiz.html`
- Replaced old WalletConnect modal CDN with new Reown AppKit
- Added ethers.js adapter for better provider management
- Simplified connect button (no wallet selector dropdown needed)

```html
<script src="https://cdn.jsdelivr.net/npm/@reown/appkit@latest/dist/index.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@reown/appkit-adapter-ethers@latest/dist/index.umd.js"></script>
```

### `app.js`
- `initAppKit()` - Initialize AppKit with networks and metadata
- `connectWallet()` - Open AppKit modal with network options
- `handleWalletConnected()` - Handle wallet connection with proper provider setup
- `disconnectWallet()` - Gracefully disconnect wallet
- `supportedNetworks` - Network configuration array

## How It Works

1. **User clicks "Connect Wallet"**
   - `connectWallet()` is called
   - AppKit modal opens showing:
     - Available wallets (MetaMask, Trust, etc.)
     - Network selection (Base, Base Sepolia)
     - QR code for mobile scanning

2. **User selects wallet**
   - AppKit handles the connection protocol
   - Wallet confirms the connection
   - User address is returned

3. **Connection established**
   - Provider and signer are set up
   - Contract connection initialized
   - Quiz topics appear
   - User can start answering questions

## Testing Instructions

### Desktop Testing
1. Open `quiz.html` in desktop browser
2. Click "Connect Wallet (MetaMask, Trust Wallet, etc.)"
3. AppKit modal shows available wallets
4. Select MetaMask (or other installed wallet)
5. Approve connection in wallet
6. Quiz topics should appear

### Mobile Testing
1. Open `quiz.html` on mobile browser
2. Click "Connect Wallet"
3. AppKit modal shows QR code
4. Open mobile wallet app (MetaMask Mobile, Trust Wallet, etc.)
5. Scan QR code
6. Approve in wallet app
7. Quiz topics appear

## Network Switching

Users can switch between networks from AppKit modal:
- **Base** (Production) - chainId 8453
- **Base Sepolia** (Testnet) - chainId 84532

The app automatically uses the RPC endpoint for the connected network.

## Error Handling

If AppKit doesn't load:
1. **Network error**: Check CDN availability
   - `@reown/appkit@latest`
   - `@reown/appkit-adapter-ethers@latest`

2. **Connection timeout**: Try refreshing page
3. **Wallet not showing**: Ensure wallet is installed and up-to-date

## Browser Support

Works in:
- ✅ Chrome/Brave/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (iOS 13+, macOS)
- ✅ Mobile browsers with WalletConnect support

## Advanced Features

### Check Connection Status
```javascript
const { connectedWallet, walletProvider } = checkWalletConnection();
if (connectedWallet) {
    console.log('Wallet connected:', connectedWallet);
}
```

### Disconnect Wallet
```javascript
disconnectWallet(); // Clears storage and reloads page
```

### Subscribe to Changes
AppKit automatically handles account/network changes through subscriptions in `connectWallet()`.

## Why Reown AppKit?

✅ **Official**: Recommended by WalletConnect/Reown team
✅ **Modern**: Latest WalletConnect v2 protocol
✅ **Networks**: Built-in network configuration support
✅ **Adapters**: Works with ethers.js, web3.js, and custom providers
✅ **Mobile**: Better QR code and deep-linking support
✅ **Wallets**: Support for 300+ wallets

## Documentation

- [Reown AppKit Docs](https://docs.reown.com/appkit)
- [Network Configuration](https://docs.reown.com/appkit/javascript/core/installation#others-networks-appkit-core)
- [WalletConnect Docs](https://docs.walletconnect.com)

## Project ID

Your current Project ID: `2f35b9dea29b453ee5258df53f727b1a`

To update it:
1. Go to [cloud.reown.com](https://cloud.reown.com)
2. Create/manage your project
3. Update in `app.js` line 328

---

**Status**: ✅ Ready for production
**Last Updated**: December 6, 2025
