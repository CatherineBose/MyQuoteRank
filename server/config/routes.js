var Quotes = require('../controllers/quotes.js');
var mongoose = require('mongoose');
var Quote = mongoose.model('Quote')

module.exports = function(app) {
    //Get all quotes
    app.get('/quotes', function(request, response) {
        console.log('Get all route is hit in route.js');
        Quotes.all(request, response)
    })
    //Create a quote
    app.post('/quotes', function(request, response) {
        console.log('CreateQuotes at route hit');
        Quotes.create(request, response)
    })
    //update a quote
    app.put("/quotes/:id", (request, response)=> {
        Quotes.updateQuote(request,response);
    })
    //Upvote (votes)
    app.put('/quotes/upvote/:id', function(request, response) {
        console.log("Routes.js for upvote id", request.id);
        Quotes.updateBy1(request, response)
    })
    // Downvote (votes)
    console.log("@@Route.js Downvote hit")
    app.get('/quotes/downvote/:id', function(request, response) {
        Quotes.downVoteBy1(request, response)
    })
    //Delete a quote
    app.delete('/quotes/delete/:id', function(request, response) {
        console.log('DeleteQuot route is hit');
        Quotes.deleteone(request, response)
    })
    
}
