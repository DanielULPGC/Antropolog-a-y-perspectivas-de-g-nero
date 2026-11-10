/*
 * Entramados · interfaz
 * Índice | escena | ficha. Rutas por ancla: #inicio, #e1…#e10, #estudio, #tarjetas, #simulador, #examen,
 * #glosario, #bibliografia, #guia y #docente (activa el modo docente en esta pestaña).
 */
const E = window.ESTACIONES, R = window.REFERENCIAS, X = window.EXAMEN, G = window.GLOSARIO, T = window.TEMAS;
const S = window.ESTUDIO || {}, GU = window.GUIA || {};
const $ = (s) => document.querySelector(s);
const ficha = $("#ficha");
const CLAVE = "entramados-v1";
const NE = E.length;
/* colores de los hilos (uno por estación), compartidos con la escena */
export const HILOS = ["#a3333f", "#34508a", "#c48a1c", "#5d7a3a", "#7a4f8c", "#b8642c", "#2f7a78", "#b35a7a", "#8a6a3a", "#4a6f9e"];
const BLOQUES = {
  1: "Análisis del pensamiento ilustrado y los orígenes de la construcción del sujeto moderno",
  2: "Comienzos y desarrollo de la teoría feminista: siglos XIX y XX",
  3: "La antropología feminista: androcentrismo, etnocentrismo y crítica feminista",
  4: "Entramados teóricos y políticos de la antropología feminista"
};

/* ---------- estado (solo en este navegador) ---------- */
let estado = { resueltos: {}, predicciones: {}, examen: null, pestana: {}, apuntes: {}, respuestas: {}, repasadas: {}, cajas: {}, simulacro: null };
try { const g = JSON.parse(localStorage.getItem(CLAVE) || "null"); if (g) estado = Object.assign(estado, g); } catch (e) { /* sin almacenamiento */ }
const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) { /* sin almacenamiento */ } };
let temporizador = null;
const guardarPronto = () => { clearTimeout(temporizador); temporizador = setTimeout(guardar, 400); };
let docente = false;
try { docente = sessionStorage.getItem("ent-docente") === "1"; } catch (e) { /* nada */ }

const retosDe = (est) => est.retos.map((r) => r.id);
const hechosDe = (est) => retosDe(est).filter((id) => estado.resueltos[id]).length;
const completa = (est) => hechosDe(est) === est.retos.length;
const estPorId = (id) => E.find((e) => e.id === id);

/* ---------- utilidades ---------- */
function h(tag, attrs = {}, ...hijos) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) n.setAttribute(k, v);
  }
  hijos.flat().forEach((c) => { if (c != null) n.append(c.nodeType ? c : document.createTextNode(c)); });
  return n;
}
function refHTML(clave) {
  const r = R[clave]; if (!r) return "";
  let s = r.cita;
  if (r.doi) s += ` <a href="https://doi.org/${r.doi}" target="_blank" rel="noopener">https://doi.org/${r.doi}</a>`;
  else if (r.url) s += ` <a href="${r.url}" target="_blank" rel="noopener">${r.url}</a>`;
  if (r.nota) s += ` <span class="nota">${r.nota}</span>`;
  return s;
}
const contarPalabras = (t) => (t.trim().match(/\S+/g) || []).length;
const barajar = (a) => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
let primeraVista = true;
function irArriba() {
  ficha.scrollTop = 0;
  if (!primeraVista && window.innerWidth <= 1100) ficha.scrollIntoView({ behavior: "smooth", block: "start" });
  primeraVista = false;
}
const botonEst = (id, texto) => { const e = estPorId(id); return h("button", { type: "button", class: "enlace", onclick: () => navegar(id) }, texto || `Estación ${e.num}: ${e.titulo}`); };

/* ---------- índice ---------- */
function pintarIndice(actual) {
  const cont = $("#lista-estaciones"); cont.innerHTML = "";
  [1, 2, 3, 4].forEach((b) => {
    const sec = h("div", { class: "bloque" }, h("p", { class: "bloque-tit" }, h("strong", {}, `Bloque ${b}. `), BLOQUES[b]));
    const ul = h("ul", { class: "lista" });
    E.filter((est) => est.bloque === b).forEach((est) => {
      const i = E.indexOf(est), n = hechosDe(est), t = est.retos.length, ok = n === t;
      ul.append(h("li", {}, h("button", {
        type: "button", "aria-current": actual === est.id ? "true" : "false", onclick: () => navegar(est.id)
      }, h("span", { class: "num" }, String(est.num)),
         h("span", { class: "tit" }, h("span", { class: "muestra", style: `background:${HILOS[i]}`, "aria-hidden": "true" }), est.titulo, h("br"), h("span", { class: "manual" }, `${est.manual}, cap. ${est.cap}`)),
         h("span", { class: "est mono" + (ok ? " hecho" : ""), "aria-label": `${n} de ${t} retos` }, ok ? "✓" : `${n}/${t}`))));
    });
    sec.append(ul); cont.append(sec);
  });
  const nComp = E.filter(completa).length;
  $("#progreso-relleno").style.width = `${(nComp / NE) * 100}%`;
  $(".barra-progreso").setAttribute("aria-valuenow", String(nComp));
  $("#pildora-progreso").textContent = `${nComp} de ${NE} hilos tejidos`;
  if (escena) escena.marcarResueltas(E.map(completa));
}

/* ---------- inicio ---------- */
function vistaInicio() {
  ficha.innerHTML = "";
  ficha.append(
    h("p", { class: "etiqueta" }, "Antropología y perspectivas de género · UNED · 70023095"),
    h("h2", {}, "Entramados"),
    h("p", { class: "sub" }, "Taller de teoría feminista y antropología"),
    h("p", { class: "lema" }, "Diez estaciones, diez hilos. Cada estación que completas teje una franja en el telar central: al final, la trama reúne la Ilustración, la teoría feminista de los siglos XIX y XX y la antropología feminista."),
    h("p", {}, "El recurso sigue los dos manuales obligatorios en el orden que recomienda el equipo docente: primero Hernández Corrochano, ", h("em", {}, "Teoría feminista y antropología: claves analíticas"), " (2012, caps. 1-5; estaciones 1-5), y después Méndez, ", h("em", {}, "Antropología feminista"), " (2007, caps. 3-7; estaciones 6-10). Las referencias «HC, p.» y «M, p.» remiten a sus páginas."),
    h("h3", {}, "Cómo se trabaja cada estación"),
    h("ol", { class: "lista-plana" },
      h("li", {}, h("strong", {}, "Predice. "), "Responde a la pregunta inicial antes de leer."),
      h("li", {}, h("strong", {}, "Comprende. "), "Lee la síntesis con sus páginas, los conceptos y los avisos de «Lee con cautela», donde se señalan erratas y fechas discutidas."),
      h("li", {}, h("strong", {}, "Resuelve. "), "Supera los retos; cada acierto se explica."),
      h("li", {}, h("strong", {}, "Estudia. "), "Ideas clave, errores frecuentes, un tema de desarrollo con guion y tus apuntes."),
      h("li", {}, h("strong", {}, "Prepara la prueba. "), "En «Al examen», posibles preguntas cortas con los elementos que debería contener la respuesta.")),
    h("div", { class: "reto-acciones" },
      h("button", { type: "button", class: "boton primario", onclick: () => navegar("e1") }, "Empezar por la estación 1"),
      h("button", { type: "button", class: "boton", onclick: () => navegar("estudio") }, "Guía de estudio"),
      h("button", { type: "button", class: "boton", onclick: () => navegar("simulador") }, "Simulador de la prueba")),
    (() => { const n = pendientesHoy(); return n ? h("p", { class: "fb bien", role: "status" }, `Hoy te tocan ${n} tarjetas de repaso. `, h("button", { type: "button", class: "enlace", onclick: () => navegar("tarjetas") }, "Repasarlas")) : null; })(),
    h("h3", {}, "Herramientas para estudiar"),
    h("ul", { class: "lista-plana" },
      h("li", {}, h("button", { type: "button", class: "enlace", onclick: () => navegar("conceptos") }, "Red de conceptos"), ": cada concepto, contra qué se formuló y con qué se relaciona."),
      h("li", {}, h("button", { type: "button", class: "enlace", onclick: () => navegar("casos") }, "Atlas de casos"), ": trece casos etnográficos con su lección y su cautela."),
      h("li", {}, h("button", { type: "button", class: "enlace", onclick: () => navegar("corrientes") }, "Comparador de corrientes"), ": origen de la subordinación, conceptos y críticas, lado a lado."),
      h("li", {}, h("button", { type: "button", class: "enlace", onclick: () => navegar("lectura") }, "Lectura crítica (PEC)"),  ": una pauta para analizar el texto de la PEC con tus palabras."),
      h("li", {}, h("button", { type: "button", class: "enlace", onclick: () => navegar("simulador") }, "Simulador"), ": ahora con rúbrica de autocorrección e historial de notas.")),
    h("h3", {}, "Estaciones"),
    h("div", { class: "grupo-herr" }, E.map((est, i) => h("button", { type: "button", class: "boton ancho", onclick: () => navegar(est.id) },
      h("span", { class: "muestra", style: `background:${HILOS[i]};width:10px;height:10px;border-radius:2px;display:inline-block`, "aria-hidden": "true" }),
      h("span", { class: "mono" }, `${est.num} ·`), ` ${est.titulo} — ${est.manual}, cap. ${est.cap}`))),
    h("div", { class: "aviso" }, "Este taller resume y organiza los manuales; no sustituye su lectura ni la guía de la asignatura, que prevalece en contenidos, formato y fechas. En la prueba presencial las respuestas son de desarrollo y no se permite material: la autoevaluación tipo test solo sirve para comprobar conceptos."),
    h("p", { class: "nota-pie" }, "El progreso, las respuestas y los apuntes se guardan solo en este navegador.")
  );
  irArriba();
}

