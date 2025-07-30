/* eslint-disable @typescript-eslint/no-explicit-any */
import prismadb from "../prismadb";

async function migrateProducts() {
  try {
    // Fetch all products (you can paginate if the dataset is huge)
    const products = await prismadb.product.findMany();

    console.log(`Found ${products.length} products. Starting migration...`);

    let updatedCount = 0;

    for (const product of products) {
      const updateData: any = {};

      // Add commonly needed fields for e-commerce products
      updateData.rating = product.rating || 0;
      updateData.unitsSold = product.unitsSold || 0;
      updateData.earned = product.earned || 0;
      updateData.productStatus = product.productStatus || 'IN_STOCK';
      updateData.quantity = product.quantity || 1;

      if (Object.keys(updateData).length > 0) {
        await prismadb.product.update({
          where: { id: product.id },
          data: updateData,
        });
        updatedCount++;
      }
    }

    console.log(`✅ Migration complete. ${updatedCount} products updated.`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await prismadb.$disconnect();
  }
}

migrateProducts(); 