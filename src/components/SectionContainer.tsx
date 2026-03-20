//Contenedor padre genérico que aplica estilo a cualquir bloque que se le pase como children

import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  style = {},
}) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        padding: "24px",
        border: "1px solid #f0f0f0",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default SectionContainer;