const GRAPHQL_URL = 'http://localhost:9000/';

async function fetchGreeting() {
    const res = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `query {
              greeting
            }`
        })
    });
    const { data } = await res.json();
    return data;
}

const ele = document.getElementById('greeting');
ele.textContent = 'Loading...';
fetchGreeting().then(data => {
    ele.textContent = data.greeting;
});
