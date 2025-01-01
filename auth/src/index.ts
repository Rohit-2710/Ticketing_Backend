import express from 'express';
import {json} from 'body-parser';

import {currentUserRouter} from './routes/current-user';
import {singupRouter} from './routes/signup';
import {singinRouter} from './routes/signin';
import {signoutRouter} from './routes/signout';


const app = express();
app.use(json());
app.use([currentUserRouter, singupRouter, singinRouter, signoutRouter]);


app.listen(3000, () => { 
    console.log('Auth service listening on port 3000 !');
})