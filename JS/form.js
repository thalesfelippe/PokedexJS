// Login screen
function exibeLogin(){
    var div = document.getElementById("load-pokeball");
    div.style.display = "flex";
    setTimeout(function(exibeLogin){ var div = document.getElementById("load-pokeball");
    div.style.display = "none"; }, 1000);
    setTimeout(function(exibeLogin){ var div = document.getElementById("login");
    div.style.display = "flex"; }, 1010);
    var div = document.getElementById("cadastro");
    div.style.display = "none";
    }

// Register screen
function exibeCadastro(){
    var div = document.getElementById("load-pokeball");
    div.style.display = "flex";
    setTimeout(function(exibeLogin){ var div = document.getElementById("load-pokeball");
    div.style.display = "none"; }, 1000);
    setTimeout(function(exibeLogin){ var div = document.getElementById("cadastro");
    div.style.display = "flex"; }, 1010);
    var div = document.getElementById("login");
    div.style.display = "none";
    }

// Validation Cadastro
let PokeValidator = {
  handleSubmit:(event) => {
      event.preventDefault();
      let send = true;

      let inputs = form.querySelectorAll('input');

      PokeValidator.clearErrors();

      for (let i = 0; i < inputs.length; i++) {
          let input = inputs[i];
          let check = PokeValidator.checkInput(input);
          if(check !== true) {
              send = false;
              PokeValidator.showError(input, check);
          }
      }

      if(send) {
          form.submit();
      }
  },
  checkInput:(input) => {
      let rules = input.getAttribute('data-rules');

      if(rules !== null) {
          rules = rules.split(',');
          for(let k in rules) {
              let rDetails = rules[k].split('=');
              switch(rDetails[0]) {
                  case 'required':
                      if(input.value == '') {
                          return 'Este campo não pode ser vazio.';
                      }
                      break;

                  case 'min':
                      if(input.value.length < rDetails[1]) {
                          return 'Este campo tem que ter '+rDetails[1]+' caracteres';
                      }
                      break;

                  case 'email':
                      if(input.value != '') {
                          let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                          if(!regex.test(input.value.toLowerCase())) {
                              return 'Este e-mail não e válido.';
                          }
                      }
                      break;
              }
          }
      }

      return true;
  },
  showError:(input, error) => {
      input.style.borderColor = '#FF0000';

      let errorElement = document.createElement('div');
      errorElement.classList.add('error');
      errorElement.innerHTML = error;

      input.parentElement.insertBefore(errorElement, input.nextElementSibling);
  },
  clearErrors:() => {
      let inputs = form.querySelectorAll('input');
      for(let i = 0; i < inputs.length; i++) {
          inputs[i].style = '';
      }

      let errorElements = document.querySelectorAll('.error');
      for(let i = 0; i < errorElements.length; i++) {
          errorElements[i].remove();
      }
  }
};

let form = document.querySelector('.pokevalidator');
form.addEventListener('submit',PokeValidator.handleSubmit);