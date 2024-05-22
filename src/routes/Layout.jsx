import { Outlet, Link } from 'react-router-dom';
import '../App.css';
import Bet from '../assets/bet.png';

const Layout = () => {
    return (
        <>
            <div className='header'>
                <h1>Bet 1.0</h1>
                <img src={Bet} alt='Bet Emoji' className='bet-emoji' />
            </div>
            
            <p>Challenge your friends to do something fun, silly, or even a little bit crazy!</p>
            <nav className='options'>
                <Link to='/'>
                    <button>Browse Challenges 🔎</button>
                </Link>

                <Link to='/create'>
                    <button>Submit a Challenge 🎯</button>
                </Link>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout;