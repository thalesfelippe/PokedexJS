let P5Validator = {
  handleSubmit:(event) => {
    event.preventDefault();
  }
};

let form = document.querySelector('p5validator');
form.addEventListener('submit', P5Validator.handleSubmit);