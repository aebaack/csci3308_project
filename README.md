# UpRight Alarm Clock
UpRight is the final project for group 111-2 in CSCI-3308 at CU Boulder. It is a website with an alarm clock that requires the user to play a hangman-like game once the alarm goes off. The user can then browse up-to-date information from several sources or check how their score for the game matches up against other users.

## Developers
* Aidan Baack
* Jaykob Velasquez
* Nicholas Lescanic
* Yicheng Yi
* Adam Spiers

## Using the Site
#### Registration
To find the deployed website, follow [this link](https://csci-hangman.herokuapp.com/)!

From here, follow the simple registration form in order to create your account. The interests that you select at the bottom of the form will be displayed on an information screen after you have completed the hangman game.

Here is an example form:
![homepage](/readme/registration.png)

#### Setting an Alarm
Once you have created an account, you will be brought to the alarm. The current time will display at the top of the screen, and there will be three separate dropdown menus below for setting the hour, minute, and second that you want the alarm to go off. Select the time that you want the alarm to go off, then click "Set."

Alternatively, you can also click on the "Snooze" button to have the alarm go off after waiting for the amount of time that you set in your registration form. You can see the time left in the alarm at the bottom of the screen. Once the alarm goes off, you will be redirecting to the hangman game.

![homepage](/readme/alarm.png)

#### Hangman
You will be presented with a puzzle with several of the letters filled in. Your goal is to select the correct letters in order to fill in the rest of the puzzle. If you select an incorrect letter, then it will turn red and will no longer be selectable. Correct letters will turn green. Once you have completed the puzzle, you will be given a score based on your performance, and this score will factor in to your placement on the leaderboards. To find this, click on the scoreboard button after you have completed the game.

![homepage](/readme/hangman.png)

#### Scoreboard
The scoreboard displays the score for all of the users on the site, and you can also find your current score and placement at the bottom of the page. You can improve your score by correctly answering more puzzles.

![homepage](/readme/scoreboard.png)

Now let's look at the Information page, which will populate with the interests that you selected when you first registered.

#### Information
On this page, you will see several different sources of information such as Google News and the top three posts on Reddit. The interests that you have selected will display on top, and the other information will be displayed near the bottom. You can click on an information screen in order to have it open in full screen, allowing you to see all of the details. 

![homepage](/readme/information.png)

Finally, you can go the to Settings page by using the navigation bar at the top of the page. 

#### Settings Page
The settings page will initially populate with your currently selected snooze time and interests. On this screen, you can change your snooze time, interests, and password. Once you have changed these fields to your desired values, simply click the submit button, and the page will reload with your new selections.

![homepage](/readme/settings.png)

## Setting Up a Local Site
#### Database Instructions
* Open up Terminal and type:
  * `git clone https://github.com/aebaack/csci3308_project.git`
  * `cd csci3308_project`
  * `npm install -g knex`
    * This globally installs knex, which is used for setting up the database tables and adding information
  * `npm install`
* Now you have all of the necessary dependencies, so the next step is to set up the database
  * In Terminal, type `sudo -u postgres psql`
  * In Postgres, type:
    * `\password postgres`
    * Enter 'password' both times that you are prompted
    * `CREATE DATABASE hangman_db;`
    * `\q`
* With the database set up, now we need to create the tables and add fake data
* Within the folder for the project, type:
  * `knex migrate:latest`
    * This creates the database tables based on the information in the migrations folder
  * `knex seed:run`
    * This adds new rows into the tables based on the information in the seeds folder
  * `echo "SECRET_KEY=asdf" > .env`
    * This adds a key for passport.js to work. This key is not secure when setup this way, but it provides an example
  * `node server.js`
* The server will now be running
* Navigate to `localhost:3000` in the browser to view the site

#### Running Tests
* In order to run tests, you will need to have Mocha installed
* In Terminal, type
  * `npm install -g mocha`
* Now that Mocha has been globally installed, you can begin to run tests
  * Run `node server.js` in order to get a local server started
  * In another Terminal window, type `npm test` at the root of the folders
* If everything worked correctly, you should see all of the tests pass

![homepage](/readme/tests.png)

## Documentation
#### Folders
* `api`
  * Includes documentation information for the APIs that are included on the information page
* `auth`
  * Includes setup files for passport.js
* `migrations`
  * Includes a file for each database table including the name of each column and the type
* `public`
  * Holds the HTML, CSS, and JS files that are used for displaying the webpage
* `puzzles`
  * Stores the list of hangman puzzles that is used for populating the database
* `readme`
  * Stores images used in the readme
* `routes`
  * Holds the server routes `users`, `score`, and `hangman`. How to use them can be found below.
* `seeds`
  * Stores the files that knex uses to populate the database tables. There is a file for each table holding the rows to add.
* `test`
  * Stores test files that are run by Mocha when testing the server

#### Files
* `.gitignore` - Files to ignore when committing
* `README.md` - Documentation file
* `knex.js` - Setup file for Knex to properly connect to a local configuration as well as Heroku
* `knexfile.js` - Includes the variables needed to make a Knex connection
* `package.json` - Describes the node packages used in the project
* `server.js` - The base level of the server that is initially run

#### API Requests
* The server supports the following requests:
  * `GET /hangman` - Gives a hangman puzzle
    * Returns a JSON object with the following categories:
      * Puzzle: Fully solved hangman puzzle
      * Category: Category of the puzzle (Example: Thing)
  * `GET /score` - Provides scores for the users
    * Returns an array of user scores where each entry has the following categories:
      * id: ID of the user in the system
      * Name: Name of the user
      * Score: Score for the user account
  * `POST /users` - Creates a new user
    * Include the following information:
      * fullName: String of user's full name
      * emailAddress: String of user's email address
      * passwordFirst: String of user's desired password
      * zipCode: String of user's zip code
      * snooze: Integer of snooze time
      * api: Array of numbers indicating which interests to select
    * If the user is successfully created, then the server redirects to the alarm
  * `POST /users/login` - Logs in a user
    * Include the following information:
      * emailAddress: Email address for the user's account
      * passwordFirst: Password of the user's account
    * If login is successful, the server redirects to the alarm
  * All of the following requests are only accessible with a signed-in account
  * `GET /users` - Returns the currently logged in user information
    * Returns a JSON object with the following categories:
      * id: ID of the user in the system
      * name: Full name of the user
      * email: Email address of the user
      * snooze: Snooze preference for the user
      * created_at: Datetime that the user was created
      * updated_at: Datetime that the user was last updated
      * score: Score for the user
      * zip_code: Zip code for the user
  * `GET /users/logout` - Logs out the currently logged in user
    * Redirects to Registration page
  * `POST /users/score` - Updates the score for the current user
    * Include the following information:
      * score: New score for the user
    * Returns a text message of the user's new score
  * `POST /users/update` - Updated interests, snooze, or passwords for the current user
    * Include any of the following information:
      * api: An array of numbers corresponding to the desired interests
      * passwordFirst: String of the current password for the user
      * passwordThird: String of the new password for the user
      * snooze: Integer of the new snooze time
  * `DELETE /users` - Deletes the currently logged in user from the database
    * Returns the deleted user's information
