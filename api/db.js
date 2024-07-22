import mysql from 'mysql2';

const db = mysql.createConnection(
  process.env.DATABASE_URL
);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

export default db;


