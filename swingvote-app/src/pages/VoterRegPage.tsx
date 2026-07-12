import { useState } from "react";

const stateData: Record<string, { deadline: string; onlineUrl: string; checkUrl: string; idRequired: string; sameDay: boolean; autoReg: boolean; minAge: number }> = {
  "Alabama": { deadline: "15 days before", onlineUrl: "https://www.alabamavotes.gov", checkUrl: "https://myinfo.alabamavotes.gov/VoterView", idRequired: "Photo ID required", sameDay: false, autoReg: false, minAge: 18 },
  "Alaska": { deadline: "30 days before", onlineUrl: "https://voterregistration.alaska.gov", checkUrl: "https://myvoterinformation.alaska.gov", idRequired: "ID or signature verification", sameDay: false, autoReg: true, minAge: 18 },
  "Arizona": { deadline: "29 days before", onlineUrl: "https://azsos.gov/elections/voting-election", checkUrl: "https://voter.azsos.gov/VoterView", idRequired: "Photo ID required", sameDay: false, autoReg: false, minAge: 18 },
  "California": { deadline: "15 days before (conditional same-day)", onlineUrl: "https://registertovote.ca.gov", checkUrl: "https://voterstatus.sos.ca.gov", idRequired: "No strict ID", sameDay: true, autoReg: true, minAge: 16 },
  "Colorado": { deadline: "Same-day registration", onlineUrl: "https://www.sos.state.co.us/voter", checkUrl: "https://www.sos.state.co.us/voter/pages/pub/olvr/findVoterReg.xhtml", idRequired: "ID required first time", sameDay: true, autoReg: true, minAge: 16 },
  "Florida": { deadline: "29 days before", onlineUrl: "https://registertovoteflorida.gov", checkUrl: "https://registration.elections.myflorida.com/CheckVoterStatus", idRequired: "Photo ID required", sameDay: false, autoReg: false, minAge: 18 },
  "Georgia": { deadline: "29 days before", onlineUrl: "https://registertovote.sos.ga.gov", checkUrl: "https://mvp.sos.ga.gov/s/", idRequired: "Photo ID required", sameDay: false, autoReg: true, minAge: 17.5 },
  "Illinois": { deadline: "28 days before (grace period + same-day)", onlineUrl: "https://ova.elections.il.gov", checkUrl: "https://www.elections.il.gov/VotingInformation/RegistrationLookup.aspx", idRequired: "No strict ID", sameDay: true, autoReg: true, minAge: 17 },
  "Michigan": { deadline: "Same-day registration", onlineUrl: "https://mvic.sos.state.mi.us/registervoter", checkUrl: "https://mvic.sos.state.mi.us", idRequired: "Photo ID or affidavit", sameDay: true, autoReg: true, minAge: 17.5 },
  "Nevada": { deadline: "Same-day registration", onlineUrl: "https://www.registertovotenv.gov", checkUrl: "https://www.nvsos.gov/votersearch", idRequired: "ID required first time", sameDay: true, autoReg: true, minAge: 17 },
  "New York": { deadline: "25 days before", onlineUrl: "https://voterreg.dmv.ny.gov/MotorVoter", checkUrl: "https://voterlookup.elections.ny.gov", idRequired: "ID or last 4 SSN", sameDay: false, autoReg: false, minAge: 16 },
  "North Carolina": { deadline: "25 days before (same-day during early voting)", onlineUrl: "https://www.ncsbe.gov/registering/how-register", checkUrl: "https://vt.ncsbe.gov/RegLkup", idRequired: "Photo ID required (2024+)", sameDay: true, autoReg: false, minAge: 16 },
  "Ohio": { deadline: "30 days before", onlineUrl: "https://olvr.ohiosos.gov", checkUrl: "https://voterlookup.ohiosos.gov/voterlookup.aspx", idRequired: "Photo ID or last 4 SSN", sameDay: false, autoReg: false, minAge: 17 },
  "Pennsylvania": { deadline: "15 days before", onlineUrl: "https://www.pavoterservices.pa.gov/Pages/VoterRegistrationApplication.aspx", checkUrl: "https://www.pavoterservices.pa.gov/pages/voterregistrationstatus.aspx", idRequired: "ID first time at new polling place", sameDay: false, autoReg: false, minAge: 18 },
  "Texas": { deadline: "30 days before", onlineUrl: "https://www.votetexas.gov/register-to-vote", checkUrl: "https://teamrv-mvp.sos.texas.gov/MVP/mvp.do", idRequired: "Photo ID required", sameDay: false, autoReg: false, minAge: 17.5 },
  "Virginia": { deadline: "22 days before (same-day provisional)", onlineUrl: "https://vote.elections.virginia.gov/VoterInformation", checkUrl: "https://vote.elections.virginia.gov/VoterInformation", idRequired: "Photo ID required", sameDay: false, autoReg: true, minAge: 17 },
  "Wisconsin": { deadline: "Same-day registration", onlineUrl: "https://myvote.wi.gov/en-us/RegisterToVote", checkUrl: "https://myvote.wi.gov/en-us/MyVoterInfo", idRequired: "Photo ID required", sameDay: true, autoReg: false, minAge: 18 },
  "Iowa": { deadline: "Same-day registration", onlineUrl: "https://sos.iowa.gov/elections/voterreg/regtovotefaq.html", checkUrl: "https://sos.iowa.gov/elections/voterreg/regtovote/search.aspx", idRequired: "Photo ID required", sameDay: true, autoReg: false, minAge: 17 },
  "Maine": { deadline: "Same-day registration", onlineUrl: "https://www.maine.gov/sos/cec/elec/voter-info/voterregcard.html", checkUrl: "https://www.maine.gov/sos/cec/elec/voter-info/voterreg.html", idRequired: "No strict ID (most cases)", sameDay: true, autoReg: false, minAge: 17 },
};
const allStates = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

