const request = require('supertest');
const { app, startServer, stopServer } = require('../server');

let server;

// Integration tests for the Movie API
describe('Movie API Integration Tests', () => {
    // Start and stop the server before and after tests
    beforeAll(async () => {
        server = await startServer();
    });

    afterAll(async () => {
        await stopServer(server);
    });

    let createdMovieId;

    it('should create a new movie on POST /movies', async () => {
        const newMovie = {
            title: 'Inception',
            director: 'Christopher Nolan',
            release_year: 2010,
            rating: 8.8,
        };

        const response = await request(app).post('/movies').send(newMovie);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Movie added!');
        expect(response.body).toHaveProperty('movieId');
        createdMovieId = response.body.movieId; // Store for later tests
    });

    it('should fetch all movies on GET /movies', async () => {
        const response = await request(app).get('/movies');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should update a movie on PUT /movies/:id', async () => {
        const updatedMovie = {
            title: 'Inception Updated',
            director: 'Christopher Nolan',
            release_year: 2010,
            rating: 9.0,
        };

        const response = await request(app).put(`/movies/${createdMovieId}`).send(updatedMovie);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Movie updated!');
    });

    it('should delete a movie on DELETE /movies/:id', async () => {
        const response = await request(app).delete(`/movies/${createdMovieId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Movie deleted!');
    });


});