/* ---------- estación ---------- */
function vistaEstacion(i, pestana) {
  const est = E[i];
  const actual = pestana || estado.pestana[est.id] || "saber";
  ficha.innerHTML = "";
  ficha.append(
    h("p", { class: "etiqueta" }, `Estación ${est.num} de ${NE} · Bloque ${est.bloque} · ${est.manual === "HC" ? "Hernández Corrochano" : "Méndez"}, ${est.paginas}`),
    h("h2", {}, est.titulo),
    h("p", { class: "sub" }, est.sub),
    h("p", { class: "lema" }, est.lema)
  );
  // predicción
  const fs = h("fieldset", { class: "prediccion" }, h("legend", {}, "Predice"), h("p", {}, est.prediccion.q));
  const ops = h("div", { class: "opciones" });
  est.prediccion.o.forEach((o, k) => {
    const id = `${est.id}-pred-${k}`;
    const inp = h("input", { type: "radio", name: `${est.id}-pred`, id, value: String(k) });
    if (estado.predicciones[est.id] === k) inp.checked = true;
    inp.addEventListener("change", () => { estado.predicciones[est.id] = k; guardar(); });
    ops.append(h("label", { for: id }, inp, o));
  });
  fs.append(ops);
  if (completa(est)) fs.append(h("p", { class: "fb bien" }, "Estación completada. ¿Mantienes tu predicción? Justifícala con lo aprendido y con una página del manual."));
  ficha.append(fs);

  // pestañas
  const nombres = { saber: "Saber", estudiar: "Estudiar", retos: `Retos ${hechosDe(est)}/${est.retos.length}`, examen: "Al examen", fuentes: "Fuentes" };
  const tl = h("div", { class: "pestanas", role: "tablist", "aria-label": "Secciones de la estación" });
  const paneles = {};
  Object.keys(nombres).forEach((k) => {
    const b = h("button", { type: "button", role: "tab", id: `tab-${k}`, "aria-controls": `panel-${k}`, "aria-selected": k === actual ? "true" : "false", tabindex: k === actual ? "0" : "-1" }, nombres[k]);
    b.addEventListener("click", () => activar(k, true));
    b.addEventListener("keydown", (ev) => {
      const ks = Object.keys(nombres), p = ks.indexOf(k);
      if (ev.key === "ArrowRight") { activar(ks[(p + 1) % ks.length], true); ev.preventDefault(); }
      if (ev.key === "ArrowLeft") { activar(ks[(p + ks.length - 1) % ks.length], true); ev.preventDefault(); }
    });
    tl.append(b);
  });
  ficha.append(tl);
  function activar(k, foco) {
    tl.querySelectorAll("button").forEach((b) => { const s = b.id === `tab-${k}`; b.setAttribute("aria-selected", s); b.tabIndex = s ? 0 : -1; if (s && foco) b.focus(); });
    Object.entries(paneles).forEach(([n, p]) => { p.hidden = n !== k; });
    estado.pestana[est.id] = k; guardar();
  }
  const panel = (k) => { const p = h("div", { class: "panel", role: "tabpanel", id: `panel-${k}`, "aria-labelledby": `tab-${k}` }); paneles[k] = p; ficha.append(p); return p; };

  // saber
  const pS = panel("saber");
  pS.append(h("p", { class: "idea" }, est.idea));
  est.sintesis.forEach((p) => pS.append(h("p", { html: p })));
  pS.append(h("h3", {}, "Conceptos clave"));
  const dl = h("dl", { class: "conceptos" });
  est.conceptos.forEach((c) => dl.append(h("div", {}, h("dt", {}, c.t), h("dd", {}, c.d))));
  pS.append(dl);
  pS.append(h("blockquote", { class: "cita" }, h("p", {}, `«${est.cita.texto}»`), h("footer", {}, est.cita.fuente)));
  pS.append(h("h3", {}, "Lee con cautela"));
  est.matices.forEach((m) => pS.append(h("div", { class: "matiz" }, h("strong", {}, m.t), m.d)));
  pS.append(h("div", { class: "navegacion" }, h("button", { type: "button", class: "boton primario", onclick: () => activar("retos", true) }, "Ir a los retos")));

  // estudiar
  const pE = panel("estudiar");
  const st = S[est.id];
  if (st) {
    pE.append(h("h3", {}, "Ideas clave"), h("ul", { class: "lista-plana claves" }, st.claves.map((c) => h("li", {}, c))));
    pE.append(h("h3", {}, "Errores frecuentes"));
    st.errores.forEach((x) => pE.append(h("div", { class: "matiz" }, x)));
    pE.append(h("h3", {}, "Tema de desarrollo"), h("p", { class: "lema" }, st.desarrollo.q),
      h("p", { class: "nota-pie" }, "En la prueba, el tema de desarrollo no puede superar una cara de folio. Escribe sin mirar y compara después con el guion."));
    const idR = `resp-${est.id}`;
    const ta = h("textarea", { id: idR, rows: "8", class: "area", placeholder: "Redacta aquí tu respuesta antes de ver el guion." });
    const cnt = h("span", { class: "contador", "aria-live": "polite" });
    const actualiza = () => { cnt.textContent = `${contarPalabras(ta.value)} palabras`; };
    ta.value = estado.respuestas[est.id] || ""; actualiza();
    ta.addEventListener("input", () => { estado.respuestas[est.id] = ta.value; actualiza(); guardarPronto(); });
    pE.append(h("div", { class: "campo" }, h("label", { for: idR }, "Tu respuesta"), ta, cnt));
    pE.append(h("details", { class: "guion" }, h("summary", {}, "Ver guion de respuesta"),
      h("ol", { class: "lista-plana" }, st.desarrollo.guion.map((g) => h("li", {}, g))),
      h("p", { class: "nota-pie" }, "El guion orienta la estructura: delimitación, genealogía, núcleo, caso y cierre. Desarrolla cada punto con tesis, autoras y categorías.")));
  }
  const idA = `apuntes-${est.id}`;
  const ap = h("textarea", { id: idA, rows: "5", class: "area", placeholder: "Dudas, ejemplos propios, conexiones con otras estaciones…" });
  ap.value = estado.apuntes[est.id] || "";
  ap.addEventListener("input", () => { estado.apuntes[est.id] = ap.value; guardarPronto(); });
  pE.append(h("h3", {}, "Mis apuntes"), h("div", { class: "campo" }, h("label", { for: idA }, "Notas de esta estación (se guardan en este navegador)"), ap));
  const idC = `repasada-${est.id}`;
  const chk = h("input", { type: "checkbox", id: idC });
  chk.checked = !!estado.repasadas[est.id];
  chk.addEventListener("change", () => { estado.repasadas[est.id] = chk.checked; guardar(); });
  pE.append(h("label", { for: idC, class: "casilla" }, chk, "He repasado esta estación"));
  pE.append(h("div", { class: "reto-acciones" },
    h("button", { type: "button", class: "boton", onclick: () => navegar("tarjetas") }, "Repasar con tarjetas"),
    h("button", { type: "button", class: "boton", onclick: () => navegar("estudio") }, "Guía de estudio")));

  // retos
  const pR = panel("retos");
  est.retos.forEach((r) => {
    Retos.render(r, pR, {
      docente, resuelto: !!estado.resueltos[r.id],
      onResuelto: () => {
        const antes = completa(est);
        estado.resueltos[r.id] = true; guardar();
        const tab = tl.querySelector("#tab-retos"); if (tab) tab.textContent = `Retos ${hechosDe(est)}/${est.retos.length}`;
        pintarIndice(est.id);
        if (!antes && completa(est)) pR.append(h("p", { class: "fb bien", role: "status" }, `Hilo ${est.num} tejido: su franja ya aparece en el telar central.`));
      }
    });
  });

  // al examen
  const pX = panel("examen");
  pX.append(h("h3", {}, "Posibles preguntas cortas"),
    h("p", { class: "nota-pie" }, "Cada pregunta corta vale 2 puntos, y las tres juntas no pueden superar una cara de folio: unas pocas frases precisas por pregunta. Intenta enumerar los elementos antes de desplegarlos: definición con autora, contra qué se formula, un caso y la consecuencia analítica."));
  est.examen.forEach((p) => pX.append(h("div", { class: "corta" }, h("p", {}, p.q),
    h("details", {}, h("summary", {}, "Elementos que debería contener"), h("ul", { class: "lista-plana" }, p.claves.map((c) => h("li", {}, c)))))));
  pX.append(h("h3", {}, "Conecta con otras estaciones"));
  est.conexiones.forEach(([id, motivo]) => pX.append(h("p", { class: "conexion" }, botonEst(id), h("span", {}, motivo))));
  pX.append(h("div", { class: "reto-acciones" }, h("button", { type: "button", class: "boton primario", onclick: () => navegar("simulador") }, "Practicar en el Simulador")));
  if (docente) {
    pX.append(h("div", { class: "docente-caja" },
      h("p", { class: "etiqueta" }, "Notas para tutoría"),
      h("p", {}, h("strong", {}, "Duración orientativa: "), est.docente.duracion),
      h("p", {}, h("strong", {}, "Dinámica: "), est.docente.dinamica),
      h("p", {}, h("strong", {}, "Preguntas para el debate:")),
      h("ul", { class: "lista-plana" }, est.docente.preguntas.map((q) => h("li", {}, q)))));
  }

  // fuentes
  const pF = panel("fuentes");
  pF.append(h("h3", {}, "Referencias de esta estación"),
    h("p", { class: "nota-pie" }, "Se citan en la edición que manejan los manuales; las de ampliación se identifican como tales. DOI solo cuando se ha contrastado."));
  pF.append(h("ul", { class: "refs" }, est.refs.map((k) => h("li", { html: refHTML(k) + (R[k] && R[k].tipo === "amplia" ? '<span class="nota">Amplía, no sustituye a los manuales.</span>' : "") }))));

  ficha.append(h("div", { class: "navegacion" },
    h("button", { type: "button", class: "boton", disabled: i === 0, onclick: () => navegar(E[i - 1].id) }, "← Anterior"),
    h("button", { type: "button", class: "boton", onclick: () => navegar("inicio") }, "Inicio"),
    h("button", { type: "button", class: "boton", disabled: i === E.length - 1, onclick: () => navegar(E[i + 1].id) }, "Siguiente →")));
  activar(actual, false);
  irArriba();
}

