import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.toLowerCase() || "";

  if (query.length < 2) {
    return new Response(JSON.stringify({ results: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const [
    materials,
    products,
    suppliers,
    customers,
    categories,
    sales,
    lots,
    alerts,
  ] = await Promise.all([
    // Raw Materials
    prisma.rawMaterial.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { unit: { contains: query } },
        ],
      },
      select: {
        id: true,
        name: true,
        unit: true,
        totalQuantity: true,
        category: { select: { name: true } },
      },
      take: 8,
    }),

    // Finished Goods / Products
    prisma.finishedGood.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { sku: { contains: query } },
          { batchCode: { contains: query } },
        ],
      },
      select: {
        id: true,
        name: true,
        sku: true,
        batchCode: true,
      },
      take: 8,
    }),

    // Suppliers
    prisma.supplier.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { contact: { contains: query } },
          { website: { contains: query } },
        ],
      },
      select: {
        id: true,
        name: true,
        contact: true,
      },
      take: 8,
    }),

    // Customers
    prisma.customer.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { email: { contains: query } },
          { phone: { contains: query } },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
      take: 8,
    }),

    // Categories
    prisma.category.findMany({
      where: {
        name: { contains: query },
      },
      select: {
        id: true,
        name: true,
      },
      take: 8,
    }),

    // Sales
    prisma.sale.findMany({
      where: {
        OR: [
          { status: { contains: query } },
          { notes: { contains: query } },
          { customer: { name: { contains: query } } },
        ],
      },
      select: {
        id: true,
        saleDate: true,
        totalAmount: true,
        status: true,
        customer: { select: { name: true } },
      },
      take: 8,
    }),

    // Lots
    prisma.lot.findMany({
      where: {
        lotNumber: { contains: query },
      },
      select: {
        id: true,
        lotNumber: true,
        kind: true,
        quantity: true,
      },
      take: 8,
    }),

    // Alerts
    prisma.alert.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { type: { contains: query } },
        ],
      },
      select: {
        id: true,
        title: true,
        type: true,
        severity: true,
        status: true,
      },
      take: 8,
    }),
  ]);

  const results = [
    ...materials.map((m) => ({
      name: m.name,
      type: "Material",
      href: `/materials/${m.id}`,
      detail: m.category?.name || m.unit || `${m.totalQuantity ?? 0} ${m.unit || ""}`,
    })),
    ...products.map((p) => ({
      name: p.name,
      type: "Product",
      href: `/finished-goods/${p.id}`,
      detail: p.sku || p.batchCode || "",
    })),
    ...suppliers.map((s) => ({
      name: s.name,
      type: "Supplier",
      href: `/suppliers`,
      detail: s.contact || "",
    })),
    ...customers.map((c) => ({
      name: c.name,
      type: "Customer",
      href: `/customers`,
      detail: c.email || c.phone || "",
    })),
    ...categories.map((c) => ({
      name: c.name,
      type: "Category",
      href: `/categories`,
      detail: "",
    })),
    ...sales.map((s) => ({
      name: `${s.customer?.name || "Sale"} - $${s.totalAmount.toFixed(2)}`,
      type: "Sale",
      href: `/sales`,
      detail: `${s.status} · ${new Date(s.saleDate).toLocaleDateString()}`,
    })),
    ...lots.map((l) => ({
      name: l.lotNumber,
      type: "Lot",
      href: `/finished-goods`,
      detail: `${l.kind} · ${l.quantity ?? 0}`,
    })),
    ...alerts.map((a) => ({
      name: a.title,
      type: "Alert",
      href: `/alerts`,
      detail: `${a.severity} · ${a.status}`,
    })),
  ];

  return new Response(JSON.stringify({ results }), {
    headers: { "Content-Type": "application/json" },
  });
}