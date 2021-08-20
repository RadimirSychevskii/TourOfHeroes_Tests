var express = require('express');
var app = express();
var cors = require('cors');

heroes = [
{ id: 11, name: 'Dr Nice' },
{ id: 12, name: 'Narco' },
{ id: 13, name: 'Bombasto' },
{ id: 14, name: 'Celeritas' },
{ id: 15, name: 'Magneta' },
{ id: 16, name: 'RubberMan' },
{ id: 17, name: 'Dynama' },
{ id: 18, name: 'Dr IQ' },
{ id: 19, name: 'Magma' },
{ id: 20, name: 'Tornado' }
]
const errorChance = 0.1;


app.use(cors());
app.get('/', function(req, res){
    if(Math.floor(Math.random()*100) < errorChance*100)
        if(Math.floor(Math.random()*2) < 1)
            res.status(500).send('Unexpected server error(');
        else
            res.status(500).send();
    else{
        console.log('req for heroes');
        res.status(200).json(heroes);
    }
})
app.get('/:id', function(req, res){
    if(Math.floor(Math.random()*100) < errorChance*100)
        if(Math.floor(Math.random()*2) < 1)
            res.status(500).send('Unexpected server error(');
        else
            res.status(500).send('');
    else{
        const id = req.params.id;
        console.log(`req for hero whith id: ${id}`);
        resHero = heroes.find(hero => hero.id === Number(id));
        console.log(resHero);
        if (resHero === undefined)
            res.status(404).send('Hero does not exist');
        else
            res.json(resHero);
    }
})

var server = app.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Server is listening at http://${host}:${port}`)
})