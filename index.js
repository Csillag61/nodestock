const express = require('express');
const app = express();
const exphbs= require('express-handlebars');
const path= require('path');
const request= require('request');
const PORT =  process.env.PORT || 5000;
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//API KEY pk_282b874bcdb44f14b9917cb4312d42f5
//create call api func

function call_api(finishedAPI){
request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_282b874bcdb44f14b9917cb4312d42f5', {json:true}, (err, res, body) => {
    if(err){return console.log(err);}
    if (res.statusCode===200){
        //console.log(body);
        finishedAPI(body);
        };
    });
};

//set handlebar routes
//set handlebars middelware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
    call_api(function(doneAPI){
            res.render('home', {
            stock: doneAPI
        });
    });
});

// app.get('/', function (req, res) {
//     res.render('home');
// });


app.get('/about', function(req, res){
    res.render('about');
});

app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, ()=> console.log(`Server Listening on port ${PORT}`))