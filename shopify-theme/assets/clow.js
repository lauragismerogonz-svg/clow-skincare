/* ============================================================
   CLOW SKINCARE — Theme JavaScript (vanilla)
   Cart drawer + AJAX cart, mobile nav, quiz, filters, PDP,
   variant selector, toast, quantity steppers.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Settings injected from Liquid ---------- */
  var SETTINGS = window.ClowSettings || {};
  var MONEY_FORMAT = SETTINGS.moneyFormat || '€{{amount}}';
  var SAMPLES_THRESHOLD = (SETTINGS.samplesThreshold || 39) * 100; // cents
  var FREE_SHIP_THRESHOLD = (SETTINGS.freeShipThreshold || 39) * 100;
  var STR = window.ClowStrings || {};

  var qs = function (s, r) { return (r || document).querySelector(s); };
  var qsa = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function formatMoney(cents) {
    var amount = (cents / 100).toFixed(2).replace('.', ',');
    return MONEY_FORMAT.replace(/\{\{\s*amount\s*\}\}/, amount);
  }

  /* ============================================================
     TOAST
     ============================================================ */
  var toastEl;
  function showToast(msg) {
    toastEl = toastEl || qs('#clow-toast');
    if (!toastEl) return;
    qs('.toast__name', toastEl).textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2400);
  }

  /* ============================================================
     STICKY HEADER scroll behavior
     ============================================================ */
  function initStickyHeader() {
    var header = qs('.site-header');
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     MOBILE NAV DRAWER
     ============================================================ */
  function initMobileNav() {
    var burger = qs('[data-mobile-nav-open]');
    var drawer = qs('#clow-mobile-nav');
    var overlay = qs('#clow-mobile-nav-overlay');
    var closeBtn = qs('[data-mobile-nav-close]');
    if (!burger || !drawer) return;

    function open() {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    burger.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);
    qsa('a, button', drawer).forEach(function (el) {
      if (el.hasAttribute('data-mobile-nav-close')) return;
      el.addEventListener('click', function () { setTimeout(close, 60); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ============================================================
     CART DRAWER + AJAX CART
     ============================================================ */
  var CartUI = {
    open: function () {
      var d = qs('#clow-cart-drawer'), o = qs('#clow-cart-overlay');
      if (d) { d.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
      if (o) o.classList.add('is-open');
    },
    close: function () {
      var d = qs('#clow-cart-drawer'), o = qs('#clow-cart-overlay');
      if (d) d.classList.remove('is-open');
      if (o) o.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  function getCart() {
    return fetch('/cart.js', { headers: { 'Accept': 'application/json' } }).then(function (r) { return r.json(); });
  }

  function updateCartCount(count) {
    qsa('[data-cart-count]').forEach(function (el) {
      el.textContent = count;
      if (count > 0) el.removeAttribute('hidden');
      else el.setAttribute('hidden', '');
    });
  }

  function renderSamplesBar(scope, subtotal) {
    qsa('[data-samples-bar]', scope || document).forEach(function (bar) {
      var fill = qs('[data-samples-fill]', bar);
      var label = qs('[data-samples-label]', bar);
      var pct = Math.min(100, (subtotal / SAMPLES_THRESHOLD) * 100);
      if (fill) fill.style.width = pct + '%';
      if (label) {
        if (subtotal >= SAMPLES_THRESHOLD) {
          label.innerHTML = '<span class="unlocked">' + (STR.samplesUnlocked || 'Free samples unlocked') + '</span>';
        } else {
          var remain = SAMPLES_THRESHOLD - subtotal;
          label.innerHTML = (STR.samplesRemainA || '') + '<b>' + formatMoney(remain) + '</b>' + (STR.samplesRemainB || '');
        }
      }
    });
  }

  function renderDrawer(cart) {
    var body = qs('#clow-cart-drawer-body');
    var foot = qs('#clow-cart-drawer-foot');
    if (!body) return;

    if (!cart.items.length) {
      body.innerHTML = '<div class="cart-drawer__empty">' + (STR.cartEmpty || 'Your bag is empty.') + '</div>';
      if (foot) foot.hidden = true;
      return;
    }
    if (foot) foot.hidden = false;

    body.innerHTML = cart.items.map(function (item) {
      var img = item.image ? item.image.replace(/(\.[^.]*)$/, '_120x$1') : '';
      var variantLabel = (item.variant_title && item.variant_title !== 'Default Title') ? item.variant_title : '';
      return '' +
        '<div class="cart-drawer__line" data-line-key="' + item.key + '">' +
          '<a class="cart-drawer__media" href="' + item.url + '">' + (img ? '<img src="' + img + '" alt="" loading="lazy">' : '') + '</a>' +
          '<div class="cart-drawer__info">' +
            (item.vendor ? '<div class="cart-drawer__brand">' + item.vendor + '</div>' : '') +
            '<a class="cart-drawer__name" href="' + item.url + '">' + item.product_title + '</a>' +
            (variantLabel ? '<div class="cart-line__variant">' + variantLabel + '</div>' : '') +
            '<div class="cart-drawer__line-foot">' +
              '<div class="qty-stepper">' +
                '<button data-qty-change="' + item.key + '" data-delta="-1" aria-label="minus">' + icon('minus') + '</button>' +
                '<span class="qty-stepper__val">' + item.quantity + '</span>' +
                '<button data-qty-change="' + item.key + '" data-delta="1" aria-label="plus">' + icon('plus') + '</button>' +
              '</div>' +
              '<span class="price"><span class="price__now">' + formatMoney(item.final_line_price) + '</span></span>' +
            '</div>' +
          '</div>' +
        '</div>';
    }).join('');

    var subEl = qs('[data-drawer-subtotal]');
    if (subEl) subEl.textContent = formatMoney(cart.total_price);
    var ptsEl = qs('[data-drawer-points]');
    if (ptsEl) ptsEl.textContent = Math.round(cart.total_price / 100);

    renderSamplesBar(qs('#clow-cart-drawer'), cart.total_price);
  }

  function refreshCart(openDrawer) {
    return getCart().then(function (cart) {
      updateCartCount(cart.item_count);
      renderDrawer(cart);
      renderSamplesBar(document, cart.total_price);
      if (openDrawer) CartUI.open();
      return cart;
    });
  }

  function addToCart(id, quantity, properties) {
    var bodyData = { id: id, quantity: quantity || 1 };
    if (properties) bodyData.properties = properties;
    return fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(bodyData)
    }).then(function (r) {
      if (!r.ok) return r.json().then(function (e) { throw e; });
      return r.json();
    });
  }

  function changeLine(key, quantity) {
    return fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ id: key, quantity: quantity })
    }).then(function (r) { return r.json(); });
  }

  function initCart() {
    /* open / close drawer */
    qsa('[data-cart-open]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); refreshCart(true); });
    });
    var closeBtn = qs('[data-cart-close]');
    if (closeBtn) closeBtn.addEventListener('click', CartUI.close);
    var overlay = qs('#clow-cart-overlay');
    if (overlay) overlay.addEventListener('click', CartUI.close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') CartUI.close(); });

    /* Add-to-cart forms (product card + PDP) */
    document.addEventListener('submit', function (e) {
      var form = e.target.closest('[data-add-form]');
      if (!form) return;
      e.preventDefault();
      var idInput = qs('[name="id"]', form);
      if (!idInput || !idInput.value) return;
      var qtyInput = qs('[name="quantity"]', form);
      var qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
      var btn = qs('[type="submit"]', form);
      if (btn) btn.classList.add('btn--disabled');
      addToCart(idInput.value, qty).then(function (item) {
        showToast(item.product_title + ' · ' + (STR.added || 'added to bag'));
        return refreshCart(true);
      }).catch(function (err) {
        showToast((err && err.description) || 'Error');
      }).then(function () {
        if (btn) btn.classList.remove('btn--disabled');
      });
    });

    /* Quantity change inside drawer (delegated) */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-qty-change]');
      if (!btn) return;
      var key = btn.getAttribute('data-qty-change');
      var delta = parseInt(btn.getAttribute('data-delta'), 10);
      var valEl = btn.parentElement.querySelector('.qty-stepper__val');
      var current = valEl ? parseInt(valEl.textContent, 10) : 1;
      var next = Math.max(0, current + delta);
      changeLine(key, next).then(function (cart) {
        updateCartCount(cart.item_count);
        renderDrawer(cart);
        renderSamplesBar(document, cart.total_price);
        /* if on cart page, reload to re-render server-side */
        if (qs('[data-cart-page]')) window.location.reload();
      });
    });

    /* initial sample bar / count sync */
    refreshCart(false);
  }

  /* ============================================================
     QUANTITY STEPPERS (standalone, e.g. PDP / cart page inputs)
     ============================================================ */
  function initQtySteppers() {
    qsa('[data-stepper]').forEach(function (stepper) {
      var input = qs('input', stepper);
      var dec = qs('[data-stepper-dec]', stepper);
      var inc = qs('[data-stepper-inc]', stepper);
      var valEl = qs('[data-stepper-val]', stepper);
      function setVal(v) {
        v = Math.max(1, v);
        if (input) input.value = v;
        if (valEl) valEl.textContent = v;
      }
      if (dec) dec.addEventListener('click', function () {
        var v = parseInt((input ? input.value : valEl.textContent), 10) || 1;
        setVal(v - 1);
      });
      if (inc) inc.addEventListener('click', function () {
        var v = parseInt((input ? input.value : valEl.textContent), 10) || 1;
        setVal(v + 1);
      });
    });

    /* cart page line steppers — AJAX update */
    qsa('[data-cart-line-stepper]').forEach(function (stepper) {
      var key = stepper.getAttribute('data-key');
      var valEl = qs('.qty-stepper__val', stepper);
      qsa('[data-delta]', stepper).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var delta = parseInt(btn.getAttribute('data-delta'), 10);
          var current = parseInt(valEl.textContent, 10);
          changeLine(key, Math.max(0, current + delta)).then(function () { window.location.reload(); });
        });
      });
    });
    qsa('[data-cart-remove]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        changeLine(btn.getAttribute('data-key'), 0).then(function () { window.location.reload(); });
      });
    });
  }

  /* ============================================================
     PDP — gallery, accordion, variant selector
     ============================================================ */
  function initPDP() {
    var pdp = qs('[data-pdp]');
    if (!pdp) return;

    /* gallery thumbnails */
    var mainImg = qs('[data-pdp-main] img', pdp);
    qsa('[data-pdp-thumb]', pdp).forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var src = thumb.getAttribute('data-full');
        if (mainImg && src) mainImg.src = src;
        qsa('[data-pdp-thumb]', pdp).forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
      });
    });

    /* accordion */
    qsa('.accordion__trigger', pdp).forEach(function (trig) {
      trig.addEventListener('click', function () {
        var item = trig.closest('.accordion__item');
        item.classList.toggle('is-open');
        trig.setAttribute('aria-expanded', item.classList.contains('is-open'));
      });
    });

    /* variant selector */
    initVariantSelector(pdp);
  }

  function initVariantSelector(scope) {
    var dataEl = qs('[data-variant-json]', scope);
    if (!dataEl) return;
    var variants;
    try { variants = JSON.parse(dataEl.textContent); } catch (e) { return; }
    var form = qs('[data-add-form]', scope);
    var idInput = form ? qs('[name="id"]', form) : null;
    var priceEl = qs('[data-pdp-price]', scope);
    var addBtn = form ? qs('[type="submit"]', form) : null;

    var selected = {};

    function findVariant() {
      return variants.find(function (v) {
        return v.options.every(function (opt, i) { return selected['option' + (i + 1)] === opt; });
      });
    }
    function update() {
      var v = findVariant();
      if (!v) return;
      if (idInput) idInput.value = v.id;
      if (priceEl) {
        var html = '<span class="price__now">' + formatMoney(v.price) + '</span>';
        if (v.compare_at_price && v.compare_at_price > v.price) {
          html += '<span class="price__was">' + formatMoney(v.compare_at_price) + '</span>';
        }
        priceEl.innerHTML = html;
      }
      if (addBtn) {
        if (v.available) { addBtn.classList.remove('btn--disabled'); addBtn.querySelector('[data-btn-label]') && (addBtn.querySelector('[data-btn-label]').textContent = STR.addToCart || 'Add to bag'); }
        else { addBtn.classList.add('btn--disabled'); addBtn.querySelector('[data-btn-label]') && (addBtn.querySelector('[data-btn-label]').textContent = STR.soldOut || 'Sold out'); }
      }
    }

    qsa('[data-option-index]', scope).forEach(function (group) {
      var idx = group.getAttribute('data-option-index');
      var pills = qsa('.variant-pill', group);
      var active = pills.find(function (p) { return p.classList.contains('is-active'); }) || pills[0];
      if (active) selected['option' + idx] = active.getAttribute('data-value');
      pills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          pills.forEach(function (p) { p.classList.remove('is-active'); });
          pill.classList.add('is-active');
          selected['option' + idx] = pill.getAttribute('data-value');
          update();
        });
      });
    });
    update();
  }

  /* ============================================================
     COLLECTION FILTERS
     ============================================================ */
  function initCollectionFilters() {
    var sidebar = qs('[data-filter-sidebar]');
    var toggle = qs('[data-filter-toggle]');
    if (toggle && sidebar) {
      toggle.addEventListener('click', function () { sidebar.classList.toggle('is-open'); });
    }

    var checks = qsa('[data-filter]');
    var grid = qs('[data-product-grid]');
    if (!checks.length || !grid) return;
    var cards = qsa('[data-product-card]', grid);
    var emptyMsg = qs('[data-collection-empty]');
    var countEl = qs('[data-collection-count]');

    function apply() {
      var active = {};
      checks.forEach(function (c) {
        if (c.checked) {
          var type = c.getAttribute('data-filter');
          (active[type] = active[type] || []).push(c.value);
        }
      });
      var keys = Object.keys(active);
      var shown = 0;
      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').toLowerCase().split(',');
        var match = keys.every(function (k) {
          return active[k].some(function (val) { return tags.indexOf(val.toLowerCase()) !== -1; });
        });
        card.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      if (emptyMsg) emptyMsg.hidden = shown !== 0;
      if (countEl) countEl.firstChild && (countEl.firstChild.textContent = shown + ' ');
    }

    checks.forEach(function (c) { c.addEventListener('change', apply); });

    var reset = qs('[data-filter-reset]');
    if (reset) reset.addEventListener('click', function () {
      checks.forEach(function (c) { c.checked = false; });
      apply();
    });
  }

  /* ============================================================
     QUIZ — state machine
     ============================================================ */
  function initQuiz() {
    var quiz = qs('[data-quiz]');
    if (!quiz) return;

    var QUESTIONS = qsa('[data-quiz-step]', quiz);
    var total = QUESTIONS.length;
    var resultScreen = qs('[data-quiz-result]', quiz);
    var progressFill = qs('[data-quiz-progress]', quiz);
    var counter = qs('[data-quiz-counter]', quiz);
    var prevBtn = qs('[data-quiz-prev]', quiz);

    var ROUTINES = {};
    try { ROUTINES = JSON.parse(qs('[data-quiz-routines]', quiz).textContent); } catch (e) {}

    var step = 0;
    var scores = {};
    var history = [];

    function show(idx) {
      QUESTIONS.forEach(function (q, i) { q.hidden = i !== idx; });
      if (resultScreen) resultScreen.hidden = true;
      if (progressFill) progressFill.style.width = (idx / total) * 100 + '%';
      if (counter) counter.textContent = (idx + 1) + ' / ' + total;
      if (prevBtn) prevBtn.hidden = idx === 0;
    }

    function finish() {
      QUESTIONS.forEach(function (q) { q.hidden = true; });
      if (prevBtn) prevBtn.hidden = true;
      if (progressFill) progressFill.style.width = '100%';

      var winId = 'glass', best = -1;
      Object.keys(scores).forEach(function (k) { if (scores[k] > best) { best = scores[k]; winId = k; } });
      var r = ROUTINES[winId] || ROUTINES.glass || {};

      var card = quiz.closest('.quiz') || quiz;
      if (r.tint) card.style.background = r.tint;

      if (resultScreen) {
        resultScreen.hidden = false;
        var nameEl = qs('[data-result-name]', resultScreen);
        if (nameEl) nameEl.textContent = (STR.quizRoutineLine || 'Routine') + ' ' + (r.name || '');
        var subEl = qs('[data-result-sub]', resultScreen);
        if (subEl && r.sub) subEl.textContent = r.sub + '. ' + (STR.quizResultSub || '');
        var dot = qs('[data-result-dot]', resultScreen);
        if (dot && r.color) dot.style.background = r.color;
        var packBtn = qs('[data-result-pack]', resultScreen);
        if (packBtn && r.packUrl) packBtn.href = r.packUrl;
        var routineBtn = qs('[data-result-routine]', resultScreen);
        if (routineBtn && r.url) routineBtn.href = r.url;
        var recoWrap = qs('[data-result-recos]', resultScreen);
        qsa('[data-reco]', resultScreen).forEach(function (el) {
          el.hidden = el.getAttribute('data-reco') !== winId;
        });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    qsa('[data-quiz-option]', quiz).forEach(function (opt) {
      opt.addEventListener('click', function () {
        var map = opt.getAttribute('data-quiz-option');
        scores[map] = (scores[map] || 0) + 1;
        history.push(map);
        step++;
        if (step >= total) finish();
        else show(step);
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', function () {
      if (step === 0) return;
      step--;
      var last = history.pop();
      if (last) scores[last] = Math.max(0, (scores[last] || 1) - 1);
      show(step);
    });

    var retake = qs('[data-quiz-retake]', quiz);
    if (retake) retake.addEventListener('click', function () {
      step = 0; scores = {}; history = [];
      var card = quiz.closest('.quiz') || quiz;
      card.style.background = '';
      show(0);
    });

    /* email gate */
    var emailForm = qs('[data-quiz-email]', quiz);
    if (emailForm) emailForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = qs('[type="submit"]', emailForm);
      var label = btn ? qs('[data-btn-label]', btn) : null;
      if (label) label.textContent = STR.quizEmailSent || 'Sent';
    });

    show(0);
  }

  /* ============================================================
     GIFT CARD SPLIT amount picker
     ============================================================ */
  function initGiftSplit() {
    qsa('[data-gift-amounts]').forEach(function (wrap) {
      var form = wrap.closest('[data-add-form]') || qs('[data-add-form]', wrap.parentElement);
      var idInput = form ? qs('[name="id"]', form) : null;
      qsa('.gift-amount', wrap).forEach(function (btn) {
        btn.addEventListener('click', function () {
          qsa('.gift-amount', wrap).forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          if (idInput) idInput.value = btn.getAttribute('data-variant-id');
        });
      });
    });
  }

  /* ============================================================
     COPY-TO-CLIPBOARD (account welcome code)
     ============================================================ */
  function initCopyButtons() {
    qsa('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        var done = function () {
          var lbl = qs('[data-btn-label]', btn) || btn;
          var prev = lbl.textContent;
          lbl.textContent = STR.copied || 'Copied ✓';
          setTimeout(function () { lbl.textContent = prev; }, 1800);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
        else done();
      });
    });
  }

  /* ============================================================
     SVG icon helper (for JS-rendered markup)
     ============================================================ */
  function icon(name) {
    var P = {
      minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
      plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'
    };
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (P[name] || '') + '</svg>';
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    initStickyHeader();
    initMobileNav();
    initCart();
    initQtySteppers();
    initPDP();
    initCollectionFilters();
    initQuiz();
    initGiftSplit();
    initCopyButtons();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.ClowCart = { open: CartUI.open, close: CartUI.close, refresh: refreshCart, add: addToCart };
})();
