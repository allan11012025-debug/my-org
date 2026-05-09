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

const ProviderDetail: React.FC = () => {
  const { id } = useParams(); // e.g. "3" from /provider/3
  const navigate = useNavigate();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://iconrmc.co.in/mp/api/providers?id=${id}`)
      .then((res) => {
        if (res.data.status === "success" && res.data.data) {
          setProvider(res.data.data); // ✅ response is a single object
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching provider:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader/>;
  if (!provider) return <p>Provider not found</p>;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "700px",
        margin: "auto",
        background: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Provider Details</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr><td><strong>ID:</strong></td><td>{provider.id}</td></tr>
          <tr><td><strong>Name:</strong></td><td>{provider.name}</td></tr>
          <tr><td><strong>Specialty:</strong></td><td>{provider.specialty}</td></tr>
          <tr><td><strong>Hospital:</strong></td><td>{provider.hospital_name}</td></tr>
          <tr><td><strong>Address:</strong></td><td>{provider.address || "-"}</td></tr>
          <tr><td><strong>City:</strong></td><td>{provider.city}</td></tr>
          <tr><td><strong>State:</strong></td><td>{provider.state_code}</td></tr>
          <tr><td><strong>Zip Code:</strong></td><td>{provider.zip_code || "-"}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>{provider.phone || "-"}</td></tr>
          <tr><td><strong>Email:</strong></td><td>{provider.email || "-"}</td></tr>
          <tr><td><strong>Website:</strong></td><td>{provider.website || "-"}</td></tr>
          <tr><td><strong>Latitude:</strong></td><td>{provider.latitude || "-"}</td></tr>
          <tr><td><strong>Longitude:</strong></td><td>{provider.longitude || "-"}</td></tr>
          <tr><td><strong>Status:</strong></td><td>{provider.status || "-"}</td></tr>
          <tr><td><strong>Created At:</strong></td><td>{provider.created_at || "-"}</td></tr>
        </tbody>
      </table>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          background: "#006d6d",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back to Listing
      </button>
    </div>
  );
};

export default ProviderDetail;
