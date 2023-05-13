import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import DatabaseUtils from "./dbutils";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public')));

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const swaggerJsdoc = require("swagger-jsdoc");

console.log(__dirname);

/**
 * @swagger
 * /name/{pokemonName}/:
 *  get:
 *      summary: Returns the list of categories and subcategories
 *      parameters:
 *          -   in: path
 *              name: pokemonName
 *              schema:
 *                  type: string
 *              required: true
 *              description: Name of the pokemon
 *      responses:
 *          200:
 *              description: List of all pokemons which contains the value indicated
 *              content:
 *                  application/json
 *
 */
app.get('/name/:pokemonName', async (req: Request, res: Response) => {

    await DatabaseUtils.queryByName(req.params.pokemonName).then(
        result => res.send(result[0].length > 0 ? result[0] : "Not found")
    );
});

/**
 * @swagger
 * /id/{id}/:
 *  get:
 *      summary: Returns the pokemon which has the ID indicated
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: Pokedex ID of the pokemon
 *      responses:
 *          200:
 *              description: List the pokemon which contains the value indicated
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
 *      summary: Returns the pokemon which has the ID indicated
 *      parameters:
 *          -   in: path
 *              name: pokemonType
 *              schema:
 *                  type: string
 *              required: true
 *              description: "Type of Pokemon valid values: Normal, Fire, Water, Grass, Flying, Fighting, Poison, Electric, Ground, Rock, Psychic, Ice, Bug, Ghost, Steel, Dragon, Dark and Fairy."
 *      responses:
 *          200:
 *              description: List the pokemon which contains the value indicated
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
 * /image/{id}/:
 *  get:
 *      summary: Returns the pokemon which has the ID indicated
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: "Type of Pokemon valid values: Normal, Fire, Water, Grass, Flying, Fighting, Poison, Electric, Ground, Rock, Psychic, Ice, Bug, Ghost, Steel, Dragon, Dark and Fairy."
 *      responses:
 *          200:
 *              description: List the pokemon which contains the value indicated
 *              content:
 *                  application/json
 *
 */
app.get('/image/:id', async (req: Request, res: Response) => {
    //res.sendFile(`../resources/sprites/${req.params.id}`);
    res.send(`<img src="http://localhost:3000/pokemon/${req.params.id}.png" alt="pokemon">` || "Not found");
});

/**
 * @swagger
 * /legendary/{boolean}/:
 *  get:
 *      summary: Returns the pokemon which has the ID indicated
 *      parameters:
 *          -   in: path
 *              name: boolean
 *              schema:
 *                  type: boolean
 *              required: true
 *              description: "Type of Pokemon valid values: Normal, Fire, Water, Grass, Flying, Fighting, Poison, Electric, Ground, Rock, Psychic, Ice, Bug, Ghost, Steel, Dragon, Dark and Fairy."
 *      responses:
 *          200:
 *              description: List the pokemon which contains the value indicated
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
 *      summary: Returns the pokemon which has the ID indicated
 *      parameters:
 *          -   in: path
 *              name: columnName
 *              schema:
 *                  type: string
 *              required: true
 *              description: "Valid values: total, hp, attack, defense, spatk, spdef, speed"
 *      responses:
 *          200:
 *              description: List the pokemon which contains the value indicated
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
 *      summary: Returns the pokemon which has the ID indicated
 *      parameters:
 *          -   in: path
 *              name: columnName
 *              schema:
 *                  type: string
 *              required: true
 *              description: "Valid values: total, hp, attack, defense, spatk, spdef, speed"
 *      responses:
 *          200:
 *              description: List the pokemon which contains the value indicated
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
 *      summary: Returns the pokemon which has the ID indicated
 *      parameters:
 *          -   in: path
 *              name: num
 *              schema:
 *                  type: integer
 *              required: true
 *              description: "Valid values: total, hp, attack, defense, spatk, spdef, speed"
 *      responses:
 *          200:
 *              description: List the pokemon which contains the value indicated
 *              content:
 *                  application/json
 *
 */
app.get('/generation/:number', async (req: Request, res: Response) => {
    await DatabaseUtils.queryByGeneration(req.params.number).then(
        result => res.send(result[0].length > 0 ? result[0] : "Not found"));
});


const options = {
    definition: {
        swagger: "2.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./dist/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(specs, { explorer: true })
);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});