import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCountryByCode } from "../services/countriesApi";
import InteractiveMap from "../components/InteractiveMap";

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const loadCountry = async () => {
      try {
        const response = await fetchCountryByCode(code);
        const data = response.data[0];
        setCountry(data);

        // Fetch border countries if any
        if (data.borders && data.borders.length > 0) {
          const borderPromises = data.borders.map((borderCode) =>
            fetchCountryByCode(borderCode)
          );
          const borderResponses = await Promise.all(borderPromises);
          const borderNames = borderResponses.map((res) => ({
            name: res.data[0].name.common,
            code: res.data[0].cca3,
          }));
          setBorderCountries(borderNames);
        } else {
          setBorderCountries([]);
        }
      } catch (error) {
        console.error("Failed to fetch country details", error);
      } finally {
        setLoading(false);
      }
    };

    loadCountry();
  }, [code]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading country details...
      </p>
    );
  if (!country)
    return <p className="text-center text-red-500 mt-10">Country not found</p>;

  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    area,
    languages,
    timezones,
    currencies,
    maps,
  } = country;

  const nativeName = name.nativeName
    ? Object.values(name.nativeName)[0]?.common
    : name.common;

  const currencyList = currencies
    ? Object.values(currencies)
        .map((curr) => `${curr.name} (${curr.symbol})`)
        .join(", ")
    : "N/A";

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto text-gray-800 dark:text-gray-200">
      <Link
        to="/countries"
        className="inline-block mb-8 text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← Back to Home
      </Link>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          <img
            src={flags.svg}
            alt={name.common}
            className="w-full h-auto object-contain rounded-xl border"
          />
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold">{name.common}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 italic">
              Native Name:{" "}
              <span className="text-black dark:text-white">{nativeName}</span>
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 italic">
              Official Name:{" "}
              <span className="text-black dark:text-white">
                {name.official}
              </span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-base leading-relaxed pt-8">
              <p>
                <span className="text-lg font-semibold">Capital:</span>{" "}
                {capital?.[0] || "N/A"}
              </p>
              <p>
                <span className="text-lg font-semibold">Region:</span> {region}
              </p>
              <p>
                <span className="text-lg font-semibold">Subregion:</span>{" "}
                {subregion}
              </p>
              <p>
                <span className="text-lg font-semibold">Population:</span>{" "}
                {population.toLocaleString()}
              </p>
              <p>
                <span className="text-lg font-semibold">Area:</span>{" "}
                {area.toLocaleString()} km²
              </p>
              <p>
                <span className="text-lg font-semibold">Timezones:</span>{" "}
                {timezones.join(", ")}
              </p>
              <p>
                <span className="text-lg font-semibold">Languages:</span>{" "}
                {Object.values(languages || {}).join(", ")}
              </p>
              <p>
                <span className="text-lg font-semibold">Currencies:</span>{" "}
                {currencyList}
              </p>
            </div>

            {/* Border Countries */}
            {borderCountries.length > 0 && (
              <div className="pt-4">
                <h2 className="text-lg font-semibold mb-2">
                  Border Countries:
                </h2>
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map((border) => (
                    <Link
                      to={`/country/${border.code}`}
                      key={border.code}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                    >
                      {border.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href={`https://en.wikipedia.org/wiki/${name.common}`}
                target="_blank"
                rel="noopener noreferrer"
                className=" text-white text-center bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 px-3 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition duration-300"
              >
                🌐 Learn History on Wikipedia
              </a>

              <button
                onClick={() => setShowMap(true)}
                className="text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition"
              >
                🗺️ Explore on the Map
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Map */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              👉 Explore {name.common} on the Map......
              </h2>
              <button
                onClick={() => setShowMap(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[80vh]">
              <InteractiveMap selectedCode={code} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryDetails;
