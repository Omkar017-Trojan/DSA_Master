import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const topics = ['arrays', 'strings', 'linked-lists', 'trees', 'dynamic-programming', 'graphs', 'two-pointers', 'binary-search', 'sorting', 'backtracking', 'hashmaps', 'stacks-queues', 'greedy', 'math', 'bit-manipulation', 'sliding-window', 'heap', 'trie', 'design', 'other'];

const tabs = ['My Plans', 'Saved', 'Community Plans'];
const difficultyFilters = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState('My Plans');
  const [plans, setPlans] = useState([]);
  const [savedPlans, setSavedPlans] = useState([]);
  const [userPlans, setUserPlans] = useState([]);
  const [allProblems, setAllProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(null);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [newPlan, setNewPlan] = useState({ title: '', description: '', totalDays: 30, isPublic: false });
  const [problemSearch, setProblemSearch] = useState('');
  const [problemFilter, setProblemFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [plansRes, savedRes, problemsRes] = await Promise.all([
        api.get('/plans'),
        api.get('/plans/saved'),
        api.get('/problems')
      ]);
      setPlans(plansRes.data.data.publicPlans || []);
      setUserPlans(plansRes.data.data.userPlans || []);
      setSavedPlans(savedRes.data.data || []);
      setAllProblems(problemsRes.data.data || []);
    } catch (error) {
      console.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleStartPlan = async (planId) => {
    try {
      await api.post(`/plans/${planId}/copy`);
      toast.success('Plan started!');
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to start plan');
    }
  };

  const handleSavePlan = async (planId) => {
    try {
      await api.post(`/plans/${planId}/save`);
      toast.success('Plan saved!');
      loadData();
    } catch (error) {
      toast.error('Failed to save plan');
    }
  };

  const handleUnsavePlan = async (planId) => {
    try {
      await api.delete(`/plans/${planId}/save`);
      toast.success('Plan unsaved');
      loadData();
    } catch (error) {
      toast.error('Failed to unsave plan');
    }
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    if (selectedProblems.length === 0) {
      toast.error('Select at least one problem');
      return;
    }
    try {
      const problems = selectedProblems.map((id, i) => ({
        problem: id,
        day: Math.floor(i / Math.ceil(selectedProblems.length / newPlan.totalDays)) + 1,
        order: i
      }));
      await api.post('/plans', { ...newPlan, problems });
      toast.success('Plan created!');
      setShowCreateModal(false);
      setNewPlan({ title: '', description: '', totalDays: 30, isPublic: false });
      setSelectedProblems([]);
      loadData();
    } catch (error) {
      toast.error('Failed to create plan');
    }
  };

  const toggleProblem = (id) => {
    setSelectedProblems(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const filteredProblems = allProblems.filter(p => {
    const matchSearch = !problemSearch || p.title.toLowerCase().includes(problemSearch.toLowerCase());
    const matchTopic = !problemFilter || p.topic === problemFilter;
    return matchSearch && matchTopic;
  });

  const filteredCommunityPlans = plans.filter(p => {
    if (difficultyFilter === 'All') return true;
    return p.difficulty === difficultyFilter.toLowerCase();
  });

  const savedPlanIds = new Set(savedPlans.map(sp => sp._id?.toString()));

  const userPlanIds = new Set(userPlans.map(up => up.plan?._id?.toString()));

  const getProblemTitle = (problemRef) => {
    if (typeof problemRef === 'object' && problemRef?.title) return problemRef.title;
    const found = allProblems.find(p => p._id === problemRef);
    return found?.title || 'Unknown Problem';
  };

  const getProblemDifficulty = (problemRef) => {
    if (typeof problemRef === 'object' && problemRef?.difficulty) return problemRef.difficulty;
    const found = allProblems.find(p => p._id === problemRef);
    return found?.difficulty || 'easy';
  };

  const diffColor = (d) => {
    if (d === 'easy') return 'bg-green-100 text-green-700';
    if (d === 'medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Study Plans</h1>
        <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
          + Create Plan
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            {tab === 'Saved' && savedPlans.length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">
                {savedPlans.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* My Plans Tab */}
          {activeTab === 'My Plans' && (
            <div>
              {userPlans.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg mb-2">No active plans</p>
                  <p className="text-sm">Start a community plan or create your own!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userPlans.map((up) => (
                    <div key={up._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg">{up.plan?.title}</h3>
                        {up.plan?.source && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: up.plan.sourceColor }}>
                            {up.plan.source}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{up.plan?.description || 'No description'}</p>
                      <div className="flex gap-2 mb-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          Day {up.currentDay}/{up.plan?.totalDays}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {up.plan?.problems?.length || 0} problems
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${((up.currentDay - 1) / (up.plan?.totalDays || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved Tab */}
          {activeTab === 'Saved' && (
            <div>
              {savedPlans.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg mb-2">No saved plans</p>
                  <p className="text-sm">Bookmark plans from Community Plans to save them for later!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedPlans.map((plan) => (
                    <div key={plan._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg">{plan.title}</h3>
                        {plan.source && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: plan.sourceColor }}>
                            {plan.source}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{plan.description || 'No description'}</p>
                      <div className="flex gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {plan.problems?.length || 0} problems
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {plan.estimatedWeeks || '?'} weeks
                        </span>
                        {plan.difficulty && (
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${diffColor(plan.difficulty)}`}>
                            {plan.difficulty}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!userPlanIds.has(plan._id) && (
                          <button onClick={() => handleStartPlan(plan._id)} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 text-sm">
                            Start Plan
                          </button>
                        )}
                        <button onClick={() => handleUnsavePlan(plan._id)} className="py-2 px-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                          Remove
                        </button>
                        <button onClick={() => setShowDetailModal(plan)} className="py-2 px-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Community Plans Tab */}
          {activeTab === 'Community Plans' && (
            <div>
              {/* Difficulty Filter */}
              <div className="flex gap-2 mb-6">
                {difficultyFilters.map(df => (
                  <button
                    key={df}
                    onClick={() => setDifficultyFilter(df)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      difficultyFilter === df
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {df}
                  </button>
                ))}
              </div>

              {filteredCommunityPlans.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No plans match this filter</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCommunityPlans.map((plan) => (
                    <div key={plan._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg flex-1">{plan.title}</h3>
                        {plan.source && (
                          <a
                            href={plan.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 rounded-full text-xs font-medium text-white hover:opacity-80 ml-2 shrink-0"
                            style={{ backgroundColor: plan.sourceColor }}
                          >
                            {plan.source} ↗
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{plan.description}</p>
                      <div className="flex gap-2 mb-4 flex-wrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {plan.problems?.length || 0} problems
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {plan.totalDays || '?'} days
                        </span>
                        {plan.estimatedWeeks && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            ~{plan.estimatedWeeks} weeks
                          </span>
                        )}
                        {plan.difficulty && (
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${diffColor(plan.difficulty)}`}>
                            {plan.difficulty}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {userPlanIds.has(plan._id) ? (
                          <span className="flex-1 py-2 text-center bg-green-100 text-green-700 rounded-lg font-medium text-sm">Active</span>
                        ) : (
                          <button onClick={() => handleStartPlan(plan._id)} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 text-sm">
                            Start Plan
                          </button>
                        )}
                        <button
                          onClick={() => savedPlanIds.has(plan._id) ? handleUnsavePlan(plan._id) : handleSavePlan(plan._id)}
                          className={`py-2 px-3 border rounded-lg text-sm ${
                            savedPlanIds.has(plan._id) ? 'border-purple-300 bg-purple-50 text-purple-700' : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {savedPlanIds.has(plan._id) ? '★' : '☆'}
                        </button>
                        <button onClick={() => setShowDetailModal(plan)} className="py-2 px-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold">{showDetailModal.title}</h2>
                  {showDetailModal.source && (
                    <a href={showDetailModal.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline">
                      Source: {showDetailModal.source}
                    </a>
                  )}
                </div>
                <button onClick={() => setShowDetailModal(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
              <p className="text-sm text-gray-500 mt-2">{showDetailModal.description}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  {showDetailModal.problems?.length || 0} problems
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                  {showDetailModal.totalDays || '?'} days
                </span>
                {showDetailModal.difficulty && (
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${diffColor(showDetailModal.difficulty)}`}>
                    {showDetailModal.difficulty}
                  </span>
                )}
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {showDetailModal.problems?.length > 0 ? (
                <div>
                  {(() => {
                    const grouped = {};
                    showDetailModal.problems.forEach(p => {
                      const day = p.day || 1;
                      if (!grouped[day]) grouped[day] = [];
                      grouped[day].push(p);
                    });
                    return Object.entries(grouped).slice(0, 10).map(([day, probs]) => (
                      <div key={day} className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Day {day}</h4>
                        <div className="space-y-1">
                          {probs.map((p, i) => {
                            const title = getProblemTitle(p.problem);
                            const diff = getProblemDifficulty(p.problem);
                            return (
                              <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded text-sm">
                                <span className={`px-1.5 py-0.5 rounded text-xs font-medium capitalize ${diffColor(diff)}`}>
                                  {diff?.charAt(0)}
                                </span>
                                <span>{title}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })()}
                  {Object.keys(showDetailModal.problems.reduce((acc, p) => { acc[p.day] = true; return acc; }, {})).length > 10 && (
                    <p className="text-sm text-gray-400 text-center mt-4">
                      ...and {Object.keys(showDetailModal.problems.reduce((acc, p) => { acc[p.day] = true; return acc; }, {})).length - 10} more days
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No problems in this plan yet</p>
              )}
            </div>
            <div className="p-4 border-t bg-gray-50">
              {userPlanIds.has(showDetailModal._id) ? (
                <span className="w-full py-2 text-center bg-green-100 text-green-700 rounded-lg font-medium text-sm block">Already Active</span>
              ) : (
                <button
                  onClick={() => { handleStartPlan(showDetailModal._id); setShowDetailModal(null); }}
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
                >
                  Start This Plan
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Plan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Create Study Plan</h2>
            <form onSubmit={handleCreatePlan} className="space-y-4">
              <input type="text" placeholder="Plan title (e.g., My 30-Day DSA Prep)" value={newPlan.title} onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
              <textarea placeholder="Description (optional)" value={newPlan.description} onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Total Days</label>
                  <input type="number" min="1" value={newPlan.totalDays} onChange={(e) => setNewPlan({ ...newPlan, totalDays: parseInt(e.target.value) || 30 })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={newPlan.isPublic} onChange={(e) => setNewPlan({ ...newPlan, isPublic: e.target.checked })} className="w-4 h-4" />
                    <span className="text-sm text-gray-600">Make public</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Problems ({selectedProblems.length} selected)</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" placeholder="Search problems..." value={problemSearch} onChange={(e) => setProblemSearch(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  <select value={problemFilter} onChange={(e) => setProblemFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="">All Topics</option>
                    {topics.map(t => <option key={t} value={t}>{t.replace(/-/g, ' ')}</option>)}
                  </select>
                </div>
                <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                  {filteredProblems.map((problem) => (
                    <label key={problem._id} className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 ${selectedProblems.includes(problem._id) ? 'bg-indigo-50' : ''}`}>
                      <input type="checkbox" checked={selectedProblems.includes(problem._id)} onChange={() => toggleProblem(problem._id)} className="w-4 h-4" />
                      <span className="flex-1 text-sm">{problem.title}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${diffColor(problem.difficulty)}`}>{problem.difficulty}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={() => { setShowCreateModal(false); setSelectedProblems([]); }} className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Create Plan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
