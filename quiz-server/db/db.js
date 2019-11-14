import  mysql from 'mysql'

const connection=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"quiz"
})


export default connection;