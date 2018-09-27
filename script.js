var all = document.getElementsByTagName("*");
var text;
var nodeArr = [],
    buttons = [],
    linkArr = [],
    files = [],
    fileContent = [],
    circles = [],
    scripts = [];
var divCont, divMenu;
var upMenu, upAppend, typing;
var circle;
var nC = 0,
    nodes;
var inP, wi;
var sWidth = window.screen.availWidth,
    sHeigth = window.screen.availHeight;
var focus = [sWidth / 2 - 200, sHeigth / 2 - 200];

var g = document.createElement("DIV");

g.style["position"]="fixed";
g.style["top"]="0px";
g.style["z-index"]="10000";
g.style["display"]="block";
g.style["height"]="22px";
g.style["text-align"]="center";
g.style["background-color"]="#ff0000";

var ul = document.createElement("UL"),
    li0 = document.createElement("LI"),
    li1 = document.createElement("LI"),
    li2 = document.createElement("LI"),
    li3 = document.createElement("LI"),
    temp = document.createElement("DIV");

var input = document.createElement("input");    

divCont = document.createElement("DIV");
divMenu = document.createElement("DIV");
divCont.appendChild(divMenu);
divCont.appendChild(temp);

nodeArr[0] = document.createTextNode("MENU");
nodeArr[1] = document.createTextNode("New");
nodeArr[2] = document.createTextNode("Follow");
nodeArr[3] = document.createTextNode("Edit content");
nodeArr[4] = document.createTextNode("Expert mode");
nodeArr[5] = document.createTextNode("File name");
nodeArr[6] = document.createTextNode("Save");

g.appendChild(nodeArr[4]);
document.body.appendChild(g);

divMenu.appendChild(nodeArr[0]);
temp.appendChild(nodeArr[5]);
temp.appendChild(input);

input.style["margin-top"] = "60px";
input.style["border-radius"] = "8px";

temp.style["text-align"]="center";
temp.style["z-index"] = "1010";
temp.style["display"] = "none";

divCont.style["position"] = "fixed";
divCont.style["display"] = "block";
divCont.style["z-index"] = "2147483647";
divCont.style["height"] = sHeigth - 200 +"px";
divCont.style["width"] = sWidth + "px";
divCont.style["border"] = "solid 2px #000";
divCont.style["text-align"] = "center";
divCont.style["top"] = "40px";
divCont.style["left"] = "0px";
divCont.style["border-radius"] = "50px";

divMenu.style["display"] = "block";
divMenu.style["position"] = "fixed";
divMenu.style["background-color"] = "#fff";
divMenu.style["height"] = "200px";
divMenu.style["width"] = "200px";
divMenu.style["border"] = "solid 2px #000";
divMenu.style["text-align"] = "center";
divMenu.style["top"] = focus[1] + "px";
divMenu.style["left"] = focus[0] +"px";
divMenu.style["border-radius"] = "100px";

ul.style["list-style-type"] = "none";
ul.style["padding"] = "0px";

divMenu.appendChild(ul);
ul.appendChild(li0);
ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);
li0.appendChild(nodeArr[1]);
li1.appendChild(nodeArr[2]);
li2.appendChild(nodeArr[3]);
li3.appendChild(nodeArr[6]);

styleLi(li0, type);
styleLi(li1, follow);
styleLi(li2, ed);
styleLi(li3, save);

var onMouseUp = function(e)
{
    if(e.which ===3){
        alert("Gone");
    }
}

function styleLi(elem, func)
{
    elem.style["margin-top"] = "2px";
    elem.style["top"] = "0px";
    elem.style["padding"] = "0px";
    elem.style["margin-left"] = "40px";
    elem.style["height"] = "30px";
    elem.style["width"] = "120px";
    elem.style["border-radius"] = "15px";
    elem.style["border"] = "2px solid #00aaff";
    elem.style["cursor"] = "pointer";
    elem.addEventListener("mouseover", function(){this.style["background-color"] = "greenyellow";}, false);
    elem.addEventListener("mouseout", function(){this.style["background-color"] = "white";}, false);
    elem.addEventListener("mousedown", function()
    {
        this.style["background-color"] = "#606060";
        func();
    }, false);
    elem.addEventListener("mouseup", function(){this.style["background-color"] = "#fff";}, false);
}

function styleE(elem, x, y, w)
{
    elem.style["display"] = "block";
    elem.style["height"] = w+"px";
    elem.style["width"] = w+"px";
    elem.style["background-color"] = "white";
    elem.style["opacity"] = "0.9";
    elem.style["text-align"] = "center";
    elem.style["position"] = "fixed";
    elem.style.top = y+"px";
    elem.style.left = x+"px";
    elem.style["border"] = "1px solid #666";
    elem.style["border-radius"] = "100px";
    elem.style["cursor"] = "pointer";
    elem.addEventListener("mouseover", function(){this.style["background-color"] = "#5577ff";}, false);
    elem.addEventListener("mouseout", function(){this.style["background-color"] = "white";}, false);
}

