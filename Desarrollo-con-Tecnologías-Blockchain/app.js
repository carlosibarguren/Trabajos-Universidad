// =====================
// CONFIG
// =====================

// Cambiá esta address por la del último deploy en Sepolia
const CONTRACT_ADDRESS = "0x0544169Bc5b2bd0C354ffAC1d58675A02BEF0A82";
const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7"; 

const CONTRACT_ABI = [
  {
    "inputs":[
      {"internalType":"address","name":"_reviewed","type":"address"},
      {"internalType":"uint8","name":"_rating","type":"uint8"},
      {"internalType":"string","name":"_commentHash","type":"string"},
      {"internalType":"uint256","name":"_eventId","type":"uint256"}
    ],
    "name":"createReview",
    "outputs":[{"internalType":"uint256","name":"reviewId","type":"uint256"}],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"_reviewId","type":"uint256"}],
    "name":"validateReview",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"_reviewId","type":"uint256"}],
    "name":"publishReview",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"_reviewId","type":"uint256"}],
    "name":"invalidateReview",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"_user","type":"address"}],
    "name":"getReviewsReceived",
    "outputs":[{
      "components":[
        {"internalType":"uint256","name":"reviewId","type":"uint256"},
        {"internalType":"address","name":"reviewer","type":"address"},
        {"internalType":"address","name":"reviewed","type":"address"},
        {"internalType":"uint8","name":"rating","type":"uint8"},
        {"internalType":"string","name":"commentHash","type":"string"},
        {"internalType":"uint256","name":"timestamp","type":"uint256"},
        {"internalType":"uint256","name":"eventId","type":"uint256"},
        {"internalType":"uint8","name":"state","type":"uint8"}
      ],
      "internalType":"struct JexReviewContract.Review[]",
      "name":"",
      "type":"tuple[]"
    }],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"_user","type":"address"}],
    "name":"getReviewsGiven",
    "outputs":[{
      "components":[
        {"internalType":"uint256","name":"reviewId","type":"uint256"},
        {"internalType":"address","name":"reviewer","type":"address"},
        {"internalType":"address","name":"reviewed","type":"address"},
        {"internalType":"uint8","name":"rating","type":"uint8"},
        {"internalType":"string","name":"commentHash","type":"string"},
        {"internalType":"uint256","name":"timestamp","type":"uint256"},
        {"internalType":"uint256","name":"eventId","type":"uint256"},
        {"internalType":"uint8","name":"state","type":"uint8"}
      ],
      "internalType":"struct JexReviewContract.Review[]",
      "name":"",
      "type":"tuple[]"
    }],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"getAllReviews",
    "outputs":[{
      "components":[
        {"internalType":"uint256","name":"reviewId","type":"uint256"},
        {"internalType":"address","name":"reviewer","type":"address"},
        {"internalType":"address","name":"reviewed","type":"address"},
        {"internalType":"uint8","name":"rating","type":"uint8"},
        {"internalType":"string","name":"commentHash","type":"string"},
        {"internalType":"uint256","name":"timestamp","type":"uint256"},
        {"internalType":"uint256","name":"eventId","type":"uint256"},
        {"internalType":"uint8","name":"state","type":"uint8"}
      ],
      "internalType":"struct JexReviewContract.Review[]",
      "name":"",
      "type":"tuple[]"
    }],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"_user","type":"address"}],
    "name":"getAverageRating",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"moderator",
    "outputs":[{"internalType":"address","name":"","type":"address"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"nextReviewId",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  }
];

let provider;
let signer;
let contract;
let currentAccount = null;

// Rol global de la app: "worker", "employer", "moderator" o null
let appRole = null;

// Modo de reseña: "employee" (trabajador → empleador) o "employer" (empleador → trabajador)
let reviewMode = "employee";

// Rating UI: 0 a 5 en pasos de 0.5
let ratingUI = 0.0;

