import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { problemAPI } from '../services/problemService';
import { progressAPI } from '../services/progressService';
import toast from 'react-hot-toast';

export default function ProblemDetailPage() {
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadProblem();
  }, [slug]);

  const loadProblem = async () => {
    try {
      const problemRes = await problemAPI.getBySlug(slug);
      setProblem(problemRes.data.data);

      const progressRes = await progressAPI.getAll();
      const problemProgress = progressRes.data.data.progress.find(
        (p) => p.problem?._id === problemRes.data.data._id
      );
      setProgress(problemProgress);
    } catch (error) {
      toast.error('Failed to load problem');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      setUpdating(true);
      const response = await progressAPI.update(problem._id, { status });
      setProgress(response.data.data);

      if (response.data.xpEarned) {
        toast.success(`+${response.data.xpEarned} XP!`);
      } else {
        toast.success(`Marked as ${status}`);
      }
    } catch (error) {
      toast.error('Failed to update');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!problem) {
    return <div className="p-8 text-center">Problem not found</div>;
  }

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/problems" className="text-gray-500 hover:text-gray-700">
          ← Back to Problems
        </Link>
        {progress?.status && (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
            {progress.status === 'solved' ? '✅ Solved' : progress.status}
          </span>
        )}
      </div>

      {/* Title & Meta */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
          <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 capitalize">
            {problem.topic.replace(/-/g, ' ')}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Description</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{problem.description}</p>
      </div>

      {/* Test Cases */}
      {problem.testCases?.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Examples</h2>
          <div className="space-y-4">
            {problem.testCases.map((tc, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <p><span className="text-gray-500">Input: </span>{tc.input}</p>
                <p><span className="text-gray-500">Output: </span>{tc.output}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => updateStatus('attempted')}
            disabled={updating}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 disabled:opacity-50"
          >
            Mark as Attempted
          </button>
          <button
            onClick={() => updateStatus('solved')}
            disabled={updating}
            className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
          >
            Mark as Solved
          </button>
          {problem.leetcodeUrl && (
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600"
            >
              Open on LeetCode →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
