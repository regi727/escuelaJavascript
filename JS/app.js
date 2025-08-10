

//Formulario de contacto
const contactForm = document.getElementById("contactForm");
const inputContactName = document.getElementById("inputContactName");
const inputTelContact = document.getElementById("inputTelContact");
const inputEmailContact = document.getElementById("inputEmailContact");
const inputTextarea = document.getElementById("inputTextarea");
//Fin Formulario de contacto 



//Expresiones regulares
const validarNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/

const validarEmail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/
const validarSoloNumero = /^\d+$/;

const validarNumTelefonico = /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

const comprobarPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
//Fin expresiones regulares 

//Expresiones regulares
const validarCVV = /^[0-9]{3}$/
const visa = /^4[0-9]{12}(?:[0-9]{3})?$/
const discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
const mastercard = /^5[1-5][0-9]{14}$/
const jcb = /^(?:2131|1800|35\d{3})\d{11}$/
//Formato de fecha: dd-mm-aaaa
const validarFecha = /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/

const regex = /^(\d\s?){15,16}$/; // 16 digitos o de 4 en 4 separados por espacios.



//Formulario de contacto
const formularioEnviado = () => {
  if (inputContactName.value && inputEmailContact.value && inputTelContact.value && inputTextarea.value !== "") {
    mensajeExito.classList.remove("d-none")
    mensajeExito.textContent = "Mensaje enviado con exito."
  }
}

if (contactForm) {

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    mensajeExito.classList.add("d-none");

    console.log("Formulario de contacto");

    if (!validarNombre.test(inputContactName.value) || !inputContactName.value.trim() || inputContactName.value.length < 3) {

      alertNombre.classList.remove("d-none");
      alertNombre.textContent = "Nombre no valido.";

      inputContactName.classList.remove("d-none")
      inputContactName.classList.add("is-invalid")

    } else {
      alertNombre.classList.add("d-none");
      inputContactName.classList.remove("is-invalid")
      inputContactName.classList.add("is-valid");
    }

    if (!validarNombre.test(inputTextarea.value) || !inputTextarea.value.trim()) {

      alertMensaje.classList.remove("d-none");
      alertMensaje.textContent = "Campo obligatorio";

      inputTextarea.classList.remove("d-none")
      inputTextarea.classList.add("is-invalid")
    } else {
      alertMensaje.classList.add("d-none");
      inputTextarea.classList.remove("is-invalid")
      inputTextarea.classList.add("is-valid");
    }

    if (!validarEmail.test(inputEmailContact.value) || !inputEmailContact.value.trim()) {

      alertEmail.classList.remove("d-none");
      alertEmail.textContent = "Email no valido";

      inputEmailContact.classList.remove("d-none")
      inputEmailContact.classList.add("is-invalid")
    } else {
      alertEmail.classList.add("d-none");
      inputEmailContact.classList.remove("is-invalid")
      inputEmailContact.classList.add("is-valid");
    }
    validarTelefono();
    formularioEnviado();
    contactForm.reset();
  })
}

const validarTelefono = () => {
  if (!validarSoloNumero.test(inputTelContact.value) || !inputTelContact.value.trim() || !validarNumTelefonico.test(inputTelContact.value)) {

    alertTelefono.classList.remove("d-none");
    alertTelefono.textContent = "Número no valido.";
    inputTelContact.classList.remove("d-none")
    inputTelContact.classList.add("is-invalid")
  } else {
    alertTelefono.classList.add("d-none");
    inputTelContact.classList.remove("is-invalid")
    inputTelContact.classList.add("is-valid");
  }
}

//Fin Formulario de contacto 



//Formulario de pagos 

const formularioPago = document.querySelector("#formularioPago");
const numeroTarjeta = document.querySelector("#numeroTarjeta");
const numeroCVV = document.querySelector("#numeroCVV");
const numeroAno = document.querySelector("#numeroAno");
const duenoTarjeta = document.querySelector("#duenoTarjeta");
const tarjetas = document.querySelector("#tarjetas");
const paypal = document.querySelector("#paypal");
//const btnPaypal = document.querySelector('#btnPaypal').disabled = true;

