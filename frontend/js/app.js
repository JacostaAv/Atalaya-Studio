document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        mensaje: document.getElementById("mensaje").value
    };

    try {
        const res = await fetch("http://localhost:3000/enviar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        const data = await res.json();
        document.getElementById("respuesta").textContent = data.message;
    } catch (error) {
        document.getElementById("respuesta").textContent = "Error al enviar. Inténtalo nuevamente.";
    }
});
