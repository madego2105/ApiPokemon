const mysql = require('mysql2/promise');

class DatabaseUtils{

    constructor(){

    }

    static async createConnection() {

        //pool de conexion con mysql
        return mysql.createPool({
            host: "localhost",
            user: "desireeAPI",
            password: '123456',
            database: 'pokemonapi',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    //query para consultar por los nombres de los pokemones
    static async queryByName(pokemonName: string) {
        const con = await this.createConnection();
        const query = `SELECT * FROM pokemon WHERE name like '%${pokemonName}%'`;

        return con.query(query);
    }

    //query para consultar por el ID de los pokemones
    static async queryById(pokemonId: number) {
        const con = await this.createConnection();
        const query = `SELECT * FROM pokemon WHERE id = '${pokemonId}'`;

        return con.query(query);
    }

    //query para consultar por el tipo de los pokemones
    static async queryByType(pokemonType: string) {
        const con = await this.createConnection();
        const query = `SELECT * FROM pokemon WHERE type1 like '%${pokemonType}' OR type2 like '%${pokemonType}%'`;

        return con.query(query);
    }

    //query para consultar el listado de pokemones legendarios o no legendarios
    static async queryByLegendary(boolean: string) {
        const con = await this.createConnection();
        const query = `SELECT * FROM pokemon WHERE legendary like '%${boolean}'`;

        return con.query(query);
    }

    //query para indicar el pokemon con el valor maximo de la columna que se indique (hp, attack, defense...)
    static async queryByHighest(columnName: string) {
        const con = await this.createConnection();
        const query = `SELECT * FROM pokemon WHERE ${columnName} = (SELECT MAX(${columnName}) from pokemon)`;

        return con.query(query);
    }

    //query para indicar el pokemon con el valor minimo de la columna que se indique (hp, attack, defense...)
    static async queryByLowest(columnName: string) {
        const con = await this.createConnection();
        const query = `SELECT * FROM pokemon WHERE ${columnName} = (SELECT MIN(${columnName}) from pokemon)`;

        return con.query(query);
    }

    //query para consultar por generaciones los pokemones
    static async queryByGeneration(num: string) {
        const con = await this.createConnection();
        const query = `SELECT * FROM pokemon WHERE generation = ${num}`;

        return con.query(query);
    }

}

export default DatabaseUtils;
