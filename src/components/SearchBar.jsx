function SearchBar({ value, onChange }) {
    return (
      <div className="mb-3 text-center">
        <input
          type="text"
          placeholder="Search plants..."
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ maxWidth: '400px', margin: '0 auto' }}
        />
      </div>
    );
  }
  
  export default SearchBar;
  