const alertName = document.querySelector("#alertName");
const alertCardNumber = document.querySelector("#alertCardNumber");
const btnPaypal = document.querySelector("#btnPaypal");
const alertDate = document.querySelector("#alertDate");
const alertCVV = document.querySelector("#alertCVV");
const alertNumTarjeta = document.querySelector("#alertNumTarjeta");
const msgTarjeta = document.querySelector("#msgTarjeta");

//const modal = bootstrap.Modal.getInstance(document.getElementById("formularioPago"));




document.addEventListener("DOMContentLoaded", function () {

  tarjetas.addEventListener("change", function () {
    if (tarjetas.checked) {
      formularioPago.classList.remove('d-none');
      //document.querySelector("#btnPaypal").disabled = true;
      btnPaypal.classList.add("d-none")
    } else {
      formularioPago.classList.add('d-none');
    }
  });

  paypal.addEventListener("change", function () {
    if (paypal.checked) {
      formularioPago.classList.add('d-none');
      btnPaypal.classList.remove("d-none")
      alertCardNumber.classList.add("d-none");
      alertName.classList.add("d-none");
      alertCVV.classList.add("d-none");
      alertDate.classList.add("d-none");
    } else {
      formularioPago.classList.remove("d-none")
      document.querySelector("#btnPaypal").disabled = true;
    }
  });
});


const compraExitosa = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Gracias por su compra!",
    text: "Tan pronto su pedido será enviado.",
    showConfirmButton: false,
    timer: 3000
  });
}
const MostrarErrores = (errores) => {
  errores.forEach(item => {
    item.tipo.classList.remove("d-none");
    item.tipo.textContent = item.mensaje
  })
}

const validarVisa = () => {
  if (!visa.test(numeroTarjeta.value)) {
    msgTarjeta.classList.add("d-none");
    /*
    errores.push({
      tipo: msgTarjeta,
      mensaje:"Error: No es una tarjeta."
      )}
      */
    // console.log("Otro tarjeta");
  } else {
    msgTarjeta.classList.remove("d-none");
    msgTarjeta.textContent = "Visa";
  }
}

const validarMastercard = () => {
  if (!mastercard.test(numeroTarjeta.value)) {
    msgTarjeta.classList.add("d-none");
    /*
    errores.push({
      tipo: msgTarjeta,
      mensaje:"Error: No es una tarjeta."
   )}*/
    // console.log("Otro tarjeta");
  } else {
    msgTarjeta.classList.remove("d-none");
    msgTarjeta.textContent = "Mastercard";
  }
}
const validarDiscover = () => {
  if (!discover.test(numeroTarjeta.value)) {
    msgTarjeta.classList.add("d-none");
    /*
    errores.push({
      tipo: msgTarjeta,
      mensaje:"Error: No es una tarjeta."
      )}*/
    // console.log("Otro tarjeta");
  } else {
    msgTarjeta.classList.remove("d-none");
    msgTarjeta.textContent = "Discover";
  }
}
const validarJBC = () => {
  if (!jcb.test(numeroTarjeta.value)) {
    msgTarjeta.classList.add("d-none");
    /*
    errores.push({
      tipo: msgTarjeta,
      mensaje:"Error: No es una tarjeta."
   )}*/
    // console.log("Otro tarjeta");
  } else {
    msgTarjeta.classList.remove("d-none");
    msgTarjeta.textContent = "JCB";
  }
}

