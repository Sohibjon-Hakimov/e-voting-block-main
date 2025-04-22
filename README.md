# ✨ E-Voting Blockchain App

This is a **decentralized e-voting application** built with **React**, **Solidity (Smart Contracts)**, and the **Ethereum blockchain**. Admins can register candidates and manage the voting process, while registered users (voters) can securely cast votes. All voting data is stored **on-chain**, and candidate images are stored via **IPFS**.

---

## 🔧 Tech Stack & Tools

### 🔴 Frontend

- **React.js** (with Hooks)
- **Redux Toolkit** (State Management)
- **Material UI** (Modern UI Components)
- **React Router DOM**
- **React Loading Spinner**

### 🔴 Backend (Blockchain)

- **Solidity** (Smart Contracts)
- **Truffle** (Smart Contract Development & Migration)
- **Ganache** (Local Ethereum Blockchain)
- **MetaMask** (Wallet for Transaction Signing)

### 🔴 Storage

- **IPFS** via [Web3.Storage](https://web3.storage/) (for image hosting)

---

## 📁 Folder Structure

```bash
src/
├── Admin/
│   ├── Components/
│   └── Screens/
├── User/
│   ├── Components/
│   └── Screens/
├── Api/
├── Helpers/
├── contracts/       # Solidity smart contracts
├── migrations/      # Truffle migrations
└── build/           # Compiled contract ABIs
```

---

## 🧰 Prerequisites

Before running the project, make sure you have the following installed on your machine:

- **Node.js**: Required for running the backend and the frontend application. [Download Node.js](https://nodejs.org/)
- **MetaMask**: A browser extension wallet for interacting with Ethereum. [Install MetaMask](https://metamask.io/)

---

## ⚙️ Installation

### 1. Clone the repository:

```bash
git clone <repository_url>
cd <project_folder>
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Set up MetaMask:

- Install the MetaMask extension in your browser.
- Create a wallet or import an existing one.
- Connect MetaMask to the Ethereum network (e.g. Rinkeby for development).

### 4. Run the project:

```bash
npm start
```

Frontend will be available at: [http://localhost:3000](http://localhost:3000)

### 5. Interact with Ethereum:

Once the application is running, log in as a **User** or **Admin** using MetaMask. The app interacts with the Ethereum blockchain for managing votes securely.

---

## 📦 Project Structure

```bash
/src          → React components, pages, and logic
/contracts    → Solidity smart contracts
/backend      → Node.js/Express server (API)
/public       → Static files and assets
```

---

## 📜 Smart Contract (Evote.sol)

The smart contract defines core voting logic:

```solidity
pragma solidity ^0.8.0;

contract Evote {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint public candidatesCount;

    function addCandidate(string memory name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    }

    function vote(uint candidateId) public {
        require(!voters[msg.sender], "Already voted.");
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate.");

        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;
    }
}
```

---

## 🧭 How to Use

1. **Login with MetaMask**: Click "User Login" or "Admin Login" to authenticate.
2. **Vote**: Select a candidate and cast your vote.
3. **View Results**: Admins can see live vote counts and manage states.

---

## 👥 Roles

### ✅ Admin

- Add candidate (name, age, party, qualification, image)
- Change system state to:
  - Registration
  - Voting
  - Result
- Voting countdown starts automatically (6 hours)

### ✅ User

- Register with email, password, Aadhar number
- View candidate list
- Vote (only once)

---

## ⏳ Voting Countdown

- Voting phase ends automatically after 6 hours
- Countdown visible to users
- System auto-switches to result phase in frontend

---

## 🌐 IPFS Image Upload

- Images uploaded using **Web3.Storage API**
- Image links formatted as:

```
https://ipfs.io/ipfs/{CID}
```

---

## ✅ Features Implemented

- 🔗 Fully on-chain vote tracking
- 🌍 IPFS for decentralized image storage
- 🔐 Admin-only permission for state changes
- 🗳️ Vote-per-user enforced via smart contracts

---

## 🔒 Security Notes

- Input validation on frontend and backend
- Admin-protected state functions
- One vote per address enforced by smart contract

---

## 🤝 Contribution

Feel free to **fork**, **report issues**, or **submit pull requests** to improve this project. Contributions are welcome!

---

## 🌐 #Blockchain Based Voting System

