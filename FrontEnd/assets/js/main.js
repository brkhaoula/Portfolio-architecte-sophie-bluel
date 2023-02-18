function checkLogin() {
    const auth = localStorage.getItem('auth');
    if (auth !== null) { 
    
        var link = document.querySelector("#login");
        console.log(link);
        
        
        link.href = link.href.replace('login.html', "index.html");
        link.textContent = link.textContent.replace('login', "logout");
        document.getElementById('login').id = 'logout';
        
    }

   
}


checkLogin();