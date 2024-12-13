# projectMovie
started with basic structure from stackoverflow to begin and learn 

#server
started using local storage but then moving to API integration
created server test code to check connection
facing issues in connecting to db through github codespaces 
checked code via vs code and initiated via node via terminal and connection was established 
tried to use git codespace with vscode.. still not woking
referenced various webpages and youtube tutorials to implement GET,POST,PUSH and DELETE methods

#app
added app.js to handle all functions via server
added fetch movies function to get all data from db
added addmovie function to insert new movie
added delete movie function delete movies from db
added edit function to edit the existing tuples
faced problems while trying to implement the edit functionality referred AI help to detemine cause of failure

#html and css
made basic html structred and styled with the help of AI and various other resources 

#unit test
implemented testing framework with one test primarily 
used jest and mocked db to initiate test on POST
as test was passed modified test to integrate test on GET
made small change and added validation to POST to add a test case and ran test

small issue occoured during testing>> sometimes while testing it was unable to use the port 3000 where the server was running
decided to use dynamic port allocation for testing as solution ((referred stackoverflow and quora)
but the page was not running locally with dynamic port allocation even after making changes to app.js to get the dynamic port and listen to it. hence running on two ports.

#integration testing
used jest for integration testing


#adding references 
https://www.geeksforgeeks.org/movie-search-application-using-javascript/
https://stackoverflow.com/questions/42228068/imagine-you-have-a-movie-collection-and-you-want-to-write-code-that-returns-you
https://stackoverflow.com/questions/857670/how-to-connect-to-sql-server-database-from-javascript-in-the-browser
https://hevodata.com/learn/javascript-mysql/#:~:text=Create%20a%20new%20file%20named%20%E2%80%9Capp.&text=const%20mysql%20%3D%20require('mysql,Database')%3B%20return%3B%20%7D%20console.
https://freefrontend.com/css-headers/      
https://getcssscan.com/css-buttons-examples