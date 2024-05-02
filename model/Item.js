class Item {
  constructor(amount, checked, measure, name, photo) {
    this.id;
    this.quantity = amount;
    this.checked = checked;
    this.measure = measure;
    this.name = name;
    this.photo = photo;
  }

  static schema = {
    name: "Item",
    propeties: {
      name: { type: "string" },
      id: { type: "ObjectID" },
      quantity: { type: "float" },
      checked: { type: "bool" },
      measure: { type: "string" },
      photo: { type: "string" },
    },
    primaryKey: "id",
  };
}

export default Item;
