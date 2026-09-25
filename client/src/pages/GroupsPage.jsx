import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [newGroup, setNewGroup] = useState({ name: '', description: '', weeklyGoal: 10 });
  const [createdGroup, setCreatedGroup] = useState(null);

  useEffect(() => { loadGroups(); }, []);

  const loadGroups = async () => {
    try {
      const response = await api.get('/groups');
      setGroups(response.data.data);
    } catch (error) { console.error('Failed to load groups'); }
    finally { setLoading(false); }
  };

  const handleJoin = async () => {
    try {
      await api.post(`/groups/join/${inviteCode}`);
      toast.success('Joined group!');
      setShowJoinModal(false);
      setInviteCode('');
      loadGroups();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to join');
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/groups', newGroup);
      toast.success('Group created!');
      setShowCreateModal(false);
      setNewGroup({ name: '', description: '', weeklyGoal: 10 });
      setCreatedGroup(response.data.data);
      loadGroups();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create group');
    }
  };

  const copyInviteCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Invite code copied!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Groups</h1>
        <div className="flex gap-3">
          <button onClick={() => setShowJoinModal(true)} className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
            Join with Code
          </button>
          <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
            + Create Group
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin" /></div>
      ) : groups.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          You haven't joined any groups yet. Create one or ask a friend for an invite code!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-xl">👥</div>
                <div className="flex-1">
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-gray-500">{group.description || 'No description'}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-500 mb-1">Invite Code</p>
                <div className="flex items-center justify-between">
                  <code className="text-lg font-mono font-bold text-indigo-600">{group.inviteCode}</code>
                  <button onClick={() => copyInviteCode(group.inviteCode)} className="text-sm text-gray-500 hover:text-indigo-600">📋 Copy</button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Goal: {group.weeklyGoal}/week</span>
                <span className="text-indigo-600 font-medium">{group.weeklySolved || 0} solved</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Join Group</h2>
            <input type="text" placeholder="Enter invite code (e.g., ABC123)" value={inviteCode} onChange={(e) => setInviteCode(e.target.value.toUpperCase())} className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-center text-lg font-mono tracking-wider" />
            <div className="flex gap-4">
              <button onClick={() => setShowJoinModal(false)} className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleJoin} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Join</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Group</h2>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <input type="text" placeholder="Group name" value={newGroup.name} onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
              <input type="text" placeholder="Description (optional)" value={newGroup.description} onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              <div>
                <label className="block text-sm text-gray-600 mb-1">Weekly Goal (problems per week)</label>
                <input type="number" min="1" value={newGroup.weeklyGoal} onChange={(e) => setNewGroup({ ...newGroup, weeklyGoal: parseInt(e.target.value) || 10 })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Created Group Success Modal */}
      {createdGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold mb-2">Group Created!</h2>
            <p className="text-gray-500 mb-4">Share this invite code with your friends:</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <code className="text-3xl font-mono font-bold text-indigo-600">{createdGroup.inviteCode}</code>
            </div>
            <button onClick={() => { copyInviteCode(createdGroup.inviteCode); }} className="w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 mb-2">📋 Copy Invite Code</button>
            <button onClick={() => setCreatedGroup(null)} className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
