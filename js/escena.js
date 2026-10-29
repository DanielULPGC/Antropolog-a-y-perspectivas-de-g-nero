/*
 * Entramados · escena 3D (Three.js 0.160.0)
 * Taller circular: telar central cuyo tapiz recibe una franja de color por cada estación completada,
 * y diez pedestales con objetos simbólicos. Todo el modelado es procedimental.
 */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const RADIO = 12;
const VISTA = { pos: new THREE.Vector3(0, 24, 36), obj: new THREE.Vector3(0, 2, 0) };
const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || "#888";

export function crearEscena(contenedor, opciones) {
  const { estaciones, colores, onSeleccion, onHover } = opciones;
  const N = estaciones.length;
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let pausa = reducido;

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  contenedor.appendChild(renderer.domElement);
  try {
    const gl = renderer.getContext(), ext = gl.getExtension("WEBGL_debug_renderer_info");
    const nombre = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "";
    if (/swiftshader|llvmpipe|software/i.test(nombre)) { renderer.shadowMap.enabled = false; renderer.setPixelRatio(1); }
  } catch (e) { /* sin información */ }

  const escena = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera(42, 1, 0.1, 220);
  camara.position.copy(VISTA.pos);
  const controles = new OrbitControls(camara, renderer.domElement);
  controles.enableDamping = true; controles.dampingFactor = 0.08;
  controles.minDistance = 5; controles.maxDistance = 52;
  controles.maxPolarAngle = Math.PI * 0.47;
  controles.target.copy(VISTA.obj);

  /* ---------- luz ---------- */
  const hemi = new THREE.HemisphereLight(0xffffff, 0x554433, 1.1); escena.add(hemi);
  const relleno = new THREE.DirectionalLight(0xdde8ff, 0.6); relleno.position.set(-12, 9, -14); escena.add(relleno);
  const sol = new THREE.DirectionalLight(0xfff1dd, 1.6); sol.position.set(9, 20, 12); sol.castShadow = true;
  sol.shadow.mapSize.set(2048, 2048);
  Object.assign(sol.shadow.camera, { left: -19, right: 19, top: 19, bottom: -19, near: 1, far: 60 });
  sol.shadow.bias = -0.0005; escena.add(sol);

  /* ---------- materiales ---------- */
  const mat = {
    suelo: new THREE.MeshStandardMaterial({ roughness: 0.95 }),
    piedra: new THREE.MeshStandardMaterial({ roughness: 0.7 }),
    madera: new THREE.MeshStandardMaterial({ color: 0x7a5232, roughness: 0.8 }),
    laton: new THREE.MeshStandardMaterial({ metalness: 0.75, roughness: 0.32 }),
    tinta: new THREE.MeshStandardMaterial({ roughness: 0.6 }),
    papel: new THREE.MeshStandardMaterial({ color: 0xf4ecdc, roughness: 0.9 }),
    lienzo: new THREE.MeshStandardMaterial({ color: 0xd8c9a8, roughness: 0.95, side: THREE.DoubleSide }),
    vidrio: new THREE.MeshPhysicalMaterial({ roughness: 0.05, transmission: 0.7, transparent: true, opacity: 0.35, thickness: 0.3 }),
    llama: new THREE.MeshStandardMaterial({ color: 0xffb347, emissive: 0xff8a1f, emissiveIntensity: 1.2 })
  };
  const hilo = colores.map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 }));
  const malla = (geo, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); return o; };

  /* ---------- suelo: alfombra de urdimbre ---------- */
  function texturaSuelo() {
    const c = document.createElement("canvas"); c.width = c.height = 2048;
    const g = c.getContext("2d"), cx = 1024;
    g.fillStyle = css("--sc-suelo"); g.fillRect(0, 0, 2048, 2048);
    // trama radial fina
    g.strokeStyle = css("--sc-dial"); g.globalAlpha = 0.35; g.lineWidth = 2;
    for (let i = 0; i < 180; i++) { const a = (i / 180) * Math.PI * 2; g.beginPath(); g.moveTo(cx + Math.sin(a) * 260, cx - Math.cos(a) * 260); g.lineTo(cx + Math.sin(a) * 1000, cx - Math.cos(a) * 1000); g.stroke(); }
    g.globalAlpha = 1; g.lineWidth = 6;
    [1000, 960, 520, 260].forEach((r) => { g.beginPath(); g.arc(cx, cx, r, 0, Math.PI * 2); g.stroke(); });
    // anillo de colores de los diez hilos
    for (let i = 0; i < N; i++) {
      const a0 = (i / N) * Math.PI * 2 - Math.PI / 2 - Math.PI / N, a1 = a0 + (Math.PI * 2) / N;
      g.strokeStyle = colores[i]; g.lineWidth = 26; g.beginPath(); g.arc(cx, cx, 980, a0 + 0.02, a1 - 0.02); g.stroke();
    }
    // radios hacia los pedestales
    g.strokeStyle = css("--sc-laton"); g.lineWidth = 5; g.setLineDash([18, 22]);
    for (let i = 0; i < N; i++) { const a = (i / N) * Math.PI * 2; g.beginPath(); g.moveTo(cx + Math.sin(a) * 270, cx - Math.cos(a) * 270); g.lineTo(cx + Math.sin(a) * 600, cx - Math.cos(a) * 600); g.stroke(); }
    g.setLineDash([]);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
    return t;
  }
  const suelo = new THREE.Mesh(new THREE.CircleGeometry(20, 120), mat.suelo);
  suelo.rotation.x = -Math.PI / 2; suelo.receiveShadow = true; escena.add(suelo);

  /* ---------- telar central ---------- */
  const telar = new THREE.Group(); escena.add(telar);
  const ANCHO = 4.6, ALTO = 5.4, Y0 = 0.9; // tapiz entre Y0 y Y0+ALTO
  const tarima = malla(new THREE.CylinderGeometry(3.6, 3.9, 0.35, 64), mat.piedra, 0, 0.175, 0); tarima.receiveShadow = true; telar.add(tarima);
  [-1, 1].forEach((s) => {
    const poste = malla(new THREE.BoxGeometry(0.34, 7.4, 0.34), mat.madera, s * (ANCHO / 2 + 0.35), 0.35 + 3.7, 0); poste.castShadow = true; telar.add(poste);
    const pie = malla(new THREE.BoxGeometry(0.5, 0.25, 1.8), mat.madera, s * (ANCHO / 2 + 0.35), 0.48, 0); pie.castShadow = true; telar.add(pie);
  });
  const enjulio = (y) => { const b = malla(new THREE.CylinderGeometry(0.16, 0.16, ANCHO + 1.2, 20), mat.madera, 0, y, 0); b.rotation.z = Math.PI / 2; b.castShadow = true; telar.add(b); };
  enjulio(Y0 + ALTO + 0.25); enjulio(Y0 - 0.15); enjulio(7.6);
  // urdimbre
  const urd = new THREE.Group(); telar.add(urd);
  const matUrd = new THREE.MeshStandardMaterial({ color: 0xece2cc, roughness: 0.9 });
  for (let k = 0; k < 31; k++) { const x = -ANCHO / 2 + (k / 30) * ANCHO; urd.add(malla(new THREE.CylinderGeometry(0.012, 0.012, ALTO + 0.4, 4), matUrd, x, Y0 + ALTO / 2, 0)); }
  // lienzo de fondo (trama sin tejer, translúcido)
  const fondo = malla(new THREE.PlaneGeometry(ANCHO, ALTO), new THREE.MeshStandardMaterial({ color: 0xece2cc, roughness: 1, transparent: true, opacity: 0.18, side: THREE.DoubleSide }), 0, Y0 + ALTO / 2, -0.02);
  telar.add(fondo);
  // franjas: una por estación, de abajo arriba; se tejen al completarla
  const altoF = ALTO / N;
  const franjas = colores.map((c, i) => {
    const f = malla(new THREE.BoxGeometry(ANCHO - 0.04, altoF * 0.92, 0.08), hilo[i], 0, Y0 + altoF * (i + 0.5), 0);
    f.castShadow = true; f.scale.x = 0.001; f.visible = false; f.userData = { estacion: i, objetivo: 0, actual: 0 };
    telar.add(f); return f;
  });
  // lanzadera
  const lanzadera = new THREE.Group();
  const cuerpo = malla(new THREE.CapsuleGeometry(0.11, 0.7, 4, 12), mat.madera); cuerpo.rotation.z = Math.PI / 2; lanzadera.add(cuerpo);
  const canilla = malla(new THREE.CylinderGeometry(0.07, 0.07, 0.4, 12), hilo[0]); canilla.rotation.z = Math.PI / 2; lanzadera.add(canilla);
  lanzadera.position.set(0, Y0 + altoF * 0.5, 0.22); telar.add(lanzadera);
  // peine (batán)
  const batan = malla(new THREE.BoxGeometry(ANCHO + 0.5, 0.12, 0.18), mat.madera, 0, Y0 + 0.5, 0.35); batan.castShadow = true; telar.add(batan);

  /* ---------- rótulos ---------- */
  function rotulo(num, texto, color) {
    const c = document.createElement("canvas"); c.width = 720; c.height = 160;
    const g = c.getContext("2d");
    g.fillStyle = css("--surface"); g.strokeStyle = color; g.lineWidth = 8;
    g.beginPath(); g.roundRect(6, 6, 708, 148, 22); g.fill(); g.stroke();
    g.fillStyle = color; g.font = "700 74px Fraunces, Georgia, serif"; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText(String(num), 76, 84);
    g.fillStyle = css("--sc-tinta"); g.font = "700 44px 'Atkinson Hyperlegible', sans-serif"; g.textAlign = "left";
    let t = texto; while (g.measureText(t).width > 560 && t.length > 4) t = t.slice(0, -2);
    if (t !== texto) t = t.trim() + "…";
    g.fillText(t, 140, 84);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthWrite: false }));
    s.scale.set(4.6, 1.02, 1); return s;
  }

  /* ---------- objetos de los pedestales ---------- */
  const animadores = [];
  const C = {
    // 1 · balanza desequilibrada y vela
    balanza(g, m) {
      g.add(malla(new THREE.CylinderGeometry(0.35, 0.45, 0.15, 24), mat.laton, 0, 0.08, 0));
      g.add(malla(new THREE.CylinderGeometry(0.05, 0.05, 1.8, 12), mat.laton, 0, 1, 0));
      const brazo = new THREE.Group(); brazo.position.y = 1.9; g.add(brazo);
      brazo.add(malla(new THREE.BoxGeometry(2.2, 0.06, 0.06), mat.laton));
      [-1, 1].forEach((s) => {
        const p = new THREE.Group(); p.position.x = s * 1.05; brazo.add(p);
        p.add(malla(new THREE.CylinderGeometry(0.01, 0.01, 0.7, 4), mat.tinta, 0, -0.35, 0));
        p.add(malla(new THREE.CylinderGeometry(0.38, 0.3, 0.06, 24), s < 0 ? m : mat.laton, 0, -0.72, 0));
        p.userData.s = s;
      });
      brazo.rotation.z = -0.22; brazo.children.slice(1).forEach((p) => { p.rotation.z = 0.22; });
      g.add(malla(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16), mat.papel, 0.9, 0.25, 0.7));
      const ll = malla(new THREE.ConeGeometry(0.06, 0.18, 12), mat.llama, 0.9, 0.6, 0.7); g.add(ll);
      animadores.push((t) => { ll.scale.y = 1 + Math.sin(t * 9) * 0.15; brazo.rotation.z = -0.22 + Math.sin(t * 0.8) * 0.03; });
    },
    // 2 · libro abierto con pluma y torrecillas de la Ciudad
    libro(g, m) {
      const tapa = malla(new THREE.BoxGeometry(1.8, 0.08, 1.3), m, 0, 0.05, 0); g.add(tapa);
      [-1, 1].forEach((s) => { const h = malla(new THREE.BoxGeometry(0.85, 0.06, 1.2), mat.papel, s * 0.44, 0.13, 0); h.rotation.z = -s * 0.08; g.add(h); });
      const pluma = new THREE.Group(); pluma.position.set(0.5, 0.6, 0.1); pluma.rotation.z = -0.6; g.add(pluma);
      pluma.add(malla(new THREE.CylinderGeometry(0.015, 0.03, 1.1, 8), mat.tinta));
      const vex = malla(new THREE.SphereGeometry(0.16, 12, 8), mat.papel, 0, 0.3, 0); vex.scale.set(0.4, 1.8, 0.1); pluma.add(vex);
      [[-0.9, -0.9], [-0.4, -1.0], [0.1, -0.95]].forEach(([x, z], k) => {
        const h = 0.6 + k * 0.25;
        g.add(malla(new THREE.CylinderGeometry(0.16, 0.18, h, 12), mat.piedra, x, h / 2, z));
        g.add(malla(new THREE.ConeGeometry(0.22, 0.35, 12), m, x, h + 0.17, z));
      });
      animadores.push((t) => { pluma.rotation.z = -0.6 + Math.sin(t * 2) * 0.06; });
    },
    // 3 · urna con papeletas
    urna(g, m) {
      g.add(malla(new THREE.BoxGeometry(1.3, 1.1, 1.0), mat.vidrio, 0, 0.6, 0));
      g.add(malla(new THREE.BoxGeometry(1.36, 0.08, 1.06), m, 0, 1.18, 0));
      g.add(malla(new THREE.BoxGeometry(0.5, 0.1, 0.06), mat.tinta, 0, 1.23, 0));
      for (let k = 0; k < 7; k++) { const p = malla(new THREE.BoxGeometry(0.35, 0.01, 0.22), mat.papel, (Math.random() - 0.5) * 0.9, 0.1 + k * 0.035, (Math.random() - 0.5) * 0.6); p.rotation.y = Math.random() * 3; g.add(p); }
      const pap = malla(new THREE.BoxGeometry(0.4, 0.01, 0.26), mat.papel, 0, 1.5, 0); pap.rotation.x = Math.PI / 2; g.add(pap);
      animadores.push((t) => { const k = (t * 0.4) % 1; pap.position.y = 1.9 - k * 0.6; pap.visible = k < 0.9; });
    },
    // 4 · dos engranajes mal avenidos
    engranajes(g, m) {
      const rueda = (r, dientes, mt) => {
        const w = new THREE.Group();
        w.add(malla(new THREE.CylinderGeometry(r, r, 0.18, 32), mt));
        for (let k = 0; k < dientes; k++) { const a = (k / dientes) * Math.PI * 2; const d = malla(new THREE.BoxGeometry(0.16, 0.18, 0.22), mt, Math.cos(a) * (r + 0.08), 0, Math.sin(a) * (r + 0.08)); d.rotation.y = -a; w.add(d); }
        w.rotation.x = Math.PI / 2; return w;
      };
      const a = rueda(0.6, 12, m), b = rueda(0.42, 9, mat.laton);
      a.position.set(-0.4, 1.0, 0); b.position.set(0.62, 1.55, 0); g.add(a, b);
      g.add(malla(new THREE.BoxGeometry(0.1, 1.6, 0.1), mat.tinta, 0, 0.8, -0.2));
      animadores.push((t) => { a.rotation.y = t * 0.6; b.rotation.y = -t * 0.6 * (12 / 9) + Math.sin(t * 3) * 0.08; });
    },
    // 5 · lupa sobre libros
    lupa(g, m) {
      [[0, m], [0.22, mat.laton], [0.44, hilo[1]]].forEach(([y, mt], k) => { const l = malla(new THREE.BoxGeometry(1.4 - k * 0.1, 0.2, 1.0), mt, 0, 0.1 + y, 0); l.rotation.y = k * 0.2; g.add(l); });
      const lupa = new THREE.Group(); lupa.position.set(0, 1.4, 0); g.add(lupa);
      lupa.add(malla(new THREE.TorusGeometry(0.45, 0.05, 12, 40), mat.laton));
      lupa.add(malla(new THREE.CircleGeometry(0.43, 40), mat.vidrio));
      const mango = malla(new THREE.CylinderGeometry(0.06, 0.07, 0.7, 12), mat.madera, 0.55, -0.55, 0); mango.rotation.z = Math.PI / 4; lupa.add(mango);
      lupa.rotation.x = -0.9;
      animadores.push((t) => { lupa.position.x = Math.sin(t * 0.7) * 0.35; lupa.position.z = Math.cos(t * 0.5) * 0.2; });
    },
    // 6 · tienda de campaña y cuaderno
    tienda(g, m) {
      const t = malla(new THREE.ConeGeometry(0.95, 1.4, 4, 1, true), mat.lienzo, -0.3, 0.7, -0.2); t.rotation.y = Math.PI / 4; g.add(t);
      g.add(malla(new THREE.CylinderGeometry(0.025, 0.025, 1.7, 6), mat.madera, -0.3, 0.85, -0.2));
      const c = malla(new THREE.BoxGeometry(0.6, 0.06, 0.45), m, 0.75, 0.05, 0.6); c.rotation.y = -0.4; g.add(c);
      g.add(malla(new THREE.BoxGeometry(0.55, 0.01, 0.4), mat.papel, 0.75, 0.09, 0.6));
      const ban = malla(new THREE.PlaneGeometry(0.4, 0.25), m, -0.1, 1.55, -0.2); g.add(ban);
      animadores.push((tt) => { ban.rotation.y = Math.sin(tt * 2.2) * 0.4; });
    },
    // 7 · diagrama de parentesco: triángulos, círculos y líneas de alianza y filiación
    parentesco(g, m) {
      const tri = (x, y) => { const o = malla(new THREE.ConeGeometry(0.2, 0.32, 3), mat.tinta, x, y, 0); return o; };
      const cir = (x, y, mt) => malla(new THREE.SphereGeometry(0.17, 20, 12), mt, x, y, 0);
      const barra = (x1, y1, x2, y2) => { const l = Math.hypot(x2 - x1, y2 - y1); const b = malla(new THREE.BoxGeometry(l, 0.04, 0.04), mat.laton, (x1 + x2) / 2, (y1 + y2) / 2, 0); b.rotation.z = Math.atan2(y2 - y1, x2 - x1); return b; };
      const d = new THREE.Group(); d.position.y = 0.3; g.add(d);
      d.add(tri(-0.9, 1.6), cir(-0.3, 1.6, mat.tinta), tri(0.3, 1.6), cir(0.9, 1.6, mat.tinta));
      d.add(barra(-0.9, 1.45, -0.3, 1.45), barra(0.3, 1.45, 0.9, 1.45), barra(-0.6, 1.45, -0.6, 1.0), barra(0.6, 1.45, 0.6, 1.0));
      const muj = cir(-0.6, 0.8, m), hom = tri(0.6, 0.8); d.add(muj, hom, barra(-0.6, 0.62, 0.6, 0.62));
      d.add(malla(new THREE.BoxGeometry(0.06, 1.9, 0.06), mat.tinta, 0, 0.0, -0.15));
      animadores.push((t) => { muj.position.x = -0.6 + Math.sin(t * 0.9) * 0.05; d.rotation.y = Math.sin(t * 0.3) * 0.35; });
    },
    // 8 · dos orillas y un puente
    puente(g, m) {
      [-1, 1].forEach((s) => { const o = malla(new THREE.BoxGeometry(0.7, 0.5, 1.2), mat.piedra, s * 0.9, 0.25, 0); g.add(o); });
      g.add(malla(new THREE.BoxGeometry(1.1, 0.04, 1.1), mat.vidrio, 0, 0.12, 0));
      const arco = malla(new THREE.TorusGeometry(0.9, 0.08, 10, 40, Math.PI), m, 0, 0.5, 0); g.add(arco);
      g.add(malla(new THREE.BoxGeometry(2.3, 0.06, 0.4), mat.madera, 0, 1.0, 0));
      g.add(malla(new THREE.SphereGeometry(0.16, 16, 10), mat.tinta, -0.9, 0.66, 0), malla(new THREE.SphereGeometry(0.16, 16, 10), hilo[7], 0.9, 0.66, 0));
      const viajero = malla(new THREE.SphereGeometry(0.1, 12, 8), mat.laton, 0, 1.12, 0); g.add(viajero);
      animadores.push((t) => { viajero.position.x = Math.sin(t * 0.8) * 1.0; });
    },
    // 9 · casa (doméstico), templete (público) y árbol (naturaleza)
    casa(g, m) {
      g.add(malla(new THREE.BoxGeometry(0.7, 0.55, 0.6), mat.papel, -0.8, 0.28, 0.2));
      const tej = malla(new THREE.ConeGeometry(0.58, 0.4, 4), m, -0.8, 0.75, 0.2); tej.rotation.y = Math.PI / 4; g.add(tej);
      const tp = new THREE.Group(); tp.position.set(0.5, 0, -0.3); g.add(tp);
      tp.add(malla(new THREE.BoxGeometry(1.0, 0.1, 0.7), mat.piedra, 0, 0.05, 0));
      [-0.38, -0.13, 0.13, 0.38].forEach((x) => tp.add(malla(new THREE.CylinderGeometry(0.05, 0.05, 0.8, 10), mat.piedra, x, 0.5, 0.2)));
      const fr = malla(new THREE.ConeGeometry(0.62, 0.3, 3), mat.piedra, 0, 1.05, 0.2); fr.rotation.z = 0; fr.scale.z = 0.5; tp.add(fr);
      tp.add(malla(new THREE.BoxGeometry(1.0, 0.08, 0.7), mat.piedra, 0, 0.92, 0));
      g.add(malla(new THREE.CylinderGeometry(0.06, 0.09, 0.8, 8), mat.madera, 0.2, 0.4, 0.85));
      const copa = malla(new THREE.IcosahedronGeometry(0.38, 0), hilo[3], 0.2, 1.0, 0.85); g.add(copa);
      animadores.push((t) => { copa.rotation.y = t * 0.3; });
    },
    // 10 · prisma con haz de colores y espejo
    prisma(g, m) {
      const p = malla(new THREE.CylinderGeometry(0.45, 0.45, 0.9, 3), mat.vidrio, 0, 0.9, 0); g.add(p);
      const haz = malla(new THREE.CylinderGeometry(0.02, 0.02, 1.1, 6), mat.papel, -1.0, 0.9, 0); haz.rotation.z = Math.PI / 2 - 0.2; g.add(haz);
      const abanico = new THREE.Group(); abanico.position.set(0.35, 0.9, 0); g.add(abanico);
      colores.forEach((c, k) => { const r = malla(new THREE.BoxGeometry(1.1, 0.025, 0.025), hilo[k]); r.position.x = 0.55; const piv = new THREE.Group(); piv.rotation.z = -0.35 + (k / (N - 1)) * 0.5; piv.add(r); abanico.add(piv); });
      const esp = malla(new THREE.BoxGeometry(0.06, 1.1, 0.8), mat.laton, 1.45, 0.75, 0); g.add(esp);
      g.add(malla(new THREE.BoxGeometry(0.03, 1.0, 0.7), new THREE.MeshStandardMaterial({ color: 0xdfe6ee, metalness: 1, roughness: 0.05 }), 1.41, 0.75, 0));
      animadores.push((t) => { p.rotation.y = t * 0.25; abanico.rotation.x = Math.sin(t * 0.6) * 0.25; });
      void m;
    }
  };
  const orden = ["balanza", "libro", "urna", "engranajes", "lupa", "tienda", "parentesco", "puente", "casa", "prisma"];

  /* ---------- pedestales ---------- */
  const pedestales = [], objetivoSel = [];
  estaciones.forEach((e, i) => {
    const a = (i / N) * Math.PI * 2;
    const grupo = new THREE.Group();
    grupo.position.set(Math.sin(a) * RADIO, 0, -Math.cos(a) * RADIO);
    grupo.rotation.y = -a + Math.PI;
    const plinto = malla(new THREE.CylinderGeometry(1.75, 1.9, 0.6, 48), mat.piedra.clone(), 0, 0.3, 0);
    plinto.castShadow = plinto.receiveShadow = true; plinto.userData.estacion = i; grupo.add(plinto);
    const borde = malla(new THREE.TorusGeometry(1.77, 0.06, 8, 96), hilo[i], 0, 0.61, 0); borde.rotation.x = Math.PI / 2; grupo.add(borde);
    const obj = new THREE.Group(); obj.position.y = 0.6; grupo.add(obj);
    C[orden[i % orden.length]](obj, hilo[i]);
    obj.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.userData.estacion = i; objetivoSel.push(m); } });
    const r = rotulo(e.num, e.titulo, colores[i]); r.position.y = 4.3; grupo.add(r);
    escena.add(grupo);
    pedestales.push({ grupo, plinto, borde, rot: r, angulo: a });
    objetivoSel.push(plinto);
  });
  franjas.forEach((f) => objetivoSel.push(f));

  /* ---------- interacción ---------- */
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  let hoverIdx = -1, abajo = null;
  function estacionBajo(ev) {
    const r = renderer.domElement.getBoundingClientRect();
    ptr.x = ((ev.clientX - r.left) / r.width) * 2 - 1; ptr.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ptr, camara);
    const hit = ray.intersectObjects(objetivoSel.filter((o) => o.visible !== false), false)[0];
    return hit ? hit.object.userData.estacion : -1;
  }
  renderer.domElement.addEventListener("pointermove", (ev) => {
    const i = estacionBajo(ev);
    if (i !== hoverIdx) {
      if (hoverIdx >= 0) pedestales[hoverIdx].plinto.material.emissive.setHex(0x000000);
      hoverIdx = i;
      if (i >= 0) pedestales[i].plinto.material.emissive.set(colores[i]).multiplyScalar(0.18);
      renderer.domElement.style.cursor = i >= 0 ? "pointer" : "grab";
    }
    if (onHover) onHover(i, ev);
  });
  renderer.domElement.addEventListener("pointerleave", () => { if (onHover) onHover(-1); });
  renderer.domElement.addEventListener("pointerdown", (ev) => { abajo = { x: ev.clientX, y: ev.clientY }; });
  renderer.domElement.addEventListener("pointerup", (ev) => {
    if (!abajo) return;
    const mov = Math.hypot(ev.clientX - abajo.x, ev.clientY - abajo.y); abajo = null;
    if (mov > 6) return;
    const i = estacionBajo(ev);
    if (i >= 0 && onSeleccion) onSeleccion(i);
  });

  /* ---------- cámara ---------- */
  let vuelo = null;
  function volar(pos, objetivo, dur = 1.3) {
    if (reducido) { camara.position.copy(pos); controles.target.copy(objetivo); return; }
    vuelo = { p0: camara.position.clone(), t0: controles.target.clone(), p1: pos, t1: objetivo, ini: performance.now(), dur: dur * 1000 };
  }
  function irA(i) {
    const { angulo } = pedestales[i];
    pedestales.forEach((p, k) => { p.rot.visible = k !== i; });
    const dir = new THREE.Vector3(Math.sin(angulo), 0, -Math.cos(angulo));
    volar(dir.clone().multiplyScalar(RADIO + 8).add(new THREE.Vector3(0, 8.2, 0)), dir.clone().multiplyScalar(RADIO).add(new THREE.Vector3(0, 2.2, 0)));
  }
  function vistaGeneral() { pedestales.forEach((p) => { p.rot.visible = true; }); volar(VISTA.pos.clone(), VISTA.obj.clone()); }

  /* ---------- tema ---------- */
  function aplicarTema() {
    escena.background = new THREE.Color(css("--sc-fondo"));
    escena.fog = new THREE.Fog(new THREE.Color(css("--sc-fondo")), 40, 80);
    mat.piedra.color.set(css("--sc-piedra"));
    pedestales.forEach((p) => p.plinto.material.color.set(css("--sc-piedra")));
    mat.laton.color.set(css("--sc-laton"));
    mat.tinta.color.set(css("--sc-tinta"));
    if (mat.suelo.map) mat.suelo.map.dispose();
    mat.suelo.map = texturaSuelo(); mat.suelo.color.set(0xffffff); mat.suelo.needsUpdate = true;
    const de = document.documentElement.getAttribute("data-theme");
    const oscuro = de === "dark" || (de !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
    hemi.intensity = oscuro ? 0.75 : 1.1; sol.intensity = oscuro ? 1.2 : 1.6;
  }
  aplicarTema();

  /* ---------- bucle ---------- */
  const reloj = new THREE.Clock();
  let tAnim = 0;
  function tamano() {
    const w = contenedor.clientWidth || 1, hh = contenedor.clientHeight || 1;
    renderer.setSize(w, hh, false); camara.aspect = w / hh; camara.updateProjectionMatrix();
  }
  new ResizeObserver(tamano).observe(contenedor); tamano();
  function siguienteFranja() { const k = franjas.findIndex((f) => f.userData.objetivo === 0); return k < 0 ? -1 : k; }
  function bucle() {
    const dt = Math.min(reloj.getDelta(), 0.05);
    if (!pausa) tAnim += dt;
    animadores.forEach((f) => f(tAnim));
    // tejido progresivo de las franjas
    franjas.forEach((f) => {
      const u = f.userData;
      if (u.actual !== u.objetivo) {
        u.actual = reducido ? u.objetivo : THREE.MathUtils.clamp(u.actual + Math.sign(u.objetivo - u.actual) * dt * 0.9, 0, 1);
        f.scale.x = Math.max(0.001, u.actual); f.visible = u.actual > 0.002;
        f.position.x = -(ANCHO - 0.04) / 2 * (1 - u.actual);
      }
    });
    // lanzadera: recorre la próxima franja por tejer
    const k = siguienteFranja();
    lanzadera.visible = k >= 0;
    if (k >= 0) {
      lanzadera.position.y = Y0 + altoF * (k + 0.5);
      lanzadera.position.x = Math.sin(tAnim * 1.3) * (ANCHO / 2 + 0.2);
      canilla.material = hilo[k];
      batan.position.y = Y0 + altoF * (k + 0.5) - altoF * 0.5 + Math.abs(Math.sin(tAnim * 1.3)) * 0.05;
    }
    pedestales.forEach((p, i) => { p.borde.material.emissive.set(franjas[i].userData.objetivo ? colores[i] : "#000000"); p.borde.material.emissiveIntensity = 0.35 + (pausa ? 0 : Math.sin(tAnim * 2 + i) * 0.1); });
    if (vuelo) {
      let q = (performance.now() - vuelo.ini) / vuelo.dur; if (q >= 1) q = 1;
      const e = q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2;
      camara.position.lerpVectors(vuelo.p0, vuelo.p1, e); controles.target.lerpVectors(vuelo.t0, vuelo.t1, e);
      if (q === 1) vuelo = null;
    }
    controles.update();
    renderer.render(escena, camara);
    requestAnimationFrame(bucle);
  }
  bucle();

  return {
    irA, vistaGeneral,
    proyectar(i) {
      const v = pedestales[i].grupo.position.clone().add(new THREE.Vector3(0, 4.6, 0)).project(camara);
      const r = renderer.domElement.getBoundingClientRect();
      return { x: (v.x * 0.5 + 0.5) * r.width, y: (-v.y * 0.5 + 0.5) * r.height, visible: v.z < 1 };
    },
    marcarResueltas(lista) { lista.forEach((on, i) => { if (franjas[i]) franjas[i].userData.objetivo = on ? 1 : 0; }); },
    setPausa(v) { pausa = v; },
    getPausa() { return pausa; },
    aplicarTema
  };
}
