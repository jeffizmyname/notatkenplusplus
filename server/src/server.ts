import express, { Request, Response } from 'express';
import mysql, { Connection, QueryError } from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const port = 3001;

app.use(cors());

const connection: Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notatkiDB',
});

connection.connect((err: QueryError | null) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.use(bodyParser.json());

app.post('/register', (req: Request, res: Response) => {
    const { name, surName, email, password } = req.body;
    const passHash = crypto.createHash('md5').update(password).digest('hex');

    const sql = 'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connection.query(sql, [name, surName, email, passHash], (err: QueryError | null, results) => {
        if (err) {
            console.error('Error registering user: ', err);
            res.status(500).send('Error registering user');
        } else {
            console.log('User registered successfully');
            res.status(200).send('User registered successfully');
        }
    });
});

// Login endpoint
app.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;

    const passHash = crypto.createHash('md5').update(password).digest('hex');

    console.log(password + " " + passHash)

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(sql, [email, passHash], (err: QueryError | null, results) => {
        if (err) {
            console.error('Error logging in: ', err);
            res.status(500).send('Error logging in');
        } else {
            if (results instanceof Array && results.length > 0) {
                console.log('Login successful');
                res.status(200).send('Login successful');
            } else {
                console.log('Invalid username or password');
                res.status(401).send('Invalid username or password');
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});