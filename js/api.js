const BASE_API = "https://pokeapi.co/api/v2/";

export async function getPokemon(id){
  const response = await fetch(`${BASE_API}pokemon/${id}/`)
  const data = await response.json()
   //Validar Errores
  return data
}

export async function getEspecies(id){
  const response = await fetch(`${BASE_API}pokemon-species/${id}/`)
  const data = await response.json()
   //Validar Errores
  return data
}