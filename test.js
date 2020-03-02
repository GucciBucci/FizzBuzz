var usename;
var button = document.getElementById("submit");
button.onclick = Login;
var buttonInc = document.getElementById("inc");
buttonInc.onclick = Increment;

function Login()
{
    var name = document.getElementById("name").value;
    usename = document.getElementById("name").value;
    login.innerHTML = name;

    get("http://basic-web.dev.avc.web.usf.edu/"+usename).then(function(response){
       if(response.status == 200){
         username = response.data.id; //The username that was requested. In this case it is "myUserName".
         score = response.data.score; //The user's current score.
         FizzBuzzDisplay(score);
         console.log(score);
       }
       else{
         //User "myUserName" not found.
         //response.data is null
         post("http://basic-web.dev.avc.web.usf.edu/"+usename, { score: 0 }).then(function(response){
            FizzBuzzDisplay(score);
            console.log(response.status);
             }); //create a new user.
       }
     });

}

function Increment() 
{
    
    get("http://basic-web.dev.avc.web.usf.edu/"+usename).then(function(response){
        score = response.data.score;
        score++;
        FizzBuzzDisplay(score);
        console.log("score before post: "+score);
        post("http://basic-web.dev.avc.web.usf.edu/"+usename, {score: score}).then(function(response){
            console.log(response.status);    
            switch(response.status){
                case 200:
                   //User was updated successfully.
                   //response.data will be the same as returned by get(), and should contain the updated data.
                   console.log("Score during post: "+score) 
                   score = response.data.score;
                   break;
                 case 201:
                   //A new user was successfully created. Otherwise same as status 200.
                    score = response.data.score;
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
             });;
    });

}

function FizzBuzzDisplay(num)
{
    let fbString;
    if(num%3 == 0 && num%5 == 0)
        {
            fbVal.innerHTML = "FizzBuzz";
        }
    else if(num%3 == 0)
        {
            fbVal.innerHTML = "Fizz"
        }
    else if(num%5 == 0)
        {
            fbVal.innerHTML = "Buzz"
        }
    else
        {
            fbString = num.toString()
            fbVal.innerHTML = fbString;
        }
}


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

