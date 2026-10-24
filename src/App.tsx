import React, { useState, useEffect } from 'react';
import { Header, ScreenId } from './components/common/Header';
import { TickerTape } from './components/common/TickerTape';
import { Footer } from './components/common/Footer';
import { PublicGatewayScreen } from './components/screens/PublicGatewayScreen';
import { ExecutiveDashboardScreen } from './components/screens/ExecutiveDashboardScreen';
import { OmniCalculatorHubScreen } from './components/screens/OmniCalculatorHubScreen';
import { SipStudioScreen } from './components/screens/SipStudioScreen';
import { MarketsTerminalScreen } from './components/screens/MarketsTerminalScreen';
import { ResearchLibraryScreen } from './components/screens/ResearchLibraryScreen';

import { MandateModal } from './components/modals/MandateModal';
import { AuthModal } from './components/modals/AuthModal';
import { MonographModal } from './components/modals/MonographModal';
import { ModelNotebookModal } from './components/modals/ModelNotebookModal';
import { WealthMemoModal } from './components/modals/WealthMemoModal';

import { ClientSession } from './types/mandate';
import { ResearchMonograph } from './types/research';
import { SipParameters, SipCalculationResult } from './types/financial';
import { LEAD_MONOGRAPH } from './data/researchData';

export function App() {
  // Navigation State
  const [activeScreen, setActiveScreen] = useState<ScreenId>('gateway');

  // Theme State (default light: Alabaster & Porcelain Ivory, with Obsidian Dark mode support)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('meridian_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  // Client Session State
  const [session, setSession] = useState<ClientSession>({
    isAuthenticated: false,
    accountIdentifier: '',
    entityName: '',
    role: 'Lord Beneficiary',
    twoFactorVerified: false,
    lastLoginUtc: '',
    allocatedMandateUsd: 0,
  });

  // Modal Visibility States
  const [isMandateOpen, setIsMandateOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeMonograph, setActiveMonograph] = useState<ResearchMonograph | null>(null);
  const [notebookMonograph, setNotebookMonograph] = useState<ResearchMonograph | null>(null);
  const [wealthMemoState, setWealthMemoState] = useState<{
    params: SipParameters;
    results: SipCalculationResult;
  } | null>(null);

  // Synchronize data-theme on HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('meridian_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    setSession({
      isAuthenticated: false,
      accountIdentifier: '',
      entityName: '',
      role: 'Lord Beneficiary',
      twoFactorVerified: false,
      lastLoginUtc: '',
      allocatedMandateUsd: 0,
    });
  };

  const handleOpenWealthMemo = (params: SipParameters, results: SipCalculationResult) => {
    setWealthMemoState({ params, results });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Real-time Sovereign Ticker Tape */}
      <TickerTape
        onSelectTicker={() => {
          setActiveScreen('terminal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Header */}
      <Header
        activeScreen={activeScreen}
        onNavigate={(screen) => {
          setActiveScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
        session={session}
        onRequestMandate={() => setIsMandateOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Dynamic Screen View */}
      <main style={{ flex: 1 }}>
        {activeScreen === 'gateway' && (
          <PublicGatewayScreen
            onNavigate={(screen) => {
              setActiveScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRequestMandate={() => setIsMandateOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeScreen === 'dashboard' && (
          <ExecutiveDashboardScreen
            onNavigate={(screen) => {
              setActiveScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRequestMandate={() => setIsMandateOpen(true)}
            onOpenMonograph={() => setActiveMonograph(LEAD_MONOGRAPH)}
          />
        )}

        {activeScreen === 'calculator_hub' && (
          <OmniCalculatorHubScreen
            onNavigate={(screen) => {
              setActiveScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'sip_studio' && (
          <SipStudioScreen onOpenWealthMemo={handleOpenWealthMemo} />
        )}

        {activeScreen === 'terminal' && <MarketsTerminalScreen />}

        {activeScreen === 'research' && (
          <ResearchLibraryScreen
            onOpenMonograph={(mono) => setActiveMonograph(mono)}
            onInspectNotebook={(mono) => setNotebookMonograph(mono)}
          />
        )}
      </main>

      {/* Fiduciary Disclosures Footer */}
      <Footer
        onNavigate={(screen) => {
          setActiveScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRequestMandate={() => setIsMandateOpen(true)}
      />

      {/* Modals Container */}
      <MandateModal
        isOpen={isMandateOpen}
        onClose={() => setIsMandateOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(newSession) => setSession(newSession)}
      />

      <MonographModal
        monograph={activeMonograph}
        isOpen={Boolean(activeMonograph)}
        onClose={() => setActiveMonograph(null)}
        onInspectNotebook={(mono) => setNotebookMonograph(mono)}
      />

      <ModelNotebookModal
        monograph={notebookMonograph}
        isOpen={Boolean(notebookMonograph)}
        onClose={() => setNotebookMonograph(null)}
      />

      {wealthMemoState && (
        <WealthMemoModal
          isOpen={Boolean(wealthMemoState)}
          onClose={() => setWealthMemoState(null)}
          params={wealthMemoState.params}
          results={wealthMemoState.results}
        />
      )}
    </div>
  );
}

export default App;