/* ---------- autoevaluación ---------- */
const N_EXAMEN = 15;
function sorteo() {
  const porEst = E.map((e) => barajar(X.filter((p) => p.est === e.id)));
  const elegidas = porEst.map((l) => l[0]).filter(Boolean);
  const resto = barajar(X.filter((p) => !elegidas.includes(p)));
  return barajar(elegidas.concat(resto.slice(0, N_EXAMEN - elegidas.length)));
}
function vistaExamen() {
  const Q = sorteo();
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Herramienta"), h("h2", {}, "Autoevaluación"),
    h("p", { class: "sub" }, `${N_EXAMEN} preguntas sorteadas de un banco de ${X.length}, con al menos una por estación. Cada fallo indica qué estación repasar.`),
    h("div", { class: "aviso" }, "La prueba presencial no es de tipo test: este ejercicio comprueba conceptos. Para entrenar la redacción, usa el Simulador."));
  if (estado.examen != null) ficha.append(h("p", { class: "idea" }, `Tu mejor resultado en este navegador: ${estado.examen} de ${N_EXAMEN}.`));
  const form = h("form", {});
  Q.forEach((p, qi) => {
    const fs = h("fieldset", { class: "pregunta" }, h("legend", {}, `${qi + 1}. ${p.q}`));
    const ops = h("div", { class: "opciones" });
    p.o.forEach((o, oi) => { const id = `ex-${qi}-${oi}`; ops.append(h("label", { for: id }, h("input", { type: "radio", name: `ex-${qi}`, id, value: String(oi) }), o)); });
    fs.append(ops, h("div", { class: "resultado-item", id: `ex-r-${qi}` }));
    form.append(fs);
  });
  const res = h("div", { class: "resultado", role: "status" });
  form.append(h("div", { class: "reto-acciones" }, h("button", { type: "submit", class: "boton primario" }, "Corregir"),
    h("button", { type: "button", class: "boton", onclick: () => vistaExamen() }, "Nuevo sorteo"),
    docente ? h("button", { type: "button", class: "boton", onclick: () => { Q.forEach((p, qi) => { form.querySelector(`#ex-${qi}-${p.c}`).checked = true; }); } }, "Marcar solución") : null), res);
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    let ok = 0; const fallos = {};
    Q.forEach((p, qi) => {
      const m = form.querySelector(`input[name="ex-${qi}"]:checked`), out = form.querySelector(`#ex-r-${qi}`);
      const bien = m && Number(m.value) === p.c; if (bien) ok++; else fallos[p.est] = (fallos[p.est] || 0) + 1;
      const est = estPorId(p.est);
      out.innerHTML = "";
      out.append(h("div", { class: "fb " + (bien ? "bien" : "mal") }, bien ? `Correcto. ${p.e}` : (m ? "No es correcta. " : "Sin responder. "),
        bien ? null : h("button", { type: "button", class: "boton", onclick: () => navegar(p.est) }, `Repasar estación ${est.num}`)));
    });
    estado.examen = Math.max(estado.examen || 0, ok); guardar();
    const rep = Object.keys(fallos).map(estPorId).sort((a, b) => a.num - b.num).map((e) => `${e.num}. ${e.titulo}`).join("; ");
    res.innerHTML = `<div class="fb ${ok >= 11 ? "bien" : "mal"}">${ok} de ${N_EXAMEN} correctas.${ok >= 11 ? " Buen dominio de los conceptos." : ""}${rep ? " Repasa: " + rep + "." : ""}</div>`;
  });
  ficha.append(form);
  irArriba();
}

