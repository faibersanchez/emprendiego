document.addEventListener("DOMContentLoaded", function() {
    // Manejo del envío del formulario
    document.getElementById("miFormulario").addEventListener("submit", function(event) {
        event.preventDefault();

        var formData = new FormData(event.target);

        fetch("procesar.php", {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    // Muestra la alerta de éxito
                    alertify.success("Formulario enviado correctamente.");

                    // Descarga el archivo PDF
                    return response.blob();
                } else if (response.status === 400) {
                    // Si hay errores, maneja la respuesta como JSON
                    return response.json();
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then(data => {
                if (data instanceof Blob) {
                    // Descarga el archivo PDF
                    var url = URL.createObjectURL(data);
                    var link = document.createElement("a");
                    link.href = url;
                    link.download = "prueba.pdf"; // Nombre del archivo
                    link.click();

                    // Espera un segundo antes de redirigir a una nueva página
                    setTimeout(function() {
                        window.location.href = "ThankYouPage.php";
                    }, 1000); // 1000 milisegundos = 1 segundo
                } else {
                    // Muestra los errores de validación usando Alertify.js
                    alertify.error(data.join("<br>"));
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });
    });
});