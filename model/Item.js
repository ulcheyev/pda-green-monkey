class Item {
  constructor(amount, checked, measure, name, photo, id = -1) {
    this.id;
    this.quantity = amount;
    this.checked = checked;
    this.measure = measure;
    this.name = name;
    this.photo = photo;
    this.id = id == -1 ? undefined : id;
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
