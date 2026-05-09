import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/loader";

interface Provider {
  id: string;
  name: string;
  specialty: string;
  hospital_name: string;
  address?: string | null;
  city: string;
  state_code: string;
  zip_code?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  status?: string | null;
  created_at?: string | null;
}

const StateListing: React.FC = () => {
  const { stateName } = useParams(); // e.g. "TX" from /listing/TX
  const [providers, setProviders] = useState<Provider[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
 const [loading,setLoading]= useState(true)
  useEffect(() => {
    if (!stateName) return;
    axios
      .get(`https://iconrmc.co.in/mp/api/providers?state=${stateName}`)
      .then((res) => {
        if (res.data.status === "success") {
          setProviders(res.data.data); // ✅ API response
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching providers:", err);
        setLoading(false);
      });
  }, [stateName]);

  const filtered = providers.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty?.toLowerCase().includes(search.toLowerCase()) ||
      p.city?.toLowerCase().includes(search.toLowerCase()) ||
      p.hospital_name?.toLowerCase().includes(search.toLowerCase())
  );

  if(loading) {
    return <Loader/>
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Providers in {stateName}</h2>
      <input
        type="text"
        placeholder="Search by name, specialty, hospital, or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
      />
      <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Hospital</th>
            <th>City</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.specialty}</td>
              <td>{p.hospital_name}</td>
              <td>{p.city}</td>
              <td>{p.phone || "-"}</td>
              <td>{p.email || "-"}</td>
              <td>
                <button onClick={() => navigate(`/provider/${p.id}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StateListing;
