// Função para voltar à página anterior
function goBack() {
    window.history.back();
}

// Função para abrir detalhes do Pokémon
function openPokemonDetail(pokemonNumber) {
    window.location.href = `poke-details.html?id=${pokemonNumber}`;
}

// Função para obter parâmetros da URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Função para alternar entre abas
function showTab(tabName) {
    // Esconder todas as abas
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Remover classe active de todos os botões
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Mostrar aba selecionada
    document.getElementById(tabName).classList.add('active');
    
    // Adicionar classe active ao botão clicado
    event.target.classList.add('active');
}

// Função para carregar detalhes do Pokémon
function loadPokemonDetails() {
    const pokemonId = getUrlParameter('id');
    
    if (!pokemonId) {
        alert('Pokémon não encontrado!');
        goBack();
        return;
    }
    
    // Buscar detalhes do Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then(pokemonData => {
            // APLICAR A COR DE FUNDO EM TODA A PÁGINA BASEADA NO TIPO DO POKÉMON
            const primaryType = pokemonData.types[0].type.name;
            document.body.classList.add(primaryType);
            
            // Preencher informações do pokémon
            document.getElementById('pokemonName').textContent = pokemonData.name;
            document.getElementById('pokemonNumber').textContent = `#${pokemonId.toString().padStart(3, '0')}`;
            document.getElementById('pokemonNameDefense').textContent = pokemonData.name;
            
            // Preencher tipos
            const typesContainer = document.getElementById('pokemonTypes');
            typesContainer.innerHTML = pokemonData.types.map(type => 
                `<li class="type ${type.type.name}">${type.type.name}</li>`
            ).join('');
            
            // Carregar imagem do pokémon
            const pokemonImage = document.getElementById('pokemonImage');
            pokemonImage.src = pokemonData.sprites.other.dream_world.front_default || 
                               pokemonData.sprites.other['official-artwork'].front_default ||
                               pokemonData.sprites.front_default;
            pokemonImage.alt = pokemonData.name;
            
            // Preencher informações da aba About
            fillAboutTab(pokemonData);
            
            // Preencher estatísticas da aba Base Stats
            fillStatsTab(pokemonData);
            
            // Buscar e preencher evolução
            loadEvolutionChain(pokemonData.species.url);
            
            // Preencher movimentos
            fillMovesTab(pokemonData);
        })
        .catch(error => {
            console.error('Erro ao buscar detalhes:', error);
            alert('Erro ao carregar detalhes do Pokémon');
            goBack();
        });
}

// Função para preencher aba About
function fillAboutTab(pokemonData) {
    // Informações gerais
    document.getElementById('species').textContent = pokemonData.species.name || '-';
    
    // Converter altura de decímetros para pés e polegadas
    const heightInCm = pokemonData.height * 10;
    const heightInFeet = (heightInCm / 30.48).toFixed(1);
    document.getElementById('height').textContent = `${heightInFeet}' (${heightInCm} cm)`;
    
    // Converter peso de hectogramas para libras e kg
    const weightInKg = pokemonData.weight / 10;
    const weightInLbs = (weightInKg * 2.20462).toFixed(1);
    document.getElementById('weight').textContent = `${weightInLbs} lbs (${weightInKg} kg)`;
    
    // Habilidades
    const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
    document.getElementById('abilities').textContent = abilities;
    
    // Informações de reprodução (valores padrão)
    document.getElementById('gender').textContent = '♂ 87.5%, ♀ 12.5%';
    document.getElementById('eggGroups').textContent = 'Monster';
    document.getElementById('eggCycle').textContent = 'Grass';
}

// Função para preencher aba Base Stats
function fillStatsTab(pokemonData) {
    const stats = pokemonData.stats;
    let total = 0;
    
    // Mapear estatísticas
    const statMapping = {
        'hp': 'hp',
        'attack': 'attack', 
        'defense': 'defense',
        'special-attack': 'spatk',
        'special-defense': 'spdef',
        'speed': 'speed'
    };
    
    stats.forEach(stat => {
        const statName = statMapping[stat.stat.name];
        if (statName) {
            const value = stat.base_stat;
            total += value;
            
            // Atualizar valor
            document.getElementById(`${statName}-value`).textContent = value;
            
            // Atualizar barra (máximo é 255)
            const percentage = (value / 255) * 100;
            const bar = document.getElementById(`${statName}-bar`);
            bar.style.width = `${percentage}%`;
        }
    });
    
    // Atualizar total
    document.getElementById('total-value').textContent = total;
    const totalPercentage = (total / (255 * 6)) * 100;
    document.getElementById('total-bar').style.width = `${totalPercentage}%`;
}