/* ---------- simulador de la prueba presencial ---------- */
let relojSim = null;
function nuevoSimulacro() {
  // tres preguntas cortas: una de cada manual y una tercera al azar, de estaciones distintas
  const cortas = [];
  E.forEach((e) => e.examen.forEach((p) => cortas.push({ q: p.q, claves: p.claves, est: e.id, manual: e.manual })));
  const hc = barajar(cortas.filter((c) => c.manual === "HC")), m = barajar(cortas.filter((c) => c.manual === "M"));
  const elegidas = [hc[0], m[0]];
  const resto = barajar(cortas.filter((c) => !elegidas.includes(c) && !elegidas.some((x) => x.est === c.est)));
  elegidas.push(resto[0]);
  const tema = barajar(T)[0];
  estado.simulacro = { cortas: elegidas.map((c) => ({ q: c.q, est: c.est })), tema: tema.id, resp: ["", "", "", ""], inicio: null };
  guardar();
}
function claveCorta(q) { for (const e of E) { const p = e.examen.find((x) => x.q === q); if (p) return p.claves; } return []; }
function vistaSimulador() {
  if (!estado.simulacro || !T.find((t) => t.id === estado.simulacro.tema)) nuevoSimulacro();
  const sim = estado.simulacro, tema = T.find((t) => t.id === sim.tema);
  clearInterval(relojSim);
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Herramienta"), h("h2", {}, "Simulador de la prueba presencial"),
    h("p", { class: "sub" }, "Tres preguntas cortas (2 puntos cada una) que en conjunto no pueden superar una cara de folio, y un tema de desarrollo (4 puntos) en otra cara como máximo. Sin material y con 120 minutos."),
    h("div", { class: "aviso" }, "Una cara de folio manuscrita suele dar para unas 250-400 palabras, según la letra: para las tres preguntas cortas juntas eso supone unas 80-130 palabras por respuesta. Los contadores son solo orientativos. Formato según la guía del curso 2026/2027."));
  // reloj
  const reloj = h("span", { class: "reloj", "aria-live": "off" }, "120:00");
  const bReloj = h("button", { type: "button", class: "boton primario" }, sim.inicio ? "Reiniciar reloj" : "Empezar (120 min)");
  const pintaReloj = () => {
    if (!sim.inicio) { reloj.textContent = "120:00"; return; }
    const rest = Math.max(0, 120 * 60 - Math.floor((Date.now() - sim.inicio) / 1000));
    reloj.textContent = `${String(Math.floor(rest / 60)).padStart(2, "0")}:${String(rest % 60).padStart(2, "0")}`;
    reloj.classList.toggle("alerta", rest < 600);
    if (rest === 0) clearInterval(relojSim);
  };
  bReloj.addEventListener("click", () => { sim.inicio = Date.now(); guardar(); bReloj.textContent = "Reiniciar reloj"; clearInterval(relojSim); relojSim = setInterval(pintaReloj, 1000); pintaReloj(); });
  if (sim.inicio) { relojSim = setInterval(pintaReloj, 1000); }
  pintaReloj();
  const bNuevo = h("button", { type: "button", class: "boton", onclick: () => { nuevoSimulacro(); vistaSimulador(); } }, "Nuevo simulacro");
  ficha.append(h("div", { class: "sim-cab" }, reloj, bReloj, bNuevo, h("span", { class: "nota-pie" }, "Reparto sugerido: 20 min por pregunta corta, 45 para el tema y 10 de revisión.")));

  const bloque = (n, titulo, enunciado, extra) => {
    const id = `sim-${n}`;
    const ta = h("textarea", { id, rows: n === 3 ? "14" : "9", class: "area", placeholder: "Escribe sin consultar el manual." });
    const cnt = h("span", { class: "contador", "aria-live": "polite" });
    const act = () => {
      const w = contarPalabras(ta.value);
      cnt.textContent = n === 3 ? `${w} palabras (una cara de folio: unas 250-400)` : `${w} palabras (orientación: 80-130 por pregunta corta)`;
      cnt.classList.toggle("exceso", n === 3 ? w > 420 : w > 140);
      if (n < 3 && parte1) { const t = [0, 1, 2].reduce((acc, i) => acc + contarPalabras(sim.resp[i] || ""), 0); parte1.textContent = `Primera parte: ${t} palabras en total. Las tres respuestas deben caber en una cara de folio.`; parte1.classList.toggle("exceso", t > 420); }
    };
    ta.value = sim.resp[n] || ""; act();
    ta.addEventListener("input", () => { sim.resp[n] = ta.value; act(); guardarPronto(); });
    return h("section", { class: "sim-preg" }, h("h3", {}, titulo), h("p", { class: "lema" }, enunciado), extra || null,
      h("div", { class: "campo" }, h("label", { for: id }, "Respuesta"), ta, cnt));
  };
  const parte1 = h("p", { class: "contador", "aria-live": "polite" });
  sim.cortas.forEach((c, k) => ficha.append(bloque(k, `Pregunta corta ${k + 1} · 2 puntos`, c.q, h("p", { class: "nota-pie" }, "Procede de ", botonEst(c.est), "."))));
  ficha.append(parte1);
  { const t = [0, 1, 2].reduce((acc, i) => acc + contarPalabras(sim.resp[i] || ""), 0); parte1.textContent = `Primera parte: ${t} palabras en total. Las tres respuestas deben caber en una cara de folio.`; }
  ficha.append(bloque(3, "Tema de desarrollo · 4 puntos", tema.q, h("p", { class: "nota-pie" }, "Estaciones relacionadas: ", tema.est.map((id, i) => [i ? ", " : "", botonEst(id, `${estPorId(id).num}`)]))));

  // corrección
  const corr = h("div", {});
  const bCorr = h("button", { type: "button", class: "boton primario" }, "Terminar y ver criterios");
  bCorr.addEventListener("click", () => {
    clearInterval(relojSim);
    corr.innerHTML = "";
    corr.append(h("h3", {}, "Autocorrección con rúbrica"),
      h("p", { class: "nota-pie" }, "Marca solo los elementos que tu respuesta desarrolla con precisión, no los que menciona de pasada. La nota es orientativa: la corrección real valora también la redacción, el uso preciso de las categorías y el ajuste a una cara de folio."));
    const marcas = [];
    const total = h("p", { class: "idea", "aria-live": "polite" });
    const recalcula = () => {
      let suma = 0;
      marcas.forEach((m) => { const n = m.cajas.filter((c) => c.checked).length; m.nota = m.cajas.length ? Math.round((n / m.cajas.length) * m.max * 10) / 10 : 0; m.salida.textContent = `${m.nota.toLocaleString("es")} de ${m.max} puntos`; suma += m.nota; });
      total.textContent = `Nota orientativa: ${(Math.round(suma * 10) / 10).toLocaleString("es")} sobre 10`;
      return Math.round(suma * 10) / 10;
    };
    const bloqueRubrica = (k, titulo, enunciado, items, max, ordenada) => {
      const cajas = items.map((x, j) => h("input", { type: "checkbox", id: `rub-${k}-${j}` }));
      const salida = h("span", { class: "contador" });
      cajas.forEach((c) => c.addEventListener("change", recalcula));
      const lista = h(ordenada ? "ol" : "ul", { class: "lista-plana rubrica" }, items.map((x, j) => h("li", {}, h("label", { for: `rub-${k}-${j}`, class: "casilla" }, cajas[j], x))));
      marcas.push({ cajas, salida, max, nota: 0 });
      return h("div", { class: "corta" }, h("p", {}, h("strong", {}, titulo), enunciado), lista,
        h("p", { class: "contador" }, `Tu respuesta: ${contarPalabras(sim.resp[k] || "")} palabras · `, salida));
    };
    sim.cortas.forEach((c, k) => corr.append(bloqueRubrica(k, `Pregunta corta ${k + 1}. `, c.q, claveCorta(c.q), 2, false)));
    corr.append(bloqueRubrica(3, "Tema de desarrollo. ", tema.q, tema.guion, 4, true));
    recalcula();
    const avisoH = h("span", { class: "nota-pie", role: "status" });
    const bGuardar = h("button", { type: "button", class: "boton primario" }, "Guardar en mi historial");
    bGuardar.addEventListener("click", () => {
      const nota = recalcula();
      estado.historialSim = (estado.historialSim || []).concat([{ fecha: new Date().toISOString().slice(0, 10), nota, desglose: marcas.map((m) => m.nota), tema: tema.id, palabras: [0, 1, 2, 3].map((i) => contarPalabras(sim.resp[i] || "")) }]).slice(-20);
      guardar(); avisoH.textContent = "Guardado. Consulta la evolución en el historial, al final de esta página."; pintaHistorial();
    });
    corr.append(total, h("div", { class: "reto-acciones" }, bGuardar, avisoH));
    const txt = [`SIMULACRO · ENTRAMADOS`, ""].concat(sim.cortas.map((c, k) => `PREGUNTA CORTA ${k + 1}: ${c.q}\n${sim.resp[k] || "(sin responder)"}\n`), [`TEMA: ${tema.q}\n${sim.resp[3] || "(sin responder)"}`]).join("\n");
    const salida = h("pre", { class: "salida", tabindex: "0", role: "region", "aria-label": "Respuestas del simulacro" }, txt);
    const aviso = h("span", { class: "nota-pie", role: "status" });
    corr.append(h("div", { class: "reto-acciones" }, h("button", { type: "button", class: "boton", onclick: () => copiarTexto(txt, salida, aviso) }, "Copiar mis respuestas"), aviso), salida);
    corr.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  const hist = h("section", { "aria-labelledby": "t-hist" });
  function pintaHistorial() {
    const H = estado.historialSim || [];
    hist.innerHTML = "";
    hist.append(h("h3", { id: "t-hist" }, "Historial de simulacros"));
    if (!H.length) { hist.append(h("p", { class: "nota-pie" }, "Aún no has guardado ningún simulacro. Al terminar uno, marca la rúbrica y pulsa «Guardar en mi historial».")); return; }
    hist.append(tabla({ titulo: "Simulacros guardados en este navegador (nota orientativa)", cab: ["Fecha", "Cortas (2 + 2 + 2)", "Tema (4)", "Total (10)"],
      filas: H.slice().reverse().map((r) => [r.fecha.split("-").reverse().join("/"), r.desglose.slice(0, 3).map((x) => x.toLocaleString("es")).join(" + "), r.desglose[3].toLocaleString("es"), r.nota.toLocaleString("es")]) }));
    if (H.length > 1) { const d = Math.round((H[H.length - 1].nota - H[0].nota) * 10) / 10; hist.append(h("p", { class: "nota-pie" }, `Del primer al último simulacro: ${d >= 0 ? "+" : ""}${d.toLocaleString("es")} puntos.`)); }
    const bBorrar = h("button", { type: "button", class: "boton" }, "Borrar historial");
    bBorrar.addEventListener("click", () => {
      if (bBorrar.dataset.confirmar) { estado.historialSim = []; guardar(); pintaHistorial(); return; }
      bBorrar.dataset.confirmar = "1"; bBorrar.textContent = "Pulsa otra vez para borrar";
    });
    hist.append(h("div", { class: "reto-acciones" }, bBorrar));
  }
  ficha.append(h("div", { class: "reto-acciones" }, bCorr), corr, hist);
  pintaHistorial();
  irArriba();
}

/* ---------- glosario ---------- */
function vistaGlosario() {
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Herramienta"), h("h2", {}, "Glosario"),
    h("p", { class: "sub" }, `${G.length} términos ordenados alfabéticamente, con la estación donde se trabajan.`));
  const dl = h("dl", { class: "glosario" });
  G.slice().sort((a, b) => a.t.localeCompare(b.t, "es")).forEach((g) => {
    const est = estPorId(g.e);
    dl.append(h("div", {}, h("dt", {}, g.t), h("dd", {}, g.d, " ", h("button", { type: "button", class: "boton", onclick: () => navegar(g.e), "aria-label": `${g.t}: ir a la estación ${est.num}` }, `Estación ${est.num}`))));
  });
  ficha.append(dl);
  irArriba();
}

/* ---------- bibliografía ---------- */
function vistaBibliografia() {
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Herramienta"), h("h2", {}, "Bibliografía y créditos"));
  const grupos = [["base", "Manuales obligatorios y guía"], ["obra", "Obras citadas por los manuales (en la edición que citan)"], ["amplia", "Ampliación (no sustituye a los manuales)"]];
  grupos.forEach(([t, nombre]) => {
    const claves = Object.keys(R).filter((k) => R[k].tipo === t).sort((a, b) => R[a].cita.localeCompare(R[b].cita, "es"));
    ficha.append(h("h3", {}, nombre), h("ul", { class: "refs" }, claves.map((k) => h("li", { html: refHTML(k) }))));
  });
  ficha.append(h("h3", {}, "Créditos y advertencias"),
    h("p", {}, "Recurso de estudio para la asignatura Antropología y perspectivas de género (Grado en Antropología Social y Cultural, UNED), elaborado con asistencia de un modelo de inteligencia artificial (Claude, Anthropic) en la redacción y la programación. Los textos son síntesis propias; las citas literales son breves y llevan página. Las páginas se cotejaron con los ejemplares aportados el 29 de octubre de 2026; los avisos «Lee con cautela» señalan erratas y fechas que difieren de la historiografía habitual. Versión 1.4 (9 de noviembre de 2026): bibliografía conforme a APA 7, cotejo de paráfrasis y nuevas herramientas de estudio."),
    h("p", {}, "Requiere revisión docente antes de su uso con alumnado. DOI incluidos solo cuando se han contrastado en la página del editor o en la lista verificada de la asignatura; el resto se cita sin DOI, como admite APA 7.ª. Escena 3D modelada por código con Three.js 0.160.0 (licencia MIT). Tipografías Fraunces, Atkinson Hyperlegible y JetBrains Mono (SIL Open Font License)."));
  irArriba();
}

