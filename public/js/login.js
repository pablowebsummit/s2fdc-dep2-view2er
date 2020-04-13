window.onload = addEvents();

function addEvents(){

document.getElementById('login-button').addEventListener('click',() => {

    let host = document.getElementById('environment').selectedOptions[0].value;
    let authEndPoint = `https://${host}.salesforce.com/services/oauth2/authorize`;

    let clientId = "3MVG9I5UQ_0k_hTmZuUMosHPf.2zqzHBqd0j.GMmnThrGhd53n4prfPpHNqSAPRrWzc7Hb0ul.s2m4VYoiWyZ";
    let responseType = "token";
    let redirectURI = "http://localhost:3000/main.html";
    let requestURL = `${authEndPoint}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectURI}`;
    window.location = requestURL;
        
    });
}