var sequelize=require('sequelize')
const dbconnection=require('./dbconfig.js');
var testdb=function(){
    testpass=false;
    dbconnection.authenticate()
    .then(()=>{
        console.log('connection estastablished to db');
        testpass=true;
    })
    .catch(err=>{
        console.error('unable to connect to database',err);
        testpass=false;
    })
    return testpass;
}
var bootstraptables=function(){
    var connstate=testdb();
     const Users=dbconnection.define('users',{
            userid:{
                type:sequelize.UUID,
                defaultValue:sequelize.UUIDV4,
                primaryKey:true
            },
            username:sequelize.STRING,
            password:sequelize.STRING,
            name:sequelize.STRING,
            surname:sequelize.STRING,
            credits:sequelize.DECIMAL({precision:2})
            })
    const UserRoles=dbconnection.define('Roles',{
         
         rolename:sequelize.STRING
    })

    const Products=dbconnection.define('products',{
        productid:{
            type:sequelize.UUID,
            defaultValue:sequelize.UUIDV4,
            primaryKey:true
        },
        productname:sequelize.STRING,
        instock:sequelize.INTEGER,
        pictureurl:sequelize.STRING,
        price:sequelize.DECIMAL({precision:2}),
        product_description:sequelize.TEXT
    })
   const transactions=dbconnection.define('transactions',{
       transaction_id:{
           type:sequelize.UUID,
           defaultValue:sequelize.UUIDV4,
           primaryKey:true
       },
       transaction_cost:{
           type:sequelize.DECIMAL({precision:2})
       }

   })
   Users.belongsTo(UserRoles)
   transactions.belongsTo(Users)
   transactions.belongsTo(Products)
   dbconnection.sync({force:true})
}    
module.exports={
    testdb:testdb,
    bootstraptables:bootstraptables
}