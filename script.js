document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsContainer = document.getElementById('comments-container');

    commentForm.addEventListener('submit', function(evento) {
        evento.preventDefault(); 

        const textoComentario = commentInput.value.trim();
        if (textoComentario === '') return; 

  
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toLocaleString('es-ES', { 
            day: '2-digit', month: '2-digit', year: 'numeric', 
            hour: '2-digit', minute: '2-digit' 
        });


        const randomId = Math.floor(Math.random() * 1000);
        const avatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=Mascota${randomId}`;

       
        const nuevoComentarioDiv = document.createElement('div');
        nuevoComentarioDiv.classList.add('comment-box');

   
        nuevoComentarioDiv.innerHTML = `
            <img src="${avatarUrl}" alt="Avatar Usuario" class="user-avatar">
            <div class="comment-main">
                <div class="comment-header">
                    <span class="comment-username">Tú (Nuevo)</span>
                    <span class="comment-date">• ${fechaFormateada}</span>
                </div>
                <p class="comment-text">${textoComentario}</p>
                <button class="delete-btn">Eliminar</button>
            </div>
        `;

       
        nuevoComentarioDiv.querySelector('.delete-btn').addEventListener('click', () => {
            nuevoComentarioDiv.remove(); 
        });

      
        commentsContainer.prepend(nuevoComentarioDiv);

   
        commentInput.value = '';
        commentInput.style.height = "60px"; 
    });


    commentInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});