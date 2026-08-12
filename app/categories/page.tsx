import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CategoryManager } from "@/app/components/CategoryManager";
import Navbar from "@/app/components/Navbar";

async function addCategory(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  if (!name) return;
  await prisma.category.create({ data: { name } });
  revalidatePath("/categories");
}

async function updateCategory(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  if (!id || !name) return;
  await prisma.category.update({ where: { id }, data: { name } });
  revalidatePath("/categories");
}

async function deleteCategory(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.category.delete({ where: { id } });
  revalidatePath("/categories");
}

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen bg-bg text-text p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />
        <CategoryManager
          categories={categories}
          addAction={addCategory}
          updateAction={updateCategory}
          deleteAction={deleteCategory}
        />
      </div>
    </main>
  );
}