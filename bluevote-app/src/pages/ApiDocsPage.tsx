import { useState } from "react";

interface Endpoint {
  method: "GET" | "POST";
  path: string;
  description: string;
  params?: { name: string; type: string; required: boolean; desc: string }[];
  response: string;
}

const API_BASE = "https://api.civilvotetechnologies.com/v1";

const ENDPOINTS: { group: string; items: Endpoint[] }[] = [
  {
    group: "Races",
    items: [
      {
        method: "GET",
        path: "/races",
        description: "List all active races with candidates and current status",
        params: [
          { name: "state", type: "string", required: false, desc: "Filter by state code (e.g., GA, TX)" },
          { name: "type", type: "string", required: false, desc: "Filter by type: federal, state, local" },
          { name: "status", type: "string", required: false, desc: "Filter: upcoming, active, completed" },
        ],
        response: `{
  "races": [
    {
      "id": "race_abc123",
      "title": "Georgia Senate 2026",
      "state": "GA",
      "type": "federal",
      "electionDate": "2026-11-03",
      "status": "active",
      "candidates": [...]
    }
  ],
  "total": 179
}`,
      },
      {
        method: "GET",
        path: "/races/:id",
        description: "Get detailed race information including candidates, polling, and finance data",
        response: `{
  "race": {
    "id": "race_abc123",
    "title": "Georgia Senate 2026",
    "candidates": [...],
    "polls": [...],
    "ratings": [...],
    "fundraising": { "totalRaised": 15200000 }
  }
}`,
      },
    ],
  },
  {
    group: "Polling",
    items: [
      {
        method: "GET",
        path: "/polling",
        description: "Get latest polling data across all tracked races",
        params: [
          { name: "state", type: "string", required: false, desc: "Filter by state" },
          { name: "race_id", type: "string", required: false, desc: "Filter by specific race" },
          { name: "limit", type: "number", required: false, desc: "Number of results (default: 20)" },
        ],
        response: `{
  "polls": [
    {
      "raceTitle": "Georgia Senate 2026",
      "pollster": "Emerson College",
      "date": "2026-07-01",
      "sampleSize": 1200,
      "results": [
        { "candidateName": "Jon Ossoff", "party": "D", "percentage": 48.2 },
        { "candidateName": "TBD", "party": "R", "percentage": 46.8 }
      ]
    }
  ]
}`,
      },
    ],
  },
  {
    group: "Race Ratings",
    items: [
      {
        method: "GET",
        path: "/ratings",
        description: "Get current race ratings from major forecasters",
        params: [
          { name: "source", type: "string", required: false, desc: "Cook Political Report, Sabato Crystal Ball, etc." },
          { name: "office", type: "string", required: false, desc: "Senate, Governor, House, etc." },
        ],
        response: `{
  "ratings": [
    {
      "raceTitle": "Georgia Senate 2026",
      "state": "GA",
      "office": "Senate",
      "rating": "Toss-up",
      "source": "Cook Political Report",
      "previousRating": "Lean D"
    }
  ]
}`,
      },
    ],
  },
  {
    group: "Campaign Finance",
    items: [
      {
        method: "GET",
        path: "/finance",
        description: "Get FEC campaign finance data for tracked candidates",
        params: [
          { name: "candidate_id", type: "string", required: false, desc: "Filter by candidate" },
          { name: "min_raised", type: "number", required: false, desc: "Minimum total raised filter" },
        ],
        response: `{
  "candidates": [
    {
      "name": "Jon Ossoff",
      "fecId": "S0GA00559",
      "totalRaised": 63900000,
      "totalSpent": 51200000,
      "cashOnHand": 12700000,
      "lastUpdated": "2026-07-10"
    }
  ]
}`,
      },
    ],
  },
  {
    group: "Canvassing",
    items: [
      {
        method: "GET",
        path: "/canvassing/stats",
        description: "Get aggregate canvassing statistics by state or nationally",
        params: [
          { name: "state", type: "string", required: false, desc: "Filter by state" },
        ],
        response: `{
  "stats": {
    "totalDoors": 45000,
    "doorsKnocked": 18750,
    "positiveContacts": 6375,
    "contactRate": 34,
    "states": 10,
    "activeTurfs": 20
  }
}`,
      },
    ],
  },
];

export function ApiDocsPage() {
  const [activeGroup, setActiveGroup] = useState("Races");
  const [apiKey] = useState("cv_live_" + Math.random().toString(36).slice(2, 14));

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">API Documentation</h1>
          <p className="text-blue-400 mt-1">Build integrations with CivilVote election data</p>
        </div>

        {/* API Key */}
        <div className="bg-white/5 border border-blue-500/20 rounded-xl p-5 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Your API Key</h3>
              <p className="text-sm text-white/50 mt-1">Include in the Authorization header of all requests</p>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-black/30 px-3 py-2 rounded text-sm font-mono text-blue-400">{apiKey}</code>
              <button className="p-2 hover:bg-white/10 rounded" onClick={() => navigator.clipboard.writeText(apiKey)}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Base URL */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
          <h3 className="font-semibold mb-2">Base URL</h3>
          <code className="text-sm font-mono text-green-400">{API_BASE}</code>
          <p className="text-xs text-white/40 mt-2">All endpoints return JSON. Rate limit: 1,000 requests/hour.</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {ENDPOINTS.map(g => (
            <button
              key={g.group}
              onClick={() => setActiveGroup(g.group)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeGroup === g.group
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >{g.group}</button>
          ))}
        </div>

        {/* Endpoints */}
        <div className="space-y-6">
          {ENDPOINTS.find(g => g.group === activeGroup)?.items.map((ep, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    ep.method === "GET" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
                  }`}>{ep.method}</span>
                  <code className="text-sm font-mono">{ep.path}</code>
                </div>
                <p className="text-sm text-white/60">{ep.description}</p>

                {ep.params && (
                  <div className="mt-4">
                    <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Parameters</h4>
                    <div className="space-y-2">
                      {ep.params.map(p => (
                        <div key={p.name} className="flex items-start gap-3 text-sm">
                          <code className="text-blue-400 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">{p.name}</code>
                          <span className="text-white/30 text-xs">{p.type}</span>
                          {p.required && <span className="text-red-400 text-xs">required</span>}
                          <span className="text-white/50 text-xs">{p.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 bg-black/20 p-5">
                <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Response</h4>
                <pre className="text-xs font-mono text-green-400/80 overflow-x-auto">{ep.response}</pre>
              </div>
            </div>
          ))}
        </div>

        {/* SDKs */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="font-semibold mb-4">SDK & Integration Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { lang: "Python", code: "pip install civilvote", color: "text-yellow-400" },
              { lang: "JavaScript", code: "npm install @civilvote/sdk", color: "text-cyan-400" },
              { lang: "cURL", code: "curl -H \"Authorization: Bearer $KEY\"", color: "text-green-400" },
            ].map(sdk => (
              <div key={sdk.lang} className="bg-black/20 rounded-lg p-4">
                <p className={`text-sm font-medium ${sdk.color} mb-2`}>{sdk.lang}</p>
                <code className="text-xs font-mono text-white/50">{sdk.code}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
