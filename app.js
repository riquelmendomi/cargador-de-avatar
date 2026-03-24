import express from "express";
import fileUpload from "express-fileupload";

const app = express();

// Usar middleware para manejar las cargas de archivos
app.use(fileUpload());

// Ruta para cargar el avatar
app.post("/upload/avatar/:userId", (req, res) => {
  if (!req.files || !req.files.avatar) {
    return res.status(400).json({ error: "No se procesó ningún archivo" });
  }

  const avatar = req.files.avatar;
  const userId = req.params.userId;

  const allowedExtensions = ["png", "jpg", "webp", "jpeg", "gif"];

  const fileName = avatar.name;
  const extension = fileName.split(".").pop().toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    return res.status(400).json({
      error: "Extensión de archivo no permitida",
    });
  }

  // Ruta de destino donde se guardará el archivo
  const uploadPath = `uploads/avatars/${userId}.${extension}`;

  avatar.mv(uploadPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "Error al guardar el archivo",
      });
    }

    res.json({
      mensaje: "Avatar subido exitosamente",
    });
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});