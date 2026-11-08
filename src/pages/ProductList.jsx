import { useMemo } from "react";
import { useSearchParams } from "react-router";

import { fetchProducts } from "../api/productsApi";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";

function ProductList(){
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const dependencies = useMemo(() => [], []);

  const {
    loading,
    error,
    data: products,
  } = useFetch(fetchProducts,dependencies);

  const categories = useMemo(() => {
    if (!products) return [];

    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  function updateFilter(key, value) {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }

    setSearchParams(nextParams);
  }

  const filteredProducts = products
    ? products.filter((product)=>{
        const matchesTitle = product.title
          .toLowerCase()
          .includes(query.toLowerCase());

        const matchesCategory =
          !category || product.category === category;

        return matchesTitle && matchesCategory;
      })
    : [];

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p role="alert">Unable to load products: {error.message}</p>;
  }

  return (
    <section>
      <h1>Explore Our Products</h1>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <input
          type="search"
          placeholder="Search products..."
          aria-label="Search products by title"
          value={query}
          onChange={(event) =>
            updateFilter("q", event.target.value)
          }
        />
        <select
          aria-label="Filter by category"
          value={category}
          onChange={(event) =>
            updateFilter("category", event.target.value)
          }
        >
          <option value="">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found matching your filters.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}
export default ProductList;