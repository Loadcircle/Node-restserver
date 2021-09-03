const url = (window.location.hostname.includes('localhost'))
? 'http://localhost:8080/api/auth/'
: 'https://simple-rest-node.herokuapp.com/api/auth/';

let user = null;
let socketServer = null;
//HTML REF
const txtUID = document.querySelector('#txtUID'),
    messageField = document.querySelector('#message'),
    userList = document.querySelector('#userList'),
    messagesList = document.querySelector('#messagesList'),
    logoutBtn = document.querySelector('#logoutBtn');

const validateJWT = async()=>{

    const token = localStorage.getItem('token') || null;

    if(!token){
        window.location = 'index.html';
        throw new Error('There is no token in client');
    }

    const resp = await fetch(url, {
        headers: {'Authorization': token}
    });

    const response = await resp.json();
    user = response.user;
    localStorage.setItem('token', response.token);
    document.title = user.name;

    await startSocket();
}

const startSocket = async()=>{
    //extraHeaders is a property of socket.io
    socketServer = io({
        'extraHeaders': {
            'Authorization': localStorage.getItem('token'),
        }
    });

    socketServer.on('connect', ()=>{
        console.log('Socket connected')
    });

    socketServer.on('disconnect', ()=>{
        console.log('Socket disconnected')
    });

    socketServer.on('get-messages', (messages)=>{
        printMessages(messages);
    });
    
    socketServer.on('active-users', (users)=>{
        printUsers(users)
    });

    socketServer.on('private-message', (message)=>{
        console.log(message)
    });
}

const printUsers = (users=[])=>{
    let usersHTML = '';
    users.forEach(user=>{
        usersHTML += `
            <li>
                <p>
                    <h5 class="text-success">${user.name} - ${user.email}</h5>
                    <span class="fs-6 text-muted">${user.uid}</span>
                </p>
            </li>
        `;
    });
    userList.innerHTML = usersHTML;
}

const printMessages = (messages=[])=>{
    let messagesHTML = '';
    messages.reverse().forEach(message=>{
        messagesHTML += `
            <li>
                <p>
                    <span class="text-primary">${message.name}:</span>
                    <span>${message.message}</span>
                </p>
            </li>
        `;
    });
    messagesList.innerHTML = messagesHTML;
}

messageField.onkeyup = ({keyCode})=>{
    if(keyCode != 13) {return;}
    const message = messageField.value;
    const uid = txtUID.value;
    if(message.length === 0){return;}

    socketServer.emit('send-message', {
        message,
        uid
    });
    messageField.value = '';
}

const main = async()=>{

    await validateJWT();

};

main();