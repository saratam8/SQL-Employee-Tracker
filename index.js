const inquirer = require('inquirer');

const db = require('./db/connection.js');

var departmentList = [];
var roleList = [];
var employeeList = [];

// Create array of the existing departments from the database
function populateDepartmentData() {
    db.query('SELECT * FROM department', function(err, results) {
        for(var i = 0; i < results.length; i++){
            departmentList[i] = results[i].name;
        }
    });
};

// Create array of the existing employee roles from the database
function populateRoleData() {
    db.query('SELECT * FROM employee_role', function(err, results) {
        for(var i = 0; i < results.length; i++){
            roleList[i] = results[i].title;
        }
    });
};

// Create array of the existing employees from the database
function populateEmployeeData() {
    db.query('SELECT * FROM employee', function(err, results) {
        for(var i = 0; i < results.length; i++){
            employeeList[i] = results[i].first_name + ' ' + results[i].last_name;
        }
    });
};

// Initial Prompt
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

// Start the first inquirer prompt
startPrompt();

// Main inquirer prompt
function startPrompt() {
    inquirer
        .prompt(tablePrompt).then((response) => {
            if (response.display == "View all departments") {
                db.promise().query('SELECT * FROM department')
                .then (([results]) => console.table(results))
                .then(() => startPrompt());
            }
            else if (response.display === "View all roles") {
                db.promise().query('SELECT * FROM employee_role')
                .then (([results]) => console.table(results))
                .then(() => startPrompt());
            }
            else if (response.display === "View all employees") {
                db.promise().query('SELECT * FROM employee') 
                .then (([results]) => console.table(results))
                .then(() => startPrompt());
            }
            else if (response.display === "Add a department") {
                addDepartment();
            }
            else if (response.display === "Add a role") {
                populateDepartmentData()
                addRole();
            }
            else if (response.display === "Add an employee") {
                populateRoleData();
                addEmployee();
            }
            else if (response.display === "Update an employee role") {
                populateEmployeeData();
                populateRoleData();
                updateEmployee();
            }
            else {
                console.log("Need response");
            }
        });
};

// Add department into the database using user input from a follow up inquirer prompt
function addDepartment() {
    inquirer
        .prompt({
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        })
        .then((response) =>
            db.promise().query(`INSERT INTO department (name) VALUES ('${response.department}')`)
        )
        .then(() => startPrompt());
};

// Add role into the database using user input from a follow up inquirer prompt
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
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: departmentList
            },
        ])
        .then((response) =>
            createNewRole(response)
        )
};

// query to add new role to the database
function createNewRole(data){
    db.promise().query(`INSERT INTO employee_role (title, salary) VALUES ('${data.role}', ${data.salary})`)
    .then(() => startPrompt());
}

// Add employee into the database using user input from a follow up inquirer prompt
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
                type: 'list',
                name: 'role',
                message: 'What is the employees role?',
                choices: roleList
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Who is the employees manager'
            },
        ])
        .then((response) =>
            addNewEmployee(response)
        );
};

// Insert the new employee into the database
function addNewEmployee(data) {
    db.promise().query(`INSERT INTO employee (first_name, last_name) VALUES ('${data.firstname}', '${data.lastname}')`)
    // , '${data.role}', '${data.manager}'
    .then(() => startPrompt());
};

// Update employee into the database using user input from a follow up inquirer prompt
function updateEmployee() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'update',
                message: 'Which employees role do you want to update?',
                choices: employeeList
            },
            {
                type: 'list',
                name: 'role',
                message: 'Which role do you want to assign the selected employee?',
                choices: roleList
            },
        ])
        .then((response) =>
            updateEmployeeInfo(response)
        );
};

// Supposed to update the database
function updateEmployeeInfo(data) {
    // db.promise().query(`UPDATE employee SET role_id = 1 WHERE id = 1`)
    // .then(() => startPrompt());
};