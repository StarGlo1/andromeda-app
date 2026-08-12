import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all customers
export async function GET() {
  const customers = await prisma.customer.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      notes: true,
    },
  });
  return NextResponse.json(customers);
}

// POST create customer
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, notes } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Customer name is required" },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.create({
      data: {
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        notes: notes?.trim() || null,
      },
    });

    return NextResponse.json(customer);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create customer" },
      { status: 500 }
    );
  }
}