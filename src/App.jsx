import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <Router basename="/vite-project">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/account" element={<AccountPage />} /> {/* Use 'element' prop */}
      </Routes>
    </Router>
  );
}

export default App;
