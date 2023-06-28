const inquirer = require('inquire');
const generateOption = require('./lib/options.js');
const mysql = require('mysql2');
const db = require("./db")

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
        const {choice} = response;
        if (choice === "View all departments") {
            db.query('SELECT * FROM department', function(err, results) {
                console.table(results);
            });
        }
        else if (choice === "View all roles") {

        }
        else if (choice === "View all employees") {

        }
        else if (choice === "Add a department") {

        }
        else if (choice === "Add a role") {

        }
        else if (choice === "Add an employee") {

        }
        else if (choice === "Update an employee role") {

        }
    });