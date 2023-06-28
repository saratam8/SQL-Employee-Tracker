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
        console.log(response.display);
        if (response.display == "View all departments") {
            db.query('SELECT * FROM department', function(err, results) {
                console.table(results);
            });
        }
        else if (response.display === "View all roles") {
            db.query('SELECT * FROM employee_role', function(err, results) {
                console.table(results);
            });
        }
        else if (response.display === "View all employees") {
            db.query('SELECT * FROM employee', function(err, results) {
                console.table(results);
            });
        }
        else if (response.display === "Add a department") {
            addDepartment();
        }
        else if (response.display === "Add a role") {
            addRole();
        }
        else if (response.display === "Add an employee") {
            addEmployee();
        }
        else if (response.display === "Update an employee role") {
            updateEmployee();
        }
        else {
            console.log("Need response");
        }
    });

function addDepartment() {
    inquirer
        .prompt({
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        })
        .then((response) =>
            db.promise().query(`INSERT INTO department (name) VALUES ('${response.department}')`)
        );
};

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'input',
                name: 'department',
                message: 'Which department does the role belong to?'
            },
        ])
        .then((response) =>
            db.promise().query(`INSERT INTO employee_role (title, salary, department_id) VALUES ('${response.role}', ${response.salary}, ${response.department})`)
        );
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstname',
                message: 'What is the employees first name?'
            },
            {
                type: 'input',
                name: 'lastname',
                message: 'What is the employees last name?'
            },
            {
                type: 'input',
                name: 'role',
                message: 'What is the employees role?'
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Who is the employees manager'
            },
        ])
        .then((response) =>
            db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.firstname}', '${response.lastname}', '${response.role}', '${response.manager}')`)
        );
};

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'update',
                message: 'Which employees role do you want to update?'
            },
            {
                type: 'input',
                name: 'role',
                message: 'Which role do you want to assign the selected employee?'
            },
        ])
        .then((response) =>
            db.promise().query(`INSERT INTO department (name) VALUES ('${response.department}')`)
        );
};