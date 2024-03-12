class Pokemon { // nouvelle déclaration
    constructor (name, id, attack, defense, stamina, normal) {
        this.pokemon_name = name;
        this.pokemon_id = id;
        this.base_attack = attack;
        this.base_defense = defense;
        this.base_stamina = stamina;


        this.base_form = 'normal';

    }

    // Méthode pour récupérer la liste des types (objets Type)
    getTypes() {
        return this.types;
    }


    toString() { 
        return `${this.pokemon_name} 
        \nID : ${this.pokemon_id}
        \nAttack : ${this.base_attack}
        \nDefense : ${this.base_defense}
        \nStamina : ${this.base_stamina}` 
    }
}



class Type {
    constructor() {
        this.all_types = {};
        this.loadTypes(); 
    }

    // Méthode pour charger les types de Pokémon depuis le fichier pokemon_type.js
    loadTypes() {
        const pokemon_types = require('./JS/pokemon_type.js');
        for (const pokemon of pokemon_types) {
            if (pokemon.form === "Normal") {
                this.all_types[pokemon.pokemon_name] = pokemon.type;
            }
        }
    }

    // Méthode pour calculer l'efficacité d'un type d'attaque contre un type de défenseur
    effectiveness(attack_type, defender_type) {
        const type_effectiveness = require('./JS/type_effectiveness.js');
        if (!type_effectiveness.hasOwnProperty(attack_type) || !type_effectiveness[attack_type].hasOwnProperty(defender_type)) {
            return "Type not found or effectiveness not defined.";
        }
        return type_effectiveness[attack_type][defender_type];
    }

    // Méthode pour afficher les types de Pokémon
    toString() {
        return Object.keys(this.all_types).join(', ');
    }
}
