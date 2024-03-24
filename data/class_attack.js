
class Attack {
    constructor(moveData) {
        this.id = moveData.move_id;
        this.name = moveData.name;
        this.type = moveData.type;
        this.duration = moveData.duration;
        this.energyDelta = moveData.energy_delta;
        this.power = moveData.power;
        this.staminaLossScaler = moveData.stamina_loss_scaler;
        this.typeEffectiveness = type_effectiveness[this.type] || {};
    }

    toString() {
        return `${this.name} (Type: ${this.type}, Power: ${this.power})`;
    }
}