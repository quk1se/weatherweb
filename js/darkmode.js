const darkbtn = document.getElementById("darkBtn");
const body = document.getElementById("body");

let darkMode = false;
function darkClick()
{
    if (!darkMode) 
    {
        darkbtn.style.marginLeft = "1.5vw";
        darkMode = true;
        body.classList.add("dark-body");
    }
    else
    {
        darkbtn.style.marginLeft = "0.2vw";
        darkMode = false;
        body.classList.remove("dark-body");
    }
    console.log("hello world");
}