var mysqlConnectionString = {
    
    connection  :{     
        dev : {
            host: 'localhost',
            user: 'root',
            password : 'root',
            database : 'productmanagement'
        },
        
        qa : {
            host: 'localhost',
            user: 'root',
            password : 'root',
            database : 'yourdatabasename'
        },
        prod : {
            host: 'localhost',
            user: 'root',
            password : 'root',
            database : 'yourdatabasename'
        }
    
    }

};

module.exports.mysqlConnectionString = mysqlConnectionString;
