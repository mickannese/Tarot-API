const express = require('express');
const bp = require('body-parser');
const upload = require('./upload.js');
const db = require('../database/models.js')


const port = 1111;
const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/', express.static('public'));

app.post('/image', upload.single('image'), (req, res) => {
  res.json({ 'imageUrl': req.file.location })
});


app.post('/deck', (req, res) => {
  db.create(req.body, (bool) => {
    if (!bool) {
      res.json('record exists')
    } else {
      res.json('success');
      res.end();
    }
  });
});

app.get('/deck', (req, res) => {
  db.getDeckNames((result) => { res.json(result) });
});
app.get('/deck/:name', (req, res) => {
  db.getDeck(req.params.name, (result) => { res.json(result) })
})

app.delete('/deck', (req, res) => {
  db.deleteDeck(req.body, () => {
    res.end();
  });
})

app.patch('/deck/:name', (req, res) => {
  db.updateDeck(req.body, () => {
    res.end();
  })
})



// app.post('/upload', upload.array('photos', 3), function (req, res, next) {
//   res.send('Successfully uploaded ' + req.files.length + ' files!')
// })



app.listen(port, () => {
  console.log(`You are now listening to ${port} radio`);
});

module.exports = app;