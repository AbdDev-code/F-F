const { Schema, model } = require('mongoose');

const blogCardSchema = new Schema({
  title: String,
  p: String,
  img: String,
  status: {
    type: String,
    enum: ['active', 'pending'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const descSchema = new Schema({
  title: String,
  p: String,
});

const adminSchema = new Schema({
  home: [{
    title: String,
    p: String
  }],

  about: [{
    title: String,
    p1: String,
    p2: String,
    img: String
  }],

  contact: [{
    number: String,
    email: String,
    address: String,
    p: String
  }],

  blog: [{
    title: String,
    cards: [blogCardSchema]
  }],

  privacy: [{
    title: String,
    policy: [descSchema],
    disclaimer: [descSchema]
  }]
});

module.exports = model("AdminPage", adminSchema);