function position(n)
{
    n = n + 1;
    var r, a;
    if(n < 7)
    {
        r = 150;
        a = Math.PI / 6;
    }else
    {
        r = 250;   
        a = Math.PI / 12;
    }
    var x = focus[0] + Math.sin((2 * a ) * n + a) * r;
    var y = focus[1] - Math.cos((2 * a ) * n + a) * r;
    return [x, y];
}

function enterListener(e)
{
    var key = e.which || e.keyCode; 
    if(key === 13) 
    {
        disableInput(inP); 
        temp.style["display"] = "none";
        files.push(inP.value);
        fileContent[inP.value] = "";
    }
}

function enableInput(inp)
{
    inP = inp;
    inp.addEventListener("keypress", enterListener);
}

function disableInput(inp){
    inp.removeEventListener("keypress", enterListener);
}

function setF(name, value)
{
    fileContent[name] = fileContent[name].concat(value.trim() + '\n');
}

function clickOnBubble(target)
{
    for(var i = 0; i < circles.length; i++)
    {
        if(circles[i].contains(target)) return true;
    }
    return false;
}

function showMenu(e)
{    
    function hide()
    {
        document.body.removeChild(divCont);
        temp.style["display"] = "none";
        if(input.value == "" && typing) {divCont.removeChild(circles[nC-1]); nC--; typing = false}
        upMenu = false;
        console.log("Hide");
        divCont.removeChild(fN);
    }
    if(typeof e != "undefined")
        {   
            if(e.target.nextSibling != null && e.target.textContent == "")
            {
                text = e.target.nextSibling.textContent.trim(" ");
                console.log(text);
            }
        }
    if(!upMenu)
    {
        document.body.appendChild(divCont);
        fN = document.createElement("DIV");
        fN.style["display"] = "block";
        fN.style["background-color"] = "#555555";
        fN.style["color"] = "#ff0";
        fN.style["margin-left"]="47px";
        fN.style["width"] = sWidth - 100 +"px";
        fN.style["border"] = "solid 1px #ff0";
        fN.style["text-align"] = "center";
        fN.style["top"] = "40px";
        fN.style["border-radius"] = "15px";
        focusNode = document.createTextNode("");
        fN.appendChild(focusNode);
        focusNode.nodeValue = text;
        divCont.appendChild(fN);
        upMenu = true;
        console.log("Show");
    } else 
    {
        if(typeof e != "undefined")
        {   
            console.log(e.target);
            if(!divMenu.contains(e.target) && !temp.contains(e.target) && !clickOnBubble(e.target))
            {
                hide();
            }
        } else hide();
    }
}

function type(e)
{
    var pos = position(nC);
    var txt = document.createElement("DIV");
    typing = true;
    circles[nC] = document.createElement("DIV");
    styleE(circles[nC], pos[0] + 50, pos[1] + 50, 100);
    txt.style["margin-top"] = 40 + "px";
    circles[nC].appendChild(txt);
    divCont.appendChild(circles[nC]);
    circles[nC].onclick=function(e)
    {
        if(this.childNodes[0].innerHTML == "")
        {
            console.log("empty")
        } else 
        {
            setF(e.target.textContent, focusNode.nodeValue);
            showMenu();
        }
    };
    circles[nC].addEventListener("mouseup", onMouseUp);
    circle = circles[nC];
    styleE(temp, focus[0], focus[1], 200);
    input.focus();
    input.onkeyup=function(){txt.innerHTML=this.value};
    enableInput(input);
    nC ++;
    if(nC == 18)
    {
        li0.style["display"] = "none";
    }
}

function follow()
{
}

function ed()
{
}

function save()
{
    var content = "";
    for(var i = 0; i < files.length; i++)
    {
        console.log(i + " *** " + files[i]);
        content = content.concat("<"+files[i]+">" + '\n');
        content = content.concat(fileContent[files[i]] + '\n' + '\n');
    }
    download("collection",content);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}

function createFile(name)
{     
    download(name, fileContent[name]);
}

document.oncontextmenu = function(e){e.preventDefault()};
document.body.addEventListener("mouseup", showMenu, false);

function recount()
{
    for (var i=0, max=all.length; i < max; i++) 
    {
        wi = sWidth / all.length * i;
        g.style["width"]= wi+"px";
        var e = all[i];
        //e.onmouseup = null;
        if(e.tagName == "A") //||
        {
            linkArr[i] = e.href;
            e.href = "javascript: void(0)";
        }
        if(e.tagName == "SCRIPT")
        {
            scripts.push(e);
        }
        for(let j = 0; j < e.childNodes.length; j++)
        {    
            if(e.childNodes[j].nodeType == Node.TEXT_NODE)
            {   
                all[i].addEventListener("mouseover", function(e)
                {
                    text = e.target.textContent;
                    this.style["color"] = "blue";
                }, false);
                all[i].addEventListener("mouseout", function()
                {
                    this.style["color"] = "black";
                }, false);
                nodes ++;
            }
        }
    }

    for(var i = 0; i < scripts.length; i++)
    {
        scripts[i].parentElement.removeChild(scripts[i]);    
    }
}
recount();
