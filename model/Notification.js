class Notification {
  constructor(detailedText, name) {
    this.date = new Date().toDateString();
    this.header = name;
    this.text = detailedText;
  }
}

export default Notification;