// ===== DOM =====
const connectButton = document.getElementById("connectButton");
const accountSpan = document.getElementById("accountSpan");
const userRoleBadge = document.getElementById("userRoleBadge");

const createReviewButton = document.getElementById("createReviewButton");
const createStatus = document.getElementById("createStatus");
const searchButton = document.getElementById("searchButton");
const searchStatus = document.getElementById("searchStatus");
const resultsTbody = document.getElementById("resultsTbody");

const roleChip = document.getElementById("roleChip");
const reviewedLabel = document.getElementById("reviewedLabel");

const ratingMinusBtn = document.getElementById("ratingMinus");
const ratingPlusBtn = document.getElementById("ratingPlus");
const ratingStarsDiv = document.getElementById("ratingStars");
const ratingNumberSpan = document.getElementById("ratingNumber");

// Admin elements
const moderatorSpan = document.getElementById("moderatorSpan");
const nextReviewIdSpan = document.getElementById("nextReviewIdSpan");
const loadGlobalButton = document.getElementById("loadGlobalButton");
const globalStatus = document.getElementById("globalStatus");

const avgAddressInput = document.getElementById("avgAddressInput");
const getAverageButton = document.getElementById("getAverageButton");
const averageResultSpan = document.getElementById("averageResultSpan");
const averageStatus = document.getElementById("averageStatus");

const modReviewIdInput = document.getElementById("modReviewIdInput");
const validateButton = document.getElementById("validateButton");
const publishButton = document.getElementById("publishButton");
const invalidateButton = document.getElementById("invalidateButton");
const moderatorStatus = document.getElementById("moderatorStatus");

// Listas de moderador
const moderatorToValidateTbody = document.getElementById("moderatorToValidateTbody");
const moderatorHistoryTbody = document.getElementById("moderatorHistoryTbody");
const refreshModeratorListsButton = document.getElementById("refreshModeratorListsButton");

// Cards de menú
const cardCreate = document.getElementById("cardCreate");
const cardView = document.getElementById("cardView");
const cardAdmin = document.getElementById("cardAdmin");

// Modal tipo de usuario
const userTypeModal = document.getElementById("userTypeModal");
const openUserTypeModalButton = document.getElementById("openUserTypeModalButton");
const userTypeWorkerBtn = document.getElementById("userTypeWorker");
const userTypeEmployerBtn = document.getElementById("userTypeEmployer");
const userTypeModeratorBtn = document.getElementById("userTypeModerator");

// =====================
// Navegación entre pantallas
// =====================
function goTo(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(screenId);
  if (target) target.classList.add("active");
}

document.querySelectorAll("[data-goto]").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-goto");
    goTo(id);
  });
});

// =====================
// Manejo de roles
// =====================
function applyReviewMode(mode) {
  reviewMode = mode;
  if (mode === "employee") {
    roleChip.textContent = "Modo: Trabajador → Empleador";
    reviewedLabel.textContent = "Address a calificar (empleador)";
  } else {
    roleChip.textContent = "Modo: Empleador → Trabajador";
    reviewedLabel.textContent = "Address a calificar (trabajador)";
  }
}

function updateMenuByRole() {
  if (!cardCreate || !cardView || !cardAdmin) return;

  if (appRole === "moderator") {
    cardCreate.style.display = "none";
    cardView.style.display = "none";
    cardAdmin.style.display = "flex";
  } else if (appRole === "worker" || appRole === "employer") {
    cardCreate.style.display = "flex";
    cardView.style.display = "flex";
    cardAdmin.style.display = "none";
  } else {
    cardCreate.style.display = "none";
    cardView.style.display = "none";
    cardAdmin.style.display = "none";
  }
}

function setAppRole(role) {
  appRole = role;

  if (role === "worker") {
    userRoleBadge.textContent = "Trabajador";
    applyReviewMode("employee");
    goTo("screen-menu");
  } else if (role === "employer") {
    userRoleBadge.textContent = "Empleador";
    applyReviewMode("employer");
    goTo("screen-menu");
  } else if (role === "moderator") {
    userRoleBadge.textContent = "Moderador";
    goTo("screen-admin");
    loadModeratorLists().catch(console.error);
  } else {
    userRoleBadge.textContent = "Sin seleccionar";
    goTo("screen-landing");
  }

  updateMenuByRole();
}