/* ---------- guía de uso ---------- */
function vistaGuia() {
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Herramienta"), h("h2", {}, "Guía de uso"),
    h("h3", {}, "Para estudiar"),
    h("ul", { class: "lista-plana" },
      h("li", {}, "Recorre las estaciones en orden: primero el marco de teoría feminista (1-5) y después la antropología feminista (6-10)."),
      h("li", {}, "Responde a la predicción antes de leer y vuelve a ella al terminar."),
      h("li", {}, "En «Estudiar» redacta el tema de desarrollo antes de abrir el guion; en «Al examen», enumera los elementos de cada pregunta corta antes de desplegarlos."),
      h("li", {}, "Usa las tarjetas para fijar conceptos y el Simulador, con reloj, para entrenar la síntesis: una cara de folio para las tres preguntas cortas y otra para el tema."),
      h("li", {}, "Tu progreso se guarda solo en este navegador; la Guía de estudio permite copiar tus apuntes.")),
    h("h3", {}, "Para tutoría"),
    h("ul", { class: "lista-plana" },
      h("li", {}, "«Presentar» oculta el índice y amplía la ficha para proyectar."),
      h("li", {}, "El modo docente muestra notas de tutoría, preguntas de debate y botones de solución. Se activa con el ancla #docente o con el botón de abajo y dura mientras la pestaña siga abierta."),
      h("li", {}, "Anclas directas: #e1 a #e10, #estudio, #tarjetas, #simulador, #examen, #glosario, #bibliografia, #conceptos, #casos, #corrientes, #lectura.")),
    h("div", { class: "reto-acciones" },
      h("button", { type: "button", class: "boton" + (docente ? " activo" : ""), "aria-pressed": docente ? "true" : "false", onclick: () => { ponerDocente(!docente); vistaGuia(); } }, docente ? "Desactivar modo docente" : "Activar modo docente")),
    h("h3", {}, "Accesibilidad"),
    h("p", {}, "Todo el contenido de la escena 3D está también en el índice y en la ficha; los retos se resuelven con teclado. La animación se detiene si el sistema pide reducir el movimiento o con el botón «Pausar movimiento»."));
  irArriba();
}

