/*
 * Cherry River — Catalogue / Architecture de l'information.
 * SOURCE UNIQUE de la navigation "Produits".
 *
 * Pour ajouter une sous-catégorie (Rhums, Vodkas, Whiskys, Tequilas,
 * Prêts-à-boire, Liqueurs...) : ajoute un objet dans `subcategories`.
 * Pour la rendre active : passe `status:'live'` et remplis `items`.
 * Le méga-menu et les deux pages se mettent à jour automatiquement.
 */

  var P = '/produits';
  var H = '/';

  var CATALOG = {
    accueil: H,
    // Catégorie principale : PRODUITS
    produits: {
      label: 'Produits',
      href: H + '#creations',
      subcategories: [
        {
          key: 'gins', label: 'Gins', status: 'live',
          blurb: 'Sept gins distillés en petits lots',
          items: [
            { slug: 'berries',       label: 'Petits Fruits & Basilic', house: 'Cherry River' },
            { slug: 'framboiselime', label: 'Framboise & Lime',        house: 'Cherry River' },
            { slug: 'pamplemousse',  label: 'Pamplemousse Rose',       house: 'Cherry River' },
            { slug: 'litchi-tangerine', label: 'Litchi & Tangerine',   house: 'Cherry River' },
            { slug: 'boreal',        label: 'Opémiska Gin Boréal',     house: 'Opémiska' },
            { slug: 'bleuets',       label: 'Opémiska Bleuets Sauvages', house: 'Opémiska' },
            { slug: 'fraise',        label: 'Opémiska Fraises du Québec', house: 'Opémiska' }
          ]
        },
        { key: 'rhums', label: 'Rhums', status: 'live', blurb: 'Deux rhums, ambré et épicé', items: [
            { slug: 'rhum-ambre', label: 'Rhum Ambré', house: 'Cherry River' },
            { slug: 'rhum-epice', label: 'Rhum Épicé', house: 'Cherry River' }
        ] },
        { key: 'vodkas', label: 'Vodkas', status: 'live', blurb: 'Pureté premium & érable du Québec', items: [
            { slug: 'vodka-averse', label: 'Vodka Averse Premium', house: 'Averse' },
            { slug: 'vodka-averse-framboise', label: 'Averse Vodka Framboise', house: 'Averse' },
            { slug: 'vodka-averse-mangue', label: 'Averse Vodka Mangue', house: 'Averse' },
            { slug: 'vodka-averse-pomme', label: 'Averse Vodka Pomme', house: 'Averse' },
            { slug: 'vodka-erable', label: 'Vodka Érable', house: 'Cherry River' }
        ] },
        { key: 'whiskys', label: 'Whiskys', status: 'live', blurb: 'Bourbon Master Blend & Scotch d’assemblage', items: [
            { slug: 'bourbon', label: 'Cherry River Bourbon Whiskey', house: 'Cherry River' },
            { slug: 'alister-mackenzie', label: 'Alister MacKenzie Blended Scotch', house: 'Alister MacKenzie' }
        ] },
        { key: 'tequilas', label: 'Tequilas', status: 'live', blurb: '100 % agave bleu, faite au Mexique', items: [
            { slug: 'tequila-silver', label: 'Tequila Silver', house: 'Cherry River' }
        ] },
        { key: 'rtd-alcool', label: 'Prêts-à-boire · avec alcool', status: 'live', blurb: 'Vrais cocktails en canette', items: [
            { slug: 'rtd-mojito', label: 'Rhum Mojito', house: 'Cherry River' },
            { slug: 'rtd-cosmo', label: 'Cosmopolitain', house: 'Cherry River' },
            { slug: 'rtd-margarita', label: 'Margarita', house: 'Cherry River' },
            { slug: 'rtd-rhum-cola', label: 'Rhum & Cola', house: 'Cherry River' },
            { slug: 'rtd-amaretto', label: 'Amaretto Sour', house: 'Cherry River' },
            { slug: 'rtd-daiquiri', label: 'Daiquiri Fraise', house: 'Cherry River' },
            { slug: 'rtd-petitsfruits', label: 'Petits Fruits & Basilic', house: 'Cherry River' },
            { slug: 'rtd-tiki', label: 'Rhum Punch Tiki', house: 'Cherry River' },
            { slug: 'rtd-sangria', label: 'Sangria Rouge', house: 'Cherry River' },
            { slug: 'rtd-paloma', label: 'Tequila Paloma', house: 'Cherry River' },
            { slug: 'rtd-ginlimon', label: 'Gin Limonade', house: 'Cherry River' },
            { slug: 'rtd-orange', label: 'Orange Sanguine', house: 'Cherry River' },
            { slug: 'rtd-limonade', label: 'Limonade', house: 'Cherry River' },
            { slug: 'rtd-opemiska-bleuets', label: 'Opémiska Bleuets', house: 'Opémiska' },
            { slug: 'rtd-gintonic', label: 'Gin Tonique', house: 'Cherry River' },
            { slug: 'rtd-gingericedtea', label: 'Thé Glacé au Gingembre', house: 'Cherry River' },
            { slug: 'rtd-limoicedtea', label: 'Vodka Limonade Thé Glacé', house: 'Cherry River' },
            { slug: 'rtd-litchipample', label: 'Litchi & Pamplemousse', house: 'Cherry River' },
            { slug: 'rtd-moscow', label: 'Moscow Mule', house: 'Cherry River' },
            { slug: 'rtd-spritzorange', label: 'Orange Spritz', house: 'Cherry River' },
            { slug: 'rtd-margamangue', label: 'Margarita à la Mangue', house: 'Cherry River' },
            { slug: 'rtd-vlpeche', label: 'Vodka Limonade Pêche Blanche & Basilic', house: 'Cherry River' },
            { slug: 'rtd-vltgcitron', label: 'Vodka Limonade Thé Glacé Citron-Lime', house: 'Cherry River' },
            { slug: 'rtd-vltgframboise', label: 'Vodka Limonade Thé Glacé Framboises', house: 'Cherry River' }
        ] },
        { key: 'rtd-sans', label: 'Prêts-à-boire · sans alcool', status: 'live', blurb: 'Mocktails pétillants, 0 %', items: [
            { slug: 'na-mojito', label: 'Mojito', house: 'Cherry River' },
            { slug: 'na-melon', label: 'Melon d\u2019eau & Lime', house: 'Cherry River' },
            { slug: 'na-margarita', label: 'Margarita', house: 'Cherry River' },
            { slug: 'na-amaretto', label: 'Amaretto Sour', house: 'Cherry River' },
            { slug: 'na-cosmo', label: 'Cosmopolitain', house: 'Cherry River' },
            { slug: 'na-paloma', label: 'Paloma', house: 'Cherry River' },
            { slug: 'na-petitsfruits', label: 'Petits Fruits', house: 'Cherry River' },
            { slug: 'na-orange', label: 'Orange Sanguine', house: 'Cherry River' },
            { slug: 'na-sangria', label: 'Sangria Rouge', house: 'Cherry River' }
        ] },
        { key: 'liqueurs', label: 'Liqueurs', status: 'live', blurb: 'Cinq liqueurs artisanales', items: [
            { slug: 'liqueur-amaretto', label: 'Liqueur Amaretto', house: 'Cherry River' },
            { slug: 'liqueur-cafe', label: 'Liqueur Café', house: 'Cherry River' },
            { slug: 'liqueur-orange', label: 'Liqueur Orange', house: 'Cherry River' },
            { slug: 'liqueur-vanille', label: 'Liqueur Vanille', house: 'Cherry River' },
            { slug: 'liqueur-whisky', label: 'Opémiska Liqueur de Whisky', house: 'Opémiska' }
        ] },
        { key: 'cremes', label: 'Crème alcoolisée', status: 'live', blurb: 'Onctueuse, à la vanille de Coaticook', items: [
            { slug: 'coaticook-vanille', label: 'Crème Coaticook Vanille', house: 'Cherry River' }
        ] },
        { key: 'gin-sans', label: 'Gin sans alcool', status: 'live', blurb: 'Le gin, en version 0 %', items: [
            { slug: 'gin-sans-berries', label: 'Petits Fruits & Basilic', house: 'Cherry River' }
        ] }
      ]
    }
  };

  // href d'un produit à partir de son slug
  CATALOG.productHref = function (slug) { return P + '?gin=' + slug; };
  CATALOG.bottleThumb = function (slug) { return '/assets/bottle-' + slug + '.png'; };

  /* ---------- Méga-menu (2 volets) ---------- */
  CATALOG.mountMenu = function (trigger) {
    if (!trigger || trigger.__crMenuMounted) return;
    trigger.__crMenuMounted = true;
    var subs = CATALOG.produits.subcategories;
    var caret = trigger.querySelector('[data-caret]');

    // Panel
    var panel = document.createElement('div');
    panel.setAttribute('role', 'navigation');
    panel.setAttribute('aria-label', 'Navigation Produits');
    panel.style.cssText = [
      'position:fixed', 'z-index:8500', 'top:0', 'left:0',
      'min-width:min(680px,92vw)', 'max-width:92vw',
      'background:rgba(14,12,10,0.92)', '-webkit-backdrop-filter:blur(18px)', 'backdrop-filter:blur(18px)',
      'border:1px solid rgba(244,239,230,0.12)', 'border-radius:4px',
      'box-shadow:0 30px 70px rgba(0,0,0,0.55)',
      'opacity:0', 'transform:translateY(-8px)', 'pointer-events:none',
      'transition:opacity .32s cubic-bezier(.16,1,.3,1), transform .32s cubic-bezier(.16,1,.3,1)',
      'overflow:hidden', "font-family:'Hanken Grotesk',sans-serif"
    ].join(';');

    var row = document.createElement('div');
    row.style.cssText = 'display:flex; align-items:stretch;';
    panel.appendChild(row);

    // Volet gauche : sous-catégories
    var aside = document.createElement('div');
    aside.style.cssText = 'width:248px; flex:none; padding:14px; border-right:1px solid rgba(244,239,230,0.1); display:flex; flex-direction:column; gap:2px;';
    row.appendChild(aside);

    var pane = document.createElement('div');
    pane.style.cssText = 'flex:1; min-width:300px; padding:22px 24px;';
    row.appendChild(pane);

    var subEls = [];
    function renderPane(sub) {
      pane.innerHTML = '';
      var head = document.createElement('div');
      head.style.cssText = "font-family:'Familjen Grotesk',sans-serif; font-size:20px; color:#f4efe6; margin-bottom:4px;";
      head.textContent = sub.label;
      pane.appendChild(head);
      var blurb = document.createElement('div');
      blurb.style.cssText = 'font-size:12.5px; letter-spacing:.02em; color:rgba(244,239,230,0.5); margin-bottom:18px;';
      blurb.textContent = sub.blurb || (sub.status === 'soon' ? 'Nouvelle collection à venir' : '');
      pane.appendChild(blurb);

      if (sub.status === 'live' && sub.items) {
        var list = document.createElement('div');
        list.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:4px 18px;';
        sub.items.forEach(function (it) {
          var a = document.createElement('a');
          a.href = CATALOG.productHref(it.slug);
          a.style.cssText = 'display:flex; align-items:center; gap:12px; padding:9px 8px; border-radius:3px; color:#f4efe6; text-decoration:none; transition:background .25s;';
          a.addEventListener('mouseenter', function () { a.style.background = 'rgba(244,239,230,0.05)'; a.querySelector('[data-ar]').style.transform = 'translateX(3px)'; a.querySelector('[data-ar]').style.opacity = '1'; });
          a.addEventListener('mouseleave', function () { a.style.background = 'transparent'; a.querySelector('[data-ar]').style.transform = 'translateX(0)'; a.querySelector('[data-ar]').style.opacity = '0'; });
          var thumb = document.createElement('span');
          thumb.style.cssText = 'width:34px; height:44px; flex:none; display:flex; align-items:center; justify-content:center; background:radial-gradient(circle at 50% 40%, rgba(231,211,173,0.14), rgba(10,9,8,0) 70%); border-radius:3px;';
          thumb.innerHTML = '<img src="' + CATALOG.bottleThumb(it.slug) + '" alt="" style="height:40px; width:auto; object-fit:contain;">';
          var txt = document.createElement('span');
          txt.style.cssText = 'display:flex; flex-direction:column; gap:2px; min-width:0;';
          txt.innerHTML = '<span style="font-family:\'Familjen Grotesk\',sans-serif; font-size:15px; line-height:1.15;">' + it.label + '</span>' +
                          '<span style="font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:rgba(244,239,230,0.4);">' + it.house + '</span>';
          var ar = document.createElement('span');
          ar.setAttribute('data-ar', '');
          ar.textContent = '→';
          ar.style.cssText = 'margin-left:auto; color:#8e2436; opacity:0; transition:transform .3s, opacity .3s;';
          a.appendChild(thumb); a.appendChild(txt); a.appendChild(ar);
          list.appendChild(a);
        });
        pane.appendChild(list);
        var all = document.createElement('a');
        all.href = CATALOG.productHref(sub.items[0].slug);
        all.textContent = 'Voir la collection ' + sub.label + ' →';
        all.style.cssText = 'display:inline-block; margin-top:16px; font-size:12px; letter-spacing:.14em; text-transform:uppercase; font-weight:600; color:#e7d3ad;';
        pane.appendChild(all);
      } else {
        var soon = document.createElement('div');
        soon.style.cssText = 'display:flex; align-items:center; gap:12px; padding:22px 0; color:rgba(244,239,230,0.55); font-size:14px;';
        soon.innerHTML = '<span style="display:inline-flex; padding:6px 12px; border:1px solid rgba(231,211,173,0.4); border-radius:100px; font-size:10.5px; letter-spacing:.18em; text-transform:uppercase; color:#e7d3ad;">Bientôt</span> Cette collection arrive prochainement.';
        pane.appendChild(soon);
      }
    }

    subs.forEach(function (sub, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.style.cssText = 'appearance:none; background:transparent; border:0; cursor:pointer; text-align:left; width:100%; display:flex; align-items:center; justify-content:space-between; gap:10px; padding:11px 12px; border-radius:3px; color:rgba(244,239,230,0.72); font-family:\'Familjen Grotesk\',sans-serif; font-size:15px; transition:background .2s, color .2s;';
      var lab = document.createElement('span'); lab.textContent = sub.label; b.appendChild(lab);
      var tag = document.createElement('span');
      if (sub.status === 'live') {
        tag.textContent = String((sub.items || []).length);
        tag.style.cssText = 'font-size:11px; color:rgba(244,239,230,0.4); font-variant-numeric:tabular-nums;';
      } else {
        tag.textContent = 'Bientôt';
        tag.style.cssText = 'font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; color:rgba(231,211,173,0.55);';
      }
      b.appendChild(tag);
      function activate() {
        subEls.forEach(function (x) { x.style.background = 'transparent'; x.style.color = 'rgba(244,239,230,0.72)'; });
        b.style.background = 'rgba(244,239,230,0.06)'; b.style.color = '#f4efe6';
        renderPane(sub);
      }
      b.addEventListener('mouseenter', activate);
      b.addEventListener('focus', activate);
      b.addEventListener('click', function () { if (sub.status === 'live' && sub.items) location.href = CATALOG.productHref(sub.items[0].slug); });
      aside.appendChild(b);
      subEls.push(b);
      if (i === 0) { b.style.background = 'rgba(244,239,230,0.06)'; b.style.color = '#f4efe6'; }
    });
    renderPane(subs[0]);
    document.body.appendChild(panel);

    // Position + open/close with hover intent
    var open = false, hideT = null;
    function place() {
      var r = trigger.getBoundingClientRect();
      panel.style.top = (r.bottom + 12) + 'px';
      var left = r.left;
      var w = panel.offsetWidth || 680;
      if (left + w > window.innerWidth - 16) left = window.innerWidth - 16 - w;
      panel.style.left = Math.max(16, left) + 'px';
    }
    function show() {
      clearTimeout(hideT); if (open) return; open = true; place();
      panel.style.opacity = '1'; panel.style.transform = 'translateY(0)'; panel.style.pointerEvents = 'auto';
      if (caret) caret.style.transform = 'rotate(180deg)';
    }
    function hide() {
      open = false; panel.style.opacity = '0'; panel.style.transform = 'translateY(-8px)'; panel.style.pointerEvents = 'none';
      if (caret) caret.style.transform = 'rotate(0deg)';
    }
    function scheduleHide() { clearTimeout(hideT); hideT = setTimeout(hide, 180); }

    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', scheduleHide);
    panel.addEventListener('mouseenter', function () { clearTimeout(hideT); });
    panel.addEventListener('mouseleave', scheduleHide);
    trigger.addEventListener('click', function (e) { e.preventDefault(); open ? hide() : show(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
    document.addEventListener('click', function (e) { if (open && !panel.contains(e.target) && !trigger.contains(e.target)) hide(); });
    window.addEventListener('resize', function () { if (open) place(); });
    window.addEventListener('scroll', function () { if (open) place(); }, { passive: true });
    setInterval(function () { if (open) place(); }, 200);
  };

  /* ---------- BOUTIQUE (accessoires) ---------- */
  var B = '/boutique';
  CATALOG.boutique = {
    label: 'Boutique',
    href: B,
    subcategories: [
      {
        key: 'accessoires', label: 'Accessoires', status: 'live',
        blurb: 'Barware & verrerie gravés Cherry River',
        items: [
          { slug: 'shaker-noir',        label: 'Shaker Boston — Noir',       house: 'Shaker' },
          { slug: 'shaker-or-rose',     label: 'Shaker parisien — Or rose',  house: 'Shaker' },
          { slug: 'doseur-multi',       label: 'Doseur multi-niveaux',       house: 'Doseur' },
          { slug: 'doseur-argent',      label: 'Doseur — Argent',            house: 'Doseur' },
          { slug: 'doseur-argent-petit',label: 'Doseur — Argent (petit)',    house: 'Doseur' },
          { slug: 'doseur-noir-petit',  label: 'Doseur — Noir (petit)',      house: 'Doseur' },
          { slug: 'doseur-or-rose',     label: 'Doseur — Or rose',           house: 'Doseur' },
          { slug: 'verre-martini',      label: 'Verre à martini',            house: 'Verrerie' },
          { slug: 'verre-margarita',    label: 'Verre à margarita',          house: 'Verrerie' },
          { slug: 'verre-shooter',      label: 'Old fashioned & shooter',    house: 'Verrerie' },
          { slug: 'tasse-moscow-mule',  label: 'Tasse Moscow Mule',          house: 'Verrerie' },
          { slug: 'muddler',            label: 'Pilon à cocktail',           house: 'Outils' },
          { slug: 'passoire',           label: 'Passoire à cocktail',        house: 'Outils' },
          { slug: 'cuillere-or-rose',   label: 'Cuillère de bar — Or rose',  house: 'Outils' },
          { slug: 'presse-agrumes',     label: 'Presse-agrumes',             house: 'Outils' },
          { slug: 'bec-verseur',        label: 'Bec verseur',                house: 'Outils' },
          { slug: 'moule-glacons',      label: 'Moule à gros glaçons',       house: 'Glace' },
          { slug: 'tampon-glace',       label: 'Tampon à glace gravé',       house: 'Glace' },
          { slug: 'sous-verres',        label: 'Sous-verres (x4)',           house: 'Accessoires' },
          { slug: 'pailles-metal',      label: 'Pailles en métal (x4)',      house: 'Accessoires' }
        ]
      },
      { key: 'coffrets',  label: 'Coffrets cadeaux', status: 'soon' },
      { key: 'vetements', label: 'Vêtements',        status: 'soon' }
    ]
  };
  CATALOG.accessoryHref  = function (slug) { return B + '#item-' + slug; };
  CATALOG.accessoryThumb = function (slug) { return '/assets/accessoires/' + slug + '.png'; };
  CATALOG.boutiqueHref = B;

  /* Méga-menu « Boutique » — même langage que Produits */
  CATALOG.mountBoutiqueMenu = function (trigger) {
    if (!trigger || trigger.__crBoutiqueMounted) return;
    trigger.__crBoutiqueMounted = true;
    var subs = CATALOG.boutique.subcategories;
    var caret = trigger.querySelector('[data-caret]');

    var panel = document.createElement('div');
    panel.setAttribute('role', 'navigation');
    panel.setAttribute('aria-label', 'Navigation Boutique');
    panel.style.cssText = [
      'position:fixed', 'z-index:8500', 'top:0', 'left:0',
      'min-width:min(680px,92vw)', 'max-width:92vw',
      'background:rgba(14,12,10,0.92)', '-webkit-backdrop-filter:blur(18px)', 'backdrop-filter:blur(18px)',
      'border:1px solid rgba(244,239,230,0.12)', 'border-radius:4px',
      'box-shadow:0 30px 70px rgba(0,0,0,0.55)',
      'opacity:0', 'transform:translateY(-8px)', 'pointer-events:none',
      'transition:opacity .32s cubic-bezier(.16,1,.3,1), transform .32s cubic-bezier(.16,1,.3,1)',
      'overflow:hidden', "font-family:'Hanken Grotesk',sans-serif"
    ].join(';');

    var row = document.createElement('div');
    row.style.cssText = 'display:flex; align-items:stretch;';
    panel.appendChild(row);

    var aside = document.createElement('div');
    aside.style.cssText = 'width:248px; flex:none; padding:14px; border-right:1px solid rgba(244,239,230,0.1); display:flex; flex-direction:column; gap:2px;';
    row.appendChild(aside);

    var pane = document.createElement('div');
    pane.style.cssText = 'flex:1; min-width:320px; padding:22px 24px;';
    row.appendChild(pane);

    var subEls = [];
    function renderPane(sub) {
      pane.innerHTML = '';
      var head = document.createElement('div');
      head.style.cssText = "font-family:'Familjen Grotesk',sans-serif; font-size:20px; color:#f4efe6; margin-bottom:4px;";
      head.textContent = sub.label;
      pane.appendChild(head);
      var blurb = document.createElement('div');
      blurb.style.cssText = 'font-size:12.5px; letter-spacing:.02em; color:rgba(244,239,230,0.5); margin-bottom:18px;';
      blurb.textContent = sub.blurb || 'Nouvelle collection à venir';
      pane.appendChild(blurb);

      if (sub.status === 'live' && sub.items) {
        var featured = sub.items.slice(0, 8);
        var list = document.createElement('div');
        list.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:4px 18px;';
        featured.forEach(function (it) {
          var a = document.createElement('a');
          a.href = CATALOG.accessoryHref(it.slug);
          a.style.cssText = 'display:flex; align-items:center; gap:12px; padding:9px 8px; border-radius:3px; color:#f4efe6; text-decoration:none; transition:background .25s;';
          a.addEventListener('mouseenter', function () { a.style.background = 'rgba(244,239,230,0.05)'; a.querySelector('[data-ar]').style.transform = 'translateX(3px)'; a.querySelector('[data-ar]').style.opacity = '1'; });
          a.addEventListener('mouseleave', function () { a.style.background = 'transparent'; a.querySelector('[data-ar]').style.transform = 'translateX(0)'; a.querySelector('[data-ar]').style.opacity = '0'; });
          var thumb = document.createElement('span');
          thumb.style.cssText = 'width:46px; height:46px; flex:none; display:flex; align-items:center; justify-content:center; background:radial-gradient(circle at 50% 45%, rgba(231,211,173,0.14), rgba(10,9,8,0) 70%); border-radius:3px;';
          thumb.innerHTML = '<img src="' + CATALOG.accessoryThumb(it.slug) + '" alt="" style="max-height:42px; max-width:42px; width:auto; height:auto; object-fit:contain;">';
          var txt = document.createElement('span');
          txt.style.cssText = 'display:flex; flex-direction:column; gap:2px; min-width:0;';
          txt.innerHTML = '<span style="font-family:\'Familjen Grotesk\',sans-serif; font-size:15px; line-height:1.15;">' + it.label + '</span>' +
                          '<span style="font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:rgba(244,239,230,0.4);">' + it.house + '</span>';
          var ar = document.createElement('span');
          ar.setAttribute('data-ar', '');
          ar.textContent = '→';
          ar.style.cssText = 'margin-left:auto; color:#8e2436; opacity:0; transition:transform .3s, opacity .3s;';
          a.appendChild(thumb); a.appendChild(txt); a.appendChild(ar);
          list.appendChild(a);
        });
        pane.appendChild(list);
        var all = document.createElement('a');
        all.href = CATALOG.boutiqueHref;
        all.textContent = 'Voir toute la boutique (' + sub.items.length + ') →';
        all.style.cssText = 'display:inline-block; margin-top:16px; font-size:12px; letter-spacing:.14em; text-transform:uppercase; font-weight:600; color:#e7d3ad;';
        pane.appendChild(all);
      } else {
        var soon = document.createElement('div');
        soon.style.cssText = 'display:flex; align-items:center; gap:12px; padding:22px 0; color:rgba(244,239,230,0.55); font-size:14px;';
        soon.innerHTML = '<span style="display:inline-flex; padding:6px 12px; border:1px solid rgba(231,211,173,0.4); border-radius:100px; font-size:10.5px; letter-spacing:.18em; text-transform:uppercase; color:#e7d3ad;">Bientôt</span> Cette section arrive prochainement.';
        pane.appendChild(soon);
      }
    }

    subs.forEach(function (sub, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.style.cssText = 'appearance:none; background:transparent; border:0; cursor:pointer; text-align:left; width:100%; display:flex; align-items:center; justify-content:space-between; gap:10px; padding:11px 12px; border-radius:3px; color:rgba(244,239,230,0.72); font-family:\'Familjen Grotesk\',sans-serif; font-size:15px; transition:background .2s, color .2s;';
      var lab = document.createElement('span'); lab.textContent = sub.label; b.appendChild(lab);
      var tag = document.createElement('span');
      if (sub.status === 'live') {
        tag.textContent = String((sub.items || []).length);
        tag.style.cssText = 'font-size:11px; color:rgba(244,239,230,0.4); font-variant-numeric:tabular-nums;';
      } else {
        tag.textContent = 'Bientôt';
        tag.style.cssText = 'font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; color:rgba(231,211,173,0.55);';
      }
      b.appendChild(tag);
      function activate() {
        subEls.forEach(function (x) { x.style.background = 'transparent'; x.style.color = 'rgba(244,239,230,0.72)'; });
        b.style.background = 'rgba(244,239,230,0.06)'; b.style.color = '#f4efe6';
        renderPane(sub);
      }
      b.addEventListener('mouseenter', activate);
      b.addEventListener('focus', activate);
      b.addEventListener('click', function () { if (sub.status === 'live') location.href = CATALOG.boutiqueHref; });
      aside.appendChild(b);
      subEls.push(b);
      if (i === 0) { b.style.background = 'rgba(244,239,230,0.06)'; b.style.color = '#f4efe6'; }
    });
    renderPane(subs[0]);
    document.body.appendChild(panel);

    var open = false, hideT = null;
    function place() {
      var r = trigger.getBoundingClientRect();
      panel.style.top = (r.bottom + 12) + 'px';
      var left = r.left;
      var w = panel.offsetWidth || 680;
      if (left + w > window.innerWidth - 16) left = window.innerWidth - 16 - w;
      panel.style.left = Math.max(16, left) + 'px';
    }
    function show() {
      clearTimeout(hideT); if (open) return; open = true; place();
      panel.style.opacity = '1'; panel.style.transform = 'translateY(0)'; panel.style.pointerEvents = 'auto';
      if (caret) caret.style.transform = 'rotate(180deg)';
    }
    function hide() {
      open = false; panel.style.opacity = '0'; panel.style.transform = 'translateY(-8px)'; panel.style.pointerEvents = 'none';
      if (caret) caret.style.transform = 'rotate(0deg)';
    }
    function scheduleHide() { clearTimeout(hideT); hideT = setTimeout(hide, 180); }

    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', scheduleHide);
    panel.addEventListener('mouseenter', function () { clearTimeout(hideT); });
    panel.addEventListener('mouseleave', scheduleHide);
    trigger.addEventListener('click', function (e) { e.preventDefault(); open ? hide() : show(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
    document.addEventListener('click', function (e) { if (open && !panel.contains(e.target) && !trigger.contains(e.target)) hide(); });
    window.addEventListener('resize', function () { if (open) place(); });
    window.addEventListener('scroll', function () { if (open) place(); }, { passive: true });
    setInterval(function () { if (open) place(); }, 200);
  };

  export default CATALOG;
