const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if (err) {
    console.log(err);
    return;
  }
  const db = client.db("the_prisoner");

  console.log('Connected to the database');

  // Create Route
  server.post('/api/episodes', function(req, res){
    const episodesCollection = db.collection("episodes");
    const episodeToSave = req.body;
    episodesCollection.save(episodeToSave, function(err, result){
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
      }
      console.log('saved to database');
      res.status(201);
      res.json(result.ops[0];)
    });
  });

  server.get("/api/episodes", function(req,res){
    const episodesCollection = db.collection('episodes');
    episodesCollection.find().toArray(function(err, allEpisodes){
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
      }

      res.json(allEpisodes);
    })
  })


})

server.listen(3000, function(){
  console.log("Listening on port 3000");
});
