import { Link } from "react-router";

function ProductCard({ product }){
  return (
    <article
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5D9EE",
        borderRadius: "3px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "contain",
          backgroundColor: "#F9F5FC",
          borderRadius: "2px",
        }}
      />

      <h2
        style={{
          fontSize: "18px",
          margin: 0,
          color: "#333333",
        }}
      >
        {product.title}
      </h2>

      <p
        style={{
          color: "#777777",
          fontSize: "14px",
          margin: 0,
        }}
      >
        {product.category}
      </p>

      <p
        style={{
          color: "#8050AA",
          fontSize: "20px",
          fontWeight: "bold",
          margin: 0,
        }}
      >
        ${product.price.toFixed(2)}
      </p>

      <Link
        to={`/products/${product.id}`}
        style={{
          backgroundColor: "#8050AA",
          color: "#FFFFFF",
          padding: "10px 16px",
          borderRadius: "3px",
          textAlign: "center",
          textDecoration: "none",
          marginTop: "auto",
        }}
      >
        View Details
      </Link>
    </article>
  );
}

export default ProductCard;