import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-indigo-600">DSA Master</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center py-20 px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Master DSA with
          <span className="text-indigo-600"> Smart Tracking</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Track your progress, compete with friends, and ace your coding interviews.
        </p>
        <Link
          to="/signup"
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 inline-block"
        >
          Start Free
        </Link>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor solved problems, streaks, and topic-wise progress.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="font-semibold text-lg mb-2">Spaced Repetition</h3>
            <p className="text-gray-600">Smart revision scheduling to maximize long-term retention.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="font-semibold text-lg mb-2">Compete with Friends</h3>
            <p className="text-gray-600">Join groups, climb leaderboards, and earn achievements.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
