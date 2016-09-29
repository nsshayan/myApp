    var connectionProvider = require('../mysqlConnectionStringProvider.js');

var sample = "shayan";
//console.log('In product category dao file');

var productCategoryDao = {
    
    createProductCategory : function(productCategory,OnSuccessfulCallback){
        console.log("Inside create product category function");
        var insertStatement = "INSERT INTO productcategory SET ?";
        console.log("Inserting into the server");
        console.log(productCategory);
        
        var category = {
            
            CategoryName:productCategory.CategoryName,
            Details:productCategory.Details,
            IsValid: 1,//productCategory.isValid,
            CreatedDate: new Date()
        };
        
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        
        /*connection.query('SELECT * from productcategory', function(err, rows, fields) {
            if (!err){
                console.log('The solution is: ', rows);
            }
            else{
                console.log('Error while performing Query.');
            }
        }); */

        if(connection){
            connection.query(insertStatement, category, function(err, result){
               
                if(err){
                    
                } 
                OnSuccessfulCallback({status : 'Successful'});
                console.log('In Dao file');
                console.log(category);
                console.log(result);
                
            } );
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
    
    getAllProductCategory:function(callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM productCategory ORDER BY ID DESC";
        
        if(connection){
            connection.query(queryStatement,function(err,rows,fields){
               if(err){throw err;}
                
                console.log(rows);
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
    
    getProductCategoryById:function(productCategoryId,callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM productCategory WHERE id = ?";
        
        if(connection){
            connection.query(queryStatement,[productCategoryId],function(err,rows,fields){
               if(err){throw err;}
                
                console.log(rows);
                callback(rows);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
    updateProductCategory: function(categoryName,details,productCategoryId,callback){
            var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "UPDATE productCategory SET CategoryName = ? , Details = ?, ModifiedDate = ? WHERE id = ?";
        
        if(connection){
            connection.query(queryStatement,[categoryName,details,new Date (),productCategoryId],function(err,rows,fields){
               if(err){throw err;}
                
                //console.log(rows);
                if (rows){
                    callback({status:"successful"});
                }
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
    
        deleteProductCategoryById:function(productCategoryId,callback){
            var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
            var queryStatement = "DELETE FROM productCategory WHERE id = ?";

            if(connection){
                connection.query(queryStatement,[productCategoryId],function(err,rows,fields){
                   if(err){throw err;}

                    //console.log(rows);
                    if (rows){
                        callback({status:"successful"});
                    }
                });
                connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
};

module.exports.productCategoryDao = productCategoryDao;