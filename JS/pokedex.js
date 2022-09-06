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
const soundtrack = document.getElementById('soundtrack');

const reloadPage = () => {
    window.location.reload();
    soundtrack.currentTime = 0;
}

let searchPokemon = 1;

const TYPES = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass',
    'electric', 'dark', 'fairy',
    'dragon', 'psychic', 'ice'
];

const resetScreen = () => {
    for (const type of TYPES) {
        pokeTypeBgOne.classList.remove(type);
        pokeTypeBgTwo.classList.remove(type);
    }
}

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

const fetchPokemon = async (pokemon) => {

    const fetchResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await fetchResponse.json();
    return data;
}

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    if (data) {

        resetScreen();

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
        pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] || data['sprites']['front_default'];
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
    }
}

rightButton.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

leftButton.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);