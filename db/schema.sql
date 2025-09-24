DROP DATABASE IF EXISTS library_db;
CREATE DATABASE library_db;

USE library_db;

CREATE TABLE book(
    id: INT PRIMARY KEY,
    title: VARCHAR(100),
    author: VARCHAR(50),
    year: INT,
    available: BOOLEAN,
);

CREATE TABLE member(
    id: INT PRIMARY KEY,
    name: VARCHAR(50),
    contact: VARCHAR(50)
);

CREATE TABLE borrow_record(
    id: INT PRIMARY KEY,
    book_id: INT,
    member_id: INT,
    borrow_date: DATE,
    due_date: DATE,
    return_date: DATE,
    FOREIGN KEY (book_id) REFERENCEs book(id),
    FOREIGN KEY (member_id) REFERENCES member(id),
);
