const path = require('path');

const fetch = require('node-fetch');
const fs = require('fs');
const express = require('express');

const app = express();
app.set('view engine', 'hbs');
const root = path.join(__dirname, '../..');
app.use(express.static(root));
require('dotenv').config();

const PORT = 8080;
const TOKEN = process.env.API_TOKEN;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`
    }
};

app.get('', (req, res) => {
    res.render('index');
})

app.get('/api/movies', (req, res) => {
    const query = req.query.search;
    if (!query) return res.send({error});

    let url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    // let id = 1375666;
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            const hit = json.results[0];
            const id = hit.id;
            url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;

            fetch(url, options)
                .then(list => list.json())
                .then(movie => {
                    // https://image.tmdb.org/t/p/w300/
                    res.render('index', hit);
                    //movie
                })
            console.log(`done`);
        })
        .catch(err => console.error('error:', err))

})

app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));

