const mongoose = require('mongoose');
const Problem = require('../models/Problem');
const Plan = require('../models/Plan');
const communityPlans = require('./communityPlans');
const { fetchProblemList, fetchProblemDetail, stripHtml, mapTagsToTopic, sleep } = require('./leetcodeApi');
require('dotenv').config();

const PROBLEMS_PER_DIFFICULTY = 30;

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Problem.deleteMany({});
    console.log('Cleared existing problems');

    const allProblems = [];
    const difficulties = ['easy', 'medium', 'hard'];

    for (const diff of difficulties) {
      console.log(`\nFetching ${diff} problems from LeetCode...`);
      const list = await fetchProblemList(diff, PROBLEMS_PER_DIFFICULTY, 0);
      console.log(`  Got ${list.length} free problems`);

      for (let i = 0; i < list.length; i++) {
        const q = list[i];
        console.log(`  [${i + 1}/${list.length}] Fetching details: ${q.title}`);

        try {
          const detail = await fetchProblemDetail(q.titleSlug);
          if (!detail) {
            console.log(`    Skipped (no detail)`);
            continue;
          }

          const tags = detail.topicTags?.map(t => t.name) || [];
          const topic = mapTagsToTopic(detail.topicTags || []);

          allProblems.push({
            title: detail.title,
            slug: detail.titleSlug,
            description: stripHtml(detail.content) || `Solve ${detail.title} on LeetCode.`,
            difficulty: detail.difficulty?.toLowerCase() || diff,
            topic,
            tags,
            leetcodeUrl: `https://leetcode.com/problems/${detail.titleSlug}/`,
            companies: [],
            frequency: 50,
            testCases: [{ input: 'See LeetCode', output: 'See LeetCode' }]
          });
        } catch (err) {
          console.log(`    Error: ${err.message}`);
        }

        await sleep(300);
      }
    }

    console.log(`\nTotal problems fetched: ${allProblems.length}`);

    if (allProblems.length > 0) {
      const result = await Problem.insertMany(allProblems, { ordered: false });
      console.log(`Seeded ${result.length} problems into database`);
    }

    // === Seed Community Plans ===
    console.log('\n--- Seeding Community Plans ---');
    await Plan.deleteMany({ source: { $exists: true, $ne: null } });
    console.log('Cleared existing community plans');

    const allDbProblems = await Problem.find().select('slug _id');
    const slugToId = {};
    allDbProblems.forEach(p => { slugToId[p.slug] = p._id; });

    let plansCreated = 0;
    for (const planData of communityPlans) {
      const { problemSlugs, ...planFields } = planData;
      const problems = [];
      let order = 0;

      for (const slug of problemSlugs) {
        if (slugToId[slug]) {
          problems.push({ problem: slugToId[slug], day: Math.floor(order / 5) + 1, order });
          order++;
        }
      }

      if (problems.length > 0) {
        await Plan.create({ ...planFields, problems });
        plansCreated++;
        console.log(`  Created: ${planFields.title} (${problems.length} problems matched)`);
      }
    }
    console.log(`Seeded ${plansCreated} community plans`);

    await mongoose.disconnect();
    console.log('\nDone. Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedDB();
