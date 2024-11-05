// src/app/api/blockchain/route.ts
import { NextResponse } from 'next/server';
import blockchain from '@/utils/blockchain';

export async function GET() {
  return NextResponse.json(blockchain.getChain());
}

export async function POST(request: Request) {
  const { message } = await request.json();
  const newBlock = blockchain.addBlock(message);
  return NextResponse.json({ message: 'Block added', block: newBlock });
}

// New DELETE handler to clear the blockchain
export async function DELETE() {
  blockchain.clearBlockchain();
  return NextResponse.json({ message: 'Blockchain cleared' });
}