// =====================
// Modal tipo de usuario
// =====================
function openUserTypeModal() {
  userTypeModal.classList.add("active");
}

function closeUserTypeModal() {
  userTypeModal.classList.remove("active");
}

openUserTypeModalButton.addEventListener("click", openUserTypeModal);

// Cerrar modal clickeando afuera
userTypeModal.addEventListener("click", (e) => {
  if (e.target === userTypeModal) {
    closeUserTypeModal();
  }
});

userTypeWorkerBtn.addEventListener("click", () => {
  setAppRole("worker");
  closeUserTypeModal();
});

userTypeEmployerBtn.addEventListener("click", () => {
  setAppRole("employer");
  closeUserTypeModal();
});

userTypeModeratorBtn.addEventListener("click", () => {
  setAppRole("moderator");
  closeUserTypeModal();
});

// Arranque sin rol
updateMenuByRole();

// =====================
// Rating UI
// =====================
function clampRating(value) {
  if (value < 0) return 0;
  if (value > 5) return 5;
  return Math.round(value * 2) / 2; // pasos de 0.5
}

function renderRating() {
  ratingNumberSpan.textContent = ratingUI.toFixed(1) + " / 5";
  const stars = ratingStarsDiv.querySelectorAll(".star");
  stars.forEach((star, idx) => {
    const starIndex = idx + 1;
    star.classList.remove("star-full", "star-half");
    if (ratingUI >= starIndex) {
      star.classList.add("star-full");
    } else if (
      ratingUI + 0.5 >= starIndex &&
      ratingUI + 0.5 < starIndex + 0.5 &&
      ratingUI % 1 === 0.5 &&
      Math.ceil(ratingUI) === starIndex
    ) {
      star.classList.add("star-half");
    }
  });
}

ratingMinusBtn.addEventListener("click", () => {
  ratingUI = clampRating(ratingUI - 0.5);
  renderRating();
});

ratingPlusBtn.addEventListener("click", () => {
  ratingUI = clampRating(ratingUI + 0.5);
  renderRating();
});

// arranque
renderRating();

// =====================
// Wallet / Provider
// =====================
function shortAddress(addr) {
  if (!addr) return "";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

async function ensureSepoliaNetwork() {
  if (!window.ethereum) return;
  const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  const net = await web3Provider.getNetwork();
  if (net.chainId === 11155111) {
    return;
  }
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }]
    });
  } catch (switchErr) {
    console.error("No se pudo cambiar a Sepolia", switchErr);
    alert("Cambiá la red a Sepolia en MetaMask para usar esta dApp.");
    throw switchErr;
  }
}

async function connectWallet() {
  if (!window.ethereum) {
    alert("Necesitás MetaMask para usar esta dApp");
    return;
  }
  try {
    await ensureSepoliaNetwork();

    provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    currentAccount = accounts[0];

    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    accountSpan.textContent = shortAddress(currentAccount);
    connectButton.textContent = "Conectada";
    connectButton.disabled = true;
    connectButton.classList.remove("btn-primary");
    connectButton.classList.add("btn-secondary");

    window.ethereum.on("accountsChanged", (accountsChanged) => {
      if (!accountsChanged || accountsChanged.length === 0) {
        currentAccount = null;
        accountSpan.textContent = "No conectada";
        connectButton.disabled = false;
        connectButton.textContent = "Conectar MetaMask";
        connectButton.classList.add("btn-primary");
        connectButton.classList.remove("btn-secondary");
        return;
      }
      currentAccount = accountsChanged[0];
      accountSpan.textContent = shortAddress(currentAccount);
    });

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

  } catch (err) {
    console.error(err);
    alert("Error al conectar la wallet: " + (err.message || err));
  }
}

