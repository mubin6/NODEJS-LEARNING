const request = require('supertest');
const app = require('../../app');

const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {

    beforeAll(async () => {
        await mongoConnect()
    });
    
    afterAll(async() => {
        await mongoDisconnect();
    })

    describe('TEST GET /v1/launches', () => {
        test('It should response with 200 success', async() => {
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type', /json/)
            .expect(200);
        })
    })
    
    describe('TEST POST /v1/launches', () => {
        const completeLaunchData = {
            mission: 'Mission-1',
            rocket: 'Rocket-1',
            target: 'Kepler-62 f',
            launchDate: '4 July, 2025'
        }
        const launchDataWithoutDate = {
            mission: 'Mission-1',
            rocket: 'Rocket-1',
            target: 'Kepler-62 f',
        }
        const launchDataWithInvalidDate = {
            mission: 'Mission-1',
            rocket: 'Rocket-1',
            target: 'Kepler-62 f',
            launchDate: 'zoom'
        }
    
        test('It should response with 201 success', async() => {
            
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
    
            expect(responseDate).toBe(requestDate);
    
            expect(response.body).toMatchObject(launchDataWithoutDate);
    
    
        })
        test('It should catch missing required properties', async() => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Missing required launch property'
            })
        })
        test('It should catch invalid launch date', async() => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Invalid launch date'
            })
        })
    })
})

