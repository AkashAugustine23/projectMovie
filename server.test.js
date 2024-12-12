const request = require('supertest'); // To test HTTP requests
const { app, startServer, stopServer } = require('../completeServer'); // changing file name to match with git files and import correct express app
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

describe('Movie API Endpoints', () => {
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

    // Test for POST /movies - Create a new movie
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

    // Test Case 2: POST /movies - Missing required fields (validation error)
    test('POST /movies - Missing required fields', async () => {
        const newMovie = { 
            title: '', 
            director: '', 
            release_year: '', 
            rating: '' 
        };
    
        const response = await request(app)
            .post('/movies')
            .send(newMovie);
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ 
            error: 'All fields (title, director, release_year, rating) are required' 
        });
    });
    
        // Test Case 3: POST /movies - Database failure (simulating a database error)
        test('POST /movies - Database failure', async () => {
            const newMovie = {
                title: 'Inception',
                director: 'Christopher Nolan',
                release_year: 2010,
                rating: 8.8,
            };
    
            // Mock the database query to simulate a failure
            mockDb.query.mockImplementation((sql, params, callback) => {
                callback(new Error('Database error'));  // Simulate database error
            });
    
            const response = await request(app)
                .post('/movies')
                .send(newMovie);
    
            expect(response.status).toBe(500); // Internal Server Error
            expect(response.body).toEqual({ error: 'Failed to add movie' });
        });    

    // Test for GET /movies - Retrieve all movies
    test('GET /movies - Retrieve all movies', async () => {
        const mockMovies = [
            { id: 1, title: 'Inception', director: 'Christopher Nolan', release_year: 2010, rating: 8.8 },
            { id: 2, title: 'Interstellar', director: 'Christopher Nolan', release_year: 2014, rating: 8.6 }
        ];

        // Mock the database query
        mockDb.query.mockImplementation((sql, callback) => {
            expect(sql).toBe('SELECT * FROM movies');
            callback(null, mockMovies); // Return mock movies
        });

        const response = await request(app)
            .get('/movies');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockMovies); // Verify that the response body contains the mocked movies
        expect(mockDb.query).toHaveBeenCalledTimes(1);
    });
});
