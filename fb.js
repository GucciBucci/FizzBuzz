var button1 = document.getElementById("submit");
button1.onclick = login;
var button2 = document.getElementById("inc");
button2.onclick = increment;


let num;
//server variables
let uScore = 0; 
let username;


     
async function getScore() {
    let uName = document.getElementById("name").value;
    const response = await get("http://basic-web.dev.avc.web.usf.edu/"+uName);
    console.log(repsonse);
}

function getScore2(){
    return get("http://basic-web.dev.avc.web.usf.edu/"+uName).then(response => console.log(response));
}



// function login()
// {
//     let uName = document.getElementById("name").value;
//     username = uName;
//     score = servercheck(uName);
//     // score.then(function(response){
//     //     score = response;
//     // });

//     let input = uName;
//     if(input == undefined)
//     {
//         console.log("Please Log in first");
//     }
//     else
//     {
//         var greeting = document.getElementById("welcome");
//         //var input = document.getElementById("name").value;
//         //add if statement for undef input
//         greeting.innerHTML = "Hello, " + input;
//     }
// }

function login()
{
    let uName = document.getElementById("name").value;
    username = uName;

    if(uName == undefined)
    {
        console.log("Please Log in first");
    }
    else
    {
        var greeting = document.getElementById("welcome");
        greeting.innerHTML = "Hello, " + uName;
    }
    uScore = getScore2();
    uScore = servercheck(uName, uScore);

}

function increment()
{
    uScore = getScore2();
    uScore++;
    var fbString;
    if(uScore%3 == 0 && uScore%5 == 0)
        {
            fbValue.innerHTML = "FizzBuzz";
        }
    else if(uScore%3 == 0)
        {
            fbValue.innerHTML = "Fizz"
        }
    else if(uScore%5 == 0)
        {
            fbValue.innerHTML = "Buzz"
        }
    else
        {
            fbString = uScore.toString()
            fbValue.innerHTML = fbString;
        }
    
    var newData = {id: username, score: uScore};
    
        post("http://basic-web.dev.avc.web.usf.edu/"+username, newData).then(function(response){
            console.log("inc"+response.status);
        });
    
}

function servercheck(uName, fscore)
{
    var dataToSend = {score: fscore};
    console.log(fscore);
    post("http://basic-web.dev.avc.web.usf.edu/"+uName, dataToSend.score).then(function(response){
    console.log(response.status);
            switch(response.status){
            case 200:
            //User was updated successfully.
            //response.data will be the same as returned by get(), and should contain the updated data.
                return get("http://basic-web.dev.avc.web.usf.edu/"+uName).then(function(response){
                    //Put all code that relies on the data from this request in here.
                    username = response.data.id; //The username that was requested. In this case it is "myUserName".
                    return score = response.data.score; //The user's current score.
                });
            break;
            case 201:
            //A new user was successfully created. Otherwise same as status 200. 
                return get("http://basic-web.dev.avc.web.usf.edu/"+uName).then(function(response){
                    username = response.data.id; 
                    return score = 0; 
                });
            break;
            case 400:
            //Bad request. Most likely your data that you sent (in this case dataToSend) was formatted incorrectly, or you supplied a negative score value.
            //response.data will be: { Error: "error message" }
            console.error(response.data);
            break;
            case 500:
            //Something went wrong on the server, such as the database got deleted somehow. This should never happen.
            //response.data will be the same as status 400.
            console.error(response.data);
            break;  
        }
        });
}



// function servercheck(uName)
// {
//     const dataToSend = {id: uName, score: getScore()};
//     post("http://basic-web.dev.avc.web.usf.edu/"+uName, dataToSend).then(function(response){
//     console.log(response.status);
//             switch(response.status){
//             case 200:
//             //User was updated successfully.
//             //response.data will be the same as returned by get(), and should contain the updated data.
//                 return get("http://basic-web.dev.avc.web.usf.edu/"+uName).then(function(response){
//                     //Put all code that relies on the data from this request in here.
//                     username = response.data.id; //The username that was requested. In this case it is "myUserName".
//                     return score = response.data.score; //The user's current score.
//                 });
//             break;
//             case 201:
//             //A new user was successfully created. Otherwise same as status 200. 
//             get("http://basic-web.dev.avc.web.usf.edu/"+uName).then(function(response){
//                     username = response.data.id; 
//                     score = response.data.score; 
//                 });
//             break;
//             case 400:
//             //Bad request. Most likely your data that you sent (in this case dataToSend) was formatted incorrectly, or you supplied a negative score value.
//             //response.data will be: { Error: "error message" }
//             console.error(response.data);
//             break;
//             case 500:
//             //Something went wrong on the server, such as the database got deleted somehow. This should never happen.
//             //response.data will be the same as status 400.
//             console.error(response.data);
//             break;
            
//         }
//         return score;
//         });
// }

function get(url) {
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onload = function() {
        resolve({ status: http.status, data: JSON.parse(http.response) });
      };
      http.open("GET", url);
      http.send();
    });
}

function post(url, data) {
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onload = function() {
        resolve({ status: http.status, data: JSON.parse(http.response) });
      };
      http.open("POST", url);
      //Make sure that the server knows we're sending it json data.
      http.setRequestHeader("Content-Type", "application/json");
      http.send(data);
    });
}