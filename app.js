import express from 'express';
import config from './config/config';
import datasource from './config/datasource';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt-nodejs';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 7000)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const User = app.datasource.models.user;
app.route('/users')
.get((req, res) => {
    User.findAll({})
    .then(result => {
        res.json({result})
    })
    .catch(err => {
        res.status(412)
    })
})

app.route('/createuser')
.post((req, res) => {

    const nome = req.body.firstName;
    const sobrenome = req.body.lastName;
    const senha = req.body.password;
    const dbSenha = bcrypt.hashSync(senha);

    console.log(nome);
    console.log(sobrenome);

    User.create({
        firstName: nome,
        lastName: sobrenome,
        dbPassword: dbSenha
    })
    .then(result => {
        res.json({result})
    })
    .catch(err => {
        res.status(412)
    })
})


export default app;