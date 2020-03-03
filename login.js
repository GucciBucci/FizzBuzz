var button = document.getElementById("submit");
button.onclick = log;
function log()
{
    var page1Name = document.getElementById("name").value;
    console.log("0" + page1Name + "0");
    if(page1Name == "")
    {  
        alert("Please Log in");
        console.log("1" + page1Name + "1");
    }
    else
    {
        console.log("2" + page1Name + "2");
        sessionStorage.setItem("userNameStorage", page1Name);
        location.replace("fizzbuzz.html");
    }
}