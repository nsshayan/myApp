angular.module("productCategoryModule")
.factory("productCategoryService", productCategoryService);

productCategoryService.$inject=['$http','$location'];

function productCategoryService($http,$location){
    
    return {
      
        createProductCategory:function(productCategory){
            console.log('In product Category Service');
            return $http({
                method:'POST',
                url:'/createProductCategory',
                data: {
                    CategoryName:productCategory.categoryName,
                    Details:productCategory.categoryDetails
                    }
            });
            /*return $http.post('/createProductCategory',
                             {
                categoryName:productCategory.categoryName,
                details:productCategory.categoryDetails
            });*/
        },
        
        getAllProductCategories:function(){
            return $http.get('/getAllProductCategory');
        },
        
        getIdFromEndPoint:function(){
            var absoluteUrl = $location.absUrl();
            var segments = absoluteUrl.split("/");
            var productCategoryId = segments[segments.length - 1];
            return productCategoryId;
            
        },
        
        getProductCategoryById:function(productCategoryId){
            return $http.get('/getProductCategoryById/'+productCategoryId);
        },
        
        updateProductCategory:function (productCategory, productCategoryId){
            console.log(productCategory.categoryName);
            console.log(productCategory.categoryDetails);
            console.log(productCategoryId);
            return $http({
                method:'POST',
                url:'/updateProductCategory',
                data: {
                    categoryName:productCategory.categoryName,
                    details:productCategory.categoryDetails,
                    productCategoryId:productCategoryId
                    }
            });

        },
        
        deleteProductCategoryById: function(productCategoryId){
            //return $http.delete('/deleteProductCategoryById/'+productCategoryId);
            
            return $http['delete']('/api/deleteProductCategoryById/' +  productCategoryId);
            
            
        }
    };
    

}

