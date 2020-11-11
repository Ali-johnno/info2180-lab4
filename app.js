"use strict"
document.addEventListener("DOMContentLoaded", function(){
    const searchButton = document.getElementsByTagName('button')[0];
    const result = document.getElementById('result');
    const superheroAlias = document.getElementById('alias');
    const superheroName = document.getElementById('name');
    const superheroBio = document.getElementById('biography');
    const httpRequest = new XMLHttpRequest();

    searchButton.addEventListener("click", function(e){
        e.preventDefault();
        var searchRequest = document.getElementById('searchBox').value;
        superheroAlias.innerHTML = '';
        superheroName.innerHTML = '';
        superheroBio.innerHTML = '';
        result.innerHTML = '';
        result.classList.remove("notFound");

        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState == 4){
                if (httpRequest.status == 200){
                    if (searchRequest.length !== 0){
                        var searchResults = httpRequest.responseText;
                        var parseResults = JSON.parse(searchResults);
                        if (parseResults == "Superhero not found"){
                            result.innerHTML= parseResults;
                            result.classList.add("notFound");
                        } 
                        else {
                            superheroAlias.innerHTML =parseResults.alias.toUpperCase();
                            superheroName.innerHTML = "A.K.A " + parseResults.name.toUpperCase();
                            superheroBio.innerHTML = parseResults.biography;
                        }  
                   } else {
                        result.innerHTML = httpRequest.responseText;
                   }
                }
    
                if (httpRequest.status == 404){
                    alert('File not found');
                }
            }
        }

       
        httpRequest.open('get', 'http://localhost:8080/superheroes.php?s='+searchRequest, true);
        httpRequest.send();
    });
});