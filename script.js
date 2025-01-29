document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');
    const searchButton = document.getElementById('searchButton');
    const cepInput = document.getElementById('cepInput');

    searchButton.addEventListener('click', function() {
        const cep = cepInput.value;
        const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    content.innerHTML = `<p>CEP não encontrado.</p>`;
                } else {
                    content.innerHTML = `
                        <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                        <p><strong>Bairro:</strong> ${data.bairro}</p>
                        <p><strong>Cidade:</strong> ${data.localidade}</p>
                        <p><strong>Estado:</strong> ${data.uf}</p>
                    `;
                }
            })
            .catch(error => {
                console.error('Erro ao consumir a API:', error);
                content.innerHTML = `<p>Erro ao consumir a API.</p>`;
            });
    });
});