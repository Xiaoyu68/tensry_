import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowUpwardIcon from '../assets/icons/arrow_upward.svg';

const presetPrompts = [
  'I have an important meeting today, recommend a formal yet approachable outfit',
  'Weekend shopping with friends, need comfortable and stylish casual wear',
  'Heading to an art gallery opening, prefer a creative yet polished look',
  'Casual Friday in the office, aiming for relaxed but professional',
];

const Recommendations = () => {
  const [prompt, setPrompt] = useState('');
  const promptRef = useRef(null);
  const navigate = useNavigate();

  const suggestions = useMemo(
    () => presetPrompts.map((text, index) => ({ id: index, text })),
    []
  );

  const handleSuggestionClick = useCallback((text) => {
    setPrompt(text);
    if (promptRef.current) {
      promptRef.current.focus();
    }
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const trimmedPrompt = prompt.trim();
      if (!trimmedPrompt) {
        return;
      }

      navigate('/ai-recommendations', { state: { prompt: trimmedPrompt } });
    },
    [prompt, navigate]
  );

  return (
    <div className="ai">
      <section className="ai__intro">
        <h1 className="ai__title">AI Fashion Stylist</h1>
        <p className="ai__subtitle">
          Based on your style DNA · personalized outfit recommendations for you
        </p>
        <button type="button" className="ai__size-button">
          <span aria-hidden="true" className="ai__size-icon">
            ⚙️
          </span>
          Set size preferences
        </button>
      </section>

      <form className="ai__prompt-card" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="ai-stylist-prompt">
          Describe your styling needs
        </label>
        <textarea
          id="ai-stylist-prompt"
          ref={promptRef}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="ai__prompt-input"
          placeholder="Describe your styling needs, e.g., Important meeting today, $500 budget, looking for professional yet approachable outfit..."
          rows={5}
        />
        <button
          type="submit"
          className="ai__prompt-submit"
          aria-label="Show recommended look"
          disabled={!prompt.trim()}
        >
          <img src={ArrowUpwardIcon} alt="" aria-hidden="true" className="ai__prompt-submit-icon" />
        </button>
      </form>

      <section className="ai__suggestions">
        <p className="ai__suggestions-title">Or try these</p>
        <div className="ai__suggestion-grid">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              className="ai__suggestion-button"
              onClick={() => handleSuggestionClick(suggestion.text)}
            >
              <span aria-hidden="true" className="ai__suggestion-icon">
                💡
              </span>
              <span className="ai__suggestion-text">{suggestion.text}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Recommendations;
