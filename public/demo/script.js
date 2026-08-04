/* ═══════════════════════════════════════════════════════════════════
   AutoSync — movimiento
   Sin librerías. Todo se escribe como variables CSS y el estilo decide
   qué hacer con ellas. Un solo rAF por elemento, eventos pasivos.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine   = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ── 1. Titular partido en caracteres ─────────────────────────
       Se hace antes de la entrada para que el observer ya vea los .char
       colocados. El texto legible se conserva en aria-label, y cada
       letra va oculta a los lectores de pantalla. */
    function splitTitles() {
        document.querySelectorAll('[data-split]').forEach(function (el) {
            if (el.dataset.splitDone) return;
            el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());

            var i = 0;
            (function walk(node) {
                Array.prototype.slice.call(node.childNodes).forEach(function (child) {
                    if (child.nodeType === 3) {
                        var frag = document.createDocumentFragment();
                        child.textContent.split('').forEach(function (ch) {
                            if (ch === ' ' || ch === '\n') {
                                frag.appendChild(document.createTextNode(' '));
                                return;
                            }
                            var s = document.createElement('span');
                            s.className = 'char';
                            s.setAttribute('aria-hidden', 'true');
                            s.style.setProperty('--cd', (i++ * 0.022).toFixed(3) + 's');
                            s.textContent = ch;
                            frag.appendChild(s);
                        });
                        node.replaceChild(frag, child);
                    } else if (child.nodeType === 1 && child.tagName !== 'BR') {
                        walk(child);
                    }
                });
            })(el);

            el.dataset.splitDone = '1';
        });
    }
    if (!reduce) splitTitles();

    /* ── 2. Entrada por scroll ────────────────────────────────────── */
    (function reveals() {
        var items = document.querySelectorAll('.reveal');
        if (!items.length) return;

        function showAll() {
            items.forEach(function (el) { el.classList.add('is-in', 'tilt-ready'); });
        }
        if (reduce || !('IntersectionObserver' in window)) { showAll(); return; }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                var el = e.target;
                el.classList.add('is-in');
                // El tilt entra después para no cortar la animación de entrada
                setTimeout(function () { el.classList.add('tilt-ready'); }, 1100);
                io.unobserve(el);
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

        items.forEach(function (el) { io.observe(el); });

        // Red de seguridad: si el observer no llega a dispararse (pestaña en
        // segundo plano al cargar), se muestra todo igualmente.
        setTimeout(showAll, 2500);
    })();

    if (reduce || !fine) return; // lo que sigue es solo para puntero fino

    /* ── 3. Escenario del hero ────────────────────────────────────
       El evento solo guarda la última posición; el pintado ocurre como
       mucho una vez por frame. */
    (function stageParallax() {
        var stage = document.querySelector('.stage');
        var hero  = document.querySelector('.hero');
        if (!stage || !hero) return;

        var layers = stage.querySelectorAll('[data-depth]');
        if (!layers.length) return;

        layers.forEach(function (l) {
            l.style.setProperty('--depth', l.dataset.depth || 20);
        });

        var pending = false, lastX = 0, lastY = 0;

        function paint() {
            pending = false;
            var r = hero.getBoundingClientRect();
            var px = (lastX - r.left) / r.width  - 0.5;
            var py = (lastY - r.top)  / r.height - 0.5;
            layers.forEach(function (l) {
                l.style.setProperty('--px', px.toFixed(3));
                l.style.setProperty('--py', py.toFixed(3));
            });
        }

        window.addEventListener('mousemove', function (e) {
            lastX = e.clientX; lastY = e.clientY;
            if (!pending) { pending = true; requestAnimationFrame(paint); }
        }, { passive: true });
    })();

    /* ── 4. Tilt pieza a pieza ────────────────────────────────────
       El giro se limita a pocos grados: más que eso deforma el texto y
       lo vuelve incómodo de leer. */
    (function tilt() {
        var MAX = 7; // grados

        document.querySelectorAll('.card, .plan, [data-tilt]').forEach(function (el) {
            var max = parseFloat(el.dataset.tilt) || MAX;
            var raf = false, mx = 0, my = 0;

            function paint() {
                raf = false;
                var r = el.getBoundingClientRect();
                if (!r.width || !r.height) return;
                var x = (mx - r.left) / r.width;
                var y = (my - r.top)  / r.height;
                el.style.setProperty('--ry', ((x - 0.5) *  max).toFixed(2) + 'deg');
                el.style.setProperty('--rx', ((y - 0.5) * -max).toFixed(2) + 'deg');
                el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
                el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
            }

            el.addEventListener('mouseenter', function () {
                el.classList.add('is-lift');
                el.style.willChange = 'transform';
            });
            el.addEventListener('mousemove', function (e) {
                mx = e.clientX; my = e.clientY;
                if (!raf) { raf = true; requestAnimationFrame(paint); }
            }, { passive: true });
            el.addEventListener('mouseleave', function () {
                el.classList.remove('is-lift');
                el.style.removeProperty('--rx');
                el.style.removeProperty('--ry');
                el.style.willChange = ''; // liberar GPU al salir
            });
        });
    })();
})();

/* ── FAQ: solo una abierta a la vez, para no dejar un muro de texto ── */
(function () {
    var all = document.querySelectorAll('.faq details');
    all.forEach(function (d) {
        d.addEventListener('toggle', function () {
            if (!d.open) return;
            all.forEach(function (o) { if (o !== d) o.open = false; });
        });
    });
})();
