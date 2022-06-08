const express = require("express");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const sequelize = require('./src/db/sequelize')

const app = express();
const port = process.env.PORT || 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(bodyParser.json());

sequelize.initDb()

app.get('/', (req, res) => {
  res.json('Hello')
})

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

app.use(({res}) => {
  const message = 'impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
  res.status(404).json({message})
})

app.listen(port, () => console.log(`app sur le port ${port}`));
