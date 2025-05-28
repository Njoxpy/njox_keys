import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ search, setSearch }) => (
  <div className="relative w-full max-w-md mx-auto">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search for Venue"
      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white text-slate-800 shadow focus:outline-none focus:ring-2 focus:ring-blue-100"
    />
    <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
  </div>
);

export default SearchBar;
