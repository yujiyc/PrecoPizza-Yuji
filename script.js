// Variáveis globais para armazenar entradas
var pizzas = []
var nome
var tamanho
var preco
var saida = document.getElementById("idOut")
var tableBody = document.querySelector("table tbody");
var tableHead = document.querySelector("table thead");

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault()
    console.log('ue');

    let isTelaValida = consistirTela()

    if (isTelaValida) {
        nome = document.getElementById("idNome").value
        tamanho = parseInt(document.getElementById("idTamanho").value)
        preco = parseFloat(document.getElementById("idPreco").value)

        let area = calcular()
        let preco_area = preco / area

        pizzas.push({ nome, tamanho, preco, preco_area })

        console.log(pizzas);

        let btRelatorio = document.getElementById("idBtRelatorio")
        btRelatorio.onclick = function () {
            relatorio()
        }
    }

})

// Função para verificar se a tela possui dados válidos
function consistirTela() {
    let nome = document.getElementById("idNome").value
    let tamanho = parseInt(document.getElementById("idTamanho").value)
    let preco = parseFloat(document.getElementById("idPreco").value)

    // Verifica se o campo nome é nulo
    if (nome == "" || nome == " ") {
        saida.value = "Campo Nome, preenchimento obrigatório"
        saida.classList.add("alerta")
        document.getElementById("idNome").focus()
        return false
    }

    // Verifica se o campo tamanho é nulo
    if (tamanho == "" || tamanho == " ") {
        saida.value = "Campo Tamanho, preenchimento obrigatório"
        saida.classList.add("alerta")
        document.getElementById("idTamanho").focus()
        return false
    }

    // Verifica se o campo tamanho é repetido
    if (pizzas.find(pizza => pizza.tamanho === tamanho)) {
        saida.value = "Tamanho já cadastrado"
        saida.classList.add("alerta")
        document.getElementById("idTamanho").focus()
        return false
    }

    // Verifica se o campo preco é nulo
    if (preco == "" || preco == " ") {
        saida.value = "Campo Preço, preenchimento obrigatório"
        saida.classList.add("alerta")
        document.getElementById("idPreco").focus()
        return false
    }

    saida.classList.remove("alerta")
    return true
}

function calcular() {
    let raio = tamanho / 2;
    return Math.PI * Math.pow(raio, 2);
}

function relatorio() {
    pizzas.sort((a, b) => a.preco_area - b.preco_area);

    tableHead.innerHTML = ""
    let row_ = tableHead.insertRow("tr");
    row_.innerHTML = `
            <td>Nome</td>
            <td>Tam.(cm)</td>
            <td>Preço</td>
            <td>R$ p/cm2</td>
            <td>Diferença %</td>
        `

    tableBody.innerHTML = ""

    pizzas.forEach((pizza, i) => {
        let row = tableBody.insertRow("tr");
        let cb = (pizza.preco_area - pizzas[0].preco_area) / pizzas[0].preco_area * 100
        row.innerHTML = `
            <td>${pizza.nome}</td>
            <td>${pizza.tamanho}</td>
            <td>R$${pizza.preco.toFixed(2)}</td>
            <td>R$${pizza.preco_area.toFixed(2)}</td>
            <td>${i === 0 ? "Melhor CB" : `+${cb.toFixed(0)}%`}</td>
        `
    })
}