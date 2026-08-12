import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const products = await (prisma as any).product?.findMany() ?? []
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json([])
  }
}