# DrugLedger

This is a decentralized project built with Next.js, Hardhat, and The Graph to ensure transparency and security in the drug supply chain. It provides an explorer for verifying drugs, tracking events, and logging actions securely on the blockchain.

## Project Structure

The project is divided into three main directories:

- **/frontend**: The Next.js frontend that serves as the user interface for exploring drugs, logs, and events.
- **/hardhat**: Smart contracts written and deployed using Hardhat, handling the core blockchain logic.
- **/graph**: The Graph integration for indexing and querying blockchain data efficiently.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v16+)
- Hardhat
- The Graph CLI

### Cloning the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/
```

### Frontend Setup
Navigate to the frontend directory:

```bash
cd frontend
```

### Install the dependencies:
```bash
npm install
```

### Run the development server:

```bash
npm run dev
```
The app will be running at http://localhost:3000.

### Hardhat Setup
Navigate to the hardhat directory:
```bash
cd hardhat
```

### Install the dependencies:

```bash
npm install
```
### Compile the smart contracts:

```bash
npx hardhat compile
```
### Deploy the smart contracts:

```bash
npx hardhat run scripts/deploy.js --network <your_network>
```

### Graph Setup
Navigate to the graph directory:

```bash
cd graph
```
### Generate the necessary code from the subgraph schema:

```bash
graph codegen && graph build
```

### Deploy the subgraph:

```bash
npm run deploy
```
### Environment Variables
To configure your environment, add the necessary API keys and environment variables in the .env file:

```bash
NEXT_PUBLIC_GRAPH_URL=your-graph-url
HARDHAT_NETWORK=your-network
...etc
```

### Deployed Contracts
Contract Address on **Optimism Sepolia**:
Contract Address on **Lisk**: 

### Deployed Site
Website: [https://drug-ledger.vercel.app](https://drug-ledger.vercel.app)
Live Demo: [Video](www.loom.com/share/6615fd2733fd4fffaf0e1f98081d1438)


Learn More
To learn more about the technologies used in this project, check out the following:

Next.js Documentation - Learn about Next.js features and API.
Hardhat Documentation - Learn how to build and test smart contracts.
The Graph Documentation - Learn how to index and query blockchain dat