/* ---------- guía de estudio ---------- */
function mapaSVG() {
  const caja = (x, y, w, hh, lineas, dest, color) => {
    const t = lineas.map((l, i) => `<tspan x="${x + w / 2}" dy="${i === 0 ? 0 : 14}">${l}</tspan>`).join("");
    const y0 = y + hh / 2 - ((lineas.length - 1) * 14) / 2 + 4;
    const r = `<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="6" class="n"/>${color ? `<rect x="${x}" y="${y}" width="5" height="${hh}" rx="2" fill="${color}"/>` : ""}<text x="${x + w / 2}" y="${y0}" text-anchor="middle" class="t">${t}</text>`;
    return dest ? `<a href="#${dest}" aria-label="${lineas.join(" ")}">${r}</a>` : r;
  };
  const enc = (x, y, w, txt) => `<rect x="${x}" y="${y}" width="${w}" height="24" rx="12" class="n-fuerte"/><text x="${x + w / 2}" y="${y + 16}" text-anchor="middle" class="t-fuerte">${txt}</text>`;
  const l = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="ar" marker-end="url(#pf)"/>`;
  return `<svg viewBox="0 0 400 600" role="group" aria-labelledby="mapa-t" aria-describedby="mapa-d" class="mapa">
  <title id="mapa-t">Mapa de la asignatura</title>
  <desc id="mapa-d">Cuatro bloques encadenados: Ilustración (estaciones 1 y 2), teoría feminista de los siglos XIX y XX (3 a 5), antropología feminista de los setenta (6 a 8) y entramados teóricos y políticos (9 y 10). Cada caja enlaza con su estación.</desc>
  <defs><marker id="pf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="pf"/></marker></defs>
  ${enc(70, 6, 260, "Bloque 1 · Ilustración y sujeto moderno")}
  ${caja(10, 40, 185, 54, ["1. Misoginia ilustrada", "contrato sexual · Rousseau"], "e1", HILOS[0])}
  ${caja(205, 40, 185, 54, ["2. Vindicación", "Poullain · Gouges · Wollstonecraft"], "e2", HILOS[1])}
  ${l(200, 96, 200, 124)}
  ${enc(70, 126, 260, "Bloque 2 · Teoría feminista, ss. XIX-XX")}
  ${caja(10, 160, 120, 62, ["3. Sufragismo", "determinismo", "Mill y Taylor Mill"], "e3", HILOS[2])}
  ${caja(140, 160, 120, 62, ["4. Socialismo", "salario familiar", "Zetkin · Kollontái"], "e4", HILOS[3])}
  ${caja(270, 160, 120, 62, ["5. Academia", "Beauvoir · Friedan", "igualdad/diferencia"], "e5", HILOS[4])}
  ${l(200, 224, 200, 252)}
  ${enc(50, 254, 300, "Bloque 3 · Androcentrismo y crítica feminista")}
  ${caja(10, 288, 120, 62, ["6. Malinowski", "Mead · Benedict", "todo dato se construye"], "e6", HILOS[5])}
  ${caja(140, 288, 120, 62, ["7. Lévi-Strauss", "intercambio de mujeres", "Beauvoir: el Otro"], "e7", HILOS[6])}
  ${caja(270, 288, 120, 62, ["8. Sexo social", "género · sistema", "sexo/género (Rubin)"], "e8", HILOS[7])}
  ${l(200, 352, 200, 380)}
  ${enc(50, 382, 300, "Bloque 4 · Entramados teóricos y políticos")}
  ${caja(10, 416, 185, 76, ["9. Origen de la subordinación", "patriarcado y matriarcado", "naturaleza/cultura · público/doméstico", "culturalistas · marxistas · materialistas"], "e9", HILOS[8])}
  ${caja(205, 416, 185, 76, ["10. Heterogeneidad del sujeto", "Scott · Butler · Mathieu", "sexualidad y lógicas identitarias", "reflexividad epistémica"], "e10", HILOS[9])}
  ${l(102, 494, 170, 528)}${l(298, 494, 230, 528)}
  ${caja(60, 530, 280, 60, ["Pregunta transversal de la Materia V:", "¿qué cambia en la práctica etnográfica", "cuando se aplica la crítica feminista?"], null, null)}
</svg>`;
}
function tabla(t) {
  return h("div", { class: "tabla-envoltura", tabindex: "0", role: "region", "aria-label": t.titulo }, h("table", { class: "tabla" },
    h("caption", {}, t.titulo),
    h("thead", {}, h("tr", {}, t.cab.map((c) => h("th", { scope: "col" }, c)))),
    h("tbody", {}, t.filas.map((f) => h("tr", {}, f.map((c, i) => i === 0 ? h("th", { scope: "row" }, c) : h("td", {}, c)))))));
}
function textoApuntes() {
  const lineas = ["ENTRAMADOS · MIS APUNTES DE ANTROPOLOGÍA Y PERSPECTIVAS DE GÉNERO", ""];
  E.forEach((e) => {
    lineas.push(`${e.num}. ${e.titulo.toUpperCase()} (${e.manual}, cap. ${e.cap}, ${e.paginas})`);
    if (S[e.id]) { lineas.push("Ideas clave:"); S[e.id].claves.forEach((c) => lineas.push(`- ${c}`)); }
    if (estado.apuntes[e.id]) lineas.push("Mis apuntes:", estado.apuntes[e.id]);
    if (S[e.id] && estado.respuestas[e.id]) lineas.push(`Tema de desarrollo: ${S[e.id].desarrollo.q}`, "Mi respuesta:", estado.respuestas[e.id]);
    lineas.push("");
  });
  return lineas.join("\n");
}
function copiarTexto(texto, nodo, aviso) {
  const sel = () => { const rg = document.createRange(); rg.selectNodeContents(nodo); const s = getSelection(); s.removeAllRanges(); s.addRange(rg); aviso.textContent = "Texto seleccionado: cópialo con Ctrl+C o ⌘+C."; };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(() => { aviso.textContent = "Copiado."; }, sel);
  else sel();
}
function vistaGuiaEstudio() {
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Estudio"), h("h2", {}, "Guía de estudio"),
    h("p", { class: "sub" }, "Formato de la prueba, plan de doce semanas, mapa de la asignatura, cuadros comparativos, cronología de autoras y autores y tus apuntes reunidos."));
  const nav = h("nav", { class: "indice-guia", "aria-label": "Apartados de la guía" });
  [["g-formato", "Formato de la prueba"], ["g-plan", "Plan de estudio"], ["g-mapa", "Mapa"], ["g-tablas", "Cuadros comparativos"], ["g-autores", "Cronología"], ["g-progreso", "Mi progreso y apuntes"]]
    .forEach(([id, t]) => nav.append(h("button", { type: "button", class: "boton", onclick: () => document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" }) }, t)));
  ficha.append(nav);

  if (GU.formato) ficha.append(h("h3", { id: "g-formato" }, "Formato de la prueba y de la PEC"),
    h("ul", { class: "lista-plana" }, GU.formato.puntos.map((p) => h("li", {}, p))), h("p", { class: "nota-pie" }, GU.formato.nota));

  ficha.append(h("h3", { id: "g-plan" }, "Plan de estudio sugerido (unas 10 horas semanales)"),
    tabla({ titulo: "Doce semanas en el orden de lectura recomendado", cab: ["Semanas", "Lectura", "Producto propio"], filas: GU.plan || [] }),
    h("p", { class: "nota-pie" }, "Los productos propios importan más que las horas: un esquema construido se recuerda; un subrayado, no. Si hay que recortar, recorta lectura complementaria, nunca los simulacros."));

  ficha.append(h("h3", { id: "g-mapa" }, "Mapa de la asignatura"), h("div", { class: "mapa-caja", html: mapaSVG() }),
    h("p", { class: "nota-pie" }, "Correspondencia propuesta por este recurso entre los cuatro bloques del programa y los capítulos de los manuales. La guía (cursos 2025/2026 y 2026/2027) agrupa los capítulos 1-3 de Hernández Corrochano bajo el pensamiento ilustrado y el sujeto moderno, y los capítulos 4-5 como puente hacia Méndez; aquí el capítulo 3 (siglo XIX) se sitúa en el bloque 2 por su cronología. Pulsa una caja para ir a su estación."));

  const tb = h("div", { id: "g-tablas" }, h("h3", {}, "Cuadros comparativos"));
  (GU.tablas || []).forEach((t) => tb.append(tabla(t)));
  ficha.append(tb);

  ficha.append(h("h3", { id: "g-autores" }, "Cronología de autoras, autores y obras"),
    h("p", { class: "nota-pie" }, "Fechas de las ediciones originales; cuando el manual da otra, se indica en la estación."),
    h("ol", { class: "cronologia" }, (GU.autores || []).map(([f, a, idea, e]) => h("li", {},
      h("span", { class: "mono fecha" }, f), h("span", {}, h("strong", {}, a), ". ", idea, " ", botonEst(e, `Estación ${e.slice(1)}`))))));

  ficha.append(h("h3", { id: "g-progreso" }, "Mi progreso y apuntes"));
  ficha.append(tabla({ titulo: "Estado de cada estación en este navegador", cab: ["Estación", "Retos", "Repasada", "Apuntes", "Desarrollo"],
    filas: E.map((e) => [`${e.num}. ${e.titulo}`, `${hechosDe(e)}/${e.retos.length}`, estado.repasadas[e.id] ? "Sí" : "No", estado.apuntes[e.id] ? "Sí" : "—", estado.respuestas[e.id] ? "Redactado" : "—"]) }));
  const salida = h("pre", { class: "salida", tabindex: "0", role: "region", "aria-label": "Apuntes reunidos" }, textoApuntes());
  const aviso = h("span", { class: "nota-pie", role: "status" });
  ficha.append(h("p", {}, "Reúne en un solo texto las ideas clave, tus apuntes y tus temas de desarrollo para pegarlos en tu documento de estudio."),
    h("div", { class: "reto-acciones" }, h("button", { type: "button", class: "boton primario", onclick: () => copiarTexto(salida.textContent, salida, aviso) }, "Copiar mis apuntes"), aviso), salida);
  irArriba();
}

/* ---------- tarjetas (cajas de Leitner) ---------- */
function mazo() {
  const vistos = new Set(), cartas = [];
  const add = (t, d, e) => { const k = t.toLowerCase(); if (vistos.has(k)) return; vistos.add(k); cartas.push({ t, d, e }); };
  E.forEach((e) => e.conceptos.forEach((c) => add(c.t, c.d, e.id)));
  G.forEach((g) => add(g.t, g.d, g.e));
  return cartas;
}
const DIAS = { 1: 1, 2: 3, 3: 7 };
const hoyISO = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
const sumarDias = (n) => { const d = new Date(); d.setDate(d.getDate() + n); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
function repasoDe(t) {
  const r = (estado.repaso || {})[t];
  if (r) return r;
  const viejo = (estado.cajas || {})[t]; // versiones anteriores: solo número de caja
  return { caja: viejo || 1, prox: viejo ? hoyISO() : null };
}
const tocaHoy = (t) => { const r = repasoDe(t); return !r.prox || r.prox <= hoyISO(); };
function pendientesHoy() { return mazo().filter((c) => tocaHoy(c.t) && (estado.repaso || {})[c.t]).length; }
function vistaTarjetas() {
  const cartas = mazo();
  estado.repaso = estado.repaso || {};
  const caja = (c) => repasoDe(c.t).caja;
  const nHoy = cartas.filter((c) => estado.repaso[c.t] && tocaHoy(c.t)).length;
  let filtro = nHoy ? "hoy" : "todas", actual = null, girada = false;
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Estudio"), h("h2", {}, "Tarjetas de repaso"),
    h("p", { class: "sub" }, `${cartas.length} conceptos. Define el término en voz alta, con su autora, antes de girar la tarjeta. «La sé» la sube de caja y aplaza su repaso (caja 1: mañana; caja 2: en 3 días; caja 3: en 7 días). «Repasar» la devuelve a la caja 1.`));
  const sel = h("select", { id: "t-filtro" },
    h("option", { value: "hoy" }, "Las que tocan hoy"), h("option", { value: "todas" }, "Todas las estaciones"),
    E.map((e) => h("option", { value: e.id }, `Estación ${e.num}: ${e.titulo}`)), h("option", { value: "pendientes" }, "Solo las de la caja 1"));
  sel.value = filtro;
  sel.addEventListener("change", () => { filtro = sel.value; siguiente(); });
  const cont = h("div", { class: "cajas mono", "aria-live": "polite" });
  const tarjeta = h("button", { type: "button", class: "tarjeta", "aria-pressed": "false" });
  tarjeta.addEventListener("click", () => { girada = !girada; pintar(); });
  const bSe = h("button", { type: "button", class: "boton primario" }, "La sé");
  const bRep = h("button", { type: "button", class: "boton" }, "Repasar");
  const bSig = h("button", { type: "button", class: "boton" }, "Siguiente");
  const bReinicio = h("button", { type: "button", class: "boton" }, "Reiniciar cajas");
  bSe.addEventListener("click", () => { if (!actual) return; const n = Math.min(3, caja(actual) + 1); estado.repaso[actual.t] = { caja: n, prox: sumarDias(DIAS[n]) }; guardar(); siguiente(); });
  bRep.addEventListener("click", () => { if (!actual) return; estado.repaso[actual.t] = { caja: 1, prox: hoyISO() }; guardar(); siguiente(); });
  bSig.addEventListener("click", siguiente);
  bReinicio.addEventListener("click", () => {
    if (!bReinicio.dataset.confirmar) { bReinicio.dataset.confirmar = "1"; bReinicio.textContent = "Pulsa otra vez para reiniciar"; return; }
    estado.repaso = {}; estado.cajas = {}; guardar(); bReinicio.textContent = "Reiniciar cajas"; delete bReinicio.dataset.confirmar; siguiente();
  });
  ficha.append(h("div", { class: "campo" }, h("label", { for: "t-filtro" }, "Qué repasar"), sel), cont, tarjeta,
    h("div", { class: "reto-acciones" }, bSe, bRep, bSig), h("div", { class: "reto-acciones" }, bReinicio),
    h("p", { class: "nota-pie" }, "Las fechas se guardan solo en este navegador. Las tarjetas que nunca has repasado no tienen fecha: aparecen en «Todas las estaciones»."));
  const lista = () => cartas.filter((c) => {
    if (filtro === "hoy") return estado.repaso[c.t] && tocaHoy(c.t);
    if (filtro === "todas") return true;
    if (filtro === "pendientes") return caja(c) === 1;
    return c.e === filtro;
  });
  function contar() {
    const l = lista(), n = [1, 2, 3].map((k) => l.filter((c) => caja(c) === k).length);
    const hoy = cartas.filter((c) => estado.repaso[c.t] && tocaHoy(c.t)).length;
    cont.textContent = `Caja 1: ${n[0]} · Caja 2: ${n[1]} · Caja 3: ${n[2]} · Tocan hoy: ${hoy}`;
  }
  function siguiente() {
    const l = lista(); girada = false;
    if (!l.length) { actual = null; pintar(); return; }
    const min = Math.min(...l.map(caja));
    const cand = l.filter((c) => caja(c) === min && c !== actual);
    const base = cand.length ? cand : l;
    actual = base[Math.floor(Math.random() * base.length)];
    pintar();
  }
  function pintar() {
    contar();
    tarjeta.innerHTML = "";
    if (!actual) { tarjeta.append(h("span", { class: "frente" }, filtro === "hoy" ? "Hoy no te toca ninguna tarjeta. Elige otra opción para seguir practicando." : "No quedan tarjetas con este filtro.")); return; }
    const e = estPorId(actual.e), r = repasoDe(actual.t);
    tarjeta.setAttribute("aria-pressed", girada ? "true" : "false");
    tarjeta.setAttribute("aria-label", girada ? `${actual.t}: ${actual.d}` : `${actual.t}. Pulsa para ver la definición`);
    tarjeta.append(h("span", { class: "etiqueta" }, `Estación ${e.num} · caja ${r.caja}${r.prox ? " · repaso: " + r.prox.split("-").reverse().join("/") : ""}`),
      h("span", { class: "frente" }, actual.t),
      girada ? h("span", { class: "dorso" }, actual.d) : h("span", { class: "pista nota-pie" }, "Pulsa para girar"));
  }
  siguiente();
  irArriba();
}

/* ---------- atlas de casos etnográficos ---------- */
const CA = window.CASOS || [], CO = window.CORRIENTES || [], CN = window.CONCEPTOS || { nodos: [], aristas: [] }, LE = window.LECTURA || null;
function vistaCasos() {
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Estudio"), h("h2", {}, "Atlas de casos etnográficos"),
    h("p", { class: "sub" }, `${CA.length} casos de los manuales, cada uno con lo que muestra, la lección que deja y la cautela con que hay que citarlo.`),
    h("div", { class: "aviso" }, "En la prueba, un caso bien citado (quién, cuándo, dónde y con qué controversia) vale más que tres mencionados de pasada. Un caso mal usado resta."));
  const sel = h("select", { id: "c-filtro" }, h("option", { value: "" }, "Todas las estaciones"), [...new Set(CA.map((c) => c.est))].map((id) => h("option", { value: id }, `Estación ${estPorId(id).num}: ${estPorId(id).titulo}`)));
  const cont = h("div", { class: "casos" });
  const pinta = () => {
    cont.innerHTML = "";
    CA.filter((c) => !sel.value || c.est === sel.value).forEach((c) => {
      cont.append(h("article", { class: "caso", id: `caso-${c.id}`, "aria-labelledby": `caso-t-${c.id}` },
        h("h3", { id: `caso-t-${c.id}` }, c.nombre),
        h("p", { class: "caso-meta mono" }, `${c.lugar} · ${c.quien}`),
        h("dl", { class: "caso-dl" },
          h("dt", {}, "Qué muestra"), h("dd", {}, c.muestra),
          h("dt", {}, "Lección para la asignatura"), h("dd", {}, c.leccion),
          h("dt", {}, "Cítalo con cautela"), h("dd", { class: "cautela" }, c.cautela)),
        h("div", { class: "reto-acciones" }, botonEst(c.est),
          c.refs.length ? h("details", {}, h("summary", {}, "Referencias"), h("ul", { class: "refs" }, c.refs.filter((k) => R[k]).map((k) => h("li", { html: refHTML(k) })))) : null)));
    });
  };
  sel.addEventListener("change", pinta);
  ficha.append(h("div", { class: "campo" }, h("label", { for: "c-filtro" }, "Filtrar por estación"), sel), cont);
  pinta();
  irArriba();
}

/* ---------- comparador de corrientes ---------- */
function vistaCorrientes() {
  const COLS = [["origen", "Origen de la subordinación"], ["conceptos", "Conceptos clave"], ["autoras", "Autoras y autores"], ["critica", "Críticas que recibe"], ["pag", "Páginas"]];
  let visibles = new Set(["origen", "conceptos", "critica"]), elegidas = new Set(CO.map((c) => c.id));
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Estudio"), h("h2", {}, "Comparador de corrientes"),
    h("p", { class: "sub" }, "Elige qué corrientes y qué dimensiones quieres comparar. Sirve para preparar el tema de desarrollo y para situar la filiación teórica de un texto en la PEC."));
  const fsC = h("fieldset", { class: "chips" }, h("legend", {}, "Corrientes"));
  CO.forEach((c) => { const id = `co-${c.id}`; const cb = h("input", { type: "checkbox", id, checked: true }); cb.addEventListener("change", () => { cb.checked ? elegidas.add(c.id) : elegidas.delete(c.id); pinta(); }); fsC.append(h("label", { for: id, class: "chip" }, cb, c.nombre)); });
  const fsD = h("fieldset", { class: "chips" }, h("legend", {}, "Dimensiones"));
  COLS.forEach(([k, n]) => { const id = `cd-${k}`; const cb = h("input", { type: "checkbox", id, checked: visibles.has(k) }); cb.addEventListener("change", () => { cb.checked ? visibles.add(k) : visibles.delete(k); pinta(); }); fsD.append(h("label", { for: id, class: "chip" }, cb, n)); });
  const cont = h("div", {});
  const pinta = () => {
    cont.innerHTML = "";
    const cols = COLS.filter(([k]) => visibles.has(k)), filas = CO.filter((c) => elegidas.has(c.id));
    if (!filas.length || !cols.length) { cont.append(h("p", { class: "nota-pie" }, "Marca al menos una corriente y una dimensión.")); return; }
    cont.append(tabla({ titulo: "Corrientes de la teoría y la antropología feministas según los manuales", cab: ["Corriente"].concat(cols.map(([, n]) => n)), filas: filas.map((c) => [c.nombre].concat(cols.map(([k]) => c[k]))) }));
    cont.append(h("p", { class: "nota-pie" }, "Las corrientes se solapan y cada autora puede situarse en más de una; la tabla resume la presentación de los manuales, no una clasificación cerrada. Ve a la estación: ", filas.map((c, i) => [i ? " · " : "", botonEst(c.est, `${c.nombre} (estación ${estPorId(c.est).num})`)])));
  };
  ficha.append(fsC, fsD, cont);
  pinta();
  irArriba();
}

/* ---------- red de conceptos ---------- */
function vistaConceptos() {
  const N = CN.nodos, A = CN.aristas;
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Estudio"), h("h2", {}, "Red de conceptos"),
    h("p", { class: "sub" }, `${N.length} conceptos ordenados por bloque y ${A.length} relaciones. Pulsa un concepto para ver su definición, contra qué se formuló y con qué conceptos se relaciona.`));
  const red = h("div", { class: "red-html" });
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg"); svg.setAttribute("class", "red-lineas"); svg.setAttribute("aria-hidden", "true");
  red.append(svg);
  const botones = {};
  [1, 2, 3, 4].forEach((b) => {
    const grupo = h("div", { class: "red-grupo" }, h("p", { class: "red-bloque" }, `Bloque ${b}`));
    const fila = h("div", { class: "red-fila" });
    N.filter((n) => n.b === b).forEach((n) => {
      const bt = h("button", { type: "button", class: "red-nodo", "aria-pressed": "false", onclick: () => elegir(n.id) }, n.t);
      botones[n.id] = bt; fila.append(bt);
    });
    grupo.append(fila); red.append(grupo);
  });
  const detalle = h("div", { class: "red-detalle", "aria-live": "polite" });
  let sel = null;
  function dibujar() {
    while (svg.firstChild) svg.firstChild.remove();
    const base = red.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${base.width} ${base.height}`); svg.setAttribute("width", base.width); svg.setAttribute("height", base.height);
    const c = (id) => { const r = botones[id].getBoundingClientRect(); return { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2 }; };
    A.forEach(([a, b]) => {
      if (!botones[a] || !botones[b]) return;
      const p = c(a), q = c(b), mx = (p.x + q.x) / 2 + (p.y === q.y ? 0 : 30), my = (p.y + q.y) / 2 - (p.y === q.y ? 26 : 0);
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", `M${p.x},${p.y} Q${mx},${my} ${q.x},${q.y}`);
      path.setAttribute("fill", "none");
      path.setAttribute("class", "red-arista" + (sel && (a === sel || b === sel) ? " activa" : ""));
      svg.append(path);
    });
  }
  function elegir(id) {
    sel = id; const n = N.find((x) => x.id === id);
    const rel = A.filter(([a, b]) => a === id || b === id);
    const vecinos = new Set(rel.map(([a, b]) => (a === id ? b : a)));
    Object.entries(botones).forEach(([k, bt]) => { bt.setAttribute("aria-pressed", k === id ? "true" : "false"); bt.classList.toggle("vecino", vecinos.has(k)); });
    dibujar();
    detalle.innerHTML = "";
    detalle.append(h("h3", {}, n.t), h("p", { class: "caso-meta mono" }, `${n.quien} · ${n.pag}`),
      h("dl", { class: "caso-dl" }, h("dt", {}, "Qué es"), h("dd", {}, n.d), h("dt", {}, "Contra qué se formuló"), h("dd", {}, n.contra)),
      rel.length ? h("div", {}, h("p", {}, h("strong", {}, "Relaciones")), h("ul", { class: "lista-plana" }, rel.map(([a, b, r]) => {
        const otro = N.find((x) => x.id === (a === id ? b : a));
        const bOtro = h("button", { type: "button", class: "enlace", onclick: () => { elegir(otro.id); botones[otro.id].focus(); } }, otro.t);
        return a === id ? h("li", {}, `${n.t} → `, bOtro, `: ${r}`) : h("li", {}, bOtro, ` → ${n.t}: ${r}`);
      }))) : null,
      h("div", { class: "reto-acciones" }, botonEst(n.est)));
  }
  const listaAcc = h("details", { class: "red-lista" }, h("summary", {}, "Ver todas las relaciones como lista"),
    h("ul", { class: "lista-plana" }, A.map(([a, b, r]) => { const na = N.find((x) => x.id === a), nb = N.find((x) => x.id === b); return h("li", {}, `${na.t} → ${nb.t}: ${r}`); })));
  ficha.append(red, detalle, listaAcc,
    h("p", { class: "nota-pie" }, "Las líneas resaltadas unen el concepto elegido con sus relacionados, que se marcan con borde. Es un mapa de estudio propuesto por el recurso a partir de los manuales: discútelo y complétalo con tus propias relaciones."));
  new ResizeObserver(() => { if (red.isConnected) dibujar(); }).observe(red);
  elegir(N[0].id);
  irArriba();
}

