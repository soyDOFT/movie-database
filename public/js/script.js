const form = document.querySelector('.ui');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getData();
});

function getData() {
    const term = document.querySelector('#termBox').value;
    if (!term) return;
    fetch(`http://localhost:8080/api/movies?search=${term}`, {method: 'GET', redirect: 'follow'})
    .then(res => {
        location.href = res.url;
    })
}