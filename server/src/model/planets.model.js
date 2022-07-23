const {parse}  = require('csv-parse');
const fs  = require('fs');
const path = require('path');

const planets = require('./planets.mongo');


function isHabitantPlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 
    && planet['koi_prad'] < 1.6
}

function loadPlanetsData() {

    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data', async (dta) => {
            if(isHabitantPlanet(dta)) {
                savePlanet(dta);
            }
        })
        .on('error', (err) => {
            console.log('err', err);
            reject(err);
        })
        .on('end', async () => {
            const countFoundPlanets = (await getAllHabitantPlanets()).length;
            console.log(`Total ${countFoundPlanets} habitant planets found!!!`);
            resolve();
        })
    })

}

async function getAllHabitantPlanets() {
    return await planets.find({}, {
        "_id": 0, "__v": 0
    });
}

async function savePlanet(planet) {
    try {
        await planets.updateOne(
            {
                keplerName: planet.kepler_name,
            },
            {
                keplerName: planet.kepler_name,
            },
            {
                upsert: true
            }
        );
        
    } catch (error) {
        console.error(`Not able to create planet: ${error}`);
    }
}



module.exports = {
    loadPlanetsData,
    getAllHabitantPlanets,
}