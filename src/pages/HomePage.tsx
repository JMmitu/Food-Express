import FoodItem from '../../components/FoodItem/FoodItem'; // আপনার FoodItem কম্পোনেন্ট ইমপোর্ট করুন
import './Home.css';

const Home = () => {
  return (
    <div className='home'>
      <h1>Menu Items</h1>
      {/* এখানে আপনার ডাটাবেজের ডাটা বা ফুড আইটেমগুলো দেখাবেন */}
      <FoodItem id="1" name="Kacchi Biryani" price={250} />
      <FoodItem id="2" name="Cheese Burger" price={180} />
    </div>
  );
};

export default Home;