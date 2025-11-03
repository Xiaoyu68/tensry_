import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="home">
      <h1 className="home__title">Style Sandbox</h1>
      <p className="home__subtitle">
        Find your unique fashion DNA by freely creating on the style sandbox. Tensyr AI Stylist will
        translate your vision into a professional fashion recommendation report.
      </p>
      <button
        className="home__cta"
        type="button"
        onClick={() => navigate('/sandbox')}
      >
        <span>Start Creating</span>
        <span aria-hidden="true" className="home__cta-icon">
          →
        </span>
      </button>
      <div className="home__image" role="presentation" />
    </section>
  );
};

export default Home;
