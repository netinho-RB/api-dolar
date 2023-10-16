const valorDolarElement = document.getElementById("valorDolar");
const dataCotacaoElement = document.getElementById("dataCotacao");
const quantidadeCompradaInput = document.getElementById("quantidadeComprada");
const valorCompraInput = document.getElementById("valorCompra");
const quantidadeVendidaInput = document.getElementById("quantidadeVendida");
const cotacaoAtualInput = document.getElementById("cotacaoAtual");
const resultadoElement = document.getElementById("resultado");
const atualizarButton = document.getElementById("atualizar");

const apiUrl = 'https://api.exemplo.com/dolar'; // Substitua pela URL da API real


async function fetchDolar() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erro ao buscar a cotação do dólar. Status: ${response.status}`);
        }

        const data = await response.json();
        const cotacaoDolar = data[data.length - 1];

        valorDolarElement.innerText = `Cotação do Dólar: R$ ${cotacaoDolar.valor.toFixed(2)}`;
        dataCotacaoElement.innerText = `Data da Cotação: ${cotacaoDolar.data}`;
    } catch (error) {
        console.error(error);
    }
}

atualizarButton.addEventListener("click", fetchDolar);

calcularButton.addEventListener("click", () => {
    const quantidadeComprada = parseFloat(quantidadeCompradaInput.value);
    const valorCompra = parseFloat(valorCompraInput.value);
    const quantidadeVendida = parseFloat(quantidadeVendidaInput.value);
    const cotacaoAtual = parseFloat(cotacaoAtualInput.value);

    const custoCompra = quantidadeComprada * valorCompra;
    const lucroVenda = quantidadeVendida * cotacaoAtual;
    const lucroReal = lucroVenda - custoCompra;
    const saldo = lucroReal;

    resultadoElement.style.display = "block";
    resultadoElement.querySelector("#custoCompra").innerText = `Custo da compra em reais: R$ ${custoCompra.toFixed(2)}`;
    resultadoElement.querySelector("#lucroVenda").innerText = `Lucro da venda em reais: R$ ${lucroVenda.toFixed(2)}`;
    resultadoElement.querySelector("#lucroReal").innerText = `Lucro real em reais: R$ ${lucroReal.toFixed(2)}`;
    resultadoElement.querySelector("#saldo").innerText = `Saldo em reais: R$ ${saldo.toFixed(2)}`;
});

// Chame a função para buscar a cotação do dólar ao carregar a página
fetchDolar();
