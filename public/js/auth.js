const url = (window.location.hostname.includes('localhost'))
? 'http://localhost:8080/api/auth/'
: 'https://simple-rest-node.herokuapp.com/api/auth/';

const loginForm = document.querySelector('form');

loginForm.onsubmit = (e)=>{
    e.preventDefault();

    const formData = {};

    for(let el of loginForm.elements){
        if(el.name.length > 0){
            formData[el.name] = el.value;
        }
    }

    fetch(url + 'login',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp=>resp.json())
    .then(({msg, token})=>{    
        if(token){
            localStorage.setItem('token', token);            
            window.location = 'chat.html';
        }    
        console.log(msg);
    })
    .catch(console.log)
}

function onSignIn(googleUser) {
    const userProfile = googleUser.getBasicProfile();
    const userData = {
        id : userProfile.getId(),
        name : userProfile.getName(),
        image : userProfile.getImageUrl(),
        email : userProfile.getEmail(),
    };
    
    const id_token = googleUser.getAuthResponse().id_token;
    const data = {id_token}
    fetch(url+'google', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    })
    .then(resp=>resp.json())
    .then(({token})=>{
        localStorage.setItem('token',token);      
        window.location = 'chat.html';
    })
    .catch(console.log)
}

function signOut() {
var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
    localStorage.removeItem('token');
});
}