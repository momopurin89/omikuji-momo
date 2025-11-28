const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  
  const fortunes = ['大吉', '中吉', '小吉', '吉', '凶']; 

  
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  const selectedFortune = fortunes[randomIndex];

  
  res.render('index', { 
    title: 'おみくじアプリ', 
    fortune: selectedFortune 
  });
});

module.exports = router;