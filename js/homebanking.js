//Declaración de variables

var nombreUsuario = "Electra Zalazar";
var password = 1234;
var limiteExtraccion = 10000;
var saldoCuenta = 15000;
var servicioAgua = 350;
var servicioTelefono = 425;
var servicioLuz = 210;
var servicioInternet = 570;
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
    iniciarSesion();
}


//Función para cambiar el límite de extracción
function cambiarLimiteDeExtraccion() {
    var nuevoLimite = parseInt(prompt("Ingrese el nuevo limite de extraccion deseado", nuevoLimite));
    if (!isNaN(nuevoLimite) && nuevoLimite > 0) {
        limiteExtraccion = nuevoLimite;
        actualizarLimiteEnPantalla();
    } else {
        alert("El importe ingresado no es válido");
    }
}

// Funciones para extraer dinero

function extraerDinero() {
    var dineroAExtraer = parseInt(prompt("Ingrese el monto a extraer", dineroAExtraer));

    if (!isNaN(dineroAExtraer) && dineroAExtraer < 0) {
        alert("El importe ingresado no es válido");
    } else {
        if (verificarBilletes(dineroAExtraer) != true) {
            alert("Solo puedes extraer billetes de 100");
        } else if (dineroAExtraer > saldoCuenta) {
            alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero");
        } else if (dineroAExtraer > limiteExtraccion) {
            alert("La cantidad de dinero que deseas extraer es mayor a tu límite de extracción");
        } else {
            alert(
                "Has extraido: $" + dineroAExtraer + "\n" +
                "Saldo anterior: $" + saldoCuenta + "\n" +
                "Saldo actual: $" + restarDinero(dineroAExtraer));
            actualizarSaldoEnPantalla();
        }
    }
}

function verificarBilletes(extraccion) {
    if (extraccion % 100 == 0) {
        return true;
    } else {
        return false;
    }
}

function restarDinero(dineroAExtraer) {
    return (saldoCuenta -= dineroAExtraer);
}
//Funciones para depositar dinero

function depositarDinero() {
    var dineroADepositar = parseInt(prompt("Ingrese el monto a depositar", dineroADepositar));
    if (!isNaN(dineroADepositar) && dineroADepositar > 0) {
        alert(
            "Has depositado: $" + dineroADepositar + "\n" +
            "Saldo anterior: $" + saldoCuenta + "\n" +
            "Saldo actual: $" + sumarDinero(dineroADepositar));
        actualizarSaldoEnPantalla();
    }
    else {
        alert("El importe ingresado no es válido");
    }
}

function sumarDinero(dineroADepositar) {
    return (saldoCuenta += dineroADepositar);
}

//Funciones para el pago de servicios

function pagarServicio() {

    var servicio = parseInt(prompt(
        "Ingrese el número que corresponda con el servicio que desees pagar:" + "\n" +
        "1. Agua" + "\n" +
        "2. Luz" + "\n" +
        "3. Internet" + "\n" +
        "4. Teléfono"));

    switch (servicio) {
        case 1:
            if (saldoCuenta < servicioAgua) {
                alert("No hay suficiente saldo en tu cuenta para pagar este servicio");
            } else {
                alert("Has pagado el servicio Agua" + "\n" +
                    "Saldo anterior: $" + saldoCuenta + "\n" +
                    "Dinero descontado: $" + servicioAgua + "\n" +
                    "Saldo actual: $" + restarAgua(servicioAgua));
                actualizarSaldoEnPantalla();
            }
            break;

        case 2:
            if (saldoCuenta < servicioLuz) {
                alert("No hay suficiente saldo en tu cuenta para pagar este servicio");
            } else {
                alert("Has pagado el servicio Luz" + "\n" +
                    "Saldo anterior: $" + saldoCuenta + "\n" +
                    "Dinero descontado: $" + servicioLuz + "\n" +
                    "Saldo actual: $" + restarLuz(servicioLuz));
                actualizarSaldoEnPantalla();
            }
            break;

        case 3:
            if (saldoCuenta < servicioInternet) {
                alert("No hay suficiente saldo en tu cuenta para pagar este servicio");
            } else {
                alert("Has pagado el servicio Internet" + "\n" +
                    "Saldo anterior: $" + saldoCuenta + "\n" +
                    "Dinero descontado: $" + servicioInternet + "\n" +
                    "Saldo actual: $" + restarInternet(servicioInternet));
                actualizarSaldoEnPantalla();
            }
            break;

        case 4:
            if (saldoCuenta < servicioTelefono) {
                alert("No hay suficiente saldo en tu cuenta para pagar este servicio");
            } else {
                alert("Has pagado el servicio Telefono" + "\n" +
                    "Saldo anterior: $" + saldoCuenta + "\n" +
                    "Dinero descontado: $" + servicioTelefono + "\n" +
                    "Saldo actual: $" + restarTelefono(servicioTelefono));
                actualizarSaldoEnPantalla();
            }
            break;

        default: alert("No existe el servicio que se ha seleccionado");
            break;
    }
}

