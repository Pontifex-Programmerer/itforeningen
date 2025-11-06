const dbhandler = require('./handler/dbhandler');
const express = require('express');
const member_routes = require('./routers/member_routes');
const default_routes = require('./routers/default_routes');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(member_routes);
app.use(default_routes);

app.listen(3000, async ()=>{
    await dbhandler.connectToDatabase('mongodb://127.0.0.1:27017/', 'itforeningen');
    console.info("app started! @ localhost:3000");
    console.info("version 0.00001");
})

    
