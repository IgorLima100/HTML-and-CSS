document.getElementById('cpf').addEventListener('input', function (event) {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length > 11) value = value.substring(0, 11);

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    event.target.value = value;
});

document.getElementById('telefone').addEventListener('input', function (event) {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length > 11) value = value.substring(0, 11);

    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d{4})$/, '$1-$2');

    event.target.value = value;
});

document.getElementById('meuFormulario').addEventListener('submit', function (event) {
    event.preventDefault();

    const cpf = document.getElementById('cpf').value;
    if (!validaCPF(cpf)) {
        alert('CPF inválido!');
        document.getElementById('cpf').style.borderColor = 'red';
    } else {
        document.getElementById('cpf').style.borderColor = 'green';
    }

    const telefone = document.getElementById('telefone').value;
    if (!validaTelefone(telefone)) {
        alert('Telefone inválido!');
        document.getElementById('telefone').style.borderColor = 'red';
    } else {
        document.getElementById('telefone').style.borderColor = 'green';
    }

    if (validaCPF(cpf) && validaTelefone(telefone)) {
        alert('Formulário enviado com sucesso!');
    }
});

function validaCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function validaTelefone(telefone) {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(telefone);
}
