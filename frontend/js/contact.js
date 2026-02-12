const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        nombre: form.nombre.value.trim(),
        email: form.email.value.trim(),
        mensaje: form.mensaje.value.trim()
    };

    if (!data.nombre || !data.email || !data.mensaje) {
        status.textContent = "Por favor completa todos los campos.";
        return;
    }

    try {
        const res = await fetch("/api/contacto", {   // ← CAMBIO AQUÍ
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        status.textContent = result.success || "Mensaje enviado.";
        form.reset();

    } catch (error) {
        status.textContent = "Error al enviar. Inténtalo nuevamente.";
    }
});


