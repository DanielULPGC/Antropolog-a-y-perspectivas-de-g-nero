/*
 * Cronos y Kairós · motor de retos
 * Tipos: clasificar (un desplegable por elemento), ordenar (subir/bajar), test, numerico.
 * Retos.render(reto, contenedor, { docente, resuelto, onResuelto })
 */
(function () {
  "use strict";

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    if (html != null) n.innerHTML = html;
    return n;
  }
  function barajar(a, semilla) {
    // barajado determinista por reto, para que la vista no cambie al redibujar
    var r = a.slice(), s = 0;
    for (var i = 0; i < semilla.length; i++) s = (s * 31 + semilla.charCodeAt(i)) >>> 0;
    function rnd() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
    for (var j = r.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)); var t = r[j]; r[j] = r[k]; r[k] = t; }
    // evita que el barajado deje el orden correcto
    var igual = r.every(function (x, i) { return x === a[i]; });
    if (igual && r.length > 1) { var t2 = r[0]; r[0] = r[1]; r[1] = t2; }
    return r;
  }
  function fb(ok, texto) { return '<div class="fb ' + (ok ? "bien" : "mal") + '">' + texto + "</div>"; }

  function cabecera(reto, cont, resuelto) {
    var cab = el("div", { class: "reto-cab" });
    cab.appendChild(el("h3", { text: reto.titulo }));
    var est = el("span", { class: "estado" + (resuelto ? " hecho" : ""), text: resuelto ? "Resuelto" : "Pendiente" });
    cab.appendChild(est);
    cont.appendChild(cab);
    return est;
  }
  function marcarResuelto(est, op) {
    est.textContent = "Resuelto"; est.classList.add("hecho");
    if (op.onResuelto) op.onResuelto();
  }

  /* ---------------- clasificar ---------------- */
  function clasificar(reto, cont, op) {
    var est = cabecera(reto, cont, op.resuelto);
    cont.appendChild(el("p", { class: "consigna", text: reto.consigna }));
    var orden = barajar(reto.items.map(function (_, i) { return i; }), reto.id);
    var filas = [];
    orden.forEach(function (idx, n) {
      var it = reto.items[idx];
      var fila = el("div", { class: "fila-clas" });
      var idSel = reto.id + "-s" + idx;
      fila.appendChild(el("label", { for: idSel, text: it.t }));
      var sel = el("select", { id: idSel });
      sel.appendChild(el("option", { value: "" , text: "Elige una categoría…" }));
      reto.categorias.forEach(function (c, ci) { sel.appendChild(el("option", { value: String(ci), text: c })); });
      fila.appendChild(sel);
      var salida = el("div", { class: "resultado-item" });
      fila.appendChild(salida);
      cont.appendChild(fila);
      filas.push({ it: it, sel: sel, salida: salida });
    });
    var acciones = el("div", { class: "reto-acciones" });
    var comprobar = el("button", { type: "button", class: "boton primario", text: "Comprobar" });
    acciones.appendChild(comprobar);
    if (op.docente) {
      var sol = el("button", { type: "button", class: "boton", text: "Mostrar solución" });
      sol.addEventListener("click", function () { filas.forEach(function (f) { f.sel.value = String(f.it.c); }); comprobar.click(); });
      acciones.appendChild(sol);
    }
    cont.appendChild(acciones);
    var res = el("div", { class: "resultado", role: "status" });
    cont.appendChild(res);
    comprobar.addEventListener("click", function () {
      var aciertos = 0, vacias = 0;
      filas.forEach(function (f) {
        if (f.sel.value === "") { vacias++; f.salida.innerHTML = ""; return; }
        var ok = Number(f.sel.value) === f.it.c;
        if (ok) aciertos++;
        f.salida.innerHTML = fb(ok, (ok ? "Correcto. " : "Revísalo. ") + (ok ? f.it.e : ""));
      });
      if (vacias) { res.innerHTML = fb(false, "Faltan " + vacias + " elementos por clasificar."); return; }
      var todo = aciertos === filas.length;
      res.innerHTML = fb(todo, todo ? "¡Todo en su sitio! Lee las explicaciones de cada elemento." : aciertos + " de " + filas.length + " correctos. Revisa los marcados y vuelve a comprobar.");
      if (todo) marcarResuelto(est, op);
    });
  }

  /* ---------------- ordenar ---------------- */
  function ordenar(reto, cont, op) {
    var est = cabecera(reto, cont, op.resuelto);
    cont.appendChild(el("p", { class: "consigna", text: reto.consigna }));
    var actual = barajar(reto.items.map(function (_, i) { return i; }), reto.id);
    var lista = el("ol", { class: "orden" });
    cont.appendChild(lista);
    function pintar(foco) {
      lista.innerHTML = "";
      actual.forEach(function (idx, pos) {
        var li = el("li");
        li.appendChild(el("span", { class: "pos", text: String(pos + 1) }));
        li.appendChild(el("span", { text: reto.items[idx].t }));
        var fl = el("span", { class: "flechas" });
        var sub = el("button", { type: "button", "aria-label": "Subir: " + reto.items[idx].t, text: "↑" });
        var baj = el("button", { type: "button", "aria-label": "Bajar: " + reto.items[idx].t, text: "↓" });
        sub.disabled = pos === 0; baj.disabled = pos === actual.length - 1;
        sub.addEventListener("click", function () { mover(pos, -1, "s"); });
        baj.addEventListener("click", function () { mover(pos, 1, "b"); });
        fl.appendChild(sub); fl.appendChild(baj); li.appendChild(fl);
        lista.appendChild(li);
        if (foco && foco.pos === pos) (foco.dir === "s" ? sub : baj).focus();
      });
    }
    function mover(pos, d, dir) {
      var n = pos + d; if (n < 0 || n >= actual.length) return;
      var t = actual[pos]; actual[pos] = actual[n]; actual[n] = t;
      res.innerHTML = "";
      pintar({ pos: n, dir: n === 0 ? "b" : (n === actual.length - 1 ? "s" : dir) });
    }
    var acciones = el("div", { class: "reto-acciones" });
    var comprobar = el("button", { type: "button", class: "boton primario", text: "Comprobar orden" });
    acciones.appendChild(comprobar);
    if (op.docente) {
      var sol = el("button", { type: "button", class: "boton", text: "Mostrar solución" });
      sol.addEventListener("click", function () { actual = reto.items.map(function (_, i) { return i; }); pintar(); comprobar.click(); });
      acciones.appendChild(sol);
    }
    cont.appendChild(acciones);
    var res = el("div", { class: "resultado", role: "status" });
    cont.appendChild(res);
    pintar();
    comprobar.addEventListener("click", function () {
      var lis = lista.querySelectorAll("li"), ok = 0;
      actual.forEach(function (idx, pos) {
        var bien = idx === pos; if (bien) ok++;
        lis[pos].classList.toggle("bien", bien); lis[pos].classList.toggle("mal", !bien);
      });
      var todo = ok === actual.length;
      var expl = todo ? "<ol>" + reto.items.map(function (i) { return "<li>" + i.t + " <em>" + i.e + "</em></li>"; }).join("") + "</ol>" + (reto.explicacion ? "<p>" + reto.explicacion + "</p>" : "") : "";
      res.innerHTML = fb(todo, todo ? "Orden correcto." : ok + " de " + actual.length + " en su posición. Prueba otra vez.") + expl;
      if (todo) marcarResuelto(est, op);
    });
  }

  /* ---------------- test ---------------- */
  function test(reto, cont, op) {
    var est = cabecera(reto, cont, op.resuelto);
    var grupos = [];
    reto.preguntas.forEach(function (p, qi) {
      var fs = el("fieldset", { class: "pregunta" });
      fs.appendChild(el("legend", { text: p.q }));
      var ops = el("div", { class: "opciones" });
      p.o.forEach(function (o, oi) {
        var id = reto.id + "-q" + qi + "-o" + oi;
        var lab = el("label", { for: id });
        var inp = el("input", { type: "radio", name: reto.id + "-q" + qi, id: id, value: String(oi) });
        lab.appendChild(inp); lab.appendChild(document.createTextNode(o));
        ops.appendChild(lab);
      });
      fs.appendChild(ops);
      var salida = el("div", { class: "resultado-item" });
      fs.appendChild(salida);
      cont.appendChild(fs);
      grupos.push({ p: p, fs: fs, salida: salida, name: reto.id + "-q" + qi });
    });
    var acciones = el("div", { class: "reto-acciones" });
    var comprobar = el("button", { type: "button", class: "boton primario", text: "Comprobar respuestas" });
    acciones.appendChild(comprobar);
    if (op.docente) {
      var sol = el("button", { type: "button", class: "boton", text: "Mostrar solución" });
      sol.addEventListener("click", function () {
        grupos.forEach(function (g) { var r = g.fs.querySelector('input[value="' + g.p.c + '"]'); if (r) r.checked = true; });
        comprobar.click();
      });
      acciones.appendChild(sol);
    }
    cont.appendChild(acciones);
    var res = el("div", { class: "resultado", role: "status" });
    cont.appendChild(res);
    comprobar.addEventListener("click", function () {
      var ok = 0, vacias = 0;
      grupos.forEach(function (g) {
        var m = g.fs.querySelector('input[name="' + g.name + '"]:checked');
        if (!m) { vacias++; g.salida.innerHTML = ""; return; }
        var bien = Number(m.value) === g.p.c; if (bien) ok++;
        g.salida.innerHTML = fb(bien, (bien ? "Correcto. " : "No es esa. ") + (bien ? g.p.e : "Vuelve a la ficha y prueba otra opción."));
      });
      if (vacias) { res.innerHTML = fb(false, "Faltan " + vacias + " preguntas por responder."); return; }
      var todo = ok === grupos.length;
      res.innerHTML = fb(todo, todo ? "Todas correctas." : ok + " de " + grupos.length + " correctas.");
      if (todo) marcarResuelto(est, op);
    });
  }

  /* ---------------- numerico ---------------- */
  function numerico(reto, cont, op) {
    var est = cabecera(reto, cont, op.resuelto);
    cont.appendChild(el("p", { class: "consigna", text: reto.consigna }));
    var fila = el("div", { class: "numerico" });
    var id = reto.id + "-n";
    fila.appendChild(el("label", { for: id, class: "sr", text: "Respuesta" }));
    var inp = el("input", { type: "number", id: id, inputmode: "numeric", step: "any" });
    fila.appendChild(inp);
    fila.appendChild(el("span", { class: "mono", text: reto.unidad || "" }));
    cont.appendChild(fila);
    var acciones = el("div", { class: "reto-acciones" });
    var comprobar = el("button", { type: "button", class: "boton primario", text: "Comprobar" });
    acciones.appendChild(comprobar);
    if (op.docente) {
      var sol = el("button", { type: "button", class: "boton", text: "Mostrar solución" });
      sol.addEventListener("click", function () { inp.value = String(reto.respuesta); comprobar.click(); });
      acciones.appendChild(sol);
    }
    cont.appendChild(acciones);
    var res = el("div", { class: "resultado", role: "status" });
    cont.appendChild(res);
    function check() {
      var v = Number(String(inp.value).replace(",", "."));
      if (inp.value === "" || isNaN(v)) { res.innerHTML = fb(false, "Escribe un número."); return; }
      var bien = Math.abs(v - reto.respuesta) <= (reto.tolerancia || 0);
      res.innerHTML = fb(bien, bien ? "Correcto. " + reto.explicacion : "Todavía no. Pista: " + reto.pista);
      if (bien) marcarResuelto(est, op);
    }
    comprobar.addEventListener("click", check);
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") check(); });
  }

  window.Retos = {
    render: function (reto, cont, op) {
      op = op || {};
      var caja = el("section", { class: "reto", "aria-label": "Reto: " + reto.titulo });
      cont.appendChild(caja);
      ({ clasificar: clasificar, ordenar: ordenar, test: test, numerico: numerico })[reto.tipo](reto, caja, op);
      return caja;
    }
  };
})();
