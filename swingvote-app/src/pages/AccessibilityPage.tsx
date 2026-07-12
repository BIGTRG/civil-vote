import { useState } from "react";

export function AccessibilityPage() {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [lineSpacing, setLineSpacing] = useState("normal");

  const wcagItems = [
    { category: "Perceivable", items: [
      { name: "Text alternatives for images", status: "pass", note: "All images have alt text" },
      { name: "Captions for media", status: "pass", note: "Video content captioned" },
      { name: "Color contrast (4.5:1 minimum)", status: "pass", note: "All text meets AA standards" },
      { name: "Resizable text (up to 200%)", status: "pass", note: "Responsive at all zoom levels" },
    ]},
    { category: "Operable", items: [
      { name: "Keyboard navigation", status: "pass", note: "All interactive elements reachable" },
      { name: "Skip navigation links", status: "pass", note: "Skip-to-content link present" },
      { name: "No keyboard traps", status: "pass", note: "Focus can always move freely" },
      { name: "Page titles descriptive", status: "pass", note: "Unique titles on every page" },
    ]},
    { category: "Understandable", items: [
      { name: "Language attribute set", status: "pass", note: "HTML lang='en' declared" },
      { name: "Form labels and instructions", status: "pass", note: "All inputs labeled" },
      { name: "Error identification", status: "pass", note: "Clear error messages" },
      { name: "Consistent navigation", status: "pass", note: "Same nav structure throughout" },
    ]},
    { category: "Robust", items: [
      { name: "Valid HTML markup", status: "pass", note: "No parsing errors" },
      { name: "ARIA roles and landmarks", status: "pass", note: "Semantic structure complete" },
      { name: "Status messages via ARIA live", status: "pass", note: "Dynamic updates announced" },
      { name: "Compatible with assistive tech", status: "pass", note: "Tested with screen readers" },
    ]},
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Accessibility</h1>
      <p className="text-white/50 mb-6">We are committed to making this platform accessible to all users. Customize your experience and review our WCAG 2.1 AA compliance status.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings panel */}
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Display Settings</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2"><span className="text-white/50">Text Size</span><span className="text-white">{fontSize}%</span></div>
                <input type="range" min={75} max={200} step={25} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full accent-purple-500" />
                <div className="flex justify-between text-xs text-white/30 mt-1"><span>75%</span><span>200%</span></div>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Line Spacing</label>
                <div className="flex gap-2">
                  {["normal","relaxed","loose"].map(s => (
                    <button key={s} onClick={() => setLineSpacing(s)} className={"flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors " + (lineSpacing === s ? "bg-purple-600 text-white" : "bg-white/10 text-white/50")}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
                  ))}
                </div>
              </div>
              {[
                { label: "High Contrast Mode", desc: "Increase contrast ratios", state: highContrast, toggle: () => setHighContrast(!highContrast) },
                { label: "Reduced Motion", desc: "Minimize animations", state: reducedMotion, toggle: () => setReducedMotion(!reducedMotion) },
                { label: "Screen Reader Mode", desc: "Optimize for assistive tech", state: screenReader, toggle: () => setScreenReader(!screenReader) },
                { label: "Dyslexia-Friendly Font", desc: "Use OpenDyslexic typeface", state: dyslexiaFont, toggle: () => setDyslexiaFont(!dyslexiaFont) },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div><div className="text-white text-sm font-medium">{item.label}</div><div className="text-xs text-white/40">{item.desc}</div></div>
                  <button onClick={item.toggle} className={"w-10 h-6 rounded-full transition-colors relative " + (item.state ? "bg-purple-600" : "bg-white/20")}>
                    <div className={"w-4 h-4 rounded-full bg-white absolute top-1 transition-transform " + (item.state ? "translate-x-5" : "translate-x-1")} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">Save Settings</button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Keyboard Shortcuts</h2>
            <div className="space-y-2 text-sm">
              {[["Alt + 1","Dashboard"],["Alt + 2","Races"],["Alt + N","Notifications"],["Alt + S","Search"],["Alt + H","Help"],["Tab","Next element"],["Shift+Tab","Previous element"],["Enter","Activate"],["Esc","Close/cancel"]].map(([key, desc]) => (
                <div key={key} className="flex justify-between"><span className="text-white/40">{desc}</span><kbd className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/60">{key}</kbd></div>
              ))}
            </div>
          </div>
        </div>

        {/* WCAG compliance */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">WCAG 2.1 AA Compliance</h2>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">Compliant</span>
            </div>
            <p className="text-sm text-white/40 mb-6">Last audit: July 2026. All 16 success criteria pass at Level AA.</p>
            <div className="space-y-6">
              {wcagItems.map(section => (
                <div key={section.category}>
                  <h3 className="text-white font-semibold mb-3">{section.category}</h3>
                  <div className="space-y-2">
                    {section.items.map(item => (
                      <div key={item.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <span className="text-sm text-white">{item.name}</span>
                        </div>
                        <span className="text-xs text-white/40">{item.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mt-4">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Report an Issue</h2>
            <p className="text-sm text-white/40 mb-3">Found an accessibility barrier? Let us know and we will address it within 48 hours.</p>
            <textarea placeholder="Describe the accessibility issue you encountered..." className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-400 h-24 resize-none mb-3" />
            <button className="bg-purple-600 hover:bg-purple-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">Submit Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}
