import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useNavigate } from "react-router-dom";
import styles from "./USMap.module.css";
import { stateCoordinates } from "./mock";
import Loader from "../loader/loader";

interface ProviderCount {
  state_code: string;
  state_name: string;
  provider_count: string;
}

const colorScale = scaleLinear<string>()
  .domain([0, 1200])
  .range(["#e0f3f3", "#006d6d"]);

const geoUrl =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const USMap: React.FC = () => {
  const [providerCounts, setProviderCounts] = useState<Record<string, { code: string; count: number }>>({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get("https://iconrmc.co.in/mp/api/providers?type=state-count")
      .then((res) => {
        if (res.data.status === "success") {
          const counts: Record<string, { code: string; count: number }> = {};
          res.data.data.forEach((item: ProviderCount) => {
            counts[item.state_name] = {
              code: item.state_code,
              count: Number(item.provider_count),
            };
          });
          setProviderCounts(counts);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching provider counts:", err);
        setLoading(false);
      });
  }, []);

   if(loading) {
    return <Loader />
  }

  const handleClick = (stateName: string, stateCode: string, count: number) => {
    // Navigate to listing page with both stateName and stateCode
    navigate(`/listing/${stateCode}`, { state: { stateName, count } });
  };


  return (
    <div className={styles.mapcontainer}>
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1040 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name;
              const data = providerCounts[stateName];
              const count = data?.count || 0;
              const code = data?.code || "";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(count)}
                  stroke="none"
                  data-tooltip-id="map-tooltip"
                  data-tooltip-content={`${stateName} (${code}): ${count}`}
                  onClick={() => handleClick(stateName, code, count)} // ✅ pass stateCode
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#006d6d", cursor: "pointer", stroke: "none" },
                    pressed: { fill: "#f00", stroke: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Labels clickable too */}
        {Object.entries(providerCounts).map(([state, data]) => {
          const coords = stateCoordinates[state as keyof typeof stateCoordinates];
          const isActive = data.count > 0;
          if (!coords) return null;
          return (
            <Marker key={state} coordinates={coords as [number, number]}>
              <text
                fontSize={6}
                textAnchor="middle"
                 style={{
                  cursor: "pointer",
                  fill: isActive ? "#ff4d4d" : "black",   // ✅ red if count > 0
                  fontWeight: isActive ? "bold" : "normal" // ✅ bold if count > 0
                }}
                data-tooltip-id="map-tooltip"
                data-tooltip-content={`${state} (${data.code}): ${data.count}`}
                onClick={() => handleClick(state, data.code, data.count)} // ✅ pass stateCode
              >
                {state}: {data.count}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Tooltip renderer */}
      <Tooltip
        id="map-tooltip"
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px",
          backgroundColor: "#006d6d",
          color: "#fff",
          borderRadius: "4px",
        }}
      />
    </div>
  );
};

export default USMap;
