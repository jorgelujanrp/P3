
import React from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import SectionContainer from "./SectionContainer";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {

  if (products.length === 0) {
    return (
      <SectionContainer>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 0",
          color: "#000000",
        }}>
          <p style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>
            No se encontraron productos
          </p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "24px",
    }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;