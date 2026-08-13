import React, { useState } from 'react';
import { SqueezePage } from './components/SqueezePage';
import { GuideReader } from './components/GuideReader';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LeadInfo } from './types';

export default function App() {
  const [currentLead, setCurrentLead] = useState<LeadInfo | null>(null);

  const handleAccessGuide = (lead: LeadInfo) => {
    setCurrentLead(lead);
  };

  const handleBackToOptin = () => {
    setCurrentLead(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {!currentLead ? (
        <SqueezePage onAccessGuide={handleAccessGuide} />
      ) : (
        <GuideReader lead={currentLead} onBackToOptin={handleBackToOptin} />
      )}
      <WhatsAppButton />
    </div>
  );
}