function restarAgua(servicioAgua) {
    return (saldoCuenta -= servicioAgua);
}

function restarLuz(servicioLuz) {
    return (saldoCuenta -= servicioLuz);
}

function restarInternet(servicioInternet) {
    return (saldoCuenta -= servicioInternet);
}

function restarTelefono(servicioTelefono) {
    return (saldoCuenta -= servicioTelefono);
}

//Funciones para realizar transferencias

function transferirDinero() {
    var dineroATransferir = parseInt(prompt("Ingrese el monto a transferir", dineroATransferir));

    if (!isNaN(dineroATransferir) && dineroATransferir > 0) {
        if (saldoCuenta < dineroATransferir) {
            alert("No puede transferirse esa cantidad de dinero porque el saldo no es suficiente");
        }
        else {
            var cuentaATransferir = parseInt(prompt("Ingrese a continuación el número de cuenta al que desea transferir el dinero", cuentaATransferir));

            if (cuentasAmigas(cuentaATransferir) == false) {
                alert("Sólo puede transferirse dinero a una cuenta previamente asociada");
            } else {
                alert("Se han transferido: $" + dineroATransferir + "\n" +
                    "Cuenta destino:" + cuentaATransferir);
                restarTransferencia(dineroATransferir);
                actualizarSaldoEnPantalla();
            }
        }
    } else {
        alert("El importe ingresado no es válido");
    }

}

function cuentasAmigas(cuenta) {
    switch (cuenta) {
        case cuentaAmiga1:
        case cuentaAmiga2:
            return true;
        default:
            return false;
            break;
    }
}

function restarTransferencia(dineroATransferir) {
    return (saldoCuenta -= dineroATransferir);
}

//Función para iniciar sesión

function iniciarSesion() {

    // The buttons to start & stop stream and to capture the image
var btnStart = document.getElementById( "btn-start" );
var btnStop = document.getElementById( "btn-stop" );
var btnCapture = document.getElementById( "btn-capture" );

// The stream & capture
var stream = document.getElementById( "stream" );
var capture = document.getElementById( "capture" );
var snapshot = document.getElementById( "snapshot" );

// The video stream
var cameraStream = null;

// Attach listeners
btnStart.addEventListener( "click", startStreaming );
btnStop.addEventListener( "click", stopStreaming );

// Start Streaming
function startStreaming() {

	var mediaSupport = 'mediaDevices' in navigator;

	if( mediaSupport && null == cameraStream ) {

		navigator.mediaDevices.getUserMedia( { video: true } )
		.then( function( mediaStream ) {

			cameraStream = mediaStream;

			stream.srcObject = mediaStream;

			stream.play();
		})
		.catch( function( err ) {

			console.log( "Unable to access camera: " + err );
		});
	}
	else {

		alert( 'Your browser does not support media devices.' );

        return;
        }
        // Stop Streaming
function stopStreaming() {

	if( null != cameraStream ) {

		var track = cameraStream.getTracks()[ 0 ];

		track.stop();
		stream.load();

		cameraStream = null;
	}
}
btnCapture.addEventListener( "click", captureSnapshot );

function captureSnapshot() {

	if( null != cameraStream ) {

		var ctx = capture.getContext( '2d' );
		var img = new Image();

		ctx.drawImage( stream, 0, 0, capture.width, capture.height );

		img.src		= capture.toDataURL( "image/png" );
		img.width	= 240;

		snapshot.innerHTML = '';

		snapshot.appendChild( img );
	}
}
}

/*    var inicioSesion = prompt("Ingrese su contraseña"), inicioSesion;
    var contrasenaIngresada = parseInt(inicioSesion);

    if (contrasenaIngresada === password) {
        alert("Bienvenido/a " + nombreUsuario + " ya puedes comenzar a realizar operaciones");
    } else {
        saldoCuenta = 0;
        nombreUsuario = " ";
        limiteExtraccion = 0;
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
        cargarNombreEnPantalla();
        alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.");
    }
    */
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}