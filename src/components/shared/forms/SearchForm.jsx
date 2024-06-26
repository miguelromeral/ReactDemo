import React, { useEffect, useState, useCallback  } from 'react';

function SearchForm({ label, placeholder, onChange }) {

  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onChange(e.target.value);
  };

  return (
    <form>
      <div>
          <label htmlFor="iMovieQuery" className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
          <input type="text" id="iMovieQuery" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required
          value={query}
          onChange={handleInputChange} />
      </div>
    </form>
  );
}


export default SearchForm;