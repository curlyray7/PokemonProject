// Récupère tous les Pokémon d'un type spécifique
function getPokemonsByType(typeName) {
    const pokemonsByType = [];

    // Vérifie si le nom du type est fourni
    if (!typeName) {
        console.error("Type name is required.");
        return pokemonsByType;
    }

    // Parcourt tous les Pokémon pour trouver ceux du type spécifié
    for (let pokemonId in all_pokemons.all_pokemons) {
        const pokemon = all_pokemons.all_pokemons[pokemonId];
        if (pokemon.getTypes().some(type => type.name === typeName)) {
            pokemonsByType.push(pokemon);
        }
    }
    return pokemonsByType;
}

// Récupère toutes les attaques d'un type spécifique
function getAttacksByType(typeName) {
    const attacksByType = [];

    // Vérifie si le nom du type est fourni
    if (!typeName) {
        console.error("Type name is required.");
        return attacksByType;
    }

    // Parcourt toutes les attaques pour trouver celles du type spécifié
    for (let moveId in all_pokemons.all_attacks) {
        const attack = all_pokemons.all_attacks[moveId];
        if (attack.type === typeName) {
            attacksByType.push(attack);
        }
    }
    return attacksByType;
}

// Récupère tous les Pokémon utilisant une attaque spécifique
function getPokemonsByAttack(attackName) {
    const pokemonsByAttack = [];

    // Vérifie si le nom de l'attaque est fourni
    if (!attackName) {
        console.error("Attack name is required.");
        return pokemonsByAttack;
    }

    // Parcourt tous les Pokémon pour trouver ceux utilisant l'attaque spécifiée
    for (const pokemonId in all_pokemons.all_pokemons) {
        const pokemon = all_pokemons.all_pokemons[pokemonId];
        if (pokemon.charged_moves.some(attack => attack.name === attackName) || 
            pokemon.fast_moves.some(attack => attack.name === attackName)) {
            pokemonsByAttack.push(pokemon);
        }
    }
    return pokemonsByAttack;
}

// Trie les Pokémon par leur nom
function sortPokemonByName() {
    const pokemons = Object.values(all_pokemons.all_pokemons);
    
    // Trie les Pokémon par ordre alphabétique des noms
    return pokemons.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
}

// Trie les Pokémon par leur statistique de stamina
function sortPokemonByStamina() {
    const allPokemons = Object.values(all_pokemons.all_pokemons);
    
    // Trie les Pokémon par ordre décroissant de leur statistique de stamina
    return allPokemons.sort((a, b) => b.stamina - a.stamina);
}

// Récupère les ennemis les plus faibles pour une attaque spécifique
function getWeakestEnemies(attackName, limit = 5) {
    const weakestEnemies = [];

    // Recherche l'attaque spécifiée
    const attack = Object.values(all_pokemons.all_attacks).find(attack => attack.name === attackName);
    if (!attack) {
        console.log(`attack with name ${attackName} not found.`);
        return [];
    }

    // Trie les Pokémon par ordre croissant de l'efficacité de l'attaque spécifiée
    const sortedPokemons = Object.values(all_pokemons.all_pokemons).sort((a, b) => {
        const aEffectiveness = getAttackEffectivenessForPokemon(attack, a);
        const bEffectiveness = getAttackEffectivenessForPokemon(attack, b);
        return aEffectiveness - bEffectiveness;
    });

    // Récupère les premiers Pokémon jusqu'à la limite spécifiée
    for (const pokemon of sortedPokemons) {
        if (weakestEnemies.length >= limit) {
            break;
        }
        weakestEnemies.push(pokemon);
    }

    return weakestEnemies;
}

// Calcule l'efficacité d'une attaque sur un Pokémon spécifique
function getAttackEffectivenessForPokemon(attack, pokemon) {
    let effectiveness = 0;

    // Parcourt tous les types du Pokémon pour calculer l'efficacité de l'attaque
    for (const type of pokemon.types) {
        if (attack.typeEffectiveness[type.name]) {
            effectiveness += attack.typeEffectiveness[type.name];
        }
    }

    return effectiveness;
}

// Récupère les meilleurs types d'attaque contre un Pokémon spécifique
function getBestAttackTypesForEnemy(name) {
    const pokemon = Object.values(all_pokemons.all_pokemons).find(pokemon => pokemon.name === name);
    if (!pokemon) {
      console.log(`Pokemon with name ${name} not found.`);
      return [];
    }
  
    const types = pokemon.getTypes();
    const bestAttackTypes = [];

    let maxEff = Infinity;
    
    // Parcourt tous les types d'attaque pour trouver les plus efficaces contre le Pokémon spécifié
    for (const attackType in all_pokemons.all_types) {
      let effectiveness = 1; 
  
      // Calcule l'efficacité de chaque type d'attaque
      for (const type of types) {
        if (type.attackEffectiveness[attackType]) {
          effectiveness *= type.attackEffectiveness[attackType];
        }
      }

      // Met à jour les meilleurs types d'attaque
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


// Affiche tous les Pokémon
function affichePokemons() {
    console.log(all_pokemons);
}

// Teste la fonction getPokemonsByType avec une valeur saisie dans un champ de texte
function testPokemonsByType() {
    const inputFieldType = document.getElementById('inputField');
    const type = inputFieldType.value;
    console.log(`Pokémons de type ${type} :`);
    const Pokemons = getPokemonsByType(type);
    console.table(Pokemons);
}

// Teste la fonction getPokemonsByAttack avec une valeur saisie dans un champ de texte
function testPokemonsByAttack() {
    const inputFieldAttaque = document.getElementById('inputField');
    const attaque = inputFieldAttaque.value;
    console.log(`Pokémons avec l'attaque ${attaque} :`);
    const Pokemons = getPokemonsByAttack(attaque);
    console.table(Pokemons);
}

// Teste la fonction getAttacksByType avec une valeur saisie dans un champ de texte
function testAttacksByType() {
    const inputFieldTypeAttaque = document.getElementById('inputField');
    const type = inputFieldTypeAttaque.value;
    console.log(`Attaques de type ${type} :`);
    const attacks = getAttacksByType(type);
    console.table(attacks);
}

// Teste la fonction sortPokemonByName
function testSortPokemonByName() {
    console.log(`Pokémons triés par nom :`);
    const Pokemons = sortPokemonByName();
    console.table(Pokemons);
}

// Teste la fonction sortPokemonByStamina
function testSortPokemonByStamina() {
    console.log(`Pokémons triés par stamina :`);
    const Pokemons = sortPokemonByStamina();
    console.table(Pokemons);
}

// Teste la fonction getWeakestEnemies avec une valeur saisie dans un champ de texte
function testWeakestEnemies() {
    const inputFieldWeakest = document.getElementById('inputField');
    const pokemonName = inputFieldWeakest.value;
    console.log(`Test Weakest Enemies for ${pokemonName}:`);
    const weakestEnemies = getWeakestEnemies(pokemonName);
    console.table(weakestEnemies);
}

// Teste la fonction getBestAttackTypesForEnemy avec une valeur saisie dans un champ de texte
function testBestAttackTypesForEnemy() {
    const inputFieldNomPoke = document.getElementById('inputField');
    const pokemonName = inputFieldNomPoke.value;
    console.log(`Test best attack types against ${pokemonName}:`);
    const bestAttackTypes = getBestAttackTypesForEnemy(pokemonName);
    console.table(bestAttackTypes);
}

