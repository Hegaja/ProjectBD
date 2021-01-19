const inputCep = document.getElementById("cep");
const inputEndereco = document.getElementById("inputEndereco");
const inputBairro = document.getElementById("inputBairro");
const inputEstado = document.getElementById("inputEstado");
const inputCidade = document.getElementById("inputCidade");
const btnCep = document.getElementById("btnCep");
const resultadoCep = document.querySelector(".resultadoCep");

btnCep.addEventListener("click", handleClick);

function handleClick(event) {
    event.preventDefault();
    const cep = inputCep.value;
    buscaCep(cep);
}

function buscaCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((body) => {
            console.log(body);
            if (body.erro === true) {
                document.getElementById("cep").value = "CEP inválido";
            } else {
                inputEndereco.value = body.logradouro;
                inputCidade.value = body.localidade;
                inputEstado.value = body.uf;
                inputBairro.value = body.bairro;
            }
        });
}

function testCPF() {
    let strCPF = document.getElementById("inputCPF").value.replace(/[^0-9]/g, "");
    let error = 0;
    let soma;
    let resto;
    soma = 0;
    if (strCPF == "00000000000") {
        error = 1;
    }
    for (i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strCPF.substring(9, 10))) {
        error = 1;
    }
    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strCPF.substring(10, 11))) {
        error = 1;
    }

    if (error == 1) {
        document.getElementById("inputCPF").value = "CPF inválido";
    }
    // return;
}
