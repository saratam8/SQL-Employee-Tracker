DROP DATABASE IF EXISTS business_db;

CREATE DATABASE business_db;

USE business_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(6, 0),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
    REFERENCES employee_role(id)
);