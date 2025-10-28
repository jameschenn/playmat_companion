'use client';

import { useEffect, useState } from 'react';
import { Download, Share } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(isInStandaloneMode);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Listen for the beforeinstallprompt event (Android/Desktop Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    // iOS - Show instructions modal
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    // Android/Desktop Chrome - Trigger native prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ User accepted the install prompt');
      }
      
      setDeferredPrompt(null);
    }
  };

  // Don't show button if already installed
  if (isStandalone) return null;

  // Don't show on Android if prompt isn't available yet
  if (!isIOS && !deferredPrompt) return null;

  return (
  <>
    <button
      onClick={handleInstallClick}
      className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-md"
    >
      <Download size={14} />
      Install App
    </button>

    {/* iOS Instructions Modal */}
    {showIOSModal && (
      <div
        className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4"
        onClick={() => setShowIOSModal(false)}
      >
        <div
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 p-6 max-w-sm w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Download size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-white text-lg">Install on iOS</h3>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-gray-700">
            <p className="text-sm text-gray-300 mb-3 font-semibold">
              Follow these steps:
            </p>
            <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">1.</span>
                <span>
                  Tap the{" "}
                  <Share
                    size={16}
                    className="inline mx-1 text-blue-400"
                  />{" "}
                  <strong>Share</strong> button at the bottom of Safari
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">2.</span>
                <span>
                  Scroll down and tap{" "}
                  <strong>&quot;Add to Home Screen&quot;</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">3.</span>
                <span>
                  Tap <strong>&quot;Add&quot;</strong> in the top right corner
                </span>
              </li>
            </ol>
          </div>

          <button
            onClick={() => setShowIOSModal(false)}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    )}
  </>
);
}