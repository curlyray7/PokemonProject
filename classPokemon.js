// Returns a JSON array where each element is a dict containing :
// - base_attack,
// - base_defense,
// - base_stamina, 
// - pokemon_ID,  
// - pokemon name.

class Pokemon { // nouvelle déclaration
    constructor (name, id, attack, defense, stamina) {
        this.pokemon_name = name;
        this.pokemon_id = id;
        this.base_attack = attack;
        this.base_defense = defense;
        this.base_stamina = stamina;
    }
    toString() { return `${this.nom} a un rayon de ${this.rayon}km` }
}