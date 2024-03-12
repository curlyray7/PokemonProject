class Pokemon { // nouvelle déclaration
    constructor (name, id, attack, defense, stamina, normal) {
        this.pokemon_name = name;
        this.pokemon_id = id;
        this.base_attack = attack;
        this.base_defense = defense;
        this.base_stamina = stamina;
        this.base_form = normal;
    }
    toString() { 
        return `${this.pokemon_name} 
        \nID : ${this.pokemon_id}
        \nAttack : ${this.base_attack}
        \nDefense : ${this.base_defense}
        \nStamina : ${this.base_stamina}` 
    }
}