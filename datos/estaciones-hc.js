/*
 * Entramados · estaciones 1-5 (Hernández Corrochano, 2012, caps. 1-5)
 * Redacción propia a partir del manual. Las citas literales son breves y llevan página («HC, p.» = paginación impresa).
 *
 * Esquema de estación:
 *   id, num, bloque, manual, cap, paginas, titulo, sub, lema, idea, prediccion{q,o[]}, sintesis[], conceptos[{t,d}],
 *   cita{texto,fuente}, matices[{t,d}], examen[{q,claves[]}], conexiones[[id, motivo]], docente{duracion,dinamica,preguntas[]},
 *   refs[], retos[]
 * Tipos de reto: clasificar · ordenar · test (ver js/retos.js).
 */
window.ESTACIONES = [

/* ===================================================================== 1 */
{
  id: "e1", num: 1, bloque: 1, manual: "HC", cap: 1, paginas: "pp. 32-52",
  titulo: "La balanza de las Luces",
  sub: "HC, cap. 1 · La cruz de la Ilustración: mujeres y familia en el pensamiento patriarcal ilustrado",
  lema: "¿Cómo pudo una igualdad proclamada universal dejar fuera a la mitad del género humano?",
  idea: "La Ilustración misógina reconoce a las mujeres como mitad de la especie, pero no de la ciudadanía: convierte prejuicios en «naturaleza» y funda en ella la exclusión.",
  prediccion: {
    q: "Antes de leer: para los ilustrados que defendían la igualdad natural del género humano, ¿qué eran las mujeres?",
    o: ["Iguales a los hombres, solo faltas de educación", "La mitad de la especie, pero no la mitad de la ciudadanía", "Una especie distinta e inferior"]
  },
  sintesis: [
    "En los siglos XVII y XVIII el nuevo modelo social proclama la igualdad del género humano y rechaza la adscripción estamental por nacimiento, pero conserva la adscripción por sexo. Los mismos autores que exaltan la igualdad, la fraternidad y la libertad precisan que la pertenencia de las mujeres a la especie debe entenderse «en el sentido biológico y no en el sentido político»: la mujer es la mitad del género humano porque contribuye a la reproducción, «lo que no significa que sea la mitad de la ciudadanía» (HC, pp. 32-34).",
    "La relación de conocimiento es asimétrica: filósofos, médicos y eruditos, en su mayoría hombres, actúan como <strong>sujeto definidor</strong>, y las mujeres son el <strong>objeto definido</strong> (HC, p. 34). Para el médico Cabanis el útero no es solo el lugar de la diferencia, sino «la causa de la diferencia» (Fraisse, citada en HC, p. 35). Crampe-Casnabet identifica dos modalidades de discurso masculino, el <em>discurso de la inferioridad</em> y el <em>discurso de la excelencia</em>, que muestran las cualidades femeninas «según les conviene» y se complementan con el único fin de legitimar la desigualdad (HC, p. 36).",
    "La «naturaleza femenina» que describen estos análisis (pseudo)empíricos mezcla rasgos físicos y morales: belleza incompatible con la razón, servidumbre fisiológica de la menstruación, el embarazo, el parto y la lactancia, pasividad sexual y una mente detenida en la imaginación. La mujer es «un ser de pasión» frente al hombre, «ser de concepto»; carece de historia y su lugar natural es el espacio doméstico (HC, pp. 36-38). Rousseau fija sus deberes «en todo tiempo»: agradar a los hombres, serles útiles, hacerse amar y honrar por ellos, educarlos, cuidarlos y hacerles la vida agradable (HC, p. 39).",
    "La familia patriarcal reducida que describen Stone y Burguière sustituye al modelo comunitario, pero refuerza el poder del padre: el paterfamilias es al grupo familiar lo que el Rey o el Estado a la sociedad (HC, pp. 41-42). El matrimonio, entendido como contrato libre y voluntario, sella el consentimiento de la mujer a su subordinación (HC, p. 39); el amor romántico consolida la división liberal entre público y privado, y el hogar no crea derechos políticos, porque la ciudadanía se construye en el espacio público (HC, p. 44). Para Cabanis, salir del espacio doméstico equivale a «salir de su sexo» (HC, p. 45).",
    "En Rousseau el hombre puede «renaturalizarse» mediante un nuevo contrato social; la mujer, nunca. Se somete natural y voluntariamente mediante un <strong>contrato sexual</strong>, anterior al social, que intercambia subordinación por sustento y protección (hipótesis de Pateman, a través de Cobo; HC, pp. 48-49). <em>Emilio</em> dedica cuatro libros al futuro ciudadano y el quinto a Sofía, a quien solo se enseñan las cosas «que les conviene saber», porque «toda educación de las mujeres debe referirse a los hombres» (HC, pp. 50-51). El capítulo concluye que estos discursos aplican la <em>falacia de la naturaleza</em> y presentan prejuicios como hechos naturales; criticarlos es el primer paso del análisis (HC, p. 52)."
  ],
  conceptos: [
    { t: "Sujeto definidor / objeto definido", d: "Asimetría ilustrada por la que los varones toman la palabra en nombre de la especie y describen a las mujeres como objeto de su reflexión (HC, p. 34)." },
    { t: "Discurso de la inferioridad y de la excelencia", d: "Dos modalidades complementarias del discurso masculino sobre las mujeres: una las rebaja, la otra exalta sus «virtudes»; ambas legitiman la desigualdad (Crampe-Casnabet; HC, p. 36)." },
    { t: "Falacia de la naturaleza", d: "Operación por la que se presentan como hechos naturales lo que son prejuicios sociales, para fundar en ellos la desigualdad (HC, p. 52)." },
    { t: "Contrato sexual", d: "Pacto previo al contrato social por el que las mujeres quedan sujetas a los varones a cambio de sustento y protección; hipótesis de Pateman leída por Cobo en Rousseau (HC, p. 49)." },
    { t: "Familia patriarcal reducida", d: "Modelo familiar de la Europa moderna que debilita los lazos comunitarios y de linaje, pero refuerza el poder del padre sobre esposa e hijos (Stone; HC, pp. 41-42)." },
    { t: "Renaturalización", d: "En Rousseau, regeneración del hombre civilizado mediante la razón, la voluntad general y un nuevo contrato social; no alcanza a las mujeres (HC, pp. 47-49)." }
  ],
  cita: { texto: "La opinión es la tumba de la virtud entre los hombres; pero su trono entre las mujeres.", fuente: "Rousseau, Emilio, citado por Wollstonecraft (2005 [1792], p. 226); en HC, p. 51" },
  matices: [
    { t: "De quién es el «contrato sexual»", d: "La hipótesis es de Carole Pateman (The sexual contract, 1988); el manual la recoge a través de Rosa Cobo (1995). En un examen, atribúyela así y no como tesis de Rousseau." },
    { t: "¿Describían o prescribían?", d: "Historiadores como Burguière y Lebrun se preguntan si la imagen ilustrada de la mujer y la familia es la que observaban o la que pretendían que fuera (HC, p. 37, n. 6). Es una buena puerta de entrada a la crítica del empirismo." },
    { t: "Una Ilustración no monolítica", d: "No todos los ilustrados recurren al derecho natural: el enciclopedista Jaucourt sostiene que la subordinación de la mujer solo puede ser asunto del derecho positivo (HC, p. 41, n. 16). El capítulo 2 desarrolla la otra cara." },
    { t: "Voz de la autora", d: "Cuando el manual dice «desde mi perspectiva» (por ejemplo, el parecido entre los estados de Rousseau y la secuencia evolucionista, HC, p. 46, n. 35) expone una interpretación propia: cítala como tal." }
  ],
  examen: [
    { q: "Explique la distinción ilustrada entre la pertenencia de las mujeres a la especie y su exclusión de la ciudadanía.", claves: ["Plano biológico frente a plano político (HC, pp. 33-34).", "Sujeto definidor y objeto definido (HC, p. 34).", "La exclusión «dada como una consecuencia, nunca como un principio» (Fraisse; HC, p. 53, n. 49).", "Consecuencia: la universalidad se declara, pero se aplica solo a los varones."] },
    { q: "¿Qué es el contrato sexual y qué relación guarda con el contrato social en Rousseau?", claves: ["Contrato sexual anterior al social: subordinación a cambio de sustento y protección.", "Hipótesis de Pateman leída por Cobo (HC, p. 49).", "El hombre se renaturaliza; la mujer no.", "La familia patriarcal y el matrimonio escapan a la crítica rousseauniana de la civilización (HC, p. 49)."] },
    { q: "Defina y ejemplifique el discurso de la inferioridad y el discurso de la excelencia.", claves: ["Crampe-Casnabet (HC, p. 36).", "Ejemplos: la falta de fuerza se vuelve fortaleza para engendrar; la torpeza, intuición.", "Ambos discursos se complementan y legitiman la desigualdad.", "Conexión: Mill los desmonta en el s. XIX (HC, p. 82)."] },
    { q: "Compare la educación de Emilio y la de Sofía.", claves: ["Emilio: individualidad, razón abstracta, independencia de la opinión.", "Sofía: catecismo elemental, razón práctica, obediencia; «toda educación de las mujeres debe referirse a los hombres» (HC, pp. 50-51).", "La apariencia, vicio en él, virtud en ella.", "Respuesta de Wollstonecraft: Sofía es una quimera (HC, p. 66)."] }
  ],
  conexiones: [["e2", "La respuesta vindicativa: Poullain, Gouges, Condorcet y Wollstonecraft."], ["e7", "Beauvoir retoma la mujer como «Otro» definido por el hombre."], ["e9", "La dicotomía público/doméstico reaparece en Rosaldo (1974) y su autocrítica (1980)."]],
  docente: {
    duracion: "30-40 minutos",
    dinamica: "Leer en voz alta la lista de deberes de Rousseau (HC, p. 39) y pedir que se reformule en lenguaje de derechos: ¿qué derechos niega cada deber?",
    preguntas: ["¿Puede una igualdad ser universal si se define desde un solo sexo?", "¿Qué ganaba el orden burgués con la separación entre público y privado?"]
  },
  refs: ["hc2012", "rousseau1762", "fraisse1991", "crampe1994", "cobo1995", "pateman1988", "wollstonecraft1792"],
  retos: [
    {
      id: "e1-r1", tipo: "clasificar", titulo: "¿Quién lo sostuvo?",
      consigna: "Asigna cada afirmación a su autor, según la cita o el comentario del manual.",
      categorias: ["Rousseau", "Montesquieu", "Cabanis", "Kant", "Diderot"],
      items: [
        { t: "Las mujeres deben aprender desde temprano a sufrir incluso la injusticia sin quejarse.", c: 0, e: "Emilio, libro V; en HC, p. 51." },
        { t: "Las mujeres no han aspirado nunca a la igualdad, pues gozan ya de tantas otras ventajas naturales.", c: 1, e: "Citado por Crampe-Casnabet; en HC, p. 34." },
        { t: "El útero no es solo el lugar de la diferencia, sino su causa.", c: 2, e: "Cabanis, según Fraisse; en HC, p. 35." },
        { t: "El hombre es superior por la fuerza y el coraje; la mujer, por su facultad natural de someterse.", c: 3, e: "Kant, citado por Crampe-Casnabet; en HC, p. 39." },
        { t: "En la mujer predominan los sentidos, no el espíritu.", c: 4, e: "Diderot, citado por Crampe-Casnabet; en HC, p. 36." },
        { t: "Salir del espacio doméstico equivale a salir de su sexo.", c: 2, e: "Cabanis, según Fraisse (1998); en HC, p. 45." }
      ]
    },
    {
      id: "e1-r2", tipo: "ordenar", titulo: "Los estados de Rousseau",
      consigna: "Ordena el relato rousseauniano de la historia de la humanidad (HC, pp. 46-49).",
      items: [
        { t: "Estado de pura naturaleza: abundancia, piedad y amor de sí; la única desigualdad es la fuerza física.", e: "Las mujeres ya aparecen como «el otro» (HC, p. 47)." },
        { t: "Estado presocial: cooperación, perfectibilidad y familia patriarcal nuclear.", e: "Surgen la división sexual del trabajo y el amor conyugal (HC, p. 48)." },
        { t: "Estado civilizado: lujo, apariencia, opinión pública y desigualdad.", e: "Solo se libran de la crítica la familia patriarcal y el matrimonio (HC, p. 49)." },
        { t: "Nuevo contrato social y voluntad general: el hombre se renaturaliza.", e: "La mujer, sujeta por el contrato sexual, no se renaturaliza (HC, p. 49)." }
      ]
    },
    {
      id: "e1-r3", tipo: "test", titulo: "Comprobación",
      preguntas: [
        { q: "Según el capítulo, la ciudadanía ilustrada se construye en…", o: ["el espacio doméstico", "el espacio público", "la Iglesia"], c: 1, e: "El hogar no crea derechos políticos (HC, p. 44)." },
        { q: "La conclusión del capítulo es que los discursos ilustrados misóginos…", o: ["describían con precisión la naturaleza femenina", "aplicaban la falacia de la naturaleza", "eran ajenos al Derecho natural"], c: 1, e: "Presentan prejuicios como hechos naturales (HC, p. 52)." },
        { q: "El paterfamilias es al grupo familiar lo que…", o: ["el Rey o el Estado a la sociedad", "el clan al linaje", "la Iglesia al matrimonio"], c: 0, e: "Analogía del modelo ideológico ilustrado (HC, p. 42)." }
      ]
    }
  ]
},

/* ===================================================================== 2 */
{
  id: "e2", num: 2, bloque: 1, manual: "HC", cap: 2, paginas: "pp. 53-69",
  titulo: "La ciudad de las damas",
  sub: "HC, cap. 2 · La cara de la Ilustración: instrucción para las mujeres y los inicios de la vindicación",
  lema: "¿Qué hace falta para pasar de la queja a la vindicación?",
  idea: "Los ilustrados vindicativos vuelven la razón ilustrada contra sus propios prejuicios: si la desigualdad nace de la costumbre y de la educación, puede corregirse.",
  prediccion: {
    q: "¿Qué diferencia un memorial de agravios de una vindicación?",
    o: ["Ninguna: ambos defienden a las mujeres", "La vindicación cuestiona el poder establecido; el memorial pide mejor trato dentro de él", "El memorial es posterior y más radical"]
  },
  sintesis: [
    "Frente a quienes presentaban la exclusión de las mujeres como «consecuencia lógica» de su naturaleza, otros ilustrados entienden que la igualdad no admite exclusiones cuando su fundamento es el principio de universalidad. Abren así la <strong>vindicación</strong> feminista: cuestionar el poder establecido y buscar una plataforma cultural distinta de las abstracciones misóginas (HC, p. 53).",
    "El antecedente es Christine de Pizan (1363-c. 1430). <em>La ciudad de las damas</em> (1405) polemiza con el <em>Roman de la Rose</em> y construye una ciudad alegórica de mujeres virtuosas con la ayuda de la razón, la justicia y la rectitud. Es un memorial de agravios, no un texto vindicativo, porque no va contra el poder patriarcal —Dios reparte las tareas de cada sexo—; aun así, defiende la educación de las niñas, la imagen positiva del cuerpo femenino y la vida independiente (HC, pp. 54-55).",
    "Con <strong>Poullain de la Barre</strong> (1647-1725) la vindicación se hace método. <em>De la igualdad de los sexos</em> (1673), <em>La educación de las damas</em> (1674) y <em>La excelencia de los hombres</em> (1675) aplican la duda cartesiana: la sujeción de las mujeres es fruto de la costumbre y del prejuicio, «el intelecto no tiene sexo» (Cobo, en HC, p. 57) y los varones que hablan de las mujeres son juez y parte (HC, p. 58). Mary Astell propone colegios para mujeres y un matrimonio basado en la amistad; Gabrielle Suchon defiende el celibato como vía de libertad y apunta la independencia económica como requisito de ciudadanía (HC, pp. 58-59).",
    "En la Francia revolucionaria las mujeres se expresan en los <em>cuadernos de quejas</em> y en clubes políticos. Olympe de Gouges replica a la Declaración de 1789 con la <em>Declaración de los derechos de la mujer y la ciudadana</em> (1791) y muere en el cadalso (HC, p. 60). <strong>Condorcet</strong>, en <em>Sobre la admisión de las mujeres al derecho de ciudadanía</em> (1790), separa diferencia de desigualdad y defiende la coeducación, pero no toca la familia: las mujeres serían ciudadanas <em>de iure</em>, no <em>de facto</em> (HC, pp. 61-62).",
    "<strong>Mary Wollstonecraft</strong> (1759-1797), en la <em>Vindicación de los derechos de la mujer</em> (1792), articula educación y lucha contra el prejuicio. Sofía no representa a las mujeres: es una idea en la mente de Rousseau, y la belleza, la servidumbre al sexo o el limitado intelecto son <em>efecto</em>, no origen, de una educación discriminatoria (HC, pp. 64-67). Las relaciones entre los sexos se construyen sobre «falsas reciprocidades», y la democracia ilustrada es «exclusiva», no «excluyente», porque produce la exclusión sin enunciarla (Fraisse; HC, p. 67, n. 81). Para Varela, Wollstonecraft contiene el embrión de la idea de género y de la discriminación positiva (HC, p. 69)."
  ],
  conceptos: [
    { t: "Vindicación", d: "Discurso que cuestiona el poder establecido y reclama para las mujeres los principios universales proclamados por la Ilustración (HC, p. 53)." },
    { t: "Memorial de agravios", d: "Género de defensa de las mujeres que pide mejor trato sin impugnar el orden patriarcal; caso de La ciudad de las damas (HC, pp. 54-55)." },
    { t: "Prejuicio y costumbre", d: "Para Poullain y Wollstonecraft, causas de la desigualdad que la razón puede deshacer; desplazan la explicación de la naturaleza a la educación." },
    { t: "Democracia exclusiva", d: "Expresión de Fraisse: la democracia produce la exclusión de las mujeres mediante impedimentos reales o imaginarios sin enunciar reglas de exclusión (HC, p. 67, n. 81)." },
    { t: "Coeducación", d: "Propuesta de Condorcet de educar juntos a niñas y niños; no alcanzaba a la organización familiar (HC, p. 62)." },
    { t: "Perfectibilidad", d: "Capacidad humana de transformarse; Condorcet la afirma también de las mujeres, que por ello pueden desprenderse del prejuicio (HC, p. 62)." }
  ],
  cita: { texto: "Es tiempo de efectuar una revolución en el comportamiento de las mujeres, tiempo de restaurar la dignidad perdida […]. Es tiempo de separar la moral inmutable de los usos locales.", fuente: "Wollstonecraft (2005 [1792], p. 101); en HC, p. 64" },
  matices: [
    { t: "Grafías del manual", d: "El texto alterna «Poullain» y «Poulain», «Olimpia», «Olympe de Gouges» y «Glouges». Las formas habituales son François Poullain de la Barre y Olympe de Gouges." },
    { t: "Pizan, ¿feminista?", d: "Llamar feminista a Christine de Pizan es anacrónico en sentido estricto; el manual la presenta como antecedente que aún no es vindicativo (HC, p. 55). Esa precisión puntúa." },
    { t: "Condorcet, ambiguo", d: "Defiende la igualdad de derechos, pero acepta que las labores domésticas impiden ejercer plenamente la ciudadanía, lo que le obliga a «traicionar en alguna medida» su ideal (Jiménez; HC, p. 62)." }
  ],
  examen: [
    { q: "¿Por qué La ciudad de las damas no es todavía un texto vindicativo?", claves: ["Memorial de agravios (HC, p. 54).", "No cuestiona el poder patriarcal: Dios reparte las tareas.", "Aporta: educación de las niñas, cuerpo femenino, vida independiente (HC, p. 55).", "La vindicación llega en los ss. XVII-XVIII."] },
    { q: "Explique la aportación de Poullain de la Barre a la vindicación ilustrada.", claves: ["Método cartesiano contra el prejuicio.", "«El intelecto no tiene sexo» (Cobo; HC, p. 57).", "Juez y parte (HC, p. 58).", "Desigualdad con origen social: familia, guerra; único contractualista no patriarcal (HC, p. 58, n. 60)."] },
    { q: "Compare las posiciones de Condorcet y de Wollstonecraft.", claves: ["Condorcet: diferencia frente a desigualdad; coeducación; ciudadanas de iure.", "Wollstonecraft: los rasgos femeninos son efecto de la educación; crítica a Rousseau.", "Ambos: perfectibilidad y razón.", "Límite de Condorcet: la familia; Wollstonecraft cuestiona la separación público/privado (HC, p. 64)."] },
    { q: "¿Qué quiere decir que la democracia ilustrada es «exclusiva» y no «excluyente»?", claves: ["Fraisse (HC, p. 67, n. 81).", "No enuncia reglas de exclusión.", "Produce la exclusión por impedimentos jurídicos, médicos, literarios y filosóficos.", "No hay texto fundacional del contrato sexual."] }
  ],
  conexiones: [["e1", "Los discursos misóginos que estos autores impugnan."], ["e3", "El sufragismo hereda la vindicación ilustrada."], ["e5", "Varela ve en Wollstonecraft el embrión de la noción de género."]],
  docente: {
    duracion: "30 minutos",
    dinamica: "Poner en paralelo un artículo de la Declaración de 1789 y su réplica en la de Gouges (1791); preguntar qué cambia y qué se mantiene.",
    preguntas: ["¿Basta la educación para eliminar la desigualdad?", "¿Por qué Condorcet no llega a cuestionar la familia?"]
  },
  refs: ["hc2012", "pizan1405", "poullain1673", "condorcet1790", "gouges1791", "wollstonecraft1792", "fraisse1991", "varela2008", "cobo1995"],
  retos: [
    {
      id: "e2-r1", tipo: "ordenar", titulo: "Línea de la vindicación",
      consigna: "Ordena cronológicamente estas obras (HC, pp. 54-64).",
      items: [
        { t: "La ciudad de las damas (Christine de Pizan)", e: "1405." },
        { t: "De la igualdad de los sexos (Poullain de la Barre)", e: "1673." },
        { t: "Una propuesta seria para las damas (Mary Astell)", e: "1694." },
        { t: "Sobre la admisión de las mujeres al derecho de ciudadanía (Condorcet)", e: "1790." },
        { t: "Declaración de los derechos de la mujer y la ciudadana (Olympe de Gouges)", e: "1791." },
        { t: "Vindicación de los derechos de la mujer (Mary Wollstonecraft)", e: "1792." }
      ]
    },
    {
      id: "e2-r2", tipo: "clasificar", titulo: "Ideas y autorías",
      consigna: "¿A quién corresponde cada idea?",
      categorias: ["Pizan", "Poullain de la Barre", "Condorcet", "Wollstonecraft", "Suchon"],
      items: [
        { t: "El intelecto no tiene sexo; la desigualdad es obra de la costumbre.", c: 1, e: "Lectura cartesiana (Cobo; HC, p. 57)." },
        { t: "Las mujeres son ciudadanas de iure, aunque sus labores les impidan serlo de facto.", c: 2, e: "HC, p. 62." },
        { t: "Sofía es una quimera, una idea en la mente de su autor.", c: 3, e: "Crítica a Rousseau (HC, p. 66)." },
        { t: "Ciudad alegórica de mujeres virtuosas levantada con la razón, la justicia y la rectitud.", c: 0, e: "1405 (HC, pp. 54-55)." },
        { t: "La soltería como camino hacia una libertad que no quede en abstracción.", c: 4, e: "Auffret, en HC, p. 59." },
        { t: "Los varones que hablan de las mujeres son juez y parte.", c: 1, e: "La excelencia de los hombres (1675); HC, p. 58." }
      ]
    },
    {
      id: "e2-r3", tipo: "test", titulo: "Comprobación",
      preguntas: [
        { q: "Para Wollstonecraft, la belleza, el pensamiento sexuado o el limitado intelecto de las mujeres son…", o: ["su naturaleza", "efecto de una educación discriminatoria", "virtudes que deben preservarse"], c: 1, e: "Efectos, no origen (HC, p. 67)." },
        { q: "Condorcet distingue entre…", o: ["diferencia y desigualdad", "sexo y género", "producción y reproducción"], c: 0, e: "La discriminación es desigualdad, no diferencia (Jiménez; HC, p. 61)." },
        { q: "Las revolucionarias francesas se expresaron sobre todo mediante…", o: ["novelas y poemas", "cuadernos de quejas y clubes", "sindicatos"], c: 1, e: "HC, p. 60." }
      ]
    }
  ]
},

/* ===================================================================== 3 */
{
  id: "e3", num: 3, bloque: 2, manual: "HC", cap: 3, paginas: "pp. 70-88",
  titulo: "La urna y el instinto",
  sub: "HC, cap. 3 · Un siglo de movimientos sociales, nuevas teorías y viejos desencuentros",
  lema: "Mientras unas reclamaban el voto, la ciencia ponía nombre «natural» a su desigualdad.",
  idea: "El siglo XIX organiza a las mujeres como sujeto político y, a la vez, dota al determinismo biológico de lenguaje científico; Mill y Taylor Mill lo desmontan con argumentos.",
  prediccion: {
    q: "¿Cuál de estas reivindicaciones NO aprobó por unanimidad la convención de Seneca Falls (1848)?",
    o: ["El derecho a la educación", "El sufragio", "La reforma del derecho marital"]
  },
  sintesis: [
    "En el siglo XIX conviven el <strong>sufragismo</strong>, de vocación vindicativa ilustrada y opuesto a la misoginia romántica, y el socialismo y el anarquismo, más atentos a los derechos laborales (HC, pp. 70-71). Según Evans, el sufragismo inglés y estadounidense nace de la revolución industrial, la urbanización, la ideología liberal y el protestantismo; en EE. UU. añade el abolicionismo y el «segundo gran despertar», donde las mujeres aprenden a hablar en público y a organizarse (HC, p. 72). Sus demandas van más allá del voto: derechos en el matrimonio, madres solteras, prostitutas, educación, divorcio y control de los nacimientos (HC, pp. 72-73).",
    "El desencuentro con el socialismo cristaliza en la etiqueta de «feminismo burgués»: reclamar derechos civiles o políticos «distraería de la lucha de clases» (Fraisse; HC, p. 73). En Seneca Falls (19-20 de julio de 1848) se redacta, a imagen de la Declaración de Independencia, la carta fundacional del sufragismo; de sus doce resoluciones, la única no aprobada por unanimidad fue la del sufragio. Otra lección amarga: los abolicionistas abandonan la causa cuando los varones negros obtienen el voto (HC, p. 74).",
    "La ciencia del siglo deja de preguntarse por el «temperamento» de la mujer y se ocupa de la familia, la reproducción y el derecho (Fraisse; HC, p. 75). Comte asume la inmutabilidad de la naturaleza femenina; Durkheim, según Lehmann, marca con el sexo la frontera entre lo social y lo no social (HC, p. 76). El determinismo biológico alcanza su «paroxismo» al adoptar un lenguaje empírico y positivista; Mill lo resume: «hemos sustituido la apoteosis de la Razón por la del Instinto» (HC, p. 76). Darwin (1871) y el darwinismo social, con Morgan y Tylor, presentan la situación de las mujeres de su época como cúspide de la evolución (HC, p. 77).",
    "La antropología evolucionista imagina un <strong>matriarcado</strong> remoto como etapa precivilizada (Bachofen); solo Maine lo niega, y Héritier mostrará que no hay relación entre patriarcado y «descubrimiento» de la paternidad (HC, p. 78, nn. 105 y 107). Erminnie Platt Smith y Harriet Martineau cuestionan ya el androcentrismo evolucionista (HC, p. 78). Engels (1884) ve en la monogamia y la propiedad «la gran derrota histórica del sexo femenino», pero mantiene un discurso ambiguo y supone que transformar la economía basta para la igualdad (HC, pp. 79-80); Millares le reprocha no ver que la apropiación de las mujeres fue previa a la propiedad (HC, p. 81).",
    "<strong>John Stuart Mill y Harriet Taylor Mill</strong> defienden la individuación de las mujeres: «ya no quedan esclavos, sino amas de casa» (HC, p. 81). En <em>La sujeción de las mujeres</em> Mill usa tres argumentos: el <em>retórico</em> (nadie conoce la naturaleza de los sexos, porque solo se han visto en su relación actual), el <em>empírico</em> (mujeres que contradicen la feminidad normativa) y la <em>universalización</em> de la naturaleza humana (HC, pp. 82-83). La familia patriarcal es escuela de desigualdad; el divorcio, un derecho individual; y su «fusion of two» anticipa, según Nocera, la ruptura entre sexo y género (HC, pp. 81-87)."
  ],
  conceptos: [
    { t: "Sufragismo", d: "Movimiento por la participación política y el voto de las mujeres, heredero de la vindicación ilustrada, fuerte en Inglaterra y EE. UU. (HC, pp. 70-74)." },
    { t: "Feminismo burgués", d: "Etiqueta con la que parte de la izquierda descalificó las demandas civiles y políticas de las mujeres por desviar de la lucha de clases (Fraisse; HC, p. 73)." },
    { t: "Determinismo biológico", d: "Explicación de la posición social de las mujeres por su biología, en especial su capacidad reproductora y el «instinto maternal»; culmina en el s. XIX (HC, p. 76)." },
    { t: "Darwinismo social", d: "Aplicación de la teoría de la evolución a las sociedades humanas; justificó la desigualdad entre sexos, clases y «razas» (HC, p. 77)." },
    { t: "Matriarcado evolucionista", d: "Hipotética etapa remota de poder femenino, presentada por Bachofen como precivilizada y superada por el patriarcado (HC, p. 78)." },
    { t: "Individuación", d: "En Mill y Taylor Mill, derecho de cada sujeto a desarrollar su personalidad y a defender sus intereses sin dañar a otros (HC, p. 81)." }
  ],
  cita: { texto: "Niego que nadie conozca o pueda conocer la naturaleza de los dos sexos, puesto que solo se han visto en su relación mutua actual.", fuente: "Stuart Mill (2001 [1861], p. 171); en HC, p. 83" },
  matices: [
    { t: "Fechas de los Mill", d: "La sujeción de las mujeres se redactó en 1861 y se publicó en 1869; el manual usa ambas fechas. Harriet Taylor Mill vivió entre 1807 y 1858: la fecha de 1873 que aparece junto a su nombre (HC, p. 81) es la de la muerte de John Stuart Mill." },
    { t: "«Matriarcado» no es un hecho", d: "En el capítulo el matriarcado es una hipótesis evolucionista; el manual de Méndez (cap. 6) muestra cómo la antropología feminista lo reexamina como mito." },
    { t: "Abolicionismo y sufragismo", d: "El desencuentro con los abolicionistas (HC, p. 74) es un caso temprano de tensión entre ejes de desigualdad; conviene relacionarlo con la crítica de hooks (cap. 6-7 de Méndez)." }
  ],
  examen: [
    { q: "¿Qué factores explican el surgimiento del sufragismo y qué reivindicaba además del voto?", claves: ["Evans: revolución industrial, urbanización, liberalismo, protestantismo; en EE. UU., abolicionismo y segundo gran despertar (HC, p. 72).", "Derecho marital, madres solteras, prostitución, educación, divorcio, control de nacimientos (HC, pp. 72-73).", "Seneca Falls, 1848 (HC, p. 74).", "Mayor logro: la organización de las mujeres."] },
    { q: "Exponga los argumentos de John Stuart Mill contra el determinismo biológico.", claves: ["Retórico: solo conocemos a los sexos en su relación actual (HC, p. 83).", "Empírico: mujeres que contradicen la feminidad normativa.", "Universalización de la naturaleza humana.", "Conclusión: no hay naturaleza, todo es educación y cultura (HC, p. 83)."] },
    { q: "¿Qué papel atribuye el evolucionismo al matriarcado y qué objeción se le hace?", claves: ["Etapa remota y precivilizada (Bachofen; HC, p. 78).", "Si hay poder femenino, se sitúa en el «estado primitivo».", "Solo Maine niega el matriarcado.", "Héritier: el patriarcado no depende del descubrimiento de la paternidad (HC, p. 78, n. 107)."] },
    { q: "Valore la tesis de Engels sobre la «derrota histórica del sexo femenino».", claves: ["Monogamia, propiedad privada y herencia patrilineal (HC, p. 79).", "Sigue a Morgan y Bachofen.", "Supone que el cambio económico basta (HC, p. 80).", "Crítica de Millares: la apropiación de las mujeres fue previa a la propiedad (HC, p. 81)."] }
  ],
  conexiones: [["e2", "La vindicación ilustrada que hereda el sufragismo."], ["e4", "El conflicto entre feminismo y socialismo continúa con Tristán, Zetkin y Kollontái."], ["e9", "La antropología feminista de los setenta revisa el matriarcado y relee a Engels (Sacks)."]],
  docente: {
    duracion: "35 minutos",
    dinamica: "Dividir el grupo: una mitad defiende los argumentos del «instinto» decimonónico y la otra los refuta con los tres argumentos de Mill.",
    preguntas: ["¿Por qué el sufragio fue la resolución más discutida en Seneca Falls?", "¿Qué tiene en común el «instinto» del s. XIX con la «naturaleza» del s. XVIII?"]
  },
  refs: ["hc2012", "mill1869", "engels1884", "bachofen1861", "heritier1996", "fraisse1991", "valcarcel1997", "varela2008"],
  retos: [
    {
      id: "e3-r1", tipo: "clasificar", titulo: "Cuatro frentes del siglo XIX",
      consigna: "Clasifica cada elemento en el frente al que pertenece.",
      categorias: ["Sufragismo", "Ciencia decimonónica", "Mill y Taylor Mill", "Engels"],
      items: [
        { t: "Convención de Seneca Falls (1848).", c: 0, e: "Carta fundacional del sufragismo (HC, p. 74)." },
        { t: "El origen del hombre (1871) aplica la evolución a la desigualdad entre los sexos.", c: 1, e: "Darwin (HC, p. 77)." },
        { t: "«Ya no quedan esclavos, sino amas de casa».", c: 2, e: "HC, p. 81." },
        { t: "La monogamia estricta supuso la gran derrota histórica del sexo femenino.", c: 3, e: "HC, p. 79." },
        { t: "La diferencia entre lo social y lo no social la marca el sexo.", c: 1, e: "Durkheim, según Lehmann (HC, p. 76)." },
        { t: "El divorcio es un derecho individual, no causa de desorden social.", c: 2, e: "Primeros ensayos sobre matrimonio y divorcio (HC, p. 85)." },
        { t: "Demanda de control de los nacimientos y de leyes de divorcio.", c: 0, e: "Reivindicaciones más allá del voto (HC, p. 73)." }
      ]
    },
    {
      id: "e3-r2", tipo: "ordenar", titulo: "El argumento de Mill",
      consigna: "Ordena los pasos del argumento retórico de Mill sobre la «naturaleza» femenina (HC, pp. 82-83).",
      items: [
        { t: "Solo conocemos a hombres y mujeres como seres socializados, en su relación actual.", e: "Nadie conoce lo absoluto, solo los fenómenos." },
        { t: "Naturaleza es lo que se desarrolla espontáneamente.", e: "Primera pregunta filosófica." },
        { t: "Si fuera natural, ¿para qué educar y legislar para que las mujeres sean esposas y madres?", e: "La pregunta incómoda." },
        { t: "En este tema no hay naturaleza: todo es fruto de la educación y de la cultura.", e: "Conclusión (HC, p. 83)." }
      ]
    },
    {
      id: "e3-r3", tipo: "test", titulo: "Comprobación",
      preguntas: [
        { q: "La expresión «feminismo burgués» servía para…", o: ["elogiar la alianza con la clase media", "descalificar las demandas civiles y políticas de las mujeres", "nombrar al sufragismo radical inglés"], c: 1, e: "Fraisse (HC, p. 73)." },
        { q: "¿Qué antropólogo evolucionista negó la existencia del matriarcado?", o: ["Morgan", "Maine", "Bachofen"], c: 1, e: "HC, p. 78, n. 105." },
        { q: "Según Nocera, la «fusion of two» de los Mill anticipa…", o: ["la ruptura entre sexo y género", "el feminismo de la diferencia", "el darwinismo social"], c: 0, e: "HC, p. 81." }
      ]
    }
  ]
},

/* ===================================================================== 4 */
{
  id: "e4", num: 4, bloque: 2, manual: "HC", cap: 4, paginas: "pp. 88-106",
  titulo: "Engranajes mal avenidos",
  sub: "HC, cap. 4 · De la utopía socialista a la idea de la mujer nueva: construyendo la teoría crítica feminista",
  lema: "¿Basta con acabar con el capitalismo para acabar con el patriarcado?",
  idea: "El pensamiento socialista impulsa la emancipación, pero se revela insuficiente al ignorar el patriarcado; el feminismo actúa como «correctivo de género».",
  prediccion: {
    q: "¿Qué efecto tuvo el «salario familiar» sobre el trabajo de las mujeres?",
    o: ["Lo valorizó y visibilizó", "Lo desvalorizó e invisibilizó, dentro y fuera de casa", "No tuvo efectos de género"]
  },
  sintesis: [
    "Owen, Saint-Simon y Fourier critican el capitalismo emergente; Engels los llama «utópicos» (HC, p. 88). <strong>Flora Tristán</strong> (1803-1844) es el puente entre feminismo ilustrado y feminismo de clase: de <em>Peregrinaciones de una paria</em> (1838) y <em>Paseos en Londres</em> (1839) a <em>La unión obrera</em> (1843), donde presenta el analfabetismo y la explotación de las obreras como consecuencia de la desigualdad social (HC, pp. 89-91). Su método atiende a los hechos y a las pasiones (Urién); pero asume la <strong>heterodesignación</strong>: define a las mujeres en términos relacionales, como esposas y madres, «nada en sí mismas» (De Miguel y Romero; HC, p. 92).",
    "La revolución industrial trae profesionalización y proletarización. El <strong>salario familiar</strong> que aporta el paterfamilias consolida al varón proveedor e invisibiliza el trabajo de las mujeres (HC, p. 93). Hartmann lo interpreta como la solución al conflicto entre intereses patriarcales y capitalistas sobre la fuerza de trabajo femenina (HC, p. 94). Distinguir <em>trabajo</em> de <em>empleo</em> permite reconocer el trabajo doméstico y de cuidados como trabajo (HC, p. 94, n. 144). Zaretsky (1969) lo ve en la esfera privada y Dalla Costa (1973) propone el salario doméstico, pero ninguno cuestiona que sean las mujeres quienes lo hacen para los hombres (HC, pp. 95-96).",
    "Para Hartmann el patriarcado es «un conjunto de relaciones sociales entre los hombres que tienen una base material» y que, siendo jerárquicas, crean solidaridad entre ellos para dominar a las mujeres (Fontenla; HC, p. 96). Scott advierte que público y privado son también categorías etnolingüísticas con fuerte carga etnocéntrica, y Olivia Harris las ve como filtración ideológica del capitalismo; la reproducción adquiere una triple significación: de las condiciones de producción social, de la fuerza de trabajo y biológica (HC, pp. 96-97).",
    "A comienzos del siglo XX los Estados consolidan una «ideología de la domesticidad» que reglamenta el papel reproductor de las mujeres (Scott; HC, p. 98). <strong>Clara Zetkin</strong> (1857-1933), «más mujer de partido que feminista», parte de que «los intereses de las mujeres no son homogéneos» y analiza la familia por clases: la alta burguesía, la pequeña burguesía en descomposición y una familia proletaria destruida por el capital (HC, pp. 99-101).",
    "<strong>Alexandra Kollontái</strong> imagina la <em>mujer nueva</em>: emancipada económica y sexualmente, que no reivindica la propiedad de su amor y considera la maternidad una función social a cargo del Estado (HC, pp. 101-104). No cuestiona, sin embargo, que el cuidado recaiga en las mujeres. La teoría feminista posterior estudia el «poder del amor» (Jónasdóttir), la ética del cuidado (Gilligan) y la familia como «institución voraz» (Coser) (HC, pp. 105-106). Balance del capítulo: las tesis feministas actúan como un correctivo de género frente a ideologías emancipadoras que ignoran el patriarcado (HC, p. 106)."
  ],
  conceptos: [
    { t: "Heterodesignación", d: "Cuando otro —aquí la cultura patriarcal— señala o destina a alguien, las mujeres, para un fin determinado (HC, p. 92, n. 139)." },
    { t: "Salario familiar", d: "Salario suficiente para que el varón mantenga a su familia; refuerza su papel de proveedor y desvaloriza el trabajo femenino (HC, pp. 93-94)." },
    { t: "Trabajo / empleo", d: "Distinción que permite reconocer como trabajo, aunque no se remunere, el doméstico y de cuidados (HC, p. 94, n. 144)." },
    { t: "Patriarcado (Hartmann)", d: "Relaciones sociales entre los hombres, con base material, jerárquicas pero solidarias, que les permiten dominar a las mujeres (HC, p. 96)." },
    { t: "Doble militancia", d: "Pertenencia simultánea al movimiento feminista y a un partido u otro movimiento social, con sus tensiones de lealtad (HC, p. 99, n. 155; p. 108)." },
    { t: "Mujer nueva", d: "Ideal de Kollontái: mujer emancipada, autónoma económicamente y libre en sus afectos (HC, pp. 102-103)." },
    { t: "Institución voraz", d: "Concepto de Coser para organizaciones que exigen lealtad exclusiva y total; la familia lo es para el ama de casa (HC, p. 105)." }
  ],
  cita: { texto: "Una lucha dirigida solo contra las relaciones capitalistas de opresión estará condenada al fracaso, ya que se pasarán por alto las relaciones patriarcales de opresión que le sirven de base.", fuente: "Hartmann (1988 [1980], p. 27); en HC, p. 96" },
  matices: [
    { t: "El Día de la Mujer y la «fábrica Cotton»", d: "La nota del manual (HC, p. 99, n. 154) dice que Zetkin propuso en Copenhague (1910) «el uno de mayo» en memoria de 129 obreras muertas en una fábrica neoyorquina. Lo documentado es que la II Conferencia de Mujeres Socialistas aprobó en 1910 celebrar un Día de la Mujer sin fecha fija; la URSS adoptó el 8 de marzo en 1921 y la ONU lo celebró por primera vez en 1975. El relato de una marcha o un incendio fundacional en 1857 no tiene rastro documental (Kandel y Picq, 1982); el incendio de la Triangle Shirtwaist es de 1911 (146 víctimas). Verifica antes de usar el dato del manual." },
    { t: "Fechas de Kollontái", d: "Alexandra Kollontái nació en 1872, no en 1892 como indica el texto (HC, p. 101)." },
    { t: "Ediciones de Hartmann", d: "El manual fecha el artículo en 1980 y cita su traducción de 1988; el original apareció en Capital & Class en 1979." }
  ],
  examen: [
    { q: "¿Por qué se considera a Flora Tristán un puente entre el feminismo ilustrado y el de clase, y cuál es su límite?", claves: ["Obras: Peregrinaciones (1838), Paseos en Londres (1839), La unión obrera (1843).", "Explotación de las obreras como consecuencia de la desigualdad social (HC, p. 91).", "Educación e independencia económica.", "Límite: asume la heterodesignación (De Miguel y Romero; HC, p. 92)."] },
    { q: "Explique el salario familiar y la crítica de Hartmann al marxismo.", claves: ["Varón proveedor; invisibilización (HC, p. 93).", "Solución al conflicto entre patriarcado y capital (HC, p. 94).", "Zaretsky y Dalla Costa no cuestionan quién hace el trabajo doméstico.", "Definición de patriarcado como relaciones entre hombres con base material (HC, p. 96)."] },
    { q: "¿Qué quiere decir Zetkin cuando afirma que los intereses de las mujeres no son homogéneos?", claves: ["Fundamento en Engels y Bebel (HC, p. 99).", "Familia por clases (HC, pp. 100-101).", "En el proletariado no habría lucha de sexos (según Zetkin).", "Contraste con Tristán sobre la pareja obrera."] },
    { q: "Exponga la idea de «mujer nueva» de Kollontái y sus límites.", claves: ["Emancipación económica y sexual; amor no posesivo (HC, pp. 102-103).", "Maternidad como función social (HC, p. 104).", "No cuestiona que el cuidado sea femenino.", "Desarrollos: Jónasdóttir, Gilligan, Coser (HC, p. 105)."] }
  ],
  conexiones: [["e3", "Engels y el conflicto entre feminismo y socialismo."], ["e9", "Delphy (modo de producción doméstico) y Sacks (Engels revisitado) en la antropología de los setenta."], ["e8", "Rubin rechaza «modo de reproducción» y «patriarcado» en favor de «sistema sexo/género»."]],
  docente: {
    duracion: "35-40 minutos",
    dinamica: "Representar en la pizarra dos engranajes, capital y patriarcado, y pedir que cada grupo coloque en ellos ejemplos actuales de doble explotación.",
    preguntas: ["¿Es el trabajo doméstico «productivo»? ¿Para quién?", "¿Qué gana y qué pierde un movimiento con la doble militancia?"]
  },
  refs: ["hc2012", "tristan1843", "hartmann1980", "demiguel2005", "kollontai1977", "scott1997", "kandelpicq1982"],
  retos: [
    {
      id: "e4-r1", tipo: "clasificar", titulo: "Voces del socialismo y del feminismo",
      consigna: "Asigna cada tesis a su autora o autor.",
      categorias: ["Flora Tristán", "Hartmann", "Dalla Costa", "Zetkin", "Kollontái"],
      items: [
        { t: "La unión de todos los trabajadores, mujeres y hombres, contra la explotación.", c: 0, e: "La unión obrera, 1843 (HC, p. 91)." },
        { t: "El salario doméstico como respuesta a la explotación del ama de casa.", c: 2, e: "1973 (HC, p. 96)." },
        { t: "El patriarcado son relaciones entre hombres con base material que crean solidaridad entre ellos.", c: 1, e: "HC, p. 96." },
        { t: "Los intereses de las mujeres no son homogéneos.", c: 3, e: "HC, p. 99." },
        { t: "Las mujeres nuevas no reivindican la propiedad de su amor.", c: 4, e: "HC, p. 103." },
        { t: "El único socialismo útil para la mujer es el capaz de destruir el patriarcado.", c: 1, e: "HC, p. 96." }
      ]
    },
    {
      id: "e4-r2", tipo: "clasificar", titulo: "La triple reproducción",
      consigna: "Clasifica cada ejemplo según el sentido de «reproducción» que ilustra (HC, p. 97).",
      categorias: ["Condiciones de la producción social", "Fuerza de trabajo", "Biológica"],
      items: [
        { t: "Gestar y parir.", c: 2, e: "Reproducción biológica." },
        { t: "Alimentar y cuidar a quien trabaja para que vuelva al día siguiente.", c: 1, e: "Mantenimiento de la fuerza de trabajo." },
        { t: "Transmitir normas, propiedad y posiciones sociales a la siguiente generación.", c: 0, e: "Reproducción del conjunto de condiciones sociales." },
        { t: "Educar a los hijos para un oficio.", c: 1, e: "Formación de futura fuerza de trabajo." }
      ]
    },
    {
      id: "e4-r3", tipo: "test", titulo: "Comprobación",
      preguntas: [
        { q: "Según Scott, las categorías público/privado son también…", o: ["universales humanos", "categorías etnolingüísticas con carga etnocéntrica", "conceptos marxistas originales"], c: 1, e: "HC, pp. 96-97." },
        { q: "La conclusión del capítulo presenta las tesis feministas como…", o: ["un correctivo de género", "una rama del marxismo", "un rechazo de toda ideología emancipadora"], c: 0, e: "HC, p. 106." },
        { q: "La «ideología de la domesticidad» de comienzos del s. XX…", o: ["reglamentaba el papel reproductor de la mujer como obligación social", "promovía el trabajo asalariado femenino", "procedía del sufragismo"], c: 0, e: "Scott (HC, p. 98)." }
      ]
    }
  ]
},

/* ===================================================================== 5 */
{
  id: "e5", num: 5, bloque: 2, manual: "HC", cap: 5, paginas: "pp. 106-123",
  titulo: "La lente académica",
  sub: "HC, cap. 5 · El feminismo académico de mediados a finales del siglo XX: una perspectiva para ver el mundo, muchas tesis con qué analizarlo",
  lema: "Hablar de mujeres no es lo mismo que hablar de feminismo.",
  idea: "Desde los años sesenta la teoría feminista entra en la universidad, acuña categorías propias y las somete a revisión; Beauvoir, Badinter y Friedan marcan tendencias, y Harding pregunta por el método.",
  prediccion: {
    q: "¿Qué separa al feminismo de la igualdad del de la diferencia, según el capítulo?",
    o: ["Solo la estrategia política", "Su comprensión del género: construcción histórica que superar frente a diferencia sexual que afirmar", "Que uno es europeo y el otro estadounidense"]
  },
  sintesis: [
    "En los años sesenta las feministas de la Nueva Izquierda descubren que hacen dentro del movimiento el mismo trabajo que fuera: pasar a máquina los discursos de los varones, hacer café, «pero no política» (Varela; HC, pp. 107-108). Unas fundan el Movimiento de Liberación de las Mujeres; otras, las «políticas», permanecen en los partidos. Entre los logros: representatividad, maternidad sin peligro, anticoncepción, igualdad de oportunidades y crítica de políticas aparentemente igualitarias que encubren estrategias patriarcales (HC, p. 108).",
    "La teoría feminista entra en las universidades como «corriente de género» (HC, p. 109). Conviven el feminismo radical, el institucional y los de la igualdad y la diferencia; en el siglo XXI, el ciberfeminismo, el ecofeminismo y los feminismos multicultural y poscolonial. La autora advierte del riesgo de un esencialismo cultural; con Amorós, el multiculturalismo que concibe cada cultura como «bloque monolítico» no se sostiene empíricamente (HC, pp. 109-110). Entre las aportaciones, categorías como patriarcado, género, sistema sexo/género, empoderamiento o transversalidad, revisadas por las propias teóricas (HC, pp. 110-111).",
    "<strong>Simone de Beauvoir</strong> (<em>El segundo sexo</em>, 1949) sitúa la lucha de sexos antes que la de clases y responde al «usted piensa eso por ser mujer» con «yo pienso esto porque es verdad» (HC, pp. 112-113). Subjetividad y alteridad son claves: «no se nace mujer, se llega a serlo»; la mujer es construida como el otro y no existe naturaleza femenina (HC, pp. 113-114).",
    "<strong>Elisabeth Badinter</strong> muestra que el instinto maternal es aprendido e histórico y, en <em>XY</em>, describe un varón mutilado entre el «hombre duro» y el «hombre blando», frente al que propone el «hombre reconciliado»; su análisis, más psicológico que antropológico, ha sido criticado por esencialista (HC, pp. 114-116). <strong>Betty Friedan</strong> (<em>La mística de la feminidad</em>, 1963) nombra «el problema que no tiene nombre» a partir de testimonios de mujeres blancas, de clase media y con estudios; en <em>La segunda fase</em> analiza la doble jornada y la <em>superwoman</em> (HC, pp. 116-119).",
    "Igualdad y diferencia discrepan sobre el género: construcción histórica que superar frente a diferencia sexual que preservar (HC, pp. 119-120). Para Harding (1987) la investigación feminista empezó rescatando a mujeres ilustres, sus contribuciones públicas y su victimización, con desaciertos, y se define por tres rasgos: nuevos recursos empíricos y teóricos, nuevos propósitos y una investigadora situada en el mismo plano crítico que su objeto (HC, pp. 121-122). La autora añade la transversalidad del género como relación primaria de poder (Scott), el carácter integral del análisis y la agencia de las mujeres (HC, pp. 122-123)."
  ],
  conceptos: [
    { t: "Feminismo de la igualdad", d: "Heredero del discurso ilustrado: mismos derechos y obligaciones; el género es una construcción histórica que debe superarse (HC, pp. 119-120)." },
    { t: "Feminismo de la diferencia", d: "Afirma la diferencia sexual y una identidad femenina subyugada por la cultura del varón; temas: sexualidad, lenguaje, identidad (HC, pp. 119-120)." },
    { t: "Alteridad", d: "En Beauvoir, construcción de la mujer como «el otro» respecto del hombre, que se erige en sujeto (HC, pp. 113-114)." },
    { t: "Mística de la feminidad", d: "Modelo mítico que presenta la realización femenina en la domesticidad como inevitable y hace idénticas a todas las mujeres (Friedan; HC, pp. 117-118)." },
    { t: "Empoderamiento", d: "Toma de conciencia del poder de las mujeres en el plano individual y en el político (HC, p. 110, n. 186)." },
    { t: "Transversalidad", d: "Consideración sistemática de las condiciones y necesidades de mujeres y hombres en todas las fases de la acción pública (HC, p. 110, n. 186)." },
    { t: "Método feminista (Harding)", d: "Investigación que parte de la vida de las mujeres y sitúa a quien investiga en el mismo plano crítico que su objeto (HC, pp. 121-122)." }
  ],
  cita: { texto: "Hablar de mujeres no es lo mismo que hablar de feminismo.", fuente: "Valcárcel (1997, p. 89); en HC, p. 123" },
  matices: [
    { t: "Badinter, no «Bandinter»", d: "El manual escribe a menudo «Bandinter». XY se publicó en francés en 1992; la traducción española es de 1993. Las fechas que da el manual pueden corresponder a traducciones." },
    { t: "Multiculturalismo y multiculturalidad", d: "Amorós distingue el hecho de la coexistencia de culturas (multiculturalidad) de la tesis normativa sobre cómo deben coexistir (multiculturalismo) (HC, p. 110, n. 183)." },
    { t: "El género, revisado desde dentro", d: "La nota 185 (HC, p. 111) recoge las críticas de Thurén, Scott y Nicholson al concepto y la autocrítica de Ortner (2001): enlaza directamente con Méndez, caps. 5-7." }
  ],
  examen: [
    { q: "Exponga las principales tesis de Beauvoir en El segundo sexo según el manual.", claves: ["Lucha de sexos antes que de clases (HC, p. 112).", "«No se nace mujer, se llega a serlo» (HC, p. 113).", "Subjetividad, alteridad, ausencia de naturaleza femenina.", "Influencia mayor en el feminismo de la igualdad (HC, p. 112, n. 190)."] },
    { q: "¿Qué es «el problema que no tiene nombre»?", claves: ["Friedan, La mística de la feminidad (1963).", "Testimonios de mujeres blancas, de clase media y con estudios (HC, p. 116).", "Los síntomas son efecto, no causa, de la mística.", "La segunda fase: doble jornada y superwoman (HC, p. 118)."] },
    { q: "Compare el feminismo de la igualdad y el de la diferencia.", claves: ["Igualdad: herencia ilustrada; género como construcción que superar.", "Diferencia: diferencia sexual, identidad femenina, sexualidad y lenguaje.", "Objetivo común: transformar el orden patriarcal (HC, p. 120).", "Cita de Sendón de León: «unas eligieron lo urgente y otras lo importante»."] },
    { q: "Según Harding, ¿qué caracteriza la investigación feminista?", claves: ["Tres líneas iniciales y sus desaciertos (HC, p. 121).", "Tres rasgos: recursos, propósitos, investigadora en el mismo plano crítico (HC, p. 122).", "Partir de la vida de las mujeres.", "Añadidos de la autora: transversalidad, carácter integral, agencia."] }
  ],
  conexiones: [["e7", "Méndez examina las bases antropológicas de El segundo sexo."], ["e9", "Friedan critica a Mead, Freud y el funcionalismo (M, pp. 129-130)."], ["e10", "La definición de género y la reflexividad epistémica en la práctica etnográfica."]],
  docente: {
    duracion: "30 minutos",
    dinamica: "Lectura en parejas de la cita de Harding sobre «empezar por la vida de las mujeres» (HC, p. 122) y diseño rápido de una pregunta de investigación que la aplique.",
    preguntas: ["¿Un concepto académico puede perder su filo político al institucionalizarse?", "¿Qué significa que la investigadora esté en el mismo plano crítico que su objeto?"]
  },
  refs: ["hc2012", "beauvoir1949", "badinter1993", "friedan1963", "harding1987", "amoros2005", "valcarcel1997", "varela2008"],
  retos: [
    {
      id: "e5-r1", tipo: "clasificar", titulo: "Tres autoras y un método",
      consigna: "Asigna cada idea a su autora.",
      categorias: ["Beauvoir", "Badinter", "Friedan", "Harding"],
      items: [
        { t: "El instinto maternal es una construcción histórica, no una disposición innata.", c: 1, e: "HC, p. 114." },
        { t: "El problema que no tiene nombre.", c: 2, e: "HC, p. 117." },
        { t: "«Yo pienso esto porque es verdad».", c: 0, e: "Réplica a la descalificación del pensamiento de las mujeres (HC, p. 113)." },
        { t: "La investigadora se sitúa en el mismo plano crítico que su objeto de estudio.", c: 3, e: "HC, p. 122." },
        { t: "El hombre reconciliado acepta su «yo maternal».", c: 1, e: "XY (HC, p. 116)." },
        { t: "La doble jornada y la superwoman.", c: 2, e: "La segunda fase (HC, p. 118)." }
      ]
    },
    {
      id: "e5-r2", tipo: "ordenar", titulo: "Cuatro hitos",
      consigna: "Ordena cronológicamente (fechas de las ediciones originales).",
      items: [
        { t: "El segundo sexo (Beauvoir)", e: "1949." },
        { t: "La mística de la feminidad (Friedan)", e: "1963." },
        { t: "Política sexual (Millett) y La dialéctica del sexo (Firestone)", e: "1970 (HC, p. 110, n. 184)." },
        { t: "¿Existe un método feminista? (Harding)", e: "1987." }
      ]
    },
    {
      id: "e5-r3", tipo: "test", titulo: "Comprobación",
      preguntas: [
        { q: "Para Amorós, concebir cada cultura como un bloque monolítico, homogéneo y estático…", o: ["es la base del feminismo poscolonial", "no se sostiene desde el punto de vista empírico", "es propio del feminismo de la igualdad"], c: 1, e: "HC, p. 110." },
        { q: "La primera línea de investigación feminista, según Harding, consistió en…", o: ["rescatar a pensadoras e investigadoras olvidadas", "estudiar a los hombres", "medir la violencia de género"], c: 0, e: "HC, p. 121." },
        { q: "Las mujeres que estudió Friedan eran sobre todo…", o: ["obreras inmigrantes", "blancas, de clase media y con estudios", "campesinas europeas"], c: 1, e: "HC, p. 116." }
      ]
    }
  ]
}
];
