
function replaceClassWith(element,currentClass,newClass){
    element.classList.remove(currentClass);
    element.classList.add(newClass);
}

function hideChildren(folder){

    let parentListItem = folder.parentElement;
    let listItems = Array.from(parentListItem.children);
    
    listItems.forEach(li => {
        if(li.tagName == 'UL' || li.tagName == 'LI'){
            li.style.display = 'none';
        }      
    })
}


function showChildren(folder){

    let parentListItem = folder.parentElement;
    let listItems = Array.from(parentListItem.children);
    
    listItems.forEach(li => {
        if( li.tagName == 'LI'){
            li.style.display = 'list-item';
        }
        else if(li.tagName == 'UL'){
            li.style.display = '';
        }      
    });
}

export const dom = {
    replaceClassWith : replaceClassWith,
    showChildren: showChildren,
    hideChildren: hideChildren
};



