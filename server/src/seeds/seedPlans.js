const mongoose = require('mongoose');
const Problem = require('../models/Problem');
const Plan = require('../models/Plan');
const communityPlans = require('./communityPlans');
require('dotenv').config();

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('\n--- Seeding Community Plans ---');
    await Plan.deleteMany({ source: { $exists: true, $ne: null } });
    console.log('Cleared existing community plans');

    const allDbProblems = await Problem.find().select('slug _id');
    const slugToId = {};
    allDbProblems.forEach(p => { slugToId[p.slug] = p._id; });
    console.log(`Found ${allDbProblems.length} problems in database`);

    let plansCreated = 0;
    for (const planData of communityPlans) {
      const { problemSlugs, ...planFields } = planData;
      const problems = [];
      let order = 0;
      let skipped = 0;

      for (const slug of problemSlugs) {
        if (slugToId[slug]) {
          problems.push({ problem: slugToId[slug], day: Math.floor(order / 5) + 1, order });
          order++;
        } else {
          skipped++;
        }
      }

      if (problems.length > 0) {
        await Plan.create({ ...planFields, problems });
        plansCreated++;
        console.log(`  Created: ${planFields.title} (${problems.length} problems matched, ${skipped} skipped)`);
      }
    }
    console.log(`\nSeeded ${plansCreated} community plans`);

    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedPlans();
