class Pokemon {
    constructor(pokemonData) {
        this.id = pokemonData.pokemon_id;
        this.name = pokemonData.pokemon_name;
        this.attack = pokemonData.base_attack;
        this.defense = pokemonData.base_defense;
        this.stamina = pokemonData.base_stamina;
        this.form = pokemonData.form;
        this.types = []; 
        this.fast_moves = [];
        this.charged_moves = [];       
        const IDWith0 = String(pokemonData.pokemon_id).padStart(3, '0');
        this.thumbnail = `../webp/thumbnails/${IDWith0}.webp`;
    }

    getTypes() {
        return this.types;
    }
 
    getAttacks() {
        return this.fast_moves.concat(this.charged_moves);
    }

    toString() {
        let typesString = this.types.map(type => type.toString()).join(', ');
        let attacksString = this.attacks.map(attack => attack.toString()).join(', ');
        return `${this.name} 
                \nID : ${this.id}
                \nAttack : ${this.attack}
                \nDefense : ${this.defense}
                \nStamina : ${this.stamina}
                \nTypes : ${typesString}
                \nAttacks : ${attacksString}`;
    }
}
