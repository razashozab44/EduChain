# EduChain Badge 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with ❤️ for Science & Blockchain](https://img.shields.io/badge/Made%20with-React%20%26%20Web3-orange)](https://reactjs.org/)

EduChain Badge is a Web3 decentralized application (dApp) that gamifies science education through interactive quizzes. Users earn verifiable NFT badges on the blockchain upon achieving high scores (80%+). Built for the DPS Sahiwal Science Exhibition (December 2025), it bridges traditional learning with blockchain credentials—proving knowledge immutably!

**Live Demo:** [Coming Soon – Exhibition Launch](https://educationalchain.netlify.app) | **Test on Base Sepolia**

## 🌟 Features

- **Interactive Science Quizzes**: Adaptive 10-question quizzes on Physics, Chemistry, Biology & Environment (expandable topics).
- **Blockchain Badge Minting**: Mint ERC-721 NFTs with metadata stored on Storacha (IPFS-based) for tamper-proof credentials.
- **Wallet Integration**: Seamless MetaMask support + WalletConnect for mobile.
- **Testnet Ready**: Deployed on Base Sepolia for low-cost, fast transactions (Ethereum L2 by Coinbase).
- **Exhibition-Ready UI**: Animated, responsive design with confetti celebrations, progress bars, and Carl Sagan quotes for inspiration.
- **Verifiable Achievements**: Badges include score, topic, and difficulty—viewable on Basescan.
- **Coming Soon**: Full integration with Base Mainnet for production-grade, gas-efficient minting!

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | HTML5, CSS3 (Custom Animations with Animate.css), Vanilla JS + Ethers.js v5 |
| **Blockchain** | Ethereum/Base (Sepolia Testnet), ERC-721 Smart Contract (Remix-deployed) |
| **Storage** | Storacha (Decentralized IPFS pinning) for NFT metadata |
| **Wallets** | MetaMask, WalletConnect (v1) |
| **Libraries** | Canvas Confetti (celebrations), QRCode.js (mobile connect) |
| **Deployment** | Netlify/Vercel (Static Hosting) |

## 🚀 Quick Start

1. **Clone the Repo**:
   ```
   git clone https://github.com/razashozab44/EduChain.git
   cd EduChain
   ```

2. **Open in Browser**:
   - Double-click `index.html` or serve locally: `npx http-server` (install via npm if needed).
   - No build step—it's a static dApp!

3. **Connect & Play**:
   - Follow on-screen instructions: Add Base Sepolia to MetaMask, claim test ETH from faucet.
   - Start quiz → Score 80%+ → Mint your badge!

## 📋 Installation & Setup

### Prerequisites
- **MetaMask Browser Extension**: [Download](https://metamask.io).
- **Node.js** (for local dev/server): [Download](https://nodejs.org) (optional).
- **Test ETH**: Use [Base Sepolia Faucet](https://portal.cdp.coinbase.com/products/faucet).

### Detailed Setup
1. **Add Base Sepolia Network** (in MetaMask > Networks > Add Network):
   - **Name**: Base Sepolia
   - **RPC URL**: `https://sepolia.base.org`
   - **Chain ID**: `84532`
   - **Currency Symbol**: ETH
   - **Block Explorer**: `https://sepolia.basescan.org`

2. **Claim Test Tokens**:
   - Visit the faucet, connect MetaMask, and claim 0.5 ETH (wait 1-2 mins).

3. **Deploy Contract** (if customizing):
   - Use Remix IDE: Paste ABI/contract code, deploy to Base Sepolia.
   - Update `app.js` with your `CONTRACT_ADDRESS`.

4. **Storacha Setup** (for metadata):
   - Sign up at [storacha.io](https://storacha.io), get your `SPACE_DID`.
   - Update in `app.js`: `const SPACE_DID = 'your-did-here';`

### Local Development
- Serve files: `npx http-server -p 3000` (or use VS Code Live Server).
- Test minting: Ensure contract is owner-only or public mint.

## 📖 Usage

1. **Home**: Welcome screen with team credits, exhibition note, and Base Chain teaser.
2. **Instructions**: Step-by-step wallet setup.
3. **Quiz**: Select topic → Answer questions → Track progress.
4. **Results**: View score → If ≥80%, claim NFT (email validation for Storacha).
5. **Mobile**: Use WalletConnect QR for iOS/Android MetaMask.

**Pro Tip**: For exhibition demo, pre-mint sample badges and showcase on a projector—highlight the Base L2 speed vs. Ethereum!

## 🤝 Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feat/amazing-idea`.
3. Commit changes: `git commit -m 'Add cool feature'`.
4. Push: `git push origin feat/amazing-idea`.
5. Open a Pull Request!

Ideas welcome: More quiz topics? AI-generated questions? Multi-language support?

## 📄 License

This project is MIT licensed. See [LICENSE](LICENSE) for details.

## 👥 Credits

- **Project Lead**: Muhammad Shozab Raza ([X: @nakamotodrip](https://x.com/nakamotodrip) | [Email](mailto:razashozab619@gmail.com))
- **Co-Lead**: Haroon
- **Built With**: Grok by xAI (for code tweaks & ideas)
- **Inspiration**: DPS Sahiwal Science Exhibition 2025 – Merging Science, Spirituality, and Blockchain!

**Quote**: *"Science is not only compatible with spirituality; it is a profound source of spirituality."* – Carl Sagan

---

⭐ Star this repo if it sparks your Web3 education journey! Questions? DM @nakamotodrip on X. #EduChain #Web3Education #DPSExhibition