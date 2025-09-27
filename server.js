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
        { value: 'view all books', name: 'view all books' }, { value: 'view all members', name: 'view all members' }, { value: 'view all borrow records', name: 'view all borrow records' }, { value: 'add a book', name: 'add a book' }, { value: 'add a member', name: 'add a member' }, { value: 'record a borrowing', name: 'record a borrowing' }, { value: 'record a return', name: 'record a return' }]
});

if (optionAnswer === 'view all books') {
    const [rows] = await pool.execute('SELECT * FROM book');
    console.table(rows);
} else if (optionAnswer === 'view all members') {
    const [rows] = await pool.execute('SELECT * FROM member');
    console.table(rows);
} else if (optionAnswer === 'view all borrow records') {
    const [rows] = await pool.execute('SELECT * FROM borrow_record');
    console.table(rows);
} else if (optionAnswer === 'add a book') {
    const book = {
        title: await input({ message: 'Please enter the book title.' }),
        author: await input({ message: 'Please enter the book author.' }),
        publicationYear: await input({ message: 'Please enter the book publication year.' })
    }
    const addedBook = await pool.execute('INSERT INTO book (title, author, year) VALUES (?, ?, ?)', [book.title, book.author, book.publicationYear]);
    console.log('Book added: ', answers);
} else if (optionAnswer === 'add a member') {
    const member = {
        name: await input({ message: 'Please enter their name.' }),
        contact: await input({ message: 'Please enter their contact information.' })
    };
    const addedMember = await pool.execute('INSERT INTO member (name, contact) VALUES (?, ?)', [member.name, member.contact]);
    console.log('Member added: ', member);
} else if (optionAnswer === 'record a borrowing') {
    async function getBooks() {
        const [rows] = await pool.execute('SELECT * FROM book');
        return rows;
    }
    const books = await getBooks();
    async function getMembers() {
        const [rows] = await pool.execute('SELECT * FROM member');
        return rows;
    }
    const members = await getMembers();

    const book = await select({
        message: 'What book is being borrowed?',
        choices: books.map(book => ({
            name: book.title + ' by ' + book.author,
            value: book.id
        }))
    });
    const member = await select({
        message: "Who is borrowing the book?",
        choices: members.map(member => ({
            name: member.name,
            value: member.id
        }))
    });

    let now = new Date();
    let due = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    let dueDate = due.toISOString().split('T')[0];

    const borrowRecord = await pool.execute('INSERT INTO borrow_record (book_id, member_id, due_date) VALUES (?, ?, ?)', [book, member, dueDate]);
    const [rows] = await pool.execute('SELECT book_id, member_id, borrow_date, due_date FROM borrow_record WHERE book_id = ? AND member_id = ?', [book, member])
    console.table(rows);
} else if (optionAnswer === 'record a return') {

}
