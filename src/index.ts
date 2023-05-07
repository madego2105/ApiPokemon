import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import DatabaseUtils from "./dbutils";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public')));

console.log(__dirname);

app.get('/name/:pokemonName', async (req: Request, res: Response) => {

    await DatabaseUtils.queryByName(req.params.pokemonName).then(
        result => res.send(result[0].length > 0 ? result[0] : "Not found")
    );
});

app.get('/id/:pokemonId', async (req: Request, res: Response) => {

    await DatabaseUtils.queryById(Number(req.params.pokemonId)).then(
        result => res.send(result[0].length > 0 ? result[0] : "Not found")
    );
});

app.get('/type/:pokemonType', async (req: Request, res: Response) => {

    await DatabaseUtils.queryByType(req.params.pokemonType).then(
        result => res.send(result[0].length > 0 ? result[0] : "Not found")
    );
});

app.get('/image/:id', async (req: Request, res: Response) => {
    //res.sendFile(`../resources/sprites/${req.params.id}`);
    res.send(`<img src="http://localhost:3000/pokemon/${req.params.id}.png" alt="pokemon">` || "Not found");
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});