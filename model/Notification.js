class Notification {
  constructor(text, header) {
    this.date = Date().toDateString();
    this.header = header;
    this.text = text;
  }
}
