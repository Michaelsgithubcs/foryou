
$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "8/3": titulo = "08 de Março de 2023"; mensagem = "<p>Esse foi o dia que nos conhecemos! Ou pelo menos, o dia que nos conhecemos brevemente apenas algumas palavras trocadas</p><p>Foi bem rápido, eu estava 'trabalhando', mas já foi o suficiente para eu entender que você era diferente, pensei que não nos veriamos mais, mas criei uma esperança em te ver denovo, o seu jeito me fez pensar que você seria uma garota incrível</p><p>E eu estava certo, você é incrível!</p>";break;
            case "14/3": titulo = "14 de Março de 2023"; mensagem = "<p>Foi o primeiro dia que conversamos.<br>Você estava linda, usando seu vestidinho de abacaxi</p><p>Sentei ao seu lado e conversamos um pouco sobre seu curso se você estava gostando do cotuca, eu estava bem nervoso era a primeira vez que estavamos conversando mas foi otímo eu tinha certeza de que qualquer tempinho, ou conversa com você seria incrível</p>";break;
            case "17/3": titulo = "17 de Março de 2023"; mensagem = "<p>Foi quando te vi com os cabelos cacheados, nesse dia você estava tão pitica com seus lookzinhos perfeitos, eu sai da aula e te acompanhei até lá fora, e vi sua mamis pela primeira vez</p><p>Eu já te contei que acho que conheço sua mãe de algum lugar?</p>";break;
            case "26/3": titulo = "26 de Março de 2023"; mensagem = "<p>Eu estava na viagem de mudança dos meus avós e estamos conversando bastante sobre músicas, então decidimos criar uma playslist nossa, nosso match deu 83% de combinação, mesmos gostos musicais, mesmos gostos para filmes, pecisamos atualizar mais nossa playlist, eu escuto um pouquinho dela todos os dias e lembro de casa momento que tivemos juntos.</p>";break;
            case "28/3": titulo = "28 de Março de 2023"; mensagem = "<p>Esse foi um dos dias mais incriveis que tive nesses ultimos 4 meses, O dia em que eu te dei o giragira 🌻 nesse dia eu vi o sorriso mais lindo do mundo, ganhei o coração da familia, e nesse mesmo dia criei um pouco de intimidade com a sogra.</p>";break;
            case "30/3": titulo = "30 de Março de 2023"; mensagem = "<p>O dia, O grande dia, O primeiro beijo, ainda me lembro como se fosse ontem, estavamos no nosso momentinho de fofoca, quando resolvo abrir o instagram e surgue a pergunta 'Posso Beijar seu Esternocleidomastoideo ?' e então rolou e logo depois soltei um sorrisinho bobo e deitei no seu ombro, fiquei pensando naquele momento o resto do dia, pensei n ira mais rolar.você estava incrível e aquele momento foi mágico pra mim, e tive a certeza disso depois de poder finalmente te beijar de verdade! E que beijo bom ❤️</p>";break;
            case "9/4": titulo = "09 de Abril de 2023"; mensagem = "<p>Nosso primeiro encontro, quando você chegou com sua blusinha, delineadinho mais lindo que ja vi na face da terra, um lugar lindo, a pessoa perfeita e no momento perfeito, foi a melhor noite da minha vida, uma noite apocaliptica como diria dona lara.</p>";break;
            case "23/4": titulo = "23 de Abril de 2023"; mensagem = "<p>Nosso encontrinho no taquaral, eu estava jogando e você chegou com a blusa do volei renata, te ver me vendo jogar foi uma das melhores sensações que ja tive, você saiu pra dar uma volta com a minha irmã que disse que amou você, minha patyzinha favorita.</p>";break;
            case "28/4": titulo = "28 de Abril de 2023"; mensagem = "<section class='text-center'><p class='letra-vermelha'><strong>Este momento está sendo escrito agora...</strong></p></section>";break;
            case "final": titulo = "28 de Abril de 2023"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>O dia em que ela disse<br><span class='letra2 letra-vermelha'>SIM</span></strong></p></section>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}