formularioPago.addEventListener('submit', (e) => {
  e.preventDefault();
  const errores = [];

  if (!regex.test(numeroTarjeta.value) || !numeroTarjeta.value.trim()) {
    alertCardNumber.classList.remove("d-none");
    alertCardNumber.textContent = "Error: El número de la tarjeta es invalido.";
    errores.push({
      tipo: alertCardNumber,
      mensaje: "Error: El número de la tarjeta es invalido."
    });
  } else {
    alertCardNumber.classList.add("d-none");
  }

  if (!validarNombre.test(duenoTarjeta.value) || !duenoTarjeta.value.trim() || duenoTarjeta.value.length < 3) {
    alertName.classList.remove("d-none");
    alertName.textContent = "Erro: El nombre no es válido";
    errores.push({
      tipo: alertName,
      mensaje: "Erro: El nombre no es válido"
    });
  } else {
    alertName.classList.add("d-none");
  }

  if (!validarFecha.test(numeroAno.value) || !numeroAno.value.trim()) {
    alertDate.classList.remove("d-none");
    alertDate.textContent = "Erro: La fecha no es valida.";
    errores.push({
      tipo: alertDate,
      mensaje: "Erro: La fecha no es válida."
    });
  } else {
    alertDate.classList.add("d-none");
  }

  if (!validarCVV.test(numeroCVV.value) || !numeroCVV.value.trim()) {
    alertCVV.classList.remove("d-none");
    alertCVV.textContent = "Error: El cvv no es válido.";
    errores.push({
      tipo: alertCVV,
      mensaje: "Error: El cvv no es válido."
    });
  } else {
    alertCVV.classList.add("d-none");
  }

  if (errores.length !== 0) {
    MostrarErrores(errores);
    return;
  }

  // Validaciones de tarjetas
  validarMastercard();
  validarDiscover();
  validarJBC();

  // Mostrar mensaje de compra exitosa
  compraExitosa();

  // Limpiar formulario
  formularioPago.reset();

  // Cerrar el modal de forma segura
  const modal = bootstrap.Modal.getInstance(document.getElementById('Backdrop')) || new bootstrap.Modal(document.getElementById('Backdrop'));
  modal.hide();

  // Cerrar offcanvas (carrito)
  const offcanvasElement = document.getElementById('staticBackdrop');
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
  if (offcanvas) {
    offcanvas.hide();
  }

});



/*===========Formularios==========*/
//Formulario de registro
const signupForm = document.getElementById("signupForm");
const inputNombreRegistro = document.getElementById("inputNombreRegistro");
const inputEmailRegistro = document.getElementById("inputEmailRegistro");
const inputContrasenaRegistro = document.getElementById("inputContrasenaRegistro");
const repiteContrasena = document.getElementById("repiteContrasena");
const inputPais = document.getElementById("inputPais");

const alertNombreRegistro = document.getElementById("alertNombreRegistro");
const alertEmailRegistro = document.getElementById("alertEmailRegistro");
const alertPasswordRegistro = document.getElementById("alertPasswordRegistro");
const alertRepitePassRegistro = document.getElementById("alertRepitePassRegistro");
const alertSelectPais = document.getElementById("alertSelectPais");
//Fin formulario de registro 


//Recuper contraseña 
const passRecoveryForm = document.getElementById("passRecoveryForm");
const inputEmailRecovery = document.getElementById("inputEmailRecovery");
//Fin recuperar contraseña 



//Formulario de suscripción 
const subscribeForm = document.getElementById("subscribeForm");
const inputSubscribe = document.getElementById("inputSubscribe");
const alertNombre = document.getElementById("alertNombre");
const alertEmail = document.getElementById("alertEmail");
const alertTelefono = document.getElementById("alertTelefono");
const alertMensaje = document.getElementById("alertMensaje");
const mensajeExito = document.getElementById("mensajeExito");
const alertSubscribe = document.getElementById("alertSubscribe");
//Fin formulario de suscripción 





const validarPassword = () => {
  if (!comprobarPassword.test(inputContrasenaRegistro.value) || !inputContrasenaRegistro.value.trim()) {

    alertPasswordRegistro.classList.remove("d-none")
    inputContrasenaRegistro.classList.add("is-invalid")
    alertPasswordRegistro.textContent = ' Error: La contraseña no valida'
  } else {
    alertPasswordRegistro.classList.add("d-none")
    inputContrasenaRegistro.classList.remove("is-invalid")
    inputContrasenaRegistro.classList.add("is-valid")
  }
  if (!repiteContrasena.value.trim()) {

    alertRepitePassRegistro.classList.remove("d-none")
    repiteContrasena.classList.remove("is-valid")
    repiteContrasena.classList.add("is-invalid")
    alertRepitePassRegistro.textContent = "Error: El campo está vacio."
  } else {
    alertRepitePassRegistro.classList.add("d-none");
    repiteContrasena.classList.remove("is-invalid")
    repiteContrasena.classList.add("is-valid")
  }

}

