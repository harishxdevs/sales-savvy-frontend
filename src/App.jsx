import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import './assets/styles.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </Router>
  );
}

export default App;