# 12 SQL: Library Manager

## Your Task

Libraries often need simple systems for tracking books, members, and borrowing records. Your assignment this week is to build a command-line application from scratch to manage a library’s inventory and member activity, using Node.js, Inquirer, and MySQL.

Because this application won’t be deployed, you’ll also need to create a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met. You’ll need to submit a link to the video and add it to the README of your project.

## User Story

AS A librarian  
I WANT to be able to view and manage the books, members, and borrowing records in my library  
SO THAT I can keep track of my collection and who has borrowed what  

## Acceptance Criteria

GIVEN a command-line application that accepts user input  
WHEN I start the application  
THEN I am presented with the following options: view all books, view all members, view all borrow records, add a book, add a member, record a borrowing, record a return  
WHEN I choose to view all books  
THEN I am presented with a formatted table showing book ids, titles, authors, and availability  
WHEN I choose to view all members  
THEN I am presented with a formatted table showing member ids, names, and contact information  
WHEN I choose to view all borrow records  
THEN I am presented with a formatted table showing which member borrowed which book and the due date  
WHEN I choose to add a book  
THEN I am prompted to enter the title, author, and publication year and that book is added to the database  
WHEN I choose to add a member  
THEN I am prompted to enter the member’s name and contact info and that member is added to the database  
WHEN I choose to record a borrowing  
THEN I am prompted to select a member and a book, and a borrow record is created with a due date, marking the book as unavailable  
WHEN I choose to record a return  
THEN I am prompted to select a borrow record, and the book is marked available again  

## Getting Started

You’ll need to use the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to your MySQL database and perform queries, the [Inquirer package](https://www.npmjs.com/package/inquirer) to interact with the user via the command line, and the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.

**Important**: You will be committing a file that contains your database credentials. Make sure that your MySQL password is not used for any other personal accounts, because it will be visible on GitHub. In upcoming lessons, you will learn how to better secure this password, or you can start researching npm packages now that could help you.

You might also want to make your queries asynchronous. MySQL2 exposes a `.promise()` function on Connections to upgrade an existing non-Promise connection to use Promises. To learn more and make your queries asynchronous, refer to the [npm documentation on MySQL2](https://www.npmjs.com/package/mysql2).

Design the database schema as shown in the following image:

![Database schema includes tables labeled “book,” “member,” and “borrow_record.”](./Assets/12-sql-library-schema.png)

As the image illustrates, your schema should contain the following three tables:

* `book`  
    * `id`: `INT PRIMARY KEY`  
    * `title`: `VARCHAR(100)` to hold book title  
    * `author`: `VARCHAR(50)` to hold book author  
    * `year`: `INT` to hold year of publication  
    * `available`: `BOOLEAN` to show if the book is available  

* `member`  
    * `id`: `INT PRIMARY KEY`  
    * `name`: `VARCHAR(50)` to hold member name  
    * `contact`: `VARCHAR(50)` to hold member contact info  

* `borrow_record`  
    * `id`: `INT PRIMARY KEY`  
    * `book_id`: `INT` to reference the borrowed book  
    * `member_id`: `INT` to reference the borrowing member  
    * `borrow_date`: `DATE` to hold date borrowed  
    * `due_date`: `DATE` to hold due date  
    * `return_date`: `DATE` to hold date returned (nullable)  

You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. You might also want to include a `seeds.sql` file to pre-populate your database, making the development of individual features much easier.

## Bonus

Try to add some additional functionality to your application, such as the ability to do the following:

* View overdue books.  
* View currently borrowed books by member.  
* Delete members or books.  
* Update member contact info.  
* Generate a report of most borrowed books.  
