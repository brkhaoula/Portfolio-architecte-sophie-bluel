//function to get works from API
//
function get_works(){
const options = {
    method: 'GET',
  
    headers: {
      // Nous n'accepterons que le JSON en résultat.
      'Accept': 'application/json',
      // Dans le cas d'une requête contenant un body,
      // par exemple une POST ou PUT, on définit le format du body.
      'Content-Type': 'application/json',
      // Cas d'usage courant pour gérer l'authentification avec une API REST.
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NDU2NzY3NiwiZXhwIjoxNjc0NjU0MDc2fQ.XqX6dio4RG-OqTFsdisESwqof4mc0OW9d_j7o3eBzG8'
    }
  }
  
  const url = 'http://localhost:5678/api/works';

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const fragment = document.createDocumentFragment();
      let works = data;
      works.forEach((work) => {
        console.log(work);
        const figure = document.createElement('figure');
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src=work.imageUrl;
        const caption = document.createElement('figcaption');
        caption.textContent = work.title;
        fragment.appendChild(figure);
        figure.appendChild(div);
        div.appendChild(img);
       
        console.log(work.imageUrl);
       
        div.appendChild(caption);
        
    });
    const gallery = document.getElementById('galleryworks');
    gallery.appendChild(fragment);
  })
}
//response API to get category
function get_category(){
  const options = {
      method: 'GET',
    
      headers: {
        // Nous n'accepterons que le JSON en résultat.
        'Accept': 'application/json',
        // Dans le cas d'une requête contenant un body,
        // par exemple une POST ou PUT, on définit le format du body.
        'Content-Type': 'application/json',
        // Cas d'usage courant pour gérer l'authentification avec une API REST.
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NDU2NzY3NiwiZXhwIjoxNjc0NjU0MDc2fQ.XqX6dio4RG-OqTFsdisESwqof4mc0OW9d_j7o3eBzG8'
      }
    }
    const url2 = 'http://localhost:5678/api/categories';
    fetch(url2)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const fragment = document.createDocumentFragment();
        let categoryies = data;
        categoryies.forEach((category) => {
          console.log(category);
          const link = document.createElement('a');
          link.textContent = category.name;
          link.classList.add("subcat");
          fragment.appendChild(link);
          
      });
      const categorie = document.getElementById('category');
      categorie.appendChild(fragment);
    })
  } 
  //
//function login connexion authentification
//affichage page d'acceuil
//sinon affichage message d'erreur
function login()
{

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:5678/api/users/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "email": email,
    "password": password
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (objects['status'] == 'ok') {
        localStorage.setItem("jwt", objects['accessToken']);
        Swal.fire({
          text: objects['message'],
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = './index.html';
          }
        });
      } else {
        Swal.fire({
          text: objects['message'],
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
  return false;
}


get_works();
get_category();
