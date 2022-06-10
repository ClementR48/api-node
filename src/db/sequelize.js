const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')

let sequelize

if(process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize('bd63kj5trbckmq8q', 'w1le9w3qml2ifcll', 'o22l7wqf1o2rpo7p', {
    host: 'cxmgkzhk95kfgbq4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
} else {
  sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
  
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  if(process.env.NODE_ENV === 'production'){

    return sequelize.sync().then(_ => {
      pokemons.map(pokemon => {
        Pokemon.create({
          name: pokemon.name,
          hp: pokemon.hp,
          cp: pokemon.cp,
          picture: pokemon.picture,
          types: pokemon.types
        })
        .then(pokemon => console.log(pokemon.toJSON()))
      })
      
      bcrypt.hash('pikachu', 10)
      .then(hash => User.create({ username: 'pikachu', password: hash }))
      
      
      console.log('La base de donnée a bien été initialisée !')
    })
  }else{
    return sequelize.sync({force: true}).then(_ => {
      pokemons.map(pokemon => {
        Pokemon.create({
          name: pokemon.name,
          hp: pokemon.hp,
          cp: pokemon.cp,
          picture: pokemon.picture,
          types: pokemon.types
        })
        
      })
      
      bcrypt.hash('pikachu', 10)
      .then(hash => User.create({ username: 'pikachu', password: hash }))
      
      
      console.log('La base de donnée a bien été initialisée !')
    })
  }
}

module.exports = { 
  initDb, Pokemon, User
}