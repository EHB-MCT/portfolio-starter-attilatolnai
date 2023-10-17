const mysql = require('mysql');

const myDatabase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'wc1',
});

myDatabase.connect((err) => {
    if (err){
        console.error('Error connecting', err);
    } else {
        console.log('connected')
    }
});

module.exports = myDatabase;