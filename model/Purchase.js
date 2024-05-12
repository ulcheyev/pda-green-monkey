class Purchase {
  constructor(price, shop) {
    this.price = price;
    this.shop = shop;
    this.date = Date().toDateString();
    this.user = User.getUserFromContext();
  }
}
