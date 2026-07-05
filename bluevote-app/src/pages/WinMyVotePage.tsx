import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

const CATEGORIES = ["Economy", "Healthcare", "Education", "Housing", "Infrastructure", "Environment", "Public Safety", "Immigration", "Labor", "Other"];

export function WinMyVotePage() {
  const issues = useQuery(api.voterIssues.list, {});
  const createIssue = useMutation(api.voterIssues.create);
  const upvoteIssue = useMutation(api.voterIssues.upvote);
  const [showForm, setShowForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Economy");
  const [state, setState] = useState("GA");
  const [submitting, setSubmitting] = useState(false);

  const filtered = issues?.filter(i => !categoryFilter || i.category === categoryFilter) ?? [];

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) return;
    setSubmitting(true);
    try {
      await createIssue({ title, description, category, state });
      setShowForm(false);
      setTitle("");
      setDescription("");
    } catch (e) {
      console.error(e);
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Win My Vote</h1>
          <p className="text-blue-300/60 mt-1">Tell candidates what matters to you. Two-way accountability.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
        >
          Submit Issue
        </button>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setCategoryFilter("")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !categoryFilter ? "bg-blue-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
          }`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              categoryFilter === cat ? "bg-blue-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Issues list */}
      <div className="space-y-4">
        {filtered.map((issue) => (
          <div key={issue._id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex gap-4">
              {/* Upvote */}
              <button
                onClick={() => upvoteIssue({ id: issue._id })}
                className="flex flex-col items-center gap-1 shrink-0 group"
              >
                <svg className="w-6 h-6 text-blue-400/60 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                <span className="text-lg font-bold text-white">{issue.upvotes}</span>
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    issue.status === "open" ? "bg-yellow-500/20 text-yellow-400" :
                    issue.status === "acknowledged" ? "bg-blue-500/20 text-blue-400" :
                    issue.status === "responded" ? "bg-green-500/20 text-green-400" :
                    "bg-purple-500/20 text-purple-400"
                  }`}>
                    {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/60">
                    {issue.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/15 text-blue-400">
                    {issue.state}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{issue.title}</h3>
                <p className="text-blue-300/50 text-sm">{issue.description}</p>

                {/* Responses */}
                {issue.responses.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {issue.responses.map((r, i) => (
                      <div key={i} className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-xs text-green-400 mb-1">{r.candidateName} responded:</div>
                        <div className="text-sm text-white/80">{r.response}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-blue-300/40">
            {issues === undefined ? "Loading issues..." : "No issues found. Be the first to submit one!"}
          </div>
        )}
      </div>

      {/* Submit form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f2140] border border-white/10 rounded-2xl p-8 max-w-lg w-full">
            <h3 className="text-xl font-semibold text-white mb-2">Submit a Voter Issue</h3>
            <p className="text-blue-300/50 text-sm mb-6">
              What issue matters most to you? Candidates will see this.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-blue-300/60 mb-1">Issue Title</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g., Affordable childcare access"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400/50"
                />
              </div>
              <div>
                <label className="block text-sm text-blue-300/60 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Explain why this issue matters and what you want candidates to address..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400/50 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-blue-300/60 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400/50"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-blue-300/60 mb-1">State</label>
                  <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400/50"
                  >
                    <option value="GA">Georgia</option>
                    <option value="AZ">Arizona</option>
                    <option value="PA">Pennsylvania</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 bg-white/5 text-white/60 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !title.trim() || !description.trim()}
                  className="flex-1 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Issue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
