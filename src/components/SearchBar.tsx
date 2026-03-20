
"use client";

import React from "react";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchQuery,
  searchQuery,
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); 
  };

  return (

    <div style={{ position: "relative", width: "100%", maxWidth: "480px" }}>

      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Buscar productos..."
        aria-label="Buscar productos"
        style={{
          width: "100%",
          padding: "12px 16px 12px",
          borderRadius: "12px",
          border: "1px solid #d1d5db",
          backgroundColor: "#f9fafb",
          fontSize: "14px",
          color: "#1f2937",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

export default SearchBar;