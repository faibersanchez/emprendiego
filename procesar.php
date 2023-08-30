<?php
// Validación del formulario
$errors = array();
$nError = 0;

if (empty($_POST['correo'])) {
  $nError = 1;
  $errors[] = "Debes digitar un correo electrónico.";
} elseif (!filter_var($_POST['correo'], FILTER_VALIDATE_EMAIL)) {
  $nError = 1;
  $errors[] = "El correo electrónico que digitaste no es válido.";
}

if (empty($errors)) {
  // Envía el archivo para descarga
  $rutaArchivo = "archivo/prueba.pdf";
  header("Content-Type: application/pdf");
  header("Content-Disposition: attachment; filename=prueba.pdf");
  readfile($rutaArchivo);
  exit; // Termina el script PHP
}

// Si hay errores, envíalos de vuelta a la página HTML
if($nError == 1){
  if (!empty($errors)) {
    // Devuelve los errores de validación como JSON
    http_response_code(400); // Establece el código de respuesta HTTP a 400 (Bad Request)
    echo json_encode($errors);
    exit;
  }
}
?>
