var emailTextField = document.getElementById('emailTextField');
var passwordTextField = document.getElementById('passwordTextField');
var loginButton = document.getElementById('loginButton');

firebase.auth().signOut();

loginButton.onclick = function() {Login();};
$(document).keypress(function(e) {
    if ((e.keyCode ? e.keyCode : e.which) == '13') Login();
});

function Login() {
  console.log('asdf');
  firebase.auth().signInWithEmailAndPassword(emailTextField.value, passwordTextField.value).catch(function(error) {
    $.alert({
      title: 'An error occurred',
      content: '(Error:' + error.message + ')',
      theme: 'modern',
      buttons: {
        Ok: {
          btnClass: 'btn-red',
          action: function() {}
        }
      }
    });
  });
}
