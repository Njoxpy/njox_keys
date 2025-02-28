const Search = () => {
  return (
    <div className="space-y-3">
      {/* Title */}
      <h4 className="text-lg font-semibold">Manage Keys and Access</h4>

      {/* Search Form */}
      <form className="relative">
        <label htmlFor="search" className="sr-only">
          Search for Venue
        </label>
        <div className="input input-bordered flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-gray-500">
          <input
            type="text"
            id="search"
            className="w-full bg-transparent focus:outline-none"
            placeholder="Search for Venue"
            aria-label="Search for Venue"
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
