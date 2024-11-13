document.querySelector('.pesquisa-compartilhar').addEventListener('input', function() {
    const query = this.value.trim();
    const listaSugestoes = document.querySelector('.lista-sugestao');
    
    // Limpar a lista de sugestões a cada nova digitação
    listaSugestoes.innerHTML = '';

    // Se a pesquisa não estiver vazia, faz a requisição
    if (query.length > 0) {
        // Fazer requisição AJAX para buscar usuários
        fetch(`php/buscar_usuarios_compartilhar.php?query=${query}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    // Se houver resultados, exibe-os
                    data.forEach(usuario => {
                        const li = document.createElement('li');
                        li.classList.add('user-linha');
                        li.setAttribute('data-usuario-id', usuario.USU_INT_ID);

                        const img = document.createElement('img');
                        img.src = usuario.USU_VAR_IMGPERFIL || '../view/img/user.jpg'; // Se não houver imagem, usa a padrão
                        img.alt = 'Profile';

                        const span = document.createElement('span');
                        span.textContent = usuario.USU_VAR_NAME;

                        li.appendChild(img);
                        li.appendChild(span);

                        // Ao clicar no usuário, adiciona à seleção
                        li.addEventListener('click', function() {
                            document.querySelector('.pesquisa-compartilhar').value = usuario.USU_VAR_NAME;
                            listaSugestoes.innerHTML = ''; // Limpar sugestões
                            // Armazenar o ID do usuário selecionado
                            document.querySelector('.compartilhar-btn').setAttribute('data-usuario-id', usuario.USU_INT_ID);
                        });

                        listaSugestoes.appendChild(li);
                    });
                } else {
                    // Se não encontrar nenhum usuário
                    listaSugestoes.innerHTML = '<h3>Nenhum usuário encontrado.</h3>';
                }
            })
            .catch(error => console.error('Erro na requisição:', error));
    }
    // Caso a pesquisa esteja vazia, a lista de sugestões é apagada
    else {
        listaSugestoes.innerHTML = '';
    }
});
