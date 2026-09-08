const cases = [
  {
    id: "safira",
    number: "01",
    name: "A Safira de Aurora",
    cover: "cover-safira",
    coverTitle: '<small>o sumiço no baile</small><em>A Safira</em> de Aurora',
    category: "leve",
    level: "para começar",
    players: "3–5 pessoas",
    time: "45 min",
    age: "12+",
    price: 54.9,
    description: "Durante a inauguração da exposição Aurora, a safira mais valiosa do museu some de uma sala trancada. Quatro convidados tinham uma boa razão para querer a pedra — e um deles ainda guarda uma surpresa no bolso.",
    includes: ["5 fichas de personagem", "14 evidências para cruzar", "planta do museu", "solução lacrada"],
  },
  {
    id: "relampago",
    number: "02",
    name: "O Último Trem",
    cover: "cover-relampago",
    coverTitle: '<small>uma noite em vila verão</small><em>O Último</em> Trem',
    category: "medio",
    level: "mentes afiadas",
    players: "4–6 pessoas",
    time: "75 min",
    age: "14+",
    price: 64.9,
    description: "Um bilhete premiado desaparece entre duas estações. Ninguém desceu do trem, todos parecem ter álibi e o relógio do vagão-restaurante marca uma hora que não existe.",
    includes: ["6 fichas de personagem", "18 evidências e bilhetes", "mapa de vagões", "placar de deduções"],
  },
  {
    id: "chaves",
    number: "03",
    name: "O Arquivo das Chaves",
    cover: "cover-chaves",
    coverTitle: '<small>portas que não deveriam abrir</small><em>Arquivo</em> das Chaves',
    category: "intenso",
    level: "noite longa",
    players: "5–8 pessoas",
    time: "90 min",
    age: "14+",
    price: 74.9,
    description: "Na manhã seguinte a uma festa, o cofre da Biblioteca Municipal está vazio. Sete chaves estão sobre a mesa. Só uma abre a porta certa — e alguém trocou o chaveiro antes do amanhecer.",
    includes: ["8 fichas de personagem", "22 evidências para montar", "chaveiro codificado", "solução em três atos"],
  },
  {
    id: "bolo",
    number: "04",
    name: "Quem Levou o Bolo?",
    cover: "cover-bolo",
    coverTitle: '<small>mini caso para abrir já</small><em>Quem levou</em> o bolo?',
    category: "leve",
    level: "para começar",
    players: "2–4 pessoas",
    time: "25 min",
    age: "10+",
    price: 32.9,
    description: "Antes da foto de aniversário, o bolo premiado da Praça das Flores desaparece. Há migalhas, um cachorro muito suspeito e quatro vizinhos com receitas para esconder.",
    includes: ["4 fichas de personagem", "9 pistas ilustradas", "cartão de acusação", "solução lacrada"],
  },
];

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const state = {
  filter: "todos",
  cart: [],
};

const caseGrid = document.querySelector("#case-grid");
const caseTotal = document.querySelector("#case-total");
const cartDrawer = document.querySelector(".cart-drawer");
const overlay = document.querySelector(".overlay");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartTotal = document.querySelector("#cart-total");
const cartCount = document.querySelector(".cart-count");
const checkoutButton = document.querySelector("#checkout-button");
const dialog = document.querySelector("#case-dialog");
const dialogContent = document.querySelector("#dialog-content");
const toast = document.querySelector("#toast");
let toastTimer;

function caseMarkup(item) {
  return `
    <article class="case-card" data-case-id="${item.id}">
      <button class="case-cover ${item.cover} details-button-cover" type="button" aria-label="Ver detalhes de ${item.name}" data-details="${item.id}">
        <span class="cover-topline">Dossiê confidencial</span>
        <span class="cover-index">Nº ${item.number}</span>
        <h3 class="cover-title">${item.coverTitle}</h3>
        <span class="cover-arrow" aria-hidden="true">↗</span>
      </button>
      <div class="case-info">
        <div class="case-meta"><span>${item.players}</span><span class="dot"></span><span>${item.time}</span></div>
        <div class="case-info-row"><h3 class="case-name">${item.name}</h3><span class="case-price">${currency.format(item.price)}</span></div>
        <div class="case-actions">
          <button class="details-button" type="button" data-details="${item.id}">ver dossiê <span>→</span></button>
          <button class="add-button" type="button" data-add="${item.id}">na maleta <span>+</span></button>
        </div>
      </div>
    </article>`;
}

function renderCases() {
  const visibleCases = cases.filter((item) => state.filter === "todos" || item.category === state.filter);
  caseGrid.innerHTML = visibleCases.map(caseMarkup).join("");
  caseTotal.textContent = visibleCases.length;
}

function getCase(id) {
  return cases.find((item) => item.id === id);
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3100);
}

function addToCart(id) {
  const item = getCase(id);
  if (!item) return;
  state.cart.push(id);
  renderCart();
  showToast(`“${item.name}” entrou na sua maleta.`);
}

function removeFromCart(index) {
  state.cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const items = state.cart.map(getCase).filter(Boolean);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  cartCount.textContent = items.length;
  cartTotal.textContent = currency.format(total);
  cartEmpty.hidden = items.length > 0;
  cartItems.innerHTML = items
    .map(
      (item, index) => `
        <div class="cart-item">
          <div class="cart-item-cover ${item.cover}" aria-hidden="true"></div>
          <div><h3>${item.name}</h3><p>${item.players} · ${item.time}<br>${currency.format(item.price)}</p></div>
          <button class="remove-item" type="button" data-remove="${index}" aria-label="Remover ${item.name}">tirar</button>
        </div>`
    )
    .join("");
  checkoutButton.disabled = items.length === 0;
}

