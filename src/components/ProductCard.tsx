// Tarjeta individual que representa un producto en el grid

// Muestra:
//   - Imagen miniatura (thumbnail)
//   - Badge de categoría
//   - Título del producto
//   - Precio formateado con "€"
//   - Botón "Ver detalles" → navega a /product/[id]


import React from "react";
import Link from "next/link"; 
import CardWrapper from "./CardWrapper";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const formattedPrice = `${product.price.toFixed(2)}€`;

  return (

    <CardWrapper>

      {/*
        IMAGEN MINIATURA
      */}
      <div style={{ width: "100%", aspectRatio: "1", overflow: "hidden", backgroundColor: "#f3f4f6" }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div style={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flex: 1,
      }}>

        <span style={{
          display: "inline-block",
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#2563eb",
          backgroundColor: "#eff6ff",
          padding: "3px 8px",
          borderRadius: "999px",
          width: "fit-content",
        }}>
          {product.category}
        </span>

        <h3 style={{
          margin: 0,
          fontSize: "14px",
          fontWeight: 600,
          color: "#111827",
          lineHeight: "1.4",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {product.title}
        </h3>

        <p style={{
          margin: "auto 0 0 0",
          fontSize: "18px",
          fontWeight: 700,
          color: "#111827",
        }}>
          {formattedPrice}
        </p>

        <Link
          href={`/product/${product.id}`}
          style={{
            display: "block",
            textAlign: "center",
            padding: "10px 16px",
            borderRadius: "10px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            marginTop: "8px",
          }}
        >
          Ver detalles
        </Link>
      </div>
    </CardWrapper>
  );
};

export default ProductCard;