import { useEffect, useMemo, useState } from "react";

export const  useTable=()=>{
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [healthFilter, setHealthFilter] = useState([]);
  const [sortPower, setSortPower] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    fetch("http://localhost:3000/characters")
      .then(res => res.json())
      .then(d =>
        setData(d.map(c => ({ ...c, viewed: false })))
      )
      .finally(() => setLoading(false));
  }, []);

  const filteredData = useMemo(() => {
    let result = [...data];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      );
    }

    if (healthFilter.length) {
      result = result.filter(c => healthFilter.includes(c.health));
    }

    if (sortPower) {
      result.sort((a, b) =>
        sortPower === "asc" ? a.power - b.power : b.power - a.power
      );
    }

    return result;
  }, [data, search, healthFilter, sortPower]);

 

//   if (loading) {
//     return <p role="status">Loading table…</p>;
//   }
    const handleSubmit = () => {
    console.log("Submitted IDs:", [...selectedIds]);
    
  };
  return {search,
    setSearch,
    handleSubmit,
    sortPower,
    selectedIds,
    filteredData,
    setHealthFilter,
    healthFilter,
    setSelectedIds,
    setSortPower,loading}
}