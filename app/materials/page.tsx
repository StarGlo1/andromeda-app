import React from "react";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { AddMaterialForm } from "@/app/components/AddMaterialForm";
import ScanButton from "@/app/components/ScanButton";
import { SortableRawMaterialsTable } from "@/app/components/SortableRawMaterialsTable";

// ─── Real Server Actions ───
async function addRawMaterialAction(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();
  const categoryId = String(formData.get("categoryId") || "");
  const supplierId = String(formData.get("supplierId") || "") || null;
  const locationId = String(formData.get("locationId") || "") || null;
  const unit = String(formData.get("unit") || "").trim();
  const barcode = String(formData.get("barcode") || "").trim() || null;
  const quantity = parseFloat(String(formData.get("quantity") || "0")) || 0;
  const sizePerUnit = parseFloat(String(formData.get("sizePerUnit") || "0")) || 0;
  const purchaseTotal = parseFloat(String(formData.get("purchaseTotal") || "0")) || 0;
  const reorderThreshold = parseFloat(String(formData.get("reorderThreshold") || "")) || null;
  const committedQuantity = parseFloat(String(formData.get("committedQuantity") || "0")) || 0;
  const onOrderQuantity = parseFloat(String(formData.get("onOrderQuantity") || "0")) || 0;

  if (!name || !categoryId || !unit) {
    throw new Error("Name, category, and unit are required.");
  }

  const totalQuantity = quantity * sizePerUnit;
  const costPerUnit = totalQuantity > 0 ? purchaseTotal / totalQuantity : 0;

  // Handle photo upload if present
  let imagePath: string | null = null;
  const photo = formData.get("photo") as File | null;
  if (photo && photo.size > 0) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const ext = photo.name.split(".").pop() || "jpg";
    const filename = `material-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`;
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await photo.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    imagePath = `/uploads/${filename}`;
  }

  await prisma.rawMaterial.create({
    data: {
      name,
      barcode,
      imagePath,
      categoryId,
      supplierId,
      locationId,
      totalQuantity,
      quantity,
      sizePerUnit,
      unit,
      costPerUnit,
      reorderThreshold,
      committedQuantity,
      onOrderQuantity,
    },
  });

  revalidatePath("/materials");
}

async function addCategoryAction(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();

  if (!name) {
    throw new Error("Category name is required.");
  }

  const category = await prisma.category.create({
    data: { name },
  });

  revalidatePath("/materials");
  return category;
}

async function addSupplierAction(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();
  const contact = String(formData.get("contact") || "").trim() || null;
  const website = String(formData.get("website") || "").trim() || null;
  const notes = String(formData.get("notes") || "").trim() || null;

  if (!name) {
    throw new Error("Supplier name is required.");
  }

  const supplier = await prisma.supplier.create({
    data: {
      name,
      contact,
      website,
      notes,
    },
  });

  revalidatePath("/materials");
  return supplier;
}

async function updateAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const categoryId = String(formData.get("categoryId") || "");
  const supplierId = String(formData.get("supplierId") || "") || null;
  const locationId = String(formData.get("locationId") || "") || null;
  const unit = String(formData.get("unit") || "").trim();
  const quantity = parseFloat(String(formData.get("quantity") || "0")) || 0;
  const sizePerUnit = parseFloat(String(formData.get("sizePerUnit") || "0")) || 0;
  const purchaseTotal = parseFloat(String(formData.get("purchaseTotal") || "0")) || 0;
  const reorderThreshold = parseFloat(String(formData.get("reorderThreshold") || "")) || null;
  const committedQuantity = parseFloat(String(formData.get("committedQuantity") || "0")) || 0;
  const onOrderQuantity = parseFloat(String(formData.get("onOrderQuantity") || "0")) || 0;

  if (!id || !name || !categoryId || !unit) {
    throw new Error("Name, category, and unit are required.");
  }

  const totalQuantity = quantity * sizePerUnit;
  const costPerUnit = totalQuantity > 0 ? purchaseTotal / totalQuantity : 0;

  await prisma.rawMaterial.update({
    where: { id },
    data: {
      name,
      categoryId,
      supplierId,
      locationId,
      totalQuantity,
      quantity,
      sizePerUnit,
      unit,
      costPerUnit,
      reorderThreshold,
      committedQuantity,
      onOrderQuantity,
    },
  });

  revalidatePath("/materials");
}

async function deleteAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Material ID is required.");
  }

  await prisma.rawMaterial.delete({
    where: { id },
  });

  revalidatePath("/materials");
}

export default async function MaterialsPage() {
  const [categories, suppliers, locations, materials] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.supplier.findMany({ orderBy: { name: "asc" } }),
    prisma.location.findMany({ orderBy: { name: "asc" } }),
    prisma.rawMaterial.findMany({
      include: { category: true, supplier: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const totalMaterials = materials.length;
  const lowStockCount = materials.filter(
    (m) => m.reorderThreshold !== null && (m.totalQuantity ?? 0) <= m.reorderThreshold
  ).length;
  const uniqueCategories = new Set(materials.map((m) => m.categoryId)).size;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-text mt-3">Raw Materials</h1>
        <ScanButton />
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-widget border border-default p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-text-muted">TOTAL RAW MATERIALS</h3>
          <p className="mt-2 text-3xl font-bold text-text">{totalMaterials}</p>
        </div>
        <div className="bg-surface-widget border border-default p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-text-muted">LOW STOCK ALERTS</h3>
          <p className="mt-2 text-3xl font-bold text-text">{lowStockCount}</p>
        </div>
        <div className="bg-surface-widget border border-default p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-text-muted">CATEGORIES</h3>
          <p className="mt-2 text-3xl font-bold text-text">{uniqueCategories}</p>
        </div>
      </div>

      {/* Add Material Form Component */}
      <AddMaterialForm
        categories={categories}
        suppliers={suppliers}
        locations={locations}
        addRawMaterialAction={addRawMaterialAction}
        addCategoryAction={addCategoryAction}
        addSupplierAction={addSupplierAction}
      />

      {/* Sortable Table Component */}
      <div className="bg-surface-widget border border-default rounded-xl shadow-sm overflow-x-auto">
        <SortableRawMaterialsTable
          materials={materials}
          categories={categories}
          suppliers={suppliers}
          updateAction={updateAction}
          deleteAction={deleteAction}
          addCategoryAction={addCategoryAction}
          addSupplierAction={addSupplierAction}
        />
      </div>
    </div>
  );
}