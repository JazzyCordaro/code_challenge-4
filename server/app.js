var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( { extended: false } );
var pg = require( 'pg' );
var connectionString = 'postgres://localhost:5432/week4challenge';
var port = process.env.PORT || 5000;

app.listen( '5000', 'localhost', function(){
  console.log( 'server up on ' + port );
}); //end server up

app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'server/public/views/index.html' ) );
  console.log(path.resolve('/server/public/index.html'));
});






app.get( '/treats', function( req, res ){
  console.log( 'in getTreats' );
  pg.connect( connectionString, function( err, client, done ){
    if( err ){
      console.log( err );
    }
    else{
      console.log( 'connected to db' );
      var resultsArray = [];
      var queryResults = client.query( 'SELECT * FROM week4challenge' );
      queryResults.on( 'row', function( row ){
        resultsArray.push( row );
      });
      queryResults.on( 'end', function(){
        done();
        res.send( resultsArray );
      });
    }
  });
});










app.use( express.static( 'server/public' ) );
