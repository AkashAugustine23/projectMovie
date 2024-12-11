const request = require('supertest'); // To test HTTP requests
const { app, startServer, stopServer } = require('../completeServer'); // Import the Express app with server controls
const db = require('mysql'); // Mock MySQL

// Mock the database connection
jest.mock('mysql', () => {
    const mockPool = {
        query: jest.fn(),
        getConnection: jest.fn((callback) => callback(null, { release: jest.fn() })),
    };
    return {
        createPool: jest.fn(() => mockPool),
    };
});

const mockDb = db.createPool();

describe('Movie API Endpoints - POST /movies', () => {
    let server;  // To hold the server instance

    // Start the server before all tests
    beforeAll(async () => {
        server = await startServer();  // Ensure server starts before running tests
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress console logs
    });

    // Clear mocks after each test
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    // Stop the server and clean up after all tests
    afterAll(async () => {
        await stopServer(server);  // Ensure server stops after tests complete
        mockDb.query.mockReset();
        jest.restoreAllMocks();
    });

    test('POST /movies - Create a new movie', async () => {
        const newMovie = {
            title: 'Inception',
            director: 'Christopher Nolan',
            release_year: 2010,
            rating: 8.8,
        };

        // Mock the database query
        mockDb.query.mockImplementation((sql, params, callback) => {
            expect(sql).toBe('INSERT INTO movies (title, director, release_year, rating) VALUES (?, ?, ?, ?)');
            expect(params).toEqual([newMovie.title, newMovie.director, newMovie.release_year, newMovie.rating]);
            callback(null, { insertId: 1 });
        });

        const response = await request(app)
            .post('/movies')
            .send(newMovie);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Movie added!', movieId: 1 });
        expect(mockDb.query).toHaveBeenCalledTimes(1);
    });
});
