/* eslint-disable react/prop-types */
const Filter = ({ onFilterChange, filterValue }) => {
  return (
    <div>
      filter shown with
      <input
        value={filterValue}
        onChange={(event) => onFilterChange(event.target.value)}
      />
    </div>
  );
};

export default Filter;
