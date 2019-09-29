import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as path from 'path';
import { Request, Response } from 'express';
import routes from './routes/index';

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use(routes);
    app.use(express.static((path.join(__dirname, '..', 'frontend'))));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));

    });

    app.listen(process.env.PORT);

    console.log('Express server has started on port 3000. Open http://localhost:3000/ to see results');

}).catch(error => console.log(error));

/**
 * db : vqageQ79AU
 * user : vqageQ79AU
 * pass : xeR9m15tv7
 * Server: remotemysql.com
 */
