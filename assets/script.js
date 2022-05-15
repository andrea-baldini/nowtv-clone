//----Manipolazione movie-item DOM----


//contatore utile per la gestione dell'inserimento/rimozione degli item nei vari box dei film
var count = 0;



//----MOUSE-EFFECT SOPRA AI MOVIE----
$('div.movie-list-item').mouseenter(function()
{
  
   $(this).find('i.fas').slideDown(300);
   $(this).find('span.movie-list-item-title').addClass('noTitle');
   
   
});

$('div.movie-list-item').mouseleave(function()
{  

   $(this).find('i.fas').slideToggle(300);
   $(this).find('span.movie-list-item-title').removeClass('noTitle');
   
  
});



//------APERTURA/CHIUSURA DEL BOX + lancio funzioni per riempire i suoi item
$('div.movie-list-item').click(function(){

   $('#opacity').fadeIn();

   $(window).scrollTop(0);
   
   $('div.movie-box').fadeIn();

   count++;
   removePicture(count);

   let idImg = $(this).find('img.movie-list-item-image').attr('id');
   let title = $(this).find('span.movie-list-item-title').text();
   
   insertPicture(idImg, title);

   let sinox = $(this).find('p.sinossi').text()
   insertSinox(sinox);

});


function insertPicture(image, title) {
   console.log(image)
   let imgSrc = document.getElementById(image).src;

   console.log(imgSrc)
   let divPicture = document.getElementById('movieTrailer'); 
   divPicture.innerHTML = `<img class="movie-trailer" src="${imgSrc}"> <span class="movie-list-item-title"><h2 class="more-movie-title">${title}</h2></span> `;
   
}

function removePicture(count){
   if (count % 2 == 0) {
      $('#movieTrailer').find('img').remove();
      $('#movieInfo').find('p').remove();
   }
}

function insertSinox(sinox) {
   let divSinox = document.getElementById('movieInfo');
   divSinox.innerHTML = `<p class="more-sinossi">${sinox}</p>`;
}

$('span.close-icon').click(function(){
   $('#opacity').fadeOut();

   $(window).scrollTop(0);
   
   $('div.movie-box').toggle();
   count++;
   removePicture(count);
})
//-------------------------------



//--------TRAILER VIDEO----------
$('#dontlookup').click(function(){

   $('span.close-icon').attr("id","closeVideo");

   $('#movieTrailer').html(`
   <video controls autoplay id="v1" poster="assets/images/movie image/test dontlook.jpg">
      <source id="source1" src ="assets/video/dontlookup-trailer.mp4">
      <source id="source1" src ="assets/video/dontlookup-trailer.ogg" type= "video/ogg">
      Spiacente, il tuo browser non supporta il tag VIDEO
   </video>
   `)

   let video = document.getElementById("v1");
   //verifico il localstorage e faccio partite il video dall'ultimo punto
   for (var key in localStorage){
      if (key == "v1"){
         video.currentTime = localStorage.getItem(key)
      }
   }

});

//metto in pausa il video e salvo il currentTime
$(document).on("click", '#closeVideo', function(){
   let video = document.getElementById("v1");
   let idVideo = $('video').attr("id")
   let currentTime = video.currentTime.toFixed(1);

   localStorage.setItem(idVideo, currentTime)
   video.pause()
   $('span.close-icon').removeAttr("id","closeVideo");
})
//-----------------------------------------



//------SLIDE EFFECT------
$( 'span.material-icons#right' ).click(function() {

   let div = document.querySelector('div#bestMovie div:nth-of-type(1)');
   slideOut(div).then(() => {
      $('div#bestMovie div.movie-list-item').show("slide", { direction: "left" }, 10);
   })

 });


$( 'span.material-icons#left' ).click(function() {

   let div = document.querySelector('div#bestMovie div:nth-of-type(5)');
   slideIn(div).then(() => {
      $('div#bestMovie div.movie-list-item').show("slide", { direction: "right" }, 10);
   })
});


function slideOut(div){
   return new Promise((resolve) => {
      let parent = document.getElementById('bestMovie');
      $(parent).append(div);

      resolve($('div#bestMovie div.movie-list-item').hide("slide", { direction: "right" }, 10));

      
   });
 }

function slideIn(div){
   return new Promise((resolve) => {
      let parent = document.getElementById('bestMovie');
      $(parent).prepend(div);

      resolve($('div#bestMovie div.movie-list-item').hide("slide", { direction: "left" }, 10));

      
   });
}
//-----------------------------------------



//--------VALIDAZIONE FORM CONTATTI--------

