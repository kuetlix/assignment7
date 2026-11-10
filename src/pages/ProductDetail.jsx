import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router";

import { fetchProduct } from "../api/productsApi";
import useFetch from "../hooks/useFetch";
import { useCartStore } from "../store/cartStore";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const addItem = useCartStore((state) => state.addItem);

  const loadProduct = useCallback(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  const dependencies = useMemo(() => [id], [id]);

  const {
    loading,
    error,
    data: product,
  } = useFetch(loadProduct, dependencies);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return (
      <section>
        <h1>Product Not Found</h1>
        <p role="alert">
          Sorry, this product could not be found.
        </p>
        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </section>
    );
  }

  if (!product) {
    return <p>Product information is unavailable.</p>;
  }

  return (
    <section
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5D9EE",
        padding: "24px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <button
        onClick={() => navigate("/products")}
        style={{ marginBottom: "20px" }}
      >
        Back to Products
      </button>

      <img
        src={product.thumbnail}
        alt={product.title}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "contain",
          backgroundColor: "#F9F5FC",
        }}
      />

      <h1>{product.title}</h1>
      <p>Category: {product.category}</p>
      <p>{product.description}</p>

      <h2 style={{ color: "#8050AA" }}>
        ${product.price.toFixed(2)}
      </h2>

      <button
        onClick={() => addItem(product)}
        style={{
          backgroundColor: "#8050AA",
          color: "#FFFFFF",
          border: "none",
          padding: "12px 24px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </section>
  );
}

export default ProductDetail;