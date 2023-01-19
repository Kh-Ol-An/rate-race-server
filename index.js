require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.options(process.env.CLIENT_URL, function(req, res, next){
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'POST');
//     res.header("Access-Control-Allow-Headers", "accept, content-type");
//     res.header("Access-Control-Max-Age", "1728000");
//     return res.sendStatus(200);
// });
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
    } catch (err) {
        console.log(err);
    }
};
start();
