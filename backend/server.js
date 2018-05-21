const express =require('express');
const app=express();
var modelrouter=require('./routes');
var dbutil=require('./dbutil')
dbutil.bootstraptables();
app.use('/products',modelrouter);
app.listen(8000,()=>{console.log('Server is running on port 8000')});