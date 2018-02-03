var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

module.exports = {
    all: function(request, response) {
        Quote.find({}).sort('-votes').exec(function(err, result) {
            if (err) {
                response.json(err);
            } else {
                response.json(result);
            }
        })
    },
    create: function(request, response) {
        var quote = new Quote({quote: request.body.quote, author: request.body.author});
        quote.save(function(err, result) {
            if (err) {
                response.json({message:"error", result:err})
            } else {
                response.json({message:"success"})
            }
        })
    },
    updateQuote: function(request, response){
        console.log("@@@inside updateQuote");
        console.log(request.body,"this is the body");
        //console.log("@@request.header:: ", request.header);
        //console.log("@@request itself :: ", request)
        Quote.findOneAndUpdate(
            { "_id": request.params.id }, 
            { "$set": { 
                "quote": request.body.quote,
                "author": request.body.author,
                }
            }, {new: true},function(err, Quote){
                if(err) {console.log("@@@error updating Quote: "+err);throw err;}
                else {console.log("@@@updated Quote");response.json(Quote);}
                });
    },
    updateBy1: function(request, response) {
        Quote.update({_id: request.params.id}, {$inc: {votes: 1 }}, function(err, result) {
            if (err) {
                response.json(err);
            } else {
                Quote.find({}).sort('-votes').exec(function(err, result) {
                    if (err) {
                        response.json(err);
                    } else {
                        response.json(result);
                    }
                })
            }
        })
    },
    downVoteBy1: function(request, response) {
        console.log("@@HIT PATH vote up for id:", request.params.id);
        console.log("Request.params:", request.params)
        Quote.update({_id: request.params.id}, {$inc: {votes: -1 }}, function(err, result) {
            if (err) {
                response.json(err);
            } else {
                Quote.find({}).sort('-votes').exec(function(err, result) {
                    if (err) {
                        response.json(err);
                    } else {
                        response.json(result);
                    }
                })
            }
        })
    },
    deleteone: function(request, response) {
        console.log("inside delete one")
        Quote.remove({_id: request.params.id}, function(err, result) {
            if (err) {
                response.json(err);
            } else {
                console.log('Successful deletion');
                Quote.find({}, function(err, data) {
                    if (err) {
                        response.json(err);
                    } else {
                        response.json(data);
                    }
                })
            }
        })
    }
}