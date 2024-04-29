class List {
  constructor(name) {
    this.name = name;
    this.isTemplate = false;
    this.shops = [];
    this.progress = updateProgress();
  }

  addShop(shop) {
    this.shops.push(shop);
    this.progress = this.updateProgress();
  }

  removeShop(shop) {
    this.shops = this.shops.filter((sh) => sh.id != shop.id);
    this.progress = this.updateProgress();
  }

  updateProgress() {
    let numItems = 0;
    let checkedItems = 0;
    this.shops.map((shop) =>
      shop.items.map((item) => {
        numItems++;
        if (item.checkedItems) {
          checkedItems++;
        }
      }),
    );
    return (checkedItems / numItems) * 100;
  }
}
