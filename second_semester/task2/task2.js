function addNewElement(id) {
    var targetElement = document.getElementById(id);
    if (targetElement) {
        var parent = targetElement.parentElement;
        while (parent) {
            var lastChildTag = parent.lastElementChild.nodeName;
            var newElement = document.createElement(lastChildTag);
            newElement.innerHTML = "Новый элемент";
            var newChild = newElement.cloneNode(true);
            parent.insertBefore(newChild, parent.firstElementChild);
            if (parent.tagName === 'BODY') {
                break; 
            }
            parent = parent.parentElement;
        }
    }
}