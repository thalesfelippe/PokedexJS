// DOM Objects
const mainScreen = document.querySelector('.display-pokemon');
const statsScreen = document.getElementById('stats-info');
const attacksScreen = document.getElementById('attacks-book');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeImage = document.querySelector('.poke-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeTypeBgOne = document.querySelector('.poke-type-one');
const pokeTypeBgTwo = document.querySelector('.poke-type-two');
const pokeHp = document.querySelector('.poke-hp');
const pokeDefense = document.querySelector('.poke-defense');
const pokeAttack = document.querySelector('.poke-attack');
const pokeSpecialAttack = document.querySelector('.poke-special-attack');
const pokeSkillOne = document.querySelector('.poke-skill-one');
const pokeSkillTwo = document.querySelector('.poke-skill-two');
const pokeASkillThree = document.querySelector('.poke-skill-three');
const pokeSkillFour = document.querySelector('.poke-skill-four');
const leftButton = document.querySelector('.control-left');
const rightButton = document.querySelector('.control-right');

console.log(leftButton);
console.log(rightButton);

// Const/Variables 
const TYPES = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass',
    'electric', 'dark', 'fairy',
    'dragon', 'psychic', 'ice'
];

// Functions
function showStats(){
    var element = document.getElementById("attacks-book");
    element.classList.add("hide");
    var element = document.getElementById("attacks-book");
    element.classList.remove("show");
    var element = document.getElementById("stats-info");
    element.classList.remove("hide");
    var element = document.getElementById("stats-info");
    element.classList.add("show");
}

function showSkills(){
    var element = document.getElementById("stats-info");
    element.classList.add("hide");
    var element = document.getElementById("stats-info");
    element.classList.remove("show");
    var element = document.getElementById("attacks-book");
    element.classList.remove("hide");
    var element = document.getElementById("attacks-book");
    element.classList.add("show");
}


function nextPoke() {

}

function prevPoke() {

}

// Pokemon Data
// const fetchPokeData = id => {
    fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then(res => res.json())
    .then(data => {
        console.log(data);

        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = dataFirstType['type']['name'];
        if (dataSecondType) {
            pokeTypeTwo.classList.remove('hide');
            pokeTypeTwo.textContent = dataSecondType['type']['name'];
            pokeTypeBgTwo.classList.add(dataSecondType['type']['name']);
        } else {
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = '';
        }
        pokeTypeBgOne.classList.add(dataFirstType['type']['name']);
        mainScreen.classList.remove('hide');
        pokeName.textContent = data['name'];
        pokeId.textContent = 'Nº ' + data['id'].toString().padStart(3, '0');
        pokeHp.textContent = data['stats']['0']['base_stat'];
        pokeDefense.textContent = data['stats']['2']['base_stat'];
        pokeAttack.textContent = data['stats']['1']['base_stat'];
        pokeSpecialAttack.textContent = data['stats']['3']['base_stat'];
        statsScreen.classList.remove('hide');
        pokeSkillOne.textContent = data['moves']['0']['move']['name'];
        pokeSkillTwo.textContent = data['moves']['1']['move']['name'];
        pokeASkillThree.textContent = data['moves']['2']['move']['name'];
        pokeSkillFour.textContent = data['moves']['3']['move']['name'];
        attacksScreen.classList.add('hide');
        pokeImage.src = data['sprites']['other']['dream_world']['front_default'] || data['sprites']['front_default'];
});
// }

// get data for pokemons
fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    .then(res => res.json())
    .then(data => {
        console.log(data);
    const { results } = data;
        console.log(results);
});