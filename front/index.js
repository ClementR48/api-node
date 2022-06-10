console.log("bonjour");

fetch("https://tranquil-crag-68302.herokuapp.com")
  .then((res) => res.json())
  .then((res) => console.log(res));

fetch("https://tranquil-crag-68302.herokuapp.com/api/login", {
  method: "POST",
  body: JSON.stringify({ username: "pikachu", password: "pikachu" }),
  headers: { "Content-type": "application/json" },
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    return res.token;
  })
  .then((token) => fecthListPokemon(token));

const fecthListPokemon = (token) => {
  fetch("https://tranquil-crag-68302.herokuapp.com/api/pokemons", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};
