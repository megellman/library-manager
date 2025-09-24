const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['view all books', 'view all members', 'view all borrow records', 'add a book', 'add a member', 'record a borrowing', 'record a return']
        },{
            type: 'input',
            name: 'bookTitle',
            message: 'Please enter the title of the book',
            when: (answers) => answers.options === 'add a book',
        },{
            type: 'input',
            name: 'bookAuthor',
            message: 'Please enter the author of the book',
            when: (answers) => answers.options === 'add a book', 
        },{
            type: 'input',
            name: 'bookPublicationYear',
            message: 'Please enter the publication year of the book',
            when: (answers) => answers.options === 'add a book', 
        },{
            type: 'input',
            name: 'memberName',
            message: 'Please enter the member\'s name',
            when: (answers) => answers.options === 'add a member',
        },{
            type: 'input',
            name: 'memberContactInfo',
            message: 'Please enter the member\'s contact info',
            when: (answers) => answers.options === 'add a member',
        },{
            type: 'list',
            name: 'borrowBookSelectMember',
            message: 'Who is borrowing the book?',
            choices: getMembers(),
            when: (answers) => answers.options === 'record a borrowing',
        },{
            type: 'list',
            name: 'borrowBookSelectBook',
            message: 'What book are they borrowing?',
            choices: getBooks(),
            when: (answers) => answers.options === 'record a borrowing',
        },{
            type: 'list',
            name: 'returnBook',
            message: 'Select a borrow record.',
            choices: getRecords(),
            when: (answers) => answers.options === 'record a return'
        }
    ])