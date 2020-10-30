//update admin display name through firebase
const displayName = domElement("#admin-display-name");
const adminName = domElement("#admin-name");
const displayEmail = domElement("#admin-display-email");

auth.onAuthStateChanged(user => {
  if (user){
    getUser(user)
    uploadImage(user)
    updateProfileInfo(user)
    updateBio(user)
    savePost()
    uploadBlogImage()

    db.collection('users').doc(user.uid).onSnapshot((info) => {
      const userInfo = info.data();
      if (userInfo.role === 'admin') {
        domNodeList('.admin').forEach((ui) => ui.style.display = 'flex')

      } else {
        domElement('.fa-comment-dots').style.display = 'none';
      }         
    })

  } else {
    location.href = '../login/';
  }
})

function getUser(data) {
  let user = auth.currentUser;
  if (user != null) {
      user.providerData.forEach(function (profile) {
      displayName.innerHTML = profile.displayName;
      adminName.innerHTML = profile.displayName;
      displayEmail.innerHTML =  profile.email;
      console.log(profile)

      firebase
      .storage()
      .ref(`users/profile/${data.uid}`)
      .getDownloadURL()
      .then(image => img.forEach(profile => profile.src = image))
      .catch(()=> {
        if (code = "storage/object-not-found") {
          console.log('No Profile yet!')
        }else{
          console.log('Something went wrong!')
        }
      })
    });
  }
}

// logout
domElement(".fa-sign-out-alt").addEventListener('click', (e) => {
    e.preventDefault();
    auth
    .signOut()
    .then(() => window.location.href = '../login/');
})

//upload image
const img = domNodeList(".img");

function uploadImage(user) {
  domElement(".select-file").onchange = (event) => {
    let file = {};
      file = event.target.files[0];
      event.preventDefault()

      firebase
      .storage()
      .ref(`users/profile/${user.uid}`)
      .put(file)
      .then((image) => {
         db.collection('users').doc(user.uid).set({
          photoURL: image.ref.location.path
        }, { merge: true })
        user.updateProfile({
          photoURL: image.ref.location.path,
        })
      })
      .catch(err => console.log(err.message))
  }
}

//update profile information
function updateProfileInfo(user) {
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
             db.collection('users').doc(user.uid).set({
                FullName: name.value,
                Biograph:bio.value
            }, { merge: true })
            user.updateProfile({
                displayName: name.value
            })
            form.reset();
            profileError.style.color = '#008B8B';
            profileError.innerHTML = 'Profile updated successfully'; 
            setTimeout(() => {
              form.style.display = 'none';
            }, 3000);
        }    
    }
}

//update bio
function updateBio(user) {
    db.collection('users').doc(user.uid).onSnapshot((bio) =>{
        const biograph = bio.data();
        if (!biograph.Biograph) {
          domElement("#biograph").style.visibility = 'hidden';
        } else {
          domElement("#biograph").innerHTML =`
          <p>${biograph.Biograph}</p>
          `
        } 
    })
}
