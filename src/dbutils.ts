const mysql = require('mysql2/promise');

class DatabaseUtils{

    constructor(){

    }
    static async createConnection() {

        return mysql.createPool({host: "localhost",
            user: "desireeAPI",
            password: '123456',
            database: 'pokemonapi',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    static async queryByName(pokemonName: string) {
        const con = await this.createConnection();
        const query = `SELECT * FROM pokemon WHERE name like '%${pokemonName}%'`;

        return con.query(query);
    }

    static async queryById(pokemonId: number) {
        const con = await this.createConnection();
        const query = `SELECT * FROM pokemon WHERE id = '${pokemonId}'`;

        return con.query(query);
    }

    static async queryByType(pokemonType: string) {
        const con = await this.createConnection();
        const query = `SELECT * FROM pokemon WHERE type1 like '%${pokemonType}' OR type2 like '%${pokemonType}%'`;

        return con.query(query);
    }
}

export default DatabaseUtils;

