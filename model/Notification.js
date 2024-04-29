class Notification {
  constructor(detailedText, name) {
    this.date = Date().toDateString();
    this.header = name;
    this.text = detailedText;
  }
}

export default Notification;
