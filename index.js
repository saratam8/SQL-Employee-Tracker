const inquirer = require('inquirer');
const generateOption = require('./lib/options.js');

const db = require('./db/connection.js');

var departmentList = [];
var roleList = [];
var employeeList = [];

function populateDepartmentData() {
    db.query('SELECT * FROM department', function(err, results) {
        for(var i = 0; i < results.length; i++){
            departmentList[i] = results[i].name;
        }
    });
};

function populateRoleData() {
    db.query('SELECT * FROM employee_role', function(err, results) {
        for(var i = 0; i < results.length; i++){
            roleList[i] = results[i].title;
        }
    });
};

function populateEmployeeData() {
    db.query('SELECT * FROM employee', function(err, results) {
        for(var i = 0; i < results.length; i++){
            employeeList[i] = results[i].first_name + ' ' + results[i].last_name;
        }
    });
};

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
                console.log(results[0].name);
                // for(var i = 0; i < results.length; i++){
                //     departmentList[i] = results[i].name;
                // }
                // console.log(departmentList);
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
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: departmentList
            },
        ])
        .then((response) =>
            createNewRole(response)
        );
};

function createNewRole(data){
    // db.promise().query(`SELECT name FROM department WHERE name in ${data.department}`);
    console.log(data);
    db.promise().query(`INSERT INTO employee_role (title, salary) VALUES ('${data.role}', ${data.salary})`)
}

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

function addNewEmployee(data) {
    console.log(data);
    db.promise().query(`INSERT INTO employee (first_name, last_name) VALUES ('${data.firstname}', '${data.lastname}')`);
    // , '${data.role}', '${data.manager}'
};

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

function updateEmployeeInfo(data) {
    // db.promise().query(`UPDATE employee SET role_id = 1 WHERE id = 1`)
};