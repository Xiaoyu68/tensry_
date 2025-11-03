import { useLocation } from 'react-router-dom';
import Header from './Header';

const breadcrumbMap = {
  home: [
    { label: 'Style Report', active: true, to: '/report' },
    { label: 'AI Stylist', active: false, to: '/recommendations' },
  ],
  sandbox: [
    { label: 'Sandbox', active: true, to: '/sandbox' },
    { label: 'AI Stylist', active: false, to: '/recommendations' },
  ],
  report: [
    { label: 'Sandbox', active: false, to: '/sandbox' },
    { label: 'Style Report', active: true, to: '/report' },
  ],
  recommendations: [
    { label: 'Sandbox', active: false, to: '/sandbox' },
    { label: 'AI Stylist', active: true, to: '/recommendations' },
  ],
  aiRecommendations: [
    { label: 'Sandbox', active: false, to: '/sandbox' },
    { label: 'AI Stylist', active: true, to: '/recommendations' },
  ],
  product: [
    { label: 'Sandbox', active: false, to: '/sandbox' },
    { label: 'AI Stylist', active: true, to: '/recommendations' },
  ],
  login: [
    { label: 'Sandbox', active: true, to: '/sandbox' },
    { label: 'AI Stylist', active: false, to: '/recommendations' },
  ],
};

const Layout = ({ children }) => {
  const location = useLocation();
  let routeKey = 'home';
  if (location.pathname === '/sandbox') {
    routeKey = 'sandbox';
  } else if (location.pathname === '/report') {
    routeKey = 'report';
  } else if (location.pathname === '/recommendations') {
    routeKey = 'recommendations';
  } else if (location.pathname === '/ai-recommendations') {
    routeKey = 'aiRecommendations';
  } else if (location.pathname === '/product') {
    routeKey = 'product';
  } else if (location.pathname === '/login') {
    routeKey = 'login';
  }
  const breadcrumbs = breadcrumbMap[routeKey] ?? breadcrumbMap.home;

  return (
    <div className={`app app--${routeKey}`}>
      <div className="layout">
        <Header breadcrumbs={breadcrumbs} />
        <div className="page">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
