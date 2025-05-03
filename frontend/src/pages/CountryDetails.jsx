import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCountryByCode } from '../services/countriesApi';

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountry = async () => {
      try {
        const response = await fetchCountryByCode(code);
        setCountry(response.data[0]);
      } catch (error) {
        console.error('Failed to fetch country details', error);
      } finally {
        setLoading(false);
      }
    };
    loadCountry();
  }, [code]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading country details...</p>;
  if (!country) return <p className="text-center text-red-500 mt-10">Country not found</p>;

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
        .join(', ')
    : 'N/A';

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto text-gray-800 dark:text-gray-200">
      <Link
        to="/"
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
          <h1 className="text-5xl font-extrabold">{name.common}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 italic">
            Native Name: <span className="text-black dark:text-white">{nativeName}</span>
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-400 italic">
          Official Name: <span className="text-black dark:text-white">{name.official}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-base leading-relaxed">
            {/* <p><span className="text-lg font-semibold">Official Name:</span> {name.official}</p> */}
            <p><span className="text-lg font-semibold">Capital:</span> {capital?.[0] || 'N/A'}</p>
            <p><span className="text-lg font-semibold">Region:</span> {region}</p>
            <p><span className="text-lg font-semibold">Subregion:</span> {subregion}</p>
            <p><span className="text-lg font-semibold">Population:</span> {population.toLocaleString()}</p>
            <p><span className="text-lg font-semibold">Area:</span> {area.toLocaleString()} km²</p>
            <p><span className="text-lg font-semibold">Timezones:</span> {timezones.join(', ')}</p>
            <p><span className="text-lg font-semibold">Languages:</span> {Object.values(languages || {}).join(', ')}</p>
            <p><span className="text-lg font-semibold">Currencies:</span> {currencyList}</p>
          </div>

          <div className="pt-4">
          <a
  href={`https://en.wikipedia.org/wiki/${name.common}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 px-6 py-3 rounded-xl text-base font-medium shadow-md hover:shadow-lg transition duration-300"
>
              Learn History on Wikipedia →
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default CountryDetails;
