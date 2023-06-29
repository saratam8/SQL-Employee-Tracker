SELECT *
FROM employee_role
JOIN department ON employee_role.department_id = department.id;

SELECT *
FROM employee
JOIN employee_role ON employee.role_id = employee_role.id;

SELECT a.id, e.manager_id
FROM employee a, employee e
WHERE a.id = e.manager_id