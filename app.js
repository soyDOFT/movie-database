const fetch = require('node-fetch');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2ZiN2RhMDI3ZDEzYjczMTYzMWY5MTlmZjk0MjA4ZSIsInN1YiI6IjY2NjcxMjM2MWZmZWRhMjRkMjE1Y2ZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y38KG6mXvL9-eRAD2fNoXOgpa-RCz10JB79YihVCWX4'
    }
};

let url = 'https://api.themoviedb.org/3/movie/1375666/similar?language=en-US&page=1';

// function getData(url) {
//     fetch(url, options)
//         .then(res => res.json())
//         .then(json => console.log(json))
//         .catch(err => console.error('error:', err));
// }

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/api/movies/:search', (req, res) => {
    const query = req.params.search;
    let url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    // let id = 1375666;
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(json => {
            const hit = json.results[0];
            const id = hit.id;
            // console.log(window);
            url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;

            fetch(url, options)
                .then(list => list.json())
                .then(movie => {
                    fs.writeFileSync('./storage/storage.json', movie);
                    console.log('similar ----------------', movie);
                })
            res.send(json);
            console.log(done);
        })
        .catch(err => console.error('error:', err))

    // fs.readFileSync(getData(url));
})
// console.log(getData(url));
app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));

