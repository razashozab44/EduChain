# STEMChain 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with ❤️ for STEM & Blockchain](https://img.shields.io/badge/Made%20with-Vanilla%20JS%20%26%20Web3-blue)](https://ethers.org/)

STEMChain is a Web3 decentralized application (dApp) that makes STEM education interactive and rewarding. Students dive into quizzes on Science, Technology, Engineering, and Mathematics, earning verifiable NFT badges on the blockchain for scores of 80% or higher. Created for the DPS Sahiwal Science Exhibition (December 2025), it connects classroom learning with secure digital credentials, helping users build a tamper-proof portfolio of achievements.

**Live Demo:** [Try It Now](https://your-deployed-url.netlify.app) | **Test on Base Sepolia**

## 🌟 Features

- **Engaging STEM Quizzes**: 10-question adaptive challenges covering Physics, Chemistry, Biology & Environment, with plans to expand into Engineering and Math.
- **Secure Badge Minting**: Create ERC-721 NFTs with metadata on Storacha (IPFS-powered) for fraud-proof proof of knowledge.
- **Wallet Support**: Easy integration with MetaMask and WalletConnect for mobile users.
- **Efficient Blockchain**: Runs on Base Sepolia testnet for quick, low-cost transactions (Ethereum L2 from Coinbase).
- **Dynamic UI**: Responsive design with animations, progress tracking, and motivational quotes like Carl Sagan's to keep things fun.
- **Verifiable Results**: Badges detail your score, topic, and date—check them anytime on Basescan.
- **Future-Ready**: Upcoming Base Mainnet launch for real-world use, plus social sharing and rewards.

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | HTML5, CSS3 (with Animate.css for effects), Vanilla JS + Ethers.js v5 |
| **Blockchain** | Ethereum/Base (Sepolia Testnet), ERC-721 Smart Contract (deployed via Remix) |
| **Storage** | Storacha for decentralized IPFS metadata storage |
| **Wallets** | MetaMask, WalletConnect v2 |
| **Libraries** | Canvas Confetti (for celebrations), QRCode.js (mobile connects) |
| **Deployment** | Netlify/Vercel for static hosting |

## 🚀 Quick Start

1. **Clone the Repo**:
   ```
   git clone https://github.com/yourusername/stemchain.git
   cd stemchain
   ```

2. **Run Locally**:
   - Open `index.html` in your browser or use `npx http-server` (install npm if needed).
   - Static setup—no build required!

3. **Connect and Quiz**:
   - Set up your wallet per instructions.
   - Pick a topic, quiz up, score high, and mint!

## 📋 Installation & Setup

### Prerequisites
- **MetaMask Extension**: [Get it here](https://metamask.io).
- **Node.js** (optional for local server): [Download](https://nodejs.org).
- **Test ETH**: Grab from [Base Sepolia Faucet](https://portal.cdp.coinbase.com/products/faucet).

### Step-by-Step
1. **Add Base Sepolia** (MetaMask > Networks > Add):
   - Name: Base Sepolia
   - RPC: https://sepolia.base.org
   - Chain ID: 84532
   - Symbol: ETH
   - Explorer: https://sepolia.basescan.org

2. **Get Test Tokens**:
   - Connect to the faucet and claim 0.5 ETH (takes a minute).

3. **Custom Contract** (optional):
   - Deploy via Remix to Base Sepolia.
   - Edit `app.js` with new CONTRACT_ADDRESS.

4. **Storacha Config**:
   - Register at [storacha.io](https://storacha.io) for SPACE_DID.
   - Update in `app.js`.

### Development Tips
- Local server: `npx http-server -p 3000`.
- Test mints: Switch to testnet; ensure public mint or owner access.

## 📖 Usage

1. **Home**: Get an overview, meet the team, and see exhibition details.
2. **Instructions**: Easy guide to wallet setup.
3. **Quiz**: Connect, choose topic, answer away—track progress with bars.
4. **Results**: Check score; mint if you qualify (Storacha email needed).
5. **Mobile**: WalletConnect QR for on-the-go.

Demo Tip: For the exhibition, show live mints—highlight Base's speed over regular Ethereum!

## 📅 Roadmap

We're growing STEMChain into a full SocialFi platform:
- **Q1 2026**: Core updates, more STEM topics, Base Mini App integration.
- **Q2 2026**: Community features like forums and leaderboards.
- **Q3 2026**: $STEM token rewards, badge staking.
- **Q4 2026+**: Global partnerships, AI quizzes, multi-chain support.

## 🤝 Contributing

1. Fork it.
2. Branch: `git checkout -b your-feature`.
3. Commit: `git commit -m 'Added something cool'`.
4. Push: `git push origin your-feature`.
5. PR time!

Suggestions? New topics, better UI—let's chat!

## 📄 License

MIT License—see [LICENSE](LICENSE) for info.

## 👥 Credits

- **Project Lead**: Muhammad Shozab Raza ([X: @nakamotodrip](https://x.com/nakamotodrip) | [Email](mailto:razashozab619@gmail.com))
- **Co-Lead**: Haroon
- **Helpers**: Grok by xAI for code ideas
- **Inspo**: DPS Sahiwal Science Exhibition 2025—blending STEM, spirit, and blockchain!

**Quote**: *"Science is not only compatible with spirituality; it is a profound source of spirituality."* – Carl Sagan

---

⭐ Give us a star if this fires up your STEM journey! Questions? Hit up @nakamotodrip on X. #STEMChain #Web3Ed #DPSExhibition
