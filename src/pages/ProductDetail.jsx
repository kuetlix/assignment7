import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router";

import { fetchProduct } from "../api/productsApi";
import useFetch from "../hooks/useFetch";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    </section>
  );
}

export default ProductDetail;