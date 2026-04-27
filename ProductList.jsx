import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import { Link } from 'react-router-dom';

const plantsData = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { id: 1, name: 'Spider Plant', price: 12.99,
        image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400' },
      { id: 2, name: 'Peace Lily', price: 15.99,
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400' },
      { id: 3, name: 'Snake Plant', price: 14.99,
        image: 'https://images.unsplash.com/photo-1620803366004-119b57f54cd6?w=400' },
      { id: 4, name: 'Boston Fern', price: 11.99,
        image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=400' },
      { id: 5, name: 'Aloe Vera', price: 9.99,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400' },
      { id: 6, name: 'Bamboo Palm', price: 18.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
    ],
  },
  {
    category: 'Low Light Plants',
    plants: [
      { id: 7, name: 'Pothos', price: 8.99,
        image: 'https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=400' },
      { id: 8, name: 'ZZ Plant', price: 16.99,
        image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400' },
      { id: 9, name: 'Cast Iron Plant', price: 13.99,
        image: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=400' },
      { id: 10, name: 'Dracaena', price: 17.99,
        image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400' },
      { id: 11, name: 'Parlor Palm', price: 19.99,
        image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400' },
      { id: 12, name: 'Chinese Evergreen', price: 14.99,
        image: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=400' },
    ],
  },
  {
    category: 'Succulents & Cacti',
    plants: [
      { id: 13, name: 'Echeveria', price: 6.99,
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400' },
      { id: 14, name: 'Jade Plant', price: 10.99,
        image: 'https://images.unsplash.com/photo-1567331711402-509c12c41959?w=400' },
      { id: 15, name: 'Barrel Cactus', price: 12.99,
        image: 'https://images.unsplash.com/photo-1534710961216-75c88202f43e?w=400' },
      { id: 16, name: 'Haworthia', price: 7.99,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400' },
      { id: 17, name: 'Prickly Pear', price: 9.99,
        image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400' },
      { id: 18, name: 'Aloe Aristata', price: 8.99,
        image: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=400' },
    ],
  },
];

function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  return (
    <nav className="navbar">
      <h2>🌿 Paradise Nursery</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Plants</Link></li>
        <li>
          <Link to="/cart" className="cart-icon">
            🛒
            {totalCount > 0 && (
              <span className="cart-count">{totalCount}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const isInCart = (id) => cartItems.some(item => item.id === id);

  return (
    <div>
      <Navbar />
      <div className="product-list-page">
        {plantsData.map((cat) => (
          <div key={cat.category} className="category-section">
            <h2>{cat.category}</h2>
            <div className="products-grid">
              {cat.plants.map((plant) => (
                <div key={plant.id} className="product-card">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    onError={(e) => {
                      e.target.style.backgroundColor = '#c8e6c9';
                      e.target.src = '';
                    }}
                  />
                  <h3>{plant.name}</h3>
                  <p>${plant.price.toFixed(2)}</p>
                  <button
                    className="add-to-cart-btn"
                    disabled={isInCart(plant.id)}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {isInCart(plant.id) ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
