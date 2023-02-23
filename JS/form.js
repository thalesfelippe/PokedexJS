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

    
var PokeValidator = {
    handleSubmit: (event) => {
        event.preventDefault();
        var send = true;

        var inputs = event.target.querySelectorAll('input');

        PokeValidator.clearErrors();

        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            var check = PokeValidator.checkInput(input);
            if (check !== true) {
                send = false;
                PokeValidator.showError(input, check);
            }
        }

        if (send) {
            event.target.submit();
        }
    },
    checkInput: (input) => {
        var rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split(',');
            for (var k in rules) {
                var rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'This field cannot be empty.';
                        }
                        break;

                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'This field must have ' + rDetails[1] + ' characters';
                        }
                        break;

                    case 'email':
                        if (input.value != '') {
                            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'This email is not valid.';
                            }
                        }
                        break;
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#FF0000';

        var errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.nextElementSibling);
    },
    clearErrors:() => {
        var inputs = form.querySelectorAll('input');
        for(var i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        var errorElements = document.querySelectorAll('.error');
        for(var i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};

var form = document.getElementById("register-form");
form.addEventListener('submit',PokeValidator.handleSubmit);

var form = document.getElementById("login-form");
form.addEventListener('submit',PokeValidator.handleSubmit);