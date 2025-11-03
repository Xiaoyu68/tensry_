import { useLocation, useNavigate } from 'react-router-dom';
import productImage from '../assets/6a2deb3f5dc08c8f3f72604885ea722fb8d95299.png';

const defaultProduct = {
  brand: 'Cuyana',
  name: 'Minimalist Tote Bag',
  price: '¥2180',
  image: productImage,
  colors: ['Black', 'Gray', 'Navy'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  attributes: ['Wool Blend', 'Minimalist', 'Professional', 'Work'],
};

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = {
    ...defaultProduct,
    ...(location.state?.product ?? {}),
  };

  return (
    <div className="product-detail">
      <button
        type="button"
        className="product-detail__back"
        onClick={() => navigate(-1)}
      >
        ← Back to Look
      </button>

      <div className="product-detail__grid">
        <div className="product-detail__image">
          {typeof product.image === 'string' &&
          /\.(png|jpe?g|gif|webp|svg)$/i.test(product.image) ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div
              className="product-detail__image-fallback"
              style={{ background: product.image }}
              aria-hidden="true"
            />
          )}
        </div>

        <div className="product-detail__info">
          <div className="product-detail__meta">
            <span className="product-detail__brand">{product.brand}</span>
            <h1 className="product-detail__title">{product.name}</h1>
            <span className="product-detail__price">{product.price}</span>
          </div>

          <div className="product-detail__options">
            <div className="product-detail__option">
              <span className="product-detail__option-label">Color</span>
              <div className="product-detail__pills">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="product-detail__pill"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div className="product-detail__option">
              <span className="product-detail__option-label">Size</span>
              <div className="product-detail__pills">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className="product-detail__pill"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="product-detail__attributes">
            <span className="product-detail__section-title">Material & Style</span>
            <div className="product-detail__badges">
              {product.attributes.map((attribute) => (
                <span key={attribute} className="product-detail__badge">
                  {attribute}
                </span>
              ))}
            </div>
          </div>

          <div className="product-detail__actions">
            <button type="button" className="product-detail__cta product-detail__cta--primary">
              Add to Cart
            </button>
            <button type="button" className="product-detail__cta">
              View Similar Items
            </button>
          </div>

          <div className="product-detail__note">
            💡 This is a simulated purchase feature, clicks will be recorded for interest tracking
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
