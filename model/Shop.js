class Shop {
  constructor(name) {
    this.id;
    this.items = [];
    this.name = name;
  }

  addItem(item) {
    this.items.push(item);
  }
  removeItem(item) {
    this.items = this.items.filter((x) => x.id != item.id);
  }
}
