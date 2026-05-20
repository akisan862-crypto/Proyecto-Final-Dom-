// Esperar a que el HTML cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    // Obtener las referencias a los elementos del DOM
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsContainer = document.getElementById('comments-container');

    // Escuchar el evento 'submit' (enviar) del formulario
    commentForm.addEventListener('submit', function(evento) {
        // Evitar que la página se recargue al enviar el formulario
        evento.preventDefault(); 

        const textoComentario = commentInput.value.trim();
        if (textoComentario === '') return; // Validación por si está vacío

        // 1. Obtener fecha y hora actual
        const fechaActual = new Date();
        // Formato amigable: "dd/mm/aaaa, hh:mm"
        const fechaFormateada = fechaActual.toLocaleString('es-ES', { 
            day: '2-digit', month: '2-digit', year: 'numeric', 
            hour: '2-digit', minute: '2-digit' 
        });

        // 2. Generar un avatar aleatorio para el usuario que comenta (usando una API gratuita)
        const randomId = Math.floor(Math.random() * 1000);
        const avatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=Mascota${randomId}`;

        // 3. Crear el contenedor principal del nuevo comentario (Estructura tipo Tweet)
        // Usaremos innerHTML para crear la estructura interna más rápido,
        // pero creamos el elemento contenedor principal primero.
        const nuevoComentarioDiv = document.createElement('div');
        nuevoComentarioDiv.classList.add('comment-box');

        // 4. Construir la estructura interna del comentario
        nuevoComentarioDiv.innerHTML = `
            <img src="${avatarUrl}" alt="Avatar Usuario" class="user-avatar">
            <div class="comment-main">
                <div class="comment-header">
                    <span class="comment-username">Amigo Peludo</span>
                    <span class="comment-date">• ${fechaFormateada}</span>
                </div>
                <p class="comment-text">${textoComentario}</p>
                <button class="delete-btn">Eliminar</button>
            </div>
        `;

        // 5. Agregar el evento click al botón eliminar que acabamos de crear dentro del innerHTML
        nuevoComentarioDiv.querySelector('.delete-btn').addEventListener('click', () => {
            nuevoComentarioDiv.remove(); 
        });

        // 6. Agregar el nuevo comentario al principio de la sección (arriba de los anteriores)
        // Esto es muy común en los feeds modernos.
        commentsContainer.prepend(nuevoComentarioDiv);

        // 7. Limpiar el área de texto y hacerla pequeña de nuevo
        commentInput.value = '';
        commentInput.style.height = "60px"; // Reiniciar altura por defecto
    });

    // Bonus: Auto-ajustar altura del textarea mientras escribes
    commentInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});