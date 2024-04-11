import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" exact component={HomePage} />
        <Route path="/recipe" element={<RecipePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
