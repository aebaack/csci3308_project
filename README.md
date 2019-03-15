# csci3308_project
Repository for the project for group 111-2

# Setup instructions
* Open up Terminal and type:
  * `git clone https://github.com/aebaack/csci3308_project.git`
  * `cd csci3308_project`
  * `npm install -g knex`
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
  * `knex seed:run`
  * `node server.js`
* The server will now be running and will be accessible at `localhost:3000` in the browser
