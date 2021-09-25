const express = require('express')
require('express-async-errors');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const store = require('./config/db').store
const connectDB = require('./config/db').connectDB
const layout = require('express-ejs-layouts')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const session = require('express-session')
const ejs = require('ejs')
const methodOverride = require('method-override')
const app = express()
const compression = require('compression')
const apicache = require('apicache');
let cache = apicache.middleware;
const errorHandler = require('./middleware/error')
const winston = require('winston')
require('winston-mongodb')

connectDB()

app.use(
    session({
        secret: "this_is_session_secret_key_07565434546",
        saveUninitialized:false,
        resave:false,
        store:store,

        cookie:{
            httpOnly:true,
            maxAge:1000*60*60*24,
            sameSite:'strict'
        }
    })
)

app.use(bodyParser.json())
app.locals.moment = require("moment");
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method',{
    methods:['POST', 'GET']
}))
app.use(compression())
app.use(cookieParser())
app.use(cors())
app.use(layout)
app.set('view engine', 'ejs')
app.set('views', './views')
/* Admin page routes */
app.use('/', require('./routes/admin/dashboard'))
app.use('/', require('./routes/categoryRouter'))
app.use('/', require('./routes/aboutRouter'))
app.use('/', require('./routes/adminMenRouter'))
app.use('/', require('./routes/contactRouter'))
app.use('/', require('./routes/linksRouter'))
app.use('/', require('./routes/news/uzbek/uzNewsRouter'))
app.use('/', require('./routes//news/russian/ruNewsRouter'))
app.use('/', require('./routes/news/english/enNewsRouter'))
app.use('/', require('./routes/recRouter'))
app.use('/', require('./routes/reclameRouter'))
app.use('/', require('./routes/user/userRouter'))
app.use('/', require('./routes/news/uzbek/uzVedioNewsRouter'))
app.use('/', require('./routes/news/english/enVedioNewsRouter'))
app.use('/', require('./routes/news/russian/ruVedioNewsRouter'))
app.use('/', require('./routes/searchRouter'))

/* Client page*/
app.use('/', require('./routes/client/mainRouter'))
app.use('/en', require('./routes/clienten/mainRouter'))
app.use('/ru', require('./routes/clientru/mainRouter'))


app.use('/public',express.static('public'));
app.use(express.static(path.join(__dirname + "/public/client")))
app.use(express.static(path.join(__dirname + "/public")))

winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost:27017/tahlil',
    collection: 'logs',
    options: {
        useUnifiedTopology: true,
    }
 }))   

app.use((req,res,next)=>{
    res.status(404)
    res.render('client/err',{
        layout:false
    })
    next()
})

app.use(errorHandler)
app.use(function (err, req,res,next){
    console.log(err)
    winston.error(err)
    if(err){
        res.render('client/err',{
            layout:false, msg:err
        })
    }
    next()
})

process.on('uncaughtException', ex=>{
    winston.error(ex.message, ex)
    process.exit(1);
})

process.on('unhandledRejection', ex=>{
    winston.error(ex.message, ex)
    process.exit(1);
})

app.listen(PORT, ()=>{
    console.log('Server is running to localhost')
})
