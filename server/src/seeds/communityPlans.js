const communityPlans = [
  {
    title: "Striver's A2Z DSA Sheet",
    description: "Complete DSA roadmap from basics to advanced. 474 problems covering every topic from arrays to graphs and DP. Built by takeuforward.org for thorough interview preparation.",
    source: "takeuforward.org",
    sourceUrl: "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z",
    sourceColor: "#22c55e",
    difficulty: "beginner",
    estimatedWeeks: 16,
    totalDays: 90,
    isPublic: true,
    tags: ["comprehensive", "beginner-friendly", "structured"],
    problemSlugs: [
      // Basics
      "two-sum", "palindrome-number", "roman-to-integer", "longest-common-prefix",
      "valid-parentheses", "plus-one", "add-binary", "sqrtx", "climbing-stairs",
      "length-of-last-word", "single-number",
      // Arrays
      "remove-duplicates-from-sorted-array", "remove-element", "merge-sorted-array",
      "search-insert-position", "best-time-to-buy-and-sell-stock",
      "container-with-most-water", "3sum", "3sum-closest", "4sum",
      // Strings
      "longest-substring-without-repeating-characters", "longest-palindromic-substring",
      "integer-to-roman", "count-and-say", "valid-palindrome",
      // Linked Lists
      "merge-two-sorted-lists", "remove-nth-node-from-end-of-list",
      "swap-nodes-in-pairs", "reverse-nodes-in-k-group", "add-two-numbers",
      // Binary Search
      "search-in-rotated-sorted-array", "find-first-and-last-position-of-element-in-sorted-array",
      "powx-n", "divide-two-integers", "find-minimum-in-rotated-sorted-array-ii",
      // Sorting
      "next-permutation", "rotate-image",
      // Stacks
      "largest-rectangle-in-histogram", "maximal-rectangle", "longest-valid-parentheses",
      // Recursion / Backtracking
      "generate-parentheses", "combination-sum", "combination-sum-ii",
      "permutations", "permutations-ii", "n-queens", "n-queens-ii",
      "sudoku-solver", "letter-combinations-of-a-phone-number",
      // Trees
      "binary-tree-inorder-traversal", "same-tree", "symmetric-tree",
      "maximum-depth-of-binary-tree", "convert-sorted-array-to-binary-search-tree",
      "balanced-binary-tree", "minimum-depth-of-binary-tree", "path-sum",
      "pascals-triangle", "pascals-triangle-ii",
      "binary-tree-maximum-path-sum",
      // Graphs
      "word-ladder", "word-ladder-ii",
      // DP
      "climbing-stairs", "best-time-to-buy-and-sell-stock-iii",
      // Hard
      "median-of-two-sorted-arrays", "regular-expression-matching",
      "merge-k-sorted-lists", "trapping-rain-water", "wildcard-matching",
      "text-justification", "minimum-window-substring", "distinct-subsequences",
      "palindrome-partitioning-ii", "word-break-ii", "candy",
      "scramble-string", "max-points-on-a-line"
    ]
  },
  {
    title: "NeetCode 150",
    description: "150 most important LeetCode problems organized by pattern. Each problem has a video walkthrough. The best structured roadmap for coding interviews.",
    source: "neetcode.io",
    sourceUrl: "https://neetcode.io/roadmap",
    sourceColor: "#3b82f6",
    difficulty: "intermediate",
    estimatedWeeks: 10,
    totalDays: 60,
    isPublic: true,
    tags: ["pattern-based", "video-explanations", "curated"],
    problemSlugs: [
      // Arrays & Hashing
      "two-sum", "group-anagrams", "container-with-most-water",
      // Two Pointers
      "3sum", "valid-palindrome",
      // Sliding Window
      "longest-substring-without-repeating-characters", "minimum-window-substring",
      // Binary Search
      "search-in-rotated-sorted-array", "find-first-and-last-position-of-element-in-sorted-array",
      // Trees
      "maximum-depth-of-binary-tree", "same-tree", "symmetric-tree",
      "binary-tree-inorder-traversal", "binary-tree-maximum-path-sum",
      // Graphs
      "number-of-islands", "course-schedule",
      // Dynamic Programming
      "climbing-stairs", "best-time-to-buy-and-sell-stock",
      // Backtracking
      "combination-sum", "permutations", "generate-parentheses",
      // Linked Lists
      "merge-two-sorted-lists", "remove-nth-node-from-end-of-list",
      "swap-nodes-in-pairs", "merge-k-sorted-lists",
      // Stacks
      "valid-parentheses", "largest-rectangle-in-histogram",
      // Math
      "rotate-image", "powx-n",
      // Trie
      // Greedy
      "candy", "jump-game-ii",
      // Intervals
      // Heap
      // Hard
      "median-of-two-sorted-arrays", "trapping-rain-water",
      "wildcard-matching", "regular-expression-matching",
      "n-queens", "sudoku-solver"
    ]
  },
  {
    title: "Blind 75",
    description: "The original 75 must-solve LeetCode problems. Curated by an ex-Meta engineer for FAANG interview prep. High signal, no filler.",
    source: "Teamblind",
    sourceUrl: "https://leetcode.com/discuss/general-discussion/460599/blind-75",
    sourceColor: "#a855f7",
    difficulty: "intermediate",
    estimatedWeeks: 6,
    totalDays: 45,
    isPublic: true,
    tags: ["minimal", "high-impact", "classic"],
    problemSlugs: [
      // Arrays
      "two-sum", "best-time-to-buy-and-sell-stock", "container-with-most-water",
      "3sum", "trapping-rain-water",
      // Binary
      "single-number",
      // DP
      "climbing-stairs", "best-time-to-buy-and-sell-stock",
      // Graph
      "number-of-islands",
      // Linked List
      "merge-two-sorted-lists", "remove-nth-node-from-end-of-list",
      "merge-k-sorted-lists", "swap-nodes-in-pairs",
      // Matrix
      "rotate-image", "valid-sudoku",
      // String
      "longest-substring-without-repeating-characters",
      "minimum-window-substring", "valid-palindrome",
      "longest-palindromic-substring", "valid-parentheses",
      // Trees
      "maximum-depth-of-binary-tree", "same-tree", "symmetric-tree",
      "binary-tree-inorder-traversal", "binary-tree-maximum-path-sum",
      // Backtracking
      "combination-sum", "generate-parentheses", "permutations",
      // Binary Search
      "search-in-rotated-sorted-array",
      // Hard
      "median-of-two-sorted-arrays", "regular-expression-matching",
      "n-queens", "sudoku-solver", "largest-rectangle-in-histogram",
      "text-justification", "word-break-ii", "distinct-subsequences",
      "palindrome-partitioning-ii", "candy", "word-ladder",
      "max-points-on-a-line"
    ]
  },
  {
    title: "Striver SDE Sheet",
    description: "180+ problems specifically curated for SDE interview preparation. Topic-wise with easy to hard progression within each topic.",
    source: "takeuforward.org",
    sourceUrl: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
    sourceColor: "#22c55e",
    difficulty: "intermediate",
    estimatedWeeks: 12,
    totalDays: 60,
    isPublic: true,
    tags: ["sde-focused", "topic-wise", "interview-prep"],
    problemSlugs: [
      // Arrays
      "two-sum", "best-time-to-buy-and-sell-stock", "container-with-most-water",
      "3sum", "trapping-rain-water", "merge-sorted-array",
      // Strings
      "longest-substring-without-repeating-characters", "longest-palindromic-substring",
      "valid-palindrome", "integer-to-roman",
      // Linked Lists
      "merge-two-sorted-lists", "remove-nth-node-from-end-of-list",
      "swap-nodes-in-pairs", "add-two-numbers", "merge-k-sorted-lists",
      // Binary Search
      "search-in-rotated-sorted-array", "find-first-and-last-position-of-element-in-sorted-array",
      // Trees
      "maximum-depth-of-binary-tree", "same-tree", "symmetric-tree",
      "binary-tree-inorder-traversal", "binary-tree-maximum-path-sum",
      // Graphs
      "number-of-islands",
      // DP
      "climbing-stairs", "best-time-to-buy-and-sell-stock",
      // Backtracking
      "combination-sum", "permutations", "generate-parentheses", "n-queens",
      // Stacks
      "valid-parentheses", "largest-rectangle-in-histogram",
      // Sorting
      "rotate-image", "next-permutation",
      // Hard
      "median-of-two-sorted-arrays", "regular-expression-matching",
      "wildcard-matching", "text-justification", "minimum-window-substring"
    ]
  },
  {
    title: "Grind 75",
    description: "75 problems with a customizable schedule. Tell it your timeline and hours/week, get a personalized daily plan. Built for time-boxed prep.",
    source: "techinterviewhandbook.org",
    sourceUrl: "https://www.techinterviewhandbook.org/grind75",
    sourceColor: "#f97316",
    difficulty: "intermediate",
    estimatedWeeks: 8,
    totalDays: 45,
    isPublic: true,
    tags: ["customizable", "schedule-tool", "time-boxed"],
    problemSlugs: [
      // Arrays
      "two-sum", "best-time-to-buy-and-sell-stock", "container-with-most-water",
      "3sum", "trapping-rain-water",
      // Binary
      "single-number",
      // DP
      "climbing-stairs", "best-time-to-buy-and-sell-stock",
      // Graph
      "number-of-islands",
      // Linked List
      "merge-two-sorted-lists", "remove-nth-node-from-end-of-list",
      "merge-k-sorted-lists", "swap-nodes-in-pairs",
      // Matrix
      "rotate-image", "valid-sudoku",
      // String
      "longest-substring-without-repeating-characters",
      "minimum-window-substring", "valid-palindrome",
      "longest-palindromic-substring", "valid-parentheses",
      // Trees
      "maximum-depth-of-binary-tree", "same-tree", "symmetric-tree",
      "binary-tree-inorder-traversal", "binary-tree-maximum-path-sum",
      // Backtracking
      "combination-sum", "generate-parentheses", "permutations",
      // Binary Search
      "search-in-rotated-sorted-array",
      // Hard
      "median-of-two-sorted-arrays", "regular-expression-matching",
      "n-queens", "sudoku-solver", "largest-rectangle-in-histogram",
      "word-break-ii", "distinct-subsequences", "candy",
      "word-ladder"
    ]
  },
  {
    title: "LeetCode 75",
    description: "Official LeetCode curated list of 75 must-solve problems. Integrates directly with LeetCode's progress tracking. Covers all major patterns.",
    source: "leetcode.com",
    sourceUrl: "https://leetcode.com/studyplan/leetcode-75/",
    sourceColor: "#eab308",
    difficulty: "intermediate",
    estimatedWeeks: 8,
    totalDays: 45,
    isPublic: true,
    tags: ["official", "leetcode-native", "pattern-focused"],
    problemSlugs: [
      // Arrays
      "two-sum", "best-time-to-buy-and-sell-stock", "container-with-most-water",
      "3sum",
      // Sliding Window
      "longest-substring-without-repeating-characters", "minimum-window-substring",
      // Two Pointers
      "valid-palindrome",
      // Binary Search
      "search-in-rotated-sorted-array",
      // Trees
      "maximum-depth-of-binary-tree", "same-tree", "symmetric-tree",
      "binary-tree-inorder-traversal", "binary-tree-maximum-path-sum",
      // Graphs
      "number-of-islands",
      // DP
      "climbing-stairs", "best-time-to-buy-and-sell-stock",
      // Backtracking
      "combination-sum", "permutations", "generate-parentheses",
      // Linked Lists
      "merge-two-sorted-lists", "remove-nth-node-from-end-of-list",
      "merge-k-sorted-lists", "swap-nodes-in-pairs",
      // Stacks
      "valid-parentheses", "largest-rectangle-in-histogram",
      // Matrix
      "rotate-image", "valid-sudoku",
      // Hard
      "median-of-two-sorted-arrays", "regular-expression-matching",
      "n-queens", "sudoku-solver", "trapping-rain-water",
      "wildcard-matching", "text-justification", "minimum-window-substring"
    ]
  },
  {
    title: "Amazon FAANG Sheet",
    description: "45 most frequently asked Amazon DSA problems from 2025-2026 interviews. Focuses on arrays, trees, graphs, and design problems.",
    source: "Community",
    sourceUrl: "https://github.com/ombharatiya/FAANG-Coding-Interview-Questions",
    sourceColor: "#ef4444",
    difficulty: "advanced",
    estimatedWeeks: 4,
    totalDays: 30,
    isPublic: true,
    tags: ["company-specific", "amazon", "faang", "interview-focused"],
    problemSlugs: [
      // Amazon Top
      "two-sum", "number-of-islands", "merge-intervals",
      "group-anagrams", "trapping-rain-water",
      "product-of-array-except-self", "longest-substring-without-repeating-characters",
      "minimum-window-substring", "merge-k-sorted-lists",
      // Trees
      "binary-tree-inorder-traversal", "maximum-depth-of-binary-tree",
      "binary-tree-maximum-path-sum",
      // Graphs
      "word-ladder",
      // DP
      "climbing-stairs", "best-time-to-buy-and-sell-stock",
      // Design
      // Linked Lists
      "merge-two-sorted-lists", "remove-nth-node-from-end-of-list",
      "swap-nodes-in-pairs",
      // Binary Search
      "search-in-rotated-sorted-array", "find-first-and-last-position-of-element-in-sorted-array",
      // Stacks
      "valid-parentheses", "largest-rectangle-in-histogram",
      // Arrays
      "3sum", "container-with-most-water", "rotate-image",
      "next-permutation", "set-matrix-zeroes",
      // Hard
      "median-of-two-sorted-arrays", "regular-expression-matching",
      "wildcard-matching", "text-justification",
      "n-queens", "sudoku-solver"
    ]
  },
  {
    title: "Google DSA Sheet",
    description: "35 most frequently asked Google interview problems. Heavy focus on graphs, trees, DP, and system design patterns.",
    source: "FAANG-Coding-Interview-Questions",
    sourceUrl: "https://github.com/ombharatiya/FAANG-Coding-Interview-Questions",
    sourceColor: "#4285f4",
    difficulty: "advanced",
    estimatedWeeks: 4,
    totalDays: 30,
    isPublic: true,
    tags: ["google", "company-specific", "faang"],
    problemSlugs: [
      "two-sum", "number-of-islands", "merge-intervals",
      "validate-binary-search-tree", "course-schedule",
      "longest-substring-without-repeating-characters",
      "trapping-rain-water", "median-of-two-sorted-arrays",
      "group-anagrams", "word-ladder", "merge-k-sorted-lists",
      "container-with-most-water", "coin-change",
      "search-in-rotated-sorted-array", "product-of-array-except-self",
      "combination-sum", "minimum-window-substring",
      "largest-rectangle-in-histogram",
      "binary-tree-inorder-traversal", "binary-tree-maximum-path-sum",
      "regular-expression-matching", "wildcard-matching",
      "n-queens", "sudoku-solver", "text-justification",
      "generate-parentheses", "permutations",
      "rotate-image", "3sum", "single-number"
    ]
  },
  {
    title: "Meta DSA Sheet",
    description: "35 most frequently asked Meta/Facebook interview problems. Focus on arrays, trees, graphs, and system design.",
    source: "FAANG-Coding-Interview-Questions",
    sourceUrl: "https://github.com/ombharatiya/FAANG-Coding-Interview-Questions",
    sourceColor: "#0668E1",
    difficulty: "advanced",
    estimatedWeeks: 4,
    totalDays: 30,
    isPublic: true,
    tags: ["meta", "facebook", "company-specific", "faang"],
    problemSlugs: [
      "two-sum", "longest-substring-without-repeating-characters",
      "group-anagrams", "merge-intervals",
      "binary-tree-inorder-traversal", "binary-tree-maximum-path-sum",
      "trapping-rain-water", "container-with-most-water",
      "3sum", "valid-palindrome", "merge-k-sorted-lists",
      "number-of-islands", "word-ladder",
      "minimum-window-substring", "combination-sum",
      "rotate-image", "product-of-array-except-self",
      "climbing-stairs", "best-time-to-buy-and-sell-stock",
      "regular-expression-matching", "n-queens",
      "largest-rectangle-in-histogram", "generate-parentheses",
      "permutations", "search-in-rotated-sorted-array",
      "median-of-two-sorted-arrays", "candy"
    ]
  },
  {
    title: "Microsoft DSA Sheet",
    description: "20 most frequently asked Microsoft interview problems. Balanced coverage of all major DSA topics.",
    source: "FAANG-Coding-Interview-Questions",
    sourceUrl: "https://github.com/ombharatiya/FAANG-Coding-Interview-Questions",
    sourceColor: "#00a4ef",
    difficulty: "advanced",
    estimatedWeeks: 3,
    totalDays: 21,
    isPublic: true,
    tags: ["microsoft", "company-specific", "faang"],
    problemSlugs: [
      "two-sum", "merge-intervals", "longest-substring-without-repeating-characters",
      "trapping-rain-water", "median-of-two-sorted-arrays",
      "number-of-islands", "word-ladder", "combination-sum",
      "binary-tree-inorder-traversal", "binary-tree-maximum-path-sum",
      "minimum-window-substring", "container-with-most-water",
      "3sum", "rotate-image", "group-anagrams",
      "merge-k-sorted-lists", "largest-rectangle-in-histogram",
      "generate-parentheses", "n-queens", "regular-expression-matching"
    ]
  },
  {
    title: "NeetCode All (250)",
    description: "Extended NeetCode roadmap with 250 problems. Complete coverage from basics to advanced patterns with video walkthroughs.",
    source: "neetcode.io",
    sourceUrl: "https://neetcode.io/roadmap",
    sourceColor: "#3b82f6",
    difficulty: "intermediate",
    estimatedWeeks: 16,
    totalDays: 90,
    isPublic: true,
    tags: ["comprehensive", "pattern-based", "video-explanations"],
    problemSlugs: [
      "two-sum", "group-anagrams", "container-with-most-water",
      "3sum", "valid-palindrome",
      "longest-substring-without-repeating-characters", "minimum-window-substring",
      "search-in-rotated-sorted-array", "find-first-and-last-position-of-element-in-sorted-array",
      "maximum-depth-of-binary-tree", "same-tree", "symmetric-tree",
      "binary-tree-inorder-traversal", "binary-tree-maximum-path-sum",
      "number-of-islands", "course-schedule",
      "climbing-stairs", "best-time-to-buy-and-sell-stock",
      "combination-sum", "permutations", "generate-parentheses",
      "merge-two-sorted-lists", "remove-nth-node-from-end-of-list",
      "swap-nodes-in-pairs", "merge-k-sorted-lists",
      "valid-parentheses", "largest-rectangle-in-histogram",
      "rotate-image", "powx-n",
      "candy", "jump-game-ii",
      "median-of-two-sorted-arrays", "trapping-rain-water",
      "wildcard-matching", "regular-expression-matching",
      "n-queens", "sudoku-solver",
      "single-number", "best-time-to-buy-and-sell-stock-iii",
      "integer-to-roman", "count-and-say", "divide-two-integers",
      "next-permutation", "search-in-rotated-sorted-array",
      "combination-sum-ii", "permutations-ii", "letter-combinations-of-a-phone-number",
      "swap-nodes-in-pairs", "reverse-nodes-in-k-group",
      "binary-tree-maximum-path-sum", "pascals-triangle", "pascals-triangle-ii"
    ]
  },
  {
    title: "450 DSA Cracker",
    description: "450 most important DSA problems curated for placement preparation. Popular among Indian students for campus placement prep.",
    source: "GeeksforGeeks",
    sourceUrl: "https://www.geeksforgeeks.org/dsa-sheet-by-azhar-amir/",
    sourceColor: "#2f8d46",
    difficulty: "beginner",
    estimatedWeeks: 12,
    totalDays: 60,
    isPublic: true,
    tags: ["comprehensive", "placement-focused", "indian"],
    problemSlugs: [
      "two-sum", "best-time-to-buy-and-sell-stock", "container-with-most-water",
      "3sum", "trapping-rain-water", "product-of-array-except-self",
      "maximum-subarray", "merge-sorted-array",
      "remove-duplicates-from-sorted-array", "remove-element",
      "longest-substring-without-repeating-characters",
      "valid-palindrome", "longest-palindromic-substring",
      "merge-two-sorted-lists", "remove-nth-node-from-end-of-list",
      "swap-nodes-in-pairs", "merge-k-sorted-lists",
      "search-in-rotated-sorted-array", "find-first-and-last-position-of-element-in-sorted-array",
      "maximum-depth-of-binary-tree", "same-tree", "symmetric-tree",
      "binary-tree-inorder-traversal",
      "number-of-islands", "word-ladder",
      "climbing-stairs", "best-time-to-buy-and-sell-stock",
      "combination-sum", "permutations", "generate-parentheses",
      "valid-parentheses", "largest-rectangle-in-histogram",
      "rotate-image", "group-anagrams",
      "median-of-two-sorted-arrays", "n-queens", "regular-expression-matching",
      "candy", "word-break-ii", "text-justification"
    ]
  },
  {
    title: "FAANG Must Do Problems",
    description: "30 essential problems that appear across all FAANG companies. The highest-signal problems for any interview prep.",
    source: "FAANG-Coding-Interview-Questions",
    sourceUrl: "https://github.com/ombharatiya/FAANG-Coding-Interview-Questions",
    sourceColor: "#dc2626",
    difficulty: "intermediate",
    estimatedWeeks: 4,
    totalDays: 30,
    isPublic: true,
    tags: ["faang", "cross-company", "essential"],
    problemSlugs: [
      "two-sum", "longest-substring-without-repeating-characters",
      "longest-palindromic-substring", "container-with-most-water",
      "3sum", "remove-nth-node-from-end-of-list",
      "valid-parentheses", "merge-two-sorted-lists",
      "merge-k-sorted-lists", "search-in-rotated-sorted-array",
      "combination-sum", "rotate-image", "group-anagrams",
      "maximum-subarray", "jump-game",
      "merge-intervals", "climbing-stairs",
      "minimum-window-substring", "word-search",
      "decode-ways", "validate-binary-search-tree",
      "same-tree", "binary-tree-level-order-traversal",
      "maximum-depth-of-binary-tree",
      "best-time-to-buy-and-sell-stock",
      "number-of-islands", "course-schedule",
      "trapping-rain-water", "regular-expression-matching",
      "n-queens"
    ]
  }
];

module.exports = communityPlans;
