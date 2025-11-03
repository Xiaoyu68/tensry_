import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productImage from '../assets/6a2deb3f5dc08c8f3f72604885ea722fb8d95299.png';
import ArrowUpwardIcon from '../assets/icons/arrow_upward.svg';
import CheckroomIcon from '../assets/icons/checkroom.svg';

const defaultPrompt =
  'Weekend shopping with friends, need comfortable and stylish casual wear';

const getLooks = (prompt) => [
  {
    id: 'look-1',
    title: 'Elegant Professional',
    tags: ['Professional', 'Refined', 'Comfortable'],
    insight:
      'Classic blazer paired with wide-leg trousers creates a professional yet feminine silhouette, elevated with minimalist accessories.',
    products: [
      {
        id: 'product-1',
        brand: 'MOHAN',
        name: 'Recycle Boucle Knit Cardigan Pink',
        price: '$120',
      },
      {
        id: 'product-2',
        brand: 'MOHAN',
        name: 'High-Rise Tailored Wide-Leg Trousers',
        price: '$220',
      },
      {
        id: 'product-3',
        brand: 'MOHAN',
        name: 'Soft Leather Structured Tote Bag',
        price: '$180',
      },
      {
        id: 'product-4',
        brand: 'MOHAN',
        name: 'Minimalist Block Heel Pumps',
        price: '$160',
      },
    ],
  },
  {
    id: 'look-2',
    title: 'Weekend Capsule',
    tags: ['Relaxed', 'Versatile', 'Statement'],
    insight:
      'Layer soft textures with modern silhouettes for a refined off-duty look that transitions seamlessly from brunch to shopping.',
    products: [
      {
        id: 'product-5',
        brand: 'MOHAN',
        name: 'Boxy Knit Polo Sweater',
        price: '$135',
      },
      {
        id: 'product-6',
        brand: 'MOHAN',
        name: 'Pleated Cotton Midi Skirt',
        price: '$165',
      },
      {
        id: 'product-7',
        brand: 'MOHAN',
        name: 'Sculptural Statement Earrings',
        price: '$65',
      },
      {
        id: 'product-8',
        brand: 'MOHAN',
        name: 'Curved Strap Leather Mini Bag',
        price: '$140',
      },
    ],
  },
];

const LookRecommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationPrompt = location.state?.prompt?.trim();
  const initialPrompt = locationPrompt && locationPrompt.length ? locationPrompt : defaultPrompt;
  const [prompt, setPrompt] = useState(initialPrompt);
  const [confirmedPrompt, setConfirmedPrompt] = useState(initialPrompt);
  const [toast, setToast] = useState(null);
  const [savedProducts, setSavedProducts] = useState(() => new Set());
  const [lookSaves, setLookSaves] = useState(() => new Set());

  const looks = useMemo(() => getLooks(confirmedPrompt), [confirmedPrompt]);

  useEffect(() => {
    setPrompt(initialPrompt);
    setConfirmedPrompt(initialPrompt);
  }, [initialPrompt]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }
    const timeout = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(timeout);
  }, [toast]);

  const showToast = useCallback((message = 'Saved to your looks.') => {
    setToast(message);
  }, []);

  const handleViewProduct = (product) => {
    navigate('/product', {
      state: {
        product: {
          ...product,
          image: productImage,
        },
        prompt: confirmedPrompt,
      },
    });
  };

  const handleSaveLook = (lookId) => {
    setLookSaves((prev) => {
      const next = new Set(prev);
      if (next.has(lookId)) {
        next.delete(lookId);
        showToast('Look removed from saved.');
      } else {
        next.add(lookId);
        showToast('Look saved.');
      }
      return next;
    });
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handlePromptSubmit = (event) => {
    event.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed) {
      showToast('Please enter your styling prompt.');
      return;
    }
    setPrompt(trimmed);
    setConfirmedPrompt(trimmed);
    navigate('/ai-recommendations', { state: { prompt: trimmed }, replace: true });
  };

  const handleSaveProduct = (event, productId) => {
    event.preventDefault();
    event.stopPropagation();
    setSavedProducts((prev) => {
      const next = new Set(prev);
      const wasSaved = next.has(productId);
      if (wasSaved) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      showToast(wasSaved ? 'Removed from your looks.' : 'Saved to your looks.');
      return next;
    });
  };

  return (
    <div className="ai-look">
      <div className="notification-region" aria-live="polite" aria-atomic="true">
        {toast ? (
          <div className="notification notification--success" role="status">
            <span aria-hidden="true" className="notification__icon">
              ✓
            </span>
            <span className="notification__message">{toast}</span>
          </div>
        ) : null}
      </div>

      <form className="ai-look__prompt-card" onSubmit={handlePromptSubmit}>
        <label className="sr-only" htmlFor="ai-look-prompt">
          Describe your styling needs
        </label>
        <textarea
          id="ai-look-prompt"
          className="ai-look__prompt-textarea"
          value={prompt}
          onChange={handlePromptChange}
          rows={3}
          placeholder="Describe your styling needs..."
        />
        <button type="submit" className="ai-look__prompt-submit" aria-label="Refresh recommendations">
          <img src={ArrowUpwardIcon} alt="" aria-hidden="true" />
        </button>
      </form>

      <div className="ai-look__summary">
        <div className="ai-look__summary-text">
          <h1 className="ai-look__summary-title">AI Recommendations</h1>
          <p className="ai-look__summary-subtitle">
            Generated outfit suggestions based on "Weekend shopping with friends, need comfortable and stylish casual wear
          </p>
        </div>
      </div>

      <div className="ai-look__card">
        {looks.map((look) => (
          <section key={look.id} className="ai-look__section">
            <header className="ai-look__section-header">
              <div>
                <h2 className="ai-look__section-title">{look.title}</h2>
                <div className="ai-look__tags">
                  {look.tags.map((tag) => (
                    <span key={tag} className="ai-look__tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="ai-look__insight">💡 {look.insight}</p>
              </div>
              <button
                type="button"
                className={`ai-look__save-look${
                  lookSaves.has(look.id) ? ' ai-look__save-look--active' : ''
                }`}
                onClick={() => handleSaveLook(look.id)}
              >
                <img src={CheckroomIcon} alt="" aria-hidden="true" />
                <span>{lookSaves.has(look.id) ? 'Saved Look' : 'Save Look'}</span>
              </button>
            </header>

            <div className="ai-look__products">
              {look.products.map((product) => {
                const isSaved = savedProducts.has(product.id);
                return (
                  <div
                    key={product.id}
                    className="ai-look__product"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleViewProduct(product)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleViewProduct(product);
                      }
                    }}
                  >
                    <span className="sr-only">
                      View detail for {product.name} by {product.brand}
                    </span>
                    <div className="ai-look__product-image">
                      <img src={productImage} alt="" aria-hidden="true" />
                      <button
                        type="button"
                        className={`ai-look__product-save${
                          isSaved ? ' ai-look__product-save--active' : ''
                        }`}
                        aria-pressed={isSaved}
                        onClick={(event) => handleSaveProduct(event, product.id)}
                      >
                        <img src={CheckroomIcon} alt="" aria-hidden="true" />
                        <span>{isSaved ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>
                    <div className="ai-look__product-info">
                      <span className="ai-look__product-brand">{product.brand}</span>
                      <span className="ai-look__product-name">{product.name}</span>
                      <span className="ai-look__product-price">{product.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="ai-look__cta">
        <p className="ai-look__cta-text">Want more outfit inspiration?</p>
        <button type="button" className="ai-look__cta-button">
          Generate More
        </button>
      </section>
    </div>
  );
};

export default LookRecommendations;
