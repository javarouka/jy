// Test script to verify that modifiedAt fields are properly updated
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function testModifiedAtUpdate() {
  try {
    console.log('Starting test for modifiedAt field updates...');

    // Create a test record
    const testRecord = await prisma.assessmentLog.create({
      data: {
        clientName: 'Test Client',
        age: 30,
        gender: 'male',
        dx: 'Test Diagnosis',
        researchType: 'Test Research',
        researchDate: new Date(),
        creditTime: 60,
        usable: true,
        notes: 'Initial notes'
      }
    });

    console.log('Created test record:');
    console.log(`ID: ${testRecord.id}`);
    console.log(`Created at: ${testRecord.createdAt}`);
    console.log(`Modified at: ${testRecord.modifiedAt}`);

    // Wait a few seconds to ensure the timestamps are different
    console.log('Waiting 3 seconds before updating...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Update the record
    const updatedRecord = await prisma.assessmentLog.update({
      where: { id: testRecord.id },
      data: { notes: 'Updated notes' }
    });

    console.log('\nUpdated test record:');
    console.log(`ID: ${updatedRecord.id}`);
    console.log(`Created at: ${updatedRecord.createdAt}`);
    console.log(`Modified at: ${updatedRecord.modifiedAt}`);

    // Check if modifiedAt was updated
    if (testRecord.modifiedAt.getTime() !== updatedRecord.modifiedAt.getTime()) {
      console.log('\n✅ SUCCESS: modifiedAt field was automatically updated!');
    } else {
      console.log('\n❌ FAILURE: modifiedAt field was not updated!');
    }

    // Clean up - delete the test record
    await prisma.assessmentLog.delete({
      where: { id: testRecord.id }
    });

    console.log('\nTest record deleted.');

  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testModifiedAtUpdate();
