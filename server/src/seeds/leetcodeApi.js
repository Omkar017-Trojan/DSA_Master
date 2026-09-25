const https = require('https');

function leetcodeQuery(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query, variables });
    const options = {
      hostname: 'leetcode.com',
      path: '/graphql/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://leetcode.com/problemset/all/',
        'Origin': 'https://leetcode.com'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse LeetCode response: ${data.substring(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Request timeout')); });
    req.write(body);
    req.end();
  });
}

const LIST_QUERY = `query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList: questionList(categorySlug: $categorySlug, limit: $limit, skip: $skip, filters: $filters) {
    total: totalNum
    questions: data {
      title
      titleSlug
      difficulty
      topicTags { name slug }
      isPaidOnly
    }
  }
}`;

const DETAIL_QUERY = `query questionContent($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    title
    titleSlug
    difficulty
    content
    topicTags { name slug }
    stats
    hints
  }
}`;

async function fetchProblemList(difficulty, limit = 50, skip = 0) {
  const difficultyMap = { easy: 'EASY', medium: 'MEDIUM', hard: 'HARD' };
  const res = await leetcodeQuery(LIST_QUERY, {
    categorySlug: '',
    skip,
    limit,
    filters: { difficulty: difficultyMap[difficulty] }
  });
  const questions = res.data?.problemsetQuestionList?.questions || [];
  return questions.filter(q => !q.isPaidOnly);
}

async function fetchProblemDetail(titleSlug) {
  const res = await leetcodeQuery(DETAIL_QUERY, { titleSlug });
  return res.data?.question || null;
}

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, code) => '\n```\n' + stripHtml(code) + '\n```\n')
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, c) => '`' + stripHtml(c) + '`')
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const TAG_TO_TOPIC = {
  'Array': 'arrays', 'Hash Table': 'hashmaps', 'Hash Map': 'hashmaps',
  'String': 'strings', 'Two Pointers': 'two-pointers',
  'Linked List': 'linked-lists', 'Stack': 'stacks-queues', 'Queue': 'stacks-queues',
  'Tree': 'trees', 'Binary Tree': 'trees', 'Binary Search Tree': 'trees',
  'Graph': 'graphs',
  'Dynamic Programming': 'dynamic-programming', 'DP': 'dynamic-programming',
  'Greedy': 'greedy', 'Backtracking': 'backtracking',
  'Binary Search': 'binary-search', 'Sorting': 'sorting', 'Merge Sort': 'sorting',
  'Math': 'math', 'Bit Manipulation': 'bit-manipulation',
  'Sliding Window': 'sliding-window', 'Heap': 'heap', 'Priority Queue': 'heap',
  'Trie': 'trie', 'Design': 'design', 'Recursion': 'backtracking',
  'Divide and Conquer': 'other', 'Matrix': 'arrays', 'Depth-First Search': 'graphs',
  'Breadth-First Search': 'graphs', 'Union Find': 'graphs', 'Topological Sort': 'graphs',
  'Monotonic Stack': 'stacks-queues', 'Bitmask': 'bit-manipulation',
  'Counting': 'hashmaps', 'Prefix Sum': 'arrays', 'Simulation': 'other',
  'String Matching': 'strings', 'Rolling Hash': 'strings',
  'Number Theory': 'math', 'Combinatorics': 'math', 'Probability': 'math',
};

function mapTagsToTopic(tags) {
  for (const tag of tags) {
    const mapped = TAG_TO_TOPIC[tag.name];
    if (mapped) return mapped;
  }
  return 'other';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  fetchProblemList,
  fetchProblemDetail,
  stripHtml,
  mapTagsToTopic,
  sleep
};
