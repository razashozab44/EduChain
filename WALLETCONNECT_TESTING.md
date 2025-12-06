# WalletConnect Testing Guide

Your app now uses **WalletConnect as the primary wallet connector** which supports:
- ✅ MetaMask (Desktop & Mobile)
- ✅ Trust Wallet
- ✅ Coinbase Wallet
- ✅ Rainbow
- ✅ Phantom
- ✅ 300+ other wallets!

## How It Works Now

When you click **"Connect Wallet"** on the quiz page:

1. **Desktop Users**: 
   - Click "Connect Wallet" 
   - WalletConnect modal opens showing available wallets
   - Select MetaMask or another desktop wallet
   - Approve connection

2. **Mobile Users**:
   - Click "Connect Wallet"
   - Mobile browser shows WalletConnect modal with QR code
   - Scan QR with your mobile wallet app (MetaMask, Trust Wallet, etc.)
   - Approve in wallet app
   - Connection completes

## Supported Networks

- **Base Mainnet** (Chain ID: 8453)
- **Base Sepolia Testnet** (Chain ID: 84532)

## What Changed

### Simplified Architecture
- **Before**: Separate MetaMask and WalletConnect connectors
- **Now**: Single WalletConnect connector that supports all wallets

### Files Modified
1. **app.js**:
   - `initWalletConnectModal()` - Initialize WalletConnect
   - `connectWallet()` - Single unified connection function
   - `createWalletConnectProvider()` - Provider setup
   - `handleWalletConnected()` - Connection handler

2. **quiz.html**:
   - Removed wallet selector dropdown
   - Simplified button text: "Connect Wallet (MetaMask, Trust Wallet, etc.)"

## Testing Checklist

- [ ] Click "Connect Wallet" button on quiz.html
- [ ] WalletConnect modal appears
- [ ] Can see list of available wallets
- [ ] Can see QR code option for mobile
- [ ] After connecting, quiz topics appear
- [ ] Can select a quiz and answer questions
- [ ] Connection persists in localStorage

## Console Debugging

Open browser DevTools (F12) and check Console for:
- `✓ WalletConnect Modal initialized` - SDK loaded
- `Opening WalletConnect modal...` - Modal about to open
- `✅ Wallet connected: 0x...` - Connection successful

## Troubleshooting

### "Connection failed" error
- **Solution**: Refresh the page and try again
- Check that ProjectId is correct in app.js (line 327)

### Modal doesn't appear
- **Solution**: Ensure WalletConnect CDN is loaded
- Check browser console for network errors
- Try in a different browser

### Mobile: QR code not scannable
- **Solution**: Ensure screen brightness is high
- Try from a different phone
- Make sure wallet app is updated to latest version

### Connection works but quiz doesn't load
- **Solution**: Ensure you're on the correct network (Base)
- Clear browser cache and localStorage
- Try in incognito/private mode

## Next Steps

Your app is now ready to:
1. Test with different wallet types
2. Deploy to production
3. Collect more quiz responses
4. Mint NFT badges on Base Chain

---

For more info: [WalletConnect Docs](https://docs.walletconnect.com)
