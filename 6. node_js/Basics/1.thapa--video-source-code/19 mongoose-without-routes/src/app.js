// const { get } = require("http");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/reviseod", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected successfully");
  })
  .catch(() => {
    console.log("not connected");
  });

//schema : a mongoose schema define the structure of the document , default values , validators, etc..
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique:true,

    //* mongoose validations
    // lowercase: true
    // uppercase: true
    trim: true,
    // minlength: [10, "min 10 length required"],
    // maxlength:
    //match
  },
  ctype: {
    type: String,
    required: true,
    lowercase: true,
    //any one will be allowed
    // enum: ["frontend", "backend", "database"],
  },
  videos: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw Error("videos must be positive");
      }
    },
  },
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

// a mongoose model is a wrapper on the mongoose schema a mongoose schema defines the structure of the document , default values, validators etc., whereas a mongoose model provides an interface to the database for creating , querying, updating , deleting records etc.

//collection creation
const Playlist = new mongoose.model("Playlist", playlistSchema);

//create a document or insert
const createDocument = async () => {
  try {
    const jsPlayList = new Playlist({
      name: "javascritp",
      ctype: "front end",
      videos: 121,
      author: "nishant singh",
      active: true,
    });
    const mongoDbList = new Playlist({
      name: "mongoDB",
      ctype: "backend end",
      videos: 12,
      author: "neha singh",
      active: true,
    });
    const express = new Playlist({
      name: "express js",
      ctype: "back-end",
      videos: 21,
      author: "pooja singh",
      active: false,
    });

    // * this is the new way doesn't require the save method
    // const newWay = Playlist.Create({
    //   name: "express js",
    //   ctype: "back-end",
    //   videos: 21,
    //   author: "pooja singh",
    //   active: false,
    // });

    // const result = await reactPlaylist.save();//to save only one document at a time
    const result = await Playlist.insertMany([
      jsPlayList,
      mongoDbList,
      express,
    ]); //to save only more the one document at a time

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
createDocument();

const getDocument = async () => {
  //   const result = await Playlist.find({ ctype: "front end" });
  // const result = await Playlist.find({ ctype: "front end" })
  //   .select({
  //     name: 1,
  //   })
  //   .limit(1);
  //   const result = await Playlist.find({ ctype: "front end" }).select({
  //     name: 1,
  //   });  // only name
  const result = await Playlist.find();
  console.log(result);
};
// getDocument();

const updateDocument = async (_id) => {
  try {
    const result = await Playlist.updateOne(
      { _id },
      {
        $set: { name: "Fast js" },
      }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
// updateDocument("64d911eaab16632c02bcb741");

const deleteDocument = async (_id) => {
  try {
    const result = await Playlist.deleteOne({ _id });
    console.log(result);
  } catch (error) {
    console.log(err);
  }
};
// deleteDocument("64d911eaab16632c02bcb741");

// ****************
//comparison operators
const getDocuments = async () => {
  //$gt -> greater than, $gte-> greater than equal,$lt ->lower than, $lte -> lower than equal to
  const result = await Playlist.find({ videos: { $gt: 50 } }).select({
    name: 1,
  });

  console.log(result);
};
// getDocuments();

//logical query operators
const logicalOr = async () => {
  //$or -> check between both two
  const result = await Playlist.find({
    $or: [
      { ctype: "front end" },
      {
        author: "Thapa technical ",
      },
    ],
  }).select({
    name: 1,
  });

  console.log(result);
};

// logicalOr();

//sorting
const sortDocument = async () => {
  try {
    const result = await Playlist.find({ ctype: "front end" })
      // .select({ name: 1 })
      // .countDocuments();
      .sort();
    console.log(result);
  } catch (error) { }
};
// sortDocument();
