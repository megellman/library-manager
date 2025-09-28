INSERT INTO book (title, author, year, available)
 VALUES
('Sense and Sensibility', 'Jane Austin', 1811, true),
('Moby-Dick', 'Herman Melville', 1851, false),
('Pride and Prejudice', 'Jane Austen', 1813, true),
('Crime and Punishment', 'Fyodor Dostoevsky', 1866, true),
('War and Peace', 'Leo Tolstoy', 1869, false),
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, true),
('The Catcher in the Rye', 'J.D. Salinger', 1951, true),
('Don Quixote', 'Miguel de Cervantes', 1605, false),
('Wuthering Heights', 'Emily Brontë', 1847, true),
('Great Expectations', 'Charles Dickens', 1861, true);


INSERT INTO member (name, contact)
VALUES 
('Alice Johnson', '555-123-4567'),
('Bob Smith', '555-234-5678'),
('Charlie Brown', '555-345-6789'),
('Diana Prince', '555-456-7890'),
('Ethan Hunt', '555-567-8901'),
('Fiona Gallagher', '555-678-9012'),
('George Miller', '555-789-0123'),
('Hannah Davis', '555-890-1234'),
('Isaac Newton', '555-901-2345'),
('Julia Roberts', '555-012-3456');


    SELECT columns FROM book UNION ALL SELECT columns FROM member UNION ALL SELECT columns FROM borrow_record