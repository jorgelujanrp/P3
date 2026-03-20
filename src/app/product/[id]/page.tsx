// PÁGINA DE DETALLE 

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import SectionContainer from "@/components/SectionContainer";
import { Product } from "@/types/product";


// Rating como estrellas

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: "20px",
            color: star <= Math.round(rating) ? "#f59e0b" : "#d1d5db",
          }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: "13px", color: "#6b7280", marginLeft: "6px" }}>
        ({rating})
      </span>
    </div>
  );
}

export default function ProductPage() {

  // ESTADOS

  const [product, setProduct] = useState<Product | null>(null);

  const [selectedImage, setSelectedImage] = useState<number>(0);

  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  // PARÁMETRO DE LA URL

  const params = useParams();
  const id = params.id as string;

  // CARGA DEL PRODUCTO

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setSelectedImage(0);

        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Producto no encontrado"
              : `Error HTTP ${response.status}`
          );
        }

        const data: Product = await response.json();
        setProduct(data);

      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // MANEJADORES DEL DRAG

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX === null || !product) return;

    const diff = dragStartX - e.clientX;

    if (Math.abs(diff) > 20) {
      if (diff > 0) {
        setSelectedImage((prev) => (prev + 1) % product.images.length);
      } else {
        setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    }

    setDragStartX(null);
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setDragStartX(null);
    setIsDragging(false);
  };

  // RENDERS CONDICIONALES

  if (isLoading) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "#9ca3af" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            border: "4px solid #e5e7eb", borderTopColor: "#2563eb",
            animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p>Cargando producto...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: "40px 20px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "#111827", marginTop: "16px" }}>
            {error || "Producto no encontrado"}
          </h2>
          <Link
            href="/"
            style={{
              display: "inline-block", marginTop: "24px",
              padding: "12px 24px", borderRadius: "10px",
              backgroundColor: "#2563eb", color: "#fff",
              textDecoration: "none", fontWeight: 600,
            }}
          >
            Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  // RENDER PRINCIPAL

  const stockStatus = product.stock <= 10
    ? { text: `¡Solo quedan ${product.stock} unidades!`, color: "#f97316" }
    : { text: `${product.stock} unidades en stock`, color: "#16a34a" };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #f0f0f0",
        padding: "16px 20px",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              color: "#2563eb", textDecoration: "none",
              fontSize: "14px", fontWeight: 500,
            }}
          >
            ← Volver al catálogo
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 20px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "32px",
          alignItems: "start",
        }}>

          <SectionContainer>

            <div
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              style={{
                width: "100%", aspectRatio: "1",
                borderRadius: "12px", overflow: "hidden",
                backgroundColor: "#f3f4f6", marginBottom: "16px",
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
              }}
            >
              <img
                src={product.images[selectedImage]}
                alt={`${product.title} - imagen ${selectedImage + 1}`}
                draggable={false} 
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                }}
              />
            </div>

            <p style={{
              textAlign: "center", fontSize: "12px",
              color: "#9ca3af", margin: "0 0 12px",
            }}>
              {selectedImage + 1} / {product.images.length}
            </p>

            {product.images.length > 1 && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      width: "64px", height: "64px",
                      borderRadius: "8px", overflow: "hidden",
                      border: index === selectedImage
                        ? "2px solid #2563eb"
                        : "2px solid transparent",
                      padding: 0, cursor: "pointer", flexShrink: 0,
                    }}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${index + 1}`}
                      draggable={false}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </button>
                ))}
              </div>
            )}
          </SectionContainer>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            <SectionContainer>
              <span style={{
                display: "inline-block", fontSize: "11px", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.05em",
                color: "#2563eb", backgroundColor: "#eff6ff",
                padding: "3px 10px", borderRadius: "999px", marginBottom: "12px",
              }}>
                {product.category}
              </span>

              <h1 style={{ margin: "0 0 4px", fontSize: "26px", fontWeight: 700, color: "#111827" }}>
                {product.title}
              </h1>

              <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#6b7280" }}>
                <strong>{product.brand}</strong>
              </p>

              <StarRating rating={product.rating} />

              <p style={{ margin: "16px 0 8px", fontSize: "32px", fontWeight: 800, color: "#111827" }}>
                {product.price.toFixed(2)}€
              </p>

              <p style={{ margin: 0, fontSize: "13px", color: stockStatus.color, fontWeight: 600 }}>
                {stockStatus.text}
              </p>
            </SectionContainer>

            <SectionContainer>
              <h2 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                Descripción
              </h2>
              <p style={{ margin: 0, fontSize: "14px", color: "#4b5563", lineHeight: "1.7" }}>
                {product.description}
              </p>
            </SectionContainer>

            <SectionContainer>
              <h2 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                Especificaciones
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { label: "Peso", value: `${product.weight}` },
                  {
                    label: "Dimensiones",
                    value: product.dimensions
                      ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`
                      : "N/A"
                  },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    backgroundColor: "#f9fafb", borderRadius: "10px", padding: "12px 16px",
                  }}>
                    <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {label}
                    </p>
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </SectionContainer>

          </div>
        </div>
      </div>
    </main>
  );
}