# Equitor
## Short summary
This application is created for [Full Stack open 2021](https://fullstackopen.com/). The course is a deep dive into modern web development and as its final task, we were given a chance to create a web application completely from scratch. Application frontend is built with React and Redux, and backend is uses Node.js, Express and Mongoose with MongoDB as document database.

## About the project
In the beginning of the project planning process, I wanted to at least loosely connect the application to my previous profession as an investment banker. Quite fast, this got me into thinking about regular private investors and how we make decisions on whether to buy or sell a certain stock. Even though pure gut feeling is the primary decision making factor for many, I know for a fact that there are very well informed private investors out there, who would gladly share their knowledge and reserach if given a chance. Thats where the idea of Equitor started.

Equitor is an application that allows users to create equity analyses on Finnish publicly listed stocks for other users to view, comment and rate. As an aspiring developer with yet limited software development skills, my goal was to make an overall well-functioning application and show myself that with the knowledge I have gathered from the computer science studies, I am now capable of creating a working web application from scratch.

In my mind, I have succeeded quite well. I have especially emphasized the code readability by having clean model/component structure, having good function/variable naming conventions and including good amount of comments within the code. Also, as I had not yet had much exposure on the visual side of web development, I have also tried to put focus on responsiveness and overall look of the UI.

## So how does it work?
As mentioned, Equitor lets users to post analyses of stocks for other users to read, comment and rate.

Have a look at the fully functional application here: https://equitor.herokuapp.com/

When a user starts the application, he or she enters the homepage. On the top of the page is navigation bar, which user can use to navigate to three different views: Feed view, Log in view or Create Account view.

As the name suggets, Feed view presents the list of feed items; when a new analysis on any stock is published, it will appear in the Feed. Initially, Feed is ordered so that the most recent is presented on the top. However, user has an option to click "Apply filters", which enables filtering based on, for example, company name or rating. Each feed item displays general information about the analysis: user who posted it, the company name that the analysis is about, how many hours/days ago it was posted, how many stars (rating) is has received and what keywords the publisher has selected for the analysis. Lastly, clicking the feed item routes the user to a view for detailed information about the analysis.

The rest of the navigation options are quite self-explanatory. Create Account routes to a view that lets user to enter account details in order to create a new account. Account information is stored in [MongoDB](https://cloud.mongodb.com) database. Log in, on the other hand, routes to a view that lets user to enter username and password. In the process, browser receives a token that is used for the token-based authentication in the backend.

When logged in, navigation bar takes a slightly new form. In addition to Feed view, navigation bar now has options for My Analyses view, Create Analysis view, My Account view and an option to log out. First, My Analysis view is quite similar to Feed view, but it includes only analyses published by the currently logged user. Each analysis now also has a button to delete and a button to modify the analysis (as of now, modification not yet implemented). Next, Create Analysis view presents a form that allows user to publish new analyses. Form has fields for all the usual content found in any equity research report, such as target price, recommendation (buy, hold or sell), key words, analysis title and multiple text fields allowing user to write even extensive analysis. Lastly, My Account view lets user to view and change the user details; currently, user can change his first and last name, and his password.

Next, lets shortly look through the detailed information view accessible by clicking the analysis within the analyses feed. The title and summary of the analysis report is presented in the middle of the view and on the right side, there is a short summary of the analysis presenting information such as company name, recommendation, target price and a chart of historical stock price. All this information is given by the user that published the report - expect the stock price information, which is fetched from the [Yahoo Finance API](https://www.yahoofinanceapi.com/).

Then, on the left side of the detailed information view are buttons for viewing forecast charts, full analysis and comments. Charts button opens a modal that presents multiple bar plots which visualize financial forecast information given by the user that published the report. Similarly, full analysis button opens a modal that presents rest of the analysis written by the publisher - this information is asked in the analysis form and is optional. Next, the Comment button opens a modal that allows users to write and rate the analysis in question and read comments posted by other users. However, user cannot comment his own analysis and user must be logged in in order to post a new comment. Lastly, there is a button to return back to Feed view.

The latest addition to app functionalities is chat. When logged in, user sees a fixed chat icon in the bottom left corner. This icon opens up a messaging menu, where user can select other users to start a chat with. When user decides to start a new chat, a chat window is opened in the left corner next to messaging menu. Chat window as well as messaging menu window can both be minimized and maximized by clicking the arrow. Currently, chat functionality does not work in real-time and thus needs a bit more development in future. Chat is currently updated whenever a user property in redux store is updated, namely when site is refreshed or user updates his or her user details.

## Shortly about the file structure and dependencies
Application is built in a monorepo, meaning that both front-end and back-end are in the same directory. Back-end is located in the root and has its own package.json. Front-end is located in the [Client](/client) directory, and also has its own package.json.

Back-end is coded with Node.js and the underlying web framework is [Express.js](https://www.npmjs.com/package/express). Backend offers typical REST API endpoints for accessing and controlling analyses and user information as well as retreiving stock price data via [Yahoo Finance API](https://www.yahoofinanceapi.com/). As already mentioned, backend is connected to [MongoDB](https://cloud.mongodb.com) database and uses [jwt](https://www.npmjs.com/package/jsonwebtoken) to generate tokens. In the account creation process, password is hashed with [bcrypt](https://www.npmjs.com/package/bcrypt). Private information, such as URI of the Mongo database and Yahoo Finance api key, are passed as environment variables and are of course gitignored.

Front-end, on the other hand, is coded with React. The UI itself is mostly pure css divided into separate .css files. Each React component has a corresponding css-file that can be found in styles-folder within each component folder. Also, [Semantic UI](https://react.semantic-ui.com/) is used in some places, but I aim to transition to pure css as soon as possible. Charts within the Single Analysis view are plotted with [chartJS](https://www.chartjs.org/) and [React Chart JS](https://github.com/reactchartjs/react-chartjs-2), and forms are validated with [Yup schema](https://www.npmjs.com/package/yup) and controlled with [Formik](https://formik.org/). As already mentioned, stock price information is fetched from the [Yahoo Finance API](https://www.yahoofinanceapi.com/) by making a GET request first from the frontend to the backend and then calling the Yahoo API from the backend.

## How to run it?
### OPTION 1: visit deployed application
Feel free to test the application in the following url:  https://equitor.herokuapp.com/


### OPTION 2: run locally
1) Clone the repository

2) Install dependencies

In the project root, run the following commands to install dependencies for both frontend and backend.

```javascript
npm install
npm run install:frontend
```
3) Required environmental variables

There are 3 different environment variables defined. Create .env file to the project root including the following variables:

```javascript
MONGODB_URI = your_mongodb_database_url
SECRET = your_secret_key_for_jwt
YAHOO_FINANCE_API_KEY = your-yahoo-finance-api-key
```
*see Yahoo Finance API [documentation](https://www.yahoofinanceapi.com/tutorial) to get your free API-key*

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


### OPTION 3: start application inside container
Application has a simple docker setup implemented.

1) To start the container, first create .env file to the project root including the following environment variables.

```javascript
MONGODB_URI = your_mongodb_database_url
SECRET = your_secret_key_for_jwt
YAHOO_FINANCE_API_KEY = your-yahoo-finance-api-key
```
*alternatively feel free to pass envs via docker configs by adding environment variable key to either Dockerfile or docker-compose.yml*

2) Next,run the following docker-compose command in the root folder to build the image and start the container. Be aware that the build process may take couple of minutes. Afterwards the application can be accessed with localhost:3000.

```javascript
docker-compose -f docker-compose.yml up
```

## Improvements and next steps
* Chat is currently not working in realtime. Thus, something like long polling or websockets need to be applied in near future.
* UI is not optimized for mobile. Especially the chat needs to be more dynamic. 

## Some extra things to notice
* Heroku deployment uses my free subscription of Yahoo Finance API that allows 100 requests per day. Thus be aware that if stock price charts are not plotted, it is possible that the free requests are exhausted for the day.

