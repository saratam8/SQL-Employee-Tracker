INSERT INTO department (name)
VALUES  ("Hardware"),
        ("Software"),
        ("Systems");

INSERT INTO employee_role (title, salary, department_id)
VALUES  ("engineer", "80000", "1"),
        ("engineer", "80000", "2"),
        ("engineer", "80000", "3");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Sara", "Tam", "1", "1"),
        ("Oliver", "Bob", "2", "2"),
        ("Hailey", "Birch", "3", "3");
