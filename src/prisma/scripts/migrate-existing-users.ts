/* eslint-disable @typescript-eslint/no-explicit-any */
import prismadb from "../prismadb";

async function migrateUsers() {
  try {
    // Fetch all users (you can paginate if the dataset is huge)
    const users = await prismadb.user.findMany({
      where:{
        id: {
          notIn: ["5ac6bef1-bea5-43bd-8d61-22635c83ad47", "c6eff48d-f630-4eef-a2f9-0a326f364c8e", ]
        }
      }
    });

    console.log(`Found ${users.length} users. Starting migration...`);

    let updatedCount = 0;

    for (const user of users) {
      const updateData: any = {};

      //Place updated user fields below here
      updateData.addressId = null;
      //Place updated user fields above here

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

migrateUsers();
