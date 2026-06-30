import { Link } from 'react-router-dom'; // এটি অবশ্যই ইমপোর্ট করবেন
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1>Food Express</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li> {/* কার্টের লিংক */}
      </ul>
    </div>
  );
};

export default Navbar;