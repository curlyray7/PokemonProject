
class Type {
    constructor(typeName) {
        this.name = typeName;
        this.attackEffectiveness = type_effectiveness[this.name] || {};
    }

    toString() {
        return `Type: ${this.name} effectiveness: ${JSON.stringify(this.attackEffectiveness)}`;
    }
}
