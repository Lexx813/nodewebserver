const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// SETTING UP EXPRESS FOR HBS
hbs.registerPartials(__dirname = './views/partials')
app.set('view engine', 'hbs');




//EXPRESS MIDDLEWARE    
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});





// put it after middleware to block 
app.use(express.static(__dirname + '/public'));


// HBS HELPERS
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// ROUTES
app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the home page'
    });

});

app.get('/about', (req, res) => {
    res.render('about.hbs', {pageTitle: 'About Page'});
});

app.get('/bad', (req, res) => {
    res.send({errorMessage: 'this is a bad request'});
})



app.listen(port, () => {
    console.log(`server started ${port}`);
});
