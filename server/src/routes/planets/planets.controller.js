const { getAllHabitantPlanets } = require('../../model/planets.model') 

async function httpGetAllPlanets(req, res) {
    return res.status(200).json( await getAllHabitantPlanets());
}

module.exports = {
    httpGetAllPlanets,
}