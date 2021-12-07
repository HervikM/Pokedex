import { getPokemon, getEspecies } from "./api.js";
import { createChart } from "./charts.js";

const $image = document.querySelector("#image-pokemon");
export function setImage(image){
   $image.src = image
}

const $description = document.querySelector("#description");
function setDescription (text){
    $description.textContent = text;
}

const $screen = document.querySelector("#screen");
function loader(isLoading = false){
   const img = isLoading ? 'url(./images/loading.gif)' :''
   $screen.style.backgroundImage = img

}

// VOZ
const $light = document.querySelector("#lightVoice");
function speech(text){
   const utterance = new SpeechSynthesisUtterance(text);
   utterance.lang = 'es'
   speechSynthesis.speak(utterance);
   $light.classList.add('is-animated')


   utterance.addEventListener('end', ()=>{
      $light.classList.remove('is-animated')
   })

}



export async function findPokemon(id) {
  const pokemon = await getPokemon(id);
  const especie = await getEspecies(id);
  const descriptionText = especie.flavor_text_entries.find((flavor) => flavor.language.name === "es");
  const sprites =  [pokemon.sprites.front_default]


   const stats = pokemon.stats.map(item => item.base_stat)

   for ( const item  in pokemon.sprites){
      if (item !== 'front_default' && item !== 'other' && item !== 'versions' && pokemon.sprites[item]) {
        sprites.push(pokemon.sprites[item]);
      }
   }
   // console.log(sprites);

  return {
     sprites,
     description: descriptionText.flavor_text,
     id: pokemon.id,
     name:pokemon.name,
     stats,
  }
}

let activeChart = null
export async function setPokemon (id){
   // Activar Loader
   loader(true)
   const pokemon = await findPokemon(id)
   // Desactivar Loader
   loader(false)

   setImage(pokemon.sprites[0]);
   setDescription(pokemon.description);
   speech(`${pokemon.name}. ${pokemon.description}`)
   if(activeChart instanceof Chart){
      activeChart.destroy()
   }
   activeChart = createChart(pokemon.stats)
   return pokemon
}

// export async function validatePokemon(id) {
//   if (id == 0 || id >= 894) {
//     $valueInput.value = "id Invalido";
//     $description.textContent = "El id del pokemon no existe";
//     $screen.style.backgroundImage = img;
//   } else {
//     pokemonSelected = await setPokemon(id);
//   }
// }