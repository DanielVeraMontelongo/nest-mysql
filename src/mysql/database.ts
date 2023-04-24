import * as mysql from 'mysql2/promise';

export const connect = async (): Promise<mysql.Connection> => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'codenotch',
    database: 'escuela',
  });

  return connection;
};
