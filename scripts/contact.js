const darkImage = document.querySelector('#dark-image');
const toggleBtn= document.querySelector('.switch-btn');

toggleBtn.addEventListener('click', () => {
    if(darkMode){
        darkImage.innerHTML = `<img src="../assets/images/darkquery-avatar.jpg" alt="contact form image">`;
    }else{
        darkImage.innerHTML = `<img src="../assets/images/query-avatar.jpg" alt="contact form image">`;
    }
});

// validate form
const contactForm = document.getElementById("contact-form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message-area");
const queryResult = document.getElementById("query-result");
const submitBtn = document.getElementById("submit-form");

const inputValidation = (fullName, mail, msg, form) => {
    const emailPattern = /^[a-z]+([a-z0-9_\-\.]){1,}\@([a-z0-9_\-\.]){1,}\.([a-z]{2,4})$/;
    const namePattern = /^([^0-9])+([a-zA-Z]{1,})$/; 
    
    if (fullName.length === 0) {
        name.style.border = '1px solid red';
        queryResult.style.color = '#DF502A';
        queryResult.innerHTML = 'Name is required!';
        return false;
      } else if (!namePattern.test(fullName)) {
        name.style.border = '1px solid red';
        queryResult.style.color = '#DF502A';
        queryResult.innerHTML = 'Name should be valid'
        return false;
      } else if (mail.length === 0) {
        email.style.border = '1px solid red';
        queryResult.style.color = '#DF502A';
        queryResult.innerHTML = 'Email is required';
        return false;
      } else if (!emailPattern.test(mail)) {
        email.style.border = '1px solid red';
        queryResult.style.color = '#DF502A';
        queryResult.innerHTML = 'Invalid Email Format'
        return false;
      } else if (msg.length === 0) {
        message.style.border = '1px solid red';
        queryResult.style.color = '#DF502A';
        queryResult.innerHTML = 'Message is required!'
        return false;
      } else {
        submitResult(name.value, email.value, message.value, form)
      }
}

// const url = 'https://simon-tech-site.herokuapp.com';
const url = 'http://localhost:3000';


async function submitResult(name, email, message, form) {
    submitBtn.innerHTML = 'Loading ....';
    fetch(`${url}/messages`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          name,
          email,
          message
      })
  })
  .then(handleResponse)
  .then((result) => {
    if (result.error) {
      queryResult.style.color = '#DF502A';
      queryResult.innerHTML = result.error;
    } else {
      form.reset();
      submitBtn.innerHTML = 'Send';
      queryResult.style.color = '#008B8B';
      queryResult.innerHTML = result.message;
    }
  })
  .catch(() => {
      queryResult.innerHTML = 'Something went wrong, Please re-try!';
  })
}


// handle fetch response
function handleResponse(response){
  let contentType = response.headers.get('content-type')

  if (contentType.includes('application/json')){
      return response.json()
  } else if (contentType.includes('text/html')) {
      return response.text()
  } else {
      throw new Error(`content-type ${contentType} is not supported`)
  }
};


submitBtn.onclick = (e) => {
    e.preventDefault();
    inputValidation(name.value, email.value, message.value, contactForm)
}

//clear the result container on keydown
const inputs = document.querySelectorAll('input')

function clearFeedBack() {
    submitBtn.innerHTML = 'Send';
    queryResult.innerHTML = '';
}
inputs.forEach(input => input.addEventListener('keydown', clearFeedBack))
message.onkeydown = clearFeedBack;