INSERT INTO department (name)
VALUES  ("Hardware"),
        ("Software"),
        ("Systems");

INSERT INTO employee_role (title, salary, department_id)
VALUES  ("Software Developer", "80000", "2"),
        ("Electrical Engineer", "80000", "1"),
        ("Systems Engineer", "80000", "3");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Sara", "Tam", "2", "1"),
        ("Oliver", "Bob", "1", "2"),
        ("Hailey", "Birch", "3", "3");
