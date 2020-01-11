const request = require('supertest')
const faker = require('faker')
const app = require('../../src/app')

describe('Users Controller', () => {
  describe('Create', () => {
    describe('When params are sent', () => {
      it('When username and favouriteColor are sent', async () => {
        const username = faker.internet.userName()
        const favouriteColor = faker.commerce.color()

        const response = await request(app)
          .post('/users')
          .send({ username, favouriteColor })

        expect(response.statusCode).toBe(201)
        expect(response.body.username).toBe(username)
        expect(response.body.favouriteColor).toBe(favouriteColor)
      })
    })

    describe('When params are not sent', () => {
      it('When user name is not sent', async () => {
        const response = await request(app).post('/users')

        expect(response.statusCode).toBe(400)
      })

      it('When favouriteColor is not sent', async () => {
        const response = await request(app)
          .post('/users')
          .send({ username: faker.internet.userName() })

        expect(response.statusCode).toBe(400)
      })
    })
  })

  describe('List', () => {
    it('When there are records in the database', async () => {
      const response = await request(app).get('/users')

      expect(response.statusCode).toBe(200)
      expect(response.body.users.length).toBeGreaterThan(0)
    })

    it('When there are not records in the database', async () => {
      const response = await request(app)
        .get('/users')
        .expect(response => {
          response.body.users = []
          return response
        })

      expect(response.statusCode).toBe(200)
      expect(response.body.users.length).toBe(0)
    })
  })
})
