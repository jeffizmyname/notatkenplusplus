import express, { Request, Response } from 'express';
import mysql, { Connection, QueryError, RowDataPacket } from 'mysql2';
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

app.post('/getUserData', (req: Request, res: Response) => {
    const sql = 'SELECT id, name, surname, email FROM users WHERE email = ?'
    const { email } = req.body;

    connection.query(sql, email, (err: QueryError | null, results: RowDataPacket[]) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        //console.log('SQL Query:', connection.format(sql, email));
        res.json({ user: results[0] });
    })
})

app.post('/register', (req: Request, res: Response) => {
    const { name, surName, email, password } = req.body;
    const passHash = crypto.createHash('md5').update(password).digest('hex');


    const check = 'SELECT COUNT(*) as Count FROM users WHERE email = ?'
    const sql = 'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connection.query(check, email, (err: QueryError | null, results, fields) => {
        if (err) {
            console.error('Error querying the database:', err.message);
        } else {
            console.log("results " + JSON.stringify(results))
            const countValue = Array.isArray(results) && results.length > 0 && 'Count' in results[0] ? results[0].Count : undefined;
            // eslint-disable-next-line no-constant-condition
            if (countValue === 0) {
                res.status(200)
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
            } else {
                res.status(500).send("email in database");
            }
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


// app.post('/saveToDo', (req: Request, res: Response) => { 

// });

app.get('/todo/:userId', (req: Request, res: Response) => {
    const userId = req.params.userId;
    connection.query('SELECT * FROM ToDoS WHERE user_id = ?', userId, (err: QueryError | null, results: RowDataPacket[]) => {
        console.log('SQL Query:', connection.format('SELECT * FROM ToDoS WHERE user_id = ?', [userId]));
        if(err) {
            console.error("error sending todo")
            res.status(500).send(err)
        } else {
            res.status(200).json({userData: results})
        }
    });
});

app.post('/todo', (req: Request, res: Response) => {
    const starterData = '[{"isDone": false, "task": ""}]'
    const { user_id, Name, Author, Description} = req.body;
    const sql = 'INSERT INTO ToDoS (user_id, Name, Author, Description, Data) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [user_id, Name, Author, Description, starterData], (err: QueryError | null) => {
        console.log('SQL Query:', connection.format(sql, [user_id, Name, Author, Description]));
        if(err) {
            console.error("cant create TODO " + err);
            res.status(500).send('Error creating TODO');
        } else {
            res.status(200).json({ success: true });
        }
    });
});

//?sprobowac pozniej to wszytko jako jedno zapytanie napisac dla kazdego typu /:co/update

app.post('/todo/update', (req: Request, res: Response) => {
    const { id, user_id, Name, Author, Description, Data} = req.body;
    const sql = 'UPDATE ToDoS SET user_id=?, Name=?, Author=?, Description=?, Data=? WHERE id = ?';
    connection.query(sql, [user_id, Name, Author, Description, Data, id], (err: QueryError | null) => {
        console.log('SQL Query:', connection.format(sql, [user_id, Name, Author, Description]));
        if(err) {
            console.error("cant create TODO " + err);
            res.status(500).send('Error creating TODO');
        } else {
            res.status(200).json({ success: true });
        }
    });
})

app.get('/blank/:userId', (req: Request, res: Response) => {
    const userId = req.params.userId;
    connection.query('SELECT * FROM notes WHERE user_id = ?', userId, (err: QueryError | null, results: RowDataPacket[]) => {
        //console.log('SQL Query:', connection.format('SELECT * FROM ToDoS WHERE user_id = ?', [userId]));
        if(err) {
            console.error("error sending todo")
            res.status(500).send(err)
        } else {
            res.status(200).json({userData: results})
        }
    });
})

app.post('/blank', (req: Request, res: Response) => {
    const starterData = '[{"insert": "twój tekst..."}]'
    const { user_id, Name, Author, Description} = req.body;
    const sql = 'INSERT INTO notes (user_id, Name, Author, Description, Data) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [user_id, Name, Author, Description, starterData], (err: QueryError | null) => {
        //console.log('SQL Query:', connection.format(sql, [user_id, Name, Author, Description]));
        if(err) {
            console.error("cant create note " + err);
            res.status(500).send('Error creating note');
        } else {
            res.status(200).json({ success: true });
        }
    });
});

app.post('/blank/update', (req: Request, res: Response) => {
    const { id, user_id, Name, Author, Description, Data} = req.body;
    const sql = 'UPDATE notes SET user_id=?, Name=?, Author=?, Description=?, Data=? WHERE id = ?';
    connection.query(sql, [user_id, Name, Author, Description, Data, id], (err: QueryError | null) => {
        //console.log('SQL Query:', connection.format(sql, [user_id, Name, Author, Description]));
        if(err) {
            console.error("cant update Notes " + err);
            res.status(500).send('Error creating note');
        } else {
            res.status(200).json({ success: true });
        }
    });
})


app.post('/settings/newsletter', (req: Request, res: Response) => {
    const userId = req.body;
    const sql = 'UPDATE users SET newsletter=? WHERE id = ?';
    connection.query(sql, [userId], (err: QueryError | null) => {
        if(err) {
            console.error('setting didnt chagne ' + err);
            res.status(500).send('error chagning newsletter');
        } else {
            res.status(200).json({response: res})
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});