// =====================
// Crear reseña
// =====================
async function createReview() {
  if (!contract || !currentAccount) {
    alert("Conectá la wallet primero");
    return;
  }

  if (appRole !== "worker" && appRole !== "employer") {
    alert("Seleccioná primero si sos trabajador o empleador.");
    return;
  }

  const reviewed = document.getElementById("reviewedInput").value.trim();
  const eventId = parseInt(document.getElementById("eventIdInput").value, 10);
  const commentText = document.getElementById("commentInput").value.trim();

  createStatus.className = "status";

  if (!ethers.utils.isAddress(reviewed)) {
    createStatus.textContent = "Address a calificar inválida.";
    createStatus.classList.add("error");
    return;
  }

  if (ratingUI <= 0) {
    createStatus.textContent = "Elegí un rating mayor a 0.";
    createStatus.classList.add("error");
    return;
  }

  const ratingInt = Math.round(ratingUI);
  if (ratingInt < 1 || ratingInt > 5) {
    createStatus.textContent = "El rating enviado al contrato debe estar entre 1 y 5.";
    createStatus.classList.add("error");
    return;
  }

  if (Number.isNaN(eventId)) {
    createStatus.textContent = "EventId inválido.";
    createStatus.classList.add("error");
    return;
  }
  if (!commentText) {
    createStatus.textContent = "Escribí un comentario.";
    createStatus.classList.add("error");
    return;
  }

  const enrichedComment = commentText;

  try {
    createStatus.textContent = "Enviando transacción... (revisá MetaMask)";
    const tx = await contract.createReview(
      reviewed,
      ratingInt,
      enrichedComment,
      eventId
    );
    await tx.wait();
    createStatus.textContent = "Reseña creada correctamente (estado: Created). Tx: " + tx.hash.slice(0, 10) + "...";
    createStatus.classList.add("ok");
  } catch (err) {
    console.error(err);
    const msg = (err && (err.error?.message || err.data?.message || err.message)) || "";
    if (msg.includes("Ya calificaste este evento")) {
      createStatus.textContent = "Error: ya creaste una reseña para este evento y usuario.";
    } else if (msg.includes("No podes calificarte a vos mismo")) {
      createStatus.textContent = "Error: no podés calificarte a vos mismo.";
    } else if (msg.includes("Rating invalido")) {
      createStatus.textContent = "Error: rating inválido.";
    } else {
      createStatus.textContent = "Error al crear reseña: " + msg;
    }
    createStatus.classList.add("error");
  }
}

// =====================
// Helpers reseñas
// =====================
function formatTimestamp(ts) {
  const date = new Date(ts.toNumber() * 1000);
  return date.toLocaleString();
}

function stateToText(stateNum) {
  const v = Number(stateNum);
  switch (v) {
    case 0: return "Created";
    case 1: return "Validated";
    case 2: return "Published";
    case 3: return "Invalidated";
    default: return "Desconocido";
  }
}

function statePillClass(stateNum) {
  const v = Number(stateNum);
  switch (v) {
    case 0: return "pill pill-state-0";
    case 1: return "pill pill-state-1";
    case 2: return "pill pill-state-2";
    case 3: return "pill pill-state-3";
    default: return "pill";
  }
}

