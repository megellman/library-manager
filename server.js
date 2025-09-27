import { input, select } from '@inquirer/prompts';
import mysql from 'mysql2/promise';
import dotenvx from '@dotenvx/dotenvx';
dotenvx.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'library_db',
});

const optionAnswer = await select({
    message: 'What would you like to do?',
    choices: [
        {value: 'view all books', name: 'view all books'}, {value: 'view all members', name: 'view all members'}, {value: 'view all borrow records', name: 'view all borrow records'}, {value: 'add a book', name: 'add a book'}, {value: 'add a member', name: 'add a member'}, {value: 'record a borrowing', name: 'record a borrowing'}, {value: 'record a return', name: 'record a return'}]
});

if(optionAnswer)

inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['view all books', 'view all members', 'view all borrow records', 'add a book', 'add a member', 'record a borrowing', 'record a return']
        }, {
            type: 'input',
            name: 'bookTitle',
            message: 'Please enter the title of the book',
            when: (answers) => answers.options === 'add a book',
        }, {
            type: 'input',
            name: 'bookAuthor',
            message: 'Please enter the author of the book',
            when: (answers) => answers.options === 'add a book',
        }, {
            type: 'input',
            name: 'bookPublicationYear',
            message: 'Please enter the publication year of the book',
            when: (answers) => answers.options === 'add a book',
        }, {
            type: 'input',
            name: 'memberName',
            message: 'Please enter the member\'s name',
            when: (answers) => answers.options === 'add a member',
        }, {
            type: 'input',
            name: 'memberContactInfo',
            message: 'Please enter the member\'s contact info',
            when: (answers) => answers.options === 'add a member',
        }, {
            type: 'list',
            name: 'borrowBookSelectMember',
            message: 'Who is borrowing the book?',
            choices: getMembers(),
            when: (answers) => answers.options === 'record a borrowing',
        }, {
            type: 'list',
            name: 'borrowBookSelectBook',
            message: 'What book are they borrowing?',
            choices: getBooks(),
            when: (answers) => answers.options === 'record a borrowing',
        }, {
            type: 'list',
            name: 'returnBook',
            message: 'Select a borrow record.',
            choices: getRecords(),
            when: (answers) => answers.options === 'record a return'
        }
    ])
    .then(async (answers) => {
        if (answers.options === 'add a book') {
            try {
                const [rows, fields] = await pool.execute('INSERT INTO book VALUES ?', [answers.bookTitle, answers.bookAuthor, answers.bookPublicationYear]);
                console.log([rows, fields]);
                console.table('Book Added', [rows, fields]);
            } catch (err) {
                console.error(err);
            }
        } if (answers.options === 'add a member') {
            try {
                const [rows, fields] = await pool.execute('INSERT INTO member VALUES ?', [answers.memberName, answers.memberContactInfo]);
                console.table('Member Added', [rows, fields]);
            } catch (err) {
                console.error(err);
            }
        } if (answers.options === 'record a borrowing') {
            try {
                const [rows, fields] = await pool.execute('INSERT INTO borrow_record VALUES ?', [borrowBookSelectMember, answers.borrowBookSelectBook])
            } catch (err) {
                console.error(err);
            }
        }
    })
    .catch((error) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Success')
        }
    })

async function getMembers() {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM member');
        return [rows, fields];
    } catch (error) {
        console.log(error);
    }
}

function getBooks() {
    console.log('hello world');
}

function getRecords() {
    console.log('hello world');
}