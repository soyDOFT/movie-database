document.querySelector('#submit').addEventListener('submit', e => {
    e.preventDefault();
});
document.querySelector('#submit').addEventListener('submit', getData);

function getData() {
    const term = document.querySelector('#termBox').value;
    console.log(term);

    fetch(`http://localhost:8080/api/movies?search=${term}`)
    .then(res => res.json())
    .then(json => {
        if (json.error) return console.log(data.error);
        
        console.log(json);
    })
}