// =====================
// Buscar reseñas (pantalla usuario)
// =====================
async function searchReviews() {
  if (!contract || !currentAccount) {
    alert("Conectá la wallet primero");
    return;
  }

  const addressInput = document.getElementById("searchAddressInput").value.trim();
  const type = document.getElementById("typeSelect").value;
  const minRating = parseInt(document.getElementById("minRatingInput").value, 10) || 1;

  const userAddr = addressInput || currentAccount;

  searchStatus.className = "status";

  if (!ethers.utils.isAddress(userAddr)) {
    searchStatus.textContent = "Address de búsqueda inválida.";
    searchStatus.classList.add("error");
    return;
  }

  try {
    searchStatus.textContent = "Cargando reseñas...";
    let reviews;

    if (type === "received") {
      reviews = await contract.getReviewsReceived(userAddr);
    } else {
      reviews = await contract.getReviewsGiven(userAddr);
    }

    resultsTbody.innerHTML = "";

    reviews
      .filter(r => Number(r.rating) >= minRating)
      .forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${r.reviewId}</td>
          <td>${r.reviewer}</td>
          <td>${r.reviewed}</td>
          <td>${r.rating}</td>
          <td>${r.eventId}</td>
          <td><span class="${statePillClass(r.state)}">${stateToText(r.state)}</span></td>
          <td>${formatTimestamp(r.timestamp)}</td>
          <td>${r.commentHash}</td>
        `;
        resultsTbody.appendChild(tr);
      });

    searchStatus.textContent = `Encontradas ${reviews.length} reseñas (mostrando rating ≥ ${minRating}).`;
    searchStatus.classList.add("ok");
  } catch (err) {
    console.error(err);
    searchStatus.textContent = "Error al buscar reseñas: " + (err.message || err);
    searchStatus.classList.add("error");
  }
}

// =====================
// Admin / global data
// =====================
async function loadGlobalData() {
  if (!contract || !currentAccount) {
    alert("Conectá la wallet primero");
    return;
  }
  globalStatus.className = "status";
  try {
    globalStatus.textContent = "Cargando datos globales...";
    const [mod, nextId] = await Promise.all([
      contract.moderator(),
      contract.nextReviewId()
    ]);
    moderatorSpan.textContent = mod;
    nextReviewIdSpan.textContent = nextId.toString();
    globalStatus.textContent = "Datos actualizados.";
    globalStatus.classList.add("ok");
  } catch (err) {
    console.error(err);
    globalStatus.textContent = "Error al cargar datos: " + (err.message || err);
    globalStatus.classList.add("error");
  }
}

async function getAverage() {
  if (!contract || !currentAccount) {
    alert("Conectá la wallet primero");
    return;
  }
  averageStatus.className = "status";
  let addr = avgAddressInput.value.trim() || currentAccount;
  if (!ethers.utils.isAddress(addr)) {
    averageStatus.textContent = "Address inválida.";
    averageStatus.classList.add("error");
    return;
  }
  try {
    averageStatus.textContent = "Consultando promedio...";
    const avgRaw = await contract.getAverageRating(addr); // uint256
    const avgNumber = avgRaw.toNumber();                  // p.ej. 444
    if (avgNumber === 0) {
      averageResultSpan.textContent = "Sin reseñas publicadas aún";
      averageStatus.textContent = "El usuario todavía no tiene reseñas publicadas.";
      averageStatus.classList.add("ok");
      return;
    }
    const avgReal = avgNumber / 100;                      // 4.44
    averageResultSpan.textContent = avgReal.toFixed(2) + " / 5";
    averageStatus.textContent = "Promedio obtenido correctamente.";
    averageStatus.classList.add("ok");
  } catch (err) {
    console.error(err);
    averageStatus.textContent = "Error al calcular promedio.";
    averageStatus.classList.add("error");
  }
}

// =====================
// Moderador: listar reseñas
// =====================
async function loadModeratorLists() {
  if (!contract || !currentAccount) {
    alert("Conectá la wallet primero");
    return;
  }
  if (appRole !== "moderator") {
    alert("Seleccioná el rol Moderador para ver este panel.");
    return;
  }

  moderatorStatus.className = "status";
  moderatorStatus.textContent = "Cargando reseñas para moderador...";

  try {
    const reviews = await contract.getAllReviews();

    moderatorToValidateTbody.innerHTML = "";
    moderatorHistoryTbody.innerHTML = "";

    reviews.forEach(r => {
      const stateVal = Number(r.state);
      const rowHtml = `
        <td>${r.reviewId}</td>
        <td>${r.reviewer}</td>
        <td>${r.reviewed}</td>
        <td>${r.rating}</td>
        <td>${r.eventId}</td>
        <td><span class="${statePillClass(r.state)}">${stateToText(r.state)}</span></td>
        <td>${formatTimestamp(r.timestamp)}</td>
        <td>${r.commentHash}</td>
      `;
      const tr = document.createElement("tr");
      tr.innerHTML = rowHtml;

      if (stateVal === 0) {
        // Created -> tabla "Reseñas a validar"
        moderatorToValidateTbody.appendChild(tr);
      } else if (stateVal === 1 || stateVal === 2 || stateVal === 3) {
        // Validated / Published / Invalidated -> historial
        moderatorHistoryTbody.appendChild(tr);
      }
    });

    moderatorStatus.textContent = "Listas de reseñas actualizadas.";
    moderatorStatus.classList.add("ok");
  } catch (err) {
    console.error(err);
    moderatorStatus.textContent = "Error al cargar reseñas para moderador: " + (err.message || err);
    moderatorStatus.classList.add("error");
  }
}

// =====================
// Moderador: validar / publicar / invalidar
// =====================
async function moderatorAction(action) {
  if (!contract || !currentAccount) {
    alert("Conectá la wallet primero");
    return;
  }
  if (appRole !== "moderator") {
    alert("Seleccioná el rol Moderador para usar estas herramientas.");
    return;
  }
  moderatorStatus.className = "status";
  const id = parseInt(modReviewIdInput.value, 10);
  if (Number.isNaN(id)) {
    moderatorStatus.textContent = "ID inválido.";
    moderatorStatus.classList.add("error");
    return;
  }
  try {
    let tx;
    if (action === "validate") {
      moderatorStatus.textContent = "Validando reseña...";
      tx = await contract.validateReview(id);
    } else if (action === "publish") {
      moderatorStatus.textContent = "Publicando reseña...";
      tx = await contract.publishReview(id);
    } else if (action === "invalidate") {
      moderatorStatus.textContent = "Invalidando reseña...";
      tx = await contract.invalidateReview(id);
    } else {
      return;
    }
    await tx.wait();
    const actionText =
      action === "validate" ? "validada" :
      action === "publish" ? "publicada" :
      "invalidada";

    moderatorStatus.textContent = `Reseña ${actionText}. Tx: ${tx.hash.slice(0,10)}...`;
    moderatorStatus.classList.add("ok");

    // refrescar listas
    await loadModeratorLists();
  } catch (err) {
    console.error(err);
    let msg = (err && (err.error?.message || err.data?.message || err.message)) || "";

    if (msg.includes("Solo el moderador puede ejecutar esta accion")) {
      moderatorStatus.textContent = "Error: solo el moderador puede gestionar reseñas.";
    } else if (msg.includes("Resena inexistente")) {
      moderatorStatus.textContent = "Error: la reseña con ese ID no existe.";
    } else if (msg.includes("Solo resenas nuevas")) {
      moderatorStatus.textContent = "Error: para validar, la reseña debe estar en estado Created.";
    } else if (msg.includes("Solo resenas validadas")) {
      moderatorStatus.textContent = "Error: para publicar, la reseña debe estar en estado Validated.";
    } else if (msg.includes("Ya invalidada")) {
      moderatorStatus.textContent = "Error: la reseña ya está invalidada.";
    } else {
      moderatorStatus.textContent = "Error al ejecutar la acción: " + msg;
    }
    moderatorStatus.classList.add("error");
  }
}

// =====================
// Wire events
// =====================
connectButton.onclick = connectWallet;
createReviewButton.onclick = createReview;
searchButton.onclick = searchReviews;

loadGlobalButton.onclick = loadGlobalData;
getAverageButton.onclick = getAverage;
validateButton.onclick = () => moderatorAction("validate");
publishButton.onclick = () => moderatorAction("publish");
invalidateButton.onclick = () => moderatorAction("invalidate");
refreshModeratorListsButton.onclick = () => loadModeratorLists();
