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

      firebase
      .storage()
      .ref(`users/profile/${data.uid}`)
      .getDownloadURL()
      .then(image => img.forEach(profile => profile.src = image))
      .catch(err => console.log(err.message))
    });
  }
}

// logout
domElement(".fa-sign-out-alt").addEventListener('click', (e) => {
    e.preventDefault();
    auth
    .signOut()
    .then(() => location.href = '../login/');
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
          photoURL: image.ref.location.path
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
        if (name.value == '' || bio.value =='') {
            console.log('Please fill the fields');
        } else {
             db.collection('users').doc(user.uid).set({
                FullName: name.value,
                Biograph:bio.value
            }, { merge: true })
            user.updateProfile({
                displayName: name.value
            })
            form.reset(); 
        }    
    }
}

//update bio
function updateBio(user) {
    db.collection('users').doc(user.uid).get().then((bio) =>{
        const biograph = bio.data();
        domElement("#biograph").innerHTML =`
        <p>${biograph.Biograph}</p>
        ` 
    })
}