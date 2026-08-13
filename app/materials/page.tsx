import React from 'react';
import { AddMaterialForm } from '@/app/components/AddMaterialForm';
import { SortableRawMaterialsTable } from '@/app/components/SortableRawMaterialsTable';

// Replace these server actions with your actual database actions / imports
async function addRawMaterialAction(formData: FormData) {
  'use server';
  // TODO: Implement server action to add raw material
}

async function addCategoryAction(formData: FormData) {
  'use server';
  // TODO: Implement server action to add category
}

async function addSupplierAction(formData: FormData) {
  'use server';
  // TODO: Implement server action to add supplier
}

async function updateAction(formData: FormData) {
  'use server';
  // TODO: Implement server action to update material
}

async function deleteAction(formData: FormData) {
  'use server';
  // TODO: Implement server action to delete material
}

export default async function MaterialsPage() {
  // Fetch your categories, suppliers, and materials from your database here
  const categories = [
    { id: '1', name: 'Waxes' },
    { id: '2', name: 'Fragrance Oils' },
    { id: '3', name: 'Wicks' },
    { id: '4', name: 'Containers' },
  ];

  const suppliers = [
    { id: '1', name: 'CandleScience' },
    { id: '2', name: 'Lonestar' },
    { id: '3', name: 'Flamingo Candle Co.' },
  ];

  // Placeholder material items array (replace with real DB query result)
  const materials: any[] = [];

  // Calculate dynamic stats
  const totalMaterials = materials.length;
  const lowStockCount = materials.filter(
    (m: any) => m.reorderThreshold !== null && (m.totalQuantity ?? 0) <= m.reorderThreshold
  ).length;
  const uniqueCategories = new Set(materials.map((m: any) => m.categoryId)).size;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-text">Raw Materials</h1>
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
        addRawMaterialAction={addRawMaterialAction}
        addCategoryAction={addCategoryAction}
        addSupplierAction={addSupplierAction}
      />

      {/* Sortable Table Component */}
      <div className="bg-surface-widget border border-default rounded-xl shadow-sm overflow-hidden">
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