import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const summarySections = [
  {
    title: 'Style Keywords',
    badges: [
      { label: 'Elegant', tone: 'primary' },
      { label: 'Vintage', tone: 'neutral' },
    ],
  },
  {
    title: 'Color Preference',
    badges: [{ label: 'Earth Tones', tone: 'neutral' }],
  },
  {
    title: 'Main Occasions',
    badges: [
      { label: 'Date', tone: 'primary' },
      { label: 'Party', tone: 'neutral' },
    ],
  },
];

const wearingPreference = [
  {
    label: 'Prefers Fitted',
    description: 'Recommend slim or body-hugging cuts to emphasize body lines and refinement',
    scale: { start: 'Loose', end: 'Fitted', value: 0.7 },
  },
  {
    label: 'Balanced Material',
    description: 'Flexible mix of different materials, choose appropriate textures based on occasions',
    scale: { start: 'Soft', end: 'Structured', value: 0.55 },
  },
  {
    label: 'Moderate Coverage',
    description: 'Balance between propriety and fashion',
    scale: { start: 'Low', end: 'High', value: 0.6 },
  },
];

const stylingSuggestions = [
  {
    title: 'Tops Direction',
    body: 'Choose clean-cut tops, focus on fabric texture and detail design, avoid overly complex decorations',
  },
  {
    title: 'Bottoms Direction',
    body: 'Recommend mid to high-waist designs to emphasize body proportions, fit can be flexibly adjusted based on occasions',
  },
  {
    title: 'Accessories Direction',
    body: 'Choose streamlined accessories that align with your overall style, adding finishing touches',
  },
];

const recommendedItems = [
  'Basic Shirts',
  'Blazers',
  'High-Waist Wide Pants',
  'Straight Leg Jeans',
  'Knit Cardigans',
  'Basic Tees',
  'Low-Heel Boots',
  'Minimalist Bags',
  'Classic Belts',
];

const avoidItems = [
  'Overly complex patterns',
  'Extremely exaggerated silhouettes',
  'Clashing color combos',
];

const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const capturedItems = location.state?.items ?? [];
  const [saveToast, setSaveToast] = useState(null);

  useEffect(() => {
    if (!saveToast) {
      return undefined;
    }
    const timer = setTimeout(() => setSaveToast(null), 3200);
    return () => clearTimeout(timer);
  }, [saveToast]);

  const handleSave = () => {
    // eslint-disable-next-line no-console
    console.log('Save report triggered.', { capturedItems });
    setSaveToast('Report saved successfully.');
  };

  const handleAiRecommendations = () => {
    navigate('/recommendations', { state: { items: capturedItems } });
  };

  return (
    <div className="report">
      <div className="notification-region" aria-live="polite" aria-atomic="true">
        {saveToast ? (
          <div className="notification notification--success" role="status">
            <span aria-hidden="true" className="notification__icon">
              ✓
            </span>
            <span className="notification__message">{saveToast}</span>
          </div>
        ) : null}
      </div>

      <div className="report__toolbar">
        <button
          type="button"
          className="report__toolbar-back"
          onClick={() => navigate('/sandbox')}
        >
          <span aria-hidden="true">←</span>
          Back to Sandbox
        </button>
        <div className="report__toolbar-actions">
          <button type="button" className="report__toolbar-button" onClick={handleSave}>
            <span aria-hidden="true">💾</span>
            Save Report
          </button>
          <button
            type="button"
            className="report__toolbar-button report__toolbar-button--primary"
            onClick={handleAiRecommendations}
          >
            <span aria-hidden="true">✨</span>
            AI Style Recommendations
          </button>
        </div>
      </div>

      <section className="report__intro">
        <div className="report__meta">
          <span className="report__meta-badge">Generated: October 23, 2025</span>
        </div>
        <div className="report__headline">
          <h1 className="report__title">Your Style Genome Report</h1>
          <p className="report__subtitle">
            Personalized style profile generated based on your preferences
          </p>
        </div>
      </section>

      <section className="report__summary-grid" aria-label="Style summary">
        {summarySections.map((section) => (
          <article key={section.title} className="report__card">
            <header className="report__card-header">
              <p className="report__card-eyebrow">{section.title}</p>
            </header>
            <div className="report__divider" aria-hidden="true" />
            <div className="report__badge-row">
              {section.badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`report__badge${
                    badge.tone === 'primary' ? ' report__badge--primary' : ''
                  }`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="report__analysis">
        <header className="report__section-header">
          <h2 className="report__section-title">Style Analysis</h2>
          <div className="report__divider" aria-hidden="true" />
        </header>
        <article className="report__card report__card--text">
          <p>
            Your style preference focuses on Elegant and Vintage, showing a clear and balanced aesthetic
            direction. This well-defined style positioning helps establish a unified personal image while retaining
            appropriate flexibility, allowing you to maintain style consistency while adapting to different occasions.
          </p>
        </article>
      </section>

      <section className="report__wearing">
        <header className="report__section-header">
          <h2 className="report__section-title">Wearing Preference Analysis</h2>
          <div className="report__divider" aria-hidden="true" />
        </header>
        <div className="report__wearing-grid">
          {wearingPreference.map((entry) => (
            <article key={entry.label} className="report__card report__card--wearing">
              <div className="report__chip">{entry.label}</div>
              <p className="report__card-body">{entry.description}</p>
              <div className="report__scale">
                <span>{entry.scale.start}</span>
                <span>{entry.scale.end}</span>
              </div>
              <div className="report__scale-bar">
                <div
                  className="report__scale-indicator"
                  style={{ width: `${Math.round(entry.scale.value * 100)}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="report__recommendations">
        <div className="report__column">
          <header className="report__section-header">
            <h2 className="report__section-title report__section-title--caps">Styling Suggestions</h2>
            <div className="report__divider" aria-hidden="true" />
          </header>
          <article className="report__card report__card--stacked">
            {stylingSuggestions.map((suggestion) => (
              <div key={suggestion.title} className="report__stacked-item">
                <div className="report__stacked-title">
                  <span aria-hidden="true" className="report__bullet" />
                  <p>{suggestion.title}</p>
                </div>
                <p className="report__stacked-body">{suggestion.body}</p>
              </div>
            ))}
          </article>
        </div>

        <div className="report__column">
          <header className="report__section-header">
            <h2 className="report__section-title">Recommended Item Types</h2>
            <div className="report__divider" aria-hidden="true" />
          </header>
          <article className="report__card report__card--badge-grid">
            <div className="report__badge-grid">
              {recommendedItems.map((item) => (
                <span key={item} className="report__badge report__badge--primary">
                  {item}
                </span>
              ))}
            </div>
            <div className="report__avoid">
              <h3 className="report__avoid-title">Avoid These</h3>
              <div className="report__avoid-badges">
                {avoidItems.map((item) => (
                  <span key={item} className="report__badge report__badge--muted">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Report;
