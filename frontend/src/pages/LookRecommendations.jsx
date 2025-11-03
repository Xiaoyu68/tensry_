import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productImage from '../assets/6a2deb3f5dc08c8f3f72604885ea722fb8d95299.png';

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
  const prompt = location.state?.prompt?.trim() || defaultPrompt;

  const looks = useMemo(() => getLooks(prompt), [prompt]);

  const handleViewProduct = (product) => {
    navigate('/product', {
      state: {
        product: {
          ...product,
          image: productImage,
        },
        prompt,
      },
    });
  };

  return (
    <div className="ai-look">
      <div className="ai-look__summary">
        <div className="ai-look__summary-text">
          <h1 className="ai-look__summary-title">AI Recommendations</h1>
          <p className="ai-look__summary-subtitle">
            Generated outfit suggestions based on "{prompt}"
          </p>
        </div>
        <button type="button" className="ai-look__summary-button">
          Save Session
        </button>
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
              <button type="button" className="ai-look__save-look">
                Save Look
              </button>
            </header>

            <div className="ai-look__products">
              {look.products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className="ai-look__product"
                  onClick={() => handleViewProduct(product)}
                >
                  <span className="sr-only">
                    View detail for {product.name} by {product.brand}
                  </span>
                  <div className="ai-look__product-image">
                    <img src={productImage} alt="" aria-hidden="true" />
                    <span className="ai-look__product-save">♡ Save</span>
                  </div>
                  <div className="ai-look__product-info">
                    <span className="ai-look__product-brand">{product.brand}</span>
                    <span className="ai-look__product-name">{product.name}</span>
                    <span className="ai-look__product-price">{product.price}</span>
                  </div>
                </button>
              ))}
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
