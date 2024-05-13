export class Stats {
  constructor() {
    this.stats = new Map();
    this.stats.set("Attack", 1);
    this.stats.set("Defense", 1);
    this.stats.set("Strength", 1);
    this.stats.set("Hitpoints", 10);
    this.stats.set("Ranged", 1);
    this.stats.set("Prayer", 1);
    this.stats.set("Magic", 1);
    this.stats.set("Cooking", 1);
    this.stats.set("Woodcutting", 1);
    this.stats.set("Fletching", 1);
    this.stats.set("Fishing", 1);
    this.stats.set("Firemaking", 1);
    this.stats.set("Crafting", 1);
    this.stats.set("Smithing", 1);
    this.stats.set("Mining", 1);
    this.stats.set("Herblore", 1);
    this.stats.set("Agility", 1);
    this.stats.set("Thieving", 1);
    this.stats.set("Slayer", 1);
    this.stats.set("Farming", 1);
    this.stats.set("Runecrafting", 1);
    this.stats.set("Hunter", 1);
    this.stats.set("Construction", 1);
  }

  printStats = () => {
    this.stats.forEach((val, key) => {
      console.log(`${key}: ${val}`);
    });
  };

  getStats = () => {
    return this.stats.entries();
  };

  getStat = (name) => {
    return this.stats.get(name);
  };

  setStat = (stat, level) => {
    this.stats.set(stat, level);
  };

  getStatNames = () => {
    return this.stats.keys();
  };
}
