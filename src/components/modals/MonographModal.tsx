import React, { useState } from 'react';
import { X, Download, BookOpen, FileCheck, Check, Code, Shield } from 'lucide-react';
import { ResearchMonograph } from '../../types/research';

interface MonographModalProps {
  monograph: ResearchMonograph | null;
  isOpen: boolean;
  onClose: () => void;
  onInspectNotebook?: (monograph: ResearchMonograph) => void;
}

export const MonographModal: React.FC<MonographModalProps> = ({
  monograph,
  isOpen,
  onClose,
  onInspectNotebook,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !monograph) return null;

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      // Simulate real browser PDF memo download
      const element = document.createElement('a');
      const file = new Blob(
        [
          `MERIDIAN SOVEREIGN RESEARCH ARCHIVE\n` +
          `Title: ${monograph.title}\n` +
          `Subtitle: ${monograph.subtitle}\n` +
          `Lead Author: ${monograph.leadAuthor.name} (${monograph.leadAuthor.institution})\n` +
          `DOI: ${monograph.doi}\n` +
          `Date: ${monograph.publicationDate}\n\n` +
          `ABSTRACT:\n${monograph.abstract}\n\n` +
          `EXECUTIVE FINDINGS:\n${monograph.executiveSummary.join('\n\n')}\n\n` +
          `ACTUARIAL FORMULAS:\n${monograph.latexFormulas.join('\n')}\n\n` +
          `VERIFICATION SEAL: 0x9E7D3B29::MERIDIAN_ACADEMIC_PEER_REVIEW\n`
        ],
        { type: 'text/plain;charset=utf-8' }
      );
      element.href = URL.createObjectURL(file);
      element.download = monograph.pdfFileName.replace('.pdf', '.txt');
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setTimeout(() => setDownloadSuccess(false), 2500);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '880px' }}>
        {/* Header Bar */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)',
              }}
            >
              <BookOpen size={16} />
            </div>
            <div>
              <span className="crest-text" style={{ fontSize: '0.68rem', color: 'var(--text-gold)', letterSpacing: '0.12em' }}>
                PEER-REVIEWED MONOGRAPH ARCHIVE
              </span>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                DOI: {monograph.doi} · {monograph.pageCount} Pages
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn-ghost" style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '2rem 2.25rem' }}>
          {/* Badge & Title */}
          <div style={{ marginBottom: '1.25rem' }}>
            {monograph.badge && (
              <span className="badge-gold" style={{ marginBottom: '0.75rem' }}>
                {monograph.badge}
              </span>
            )}
            <h2 style={{ fontSize: '1.75rem', lineHeight: 1.25, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {monograph.title}
            </h2>
            <p className="editorial-italic" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {monograph.subtitle}
            </p>
          </div>

          {/* Authors & Institutional Chairs */}
          <div
            style={{
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '2rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                {monograph.leadAuthor.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {monograph.leadAuthor.chair} · {monograph.leadAuthor.institution}
              </div>
              {monograph.coAuthors && monograph.coAuthors.length > 0 && (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                  Co-authored with {monograph.coAuthors.join('; ')}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              {onInspectNotebook && (
                <button
                  type="button"
                  onClick={() => onInspectNotebook(monograph)}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.5rem 0.85rem' }}
                >
                  <Code size={14} />
                  <span>Model Notebook</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleDownload}
                className="btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.95rem' }}
              >
                {downloadSuccess ? (
                  <>
                    <Check size={14} />
                    <span>Dossier Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download size={14} />
                    <span>Download Monograph ({monograph.pageCount}p)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Abstract */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-gold)', marginBottom: '0.75rem' }}>
              Academic Abstract & Fiduciary Premise
            </h4>
            <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>
              {monograph.abstract}
            </p>
          </div>

          {/* Executive Findings */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-gold)', marginBottom: '1rem' }}>
              Key Actuarial Findings & Fiduciary Directives
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {monograph.keyFindings.map((finding, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-card)',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    §{idx + 1}. {finding.title}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {finding.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mathematical Proof Formulas */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-gold)', marginBottom: '0.75rem' }}>
              Actuarial Formulation Proofs (LaTeX / Continuous Formulation)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {monograph.latexFormulas.map((formula, idx) => (
                <div key={idx} className="math-formula-box">
                  <code>{formula}</code>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Integrity Seal */}
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
              color: 'var(--text-tertiary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={14} style={{ color: 'var(--gain-green)' }} />
              <span>Double-Blind Reviewed under Oxford Fiduciary Institute Protocol</span>
            </div>
            <div className="tabular-nums">
              Citations: {monograph.citationCount} · Downloads: {monograph.downloadCount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
