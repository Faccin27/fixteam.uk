import { useEffect, useState } from 'react';
import axios from 'axios';

interface GeoLocation {
  ip: string | null;
  country: string | null;
  error: string | null;
}

// Função que vai abrir o JSON com as traduções usando a pasta publica do projeto!
export async function openJSON(locale : string) : Promise<any> {

  let location : string = "";

  if (locale === "BR") location = "pt-br";
  else location = "en";

  const response = await fetch(`/locales/${location}.json`);
  return await response.json();

}

export async function geoModule() : Promise<GeoLocation> {

  try {

    // Obtendo apenas o IP do usuário
    const location = await axios.get("https://api.ipify.org?format=json");

    // Obtendo todos os dados geográficos do IP
    const geoLocation = await axios.get(`https://ipinfo.io/${location.data.ip}/json`);

    return {
      ip: geoLocation.data.ip,
      country: geoLocation.data.country,
      error: null
    }

  }
  catch (error) {

    return {
      ip: null,
      country: "EN",
      error: 'Não foi possível identificar seu endereço IP'
    }

  }

}