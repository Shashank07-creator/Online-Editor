var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 || xhr.status==200){
        let d = JSON.parse(this.response)
        xhr.abort();
        d.forEach(element => {
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        
        let main = document.createElement("div")
        
        main.className = 'card';
        
        div.className = "card-header";
        div2.className = "card-body";
        div2.style.backgroundColor = 'white';
        div.innerText = element['name']
        div2.innerHTML= element['code']

        div.appendChild(div2);
        main.appendChild(div);
        document.getElementById('container').appendChild(main);
        document.getElementById('container').appendChild(document.createElement("BR"))
    });
    }
    else{
        console.log("Error")
    } 
};
xhr.open('GET', 'http://localhost:5000/db_data',true);
xhr.send();


// var toAdd = document.createDocumentFragment();
// for(var i=0; i < 11; i++){
//    var newDiv = document.createElement('div');
//    newDiv.id = 'r'+i;
//    newDiv.className = 'ansbox';
//    toAdd.appendChild(newDiv);
// }

// document.appendChild(toAdd);

// <% data.forEach((d)=>{ %>
//     document.getElementById("<%= d.name.substring(0,2)+d.name.charAt(4) %>").innerHTML = "<%- d.code %>";
// <% }) %>
