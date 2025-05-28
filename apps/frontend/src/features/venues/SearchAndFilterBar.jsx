// src/components/SearchAndFilterBar.jsx

const SearchAndFilterBar = ({
  search,
  setSearch,
  blockFilter,
  setBlockFilter,
  capacityFilter,
  setCapacityFilter,
  sortOrder,
  setSortOrder,
  blocks
}) => {
  return (
    <div className="bg-slate-800 text-white p-4 rounded-xl mb-6 flex flex-wrap gap-4 justify-between">
      <input
        type="text"
        placeholder="Search by venue name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 rounded-lg text-slate-800"
      />

      <select
        value={blockFilter}
        onChange={(e) => setBlockFilter(e.target.value)}
        className="px-4 py-2 rounded-lg text-slate-800"
      >
        <option value="">All Blocks</option>
        {blocks.map((block) => (
          <option key={block} value={block}>{block}</option>
        ))}
      </select>

      <select
        value={capacityFilter}
        onChange={(e) => setCapacityFilter(Number(e.target.value))}
        className="px-4 py-2 rounded-lg text-slate-800"
      >
        <option value={0}>All Capacities</option>
        <option value={50}>50+</option>
        <option value={100}>100+</option>
        <option value={200}>200+</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="px-4 py-2 rounded-lg text-slate-800"
      >
        <option value="asc">Sort: A-Z</option>
        <option value="desc">Sort: Z-A</option>
      </select>
    </div>
  );
};

export default SearchAndFilterBar;
