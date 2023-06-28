DROP DATABASE IF EXISTS business_db;

CREATE DATABASE business_db;

USE business_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- does not like it when CREATE TABLE role is used --
CREATE TABLE employee_role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(6, 0),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
    REFERENCES employee_role(id)
);

ALTER TABLE employee 
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
;