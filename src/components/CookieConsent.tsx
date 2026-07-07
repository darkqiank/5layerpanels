/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Cookie } from 'lucide-react';
import { Language } from '../locales';

const CONSENT_STORAGE_KEY = 'sub_countdown_cookie_consent';

interface CookieConsentProps {
  lang: Language;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ lang }) => {
  const [choice, setChoice] = useState<string | null>(() => {
    try {
      return localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const saveChoice = (value: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // If storage is unavailable, hide the prompt for the current session.
    }
    setChoice(value);
  };

  if (choice) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none">
      <div
        role="dialog"
        aria-live="polite"
        aria-label={lang === 'zh' ? 'Cookie 与本地存储确认' : 'Cookie and local storage consent'}
        className="pointer-events-auto max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-900/10 p-4 sm:p-5"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-0.5 h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <Cookie size={18} />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-black text-slate-800">
                {lang === 'zh' ? 'Cookie 与本地存储确认' : 'Cookie & local storage consent'}
              </h2>
              <p className="text-xs leading-relaxed text-slate-500 font-medium">
                {lang === 'zh'
                  ? '5 Layers Panel 使用必要的浏览器本地存储来保存语言偏好、订阅数据和本确认状态。我们不使用广告追踪 Cookie。'
                  : '5 Layers Panel uses essential browser storage for language preferences, subscription data, and this consent state. We do not use advertising or tracking cookies.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 md:min-w-[260px]">
            <button
              type="button"
              onClick={() => saveChoice('essential')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all cursor-pointer"
            >
              {lang === 'zh' ? '仅必要存储' : 'Essential only'}
            </button>
            <button
              type="button"
              onClick={() => saveChoice('accepted')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              {lang === 'zh' ? '同意并继续' : 'Accept and continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
