class Shop {
  constructor(name, items = []) {
    this.id;
    this.items = items;
    this.name = name;
  }

  addItem(item) {
    this.items.push(item);
  }
  removeItem(item) {
    this.items = this.items.filter((x) => x.id != item.id);
  }
}

export default Shop;
