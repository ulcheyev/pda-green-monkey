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

  static schema = {
    name: "Shop",
    properties: {
      id: "int",
      items: "Item[]",
      name: "string",
    },
  };
}

export default Shop;
