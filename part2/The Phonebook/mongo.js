const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://benand1:${password}@full-stack-open.0phjk.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Full-Stack-Open`;

mongoose.set("strictQuery", false);
mongoose.connect(url);
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 5) {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  });

  contact.save().then((result) => {
    console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact);
    });
    mongoose.connection.close();
  });
}
