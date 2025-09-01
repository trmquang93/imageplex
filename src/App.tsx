import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n';
import LandingPage from './pages/LandingPage';
import ProcessorPage from './pages/ProcessorPage';

const App: React.FC = () => {
  return (
    <I18nProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<ProcessorPage />} />
        </Routes>
      </Router>
    </I18nProvider>
  );
};

export default App;