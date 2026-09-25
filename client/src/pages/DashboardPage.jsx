import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { progressAPI } from '../services/progressService';
import { streakAPI } from '../services/streakService';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [progressRes, streakRes] = await Promise.all([
        progressAPI.getAll(),
        streakAPI.getCurrent()
      ]);
      setStats(progressRes.data.data.stats);
      setStreak(streakRes.data.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-gray-500">Keep up the great work!</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Level {user.level}</p>
          <p className="text-xl font-bold text-indigo-600">{user.xp} XP</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Solved</p>
          <p className="text-3xl font-bold">{stats?.solved || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Current Streak</p>
          <p className="text-3xl font-bold">{streak?.currentStreak || 0} days</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Easy</p>
          <p className="text-3xl font-bold text-green-600">{stats?.byDifficulty?.easy || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Medium</p>
          <p className="text-3xl font-bold text-yellow-600">{stats?.byDifficulty?.medium || 0}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/problems"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="text-3xl mb-2">📝</div>
          <h3 className="font-semibold">Practice Problems</h3>
          <p className="text-sm text-gray-500">Browse and solve DSA problems</p>
        </Link>
        <Link
          to="/plans"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="text-3xl mb-2">📋</div>
          <h3 className="font-semibold">Study Plans</h3>
          <p className="text-sm text-gray-500">Follow structured learning paths</p>
        </Link>
        <Link
          to="/groups"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="text-3xl mb-2">👥</div>
          <h3 className="font-semibold">Groups</h3>
          <p className="text-sm text-gray-500">Compete with friends</p>
        </Link>
      </div>
    </div>
  );
}
