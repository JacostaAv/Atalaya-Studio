const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
//app.use(express.static(path.join(__dirname, "public")));


// Ruta POST para guardar mensajes
app.post("/api/contacto", (req, res) => {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const newMessage = {
        nombre,
        email,
        mensaje,
        fecha: new Date().toISOString()
    };

    const filePath = path.join(__dirname, "messages.json");

    // Leer archivo existente o crear uno nuevo
    let messages = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, "utf8");
        messages = JSON.parse(data);
    }

    messages.push(newMessage);

    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

    res.status(200).json({ success: "Mensaje guardado correctamente" });
});


// Ruta para ver mensajes guardados
app.get("/messages", (req, res) => {
    const filePath = path.join(__dirname, "messages.json");

    if (!fs.existsSync(filePath)) {
        return res.send("<h2>No hay mensajes guardados.</h2>");
    }

    const data = fs.readFileSync(filePath, "utf8");
    const messages = JSON.parse(data);

    let html = "<h1>Mensajes recibidos</h1><ul>";

    messages.forEach(msg => {
        html += `
            <li>
                <strong>${msg.nombre}</strong> (${msg.email})<br>
                ${msg.mensaje}<br>
                <em>${msg.fecha}</em>
            </li><hr>
        `;
    });

    html += "</ul>";

    res.send(html);
});

//app.get("*", (req, res) => {
//    res.sendFile(path.join(__dirname, "public", "index.html"));
//});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
