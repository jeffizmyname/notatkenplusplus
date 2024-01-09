import express, { Request, Response } from 'express';

//importy
import mysql, { Connection, QueryError, ResultSetHeader, RowDataPacket } from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import crypto from 'crypto';
import multer from 'multer';

//expres and port deklaracja
const app = express();
const port = 3001;

//filtruje pliki na avatara
const fileFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error('Invalid file type. Only image files are allowed.'));
    }
};

//storage
const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter });



app.use(cors());

//połaczenie z baza danych
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

//********** */
//*ZAPYTANIA
//********** */


//pobiera informacje o uzytkowniku
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

//aktualizacja danych o uzytkowniku
app.post('/updateUserData', (req: Request, res: Response) => {
    const { name, surname, email, id } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required for updating user information.' });
    }

    connection.query('SELECT id FROM users WHERE email = ? AND id <> ?', [email, id], (emailCheckErr: QueryError | null, emailCheckResults: RowDataPacket[]) => {
        if (emailCheckErr) {
            console.error('Error checking email uniqueness:', emailCheckErr);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (emailCheckResults.length > 0) {
            return res.status(400).json({ error: 'Tego emaila juz ktoś używa.' });
        }

        const updateSql = 'UPDATE users SET name = ?, surname = ?, email = ? WHERE id = ?';

        connection.query(updateSql, [name, surname, email, id], (updateErr: QueryError | null, updateResults: ResultSetHeader) => {
            console.log('SQL Query:', connection.format(updateSql, [name, surname, email, id]));

            if (updateErr) {
                console.error('Error updating user information:', updateErr);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (updateResults.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ message: 'User information updated successfully' });
        });
    });
});



//zajmuje sie rejestracja
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

//zajmuje sie logowaniem
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


//wyszukiwane todo
app.get('/todo/:userId', (req: Request, res: Response) => {
    const userId = req.params.userId;
    connection.query('SELECT * FROM ToDoS WHERE user_id = ?', userId, (err: QueryError | null, results: RowDataPacket[]) => {
        console.log('SQL Query:', connection.format('SELECT * FROM ToDoS WHERE user_id = ?', [userId]));
        if (err) {
            console.error("error sending todo")
            res.status(500).send(err)
        } else {
            res.status(200).json({ userData: results })
        }
    });
});


//nowe todo
app.post('/todo', (req: Request, res: Response) => {
    const starterData = '[{"isDone": false, "task": ""}]'
    const { user_id, Name, Author, Description } = req.body;
    const sql = 'INSERT INTO ToDoS (user_id, Name, Author, Description, Data) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [user_id, Name, Author, Description, starterData], (err: QueryError | null) => {
        console.log('SQL Query:', connection.format(sql, [user_id, Name, Author, Description]));
        if (err) {
            console.error("cant create TODO " + err);
            res.status(500).send('Error creating TODO');
        } else {
            res.status(200).json({ success: true });
        }
    });
});


//update todo
app.post('/todo/update', (req: Request, res: Response) => {
    const { id, user_id, Name, Author, Description, Data } = req.body;
    const sql = 'UPDATE ToDoS SET user_id=?, Name=?, Author=?, Description=?, Data=? WHERE id = ?';
    connection.query(sql, [user_id, Name, Author, Description, Data, id], (err: QueryError | null) => {
        console.log('SQL Query:', connection.format(sql, [user_id, Name, Author, Description]));
        if (err) {
            console.error("cant create TODO " + err);
            res.status(500).send('Error creating TODO');
        } else {
            res.status(200).json({ success: true });
        }
    });
})

//usun todo
app.post('/todo/delete', (req: Request, res: Response) => {
    const { id } = req.body;
    const sql = 'DELETE FROM ToDoS WHERE id = ?';
    connection.query(sql, [id], (err: QueryError | null) => {
        if (err) {
            console.error("cant delete TODO " + err);
            res.status(500).send('Error deleting TODO');
        } else {
            res.status(200).json({ success: true });
        }
    });
})

//wszukiwanie notatek
app.get('/blank/:userId', (req: Request, res: Response) => {
    const userId = req.params.userId;
    connection.query('SELECT * FROM notes WHERE user_id = ?', userId, (err: QueryError | null, results: RowDataPacket[]) => {
        //console.log('SQL Query:', connection.format('SELECT * FROM ToDoS WHERE user_id = ?', [userId]));
        if (err) {
            console.error("error sending todo")
            res.status(500).send(err)
        } else {
            res.status(200).json({ userData: results })
        }
    });
})

//dodawanie notatek
app.post('/blank', (req: Request, res: Response) => {
    const starterData = '[{"insert": "twój tekst..."}]'
    const { user_id, Name, Author, Description } = req.body;
    const sql = 'INSERT INTO notes (user_id, Name, Author, Description, Data) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [user_id, Name, Author, Description, starterData], (err: QueryError | null) => {
        //console.log('SQL Query:', connection.format(sql, [user_id, Name, Author, Description]));
        if (err) {
            console.error("cant create note " + err);
            res.status(500).send('Error creating note');
        } else {
            res.status(200).json({ success: true });
        }
    });
});


