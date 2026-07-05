import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

const APP_URL = "https://keisha-governor-acc5461d.viktor.space";

interface ShareModalProps {
  postId: Id<"runnerPosts">;
  postContent: string;
  authorName: string;
  peopleRecruited?: number;
  referralCode?: string;
  onClose: () => void;
}

function generateShareText(_authorName: string, content: string, recruited?: number) {
  const snippet = content.length > 120 ? content.slice(0, 120) + "..." : content;
  const recruitLine = recruited && recruited > 0 ? ` (+${recruited} new supporters!)` : "";
  return `${snippet}${recruitLine}\n\nJoin the movement for Georgia -- sign up now:`;
}

export default function ShareModal({ postId, postContent, authorName, peopleRecruited, referralCode, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const recordShare = useMutation(api.referrals.recordShare);

  const shareUrl = referralCode
    ? `${APP_URL}/?ref=${referralCode}&post=${postId}`
    : `${APP_URL}/?post=${postId}`;

  const shareText = generateShareText(authorName, postContent, peopleRecruited);
  const fullShareText = `${shareText}\n${shareUrl}`;

  const handleShare = async (platform: "facebook" | "twitter" | "whatsapp" | "sms" | "native" | "copy" | "tiktok") => {
    // Record the share event
    await recordShare({ postId, platform, referralCode, sharedBy: authorName });

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
          "_blank",
          "width=600,height=400"
        );
        break;

      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          "_blank",
          "width=600,height=400"
        );
        break;

      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(fullShareText)}`,
          "_blank"
        );
        break;

      case "sms": {
        const smsBody = encodeURIComponent(fullShareText);
        window.open(`sms:?body=${smsBody}`, "_self");
        break;
      }

      case "native":
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Keisha for Governor -- Join the Movement",
              text: shareText,
              url: shareUrl,
            });
          } catch {
            // User cancelled or error
          }
        }
        break;

      case "copy":
        await navigator.clipboard.writeText(fullShareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  const platforms = [
    {
      id: "native" as const,
      label: "Share",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      ),
      color: "bg-[#1C3C73]",
      show: typeof navigator !== "undefined" && !!navigator.share,
    },
    {
      id: "facebook" as const,
      label: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: "bg-[#1877F2]",
      show: true,
    },
    {
      id: "twitter" as const,
      label: "X / Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: "bg-black",
      show: true,
    },
    {
      id: "whatsapp" as const,
      label: "WhatsApp",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: "bg-[#25D366]",
      show: true,
    },
    {
      id: "sms" as const,
      label: "Text Message",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 20.25V4.5a2.25 2.25 0 012.25-2.25h12a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25H6.75l-3 3z" />
        </svg>
      ),
      color: "bg-green-600",
      show: true,
    },
    {
      id: "copy" as const,
      label: copied ? "Copied!" : "Copy Link",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={copied
            ? "M4.5 12.75l6 6 9-13.5"
            : "M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
          } />
        </svg>
      ),
      color: copied ? "bg-green-600" : "bg-white/10",
      show: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0d1321] border border-white/10 rounded-t-2xl md:rounded-2xl p-5 z-10 animate-in slide-in-from-bottom">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Share This Post</h3>
          <button onClick={onClose} className="text-white/30 hover:text-white/60 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-white/40 text-xs mb-4">Share to your social accounts. Everyone who signs up through your link gets tracked to you.</p>

        {/* Share buttons grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {platforms.filter(p => p.show).map((p) => (
            <button
              key={p.id}
              onClick={() => handleShare(p.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl ${p.color} hover:opacity-80 transition-opacity`}
            >
              <span className="text-white">{p.icon}</span>
              <span className="text-white text-[10px] font-medium">{p.label}</span>
            </button>
          ))}
        </div>

        {/* Share link preview */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3">
          <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Your share link</div>
          <div className="text-xs text-white/60 break-all font-mono">{shareUrl}</div>
        </div>

        {referralCode && (
          <div className="mt-3 bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
            <div className="text-[10px] text-green-300/50 uppercase tracking-wider">Your referral code</div>
            <div className="text-lg font-bold text-green-400 font-mono">{referralCode}</div>
            <div className="text-[10px] text-green-300/40 mt-1">Signups through your link count toward your recruitment total</div>
          </div>
        )}
      </div>
    </div>
  );
}
