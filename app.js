"use strict"
document.addEventListener("DOMContentLoaded", function(){
    const searchButton = document.getElementsByTagName('button')[0];
    const result = document.getElementById('result');
    const superheroAlias = document.getElementById('alias');
    const superheroName = document.getElementById('name');
    const superheroBio = document.getElementById('biography');
    const noSuperhero = document.getElementById('notFound');
    const httpRequest = new XMLHttpRequest();

    searchButton.addEventListener("click", function(e){
        e.preventDefault();
        var searchRequest = document.getElementById('searchBox').value;
        noSuperhero.innerHTML = '';
        superheroAlias.innerHTML = '';
        superheroName.innerHTML = '';
        superheroBio.innerHTML = '';
        result.innerHTML = '';

        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState == 4){
                if (httpRequest.status == 200){
                    if (searchRequest.length !== 0){
                        var idk = httpRequest.responseText;
                        var ting = JSON.parse(idk);
                        if (ting == "Superhero not found"){
                            noSuperhero.innerHTML= ting;
                            noSuperhero.classList.add("notFound");
                        } 
                        else {
                            superheroAlias.innerHTML =ting.alias.toUpperCase();
                            superheroName.innerHTML = "A.K.A " + ting.name.toUpperCase();
                            superheroBio.innerHTML = ting.biography;
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