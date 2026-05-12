

// ===== MENU HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

// FUNÇÃO: Abre/fecha menu mobile
function toggleMenu() {
    // 1. Anima hamburger pra X
    const isOpen = hamburger.classList.toggle('active');

    // 2. Abre/fecha menu
    navMobile.classList.toggle('active');

    // 3. Acessibilidade: avisa leitor de tela se tá aberto
    hamburger.setAttribute('aria-expanded', isOpen);

    // 4. Trava scroll do body quando menu aberto - UX mobile
    // document.body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);

// Fecha menu ao clicar em link - UX: usuário não precisa fechar manual
document.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMobile.classList.contains('active')) {
            toggleMenu();
        }
    });
});





// ESTA FUNÇÃO FAZ A CONTAGEM CRESCENTE 
function iniciarAnimacaoEstatisticas() {
    // Selecionamos todos os elementos que possuem a classe 'dados-numeros'
    const todosOsNumeros = document.querySelectorAll('.dados-numeros');

    todosOsNumeros.forEach((elemento) => {
        // 1. Pegamos os valores das configurações que você colocou no HTML
        const valorFinal = parseFloat(elemento.getAttribute('data-target'));
        const prefixo = elemento.getAttribute('data-prefix') || '';
        const sufixo = elemento.getAttribute('data-suffix') || '';
        const ehDecimal = elemento.getAttribute('data-is-float') === 'true';

        let valorAtual = 0;

        // 2. Calculamos o incremento. 
        // Dividir por 60 significa que a animação levará 60 frames (aprox. 1 segundo)
        const passo = valorFinal / 60; // 60 frames ≈ 1 segundo de animação

        const atualizarTexto = () => {
            valorAtual += passo;

            if (valorAtual < valorFinal) {
                // Se ainda não chegou no final, formata o número e continua
                let exibicao = ehDecimal ? valorAtual.toFixed(1) : Math.ceil(valorAtual);
                elemento.innerText = prefixo + exibicao + sufixo;

                // Pede ao navegador para rodar novamente no próximo frame de vídeo
                requestAnimationFrame(atualizarTexto);
            } else {
                // Quando termina, exibe o valor exato final
                elemento.innerText = prefixo + valorFinal + sufixo;
            }
        };

        // Inicia o processo de atualização
        atualizarTexto();
    });
}

// ESTA PARTE DETECTA A ROLAGEM (SCROLL)
 
// O IntersectionObserver "vigia" quando algo entra na visão do usuário
const observadorDeTela = new IntersectionObserver((entradas, observer) => {
    entradas.forEach((entrada) => {
        // Se a seção de estatísticas apareceu na tela (isIntersecting)
        if (entrada.isIntersecting) {
            iniciarAnimacaoEstatisticas(); // Dispara a animação
            observer.unobserve(entrada.target); // Para de vigiar (para animar só uma vez)
        }
    });
}, {
    threshold: 0.2 // Dispara quando 20% da seção estiver visível
});

// Dizemos ao observador para vigiar a caixa que contém os números
const containerEstatisticas = document.querySelector('.hero-estatisticas');
if (containerEstatisticas) {
    observadorDeTela.observe(containerEstatisticas);
}



// Criamos o "Observador"
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        // Se o elemento entrou na área visível do ecrã
        if (entrada.isIntersecting) {
            // Adicionamos a classe 'ativo' que dispara o efeito do CSS
            entrada.target.classList.add('ativo');

            // Depois de mostrar, paramos de observar este elemento (melhora a performance)
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15 }); // 0.15 significa: "dispare quando 15% do elemento aparecer"

// Mandamos o observador vigiar todos os elementos que têm a classe 'revelar'
document.querySelectorAll('.revelar').forEach(elemento => {
    observador.observe(elemento);
});



// Login- Cadastrar e Esqueceu a senha.
const modal = document.getElementById('modal-autenticacao');
const botaoFechar = document.getElementById('botao-fechar');
const paineis = document.querySelectorAll('.painel-tela');

function abrirAutenticacao(tipo) {
    const alvo = tipo === 'login' ? 'tela-login' : 'tela-cadastro';
    trocarTela(alvo);
    modal.showModal();
    if (window.innerWidth <= 640) document.body.style.overflow = 'hidden';
}

function trocarTela(idTela) {
    paineis.forEach(p => p.classList.remove('ativo'));
    const alvo = document.getElementById(idTela);
    if (alvo) alvo.classList.add('ativo');
}

botaoFechar.addEventListener('click', () => {
    modal.close();
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal && window.innerWidth > 640) {
        modal.close();
        document.body.style.overflow = 'auto';
    }
});

function enviarFormulario(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const textoOriginal = btn.innerText;
    btn.innerText = "Processando...";
    btn.disabled = true;
    setTimeout(() => {
        btn.innerText = "Sucesso!";
        const fundoOriginal = btn.style.background;
        btn.style.background = "var(--cor-sucesso)";
        setTimeout(() => {
            modal.close();
            document.body.style.overflow = 'auto';
            btn.innerText = textoOriginal;
            btn.disabled = false;
            btn.style.background = fundoOriginal;
        }, 1000);
    }, 1200);
    return false;
}


// Seção contato
const formulario = document.getElementById('form-contato');
        const feedback = document.getElementById('feedback-sucesso');
        const botao = document.getElementById('btn-enviar');

        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            botao.innerText = "Enviando...";
            botao.disabled = true;

            setTimeout(() => {
                // Mostrar mensagem fictícia
                feedback.style.display = 'block';
                formulario.reset();

                // Voltar ao início da página suavemente após 1.5s
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    // Resetar estado do botão e esconder mensagem
                    setTimeout(() => {
                        feedback.style.display = 'none';
                        botao.innerText = "Enviar Mensagem";
                        botao.disabled = false;
                    }, 2000);
                }, 1500);
            }, 1000);
        });




// MOSTRAR BOTÃO AO ROLAR

const botaoTopo = document.querySelector('.botao-topo');

window.addEventListener('scroll', () => {

    if (window.scrollY > 300) {
        botaoTopo.classList.add('ativo');
    } 
    
    else {
        botaoTopo.classList.remove('ativo');
    }

});



/* =====================================================
ANIMAÇÃO AO ROLAR
===================================================== */

const elementosRevelar = document.querySelectorAll('.revelar');

const observer = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add('ativo');

        }

    });

}, {
    threshold: 0.15
});

elementosRevelar.forEach((elemento) => {
    observer.observe(elemento);
});