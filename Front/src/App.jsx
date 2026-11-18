import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Equipamentos from './pages/Equipamentos/Equipamentos';

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/equipamentos" element={<Equipamentos />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