/* ---------- lectura crítica (PEC) ---------- */
function vistaLecturaCritica() {
  if (!LE) return vistaInicio();
  estado.lectura2 = estado.lectura2 || {};
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Estudio"), h("h2", {}, "Taller de lectura crítica"),
    h("p", { class: "sub" }, "Una pauta para analizar el texto de la PEC, o cualquier otro, con tus propias palabras y en relación con los manuales."),
    h("div", { class: "aviso" }, LE.aviso),
    h("div", { class: "aviso" }, "Este taller no redacta la PEC: te ayuda a organizar tu lectura. Escribe tú cada respuesta y, si la normativa de la asignatura lo pide, declara el uso de herramientas de inteligencia artificial."));
  const total = h("p", { class: "contador", "aria-live": "polite" });
  const areas = [];
  const recuento = () => { const w = areas.reduce((s, a) => s + contarPalabras(a.value), 0); total.textContent = `Total: ${w} palabras en tus notas. La guía no fija la extensión de la PEC: atiende a lo que indique el enunciado en el curso virtual.`; };
  LE.pasos.forEach((p, i) => {
    const id = `lc-${p.id}`;
    const ta = h("textarea", { id, rows: p.id === "ref" ? "2" : "4", class: "area", placeholder: p.ayuda });
    ta.value = estado.lectura2[p.id] || ""; areas.push(ta);
    ta.addEventListener("input", () => { estado.lectura2[p.id] = ta.value; recuento(); guardarPronto(); });
    ficha.append(h("div", { class: "campo" }, h("label", { for: id }, h("strong", {}, `${i + 1}. ${p.t}`), h("span", { class: "nota-pie" }, ` ${p.ayuda}`)), ta));
  });
  recuento();
  const salida = h("pre", { class: "salida", tabindex: "0", role: "region", "aria-label": "Lectura crítica reunida" });
  const aviso = h("span", { class: "nota-pie", role: "status" });
  const reunir = () => LE.pasos.map((p, i) => `${i + 1}. ${p.t.toUpperCase()}\n${estado.lectura2[p.id] || "(pendiente)"}`).join("\n\n");
  const bCopiar = h("button", { type: "button", class: "boton primario" }, "Reunir y copiar");
  bCopiar.addEventListener("click", () => { salida.textContent = reunir(); copiarTexto(salida.textContent, salida, aviso); });
  ficha.append(total, h("div", { class: "reto-acciones" }, bCopiar, aviso, h("button", { type: "button", class: "boton", onclick: () => navegar("corrientes") }, "Abrir el comparador de corrientes")), salida);
  ficha.append(h("details", { class: "guion" }, h("summary", {}, LE.ejemplo.titulo),
    h("p", { class: "nota-pie" }, "Modelo construido solo con lo que el manual de Méndez dice del artículo. Para la PEC, lee el texto completo: el manual es una lectura de segunda mano."),
    tabla({ titulo: "Pauta aplicada", cab: ["Paso", "Ejemplo"], filas: LE.ejemplo.filas })));
  irArriba();
}

