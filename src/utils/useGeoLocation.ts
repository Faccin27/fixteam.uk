import { useEffect, useState } from 'react';
import axios from 'axios';

interface GeoLocation {
  ip: string | null;
  country: string | null;
  loading: boolean;
  error: string | null;
}

const useGeoLocation = (): GeoLocation => {
  const [ip, setIp] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGeoLocation = async () => {
      try {
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const userIp = ipResponse.data.ip;
        setIp(userIp);

        const geoResponse = await axios.get(`https://api.ipstack.com/${userIp}?access_key=b13c8a904f9e5be1c980d8bb948217ba`);
        const countryname = geoResponse.data.country_name;
        setCountry(countryname)

      } catch (err: any) {
        setError(err.message || 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    getGeoLocation();
  }, []);

  return { ip, country, loading, error };
};

export default useGeoLocation;
