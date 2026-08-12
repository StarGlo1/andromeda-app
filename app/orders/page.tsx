import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Navbar from "@/app/components/Navbar";
import { OrderForm } from "./OrderForm";
import { OrdersTable } from "./OrdersTable";

async function createOrder(formData: FormData) {
  "use server"; const supplierId = formData.get("supplierId") as string; const expectedDate = formData.get("expectedDate") as string; const notes = formData.get("notes") as string;
  if (!supplierId) return;
  await prisma.purchaseOrder.create({ data: { supplierId, expectedDate: expectedDate ? new Date(expectedDate) : null, notes: notes || null } });
  revalidatePath("/orders");
}
async function addOrderItem(formData: FormData) {
  "use server"; const purchaseOrderId = formData.get("purchaseOrderId") as string; const materialId = formData.get("materialId") as string;
  const quantity = parseFloat(formData.get("quantity") as string) || 0; const unitCost = parseFloat(formData.get("unitCost") as string) || 0;
  if (!purchaseOrderId || !materialId || quantity <= 0) return;
  await prisma.purchaseOrderItem.create({ data: { purchaseOrderId, materialId, quantity, unitCost, receivedQty: 0 } });
  revalidatePath("/orders");
}
async function receiveOrderItem(formData: FormData) {
  "use server"; const itemId = formData.get("itemId") as string; const orderId = formData.get("orderId") as string; const receivedQty = parseFloat(formData.get("receivedQty") as string) || 0;
  if (!itemId || receivedQty <= 0) return;
  const item = await prisma.purchaseOrderItem.findUnique({ where: { id: itemId }, include: { material: true } });
  if (!item) return;
  const material = item.material; const newTotal = (material.totalQuantity ?? 0) + receivedQty;
  const currentTotalCost = (material.totalQuantity ?? 0) * (material.costPerUnit ?? 0); const newItemCost = receivedQty * item.unitCost;
  const combinedQuantity = (material.totalQuantity ?? 0) + receivedQty;
  const newCostPerUnit = combinedQuantity > 0 ? (currentTotalCost + newItemCost) / combinedQuantity : material.costPerUnit;
  await prisma.rawMaterial.update({ where: { id: item.materialId }, data: { totalQuantity: newTotal, costPerUnit: newCostPerUnit, onOrderQuantity: { decrement: receivedQty } } });
  await prisma.purchaseOrderItem.update({ where: { id: itemId }, data: { receivedQty: { increment: receivedQty } } });
  const orderItems = await prisma.purchaseOrderItem.findMany({ where: { purchaseOrderId: orderId } });
  if (orderItems.every(oi => oi.receivedQty >= oi.quantity)) {
    await prisma.purchaseOrder.update({ where: { id: orderId }, data: { status: "Received", receivedDate: new Date() } });
  }
  revalidatePath("/orders");
}
async function deleteOrder(formData: FormData) {
  "use server"; const id = formData.get("id") as string; if (!id) return;
  await prisma.purchaseOrder.delete({ where: { id } }); revalidatePath("/orders");
}

export default async function OrdersPage() {
  const orders = await prisma.purchaseOrder.findMany({ include: { supplier: { select: { id: true, name: true } }, items: { include: { material: { select: { id: true, name: true, unit: true } } } } }, orderBy: { createdAt: "desc" } });
  const suppliers = await prisma.supplier.findMany({ orderBy: { name: "asc" } });
  const materials = await prisma.rawMaterial.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, unit: true } });

  return (
    <main className="min-h-screen bg-bg text-text p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />
        <div className="bg-surface-widget border border-default rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text mb-4">New Purchase Order</h2>
          <OrderForm suppliers={suppliers} materials={materials} createOrderAction={createOrder} addItemAction={addOrderItem} />
        </div>
        <OrdersTable orders={orders} receiveAction={receiveOrderItem} deleteAction={deleteOrder} />
      </div>
    </main>
  );
}