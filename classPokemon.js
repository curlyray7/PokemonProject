const pokemon_types = require('./JS/pokemon_type.json');
const type_effectiveness = require('./JS/type_effectiveness.json');
const pokemon_moves = require('./JS/pokemon_moves.json');
const fast_moves = require('./JS/fast_moves.json');
const charged_moves = require('./JS/charged_moves.json');
const cp_multiplier = require('./JS/cp_multiplier.json');
const generation = require('./JS/generation.json');
const pokemon = require('./JS/pokemon.json');

class Pokemon {
    constructor(name, id, attack, defense, stamina) {
        this.pokemon_name = name;
        this.pokemon_id = id;
        this.base_attack = attack;
        this.base_defense = defense;
        this.base_stamina = stamina;
        this.types = [];
        this.attacks = [];
        this.base_form = 'normal';
    }

    getTypes() {
        return this.types;
    }

    getAttacks() {
        return this.attacks;
    }

    toString() {
        return `${this.pokemon_name} 
        \nID : ${this.pokemon_id}
        \nAttack : ${this.base_attack}
        \nDefense : ${this.base_defense}
        \nStamina : ${this.base_stamina}`;
    }
}

class Type {
    constructor() {
        this.all_types = {};
        this.loadTypes();
    }

    loadTypes() {
        for (const pokemon of pokemon_types) {
            if (pokemon.form === "Normal") {
                this.all_types[pokemon.pokemon_name] = pokemon.type;
            }
        }
    }

    effectiveness(attack_type, defender_type) {
        if (!type_effectiveness.hasOwnProperty(attack_type) || !type_effectiveness[attack_type].hasOwnProperty(defender_type)) {
            return "Type not found or effectiveness not defined.";
        }
        return type_effectiveness[attack_type][defender_type];
    }

    toString() {
        return Object.keys(this.all_types).join(', ');
    }
}

class Attack {
    constructor(id, name, type, damage) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.damage = damage;
    }

    toString() {
        return `${this.name} (ID: ${this.id}, Type: ${this.type}, Damage: ${this.damage})`;
    }
}

function import_pokemon() {
    const all_pokemons = {};
    for (const pokemon of pokemon_moves) {
        const newPokemon = new Pokemon(pokemon.pokemon_name, pokemon.pokemon_id, pokemon.base_attack, pokemon.base_defense, pokemon.base_stamina);
        // Add types
        for (const type of pokemon.types) {
            newPokemon.types.push(type);
        }
        // Add attacks
        for (const move of pokemon.moves) {
            const attack = new Attack(move.move_id, move.move_name, move.move_type, move.move_damage);
            newPokemon.attacks.push(attack);
        }
        all_pokemons[pokemon.pokemon_id] = newPokemon;
    }
    return all_pokemons;
}

const all_pokemons = import_pokemon();