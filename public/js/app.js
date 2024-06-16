const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const express = require('express');
require('dotenv').config();
const app = express();

const root = path.join(__dirname, '../..');

app.set('view engine', 'hbs');
app.use(express.static(root));

const PORT = 8080;
const TOKEN = process.env.API_TOKEN;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`
    }
};

app.get('/api/movies', (req, res) => {
    const query = req.query.search;
    if (!query) return res.send('Write a valid film name!');

    let url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    // let id = 1375666;
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            const hit = json.results[0];
            if (!hit) return res.send('No match found!');
            const id = hit.id;

            url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
            fetch(url, options)
                .then(list => list.json())
                .then(movies => {
                    movies.results.unshift(hit);
                    console.log(movies);
                    res.render('index', movies);
                })
            console.log(`done`);
        })
        .catch(err => console.error('error:', err))
})

app.get('/api/movies?*', () => {
    res.render('Error 404: No match found');
})

app.get('*', (req, res) => {
    res.send('Error 404: Page does not exist');
})

app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));

