import { setPokemon, setImage } from "./pokedex.js";
import './charts.js'

const $form = document.querySelector("#form");
const $next = document.querySelector("#next-pokemon");
const $prev = document.querySelector("#prev-pokemon");
const $nextimage = document.querySelector("#next-image");
const $previmage = document.querySelector("#prev-image");
const $pokedex = document.querySelector("#pokedex");
const $valueInput = document.querySelector("#id-pokemon");
const $randomPokemon = document.querySelector("#pokemonRandom");
const $description = document.querySelector("#description");
let pokemonSelected = null;

$form.addEventListener("submit", handleSubmit);
$next.addEventListener("click", handleNextPokemon);
$prev.addEventListener("click", handlePrevPokemon);
$nextimage.addEventListener("click", handleNextImage);
$previmage.addEventListener("click", handlePrevImage);
$randomPokemon.addEventListener('click', pokemonRandom);



async function validatePokemon(id) {
  if (id == 0 || id >= 894 ) {
    $valueInput.value = "id Invalido";
    $description.textContent = "El id del pokemon no existe";
  } else {
    pokemonSelected = await setPokemon(id);
  }
}

async function handleSubmit(e){
   e.preventDefault();
   $pokedex.classList.add('is-open')
   const form = new FormData($form);
   const id = form.get("id");
   validatePokemon(id)
  //  console.log(id)
}



async function handleNextPokemon(){
  const id = (pokemonSelected === null || pokemonSelected.id === 893) ? 1  :pokemonSelected.id +1
  pokemonSelected = await setPokemon(id)
  $valueInput.value = id
}


async function handlePrevPokemon(){
  const id = (pokemonSelected === null || pokemonSelected.id === 1) ? 893 : pokemonSelected.id - 1;
  pokemonSelected = await setPokemon(id);
  $valueInput.value = id;
}


function getRandomId(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


async function pokemonRandom(){
   const idRandom = getRandomId(1,893) ;
   // console.log(idRandom)
   pokemonSelected = await setPokemon(idRandom);
   $valueInput.value = idRandom;
}


let activeSprite = 0;
function handleNextImage(){
  if(pokemonSelected === null)return false
  if(activeSprite >= pokemonSelected.sprites.length-1){
    activeSprite = 0
    return setImage(pokemonSelected.sprites[activeSprite]);
  }
  activeSprite++
  return setImage(pokemonSelected.sprites[activeSprite])

}

function handlePrevImage(){
  if (pokemonSelected === null) return false;
  if (activeSprite <=  0) {
    activeSprite = pokemonSelected.sprites.length -1
    return setImage(pokemonSelected.sprites[activeSprite]);
  }

  activeSprite--;
  return setImage(pokemonSelected.sprites[activeSprite]);

}
