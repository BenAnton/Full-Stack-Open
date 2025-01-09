const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://benand1:${password}@full-stack-open.0phjk.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Full-Stack-Open`;

mongoose.set("strictQuery", false);
mongoose.connect(url).then(() => {
  const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      minLength: 5,
      required: true,
    },
    important: Boolean,
  });

  const Note = mongoose.model("Note", noteSchema);

  const note = new Note({
    content: "HTML is x",
    important: true,
  });

  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
});
