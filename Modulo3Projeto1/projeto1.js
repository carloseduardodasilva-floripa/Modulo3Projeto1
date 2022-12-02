let listaRecuperada = []
let listaRecuperadaSTR = []
let listaParaSalvar = []
let descricaoItem = ""
let valorItem = 0.0
let valorTotal = 0.0
let posNaListaHtml = 0
let numItensLista = 0
let lista = ""

const currencyFormat = (value) => {
    let formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return formatter.format(value);

}
if (localStorage.getItem("LISTA") === null) {
    gravarStorage()
} else {
    lerStorage()
}
montaPagina(listaParaSalvar)

document.getElementById('btnInsere').onclick = function () {
    let itemDigitado = document.getElementById('inpItemLista').value;
    if (itemDigitado.length > 7 && itemDigitado.length < 65) {
        adicionarLi(itemDigitado)
        listaParaSalvar.push(itemDigitado + ";0.0")
        numItensLista++
        document.getElementById('inpItemLista').value = ""
        gravarStorage()
        animacao()
    } else {
        erro()
    }
}
function animacao() {
    document.getElementById("imgOk").innerHTML = '<img id="imgOk"; src="ok.webp" width="15%"; align="center";>'
    const tempo = setTimeout(limpa, 5000);
    function limpa() {
        document.getElementById("imgOk").innerHTML = '  '
    }
}

function gravarStorage() {
    localStorage.setItem('LISTA', JSON.stringify(listaParaSalvar));
}

function lerStorage() {
    listaRecuperadaSTR = localStorage.getItem("LISTA");
    listaRecuperada = JSON.parse(listaRecuperadaSTR)
    listaParaSalvar = listaRecuperada
}
function montaPagina(listaRecuperada) {
    numItensLista = 0
    posNaListaHtml = 0

    for (let item of listaRecuperada) {
        arrumaItem(item)
        numItensLista++
    }
    lista = ""
    numItensLista = 0
    mostraTotal()
}

function arrumaItem(item) {
    descricaoItem = item.substring(0, item.indexOf(";"))
    valorItem = parseFloat(item.substring(item.indexOf(";") + 1))
    adicionarLi(descricaoItem, valorItem)
    valorTotal = valorTotal + valorItem
}

function adicionarLi(descricao, valor) {
    lista = document.getElementById("lista").innerHTML;
    let elemLi = "<li>"
    let elemCheckbox = '<input id="' + parseInt(posNaListaHtml) + '" onclick=alteraValor(' + parseInt(posNaListaHtml) + ') type="checkbox" style="width: 20px; height: 20px;">'
    let elemSpan = '<span>' + descricao + '</span>'
    let elemBtn = '<button type="submit" id="' + parseInt(posNaListaHtml) + '" onclick="deletaItem(' + parseInt(posNaListaHtml) + ')">DEL</button></li>'
    let elemFechaLi = "</li>"
    if (parseFloat(valor) > 0.0) {
        elemSpan = '<span><del>' + descricao + '</del></span>'
    } else {
        elemSpan = '<span>' + descricao + '</span>'
    }
    lista = lista + elemLi + elemCheckbox + elemSpan + elemBtn + elemFechaLi
    document.getElementById("lista").innerHTML = lista;
    posNaListaHtml++
}

function deletaItem(item) {
    listaParaSalvar.splice(item, 1);
    numItensLista--
    gravarStorage()
    lerStorage()
    window.location.reload();
}

function alteraValor(itemDaLista) {
    var valorInformado = window.prompt('Informe o valor');
    descricaoItem = listaParaSalvar[itemDaLista].substring(0, listaParaSalvar[itemDaLista].indexOf(";"))
    listaParaSalvar[itemDaLista] = descricaoItem + ";" + valorInformado
    gravarStorage()
    lerStorage()
    window.location.reload();
}

function erro() {
    document.getElementById("erro").innerHTML = '<span><h5 style="color:red;font-size:14px;">Ítem deve ter no mínimo 8 e no máximo 64 caracteres<h5></span>'
    const tempo = setTimeout(limpa, 5000);
    function limpa() {
        document.getElementById("erro").innerHTML = ""
        document.getElementById('inpItemLista').value = ""
    }
}

function mostraTotal() {
    if (valorTotal > 0.0){
        document.getElementById("real").innerHTML = '<span><h1>' + currencyFormat(valorTotal) + '<h1></span>'
    }
}



