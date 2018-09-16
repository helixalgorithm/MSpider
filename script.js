var all = document.getElementsByTagName("*");

for (var i=0, max=all.length; i < max; i++) 
{
    let e = all[i];
    for(let j = 0; j < e.childNodes.length; j++){
        if(e.childNodes[j].nodeType == Node.TEXT_NODE){
            all[i].addEventListener("mouseover", function(){this.setAttribute("style", "color:blue;");}, false);
            all[i].addEventListener("mouseout", function(){this.setAttribute("style", "color:black;");}, false);
        }
    }
}
