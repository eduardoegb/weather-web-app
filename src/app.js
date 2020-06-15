// core modules
const path = require('path');
// npm modules
const express = require('express');
const hbs = require('hbs');
// app modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    author: 'Eduardo'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    author: 'Eduardo'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    author: 'Eduardo'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send('ERROR: You must provide an address.');
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error});
    }
    forecast({ latitude, longitude }, (error, response) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        location,
        forecast: response
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    msg: 'Article not found',
    author: 'Eduardo'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    msg: 'Page not found',
    author: 'Eduardo'
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
