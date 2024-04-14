
function getPokemonsByType(typeName) {
    const pokemonsByType = [];

    if (!typeName) {
        console.error("Type name is required.");
        return pokemonsByType;
    }

    for (let pokemonId in all_pokemons.all_pokemons) {
        const pokemon = all_pokemons.all_pokemons[pokemonId];
        if (pokemon.getTypes().some(type => type.name === typeName)) {
            pokemonsByType.push(pokemon);
        }
    }
    return pokemonsByType;
}

function getAttacksByType(typeName) {
    const attacksByType = [];

    if (!typeName) {
        console.error("Type name is required.");
        return attacksByType;
    }

    for (let moveId in all_pokemons.all_attacks) {
        const attack = all_pokemons.all_attacks[moveId];
        if (attack.type === typeName) {
            attacksByType.push(attack);
        }
    }
    return attacksByType;
}


function getPokemonsByAttack(attackName) {
    const pokemonsByAttack = [];

    if (!attackName) {
        console.error("Attack name is required.");
        return pokemonsByAttack;
    }

    for (const pokemonId in all_pokemons.all_pokemons) {
        const pokemon = all_pokemons.all_pokemons[pokemonId];
        if (pokemon.charged_moves.some(attack => attack.name === attackName) || 
            pokemon.fast_moves.some(attack => attack.name === attackName)) {
            pokemonsByAttack.push(pokemon);
        }
    }
    return pokemonsByAttack;
}

function sortPokemonByName() {
    const pokemons = Object.values(all_pokemons.all_pokemons);
    
    return pokemons.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
}

function sortPokemonByStamina() {
    const allPokemons = Object.values(all_pokemons.all_pokemons);
    return allPokemons.sort((a, b) => b.stamina - a.stamina);
}

function getWeakestEnemies(attackName, limit = 5) {
    const weakestEnemies = [];

    const attack = Object.values(all_pokemons.all_attacks).find(attack => attack.name === attackName);
    if (!attack) {
        console.log(`attack with name ${attackName} not found.`);
        return [];
    }

    const sortedPokemons = Object.values(all_pokemons.all_pokemons).sort((a, b) => {
        const aEffectiveness = getAttackEffectivenessForPokemon(attack, a);
        const bEffectiveness = getAttackEffectivenessForPokemon(attack, b);
        return aEffectiveness - bEffectiveness;
    });

    for (const pokemon of sortedPokemons) {
        if (weakestEnemies.length >= limit) {
            break;
        }

        weakestEnemies.push(pokemon);
    }

    return weakestEnemies;
}

function getAttackEffectivenessForPokemon(attack, pokemon) {
    let effectiveness = 0;

    for (const type of pokemon.types) {
        if (attack.typeEffectiveness[type.name]) {
            effectiveness += attack.typeEffectiveness[type.name];
        }
    }

    return effectiveness;
}



function getBestAttackTypesForEnemy(name) {
    const pokemon = Object.values(all_pokemons.all_pokemons).find(pokemon => pokemon.name === name);
    if (!pokemon) {
      console.log(`Pokemon with name ${name} not found.`);
      return [];
    }
  
    const types = pokemon.getTypes();
    const bestAttackTypes = [];

    let maxEff = Infinity;
    
    for (const attackType in all_pokemons.all_types) {
      let effectiveness = 1; 
  
      for (const type of types) {
        if (type.attackEffectiveness[attackType]) {
          effectiveness *= type.attackEffectiveness[attackType];
        }
      }

  
      if (maxEff > effectiveness) {
        maxEff = effectiveness;
        bestAttackTypes.length = 0; 
        bestAttackTypes.push(attackType);
      } else if (maxEff === effectiveness) {
        bestAttackTypes.push(attackType);
      }
    }
  
    return bestAttackTypes;
  }