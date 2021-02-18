const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;


const tarotDeckSchema = new mongoose.Schema({
  name: String,
  suits: {
    wands: { name: { type: String, default: 'Wands' }, meaning: { type: String, default: 'fill me in' } },
    swords: { name: { type: String, default: 'Swords' }, meaning: { type: String, default: 'fill me in' } },
    cups: { name: { type: String, default: 'Cups' }, meaning: { type: String, default: 'fill me in' } },
    pentacles: { name: { type: String, default: 'Pentacles' }, meaning: { type: String, default: 'fill me in' } }
  },
  minor: {
    wands: [{ placement: { type: String, default: 'fill me in' }, suit: { type: String, default: 'Wands' }, meaning: { type: String, default: 'fill me in' }, image: { type: String, default: 'fill me in' } }],
    swords: [{ placement: { type: String, default: 'fill me in' }, suit: { type: String, default: 'Swords' }, meaning: { type: String, default: 'fill me in' }, image: { type: String, default: 'fill me in' } }],
    cups: [{ placement: { type: String, default: 'fill me in' }, suit: { type: String, default: 'Cups' }, meaning: { type: String, default: 'fill me in' }, image: { type: String, default: 'fill me in' } }],
    pentacles: [{ placement: { type: String, default: 'fill me in' }, suit: { type: String, default: 'Pentacles' }, meaning: { type: String, default: 'fill me in' }, image: { type: String, default: 'fill me in' } }]
  },
  major: [{ name: String, num: String, meaning: String, image: String }]
});

const deck = mongoose.model('deck', tarotDeckSchema);

const createDeck = (form, cb) => {
  console.log(form)
  deck.find({ name: form.name })
    .then(result => {
      console.log(result)
      if (result.length > 0) {
        cb(false);
      } else {
        deck.create(form).then(() => {
          cb(true);
          console.log(`created deck ${form.name}`)
        })
      }
    })
}

const getDeckNames = (cb) => {
  deck.find({}).select('name -_id')
    .then(res => { cb(res) })
}

const getDeck = (name, cb) => {
  deck.findOne({ name: name })
    .then(res => { cb(res) })
}

const deleteDeck = (name, cb) => {
  console.log(name)
  deck.deleteOne(name).then(() => {
    console.log(`${name.name} has been deleted`)
    cb();
  })
}

const updateDeck = (data, cb) => {
  deck.findOneAndUpdate({ name: data.name }, data)
    .then(() => {
      cb();

    })
}

module.exports.deck = deck;
module.exports.create = createDeck;
module.exports.getDeckNames = getDeckNames;
module.exports.deleteDeck = deleteDeck;
module.exports.getDeck = getDeck;
module.exports.updateDeck = updateDeck;