//ktualizacja notatek
app.post('/blank/update', (req: Request, res: Response) => {
    const { id, user_id, Name, Author, Description, Data } = req.body;
    const sql = 'UPDATE notes SET user_id=?, Name=?, Author=?, Description=?, Data=? WHERE id = ?';
    connection.query(sql, [user_id, Name, Author, Description, Data, id], (err: QueryError | null) => {
        //console.log('SQL Query:', connection.format(sql, [user_id, Name, Author, Description]));
        if (err) {
            console.error("cant update Notes " + err);
            res.status(500).send('Error creating note');
        } else {
            res.status(200).json({ success: true });
        }
    });
})

//usuwanie notatek
app.post('/blank/delete', (req: Request, res: Response) => {
    const { id } = req.body;
    const sql = 'DELETE FROM notes WHERE id = ?';
    connection.query(sql, [id], (err: QueryError | null) => {
        if (err) {
            console.error("cant delete note " + err);
            res.status(500).send('Error deleting note');
        } else {
            res.status(200).json({ success: true });
        }
    });
})

//********************SETTINGS*******************


app.post('/settings/newsletterChange', (req: Request, res: Response) => {
    const { isSelected, id } = req.body;
    const sql = 'UPDATE users SET newsletter= ? WHERE id = ?';
    connection.query(sql, [isSelected, id], (err: QueryError | null) => {
        console.log('SQL Query:', connection.format(sql, [isSelected, id]));
        if (err) {
            console.error('setting didnt chagne ' + err);
            res.status(500).send('error chagning newsletter');
        } else {
            res.status(200).json({ success: true })
        }
    })
})

app.post('/settings/newsletter', (req: Request, res: Response) => {
    const { id } = req.body;
    const sql = 'SELECT newsletter FROM users WHERE id=?';
    connection.query(sql, [id], (err: QueryError | null, results: RowDataPacket[]) => {
        if (err) {
            console.error("coundt send newsletter status " + err);
            res.status(500).send("error in reciving newsletter")
        } else {
            res.status(200).json({ success: true, res: results })
        }
    })
})

app.post('/settings/upload', upload.single('file'), async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;

        if (!userId || !req.file) {
            return res.status(400).json({ error: 'Invalid request' });
        }

        const imageBuffer = req.file.buffer;

        connection.query(
            'UPDATE users SET profilePicture = ? WHERE id = ?',
            [imageBuffer, userId],
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                res.json({ message: 'Profile picture updated successfully' });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/settings/pfp/:userId', (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ error: 'Invalid request' });
        }

        connection.query(
            'SELECT profilePicture FROM users WHERE id = ?',
            [userId],
            (err, results: RowDataPacket[]) => {
                //console.log('SQL Query:', connection.format('SELECT profilePicture FROM users WHERE id = ?', [userId]));
                //console.log(results[0])
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if (results.length === 0 || !results[0].profilePicture) {
                    return res.status(404).json({ error: 'Profile picture not found' });
                }

                const profilePicture = results[0].profilePicture as Buffer;
                res.setHeader('Content-Type', 'image/jpeg'); // Set the appropriate content type
                res.end(profilePicture, 'binary');
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//********************CALENDAR*******************


app.post('/calendar/addTask', (req: Request, res: Response) => {
    const { id, string } = req.body;
    const sql = 'INSERT INTO calendarevents (user_id, Data) VALUES (?, ?)'
    connection.query(sql, [id, string], (err: QueryError | null) => {
        if (err) {
            console.error("cant create calednar event " + err);
            res.status(500).send("error creating calerndar event")
        } else {
            res.status(200).json({ success: true })
        }
    })
})

app.post('/calendar/getTask', (req: Request, res: Response) => {
    const { id, date } = req.body
    const sql = 'SELECT Data FROM calendarevents WHERE user_id = ? AND JSON_EXTRACT(data, \'$.date\') = ?'
    connection.query(sql, [id, date], (err: QueryError | null, results: RowDataPacket[]) => {
        if (err) {
            console.error("cant send task data " + err);
            res.status(500).send("error sending task data")
        } else {
            res.status(200).json({ success: true, res: results })
        }
    })
})

app.post('/calendar/getAllTask', (req: Request, res: Response) => {
    const { id } = req.body
    const sql = 'SELECT Data FROM calendarevents WHERE user_id = ?'
    connection.query(sql, [id], (err: QueryError | null, results: RowDataPacket[]) => {
        if (err) {
            console.error("cant send task data " + err);
            res.status(500).send("error sending task data")
        } else {
            res.status(200).json({ success: true, res: results })
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});