angular.module("productCategoryModule")
.controller("editProductCategoryController",editProductCategoryController);


editProductCategoryController.$inject = ['$scope','$timeout','productCategoryService','$location','requiredFieldValidationService'];

function editProductCategoryController($scope,$timeout,productCategoryService,$location,requiredFieldValidationService){
    
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
        $scope.message.successfulMessage = "A Record updated successfully";
    }
    
    getProductCategoryId();
    
    function bindView(productCategory){
        $scope.productCategory.categoryName = productCategory.CategoryName;
        $scope.productCategory.categoryDetails = productCategory.Details;
    }
        
    function getProductCategoryId(){
        productCategoryService.getProductCategoryById(productCategoryService.getIdFromEndPoint()).
            success(function(data){
           if(data && data.productCategories && data.productCategories.length >0){
               //$scope.productCategories = data.productCategories;
               
               bindView(data.productCategories[0]);
           } 
        });
    }
    
    $scope.editProductCategory = function(){
        var validationMessages = requiredFieldValidationService.getRequiredFieldValidationErrorMessage(
        [
            {name:$scope.productCategory.categoryName||"",errorMessage:"please enter product category\n"},
            {name:$scope.productCategory.categoryDetails||"",errorMessage:"please enter product cateogry details.\n"}
        ]);
        
        if (validationMessages.length > 0){
            $scope.validationResult.containsValidationError = true;
            Id
            alert(validationErrorMessageId);
            
            angular.element(validationErrorMessageId).empty();
            
            validationMessages.forEach(function (errorMessage){
               angular.element("<li></li>")
                        .html(errorMessage)
                        .appendTo(validationErrorMessageId);
            });
        }else {
            productCategoryService.updateProductCategory($scope.productCategory, productCategoryService.getIdFromEndPoint())
            .success(function(data){
                if(data && data.status && data.status == 'successful'){
                    displayMessage();
                }
            });
        }
    }
}
        