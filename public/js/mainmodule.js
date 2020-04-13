
import {dom} from './dom.js';


const SFDM = function(){

    const OPEN_FOLDER_CLASS = 'fa-folder-open';
    const CLOSED_FOLDER_CLASS = 'fa-folder';
    const ALL_FOLDER_CLASSES = '.'+OPEN_FOLDER_CLASS+',.'+CLOSED_FOLDER_CLASS;

    let accessToken;
    let refreshToken;
    let instanceURL;

    function init(){
        addEvents();
        getOAuthTokens();
    }

    function addEvents(){

        document.getElementById('ui-mode-toggler').addEventListener('click', event => {
    
            let checkbox = event.target;
    
            if(checkbox.checked) switchUIMode('light');
            else switchUIMode('dark');
        });
    
        document.querySelectorAll(ALL_FOLDER_CLASSES).forEach(folder => {
    
            folder.addEventListener('click',() => {
                expandOrCollapse(folder);
            });
        });
    
        document.getElementById('collapse-button').addEventListener('click',() => {
    
            document.querySelectorAll('.'+OPEN_FOLDER_CLASS).forEach(folder => {
                collapseFolder(folder);
            });
        });
    
        document.getElementById('expand-button').addEventListener('click',()=> {
    
            document.querySelectorAll('.'+CLOSED_FOLDER_CLASS).forEach(folder => {
                expandFolder(folder);
            });
    
        });
    
        document.getElementById('input-field').addEventListener('keyup',event => {
            
            let enterKey = 13;
    
            if (event.keyCode == enterKey) {
                event.preventDefault();
                document.getElementById("find-button").click();
            }
        });
    }

    function switchUIMode(mode){

        let body = document.getElementsByTagName('body')[0];
        let dependencies = document.getElementsByClassName('dependencies')[0];
        let text = document.getElementById('switch-mode-text');
    
        dependencies.classList.toggle('dependencies-light');
        body.classList.toggle('body-light');
        text.innerText = `Switch to ${mode} mode`;
        
    }
    
    function expandOrCollapse(folder){
    
        let collapsed = (folder.classList.contains(CLOSED_FOLDER_CLASS));
        let expanded = (folder.classList.contains(OPEN_FOLDER_CLASS));
    
        if(collapsed){
            expandFolder(folder);
        }
    
        else if(expanded){
            collapseFolder(folder);
        }
    }
    
    function collapseFolder(folder){
        dom.replaceClassWith(folder,OPEN_FOLDER_CLASS,CLOSED_FOLDER_CLASS);
        dom.hideChildren(folder);
    }
    
    function expandFolder(folder){
        dom.replaceClassWith(folder,CLOSED_FOLDER_CLASS,OPEN_FOLDER_CLASS);
        dom.showChildren(folder);
    }

    function getOAuthTokens(){
        accessToken = decodeURI(getURLParameter('access_token'));
        refreshToken = decodeURI(getURLParameter('refresh_token'));
        instanceURL = decodeURIComponent(getURLParameter('instance_url'));

        console.log(accessToken);
        console.log(instanceURL);
    }
    
    function getURLParameter(param){
        
        let mainURL = document.location+'';
        let pageUrls = mainURL.split('#');
        let keyValuePairs = pageUrls[1].split('&');

        for (let i = 0; i < keyValuePairs.length; i++) {

            let paramName = keyValuePairs[i].split('=');
            if (paramName[0] == param) return paramName[1];
        }
    }

    return {
        init : init
    }


}();

SFDM.init();