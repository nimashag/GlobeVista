import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import axios from "axios";
import { feature } from "topojson-client";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function InteractiveMap({ selectedCode }) {
  const [geographies, setGeographies] = useState([]);
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(1);
  const [countryName, setCountryName] = useState("");
  const [idToCca3, setIdToCca3] = useState({});

  useEffect(() => {
    const loadMap = async () => {
      try {
        const res = await axios.get(geoUrl);
        const countries = feature(res.data, res.data.objects.countries).features;
        setGeographies(countries);

        const restRes = await axios.get("https://restcountries.com/v3.1/all");
        const mapping = {};
        restRes.data.forEach((country) => {
          if (country.cca3 && country.ccn3) {
            const ccn3 = country.ccn3.padStart(3, "0");
            mapping[ccn3] = country.cca3;
          }
        });
        setIdToCca3(mapping);
      } catch (err) {
        console.error("Error loading map or country data", err);
      }
    };
    loadMap();
  }, []);

  useEffect(() => {
    const fetchCoords = async () => {
      if (!selectedCode) return;
      try {
        const res = await axios.get(`https://restcountries.com/v3.1/alpha/${selectedCode}`);
        const countryData = res.data[0];
        if (countryData.latlng) {
          setCenter([countryData.latlng[1], countryData.latlng[0]]);
          setZoom(3);
          setCountryName(countryData.name.common);
        }
      } catch (err) {
        console.error("Failed to fetch country coordinates", err);
      }
    };
    fetchCoords();
  }, [selectedCode]);

  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.5, 8));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 0.5, 1));
  };

  return (
    <div className="relative w-full h-[500px]">
      <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <ComposableMap
          projectionConfig={{ scale: 200 }}
          width={800}
          height={400}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup center={center} zoom={zoom}>
            {geographies.length > 0 && (
              <Geographies geography={{ type: "FeatureCollection", features: geographies }}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const rawId = geo.id;
                    if (!rawId) return null;
                    const geoId = rawId.toString().padStart(3, "0");
                    const isSelected = idToCca3[geoId] === selectedCode;
  
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill: isSelected ? "#FF5722" : "#CBD5E1", // slate-200
                            outline: "none",
                            cursor: "pointer",
                          },
                          hover: {
                            fill: isSelected ? "#FF784E" : "#38BDF8", // sky-400
                            outline: "none",
                          },
                          pressed: {
                            fill: "#0F172A", // slate-900
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            )}
          </ZoomableGroup>
        </ComposableMap>
      </div>
  
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <button
          onClick={handleZoomIn}
          className="bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          –
        </button>
      </div>
    </div>
  );
  
}

export default InteractiveMap;
