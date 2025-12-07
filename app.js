import { createAppKit } from "@reown/appkit";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { mainnet, arbitrum, baseSepolia } from "@reown/appkit/networks";

// 1. Get projectId at https://dashboard.reown.com
const projectId = "2f35b9dea29b453ee5258df53f727b1a";

// 2. Create your application's metadata object
const metadata = {
  name: "STEM Chain",
  description: "My Website description",
  url: "https://stemchain.netlify.com", // url must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create a AppKit instance
const modal = createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [mainnet, arbitrum, baseSepolia],
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

// REPLACE with your Remix-deployed contract address
const CONTRACT_ADDRESS = '0x739de26e6847f38ff967485357b155a39bed085e';

// YOUR SPACE DID FROM DASHBOARD
const SPACE_DID = 'did:key:z6Mkw7oyKmmx4QLaxyoCPi7PXLP9KjPAHEjoTNDeC14FsLCz';
const CONTRACT_ABI = [
    "function mint(address to, string memory uri) public returns (uint256)",
    "function owner() view returns (address)"
];

let provider, signer, contract, storachaClient;
let currentTopic = '';
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let difficultyLevel = 'easy';
let userAnswers = [];

// 30 MCQs - FULL ARRAY
const questions = {
  physics: [
    { question: "What type of energy is stored in a stretched rubber band?", options: ["Potential energy", "Kinetic energy", "Thermal energy", "Chemical energy"], correct: 0, difficulty: "easy" },
    { question: "What phenomenon explains the bending of light when it passes through different mediums?", options: ["Refraction", "Reflection", "Diffraction", "Interference"], correct: 0, difficulty: "easy" },
    { question: "What is the unit of electrical resistance?", options: ["Ohm", "Watt", "Ampere", "Volt"], correct: 0, difficulty: "easy" },
    { question: "What is the formula for calculating force?", options: ["Force = Mass × Acceleration", "Force = Mass ÷ Acceleration", "Force = Mass + Acceleration", "Force = Mass - Acceleration"], correct: 0, difficulty: "medium" },
    { question: "What is the first law of thermodynamics?", options: ["Energy cannot be created or destroyed", "Heat always flows from hot to cold", "Total entropy increases", "Absolute zero is unattainable"], correct: 0, difficulty: "medium" },
    { question: "What is the speed of light in a vacuum (approximately)?", options: ["3×10⁸ m/s", "150,000 km/s", "343 m/s", "9.8 m/s²"], correct: 0, difficulty: "medium" },
    { question: "What particle carries a negative electric charge?", options: ["Proton", "Neutron", "Electron", "Photon"], correct: 2, difficulty: "hard" },
    { question: "Which law states 'an object at rest stays at rest'?", options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravity"], correct: 0, difficulty: "hard" },
    { question: "What is the SI unit of power?", options: ["Watt", "Joule", "Newton", "Pascal"], correct: 0, difficulty: "hard" },
    { question: "What opposes the motion of two surfaces in contact?", options: ["Friction", "Gravity", "Magnetism", "Tension"], correct: 0, difficulty: "hard" }
  ],
  chemistry: [
    { question: "What gas is produced when acids react with metals?", options: ["Hydrogen", "Oxygen", "Carbon dioxide", "Nitrogen"], correct: 0, difficulty: "easy" },
    { question: "What is the chemical formula for methane, a key biogas component?", options: ["CH₄", "CO₂", "H₂O", "O₂"], correct: 0, difficulty: "easy" },
    { question: "What type of bond forms between two nonmetals?", options: ["Covalent bond", "Ionic bond", "Metallic bond", "Hydrogen bond"], correct: 0, difficulty: "easy" },
    { question: "What process separates mixtures based on boiling points (used in clean fuel production)?", options: ["Distillation", "Filtration", "Chromatography", "Centrifugation"], correct: 0, difficulty: "medium" },
    { question: "What is the pH level of pure water?", options: ["7", "0", "14", "5"], correct: 0, difficulty: "medium" },
    { question: "What element has the highest melting point, useful in clean energy reactors?", options: ["Tungsten", "Carbon", "Iron", "Gold"], correct: 0, difficulty: "medium" },
    { question: "What is the chemical formula for carbon dioxide?", options: ["CO", "CO₂", "C₂O", "CO₃"], correct: 1, difficulty: "hard" },
    { question: "What gas, when released, contributes to acid rain affecting clean water?", options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Sulfur Dioxide"], correct: 3, difficulty: "hard" },
    { question: "Rusting of iron occurs due to reaction with which gas?", options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"], correct: 1, difficulty: "hard" },
    { question: "What is the chemical formula for glucose, a biofuel source?", options: ["C₆H₁₂O₆", "C₆H₁₂O₇", "C₁₂H₂₂O₁₁", "CH₂O"], correct: 0, difficulty: "hard" }
  ],
  biologyEnv: [
    { question: "What is the powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi apparatus"], correct: 0, difficulty: "easy" },
    { question: "What is the main cause of global warming?", options: ["Greenhouse gas emissions", "Ozone depletion", "Deforestation", "Ocean acidification"], correct: 0, difficulty: "easy" },
    { question: "What molecule carries genetic information?", options: ["DNA", "RNA", "Protein", "Lipid"], correct: 0, difficulty: "easy" },
    { question: "What process turns water vapor into liquid water (key in water cycle)?", options: ["Condensation", "Evaporation", "Precipitation", "Sublimation"], correct: 0, difficulty: "medium" },
    { question: "What do plants use to make food?", options: ["Photosynthesis", "Respiration", "Transpiration", "Fermentation"], correct: 0, difficulty: "medium" },
    { question: "What is the term for planting trees to restore forests (reduces waste CO2)?", options: ["Reforestation", "Deforestation", "Afforestation", "Desertification"], correct: 0, difficulty: "medium" },
    { question: "What gas do plants absorb during photosynthesis for clean air?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2, difficulty: "hard" },
    { question: "What international agreement reduces greenhouse gases?", options: ["Paris Agreement", "Kyoto Protocol", "Montreal Protocol", "Copenhagen Accord"], correct: 0, difficulty: "hard" },
    { question: "What percentage of Earth’s surface is covered in water?", options: ["50%", "60%", "71%", "80%"], correct: 2, difficulty: "hard" },
    { question: "What is the term for species at risk of extinction due to habitat loss?", options: ["Endangered species", "Extinct species", "Invasive species", "Keystone species"], correct: 0, difficulty: "hard" }
  ]
};

// Load Storacha
let storachaLoaded = false;
async function loadStorachaClient() {
    if (storachaLoaded) return;
    try {
        const { create } = await import('https://cdn.jsdelivr.net/npm/@storacha/client@latest/+esm');
        storachaClient = await create();
        storachaLoaded = true;
        console.log('Storacha client loaded!');
    } catch (error) {
        console.error('Storacha load failed:', error);
    }
}

/ Reown AppKit initialization for multi-wallet support
let appKit;
async function initAppKit() {
    if (appKit) return;
    try {
        const { createAppKit } = window.Reown;
        const { baseSepolia } = window.Reown.AppKit.networks;

        appKit = createAppKit({
            adapters: [window.Reown.AppKit.adapters.ethers],
            networks: [baseSepolia],
            projectId: '2f35b9dea29b453ee5258df53f727b1a',
            metadata: {
                name: 'STEMChain',
                description: 'STEM quizzes with blockchain badges',
                url: window.location.origin,
                icons: ['https://your-icon-url.png'] // Add your logo URL
            },
            features: {
                analytics: false,
                email: false,
                socials: false
            },
            themeVariables: {
                '--w3m-color-mix': '#0052D4',
                '--w3m-color-mix-strength': 20
            }
        });
        console.log('Reown AppKit initialized');
    } catch (error) {
        console.error('Failed to init AppKit:', error);
        alert('Wallet system loading failed. Please refresh.');
    }
}

// Connect wallet using Reown AppKit (supports all wallets)
async function connectWallet() {
    await initAppKit();
    if (!appKit) return;

    try {
        await appKit.open();
        
        // Subscribe to account changes
        appKit.subscribeState(async (state) => {
            if (state.isConnected) {
                const address = state.address;
                const chainId = state.chainId;
                
                if (chainId !== 84532) {
                    alert('Please switch to Base Sepolia in your wallet.');
                    return;
                }
                
                // Get Ethers provider and signer
                const appKitProvider = await appKit.getProvider();
                provider = new ethers.providers.Web3Provider(appKitProvider);
                signer = provider.getSigner();
                contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
                
                document.getElementById('address').textContent = `${address.slice(0,6)}...${address.slice(-4)}`;
                document.getElementById('network').textContent = 'Base Sepolia';
                document.getElementById('walletInfo').classList.remove('hidden');
                document.getElementById('connectBtn').style.display = 'none';
                document.getElementById('topics').classList.remove('hidden');
            }
        });
    } catch (error) {
        console.error('Connection error:', error);
        alert('Connection failed: ' + error.message);
    }
}


// MetaMask-only connection with auto-switch to Base Sepolia
async function connectWallet() {
    console.log('connectWallet called! Ethereum:', window.ethereum);
    if (typeof ethers === 'undefined') return alert('Ethers not loaded!');
    if (typeof window.ethereum === 'undefined') return alert('MetaMask not detected! Install/unlock.');

    try {
        // Request accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Auto-switch to Base Sepolia (chainId 84532)
        const chainId = '0xAA36A7'; // 84532 in hex
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }]
            });
        } catch (switchError) {
            if (switchError.code === 4902) { // Chain not added
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: chainId,
                        chainName: 'Base Sepolia',
                        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                        rpcUrls: ['https://sepolia.base.org'],
                        blockExplorerUrls: ['https://sepolia.basescan.org']
                    }]
                });
            } else {
                throw switchError;
            }
        }

        // Create provider and signer
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        const address = await signer.getAddress();
        const network = await provider.getNetwork();
        console.log('Connected! Address:', address, 'Chain ID:', network.chainId.toString());
        
        if (network.chainId !== 84532) {
            alert(`Switch to Base Sepolia (84532). Current: ${network.chainId.toString()}`);
            return;
        }

        document.getElementById('address').textContent = `${address.slice(0,6)}...${address.slice(-4)}`;
        document.getElementById('network').textContent = 'Base Sepolia';
        document.getElementById('walletInfo').classList.remove('hidden');
        document.getElementById('connectBtn').style.display = 'none';
        document.getElementById('topics').classList.remove('hidden');
        document.getElementById('debug').classList.add('hidden');

        const owner = await contract.owner();
        if (owner.toLowerCase() !== address.toLowerCase()) console.warn('Not owner — make mint public.');
    } catch (error) {
        console.error('Connection error:', error);
        alert('Connection failed: ' + error.message + '. Check Console (F12).');
    }
}

