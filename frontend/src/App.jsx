import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Sandbox from './pages/Sandbox';
import Report from './pages/Report';
import Recommendations from './pages/Recommendations';
import LookRecommendations from './pages/LookRecommendations';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sandbox" element={<Sandbox />} />
        <Route path="/report" element={<Report />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/ai-recommendations" element={<LookRecommendations />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
