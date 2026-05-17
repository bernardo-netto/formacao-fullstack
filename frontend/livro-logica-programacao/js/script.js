
const cabecalho = document.getElementById("cabecalho-principal");
const btnTema = document.getElementById("btnTema");
const iconeTema = document.getElementById("iconeTema");
const btnTopo = document.getElementById("ir-topo");
const linksMenuMob = document.querySelectorAll(".link-mobile");
const elementosRevelar = document.querySelectorAll(".revelar");


// HEADER — comportamento ao rolar
function atualizarCabecalho() {
  if (window.scrollY > 80) {
    cabecalho.classList.add("rolado");
    btnTopo.classList.add("visivel");
  } else {
    cabecalho.classList.remove("rolado");
    btnTopo.classList.remove("visivel");
  }
}

window.addEventListener("scroll", atualizarCabecalho, { passive: true });

// Botão voltar ao topo
btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Tema claro / escuro




/* ========================================
   ÍCONE SOL
======================================== */

const iconeSol = `
<svg xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2">

    <circle cx="12" cy="12" r="5"></circle>

    <path d="M12 1v2"></path>
    <path d="M12 21v2"></path>

    <path d="M4.22 4.22l1.42 1.42"></path>
    <path d="M18.36 18.36l1.42 1.42"></path>

    <path d="M1 12h2"></path>
    <path d="M21 12h2"></path>

    <path d="M4.22 19.78l1.42-1.42"></path>
    <path d="M18.36 5.64l1.42-1.42"></path>
</svg>
`;

/* ========================================
   ÍCONE LUA
======================================== */

const iconeLua = `
<svg xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2">

    <path d="M21 12.79A9 9 0 1 1 11.21 3
    7 7 0 0 0 21 12.79z"></path>
</svg>
`;

/* ========================================
   APLICAR TEMA
======================================== */

function aplicarTema(tema) {

    document.body.setAttribute(
        "data-tema",
        tema
    );

    /* Animação */
    iconeTema.classList.add(
        "trocando"
    );

    setTimeout(() => {

        iconeTema.innerHTML =
            tema === "escuro"
                ? iconeLua
                : iconeSol;

        iconeTema.classList.remove(
            "trocando"
        );

    }, 180);

    /* Salvar */
    localStorage.setItem(
        "tema-edecio",
        tema
    );
}

/* ========================================
   EVENTO
======================================== */

btnTema.addEventListener(
    "click",
    () => {

        const temaAtual =
            document.body.getAttribute(
                "data-tema"
            );

        const novoTema =
            temaAtual === "escuro"
                ? "claro"
                : "escuro";

        aplicarTema(novoTema);
    }
);

/* ========================================
   TEMA SALVO
======================================== */

const temaSalvo =
    localStorage.getItem(
        "tema-edecio"
    ) || "escuro";

aplicarTema(temaSalvo);



// Reveal on scroll 
const observadorRevelar = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        // Para de observar após revelar (performance)
        observadorRevelar.unobserve(entrada.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  },
);

elementosRevelar.forEach((el) => observadorRevelar.observe(el));

// navegação - destaque link ativo
const secoes = document.querySelectorAll("section[id]");
const linksNav = document.querySelectorAll(".navegacao-desktop a");

const observadorSecao = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const id = entrada.target.getAttribute("id");
        linksNav.forEach((link) => {
          link.style.color =
            link.getAttribute("href") === `#${id}`
              ? "var(--cor-texto-principal)"
              : "";
        });
      }
    });
  },
  { threshold: 0.4 },
);

secoes.forEach((s) => observadorSecao.observe(s));
