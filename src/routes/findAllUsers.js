const { User } = require('../db/sequelize')
const { Op } = require('sequelize')


const capitalize = (str) => str.charAt(0).toUpperCase() + str.substring(1)

module.exports = (app) => {
  app.get('/api/users', (req, res) => {
    if(req.query.username) {
      const username = req.query.username
      const limit = parseInt(req.query.limit) || 2

      if(username.length < 2) {
        const message = `Le terme de recherche doit contenir au minimum 2 caractères.`
        return res.status(400).json({ message })        
      }

      return User.findAndCountAll({ 
        where: { 
          username: {
            [Op.or]: {
              [Op.like]: `%${username}%`,
              [Op.startsWith]: capitalize(username)
            }
          }
        },
        order: ['username'],
        limit: limit
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} qui correspondent au terme de recherche ${username}.`
        return res.json({ message, data: rows })
      })
    } 
    else {
      User.findAll({ order: ['username'] })
      .then(users => {
        const message = 'La liste des utilsateurs a bien été récupéré.'
        res.json({ message, data: users })
      })
      .catch(error => {
        const message = `La liste des utilsateurs n'a pas pu être récupéré. 
                         Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }
  })
}