const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id },
      })
        .then((_) => {
          if (pokemon === null) {
            const message =
              "Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant";
            res.status(404).json({ message });
          }
          const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`;
          res.json({ message, data: pokemonDeleted });
        })
        .catch((error) => {
          const message =
            "Le pokemon n'a pas pu être modifié. Réessayez dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    });
  });
};
