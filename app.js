"use strict"
document.addEventListener("DOMContentLoaded", function(){
    const searchButton = document.getElementsByTagName('button')[0];
    const httpRequest = new XMLHttpRequest();

    searchButton.addEventListener("click", function(e){
        e.preventDefault();
        
        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState == 4){
                if (httpRequest.status == 200){
                    alert(httpRequest.responseText);
                }
    
                if (httpRequest.status == 404){
                    alert('File not found');
                }
            }
        }

        httpRequest.open('get', 'http://localhost:8080/superheroes.php', true);
        httpRequest.send();
    });
});