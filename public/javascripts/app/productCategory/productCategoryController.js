angular.module("productCategoryModule")
.controller("productCategoryController", productCategoryController);

productCategoryController.$inject=['$scope','$timeout','productCategoryService','requiredFieldValidationService'];

function productCategoryController($scope, $timeout, productCategoryService,requiredFieldValidationService){
    
    $scope.productCategory = {
        
        categoryName:"",
        categoryDetails:""
    };

    $scope.message={
      containsSuccessfulMessage:false,
        successfulMessage: ""
    };
    
    $scope.validationResult = {
      containsValidationError : false,
        validationSummary: ""
    };
    
    function clearProductCategory(){
        $scope.productCategory.categoryName="";
        $scope.productCategory.categoryDetails="";
    }
    
    function clearMessage(){
        
        $scope.message.containsSuccessfulMessage = false;
        $scope.message.successfulMessage ="";
        
    }
    
    function displayMessage(){
        $scope.message.containsSuccessfulMessage = true;
        $scope.message.successfulMessage = "A Record added successfully";
    }
    
    $scope.createProductCategory = function(productCategory){
        
        console.log('validating messages');
        
        var validationMessages = requiredFieldValidationService.getRequiredFieldValidationErrorMessage(
        [
            {name:$scope.productCategory.categoryName || "",errorMessage:"Please enter product category name"},
            {name:$scope.productCategory.categoryDetails || "",errorMessage:"Please enter product category details"}
        ]);
        
        if(validationMessages.length > 0) {
            $scope.validationResult.containsValidationError = true;
            
            angular.element("#validationErrorMessage").empty();
            validationMessages.forEach(function(errorMessage){
               angular.element("<li></li>")
                   .html(errorMessage) 
                    .appendTo('#validationErrorMessage');
            });
        } else {
            $scope.validationResult.containsValidationError = false;
            productCategoryService.createProductCategory(productCategory)
            .success(function(data){
                
                if(data.status && data.status=='successful')
                    displayMessage();
                $timeout(function afterTimeOut(){
                    clearMessage();
                    clearProductCategory();
                },5000);

                alert("Data posted successfully");
                //alert("Data posted successfully");
                /*$timeout(function(){

                },3000);*/

            });
        }
        
        
        /*console.log(productCategory);
        console.log('Hi shayan here');
        productCategoryService.createProductCategory(productCategory)
        .success(function(data){
           
            alert("Data posted successfully");
            //alert("Data posted successfully");
            /*$timeout(function(){
                
            },3000);
            
        });*/
    
    }
    
}

