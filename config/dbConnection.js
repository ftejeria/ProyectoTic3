const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'EXAMENES',
    port: process.env.PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
     console.log('db ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM examenes;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
             console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewName(nombre,periodo,semestre ,fecha,salon,horario) {
        
        try {
            
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO examenes (nombre,periodo,semestre,fecha,salon,horario) VALUES (?,?,?,?,?,?);";

                connection.query(query, [nombre,periodo,semestre ,fecha,salon,horario] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
           
            return {
                id_exam : insertId,
                nombre: name,
                fecha : fecha,
                periodo:periodo,
                semeste:semestre,
                salon: salon,
                periodo:periodo
            };
        } catch (error) {
            console.log(error);
        }
        
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM examenes WHERE id_exam = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";
    
                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;