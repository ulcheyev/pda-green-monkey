class Notification {
  constructor(id, detailedText, name, date) {
    this.id = id;
    this.date = date;
    this.header = name;
    this.text = detailedText;
  }
}

export default Notification;
