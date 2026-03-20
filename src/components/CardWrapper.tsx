// Wrapper específico para tarjetas individuales de producto.

"use client";

import React, { useState } from "react";

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div

      onMouseEnter={() => setIsHovered(true)}

      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        overflow: "hidden",         
        display: "flex",
        flexDirection: "column",    

        transition: "transform 0.25s ease, box-shadow 0.25s ease",

        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 8px 24px rgba(0,0,0,0.12)"
          : "0 1px 4px rgba(0,0,0,0.06)",
        cursor: "pointer",
      }}
    >

      {children}
    </div>
  );
};

export default CardWrapper;