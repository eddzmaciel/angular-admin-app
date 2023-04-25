Facebook:

## Set Up the Facebook SDK for Javascript

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>

## Check Login Status

FB.getLoginStatus(function(response) {
statusChangeCallback(response);
});

-- The response object that's provided to your callback contains a number of fields:

{
status: 'connected',
authResponse: {
accessToken: '...',
expiresIn:'...',
signedRequest:'...',
userID:'...'
}
}

## Add the Facebook Login Button

<fb:login-button
scope="public_profile,email"
onlogin="checkLoginState();">
</fb:login-button>

## This is the callback. It calls FB.getLoginStatus() to get the most recent login state. (statusChangeCallback() is a function that's part of the example that processes the response.)

function checkLoginState() {
FB.getLoginStatus(function(response) {
statusChangeCallback(response);
});
}

## full code example:

<!DOCTYPE html>
<html>
<head>
<title>Facebook Login JavaScript Example</title>
<meta charset="UTF-8">
</head>
<body>
<script>

function statusChangeCallback(response) { // Called with the results from FB.getLoginStatus().
console.log('statusChangeCallback');
console.log(response); // The current login status of the person.
if (response.status === 'connected') { // Logged into your webpage and Facebook.
testAPI();  
 } else { // Not logged into your webpage or we are unable to tell.
document.getElementById('status').innerHTML = 'Please log ' +
'into this webpage.';
}
}

function checkLoginState() { // Called when a person is finished with the Login Button.
FB.getLoginStatus(function(response) { // See the onlogin handler
statusChangeCallback(response);
});
}

window.fbAsyncInit = function() {
FB.init({
appId : '2463393877128665',
cookie : true, // Enable cookies to allow the server to access the session.
xfbml : true, // Parse social plugins on this webpage.
version : '{api-version}' // Use this Graph API version for this call.
});

    FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
      statusChangeCallback(response);        // Returns the login status.
    });

};

function testAPI() { // Testing Graph API after login. See statusChangeCallback() for when this call is made.
console.log('Welcome! Fetching your information.... ');
FB.api('/me', function(response) {
console.log('Successful login for: ' + response.name);
document.getElementById('status').innerHTML =
'Thanks for logging in, ' + response.name + '!';
});

WTF
}

</script>

<!-- The JS SDK Login Button -->

<fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
</fb:login-button>

<div id="status">
</div>

<!-- Load the JS SDK asynchronously -->
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
</body>
</html>
