document.getElementById("preto_branco").addEventListener
('click',function()
{
    document.body.classList.toggle("preto_branco");
    console.log("click")
}
);
    
    // ALto contraste
    document.getElementById('alternar-contraste').addEventListener
        ('click', function () {
            document.body.classList.toggle('alto-contraste');
        }
        );

    // A+ E A-
    window.onload = function () {

        //Seleciona o elemeto <body> para que possamos alterar seu estilo
        var corpoDaPagina = document.querySelector('body');
        var aumentarTexto = document.getElementById('aumentar-texto');
        var diminuirTexto = document.getElementById('diminuir-texto');

        // O padrão de tamanho equivalente a 100% do valor defenido no style
        var fontSize = 100;

        // Valor percentual de 10% que irá aumentar ou diminuir do padrão da fonte
        var qntAumentarDiminuir = 10;
        
        // Evento de click para aumentar a fonte
        aumentarTexto.addEventListener(
            'click', function (event) {
            fontSize = fontSize + qntAumentarDiminuir;
            corpoDaPagina.style.fontSize = fontSize + "%";
            console.log("gay")
        }
        );

        // Evento de click para diminuir a fonte
        diminuirTexto.addEventListener(
            'click', function (event) {
            fontSize = fontSize - qntAumentarDiminuir;
            corpoDaPagina.style.fontSize = fontSize + "%";
        }
        );
    }

    
