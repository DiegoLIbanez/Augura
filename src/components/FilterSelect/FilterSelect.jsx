export const FilterSelect = ({
  label,
  value,
  onChange,
  options,
  className,
}) => (
  <div className={className}>
    <label htmlFor={label.toLowerCase()} className="mr-2 font-medium">
      {label}:
    </label>
    <select
      id={label.toLowerCase()}
      value={value}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
