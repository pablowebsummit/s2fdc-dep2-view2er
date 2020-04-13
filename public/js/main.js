const OPEN_FOLDER_CLASS = 'fa-folder-open';
const CLOSED_FOLDER_CLASS = 'fa-folder';
const ALL_FOLDER_CLASSES = '.'+OPEN_FOLDER_CLASS+',.'+CLOSED_FOLDER_CLASS;

let accessToken;
let refreshToken;
let instanceURL;

window.onload = init();

function init(){
    addEvents();
    //getOAuthTokens();
}

function metadataApi(){
    
        let conn = new jsforce.Connection({
            instanceUrl : instanceURL,
            accessToken : accessToken
        });

        //let conn = new jsforce.Connection({ accessToken: accessToken });
        let types = [{type: 'CustomObject', folder: null}];
        conn.metadata.list(types, '47.0', function(err, metadata) {
        if (err) { return console.error('err', err); }
            let meta = metadata[0];
            console.log('metadata count: ' + metadata.length);
            console.log('createdById: ' + meta.createdById);
            console.log('createdByName: ' + meta.createdByName);
            console.log('createdDate: ' + meta.createdDate);
            console.log('fileName: ' + meta.fileName);
            console.log('fullName: ' + meta.fullName);
            console.log('id: ' + meta.id);
            console.log('lastModifiedById: ' + meta.lastModifiedById);
            console.log('lastModifiedByName: ' + meta.lastModifiedByName);
            console.log('lastModifiedDate: ' + meta.lastModifiedDate);
            console.log('manageableState: ' + meta.manageableState);
            console.log('namespacePrefix: ' + meta.namespacePrefix);
            console.log('type: ' + meta.type);
        });
    
}

function addEvents(){

    document.getElementById('ui-mode-toggler').addEventListener('click',function(event){

        let checkbox = event.target;

        if(checkbox.checked) switchUIMode('light');
        else switchUIMode('dark');
    });

    document.querySelectorAll(ALL_FOLDER_CLASSES).forEach(function(folder){

        folder.addEventListener('click',function(){
            expandOrCollapse(folder);
        });
    });

    document.getElementById('collapse-button').addEventListener('click',function(){

        document.querySelectorAll('.'+OPEN_FOLDER_CLASS).forEach(function(folder){
            collapseFolder(folder);
        });
    });

    document.getElementById('expand-button').addEventListener('click',function(){

        document.querySelectorAll('.'+CLOSED_FOLDER_CLASS).forEach(function(folder){
            expandFolder(folder);
        });

    });

    document.getElementById('input-field').addEventListener('keyup',function(event){
        
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
    replaceClassWith(folder,OPEN_FOLDER_CLASS,CLOSED_FOLDER_CLASS);
    hideChildren(folder);
}

function expandFolder(folder){
    replaceClassWith(folder,CLOSED_FOLDER_CLASS,OPEN_FOLDER_CLASS);
    showChildren(folder);
}

function replaceClassWith(element,currentClass,newClass){
    element.classList.remove(currentClass);
    element.classList.add(newClass);
}

function hideChildren(folder){

    let parentListItem = folder.parentElement;
    let listItems = Array.from(parentListItem.children);
    
    listItems.forEach(function(li){
        if(li.tagName == 'UL' || li.tagName == 'LI'){
            li.style.display = 'none';
        }      
    });
}

function showChildren(folder){

    let parentListItem = folder.parentElement;
    let listItems = Array.from(parentListItem.children);
    
    listItems.forEach(function(li){
        if( li.tagName == 'LI'){
            li.style.display = 'list-item';
        }
        else if(li.tagName == 'UL'){
            li.style.display = '';
        }      
    });
}

function getOAuthTokens(){
    accessToken = decodeURI(getURLParameter('access_token'));
    refreshToken = decodeURI(getURLParameter('refresh_token'));
    instanceURL = decodeURIComponent(getURLParameter('instance_url'));
}

function getURLParameter(param){
    let mainURL = document.location+'';
    let pageUrls = mainURL.split('#');
    let urllets = pageUrls[1].split('&');
    for (let i = 0; i < urllets.length; i++) 
        {
        let paramName = urllets[i].split('=');
        if (paramName[0] == param) 
            {
            return paramName[1];
            }
        }
}
