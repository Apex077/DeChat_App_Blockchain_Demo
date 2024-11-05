// src/utils/blockchain.ts
import crypto from 'crypto';

class Block {
  index: number;
  previousHash: string;
  message: string;
  timestamp: number;
  hash: string;

  constructor(index: number, previousHash: string, message: string, timestamp = Date.now()) {
    this.index = index;
    this.previousHash = previousHash;
    this.message = message;
    this.timestamp = timestamp;
    this.hash = this.computeHash();
  }

  computeHash(): string {
    const blockData = `${this.index}${this.previousHash}${this.message}${this.timestamp}`;
    return crypto.createHash('sha256').update(blockData).digest('hex');
  }
}

class Blockchain {
  chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(): Block {
    return new Block(0, '0', 'Genesis Block');
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(message: string): Block {
    const latestBlock = this.getLatestBlock();
    const newBlock = new Block(
      latestBlock.index + 1,
      latestBlock.hash,
      message
    );
    this.chain.push(newBlock);
    return newBlock;
  }

  getChain(): Block[] {
    return this.chain;
  }

  // New method to clear the blockchain except the Genesis block
  clearBlockchain(): void {
    this.chain = [this.createGenesisBlock()];
  }
}

export default new Blockchain();

