import express from 'express';
import playbackRouter from './routes/playback';
import retrievalRouter from './routes/retrieval';
import authRouter from './routes/auth';
import { requireLogin } from './utils/login-util';

const app = express();
const PORT = process.env.PORT || 3000;

// parse the req url, change and route
app.use('/', (req, res, next) => {
    let reqUrl = req.url.replace(/\/api/, '');
    req.url = reqUrl;
    next();
});

app.use('/auth', authRouter);

app.use('/playback', requireLogin, playbackRouter);

app.use('/retrieval', requireLogin, retrievalRouter);


app.listen(PORT, () => {
    console.log(`Starting is listening on port ${PORT}`);
});