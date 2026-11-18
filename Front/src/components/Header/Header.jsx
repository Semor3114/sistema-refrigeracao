import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <h1>❄ Sistema de Refrigeração</h1>
            <nav>
                <Link to="/">Início</Link>
                {' | '}
                <Link to="/equipamentos">Equipamentos</Link>
            </nav>
        </header>
    );
}

export default Header;
