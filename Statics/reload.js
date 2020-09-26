var xhr = new XMLHttpRequest();
let user = 'default'
let inter = setInterval(() => {
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 || xhr.status==200){
            user = JSON.parse(this.response)
            console.log(user)
            if(user!='default'){
                clearInterval(inter);
                location.reload();
            }
        }
    }
    xhr.open('GET', 'http://localhost:5000/uservalue',true);
    xhr.send();
}, 2000); 