function openCart() {
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  overlay.classList.add("is-visible");
  document.body.classList.add("drawer-open");
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  overlay.classList.remove("is-visible");
  document.body.classList.remove("drawer-open");
}

function openCaseDialog(id) {
  const item = getCase(id);
  if (!item) return;
  dialogContent.innerHTML = `
    <div class="dialog-layout">
      <div class="dialog-cover case-cover ${item.cover}">
        <span class="cover-topline">Dossiê confidencial</span>
        <span class="cover-index">Nº ${item.number}</span>
        <h3 class="cover-title">${item.coverTitle}</h3>
      </div>
      <div class="dialog-copy">
        <p class="eyebrow"><span class="eyebrow-mark"></span> ${item.level}</p>
        <h2>${item.name}</h2>
        <p class="dialog-description">${item.description}</p>
        <dl class="dialog-specs">
          <div><dt>Roda</dt><dd>${item.players}</dd></div>
          <div><dt>Duração</dt><dd>${item.time}</dd></div>
          <div><dt>Indicação</dt><dd>${item.age}</dd></div>
        </dl>
        <ul class="dialog-includes">${item.includes.map((detail) => `<li>${detail}</li>`).join("")}</ul>
        <div class="dialog-buy-row"><strong class="dialog-price">${currency.format(item.price)}</strong><button class="button button-ink dialog-add" type="button" data-add="${item.id}">Colocar na maleta <span>+</span></button></div>
      </div>
    </div>`;
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
    document.body.classList.add("dialog-open");
  }
}

function closeCaseDialog() {
  if (dialog.open) dialog.close();
  document.body.classList.remove("dialog-open");
}

function selectFilter(filter) {
  state.filter = filter;
  document.querySelectorAll(".filter").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });
  renderCases();
}

function recommendationFor({ players, time, mood }) {
  if (time === "30") return getCase("bolo");
  if (players === "6" || mood === "intenso") return getCase("chaves");
  if (mood === "medio" || time === "75") return getCase("relampago");
  return getCase("safira");
}

function showRecommendation(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const item = recommendationFor({
    players: data.get("players"),
    time: data.get("time"),
    mood: data.get("mood"),
  });
  const result = document.querySelector("#finder-result");
  result.hidden = false;
  result.innerHTML = `
    <small>O dossiê separado para vocês</small>
    <strong>${item.name}</strong>
    <p>${item.players} · ${item.time} · ${item.level}</p>
    <button class="text-button" type="button" data-details="${item.id}">Abrir dossiê <span>→</span></button>`;
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function reserveOrder() {
  const items = state.cart.map(getCase).filter(Boolean);
  if (!items.length) return;
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const list = items.map((item) => `• ${item.name} — ${currency.format(item.price)}`).join("%0D%0A");
  const subject = encodeURIComponent("Reserva de casos Pista & Papel");
  const body = `Olá, central! Quero reservar:%0D%0A%0D%0A${list}%0D%0A%0D%0ATotal: ${encodeURIComponent(currency.format(total))}%0D%0A%0D%0AMeu nome é: `;
  window.location.href = `mailto:ola@pistaepapel.com?subject=${subject}&body=${body}`;
}

// Catalog interaction
caseGrid.addEventListener("click", (event) => {
  const add = event.target.closest("[data-add]");
  const details = event.target.closest("[data-details]");
  if (add) addToCart(add.dataset.add);
  if (details) openCaseDialog(details.dataset.details);
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => selectFilter(button.dataset.filter));
});

// Drawer interaction
document.querySelector(".cart-trigger").addEventListener("click", openCart);
document.querySelector(".drawer-close").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.querySelector(".close-and-catalog").addEventListener("click", () => {
  closeCart();
  document.querySelector("#casos").scrollIntoView({ behavior: "smooth" });
});
cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");
  if (button) removeFromCart(Number(button.dataset.remove));
});
checkoutButton.addEventListener("click", reserveOrder);

// Dialog interaction
dialog.addEventListener("click", (event) => {
  const close = event.target.closest(".dialog-close");
  const add = event.target.closest("[data-add]");
  if (close) closeCaseDialog();
  if (add) {
    addToCart(add.dataset.add);
    closeCaseDialog();
  }
});
dialog.addEventListener("cancel", () => document.body.classList.remove("dialog-open"));
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

// Finder and newsletter
document.querySelector("#case-finder-form").addEventListener("submit", showRecommendation);
document.querySelector(".quiz-scroll").addEventListener("click", () => {
  document.querySelector("#encontre-seu-caso").scrollIntoView({ behavior: "smooth" });
});
document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  showToast(`Anotado, ${input.value}. A próxima pista vai chegar por e-mail.`);
  event.currentTarget.reset();
});

// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const willOpen = !mainNav.classList.contains("is-open");
  mainNav.classList.toggle("is-open", willOpen);
  menuButton.classList.toggle("is-open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
});
mainNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    mainNav.classList.remove("is-open");
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("is-open")) closeCart();
});

// Gentle entrance animation
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

renderCases();
renderCart();
