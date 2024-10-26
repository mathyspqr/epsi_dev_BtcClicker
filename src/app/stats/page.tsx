"use client";

import { useEffect, useState } from 'react';
import { Navbar } from '../component/Navbar';

// Définition de l'interface pour les prix des cryptomonnaies
interface CryptoPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  logo: string; // Ajout de l'attribut pour le logo
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      market_cap: number;
      last_updated: string;
    };
  };
}

const CryptoPrices = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ average: 0, min: 0, max: 0 });

  // Fonction pour récupérer les prix
  const fetchPrices = async () => {
    try {
      const response = await fetch('/api/coinmarketcap');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
      const pricesData: CryptoPrice[] = data.data || [];
      console.log('ok', data)

      // Trier les prix par prix croissant
      const sortedPrices = pricesData.sort((a, b) => a.quote.USD.price - b.quote.USD.price);
      setPrices(sortedPrices);

      // Calcul des statistiques
      const pricesArray = sortedPrices.map(item => item.quote.USD.price);
      const average = pricesArray.reduce((sum, price) => sum + price, 0) / pricesArray.length || 0;
      const min = Math.min(...pricesArray) || 0;
      const max = Math.max(...pricesArray) || 0;

      setStats({ average, min, max });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur inconnue est survenue');
      }
    }
  };

  useEffect(() => {
    fetchPrices(); // Appel initial pour charger les données

    // Met à jour les données toutes les 10 minutes (600000 ms)
    const intervalId = setInterval(fetchPrices, 600000);

    return () => clearInterval(intervalId); // Nettoyage de l'intervalle au démontage
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
    <Navbar />
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Prix des Cryptomonnaies</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Statistiques</h2>
          <p className="text-gray-700">Prix moyen: <span className="font-bold">${stats.average.toFixed(2)}</span></p>
          <p className="text-gray-700">Prix minimum: <span className="font-bold">${stats.min.toFixed(2)}</span></p>
          <p className="text-gray-700">Prix maximum: <span className="font-bold">${stats.max.toFixed(2)}</span></p>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Logo</th>
              <th className="py-3 px-6 text-left">Nom</th>
              <th className="py-3 px-6 text-left">Symbole</th>
              <th className="py-3 px-6 text-left">Prix</th>
              <th className="py-3 px-6 text-left">Volume 24h</th>
              <th className="py-3 px-6 text-left">Changement 24h</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {prices.map((crypto) => (
              <tr key={crypto.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  <img src={crypto.logo} alt={crypto.name} className="w-8 h-8 rounded-full" />
                </td>
                <td className="py-3 px-6 text-left">{crypto.name}</td>
                <td className="py-3 px-6 text-left">{crypto.symbol}</td>
                <td className="py-3 px-6 text-left">${crypto.quote.USD.price.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">${crypto.quote.USD.volume_24h.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">{crypto.quote.USD.percent_change_24h}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default CryptoPrices;
