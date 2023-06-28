const inquirer = require('inquirer');
const generateOption = require('./lib/options.js');

const db = require('./db/connection.js');

const tablePrompt = {
    type: 'list',
    name: 'display',
    message: 'What do you want to do?',
    choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
    ],
};

inquirer
    .prompt(tablePrompt).then((response) => {
        // const {choice} = response;
        console.log(response.display);
        if (response.display == "View all departments") {
            console.log("here");
            db.query('SELECT * FROM department', function(err, results) {
                console.table(results);
            });
        }
        else if (response.display === "View all roles") {

        }
        else if (response.display === "View all employees") {

        }
        else if (response.display === "Add a department") {

        }
        else if (response.display === "Add a role") {

        }
        else if (response.display === "Add an employee") {

        }
        else if (response.display === "Update an employee role") {

        }
        else {
            console.log("Need response");
        }
    });