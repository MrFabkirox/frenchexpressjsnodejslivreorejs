let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');

app.set('view engine', 'ejs')

app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(session({
  secret: 'somesec',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(require('./middlewares/flash'));

let ATLAS_URI=''

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
//     dbname: 'tigernodesandreact',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndexes: true
  }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB atlas connected");
})

// 1
// app.get('/', (request, response) => {
//   if (request.session.error) {
//     response.locals.error = request.session.error;
//     request.session.error = undefined
//   }
//   response.render('pages/index', { test: 'test variable' });
// });
// 
// app.post('/', (request, response) => {
//   if (request.body.message === undefined || request.body.message === '') {
//     // response.render('pages/index', {error: "no message"});
//     request.session.error = "Il y a une erreur"
//     response.redirect('/');
//   }
// });

app.get('/', (request, response) => {
  console.log(request.session);
  response.render('pages/index', { test: 'test variable' });
});

app.post('/', (request, response) => {
  if (request.body.message === undefined || request.body.message === '') {
    // response.render('pages/index', {error: "no message"});
    request.flash('error', "Pas de message.")
    response.redirect('/');
  } else {
    let Message = require('./models/message')
    Message.create(request.body.message, function() {
      request.flash('success', "Merci");
      response.redirect('/');
    });
  }
});
app.listen(8080);
