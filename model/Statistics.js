class Statistics {
  constructor(dateFrom, dateTo, user) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.overallPrice = 0;
    this.purchases = [];
    this.user = User.getUserFromContext();

    /**
     * SELECT * FROM PURCHASES WHERE date >= this.dateFrom AND date <= this.dateTo AND user = this.user.username
     *  */

    this.purchases.map(
      (purchase) =>
        (this.overallPrice += purchase.item.price = purchase.item.count),
    );
  }
}