function startQuiz(topic) {
    console.log('Quiz started! Topic:', topic);
    if (!contract) return alert('Connect wallet first!');
    currentTopic = topic;
    currentQuestions = shuffle([...questions[topic]]);
    currentIndex = 0;
    score = 0;
    userAnswers = new Array(10).fill(null);
    difficultyLevel = 'easy';
    document.getElementById('topics').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('nextBtn').disabled = true;
    nextQuestion();
    document.getElementById('progressFill').style.width = '10%';
}

function nextQuestion() {
    if (currentIndex >= 10) {
        endQuiz();
        return;
    }

    // Adaptive (same as before)
    let availableQs = currentQuestions.slice(currentIndex);
    availableQs = availableQs.filter(q => q.difficulty === difficultyLevel || (difficultyLevel === 'easy' ? q.difficulty === 'medium' : q.difficulty === 'hard'));
    if (availableQs.length === 0) availableQs = currentQuestions.slice(currentIndex);
    if (availableQs.length > 0) {
        const nextQIndex = currentQuestions.findIndex((q, idx) => idx >= currentIndex && availableQs.includes(q));
        if (nextQIndex !== -1 && nextQIndex !== currentIndex) {
            [currentQuestions[currentIndex], currentQuestions[nextQIndex]] = [currentQuestions[nextQIndex], currentQuestions[currentIndex]];
        }
    }

    const q = currentQuestions[currentIndex];
    document.getElementById('question').textContent = `${currentIndex + 1}. ${q.question}`;
    const optsDiv = document.getElementById('options');
    optsDiv.innerHTML = '';
    q.options.forEach((opt, i) => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="ans" value="${i}"> ${opt}<br>`;
        optsDiv.appendChild(label);
    });
    document.querySelectorAll('input[name="ans"]').forEach(r => r.checked = false);
    document.getElementById('nextBtn').disabled = true;
}

function advanceQuestion() {
    console.log('Advancing to Q', currentIndex + 1);
    currentIndex++;
    document.getElementById('progressFill').style.width = ((currentIndex / 10) * 100) + '%';
    nextQuestion();
}

document.addEventListener('change', (e) => {
    if (e.target.name === 'ans' && e.target.type === 'radio') {
        const selected = parseInt(e.target.value);
        userAnswers[currentIndex] = selected;
        const q = currentQuestions[currentIndex];
        if (selected === q.correct) {
            if (difficultyLevel === 'easy') difficultyLevel = 'medium';
            else if (difficultyLevel === 'medium') difficultyLevel = 'hard';
            console.log('Correct! To', difficultyLevel);
            // Confetti on correct
            confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
            document.getElementById('question').classList.add('animate__animated', 'animate__tada');
            setTimeout(() => document.getElementById('question').classList.remove('animate__animated', 'animate__tada'), 1000);
        }
        document.getElementById('nextBtn').disabled = false;
        console.log('Next enabled!');
    }
});

function endQuiz() {
    score = userAnswers.filter((ans, i) => ans !== null && ans === currentQuestions[i].correct).length;
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('score').textContent = score;
    const pass = score >= 8;
    document.getElementById('message').textContent = pass ? 'Excellent! You qualify for an NFT badge.' : 'Good effort! Try again.';
    document.getElementById('claimBtn').disabled = !pass;
    if (pass) {
        const badge = generateSVG(score, currentTopic);
        document.getElementById('badgePreview').innerHTML = badge;
        document.getElementById('badgePreview').classList.remove('hidden');
        confetti({ particleCount: 100, spread: 70 });
    }
    console.log('Score:', score);
}

async function validateEmail() {
    const email = document.getElementById('userEmail').value;
    if (!email) return alert('Enter your Storacha email!');
    document.getElementById('txStatus').textContent = 'Validating email... Check inbox for link.';
    try {
        await storachaClient.login(email);
        await storachaClient.setCurrentSpace(SPACE_DID);
        document.getElementById('emailInput').style.display = 'none';
        document.getElementById('claimBtn').style.display = 'block';
        document.getElementById('claimBtn').disabled = false;
        document.getElementById('txStatus').textContent = 'Validated! Click Claim NFT.';
    } catch (error) {
        alert('Validation failed: ' + error.message + '. Check email/Spam.');
    }
}

async function claimNFT() {
    if (score < 8) return;
    const claimBtn = document.getElementById('claimBtn');
    claimBtn.disabled = true;
    document.getElementById('txStatus').textContent = 'Generating badge...';

    try {
        const svg = generateSVG(score, currentTopic);
        const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
        const svgFile = new File([svgBlob], 'badge.svg', { type: 'image/svg+xml' });

        const metadata = {
            name: `EduChain Badge - ${currentTopic.charAt(0).toUpperCase() + currentTopic.slice(1)}`,
            description: `Science Quiz Certificate: ${score}/10 on ${currentTopic}. Minted: ${new Date().toISOString().split('T')[0]}. Verified on blockchain.`,
            image: 'badge.svg',
            attributes: [
                { trait_type: 'Topic', value: currentTopic },
                { trait_type: 'Score', value: score },
                { trait_type: 'Pass Threshold', value: '80%' },
                { trait_type: 'Date', value: new Date().toISOString().split('T')[0] }
            ]
        };
        const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
        const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });

        document.getElementById('txStatus').textContent = 'Uploading to IPFS/Storacha...';
        const cid = await storachaClient.uploadDirectory([svgFile, metadataFile]);
        const uri = `https://ipfs.io/ipfs/${cid}/metadata.json`;

        document.getElementById('txStatus').textContent = 'Minting on Base Sepolia... (Confirm MetaMask)';
        const tx = await contract.mint(await signer.getAddress(), uri);
        const receipt = await tx.wait();
        const tokenId = receipt.events.find(e => e.event === 'Transfer').args.tokenId.toString();
        document.getElementById('txStatus').textContent = `Minted! Token #${tokenId}. View: https://sepolia.basescan.org/tx/${tx.hash}`;
        document.getElementById('txStatus').style.color = 'green';
        confetti({ particleCount: 200, spread: 120 });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('txStatus').textContent = 'Error: ' + (error.message || 'Upload/mint failed. Re-validate email.');
        document.getElementById('txStatus').style.color = 'red';
    }
    claimBtn.disabled = false;
}

function generateSVG(score, topic) {
    return `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="#4CAF50" rx="20"/>
        <text x="200" y="80" font-family="Arial" font-size="24" fill="white" text-anchor="middle">EduChain Badge</text>
        <text x="200" y="120" font-family="Arial" font-size="18" fill="white" text-anchor="middle">${topic.toUpperCase()}</text>
        <text x="200" y="170" font-family="Arial" font-size="32" fill="gold" text-anchor="middle">${score}/10</text>
        <circle cx="200" cy="230" r="60" fill="gold" opacity="0.7"/>
        <text x="200" y="280" font-family="Arial" font-size="14" fill="white" text-anchor="middle">Blockchain Verified</text>
        <text x="200" y="320" font-family="Arial" font-size="12" fill="#ddd" text-anchor="middle">Storacha IPFS</text>
    </svg>`;
}

function restart() {
    location.reload();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Load Storacha on script load
loadStorachaClient().then(() => {
    console.log('app.js fully ready!');
    document.getElementById('loadStatus').textContent = 'Ready! Click Connect MetaMask.';
});

// Navigation function
function showPage(id) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Initial load
showPage('home');


