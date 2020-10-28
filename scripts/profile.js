const displayName = domElement("#admin-display-name");
const adminName = domElement("#admin-name");
const displayEmail = domElement("#admin-display-email");
const img = domNodeList('.img');


function getUser() {
    fetch(`${url}/users/profile`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',   
        'auth-token': authToken,
      }
    })
    .then(handleResponse)
    .then((result) => {
      const profile = result.userProfile
      displayName.innerHTML = profile.name;
      adminName.innerHTML = profile.name;
      displayEmail.innerHTML =  profile.email;
      img.forEach(imag => imag.src = profile.profileImag)
    })
    .catch((err) => console.log(err))
}

// logout
domElement(".fa-sign-out-alt").addEventListener('click', (e) => {
    e.preventDefault();  
    sessionStorage.removeItem('s-techToken');
      setTimeout(() => {
        window.location.href = '../login/'
      },3000)
})


const authToken = sessionStorage.getItem('s-techToken')
const formData = new FormData();

const input = domElement(".select-file");

//upload image
function uploadImage(file) {
  fetch(`${url}/users/profile`, {
    method: 'POST',
    headers: {
        'Accept': 'multipart/form-data',
        'auth-token': authToken
    },
    body:file
})
.then(handleResponse)
.then((result) => { 
    if (result.error) {
      window.alert(result.error)
    } else {
      window.alert(result.message)
    }
})
.catch((err) => window.alert(err))
  
}

input.addEventListener('change', ({target}) => {
    const { files } = target;
    formData.append('profileImag', files[0])
    uploadImage(formData)
})


function handleResponse(response){
  let contentType = response.headers.get('content-type')

  if (contentType.includes('application/json')){
      return response.json()
  } else if (contentType.includes('multipart/form-data')){
      return response.blob()
  } else if (contentType.includes('text/html')) {
      return response.text()
  }  else {
      throw new Error(`content-type ${contentType} is not supported`)
  }
};

//update profile information
function updateProfileInfo() {
    const form =domElement(".edit-admin-profile");
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = domElement("#name");
        const bio = domElement("#bio");
        const profileError = domElement(".profile-error");
        if (name.value == '' || bio.value =='') {
          profileError.style.color = '#DF502A';
          profileError.innerHTML = 'Please fill the form fields';
        } else {
            fetch(`${url}/users/profile`, {
              method: 'PUT',
              headers: {
                  'content-type': 'application/json',   
                  'auth-token': authToken,
              },
              body: JSON.stringify({
                name: name.value,
                biograph: bio.value
              })
          })
          .then(handleResponse)
          .then((result) => {
            form.reset()
            profileError.style.color = '#FFFFFF'
            profileError.innerHTML = result.message;
              setTimeout(() => {
                profileError.innerHTML = '';
              }, 3000)
          })
          .catch((err) => {
              submitBtn.innerHTML = 'Submit';
              profileError.innerHTML = 'Something went wrong!';
          })
        }    
    }
}
//update bio
function updateBio() {
  fetch(`${url}/users/profile`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',   
      'auth-token': authToken,
    }
  })
  .then(handleResponse)
  .then((result) => {
    if (!result.userProfile.biograph) {
      domElement("#biograph").style.visibility = 'hidden';
    } else {
      domElement("#biograph").innerHTML =`
      <p>${result.userProfile.biograph}</p>
      `
    } 
  })
  .catch((err) => console.log(err))
};

window.onload = () => {
  updateBio()
  updateProfileInfo()
  getUser()
}