export function VoterRegPage() {
  const [selected, setSelected] = useState("");
  const info = selected ? stateData[selected] : null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Voter Registration Checker</h1>
      <p className="text-white/50 mb-6">Verify your registration status and find your state's registration rules.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* State selector */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Select Your State</h2>
            <select value={selected} onChange={e => setSelected(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400 mb-4">
              <option value="" className="bg-gray-900">-- Choose state --</option>
              {allStates.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
            </select>
            <div className="space-y-2 text-sm text-white/40">
              <p>Coverage: {Object.keys(stateData).length} states with detailed data</p>
              <p>Updated: July 2026</p>
            </div>
          </div>
          {/* Quick stats */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Quick Facts</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-white/50">Same-Day States</span><span className="text-green-400 font-semibold">{Object.values(stateData).filter(s => s.sameDay).length}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/50">Auto Registration</span><span className="text-purple-400 font-semibold">{Object.values(stateData).filter(s => s.autoReg).length}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/50">Photo ID Required</span><span className="text-amber-400 font-semibold">{Object.values(stateData).filter(s => s.idRequired.includes("Photo ID")).length}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/50">Pre-Registration</span><span className="text-purple-400 font-semibold">{Object.values(stateData).filter(s => s.minAge < 18).length}</span></div>
            </div>
          </div>
        </div>

        {/* State details */}
        <div className="lg:col-span-2">
          {!selected && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              <p className="text-white/40 text-lg">Select a state to see registration requirements</p>
            </div>
          )}
          {info && (
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">{selected} Voter Registration</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Deadline</div>
                    <div className="text-white font-semibold">{info.deadline}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">ID Requirement</div>
                    <div className="text-white font-semibold">{info.idRequired}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Same-Day Registration</div>
                    <div className={"font-semibold " + (info.sameDay ? "text-green-400" : "text-red-400")}>{info.sameDay ? "Available" : "Not Available"}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Automatic Registration</div>
                    <div className={"font-semibold " + (info.autoReg ? "text-green-400" : "text-white/50")}>{info.autoReg ? "Yes (via DMV)" : "No"}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Minimum Age to Pre-Register</div>
                    <div className="text-white font-semibold">{info.minAge < 18 ? info.minAge + " years old" : "18 (no pre-registration)"}</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href={info.onlineUrl} target="_blank" rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl p-5 text-center transition-colors">
                  <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  <div className="font-semibold">Register to Vote</div>
                  <div className="text-xs text-white/70 mt-1">Official state registration</div>
                </a>
                <a href={info.checkUrl} target="_blank" rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/15 text-white rounded-xl p-5 text-center border border-white/10 transition-colors">
                  <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <div className="font-semibold">Check Registration Status</div>
                  <div className="text-xs text-white/70 mt-1">Verify you're registered</div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
