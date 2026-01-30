import HealthFilter from "./health-filter";

export default function CharacterTable({
  data,
  selectedIds,
  onSelectionChange,
  sortPower,
  onSortPower,
  healthFilter,
  onHealthFilterChange
}) {
  const toggleRow = id => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    onSelectionChange(next);
  };

  return (
    <table style={{
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "300px",
    position: "relative"
  }}>
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Location</th>

          <th>
            Health{" "}
            <HealthFilter
              value={healthFilter}
              onChange={onHealthFilterChange}
            />
          </th>

          <th>
            Power{" "}
            <button
              aria-label="Sort by power"
              onClick={() =>
                onSortPower(sortPower === "asc" ? "desc" : "asc")
              }
            >
              {sortPower === "asc" ? "▲" : "▼"}
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map(c => (
          <tr key={c.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedIds.has(c.id)}
                onChange={() => toggleRow(c.id)}
              />
            </td>
            <td>{c.name}</td>
            <td>{c.location}</td>
            <td>{c.health}</td>
            <td>{c.power}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

