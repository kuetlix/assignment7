import { Link } from "react-router";
import { useCartStore } from "../store/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section>
        <h1>Your Shopping Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Browse Products</Link>
      </section>
    );
  }

  return (
    <section>
      <h1 style={{ color: "#8050AA" }}>Your Shopping Cart</h1>

      {items.map((item) => (
        <article
          key={item.id}
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5D9EE",
            padding: "20px",
            marginBottom: "16px",
          }}
        >
          <h2>{item.title}</h2>
          <p>Price: ${item.price.toFixed(2)}</p>

          <label htmlFor={`quantity-${item.id}`}>
            Quantity:
          </label>

          <input
            id={`quantity-${item.id}`}
            type="number"
            min="1"
            value={item.quantity}
            onChange={(event) => {
              const nextQuantity = Number(event.target.value);

              if (Number.isInteger(nextQuantity)) {
                setQuantity(item.id, nextQuantity);
              }
            }}
            style={{
              width: "70px",
              padding: "8px",
              margin: "0 12px",
            }}
          />

          <button
            onClick={() => removeItem(item.id)}
            style={{
              backgroundColor: "#8050AA",
              color: "#FFFFFF",
              border: "none",
              padding: "10px 16px",
            }}
          >
            Remove
          </button>

          <p>
            Subtotal: ${(item.price * item.quantity).toFixed(2)}
          </p>
        </article>
      ))}

      <h2>Total: ${total.toFixed(2)}</h2>

      <button
        onClick={clear}
        style={{
          backgroundColor: "#8050AA",
          color: "#FFFFFF",
          border: "none",
          padding: "12px 24px",
        }}
      >
        Clear Cart
      </button>
    </section>
  );
}

export default Cart;