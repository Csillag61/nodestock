const express = require('express');
const app = express();
const exphbs= require('express-handlebars');
const path= require('path');
const request= require('request');
const bodyParser = require('body-parser');
const PORT =  process.env.PORT || 5000;


//set handlebars middelware
app.use(bodyParser.urlencoded({extended:false}));


//create call api func
function call_api(finishedAPI, ticker){
request('https://cloud.iexapis.com/stable/stock/' + ticker +
'/quote?token=pk_282b874bcdb44f14b9917cb4312d42f5', {json:true}, (err, res, body) => {
    if(err){return console.log(err);}
    if (res.statusCode===200){
        //console.log(body);
       return finishedAPI(body);
        };
    });
};

//set handlebar middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const others='hello stuff';

app.get('/', function (req, res){
    call_api(function(doneAPI){
            res.render('home', {
            stock: doneAPI,
        });
    }, 'fb');
});
//set handlebar index POST route
app.post('/', function (req, res) {
    call_api(function(doneAPI){
            res.render('home', {
            stock: doneAPI, 
        });
    },req.body.stock_ticker);
});


app.get('/about.html', function(req, res){
    res.render('about');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=> console.log(`Server Listening on port ${PORT}`));