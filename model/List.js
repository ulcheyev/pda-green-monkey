class List {
  constructor(name) {
    this.name = name;
    this.isTemplate = false;
    this.shops = [];
  }

  addShop(shop) {
    this.shops.push(shop);
  }

  removeShop(shop) {
    this.shops = this.shops.filter((sh) => sh.id != shop.id);
  }
}
