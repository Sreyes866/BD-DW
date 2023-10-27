//busqueda

import React, { useState } from "react";
import axios from "axios";

const CaseSensitiveSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost/getDepartmentsByManager.php?managerName=${query}`);
      const data = response.data;   //json

      if (isCaseSensitive) {
        const filteredData = data.filter((item) => {
          return item.manager_name && item.manager_name.includes(query);
        });
        setResults(filteredData);
      } else {
        setResults(data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
};

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Manager Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />


      <label>
        <input
         type="checkbox"
           checked={isCaseSensitive}
           onChange={(e) => setIsCaseSensitive(e.target.checked)}
         />
         Case Sensitive
       </label>


      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((result, index) => ( //recorrer 
          <li key={index}>{result.manager_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CaseSensitiveSearch;