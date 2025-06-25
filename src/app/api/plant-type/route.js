// src/app/api/plant-type/route.js
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const plantTypes = await prisma.plantType.findMany();
  return NextResponse.json(plantTypes);
}