$('form#contact').on('submit', function(e){

   e.preventDefault()

   const regNumber = /^\d+$/; //reg con tutti i numeri

   const regEmail =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

   let name = document.getElementById('name').value 
   let surname = document.getElementById('surname').value
   let email = document.getElementById('email').value 
   let tel = document.getElementById('tel').value 

   $('form').find('label.error').remove();
   $('input').css({"border": "", "background-color": ""}); 

   console.log(name, surname, email, tel)

   if (
      email == "" || email == undefined || !regEmail.test(email) ||
      name == "" || name == undefined || regNumber.test(name) ||
      surname == "" || surname == undefined || regNumber.test(surname) ||
      tel == "" || tel == undefined || !regNumber.test(tel)
      )

  {
     console.log(!regEmail.test(email))
     console.log(regNumber.test(surname))
     console.log(regNumber.test(name))
     console.log(!regNumber.test(tel))


      if (regNumber.test(name) == true){
         $('#name').css({"border": "1px solid red", "background-color": "#ffe4e4"}); 
         $('#name').after("<label class='error' for='name'>Solo caratteri</label>");
      } 
      if (regNumber.test(surname) == true){
         $('#surname').css({"border": "1px solid red", "background-color": "#ffe4e4"}); 
         $('#surname').after("<label class='error' for='surname'>Solo caratteri</label>");
      } 
      if (!regEmail.test(email) == true){
         $('#email').find('label').remove();
         $('#email').css({"border": "1px solid red", "background-color": "#ffe4e4"}); 
         $('#email').after("<label class='error' for='email'>Controlla scrittura email</label>");
      } 
      if (!regNumber.test(tel) == true){
         $('#tel').css({"border": "1px solid red", "background-color": "#ffe4e4"}); 
         $('#tel').after("<label class='error' for='tel'>Solo numeri</label>");
      } 


      $('div.title-contact h2').html("<h2></h2>");
      $('div.title-contact h3').text("Qualcosa è andato storto :(").css("color", "#ffe4e4");;
  } else {
      $('div.title-contact h2').html("<h2></h2>");
      $('div.title-contact h3').text("Grazie, ti ricontatteremo al più presto").css("color", "green");
  }

})



//--------LOGIN POPUP-------

function loginPopup(){
   
  $('#popup').toggle();
 
 let signupForm = $('.form-container').find("#signup-form");
 if(signupForm.length > 0){
    $('#signup-form').remove();
    $('.form-container').append(`
    <form id="login-form" action="">
                         
      <input placeholder="Email" type="text" id="email-login" value="" required>
      <input placeholder="Password" type="text" id="password-login" value="" required>
      
      <button name="submit" type="submit" class="button" form="login-form" id="login-submit">Accedi</button>

      <div class="checkbox" id="missed-new-account">
         <a href="#recovery" >Hai dimenticato la password?</a>
         <a href="#new" id="new-account" onclick="newAccount()">Non sei registrato? Crea un account</a>
      </div>
   </form>      
    `);
 }
}



//--------SIGNUP POPUP-------
function newAccount(){
   $('#login-form').remove();
   $('.form-container').append(`
   <form id="signup-form" action="">
                         
      <input placeholder="Email" type="text" id="email-signup" required>

      <input placeholder="Password" type="text" id="password-signup" required>

      <input placeholder="Conferma password" type="text" id="confirm-password-signup" required>

      <div class="checkbox">
      <input type="checkbox" id="check-signup" name="terms-signup" value="yes" required>
      <label for="terms-signup">Accetto termini e condizioni</label>
      </div>
      
      <button name="submit" type="submit" class="button" form="signup-form" id="login-submit">Registrati</button>
      <h3 id="welcome"></h3>
   </form>
   `)
}



// -------FORM LOGIN VALIDATION-------

$(document).on('submit', '#login-form', function(e){
   e.preventDefault()

   const regPassw = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"); 

   const regEmail =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

   let email = document.getElementById('email-login').value;
   let password = document.getElementById('password-login').value;

   $('form').find('label.error').remove();
   $('input').css({"border": "", "background-color": ""});

   console.log( email, password)

   if (
      email == "" || email == undefined || !regEmail.test(email) ||
      password == "" || password == undefined || !regPassw.test(password)
      )

  {
     console.log(!regEmail.test(email))
     console.log(!regPassw.test(password))

      if (!regEmail.test(email) == true){
         $('#email-login').css({"border": "1px solid red", "background-color": "#ffe4e4"}); 
         $('#email-login').after("<label class='error' for='email'>Controlla scrittura email</label>");
      } 
      if (!regPassw.test(password) == true){
         $('#password-login').css({"border": "1px solid red", "background-color": "#ffe4e4"}); 
         $('#password-login').after("<label class='error' for='tel'>Deve contenere: una maiuscola, un simbolo, un numero, 8 caratteri</label>");
      } 

  } else {
      $('#missed-new-account').empty();
      $('#missed-new-account').after("<h3 style='margin-top:10px; color:green'>Benvenuto...</h3>");
  }
})



//-------FORM SIGNUP VALIDATION------
$(document).on('submit', '#signup-form', function(e){
   e.preventDefault();

   const regPassw = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"); 

   const regEmail =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

   let email = document.getElementById('email-signup').value;
   let password = document.getElementById('password-signup').value;
   let confirmPassword = document.getElementById('confirm-password-signup').value;

   $('form').find('label.error').remove();
   $('input').css({"border": "", "background-color": ""});

   if (
      email == "" || email == undefined || !regEmail.test(email) ||
      password == "" || password == undefined || !regPassw.test(password) || 
      (password != confirmPassword) 
      )

  {

      if (!regEmail.test(email) == true){
         $('#email-signup').css({"border": "1px solid red", "background-color": "#ffe4e4"}); 
         $('#email-signup').after("<label class='error' for='email'>Controlla scrittura email</label>");
      } 
      if (!regPassw.test(password) == true){
         $('#password-signup').css({"border": "1px solid red", "background-color": "#ffe4e4"}); 
         $('#password-signup').after("<label class='error' for='tel'>Deve contenere: una maiscuola, un simbolo, un numero, 8 caratteri</label>");
      } 
      if (password != confirmPassword){
         $('#confirm-password-signup').css({"border": "1px solid red", "background-color": "#ffe4e4"}); 
         $('#confirm-password-signup').after("<label class='error' for='tel'>Deve essere uguale alla password</label>");
      }


      $('#welcome').html("<h3 style='margin-top:10px;  color:#ffe4e4'>Ops :)</h3>");
  } else {
      $('#welcome').html("<h3 style='margin-top:10px; color:green'>Benvenuto...</h3>");
  }
})