const comprobarContrasenas = () => {
  if (repiteContrasena.value === inputContrasenaRegistro.value) {

    // alertRepitePassRegistro.classList.add("d-none")
    // repiteContrasena.classList.remove("is-invalid")
    repiteContrasena.classList.add("is-valid")


  } else {
    alertRepitePassRegistro.classList.remove("d-none")
    repiteContrasena.classList.remove("is-valid")
    repiteContrasena.classList.add("is-invalid")

    alertRepitePassRegistro.textContent = "Error: Las contraseñas no coinciden."
  }
}


signupForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validarNombre.test(inputNombreRegistro.value) || !inputNombreRegistro.value.trim() || inputNombreRegistro.value.length < 3) {

    alertNombreRegistro.classList.remove("d-none");
    alertNombreRegistro.textContent = "Error: El campo nombre no es valido.";
    inputNombreRegistro.classList.add("is-invalid")

  } else {
    inputNombreRegistro.classList.remove("is-invalid")
    alertNombreRegistro.classList.add("d-none");
    inputNombreRegistro.classList.add("is-valid")
  }

  if (!validarEmail.test(inputEmailRegistro.value) || !inputEmailRegistro.value.trim()) {

    alertEmailRegistro.classList.remove("d-none");
    alertEmailRegistro.textContent = "Error: El campo email no es valido.";
    inputEmailRegistro.classList.add("is-invalid")

  } else {
    inputEmailRegistro.classList.remove("is-invalid")
    alertEmailRegistro.classList.add("d-none");
    inputEmailRegistro.classList.add("is-valid")
  }
  if (inputPais.selectedIndex === 0) {
    console.log("")
    alertSelectPais.classList.remove("d-none")
    alertSelectPais.textContent = "Error: El campo país es requerido"
  } else {
    alertSelectPais.classList.add("d-none")
  }

  validarPassword();
  comprobarContrasenas();
  // registroExitoso()
})

//Fin Formulario de registro 


//Formulario de Subscripción 
subscribeForm?.addEventListener('submit', (e) => {
  e.preventDefault();


  if (!validarEmail.test(inputSubscribe.value) || !inputSubscribe.value.trim()) {
    alertSubscribe.classList.remove("d-none");
    alertSubscribe.textContent = "Email no valido,o el campo está vacio";

    inputSubscribe.classList.remove("d-none")
    inputSubscribe.classList.add("is-invalid");

  } else {
    inputSubscribe.classList.remove("is-invalid")
    alertSubscribe.classList.add("d-none");
    inputSubscribe.classList.add("is-valid");

    subscribeExitoso();
    subscribeForm.reset();

  }
})
//Fin Formulario de Subscripción 



//Formulario iniciar sesión con sesión storage
const loginForm = document.getElementById("loginForm");
const inputEmailLogin = document.getElementById("inputEmailLogin")
const inputContrasenaLogin = document.getElementById("inputContrasenaLogin");
//Fin Formulario de login


const password = "Web2024";

loginForm?.addEventListener('submit', (e) => {

  e.preventDefault();
  console.log("Login")
  if (!validarEmail.test(inputEmailLogin.value) || !inputEmailLogin.value.trim() || inputContrasenaLogin.value !== "web2024") {
    errorLogin.classList.remove("d-none")
    errorLogin.textContent = "Error: Email o password es incorrecto."
  } else {
    errorLogin.classList.add("d-none");
    console.log("Hola mundo..")

    loginExitoso();
    loginForm.reset();

    //Cerrar el modal de forma segura
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop2')) || new bootstrap.Modal(document.getElementById('staticBackdrop2'));
    loginModal.hide();
  }

})
const registroExitoso = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Haz registrado con exito!",
    text: "Gracias por registrarse.",
    showConfirmButton: false,
    timer: 3000
  });
}

const loginExitoso = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Haz logueado con exito!",
    text: "Bienvenido al sistema.",
    showConfirmButton: false,
    timer: 3000
  });
}

const subscribeExitoso = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Gracias por subscribirse.!",
    text: "Bienvenido a nuestros servicios de anuncios.!!!",
    showConfirmButton: false,
    timer: 3000
  });
  inputSubscribe.classList.remove("is-valid");
}

//Fin Formulario iniciar sesión con sesión storage 


passRecoveryForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Hola mundo.")
})

