import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        onSearch(query);
    };
    return (_jsx("div", { className: "mb-4", children: _jsx("input", { type: "text", placeholder: "Search contacts...", value: searchQuery, onChange: handleSearchChange, className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" }) }));
};
export default SearchBar;
