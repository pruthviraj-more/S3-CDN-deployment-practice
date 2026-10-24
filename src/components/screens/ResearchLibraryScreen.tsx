import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  BookOpen,
  Code,
  Award,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Shield,
  FileText,
} from 'lucide-react';
import {
  LEAD_MONOGRAPH,
  SCHOLARLY_MONOGRAPHS,
  ADVISORY_BOARD,
  RESEARCH_PROTOCOLS,
} from '../../data/researchData';
import { ResearchMonograph, AssetClassFilter, RigorLevel } from '../../types/research';

interface ResearchLibraryScreenProps {
  onOpenMonograph: (monograph: ResearchMonograph) => void;
  onInspectNotebook: (monograph: ResearchMonograph) => void;
}

export const ResearchLibraryScreen: React.FC<ResearchLibraryScreenProps> = ({
  onOpenMonograph,
  onInspectNotebook,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssetClass, setSelectedAssetClass] = useState<AssetClassFilter>('all');
  const [selectedRigor, setSelectedRigor] = useState<string>('all');
  const [selectedVintage, setSelectedVintage] = useState<string>('all');

  // Filtered Monographs
  const filteredMonographs = SCHOLARLY_MONOGRAPHS.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.leadAuthor.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAsset = selectedAssetClass === 'all' || m.assetClass === selectedAssetClass;
    const matchesRigor = selectedRigor === 'all' || m.rigorLevel === selectedRigor;
    const matchesVintage = selectedVintage === 'all' || m.vintageYear.toString() === selectedVintage;

    return matchesSearch && matchesAsset && matchesRigor && matchesVintage;
  });

  return (
    <div className="meridian-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="badge-gold" style={{ marginBottom: '0.65rem' }}>
          <span>Academic & Actuarial Governance</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', lineHeight: 1.15, color: 'var(--text-primary)' }}>
          Research Library & Investment Whitepapers
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', marginTop: '0.35rem' }}>
          Peer-reviewed scholarly monographs, reproducible quantitative models, and open econometric notebooks.
        </p>
      </div>

      {/* Featured Lead Monograph Banner */}
      <div
        className="meridian-card"
        style={{
          padding: '2.5rem',
          marginBottom: '3.5rem',
          border: '1px solid var(--border-gold)',
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <span className="badge-gold">Chaired Lead Monograph (Oxford / Meridian)</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            DOI: {LEAD_MONOGRAPH.doi}
          </span>
        </div>

        <h2 style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.3rem)', lineHeight: 1.25, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {LEAD_MONOGRAPH.title}
        </h2>

        <p className="editorial-italic" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {LEAD_MONOGRAPH.subtitle}
        </p>

        <p style={{ fontSize: '0.94rem', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '940px', marginBottom: '1.75rem' }}>
          {LEAD_MONOGRAPH.abstract}
        </p>

        {/* Lead Author Credentials */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {LEAD_MONOGRAPH.leadAuthor.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
              {LEAD_MONOGRAPH.leadAuthor.chair} · {LEAD_MONOGRAPH.leadAuthor.institution}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => onInspectNotebook(LEAD_MONOGRAPH)}
              className="btn-secondary"
              style={{ fontSize: '0.84rem' }}
            >
              <Code size={15} />
              <span>Inspect Python Notebook</span>
            </button>
            <button
              onClick={() => onOpenMonograph(LEAD_MONOGRAPH)}
              className="btn-primary"
              style={{ fontSize: '0.84rem' }}
            >
              <BookOpen size={15} />
              <span>Read Full Monograph ({LEAD_MONOGRAPH.pageCount}p)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Research Search & Filter Controls */}
      <div
        className="meridian-card"
        style={{
          padding: '1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Search Bar */}
        <div style={{ position: 'relative', flex: '1 1 280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by research topic, author, or theorem..."
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem 0.65rem 2.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-secondary)',
            }}
          />
        </div>

        {/* Filter Dropdowns */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
          <select
            value={selectedAssetClass}
            onChange={(e) => setSelectedAssetClass(e.target.value as AssetClassFilter)}
            style={{
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-secondary)',
              fontSize: '0.84rem',
            }}
          >
            <option value="all">All Asset Classes</option>
            <option value="fixed_income">Fixed Income & Duration</option>
            <option value="quantitative_equities">Quantitative Equities</option>
            <option value="alternative_assets">Alternative Trusts & Dynasty</option>
            <option value="macro_policy">Macro Monetary Policy</option>
          </select>

          <select
            value={selectedRigor}
            onChange={(e) => setSelectedRigor(e.target.value)}
            style={{
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-secondary)',
              fontSize: '0.84rem',
            }}
          >
            <option value="all">All Rigor Levels</option>
            <option value="frontier_actuarial">Frontier Actuarial</option>
            <option value="advanced_econometrics">Advanced Econometrics</option>
            <option value="foundational">Foundational Econometric</option>
          </select>

          <select
            value={selectedVintage}
            onChange={(e) => setSelectedVintage(e.target.value)}
            style={{
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-secondary)',
              fontSize: '0.84rem',
            }}
          >
            <option value="all">All Vintages</option>
            <option value="2026">2026 Monographs</option>
            <option value="2025">2025 Monographs</option>
          </select>
        </div>
      </div>

      {/* Curated Scholarly Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
          marginBottom: '4.5rem',
        }}
      >
        {filteredMonographs.map((mono) => (
          <div
            key={mono.id}
            className="meridian-card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge-neutral" style={{ textTransform: 'capitalize', fontSize: '0.7rem' }}>
                  {mono.assetClass.replace('_', ' ')}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {mono.publicationDate}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', lineHeight: 1.3, marginBottom: '0.45rem', color: 'var(--text-primary)' }}>
                {mono.title}
              </h3>

              <p className="editorial-italic" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {mono.subtitle}
              </p>

              <p style={{ fontSize: '0.86rem', lineHeight: 1.6, color: 'var(--text-tertiary)', marginBottom: '1.5rem' }}>
                {mono.abstract.slice(0, 180)}...
              </p>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Lead Author: <strong>{mono.leadAuthor.name}</strong> ({mono.leadAuthor.institution})
              </div>
            </div>

            <div>
              {/* Stats Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0',
                  borderTop: '1px solid var(--border-light)',
                  borderBottom: '1px solid var(--border-light)',
                  fontSize: '0.75rem',
                  color: 'var(--text-tertiary)',
                  marginBottom: '1.25rem',
                }}
              >
                <span>{mono.pageCount} Pages</span>
                <span>{mono.downloadCount.toLocaleString()} Downloads</span>
                <span>{mono.citationCount} Citations</span>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button
                  onClick={() => onInspectNotebook(mono)}
                  className="btn-secondary"
                  style={{ flex: 1, fontSize: '0.8rem', padding: '0.55rem' }}
                >
                  <Code size={14} />
                  <span>Model Code</span>
                </button>
                <button
                  onClick={() => onOpenMonograph(mono)}
                  className="btn-primary"
                  style={{ flex: 1, fontSize: '0.8rem', padding: '0.55rem' }}
                >
                  <BookOpen size={14} />
                  <span>Read Monograph</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Research Advisory Board Governance */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
          <span className="crest-text" style={{ fontSize: '0.75rem', color: 'var(--text-gold)', letterSpacing: '0.15em' }}>
            FIDUCIARY INTEGRITY
          </span>
          <h2 style={{ fontSize: '2.1rem', marginTop: '0.4rem', marginBottom: '0.75rem' }}>
            Research Advisory Board
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Chaired by distinguished actuarial fellows, former central bankers, and university professors.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {ADVISORY_BOARD.map((member) => (
            <div key={member.id} className="meridian-card" style={{ padding: '1.75rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-gold-light)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  marginBottom: '1rem',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                {member.name.split(' ')[1]?.[0] || 'M'}
              </div>

              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                {member.name}
              </h4>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-gold)', fontWeight: 600, marginBottom: '0.5rem' }}>
                {member.role}
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                {member.affiliation}
              </div>

              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
                Specialization: {member.specialization}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Meridian 4-Stage Research Protocol */}
      <div
        className="meridian-card"
        style={{
          padding: '2.5rem',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-gold)',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <span className="crest-text" style={{ fontSize: '0.7rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
            METHODOLOGY GOVERNANCE
          </span>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            The Meridian 4-Stage Research Protocol
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Every paper published on Meridian adheres to verifiable scientific and double-blind peer-review standards.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {RESEARCH_PROTOCOLS.map((protocol) => (
            <div key={protocol.stageNumber}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-gold)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.85rem',
                }}
              >
                {protocol.stageNumber}
              </div>

              <h4 style={{ fontSize: '0.98rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                {protocol.title}
              </h4>

              <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {protocol.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
