import React, { useState, ChangeEvent } from "react";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return; // Do not search for empty input

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.alpaca.markets/search?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Failed to fetch search results.");
      }
      const data = await response.json();
      setResults(data.results || []); // Adjust based on API response format
    } catch (err: any) {
      setError(err.message || "An error occurred while searching.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "10px", maxWidth: "600px", margin: "auto" }}>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
          style={{
            width: "80%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 12px",
            marginLeft: "5px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {results.length > 0 && (
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result.name || result.title}</li> // Adjust to match API data
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
