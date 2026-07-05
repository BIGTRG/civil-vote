import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (localStorage.getItem("pwa-install-dismissed")) return;
    const handler = (e: Event) => { e.preventDefault(); setDeferredPrompt(e as BeforeInstallPromptEvent); };
    window.addEventListener("beforeinstallprompt", handler);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS && !window.matchMedia("(display-mode: standalone)").matches) setShowIOSPrompt(true);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("pwa-install-dismissed", "1");
    setDeferredPrompt(null);
    setShowIOSPrompt(false);
  };

  if (dismissed || (!deferredPrompt && !showIOSPrompt)) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0b1929] border-t border-white/10 shadow-2xl safe-bottom md:hidden">
      <div className="max-w-md mx-auto flex items-center gap-3">
        <img src="/icons/icon-72.png" alt="App" className="w-12 h-12 rounded-xl flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm">Install BlueVote</p>
          <p className="text-white/50 text-xs">
            {showIOSPrompt ? 'Tap Share, then "Add to Home Screen"' : "Add to your home screen for the full experience"}
          </p>
        </div>
        {deferredPrompt && (
          <button onClick={handleInstall} className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg flex-shrink-0 hover:bg-blue-500 transition-colors">
            Install
          </button>
        )}
        <button onClick={handleDismiss} className="text-white/30 hover:text-white/60 text-lg flex-shrink-0 ml-1" aria-label="Dismiss">&times;</button>
      </div>
    </div>
  );
}
