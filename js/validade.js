class FormValidation {
    constructor() {
      this.form = document.querySelector('.form');
      this.events();
    }
  
    events() {
      this.form.addEventListener('submit', e => {
        this.handleSubmit(e);
      });
    }
  
    handleSubmit(e) {
      e.preventDefault();
  
      const validation = this.fieldValidation();

      if(validation) {

        var formData = new Object();
        $(".form").serializeArray().map(function (x) {
            formData[x.name] = x.value;
        });

        fetch("https://jbur6br2fe.execute-api.us-west-2.amazonaws.com/prod", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (response.ok) {
              document.querySelector("#success").textContent = "Sua mensagem foi enviada com sucesso";
              window.gtag("event", "conversion", {
                "send_to": "AW-873982630/ZpGMCKX-5sMDEKbV36AD",
              });
            } else {
              document.querySelector("#success").textContent =
                "Houve um erro no envio da sua mensagem. Por favor entre em contato pelo email";
            }
          })
          .catch((error) => {
            document.querySelector("#success").textContent =
              "Houve um erro no envio da sua mensagem. Por favor entre em contato pelo email";
          });
      }
    }

  
    fieldValidation() {
      let valid = true;
  
      for(let errorText of this.form.querySelectorAll('.error-text')) {
        errorText.remove();
      }
  
      for(let field of this.form.querySelectorAll('.validate')) {
        const label = field.name;
  
        if(!field.value) {
          this.createError(field, `Campo "${label}" não pode estar em branco.`);
          valid = false;
        } else {
            if(!this.validateRegex(field)) valid = false;
        }
  
      }
  
      return valid;
    }
  
    validateRegex(field) {
      const fieldName = field.name;
      const fieldValue = field.value;

      let valid = true;
  
      if (fieldName == 'nome') {
        if(!fieldValue.match(/.*[a-zA-Z].*/)) {
            this.createError(field, 'Nome inválido.');
            valid = false;
          }
      }

      if (fieldName == 'telefone') {
        if(!fieldValue.match(/.*\d{8,}.*/)) {
            this.createError(field, 'Telefone inválido.');
            valid = false;
          }
      }

      if (fieldName == 'email') {
        if(!fieldValue.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            this.createError(field, 'Email inválido.');
            valid = false;
          }
      }

      return valid;
    }
  
    createError(field, msg) {
      const div = document.createElement('div');
      div.innerHTML = msg;
      div.classList.add('error-text');
      field.insertAdjacentElement('afterend', div);
    }
  }
  
  const validation = new FormValidation();