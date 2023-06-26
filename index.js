const inquirer = require('inquire');

inquirer
    .prompt([
        {
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
        },
    ])
    .then((response) =>
        console.log(response)
    );