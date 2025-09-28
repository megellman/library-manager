DROP DATABASE IF EXISTS library_db;
CREATE DATABASE library_db;

USE library_db;

CREATE TABLE book(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(50),
    year INT,
    available BOOLEAN DEFAULT 1
);

CREATE TABLE member(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    contact VARCHAR(50)
);

CREATE TABLE borrow_record(
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    member_id INT,
    borrow_date TIMESTAMP DEFAULT NOW(),
    due_date DATE,
    return_date DATE,
    FOREIGN KEY (book_id) REFERENCES book(id),
    FOREIGN KEY (member_id) REFERENCES member(id)
);

SELECT book.id AS book_id, book.title, book.author, borrow_record.borrow_date, borrow_record.due_date, member.id AS member_id, member.name 
FROM book 
INNER JOIN borrow_record 
ON book.id = borrow_record.book_id 
LEFT JOIN member 
ON borrow_record.member_id = member.id
WHERE return_date IS NULL