/* ---------- navegación ---------- */
let escena = null;
function navegar(destino, desdeHash) {
  if (!desdeHash && location.hash.slice(1) !== destino) { location.hash = destino; return; }
  if (destino !== "simulador") clearInterval(relojSim);
  const i = E.findIndex((e) => e.id === destino);
  if (i >= 0) { vistaEstacion(i); pintarIndice(destino); escena && escena.irA(i); return; }
  pintarIndice(null);
  const vista = { estudio: vistaGuiaEstudio, tarjetas: vistaTarjetas, simulador: vistaSimulador, examen: vistaExamen, glosario: vistaGlosario, bibliografia: vistaBibliografia, guia: vistaGuia, casos: vistaCasos, corrientes: vistaCorrientes, conceptos: vistaConceptos, lectura: vistaLecturaCritica }[destino];
  if (vista) vista();
  else { vistaInicio(); if (escena) escena.vistaGeneral(); }
}
function ponerDocente(v) {
  docente = v; $("#pildora-docente").hidden = !v;
  try { sessionStorage.setItem("ent-docente", v ? "1" : "0"); } catch (e) { /* nada */ }
}
function leerHash() {
  let d = location.hash.slice(1);
  if (d === "docente") { ponerDocente(true); d = "guia"; }
  navegar(d || "inicio", true);
}
window.addEventListener("hashchange", leerHash);

/* ---------- barra ---------- */
$("#btn-inicio").addEventListener("click", () => navegar("inicio"));
$("#btn-guia").addEventListener("click", () => navegar("guia"));
$("#btn-simulador").addEventListener("click", () => navegar("simulador"));
$("#btn-examen").addEventListener("click", () => navegar("examen"));
$("#btn-glosario").addEventListener("click", () => navegar("glosario"));
$("#btn-estudio").addEventListener("click", () => navegar("estudio"));
$("#btn-tarjetas").addEventListener("click", () => navegar("tarjetas"));
$("#btn-bibliografia").addEventListener("click", () => navegar("bibliografia"));
$("#btn-casos").addEventListener("click", () => navegar("casos"));
$("#btn-corrientes").addEventListener("click", () => navegar("corrientes"));
$("#btn-conceptos").addEventListener("click", () => navegar("conceptos"));
$("#btn-lectura-critica").addEventListener("click", () => navegar("lectura"));
$("#btn-presentar").addEventListener("click", (ev) => {
  const on = document.body.classList.toggle("presentar");
  ev.currentTarget.setAttribute("aria-pressed", on ? "true" : "false");
});
/* modo lectura: oculta la escena y deja el ancho para la ficha (se recuerda en este navegador) */
function ponerLectura(on) {
  document.body.classList.toggle("lectura", on);
  const b = $("#btn-lectura"); b.setAttribute("aria-pressed", on ? "true" : "false");
  b.querySelector("span").textContent = on ? "Mostrar escena" : "Modo lectura";
  estado.lectura = on; guardar();
  if (escena) escena.setPausa(on || estado.pausaUsuario === true);
}
$("#btn-lectura").addEventListener("click", () => ponerLectura(!document.body.classList.contains("lectura")));
$("#btn-ocultar").addEventListener("click", () => { ponerLectura(true); $("#btn-lectura").focus(); });
/* la leyenda de la escena se retira tras la primera interacción o a los 12 s */
const retirarLeyenda = () => { const l = $("#leyenda"); if (l) l.classList.add("retirada"); };
$("#lienzo").addEventListener("pointerdown", retirarLeyenda, { once: true });
setTimeout(retirarLeyenda, 12000);
$("#btn-general").addEventListener("click", () => escena && escena.vistaGeneral());
$("#btn-movimiento").addEventListener("click", (ev) => {
  if (!escena) return;
  const p = !escena.getPausa(); escena.setPausa(p); estado.pausaUsuario = p; guardar();
  ev.currentTarget.setAttribute("aria-pressed", p ? "true" : "false");
  ev.currentTarget.textContent = p ? "Reanudar movimiento" : "Pausar movimiento";
});

/* ---------- arranque ---------- */
ponerDocente(docente);
if (estado.lectura) ponerLectura(true);
leerHash();

async function iniciarEscena() {
  const carga = $("#carga");
  try {
    await Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1500))]);
    const { crearEscena } = await import("./escena.js");
    const rot = $("#rotulo");
    escena = crearEscena($("#lienzo"), {
      estaciones: E, colores: HILOS,
      onSeleccion: (i) => navegar(E[i].id),
      onHover: (i, ev) => {
        if (i < 0 || !ev) { rot.hidden = true; return; }
        const r = $("#lienzo").getBoundingClientRect();
        rot.textContent = `${E[i].num}. ${E[i].titulo} (${E[i].manual}, cap. ${E[i].cap})`; rot.hidden = false;
        rot.style.left = `${ev.clientX - r.left}px`; rot.style.top = `${ev.clientY - r.top}px`;
      }
    });
    carga.remove();
    if (estado.lectura) escena.setPausa(true);
    if (escena.getPausa()) { const b = $("#btn-movimiento"); b.setAttribute("aria-pressed", "true"); b.textContent = "Reanudar movimiento"; }
    pintarIndice(location.hash.slice(1));
    const i = E.findIndex((e) => e.id === location.hash.slice(1)); if (i >= 0) escena.irA(i);
    const tema = () => escena.aplicarTema();
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", tema);
    new MutationObserver(tema).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  } catch (err) {
    console.warn("Escena 3D no disponible:", err);
    carga.textContent = "La escena 3D no está disponible en este navegador. Todo el contenido sigue accesible desde el índice y la ficha.";
  }
}
iniciarEscena();
