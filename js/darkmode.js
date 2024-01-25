const darkbtn = document.getElementById("darkBtn");
let darkMode = false;
function darkClick()
{
    if (!darkMode) 
    {
        darkbtn.style.marginLeft = "1.5vw";
        darkMode = true;
    }
    else
    {
        darkbtn.style.marginLeft = "0.2vw";
        darkMode = false;
    }
    console.log("hello world");
}