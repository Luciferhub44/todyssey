import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import ElementTribe from '../pages/fun';
import EnsPage from '../pages/ens';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/fun" element={<ElementTribe />} />
      <Route path="/ens" element={<EnsPage />} />
    </Routes>
  );
};

export default AppRoutes; 