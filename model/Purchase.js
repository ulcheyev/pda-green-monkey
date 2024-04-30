class Purchase {
  constructor(item, shop) {
    this.item = item;
    this.shop = shop;
    this.date = Date().toDateString();
    this.user = User.getUserFromContext();
  }
}
