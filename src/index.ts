//importaciones de las librerias necesarias
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import DatabaseUtils from "./dbutils";
import path from "path";

//cargar las variables de entorno
dotenv.config();
const cors = require('cors');
const app: Express = express();

//habilitar el uso de cors
app.use(cors())

//indicar el puerto
const port = process.env.PORT || 3000;

//para que se pueda utilizar la carpeta de public
app.use(express.static(path.join(__dirname, '../public')));

//vincular a swagger
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const swaggerJsdoc = require("swagger-jsdoc");

//primer bloque de codigo de formato preestablecido que permite añadir la documentacion a Swagger
//y que permite gestionar la peticion
/**
 * @swagger
 * /name/{pokemonName}/:
 *  get:
 *      summary: Devuelve el listado de todos los pokémones que contengan el valor indicado (caracter o caracteres)
 *      parameters:
 *          -   in: path
 *              name: pokemonName
 *              schema:
 *                  type: string
 *              required: true
 *              description: Nombre del pokémon
 *      responses:
 *          200:
 *              description: Listado de todos los pokémones que contengan el valor indicado
 *              content:
 *                  application/json
 *
 */

//operador ternario que gestiona si la peticion es valida y devuelve respuesta o no valida y devuelve un 'Not found'
app.get('/name/:pokemonName', async (req: Request, res: Response) => {

    await DatabaseUtils.queryByName(req.params.pokemonName).then(
        result => res.send(result[0].length > 0 ? result[0] : "Not found")
    );

});

//segundo bloque de formato preestablecido. Estos bloques se repiten por cada tipo de peticion
/**
 * @swagger
 * /id/{id}/:
 *  get:
 *      summary: Devuelve el listado de todos los pokémones que contengan el ID indicado
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: ID de la Pokédex
 *      responses:
 *          200:
 *              description: Listado de todos los pokémones que contengan el valor indicado
 *              content:
 *                  application/json
 *
 */

app.get('/id/:pokemonId', async (req: Request, res: Response) => {

    await DatabaseUtils.queryById(Number(req.params.pokemonId)).then(
        result => res.send(result[0].length > 0 ? result[0] : "Not found")
    );
});

/**
 * @swagger
 * /type/{pokemonType}/:
 *  get:
 *      summary:  Devuelve el tipo del pokémon (Normal, Fuego, Agua, Planta, Acero, Bicho, Hada, Lucha, etc)
 *      parameters:
 *          -   in: path
 *              name: pokemonType
 *              schema:
 *                  type: string
 *              required: true
 *              description: Tipo del pokémon
 *      responses:
 *          200:
 *              description: Listado de todos los pokémones que contengan el valor indicado
 *              content:
 *                  application/json
 *
 */

app.get('/type/:pokemonType', async (req: Request, res: Response) => {

    await DatabaseUtils.queryByType(req.params.pokemonType).then(
        result => res.send(result[0].length > 0 ? result[0] : "Not found")
    );
});

/**
 * @swagger
 * /legendary/{boolean}/:
 *  get:
 *      summary: Devuelve la lista de pokémones que son legendarios o no
 *      parameters:
 *          -   in: path
 *              name: boolean
 *              schema:
 *                  type: boolean
 *              required: true
 *              description: Indica si un pokémon es legendario o no
 *      responses:
 *          200:
 *              description: Listado de todos los pokémones que contengan el valor indicado
 *              content:
 *                  application/json
 *
 */

app.get('/legendary/:boolean', async (req: Request, res: Response) => {
    await DatabaseUtils.queryByLegendary(req.params.boolean).then(
    result => res.send(result[0].length > 0 ? result[0] : "Not found"));
});

/**
 * @swagger
 * /highest/{columnName}/:
 *  get:
 *      summary: Devuelve el pokémon con el valor máximo de la columna que se indique (hp, attack, defense, etc)
 *      parameters:
 *          -   in: path
 *              name: columnName
 *              schema:
 *                  type: string
 *              required: true
 *              description: Pokémon con el valor máximo de una de las columnas
 *      responses:
 *          200:
 *              description: Listado de todos los pokémones que contengan el valor indicado
 *              content:
 *                  application/json
 *
 */

app.get('/highest/:columnName', async (req: Request, res: Response) => {
    await DatabaseUtils.queryByHighest(req.params.columnName).then(
        result => res.send(result[0].length > 0 ? result[0] : "Not found"));
});

/**
 * @swagger
 * /lowest/{columnName}/:
 *  get:
 *      summary: Devuelve el pokémon con el valor mínimo de la columna que se indique (hp, attack, defense, etc)
 *      parameters:
 *          -   in: path
 *              name: columnName
 *              schema:
 *                  type: string
 *              required: true
 *              description: Pokémon con el valor mínimo de una de las columnas
 *      responses:
 *          200:
 *              description: Listado de todos los pokémones que contengan el valor indicado
 *              content:
 *                  application/json
 *
 */

app.get('/lowest/:columnName', async (req: Request, res: Response) => {
    await DatabaseUtils.queryByLowest(req.params.columnName).then(
        result => res.send(result[0].length > 0 ? result[0] : "Not found"));
});

/**
 * @swagger
 * /generation/{num}/:
 *  get:
 *      summary: Devuelve el listado de todos los pokémones que pertenezcan a la generación indicada
 *      parameters:
 *          -   in: path
 *              name: num
 *              schema:
 *                  type: integer
 *              required: true
 *              description: Generación del pokémon
 *      responses:
 *          200:
 *              description: Listado de todos los pokémones que contengan el valor indicado
 *              content:
 *                  application/json
 *
 */

app.get('/generation/:number', async (req: Request, res: Response) => {
    await DatabaseUtils.queryByGeneration(req.params.number).then(
        result => res.send(result[0].length > 0 ? result[0] : "Not found"));
});

//cabecera de la documentacion de Swagger (aparecera al principio de la pagina) y configuracion
const options = {
    definition: {
        swagger: "2.0",
        info: {
            title: "ApiPokemon",
            version: "0.1.0",
            description:
                "API creada por M. Desirée González como proyecto de fin de FP (Desarrollo de Aplicaciones Multiplataforma). Junio de 2023.",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./dist/index.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    '/apipokemon_desiree',
    swaggerUI.serve,
    swaggerUI.setup(specs, { explorer: true })
);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});