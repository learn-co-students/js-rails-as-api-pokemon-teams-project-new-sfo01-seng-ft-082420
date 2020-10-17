const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main');

document.addEventListener('DOMContentLoaded', () => {
    getTrainers(TRAINERS_URL);
});

const getTrainers = (url) => {
    fetch(url).then(res => res.json()).then(trainers => {
        trainers.forEach(trainer => buildCard(trainer))
    });
};

const buildCard = (trainer) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.dataset.id = trainer.id
    const p = document.createElement('p');
    p.textContent = trainer.name
    const addButton = document.createElement('button');
    addButton.dataset.trainerId = trainer.id
    addButton.textContent = 'Add Pokemon';
    addButton.addEventListener('click', e => addBtnClick(e, ul));
    const ul = document.createElement('ul');
    trainer.pokemons.forEach(pokemon => addPokemon(pokemon, ul));
    div.append(p, addButton, ul)
    main.append(div)
};

const addBtnClick = (e, ul) => {
    if (e.target.parentElement.querySelectorAll('li').length < 7) {
        fetch(POKEMONS_URL, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: e.target.dataset.trainerId
            })
        }).then(r => r.json()).then(resp => {
            addPokemon(resp.newPoke, ul);
        });
    } else {
        alert('Pokemon Full!');
    };
};

const addPokemon = (pokemon, ul) => {
    const li = document.createElement('li');
    li.textContent = `${pokemon.nickname} (${pokemon.species})`;
    releaseBtn = document.createElement('button');
    releaseBtn.className = 'release';
    releaseBtn.dataset.pokemonId = pokemon.id;
    releaseBtn.textContent = 'Release'
    releaseBtn.addEventListener('click', e => releaseBtnClk(e, ul))
    li.append(releaseBtn);
    ul.append(li);
};

const releaseBtnClk = (e, ul) => {
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, {
        method: 'DELETE', headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json()).then(resp => removePokemon(resp, ul));
};

const removePokemon = (r, ul) => {
    ul.querySelector(`[data-pokemon-id="${r.id}"]`).parentElement.remove();
}