import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { problemAPI } from '../services/problemService';
import { progressAPI } from '../services/progressService';
import api from '../services/api';
import toast from 'react-hot-toast';

const topics = [
  'arrays', 'strings', 'linked-lists', 'trees', 'dynamic-programming',
  'graphs', 'two-pointers', 'binary-search', 'sorting', 'backtracking',
  'hashmaps', 'stacks-queues', 'greedy', 'math', 'bit-manipulation',
  'sliding-window', 'heap', 'trie', 'design', 'other'
];

export default function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [progress, setProgress] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProblem, setNewProblem] = useState({
    title: '', description: '', difficulty: 'easy', topic: 'arrays',
    leetcodeUrl: '', companies: '', tags: ''
  });

  useEffect(() => { loadData(); }, [filters]);

  const loadData = async () => {
    try {
      const [problemsRes, progressRes] = await Promise.all([
        problemAPI.getAll(filters), progressAPI.getAll()
      ]);
      setProblems(problemsRes.data.data);
      setProgress(progressRes.data.data.progress);
    } catch (error) { console.error('Failed to load data:', error); }
    finally { setLoading(false); }
  };

  const progressMap = {};
  progress.forEach((p) => { progressMap[p.problem?._id] = p.status; });

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700', medium: 'bg-yellow-100 text-yellow-700', hard: 'bg-red-100 text-red-700'
  };
  const statusIcons = { solved: '✅', attempted: '🔄', revision: '📚', unsolved: '⬜' };

  const handleCreateProblem = async (e) => {
    e.preventDefault();
    try {
      await api.post('/problems', {
        ...newProblem,
        companies: newProblem.companies ? newProblem.companies.split(',').map(c => c.trim()) : [],
        tags: newProblem.tags ? newProblem.tags.split(',').map(t => t.trim()) : [],
        testCases: [{ input: 'Example input', output: 'Example output' }]
      });
      toast.success('Problem created!');
      setShowCreateModal(false);
      setNewProblem({ title: '', description: '', difficulty: 'easy', topic: 'arrays', leetcodeUrl: '', companies: '', tags: '' });
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create problem');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Problems</h1>
        <div className="flex gap-3">
          <p className="text-gray-500 self-center">{problems.length} problems</p>
          <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
            + Add Problem
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <select value={filters.difficulty || ''} onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select value={filters.topic || ''} onChange={(e) => setFilters({ ...filters, topic: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="">All Topics</option>
            {topics.map(t => <option key={t} value={t}>{t.replace(/-/g, ' ')}</option>)}
          </select>
          <input type="text" placeholder="Search problems..." value={filters.search || ''} onChange={(e) => setFilters({ ...filters, search: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex-1 min-w-[200px]" />
        </div>
      </div>

      {/* Problem List */}
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin" /></div>
      ) : (
        <div className="grid gap-4">
          {problems.map((problem) => (
            <Link key={problem._id} to={`/problems/${problem.slug}`} className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{statusIcons[progressMap[problem._id] || 'unsolved']}</span>
                  <div>
                    <h3 className="font-medium">{problem.title}</h3>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${difficultyColors[problem.difficulty]}`}>{problem.difficulty}</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 capitalize">{problem.topic?.replace(/-/g, ' ')}</span>
                      {problem.leetcodeUrl && (
                        <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200">
                          LeetCode ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                {problem.companies?.length > 0 && (
                  <div className="text-right text-sm text-gray-500 hidden md:block">{problem.companies.slice(0, 2).join(', ')}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Create Problem Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Problem</h2>
            <form onSubmit={handleCreateProblem} className="space-y-4">
              <input type="text" placeholder="Problem title" value={newProblem.title} onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
              <textarea placeholder="Description" value={newProblem.description} onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24" required />
              <div className="grid grid-cols-2 gap-4">
                <select value={newProblem.difficulty} onChange={(e) => setNewProblem({ ...newProblem, difficulty: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <select value={newProblem.topic} onChange={(e) => setNewProblem({ ...newProblem, topic: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg">
                  {topics.map(t => <option key={t} value={t}>{t.replace(/-/g, ' ')}</option>)}
                </select>
              </div>
              <input type="url" placeholder="LeetCode URL (optional)" value={newProblem.leetcodeUrl} onChange={(e) => setNewProblem({ ...newProblem, leetcodeUrl: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              <input type="text" placeholder="Companies (comma separated)" value={newProblem.companies} onChange={(e) => setNewProblem({ ...newProblem, companies: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              <input type="text" placeholder="Tags (comma separated)" value={newProblem.tags} onChange={(e) => setNewProblem({ ...newProblem, tags: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
