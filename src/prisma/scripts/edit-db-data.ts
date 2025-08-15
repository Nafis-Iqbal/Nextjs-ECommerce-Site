/* eslint-disable @typescript-eslint/no-explicit-any */
import prismadb from "../prismadb";

async function editDBData() {
  try {
    console.log(`Running DB migration script...`);

    const targetId = "c6eff48d-f630-4eef-a2f9-0a326f364c8e";
    const targetData = "b005682e-5829-4316-8079-d31c18afd976";

    await prismadb.user.updateMany({
      where: {
        id: targetId
      },
      data: {
        addressId: targetData
      }
    })

    console.log(`✅ Migration complete. Data updated.`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await prismadb.$disconnect();
  }
}

editDBData();
