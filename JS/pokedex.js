const mainScreen = document.querySelector('.display-pokemon');
const statsScreen = document.getElementById('stats-info');
const attacksScreen = document.getElementById('attacks-book');
const pokeName = document.querySelector('.poke-name');
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
const pokeIdInput = document.getElementById('poke-id-input');
const pokeNameInput = document.getElementById('poke-name-input');
const autocompleteList = document.getElementById('autocomplete-list');
let allPokemonList = [];
let searchPokemon = 1;

async function loadPokemonList() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010');
    const data = await res.json();
    allPokemonList = data.results.map((poke, idx) => ({
        name: poke.name,
        id: idx + 1
    }));
}
loadPokemonList();

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
};

function showStats() {
    attacksScreen.classList.add("hide");
    attacksScreen.classList.remove("show");
    statsScreen.classList.remove("hide");
    statsScreen.classList.add("show");
}

function showSkills() {
    statsScreen.classList.add("hide");
    statsScreen.classList.remove("show");
    attacksScreen.classList.remove("hide");
    attacksScreen.classList.add("show");
}

const fetchPokemon = async (pokemon) => {
    const fetchResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!fetchResponse.ok) return null;
    const data = await fetchResponse.json();
    return data;
};

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
        pokeName.textContent = capitalize(data['name']);
        pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] || data['sprites']['front_default'];

        const formattedId = 'Nº ' + data['id'].toString().padStart(3, '0');
        pokeIdInput.value = formattedId;

        pokeHp.textContent = data['stats']['0']['base_stat'];
        pokeDefense.textContent = data['stats']['2']['base_stat'];
        pokeAttack.textContent = data['stats']['1']['base_stat'];
        pokeSpecialAttack.textContent = data['stats']['3']['base_stat'];
        statsScreen.classList.remove('hide');
        pokeSkillOne.textContent = data['moves']['0'] ? data['moves']['0']['move']['name'] : '-';
        pokeSkillTwo.textContent = data['moves']['1'] ? data['moves']['1']['move']['name'] : '-';
        pokeASkillThree.textContent = data['moves']['2'] ? data['moves']['2']['move']['name'] : '-';
        pokeSkillFour.textContent = data['moves']['3'] ? data['moves']['3']['move']['name'] : '-';
        attacksScreen.classList.add('hide');

        let pokeInList = allPokemonList.find(p => p.id === data.id);
        if (pokeInList) {
            pokeNameInput.value = `Nº ${pokeInList.id.toString().padStart(3, '0')} - ${capitalize(pokeInList.name)}`;
        }
    } else {
        pokeName.textContent = 'Não encontrado';
        pokeImage.src = '';
        pokeIdInput.value = 'Nº ---';
        pokeNameInput.value = '';
    }
};

pokeIdInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        let value = this.value.replace(/[^\d]/g, '');
        let num = parseInt(value);
        if (!isNaN(num) && num > 0) {
            searchPokemon = num;
            renderPokemon(searchPokemon);
            autocompleteList.innerHTML = '';
            pokeNameInput.value = '';
        } else {
            this.classList.add('erro-id');
            setTimeout(() => this.classList.remove('erro-id'), 600);
        }
    }
});

pokeIdInput.addEventListener('blur', function() {
    let value = this.value.replace(/[^\d]/g, '');
    let num = parseInt(value);
    if (!isNaN(num) && num > 0) {
        searchPokemon = num;
        renderPokemon(searchPokemon);
        autocompleteList.innerHTML = '';
        pokeNameInput.value = '';
    }
});

pokeNameInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    autocompleteList.innerHTML = '';
    if (!query) return;

    const filtered = allPokemonList
        .filter(p => p.name.includes(query))
        .slice(0, 5);

    filtered.forEach(p => {
        const paddedId = p.id.toString().padStart(3, '0');
        const item = document.createElement('li');
        item.textContent = `Nº ${paddedId} - ${capitalize(p.name)}`;
        item.tabIndex = 0;
        item.addEventListener('mousedown', function(e) {
            searchPokemon = p.id;
            renderPokemon(p.id);
            pokeNameInput.value = `Nº ${paddedId} - ${capitalize(p.name)}`;
            autocompleteList.innerHTML = '';
        });
        autocompleteList.appendChild(item);
    });
});

pokeNameInput.addEventListener('keydown', function(e) {
    const first = autocompleteList.querySelector('li');
    if (e.key === 'Enter' && first) {
        first.click();
    }
});

document.addEventListener('click', function(e) {
    if (!pokeNameInput.contains(e.target) && !autocompleteList.contains(e.target)) {
        autocompleteList.innerHTML = '';
    }
});

rightButton.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    pokeNameInput.value = '';
    autocompleteList.innerHTML = '';
});

leftButton.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
        pokeNameInput.value = '';
        autocompleteList.innerHTML = '';
    }
});

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

renderPokemon(searchPokemon);