// Função para carregar cadeia evolutiva
function loadEvolutionChain(speciesUrl) {
    fetch(speciesUrl)
        .then(response => response.json())
        .then(speciesData => {
            const evolutionChainUrl = speciesData.evolution_chain.url;
            return fetch(evolutionChainUrl);
        })
        .then(response => response.json())
        .then(evolutionData => {
            fillEvolutionTab(evolutionData);
        })
        .catch(error => {
            console.error('Erro ao carregar evolução:', error);
            document.querySelector('.evolution-chain').innerHTML = '<p>Erro ao carregar cadeia evolutiva.</p>';
        });
}

// Função para preencher aba Evolution
function fillEvolutionTab(evolutionData) {
    const evolutionContainer = document.querySelector('.evolution-chain');
    const chain = evolutionData.chain;
    
    let evolutionHTML = '<div class="evolution-steps">';
    
    // Primeira evolução (base)
    evolutionHTML += createEvolutionStep(chain.species.name, chain.species.url);
    
    // Evoluções subsequentes
    if (chain.evolves_to.length > 0) {
        evolutionHTML += '<div class="evolution-arrow">→</div>';
        evolutionHTML += createEvolutionStep(chain.evolves_to[0].species.name, chain.evolves_to[0].species.url);
        
        // Terceira evolução (se existir)
        if (chain.evolves_to[0].evolves_to.length > 0) {
            evolutionHTML += '<div class="evolution-arrow">→</div>';
            evolutionHTML += createEvolutionStep(chain.evolves_to[0].evolves_to[0].species.name, chain.evolves_to[0].evolves_to[0].species.url);
        }
    }
    
    evolutionHTML += '</div>';
    evolutionContainer.innerHTML = evolutionHTML;
}

// Função para criar um passo da evolução
function createEvolutionStep(speciesName, speciesUrl) {
    const pokemonId = speciesUrl.split('/').slice(-2)[0];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    
    return `
        <div class="evolution-pokemon" onclick="openPokemonDetail(${pokemonId})" style="cursor: pointer;">
            <img src="${imageUrl}" alt="${speciesName}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png'">
            <span class="evolution-name">${speciesName.charAt(0).toUpperCase() + speciesName.slice(1)}</span>
        </div>
    `;
}

// Função para preencher aba Moves
function fillMovesTab(pokemonData) {
    const movesContainer = document.querySelector('.moves-list');
    const moves = pokemonData.moves;
    
    // Agrupar movimentos por tipo (level-up, machine, etc.)
    const movesByType = {
        'level-up': [],
        'machine': [],
        'egg': [],
        'tutor': []
    };
    
    moves.forEach(move => {
        move.version_group_details.forEach(detail => {
            if (detail.version_group.name === 'red-blue') {
                const moveType = detail.move_learn_method.name;
                if (movesByType[moveType]) {
                    movesByType[moveType].push({
                        name: move.move.name,
                        level: detail.level_learned_at
                    });
                }
            }
        });
    });
    
    let movesHTML = '<div class="moves-sections">';
    
    // Movimentos aprendidos por level
    if (movesByType['level-up'].length > 0) {
        movesHTML += '<div class="moves-section">';
        movesHTML += '<h4>Level Up Moves</h4>';
        movesHTML += '<div class="moves-grid">';
        movesByType['level-up'].forEach(move => {
            movesHTML += `<div class="move-item">${move.name.charAt(0).toUpperCase() + move.name.slice(1).replace('-', ' ')}</div>`;
        });
        movesHTML += '</div></div>';
    }
    
    // Movimentos de máquina (TMs/HMs)
    if (movesByType['machine'].length > 0) {
        movesHTML += '<div class="moves-section">';
        movesHTML += '<h4>TM/HM Moves</h4>';
        movesHTML += '<div class="moves-grid">';
        movesByType['machine'].forEach(move => {
            movesHTML += `<div class="move-item">${move.name.charAt(0).toUpperCase() + move.name.slice(1).replace('-', ' ')}</div>`;
        });
        movesHTML += '</div></div>';
    }
    
    movesHTML += '</div>';
    movesContainer.innerHTML = movesHTML;
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    loadPokemonDetails();
});

