const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
let offset = 0;
const limit = 10;
let maxRecords = 151;

function convertPokemonToLi(pokemon){ 
    return `
            <li class="pokemon ${pokemon.type}" > 
                <span class="number">#${pokemon.number}</span> 
                <span class="name">${pokemon.name}</span> 

                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}    
                    </ol>   
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
    `
}

function loadMorePokemons(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    }).catch(error => {
        console.error('Erro ao buscar pokémons:', error);
        pokemonList.innerHTML = '<p>Erro ao carregar pokémons: ' + error.message + '</p>';
    })
}

loadMorePokemons(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordWithNextPage = offset + limit
    if(qtdRecordWithNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadMorePokemons(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadMorePokemons(offset, limit)
    }

})

