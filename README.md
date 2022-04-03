BookProject - YelpCamp-like Web App


1- Start
Create project directory. Create README file to record progress. Push to remote repository to keep files safe.

2- Packages and Dependencies 
Run npm init to get package.json file. In this file, we save all our npm installed dependencies. Now we can run npm i <package> to get our packages. This command will create a package-lock.json file and a node_modules directory. We dont care about these for now.

3- Create App
We create our main file, 'app.js' (BookProject/app.js). Inside this file we will create our express app, connect to the database, set our routes, render ejs files and more.

4- Create 'views' directory (BookProject/views). In this dir we will build all our html templates(home.ejs etc) with ejs.
We need to set the view engine to ejs.

5- Create Model/Schema
Create models directory (BookProject/models). Inside this dir we will create our mongoose schemas.
We also need to connect to mongoose and create our mongo database.

--------------------------------------------------------------

6- Seeds
We create a seeds directory (BookProject/seeds) in order to store our book entries. We will create a file that deletes all existing objects in our db, and adds new entries in case we ruin our database. Resets database

7- INDEX (Books Page) ***IMAGE***
In this page all books will be diplayed as list items. We need to create a 'books' dir inside views, that will have all our templates. Note the home.ejs template is outside the books dir but still inside views. yolo
We first create our 'index.ejs' template, that will be the '/books' page. 

8- SHOW page
Create show page where we can see details about each book by clicking on it on the /books page. show.ejs template.

9- NEW/CREATE
The /books/new page will have a form where we can create a new book. But we also need a post route for the 'create' part. So we set 2 new routes, a get for the '/new' route and a post for the 'create' part.

10- EDIT/UPDATE/DELETE
Add edit option in show.edit.ejs template. We need to go with a put/patch/edit request instead of get/post. We use method-override. The edit form is a post request (method=POST), but in app.js we do app.put to make express treat the post request as a put (using our _method query).

--------------------------------------------------------------

 Basic Styles

11- BOILERPLATES/PARTIALS
We use the ejs-mate to create boilerplates. We create a layouts dir inside views (BookProject/views/layouts) and in there we create our boilerplates (boilerplate.ejs file).
We also need to add navbar and other components. So we create a partials folder inside views.


12- IMAGE
We get the link from the json file we downloaded from google api. We also modify our schema by adding the 'image' attribute (besides title, authors etc).

13- Style Index/Forms/Show Pages
bootstrap etc

--------------------------------------------------------------

	ERROR HANDLING

14- We use bootstrap's form validation. First we add the 'required' attribute to each input that we want to be validated and then we add the 'novalidate' attribute to the whole form so that the browser doesnt handle it by itself. This way we can add our own validation handlers.
We get bootstrap's js snippet in order for the validation to work. That's for the client part.

For the server-side, we need to set an error handler with try-catch and then call an app.use to send a response.
We also create our own ExpressError in a utils file.

--------------------------------------------------------------

15- Adding The Reviews Model

Added the 'Review' model (BookProject/models/review.js). There is a one-to-many relationship between books and reviews. So reviews is added to the BookSchema as an array of ObjectId.
A review form is added to the show page.


--------------------------------------------------------------
 16- Breaking Out Routes, Configuring Session/Setting Up Flash

 17- Adding In Authentication
	
	For the register,login etc functionality, passport 	package is used. A new model (User) is also created to store users' credentials.

18- Authorization

--------------------------------------------------------------


19- Controllers & Star Ratings

Cleap Up route files by creating controllers.


20- Image Upload

21- Maps

22- Fancy Cluster Map

















