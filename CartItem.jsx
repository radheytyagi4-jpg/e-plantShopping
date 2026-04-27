import { useSelector, useDispatch } from 'react-redux';
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from './CartSlice';
import { Link } from 'react-router-dom';

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

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const handleCheckout = () => {
    alert('Coming Soon! 🌿 Thank you for shopping with us!');
  };

  return (
    <div>
      <Navbar />
      <div className="cart-page">
        <h1>Your Shopping Cart 🛒</h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
              Your cart is empty!
            </p>
            <Link to="/products" className="continue-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                  <p>
                    Total: $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  🗑 Delete
                </button>
              </div>
            ))}

            <div className="cart-summary">
              <h2>
                Total Amount: ${totalCost.toFixed(2)}
              </h2>
              <div style={{ marginTop: '15px' }}>
                <button
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
                <Link to="/products" className="continue-btn">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
