// PÁGINA PRINCIPAL

"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import ProductGrid from "@/components/ProductGrid";
import SectionContainer from "@/components/SectionContainer";
import { Product, ProductsResponse } from "@/types/product";

export default function HomePage() {

  //ESTADOS

  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  // CARGA DE DATOS

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("https://dummyjson.com/products?limit=30");

        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}`);
        }

        const data: ProductsResponse = await response.json();
        setAllProducts(data.products);

      } catch (err) {
        setError(err instanceof Error ? err.message : "Error");
        console.error("Error", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // FILTRADO (VALOR DERIVADO

  const filteredProducts = allProducts.filter((product) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  // RENDER

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>

      <SectionContainer style={{
        borderRadius: 0,
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#111827" }}>
              Catálogo de Productos
            </h1>
          </div>

          <SearchBar
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
        </div>
      </SectionContainer>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 20px" }}>

        {isLoading && (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "96px 0", color: "#9ca3af",
          }}>
 
            <div style={{
              width: "48px", height: "48px", borderRadius: "50%",
              border: "4px solid #e5e7eb", borderTopColor: "#2563eb",
              animation: "spin 0.8s linear infinite", marginBottom: "16px",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: "14px", fontWeight: 500 }}>Cargando productos...</p>
          </div>
        )}

        {error && !isLoading && (
          <SectionContainer style={{ borderColor: "#fecaca", backgroundColor: "#fef2f2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#dc2626" }}>
              <div>
                <p style={{ margin: 0, fontWeight: 600 }}>Error al cargar los productos</p>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#ef4444" }}>{error}</p>
              </div>
            </div>
          </SectionContainer>
        )}

        {!isLoading && !error && (
          <>

            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px", flexWrap: "wrap", gap: "8px",
            }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                <strong style={{ color: "#111827" }}>{filteredProducts.length}</strong>
                {" "}{filteredProducts.length === 1 ? "producto" : "productos"}
                {searchQuery.trim() && (
                  <span>
                    {" "}encontrado{filteredProducts.length !== 1 ? "s" : ""} para{" "}
                    <strong style={{ color: "#2563eb" }}>"{searchQuery}"</strong>
                  </span>
                )}
              </p>

            </div>

            <ProductGrid products={filteredProducts} />
          </>
        )}
      </div>
    </main>
  );
}