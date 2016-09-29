var mysql      = require('mysql');
var connection = mysql.createConnection({
	  host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'productmanagement'
});

connection.connect();

var insertStatement = "INSERT INTO productcategory SET ?";
console.log("Inserting into the server");
//console.log(productCategory);
		        
var category = {

			CategoryName:'shayan1232',
			Details:'shayan',
			IsValid: 1,//productCategory.isValid,
			CreatedDate: new Date()
		};

connection.query(insertStatement, category, function(err, result){
	               
		if(err){ console.log("logging error:"+err);                } 
//                OnSuccessfulCallback({status : 'Successful'});
		console.log('In Dao file');
		console.log(category);
		console.log(result);
} );

connection.query('describe productcategory', function(err, rows, fields) {
	  if (!err)
	    console.log('The solution is: ', rows);
  else
	    console.log('Error while performing Query.');
});

connection.end();

