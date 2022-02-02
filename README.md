# Equitor
## Short summary
This application is created for [Full Stack open 2021](https://fullstackopen.com/). The course is a deep dive into modern web development and as its final task, we were given a chance to create a web application completely from scratch. Application frontend is built with React and Redux, and backend is uses Node.js, Express and Mongoose with MongoDB as document database.

## About the project
In the beginning of the project planning process, I wanted to at least loosely connect the application to my previous profession as an investment banker. Quite fast, this got me into thinking about regular private investors and how we make decisions on whether to buy or sell a certain stock. Even though pure gut feeling is the primary decision making factor for many, I know for a fact that there are very well informed private investors out there, who would gladly share their knowledge and reserach if given a chance. Thats where the idea of Equitor started.

Equitor is an application that allows users to create equity analyses on Finnish publicly listed stocks for other users to view, comment and rate. As an aspiring developer with yet limited software development skills, my goal was to make an overall well-functioning application and show myself that with the knowledge I have gathered from the computer science studies, I am now capable of creating a working web application from scratch.

In my mind, I have succeeded quite well. I have especially emphasized the code readability by having clean model/component structure, having good function/variable naming conventions and including good amount of comments within the code. Also, as I had not yet had much exposure on the visual side of web development, I have also tried to put focus on responsiveness and overall look of the UI. More work is needed, but so far I think I have done good job.

## So how does it work?
As mentioned, Equitor lets users to post analyses of stocks for other users to see, comment and rate.

Have a look at the fully functional application here: https://equitor.herokuapp.com/

When a user starts the application, he or she enters the homepage. On the top of the page is navigation bar, which user can use to navigate to three different pages: Feed page, Log in page or Create Account page.

As the name suggets, Feed page presents the list of feed items; when a new analysis on any stock is published, it will appear in the Feed. Initially, Feed is ordered so that the most recent is presented on the top. However, user has an option to click "Apply filters", which enables filtering based on, for example, company name or rating. Each feed item displays general information about the analysis: user who posted it, the company name that the analysis is about, how many hours/days ago it was posted, how many stars (rating) is has received and what keywords the publisher has selected for the analysis. Lastly, each feed item also has a button that routes the user to a page for detailed information about the analysis.

On the left side of the detailed information page, stock logo and publisher are presented in addition to primary outcome of the analysis (recommendation and target price). The right side includes the analysis itself, which is principally wall of text the publisher has written about the company. On the top, there is a button that opens a new modal presenting comments and ratings that the analysis has received. As the user is currently not logged in, he or she do not have option to write a comment.

The rest of the navigation options are quite self-explanatory. Create Account routes to a page that lets user to enter account details in order to create a new account. Account information is stored in MongoDB database. Log in, on the other hand, routes to a page that lets user to enter username and password. In the process, browser receives a token that is used for the token based authentication in the backend.

When logged in, navigation bar takes a slightly new form. Feed page still exists, yet now user can comment and rate analyses within the detailed information page (notice that the user cannot comment his or her own analyses). In addition to Feed page, navigation bar has options for My Analyses page, Create Analysis page, My Account page and option to log out. My Analysis page is quite similar to Feed page, but it includes only analyses published by the currently logged in user. Additionally, it has button to delete analysis. Create Analysis page presents a form that allows user to publish new analysis. Form has fields for all the usual content found in any equity research report, such as target price, recommendation (buy, hold or sell), key words, analysis title and multiple text fields allowing user to write even extensive analysis. Lastly, My Account page lets user to view and change user details; currently, user can change his first and last name, and his password.  

## How to run it?
#### OPTION 1
Feel free to test the application in the following url:  https://equitor.herokuapp.com/

#### OPTION 2

1) Clone the repository

Application is built in monorepo, meaning that both front-end and back-end are in the same directory. Back-end is located in the root and has its own package.json. Front-end is located in the Client directory, and also has its own package.json.

2) Install dependencies

In the project root, run the following commands to install dependencies for both frontend and backend.

```javascript
npm install
npm run install:frontend
```
3) Required environmental variables

There are 2 different environment variables defined. Create .env file to the project root including the following variables:

```javascript
MONGODB_URI = your_mongodb_database_url
SECRET = your_secret_key_for_jwt
```

4) Run the application in development mode

In the project root, run the following commands to start the backend with Nodemon (uses port 3001) and frontend with dev server (uses port 3000). 

```javascript
npm run dev
npm run dev:frontend
```
#### OR

4) Run the application in production

In the project root, run the following commands to create a frontend production build and serve the generated static files from the backend (port 3001). 

```javascript
npm run build:frontend
npm start
```
