class User {
  constructor(mail, username) {
    this.mail = mail;
    this.username = username;
  }

  static getUserFromContext() {
    return User("Hello", "dragon");
  }
}
