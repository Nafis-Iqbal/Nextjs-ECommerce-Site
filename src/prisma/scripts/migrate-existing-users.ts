/* eslint-disable @typescript-eslint/no-explicit-any */
import prismadb from "../prismadb";

async function migrateUsers() {
  try {
    // Fetch all users (you can paginate if the dataset is huge)
    const users = await prismadb.user.findMany();

    console.log(`Found ${users.length} users. Starting migration...`);

    let updatedCount = 0;

    for (const user of users) {
      const updateData: any = {};

      updateData.userStatus = 'ACTIVE';
      updateData.paymentStatus = 'PAID';
      updateData.spent = 0;
      updateData.earned = 0;
      updateData.orderCount = 0;

      if (Object.keys(updateData).length > 0) {
        await prismadb.user.update({
          where: { id: user.id },
          data: updateData,
        });
        updatedCount++;
      }
    }

    console.log(`✅ Migration complete. ${updatedCount} users updated.`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await prismadb.$disconnect();
  }
}

//migrateUsers();
