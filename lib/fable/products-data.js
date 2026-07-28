export const crLogo = "/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png";

export const opeLogo = "/assets/brands/opemiska/Logo_Opemiska_Blanc.png";

export const averseLogo = "/assets/brands/averse/Logo%20Averse_Blanc.png";

export const order = ["berries", "framboiselime", "limegingembre", "pamplemousse", "boreal", "bleuets", "fraise", "bourbon", "rhum-ambre", "rhum-epice", "vodka-averse", "vodka-erable", "tequila-silver", "coaticook-vanille", "gin-sans-berries", "liqueur-whisky", "liqueur-amaretto", "liqueur-cafe", "liqueur-orange", "liqueur-vanille", "rtd-mojito", "rtd-cosmo", "rtd-margarita", "rtd-rhum-cola", "rtd-amaretto", "rtd-daiquiri", "rtd-petitsfruits", "rtd-tiki", "rtd-sangria", "rtd-paloma", "rtd-ginlimon", "rtd-orange", "rtd-limonade", "rtd-opemiska-bleuets", "na-mojito", "na-melon", "na-margarita", "na-amaretto", "na-cosmo", "na-paloma", "na-petitsfruits", "na-orange", "na-sangria"];

export const catOf = { berries: "gins", framboiselime: "gins", limegingembre: "gins", pamplemousse: "gins", boreal: "gins", bleuets: "gins", fraise: "gins", bourbon: "whiskys", "rhum-ambre": "rhums", "rhum-epice": "rhums", "vodka-averse": "vodkas", "vodka-erable": "vodkas", "tequila-silver": "tequilas", "coaticook-vanille": "cremes", "gin-sans-berries": "gin-sans", "liqueur-whisky": "liqueurs", "liqueur-amaretto": "liqueurs", "liqueur-cafe": "liqueurs", "liqueur-orange": "liqueurs", "liqueur-vanille": "liqueurs", "rtd-mojito": "rtd-alcool", "rtd-cosmo": "rtd-alcool", "rtd-margarita": "rtd-alcool", "rtd-rhum-cola": "rtd-alcool", "rtd-amaretto": "rtd-alcool", "rtd-daiquiri": "rtd-alcool", "rtd-petitsfruits": "rtd-alcool", "rtd-tiki": "rtd-alcool", "rtd-sangria": "rtd-alcool", "rtd-paloma": "rtd-alcool", "rtd-ginlimon": "rtd-alcool", "rtd-orange": "rtd-alcool", "rtd-limonade": "rtd-alcool", "rtd-opemiska-bleuets": "rtd-alcool", "na-mojito": "rtd-sans", "na-melon": "rtd-sans", "na-margarita": "rtd-sans", "na-amaretto": "rtd-sans", "na-cosmo": "rtd-sans", "na-paloma": "rtd-sans", "na-petitsfruits": "rtd-sans", "na-orange": "rtd-sans", "na-sangria": "rtd-sans" };

export const categoryMeta = {
    gins: { factType: "Gin", factProcess: "Alambic de cuivre", listNav: "Botaniques", listLabel: "Les botaniques", listHeadMain: "Sept plantes,", listHeadAccent: "un seul terroir", collectionLabel: "La collection Gin", relatedNoun: "gins", craftText: "Chaque lot est distillé lentement dans notre alambic de cuivre, puis reposé avant l'embouteillage — un savoir-faire patient, sans raccourci." },
    rhums: { factType: "Rhum", factProcess: "Vieilli en fût de chêne", listNav: "Assemblage", listLabel: "L'assemblage", listHeadMain: "Le fût,", listHeadAccent: "la patience", collectionLabel: "La collection Rhum", relatedNoun: "rhums", craftText: "Assemblé puis reposé en fût de chêne, chaque lot développe sa rondeur au fil du temps — le fruit d'un travail de maître assembleur." },
    vodkas: { factType: "Vodka", factProcess: "Distillée en petits lots", listNav: "Le caractère", listLabel: "Le caractère", listHeadMain: "La pureté,", listHeadAccent: "sans compromis", collectionLabel: "La collection Vodka", relatedNoun: "vodkas", craftText: "Distillée avec patience puis filtrée pour une pureté cristalline — la signature d'une vodka de caractère, façonnée au Québec." },
    whiskys: { factType: "Bourbon whiskey", factProcess: "Vieilli en fût de chêne", listNav: "Assemblage", listLabel: "L'assemblage", listHeadMain: "Le fût,", listHeadAccent: "le temps", collectionLabel: "La collection Bourbon", relatedNoun: "bourbons", craftText: "Assemblé à partir de fûts de chêne soigneusement choisis, notre bourbon développe rondeur et profondeur au fil du vieillissement — une édition limitée de caractère." },
    tequilas: { factType: "Tequila", factProcess: "100 % agave bleu", listNav: "Agave", listLabel: "L'agave", listHeadMain: "Plein soleil,", listHeadAccent: "100 % agave", collectionLabel: "La collection Tequila", relatedNoun: "tequilas", craftText: "Élaborée au Mexique à partir d'agave bleu, puis choisie au Québec pour la création de cocktails — un pont entre deux terroirs." },
    "gin-sans": { factType: "Gin sans alcool", format: "750 ml", factProcess: "Distillation sans alcool", listNav: "Botaniques", listLabel: "Les botaniques", listHeadMain: "Sept plantes,", listHeadAccent: "zéro alcool", collectionLabel: "Gin sans alcool", relatedNoun: "gins sans alcool", craftText: "Toutes les botaniques d'un gin, distillées puis désalcoolisées — l'expérience du gin en version 0 %, à savourer en tout temps." },
    cremes: { factType: "Crème alcoolisée", format: "750 ml", factProcess: "Crème & alcool", listNav: "Saveurs", listLabel: "Les saveurs", listHeadMain: "La gourmandise,", listHeadAccent: "onctueuse", collectionLabel: "Crème alcoolisée", relatedNoun: "crèmes", craftText: "Une crème alcoolisée onctueuse élaborée avec du lait du Québec — à savourer bien fraîche, seule ou en cocktail gourmand." },
    liqueurs: { factType: "Liqueur", format: "750 ml", factProcess: "Macération artisanale", listNav: "Saveurs", listLabel: "Les saveurs", listHeadMain: "La gourmandise,", listHeadAccent: "en douceur", collectionLabel: "La collection Liqueurs", relatedNoun: "liqueurs", craftText: "Élaborée par macération et assemblage, chaque liqueur marie douceur et caractère — à savourer bien fraîche." },
    "rtd-alcool": { factType: "Prêt-à-boire", format: "355 ml", factProcess: "Prêt à servir", listNav: "Ingrédients", listLabel: "Ce qu'il contient", listHeadMain: "Le cocktail,", listHeadAccent: "prêt à savourer", collectionLabel: "Prêts-à-boire", relatedNoun: "cocktails", craftText: "Un vrai cocktail préparé et mis en canette pour être savouré partout — on ouvre, on verse sur glace, on déguste." },
    "rtd-sans": { factType: "Sans alcool", format: "355 ml", factProcess: "Prêt à servir", listNav: "Ingrédients", listLabel: "Ce qu'il contient", listHeadMain: "Le mocktail,", listHeadAccent: "sans compromis", collectionLabel: "Sans alcool", relatedNoun: "mocktails", craftText: "Toute la saveur d'un cocktail, sans alcool — pétillant, rafraîchissant, prêt à savourer bien froid." }
  };

export const products = {
    "gin-sans-berries": {
      brand: "Cherry River", house: "cr", pill: "Petits Fruits & Basilic", abv: "0 % vol.",
      chips: ["0 % alc./vol", "750 ml", "Sans alcool", "Petits lots"],
      eyebrow: "Gin sans alcool · Petits fruits & basilic", nameMain: "Gin 0 %", nameAccent: "Petits Fruits",
      title: "Gin Sans Alcool Petits Fruits & Basilic", short: "Petits fruits & basilic",
      origine: "Magog, Québec", caption: "Distillé à Magog · 0 % alcool",
      description: "Toute l'expérience de notre gin signature, sans alcool : genièvre, petits fruits des champs et basilic frais. Vibrant et estival, à savourer en tout temps.",
      notes: { nez: "Genièvre net, fraise et framboise, basilic frais.", bouche: "Ronde et juteuse, petits fruits sur trame herbacée.", finale: "Fraîche et sèche, le basilic en signature." },
      botIntro: "Toutes les botaniques du gin, distillées sans alcool pour en préserver l'expression.",
      bots: ["Genièvre", "Fraise des champs", "Framboise", "Basilic frais", "Zeste d'agrume", "Coriandre", "Angélique"],
      serve: { meta: "Servi long · 5 min", name: "Le Spritz", nameAccent: "0 %", ing: [{ name: "Gin sans alcool", q: "60 ml" }, { name: "Eau pétillante", q: "120 ml" }, { name: "Jus de pamplemousse", q: "30 ml" }, { name: "Basilic & glace", q: "au goût" }], steps: ["Remplir un grand verre de glace et froisser du basilic.", "Verser le gin sans alcool et le pamplemousse.", "Allonger d'eau pétillante et garnir de basilic."] }
    },
    "liqueur-amaretto": {
      brand: "Cherry River", house: "cr", pill: "Amaretto", abv: "26 % vol.",
      chips: ["26 % alc./vol", "750 ml", "Amandes & noyaux", "Petits lots"],
      eyebrow: "Liqueur · Amaretto", nameMain: "Liqueur", nameAccent: "Amaretto",
      title: "Liqueur Amaretto", short: "Amandes & noyaux",
      origine: "Magog, Québec", caption: "Liqueur d'amandes & noyaux",
      description: "Une liqueur d'amaretto aux amandes et noyaux, ambrée et gourmande. Douceur d'amande et rondeur boisée, à savourer nature ou en cocktail.",
      notes: { nez: "Amande douce et noyau, note de vanille.", bouche: "Ronde et sucrée, l'amande sur un fond boisé.", finale: "Longue et gourmande, légèrement amère." },
      botIntro: "Une liqueur à base d'amandes et de noyaux macérés dans l'eau-de-vie.",
      bots: ["Amandes", "Noyaux", "Eau-de-vie", "Sucre de canne", "Vanille"],
      serve: { meta: "Frappé · 3 min", name: "Amaretto", nameAccent: "Sour", ing: [{ name: "Liqueur Amaretto", q: "45 ml" }, { name: "Jus de citron", q: "25 ml" }, { name: "Sirop simple", q: "10 ml" }, { name: "Glace", q: "au goût" }], steps: ["Frapper les ingrédients avec de la glace.", "Filtrer sur glace neuve.", "Garnir d'une cerise et d'un zeste."] }
    },
    "liqueur-cafe": {
      brand: "Cherry River", house: "cr", pill: "Café", abv: "23 % vol.",
      chips: ["23 % alc./vol", "750 ml", "Café & eau-de-vie", "Petits lots"],
      eyebrow: "Liqueur · Café", nameMain: "Liqueur", nameAccent: "Café",
      title: "Liqueur Café", short: "Café & eau-de-vie",
      origine: "Magog, Québec", caption: "Liqueur à base de café & d'eau-de-vie",
      description: "Une liqueur de café profonde et intense, à base de café et d'eau-de-vie. Torréfaction ronde et douceur maîtrisée, parfaite en cocktail ou sur glace.",
      notes: { nez: "Café torréfié et cacao, note de vanille.", bouche: "Riche et veloutée, café intense et sucre équilibré.", finale: "Longue et torréfiée, légèrement amère." },
      botIntro: "Une liqueur à base de café infusé et d'eau-de-vie.",
      bots: ["Café", "Eau-de-vie", "Sucre de canne", "Vanille"],
      serve: { meta: "Frappé · 3 min", name: "Espresso", nameAccent: "Martini", ing: [{ name: "Liqueur Café", q: "45 ml" }, { name: "Vodka", q: "30 ml" }, { name: "Espresso frais", q: "30 ml" }, { name: "Glace", q: "au goût" }], steps: ["Frapper vigoureusement avec de la glace.", "Filtrer dans une coupe.", "Garnir de trois grains de café."] }
    },
    "liqueur-orange": {
      brand: "Cherry River", house: "cr", pill: "Orange", abv: "26 % vol.",
      chips: ["26 % alc./vol", "750 ml", "Écorce de laraha", "Petits lots"],
      eyebrow: "Liqueur · Orange", nameMain: "Liqueur", nameAccent: "Orange",
      title: "Liqueur Orange", short: "Orange amère (laraha)",
      origine: "Magog, Québec", caption: "Aromatisée à l'écorce séchée du laraha",
      description: "Une liqueur d'orange aromatisée à l'écorce séchée du laraha à l'orange amère. Vive et parfumée, l'indispensable des grands cocktails classiques.",
      notes: { nez: "Écorce d'orange amère, agrumes vifs.", bouche: "Franche et parfumée, amertume élégante d'agrume.", finale: "Sèche et zestée." },
      botIntro: "Une liqueur aromatisée à l'écorce séchée du laraha à l'orange amère.",
      bots: ["Écorce de laraha", "Orange amère", "Eau-de-vie", "Sucre de canne"],
      serve: { meta: "Frappé · 3 min", name: "Le", nameAccent: "Sidecar", ing: [{ name: "Liqueur Orange", q: "20 ml" }, { name: "Cognac ou brandy", q: "45 ml" }, { name: "Jus de citron", q: "20 ml" }, { name: "Glace", q: "au goût" }], steps: ["Frapper avec de la glace.", "Filtrer dans une coupe givrée de sucre.", "Garnir d'un zeste d'orange."] }
    },
    "liqueur-vanille": {
      brand: "Cherry River", house: "cr", pill: "Vanille", abv: "25 % vol.",
      chips: ["25 % alc./vol", "750 ml", "Vanille & eau-de-vie", "Petits lots"],
      eyebrow: "Liqueur · Vanille", nameMain: "Liqueur", nameAccent: "Vanille",
      title: "Liqueur Vanille", short: "Vanille & eau-de-vie",
      origine: "Magog, Québec", caption: "Liqueur à base de vanille & d'eau-de-vie",
      description: "Une liqueur de vanille dorée et parfumée, à base de vanille et d'eau-de-vie. Douce et ronde, elle sublime cafés, desserts et cocktails.",
      notes: { nez: "Vanille bourbon généreuse, note crémeuse.", bouche: "Douce et ronde, vanille enveloppante.", finale: "Longue et suave, sur la vanille." },
      botIntro: "Une liqueur à base de vanille infusée et d'eau-de-vie.",
      bots: ["Vanille", "Eau-de-vie", "Sucre de canne"],
      serve: { meta: "Sur glace · 2 min", name: "Vanille", nameAccent: "& Café", ing: [{ name: "Liqueur Vanille", q: "45 ml" }, { name: "Café froid", q: "60 ml" }, { name: "Crème (option.)", q: "au goût" }, { name: "Glace", q: "au goût" }], steps: ["Verser la liqueur sur glace.", "Allonger de café froid.", "Napper d'un nuage de crème."] }
    },
    bourbon: {
      brand: "Cherry River", house: "cr", pill: "Master Blend", abv: "40 % vol.",
      chips: ["40 % alc./vol", "750 ml", "Vieilli en fût", "Édition limitée"],
      eyebrow: "Bourbon whiskey · Master Blend", nameMain: "Bourbon", nameAccent: "Whiskey",
      title: "Cherry River Bourbon Whiskey", short: "Master Blend",
      origine: "Kentucky · Indiana · Texas", caption: "Version limitée spéciale · Vieilli en fût de chêne",
      description: "Un bourbon d'assemblage de maître, sélectionné dans les fûts de chêne du Kentucky, de l'Indiana et du Texas. Rond et boisé, il livre une expérience intense et onctueuse.",
      notes: { nez: "Vanille et caramel, chêne toasté, note de maïs doux.", bouche: "Ronde et onctueuse, épices douces sur une trame boisée.", finale: "Longue et chaleureuse, sur le fût et la vanille." },
      botIntro: "Un assemblage de bourbons choisis, vieillis en fûts de chêne américain.",
      bots: ["Maïs", "Seigle", "Orge maltée", "Fût de chêne", "Vanille", "Caramel", "Épices douces"],
      serve: { meta: "Sur glace · 3 min", name: "Le Old", nameAccent: "Fashioned", ing: [{ name: "Bourbon Whiskey", q: "60 ml" }, { name: "Sirop simple", q: "10 ml" }, { name: "Amers aromatiques", q: "2 traits" }, { name: "Zeste d'orange", q: "1" }, { name: "Gros glaçon", q: "1" }], steps: ["Déposer un gros glaçon dans un verre à old fashioned.", "Verser le bourbon, le sirop et les amers, puis remuer lentement.", "Exprimer le zeste d'orange au-dessus du verre et garnir."] }
    },
    "rtd-amaretto": { brand: "Cherry River", house: "cr", pill: "Amaretto Sour", abv: "7 % vol.", chips: ["7 % alc./vol", "355 ml", "À base d'amaretto", "Prêt à boire"], eyebrow: "Prêt-à-boire · Amaretto Sour", nameMain: "Amaretto", nameAccent: "Sour", title: "Cocktail Amaretto Sour", short: "Amaretto, citron & sucre", origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml", description: "L'Amaretto Sour en canette : la douceur d'amande de l'amaretto équilibrée par le citron, onctueux et gourmand. Prêt à savourer bien froid.", notes: { nez: "Amande douce et citron, note gourmande.", bouche: "Ronde et acidulée, l'amaretto sur une pointe de citron.", finale: "Douce et fraîche." }, botIntro: "Un cocktail à base d'amaretto, de citron et de sucre.", bots: ["Amaretto", "Citron", "Sucre de canne"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Amaretto Sour", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Cerise & citron", q: "garniture" }], steps: ["Verser sur un verre de glace.", "Garnir d'une cerise et d'une tranche de citron.", "Servir aussitôt."] } },
    "rtd-daiquiri": { brand: "Cherry River", house: "cr", pill: "Daiquiri Fraise", abv: "7 % vol.", chips: ["7 % alc./vol", "355 ml", "À base de rhum", "Prêt à boire"], eyebrow: "Prêt-à-boire · Daiquiri Fraise", nameMain: "Daiquiri", nameAccent: "Fraise", title: "Cocktail Daiquiri Fraise", short: "Rhum, fraise & lime", origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml", description: "Le daiquiri fraise en canette : rhum, fraise juteuse et lime, fruité et rafraîchissant. Prêt à savourer bien froid.", notes: { nez: "Fraise mûre et lime, souffle de rhum.", bouche: "Juteuse et vive, la fraise sur l'acidité de la lime.", finale: "Fraîche et fruitée." }, botIntro: "Un cocktail à base de rhum, de fraise et de lime.", bots: ["Rhum", "Fraise", "Lime", "Sucre de canne"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Daiquiri Fraise", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Fraise & lime", q: "garniture" }], steps: ["Verser sur un verre de glace.", "Garnir d'une fraise et d'une lime.", "Servir aussitôt."] } },
    "rtd-petitsfruits": { brand: "Cherry River", house: "cr", pill: "Petits Fruits & Basilic", abv: "7 % vol.", chips: ["7 % alc./vol", "355 ml", "À base de gin", "Prêt à boire"], eyebrow: "Prêt-à-boire · Petits Fruits & Basilic", nameMain: "Petits Fruits", nameAccent: "& Basilic", title: "Cocktail Petits Fruits & Basilic", short: "Gin, petits fruits & basilic", origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml", description: "Notre gin signature en cocktail de canette : petits fruits des champs et basilic frais, vibrant et estival. Prêt à savourer bien froid.", notes: { nez: "Petits fruits et basilic, genièvre léger.", bouche: "Vive et fruitée, l'herbacé du basilic en soutien.", finale: "Fraîche et nette." }, botIntro: "Un cocktail à base de gin, de petits fruits et de basilic.", bots: ["Gin", "Petits fruits", "Basilic", "Eau pétillante"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Petits Fruits & Basilic", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Basilic & baies", q: "garniture" }], steps: ["Verser sur un verre de glace.", "Garnir de basilic et de petits fruits.", "Servir aussitôt."] } },
    "rtd-tiki": { brand: "Cherry River", house: "cr", pill: "Rhum Punch Tiki", abv: "7 % vol.", chips: ["7 % alc./vol", "355 ml", "À base de rhum", "Prêt à boire"], eyebrow: "Prêt-à-boire · Rhum Punch Tiki", nameMain: "Rhum Punch", nameAccent: "Tiki", title: "Cocktail Rhum Punch Tiki", short: "Rhum & fruits tropicaux", origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml", description: "Un punch tiki en canette : rhum et fruits tropicaux, exotique et ensoleillé. L'évasion prête à savourer bien froide.", notes: { nez: "Ananas et fruits exotiques, rhum chaleureux.", bouche: "Gourmande et tropicale, fruits mûrs et rhum.", finale: "Fraîche et fruitée." }, botIntro: "Un cocktail à base de rhum et de fruits tropicaux.", bots: ["Rhum", "Ananas", "Agrumes", "Fruits de la passion"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Rhum Punch Tiki", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Ananas & cerise", q: "garniture" }], steps: ["Verser sur un verre de glace pilée.", "Garnir d'ananas et d'une cerise.", "Servir aussitôt."] } },
    "rtd-sangria": { brand: "Cherry River", house: "cr", pill: "Sangria Rouge", abv: "7 % vol.", chips: ["7 % alc./vol", "355 ml", "À base de vin", "Prêt à boire"], eyebrow: "Prêt-à-boire · Sangria Rouge", nameMain: "Sangria", nameAccent: "Rouge", title: "Cocktail Sangria Rouge", short: "Vin rouge & fruits", origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml", description: "La sangria rouge en canette : vin rouge et fruits, généreuse et conviviale. Prête à savourer bien fraîche.", notes: { nez: "Fruits rouges et agrumes, vin généreux.", bouche: "Ronde et fruitée, épices douces en soutien.", finale: "Fraîche et gourmande." }, botIntro: "Un cocktail à base de vin rouge et de fruits.", bots: ["Vin rouge", "Orange", "Fruits rouges", "Épices"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Sangria Rouge", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Orange & fruits", q: "garniture" }], steps: ["Verser sur un verre de glace.", "Garnir de tranches d'orange et de fruits.", "Servir aussitôt."] } },
    "rtd-paloma": { brand: "Cherry River", house: "cr", pill: "Tequila Paloma", abv: "7 % vol.", chips: ["7 % alc./vol", "355 ml", "À base de tequila", "Prêt à boire"], eyebrow: "Prêt-à-boire · Tequila Paloma", nameMain: "Tequila", nameAccent: "Paloma", title: "Cocktail Tequila Paloma", short: "Tequila & pamplemousse", origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml", description: "La paloma en canette : tequila et pamplemousse rose, pétillante et désaltérante. Prête à savourer bien froide.", notes: { nez: "Pamplemousse rose et agave, fraîcheur vive.", bouche: "Pétillante et acidulée, tequila et agrume.", finale: "Sèche et rafraîchissante." }, botIntro: "Un cocktail à base de tequila et de pamplemousse.", bots: ["Tequila", "Pamplemousse rose", "Lime", "Eau pétillante"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Tequila Paloma", q: "1 canette" }, { name: "Sel", q: "bord de verre" }, { name: "Pamplemousse", q: "garniture" }], steps: ["Givrer le bord du verre de sel.", "Verser sur glace.", "Garnir d'une tranche de pamplemousse."] } },
    "rtd-ginlimon": { brand: "Cherry River", house: "cr", pill: "Gin Limonade", abv: "7 % vol.", chips: ["7 % alc./vol", "355 ml", "À base de gin", "Prêt à boire"], eyebrow: "Prêt-à-boire · Gin Limonade", nameMain: "Gin", nameAccent: "Limonade", title: "Cocktail Gin Limonade", short: "Gin & limonade", origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml", description: "Le gin limonade en canette : gin et citron pétillant, vif et désaltérant. La simplicité rafraîchissante, prête à savourer.", notes: { nez: "Citron pétillant et genièvre.", bouche: "Vive et acidulée, gin frais et limonade.", finale: "Nette et sèche." }, botIntro: "Un cocktail à base de gin et de limonade au citron.", bots: ["Gin", "Citron", "Eau pétillante", "Sucre de canne"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Gin Limonade", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Citron & menthe", q: "garniture" }], steps: ["Verser sur un verre de glace.", "Garnir de citron et de menthe.", "Servir aussitôt."] } },
    "rtd-orange": { brand: "Cherry River", house: "cr", pill: "Orange Sanguine", abv: "7 % vol.", chips: ["7 % alc./vol", "355 ml", "À base de vodka", "Prêt à boire"], eyebrow: "Prêt-à-boire · Orange Sanguine", nameMain: "Orange", nameAccent: "Sanguine", title: "Cocktail Orange Sanguine", short: "Vodka & orange sanguine", origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml", description: "L'orange sanguine en canette : vodka et orange sanguine, pétillante et fruitée. Une gorgée de soleil prête à savourer.", notes: { nez: "Orange sanguine et agrumes, fraîcheur pétillante.", bouche: "Juteuse et vive, orange sur trame nette.", finale: "Fraîche et sèche." }, botIntro: "Un cocktail à base de vodka et d'orange sanguine.", bots: ["Vodka", "Orange sanguine", "Eau pétillante"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Orange Sanguine", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Orange", q: "garniture" }], steps: ["Verser sur un verre de glace.", "Garnir d'une tranche d'orange.", "Servir aussitôt."] } },
    "rtd-limonade": { brand: "Cherry River", house: "cr", pill: "Limonade", abv: "7 % vol.", chips: ["7 % alc./vol", "355 ml", "À base de vodka", "Prêt à boire"], eyebrow: "Prêt-à-boire · Limonade", nameMain: "Limonade", nameAccent: "alcoolisée", title: "Cocktail Limonade", short: "Vodka & citron", origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml", description: "Une limonade alcoolisée en canette : vodka et citron, franche et désaltérante. Le classique de l'été, prêt à savourer.", notes: { nez: "Citron franc et zeste, note nette.", bouche: "Acidulée et rafraîchissante, douceur équilibrée.", finale: "Nette et vive." }, botIntro: "Une limonade à base de vodka et de citron.", bots: ["Vodka", "Citron", "Sucre de canne", "Eau"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Limonade", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Citron & menthe", q: "garniture" }], steps: ["Verser sur un verre de glace.", "Garnir de citron et de menthe.", "Servir aussitôt."] } },
    "rtd-opemiska-bleuets": { brand: "Opémiska", house: "ope", pill: "Bleuets Sauvages", abv: "7 % vol.", chips: ["7 % alc./vol", "355 ml", "À base de gin", "Prêt à boire"], eyebrow: "Prêt-à-boire · Bleuets sauvages", nameMain: "Bleuets", nameAccent: "Sauvages", title: "Cocktail Opémiska Bleuets", short: "Gin boréal & bleuets", origine: "Forêt boréale, QC", caption: "Cocktail prêt-à-boire · 355 ml", description: "Le gin boréal Opémiska en cocktail de canette : bleuets sauvages et fraîcheur du Nord, pétillant et fruité. Prêt à savourer bien froid.", notes: { nez: "Bleuet sauvage et genièvre, souffle boréal.", bouche: "Fruitée et pétillante, le bleuet sur trame résineuse.", finale: "Fraîche et boisée." }, botIntro: "Un cocktail à base de gin boréal et de bleuets sauvages.", bots: ["Gin boréal", "Bleuet sauvage", "Lime", "Eau pétillante"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Opémiska Bleuets", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Bleuets & romarin", q: "garniture" }], steps: ["Verser sur un verre de glace.", "Garnir de bleuets et de romarin.", "Servir aussitôt."] } },
    "na-amaretto": { brand: "Cherry River", house: "cr", pill: "Amaretto Sour", abv: "0 % vol.", chips: ["0 % alc./vol", "355 ml", "Sans alcool", "Prêt à boire"], eyebrow: "Sans alcool · Amaretto Sour", nameMain: "Amaretto", nameAccent: "sans alcool", title: "Mocktail Amaretto Sour", short: "Amande & citron", origine: "Magog, Québec", caption: "Mocktail prêt-à-boire · 355 ml", description: "L'Amaretto Sour sans alcool : douceur d'amande et citron, onctueux et gourmand. Zéro alcool, toute la saveur.", notes: { nez: "Amande douce et citron.", bouche: "Ronde et acidulée, gourmande.", finale: "Douce et fraîche." }, botIntro: "Une boisson pétillante à saveur d'amande et de citron.", bots: ["Eau pétillante", "Amande", "Citron", "Sucre de canne"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Amaretto Sour sans alcool", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Cerise & citron", q: "garniture" }], steps: ["Verser sur glace.", "Garnir d'une cerise et de citron.", "Servir aussitôt."] } },
    "na-cosmo": { brand: "Cherry River", house: "cr", pill: "Cosmopolitain", abv: "0 % vol.", chips: ["0 % alc./vol", "355 ml", "Sans alcool", "Prêt à boire"], eyebrow: "Sans alcool · Cosmopolitain", nameMain: "Cosmo", nameAccent: "sans alcool", title: "Mocktail Cosmopolitain", short: "Canneberge & lime", origine: "Magog, Québec", caption: "Mocktail prêt-à-boire · 355 ml", description: "Le cosmopolitain sans alcool : canneberge et lime, élégant et acidulé. Zéro alcool, tout le style.", notes: { nez: "Canneberge et lime, fraîcheur acidulée.", bouche: "Vive et fruitée, équilibre sucré-acide.", finale: "Nette et sèche." }, botIntro: "Une boisson pétillante à saveur de canneberge et de lime.", bots: ["Eau pétillante", "Canneberge", "Lime"], serve: { meta: "Bien froid · 1 min", name: "En", nameAccent: "coupe", ing: [{ name: "Cosmopolitain sans alcool", q: "1 canette" }, { name: "Glace", q: "optionnel" }, { name: "Zeste de lime", q: "garniture" }], steps: ["Réfrigérer puis verser dans une coupe.", "Garnir d'un zeste de lime.", "Servir aussitôt."] } },
    "na-paloma": { brand: "Cherry River", house: "cr", pill: "Paloma", abv: "0 % vol.", chips: ["0 % alc./vol", "355 ml", "Sans alcool", "Prêt à boire"], eyebrow: "Sans alcool · Paloma", nameMain: "Paloma", nameAccent: "sans alcool", title: "Mocktail Paloma", short: "Pamplemousse & lime", origine: "Magog, Québec", caption: "Mocktail prêt-à-boire · 355 ml", description: "La paloma sans alcool : pamplemousse rose et lime, pétillante et désaltérante. Zéro alcool, toute la fraîcheur.", notes: { nez: "Pamplemousse rose et lime.", bouche: "Pétillante et acidulée, vive.", finale: "Sèche et rafraîchissante." }, botIntro: "Une boisson pétillante à saveur de pamplemousse et de lime.", bots: ["Eau pétillante", "Pamplemousse rose", "Lime"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Paloma sans alcool", q: "1 canette" }, { name: "Sel", q: "bord de verre" }, { name: "Pamplemousse", q: "garniture" }], steps: ["Givrer le bord de sel.", "Verser sur glace.", "Garnir de pamplemousse."] } },
    "na-petitsfruits": { brand: "Cherry River", house: "cr", pill: "Petits Fruits", abv: "0 % vol.", chips: ["0 % alc./vol", "355 ml", "Sans alcool", "Prêt à boire"], eyebrow: "Sans alcool · Petits Fruits", nameMain: "Petits Fruits", nameAccent: "sans alcool", title: "Mocktail Petits Fruits", short: "Petits fruits & basilic", origine: "Magog, Québec", caption: "Mocktail prêt-à-boire · 355 ml", description: "Le mocktail petits fruits et basilic : fruité et herbacé, vibrant et estival. Zéro alcool, toute la saveur.", notes: { nez: "Petits fruits et basilic frais.", bouche: "Vive et fruitée, herbacé délicat.", finale: "Fraîche et nette." }, botIntro: "Une boisson pétillante à saveur de petits fruits et de basilic.", bots: ["Eau pétillante", "Petits fruits", "Basilic"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Petits Fruits sans alcool", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Basilic & baies", q: "garniture" }], steps: ["Verser sur glace.", "Garnir de basilic et de petits fruits.", "Servir aussitôt."] } },
    "na-orange": { brand: "Cherry River", house: "cr", pill: "Orange Sanguine", abv: "0 % vol.", chips: ["0 % alc./vol", "355 ml", "Sans alcool", "Prêt à boire"], eyebrow: "Sans alcool · Orange Sanguine", nameMain: "Orange", nameAccent: "Sanguine", title: "Mocktail Orange Sanguine", short: "Orange sanguine & lime", origine: "Magog, Québec", caption: "Mocktail prêt-à-boire · 355 ml", description: "L'orange sanguine sans alcool : pétillante et fruitée, une gorgée de soleil. Zéro alcool, toute la saveur.", notes: { nez: "Orange sanguine et agrumes.", bouche: "Juteuse et vive, pétillante.", finale: "Fraîche et sèche." }, botIntro: "Une boisson pétillante à saveur d'orange sanguine.", bots: ["Eau pétillante", "Orange sanguine", "Lime"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Orange Sanguine sans alcool", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Orange", q: "garniture" }], steps: ["Verser sur glace.", "Garnir d'une tranche d'orange.", "Servir aussitôt."] } },
    "na-sangria": { brand: "Cherry River", house: "cr", pill: "Sangria Rouge", abv: "0 % vol.", chips: ["0 % alc./vol", "355 ml", "Sans alcool", "Prêt à boire"], eyebrow: "Sans alcool · Sangria Rouge", nameMain: "Sangria", nameAccent: "Rouge", title: "Mocktail Sangria Rouge", short: "Raisin & fruits rouges", origine: "Magog, Québec", caption: "Mocktail prêt-à-boire · 355 ml", description: "La sangria rouge sans alcool : raisin et fruits rouges, généreuse et conviviale. Zéro alcool, tout le plaisir.", notes: { nez: "Fruits rouges et raisin, agrumes.", bouche: "Ronde et fruitée, épices douces.", finale: "Fraîche et gourmande." }, botIntro: "Une boisson pétillante à saveur de raisin et de fruits rouges.", bots: ["Eau pétillante", "Raisin", "Fruits rouges", "Orange"], serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Sangria Rouge sans alcool", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Orange & fruits", q: "garniture" }], steps: ["Verser sur glace.", "Garnir d'orange et de fruits.", "Servir aussitôt."] } },
    bleuets: {
      brand: "Opémiska", house: "ope", pill: "Bleuets sauvages",
      eyebrow: "Gin boréal · Bleuets sauvages", nameMain: "Gin", nameAccent: "Bleuets",
      title: "Opémiska Gin Bleuets Sauvages", short: "Bleuets sauvages",
      origine: "Forêt boréale, QC", caption: "Signé Opémiska · Distillé au Québec",
      description: "Un gin boréal infusé de bleuets sauvages du Nord québécois — le genièvre rencontre le fruit forestier pour une signature ronde et sauvage.",
      notes: { nez: "Bleuet mûr et genièvre, souffle de forêt boréale.", bouche: "Ronde et fruitée, le bleuet sauvage sur une base résineuse.", finale: "Fraîche et boisée, délicatement fruitée." },
      botIntro: "Le bleuet sauvage rejoint le genièvre et les botaniques du Nord pour un gin de terroir.",
      bots: ["Genièvre", "Bleuet sauvage", "Épinette noire", "Thé du Labrador", "Poivre des dunes", "Angélique", "Coriandre"],
      serve: { meta: "Servi long · 5 min", name: "Le Bleuet", nameAccent: "Tonic", ing: [{ name: "Gin Bleuets", q: "45 ml" }, { name: "Tonic", q: "120 ml" }, { name: "Bleuets frais", q: "au goût" }, { name: "Romarin", q: "1 brin" }, { name: "Glace", q: "au goût" }], steps: ["Remplir un grand verre de glace.", "Verser le gin, allonger de tonic.", "Garnir de bleuets et d'un brin de romarin."] }
    },
    fraise: {
      brand: "Opémiska", house: "ope", pill: "Fraises du Québec",
      eyebrow: "Gin boréal · Fraises du Québec", nameMain: "Gin", nameAccent: "Fraises",
      title: "Opémiska Gin Fraises du Québec", short: "Fraises du Québec",
      origine: "Forêt boréale, QC", caption: "Signé Opémiska · Distillé au Québec",
      description: "Un gin boréal aux fraises du Québec — la douceur du fruit d'été s'unit au genièvre et aux botaniques du Nord pour un gin rosé, tendre et vif.",
      notes: { nez: "Fraise fraîche et genièvre, pointe florale.", bouche: "Juteuse et tendre, la fraise sur une trame résineuse.", finale: "Vive et fruitée, délicatement sèche." },
      botIntro: "La fraise du Québec rejoint le genièvre et les botaniques boréales.",
      bots: ["Genièvre", "Fraise du Québec", "Épinette noire", "Thé du Labrador", "Angélique", "Coriandre", "Baies roses"],
      serve: { meta: "Servi long · 5 min", name: "La Fraise", nameAccent: "Spritz", ing: [{ name: "Gin Fraises", q: "45 ml" }, { name: "Eau pétillante", q: "90 ml" }, { name: "Jus de lime", q: "15 ml" }, { name: "Fraises fraîches", q: "au goût" }, { name: "Glace", q: "au goût" }], steps: ["Remplir un verre de glace et de fraises.", "Verser le gin et la lime.", "Allonger d'eau pétillante et remuer."] }
    },
    "coaticook-vanille": {
      brand: "Cherry River", house: "cr", pill: "Coaticook Vanille", abv: "16 % vol.",
      chips: ["16 % alc./vol", "750 ml", "Crème glacée", "Lait du Québec"],
      eyebrow: "Crème alcoolisée · Vanille", nameMain: "Crème", nameAccent: "Coaticook",
      title: "Crème Coaticook Vanille", short: "Crème glacée à la vanille",
      origine: "Coaticook, Québec", caption: "Crème alcoolisée · Lait du Québec",
      description: "Une crème alcoolisée gourmande née de la célèbre crème glacée à la vanille de Coaticook. Onctueuse et réconfortante, à savourer bien froide.",
      notes: { nez: "Vanille et crème fraîche, note lactée gourmande.", bouche: "Onctueuse et douce, crème glacée à la vanille en bouche.", finale: "Longue et veloutée, sur la vanille." },
      botIntro: "Élaborée à partir de crème glacée à la vanille de Coaticook et de lait du Québec.",
      bots: ["Crème glacée vanille", "Lait du Québec", "Vanille", "Sucre de canne", "Alcool de grain"],
      serve: { meta: "Bien froide · 2 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Crème Coaticook", q: "60 ml" }, { name: "Gros glaçon", q: "1" }, { name: "Copeaux de chocolat", q: "au goût" }], steps: ["Verser la crème bien froide sur un gros glaçon.", "Râper un peu de chocolat sur le dessus.", "Déguster en digestif."] }
    },
    "liqueur-whisky": {
      brand: "Opémiska", house: "ope", pill: "Liqueur de whisky", abv: "30 % vol.",
      chips: ["30 % alc./vol", "750 ml", "À l'érable", "Petits lots"],
      eyebrow: "Liqueur · De whisky à l'érable", nameMain: "Liqueur", nameAccent: "de Whisky",
      title: "Opémiska Liqueur de Whisky", short: "Whisky à l'érable",
      origine: "Forêt boréale, QC", caption: "Signé Opémiska · À l'érable du Québec",
      description: "Une liqueur de whisky à l'érable du Québec — la chaleur du whisky adoucie par l'érable pur, pour une gorgée boisée et réconfortante.",
      notes: { nez: "Érable et whisky, bois doux et vanille.", bouche: "Ronde et sucrée, l'érable enveloppe le whisky.", finale: "Chaleureuse et boisée, longue sur l'érable." },
      botIntro: "Le whisky rencontre l'érable pur du Québec dans une liqueur d'assemblage.",
      bots: ["Whisky", "Érable du Québec", "Fût de chêne", "Vanille", "Épices douces"],
      serve: { meta: "Sur glace · 2 min", name: "Le Boréal", nameAccent: "Old Fashioned", ing: [{ name: "Liqueur de whisky", q: "60 ml" }, { name: "Amers aromatiques", q: "1 trait" }, { name: "Zeste d'orange", q: "1" }, { name: "Gros glaçon", q: "1" }], steps: ["Verser la liqueur sur un gros glaçon.", "Ajouter un trait d'amers.", "Exprimer le zeste d'orange et garnir."] }
    },
    "rtd-mojito": {
      brand: "Cherry River", house: "cr", pill: "Rhum Mojito", abv: "7 % vol.",
      chips: ["7 % alc./vol", "355 ml", "À base de rhum", "Prêt à boire"],
      eyebrow: "Prêt-à-boire · Rhum Mojito", nameMain: "Rhum", nameAccent: "Mojito",
      title: "Cocktail Rhum Mojito", short: "Rhum, menthe & lime",
      origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml",
      description: "Un vrai mojito en canette : rhum, menthe fraîche et lime, pétillant et rafraîchissant. Prêt à savourer, il suffit d'ouvrir.",
      notes: { nez: "Menthe fraîche et lime, souffle de rhum.", bouche: "Vive et pétillante, menthe et agrume désaltérants.", finale: "Nette et fraîche." },
      botIntro: "Un cocktail préparé à base de rhum, de menthe et de lime.",
      bots: ["Rhum", "Menthe", "Lime", "Eau pétillante"],
      serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Rhum Mojito", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Menthe & lime", q: "garniture" }], steps: ["Ouvrir et verser sur un verre de glace.", "Garnir de menthe fraîche et d'une lime.", "Servir aussitôt."] }
    },
    "rtd-cosmo": {
      brand: "Cherry River", house: "cr", pill: "Cosmopolitain", abv: "7 % vol.",
      chips: ["7 % alc./vol", "355 ml", "À base de vodka", "Prêt à boire"],
      eyebrow: "Prêt-à-boire · Cosmopolitain", nameMain: "Cosmo", nameAccent: "politain",
      title: "Cocktail Cosmopolitain", short: "Vodka, canneberge & lime",
      origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml",
      description: "Le classique cosmopolitain en canette : vodka, canneberge et lime, élégant et acidulé. Prêt à servir, bien frais.",
      notes: { nez: "Canneberge et lime, fraîcheur acidulée.", bouche: "Vive et fruitée, équilibre sucré-acide.", finale: "Nette et sèche." },
      botIntro: "Un cocktail à base de vodka, de canneberge et de lime.",
      bots: ["Vodka", "Canneberge", "Lime", "Triple sec"],
      serve: { meta: "Bien froid · 1 min", name: "En", nameAccent: "coupe", ing: [{ name: "Cosmopolitain", q: "1 canette" }, { name: "Glace", q: "optionnel" }, { name: "Zeste de lime", q: "garniture" }], steps: ["Réfrigérer puis verser dans une coupe.", "Garnir d'un zeste de lime.", "Servir aussitôt."] }
    },
    "rtd-margarita": {
      brand: "Cherry River", house: "cr", pill: "Margarita", abv: "7 % vol.",
      chips: ["7 % alc./vol", "355 ml", "À base de tequila", "Prêt à boire"],
      eyebrow: "Prêt-à-boire · Margarita", nameMain: "Marga", nameAccent: "rita",
      title: "Cocktail Margarita", short: "Tequila, lime & agave",
      origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml",
      description: "La margarita en canette : tequila, lime et agave, franche et ensoleillée. Prête à verser sur glace, bord de sel en option.",
      notes: { nez: "Lime et agave, éclat d'agrume.", bouche: "Vive et franche, tequila et lime.", finale: "Sèche et fraîche." },
      botIntro: "Un cocktail à base de tequila, de lime et d'agave.",
      bots: ["Tequila", "Lime", "Agave", "Triple sec"],
      serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Margarita", q: "1 canette" }, { name: "Sel", q: "bord de verre" }, { name: "Lime", q: "garniture" }], steps: ["Givrer le bord du verre de sel.", "Verser sur glace.", "Garnir d'une tranche de lime."] }
    },
    "rtd-rhum-cola": {
      brand: "Cherry River", house: "cr", pill: "Rhum & Cola", abv: "7 % vol.",
      chips: ["7 % alc./vol", "355 ml", "À base de rhum", "Prêt à boire"],
      eyebrow: "Prêt-à-boire · Rhum & Cola", nameMain: "Rhum", nameAccent: "& Cola",
      title: "Cocktail Rhum & Cola", short: "Rhum & cola",
      origine: "Magog, Québec", caption: "Cocktail prêt-à-boire · 355 ml",
      description: "L'indémodable rhum & cola en canette, avec une pointe de lime. Pétillant et gourmand, prêt à savourer bien froid.",
      notes: { nez: "Cola et rhum, note de lime.", bouche: "Pétillante et gourmande, ronde et sucrée.", finale: "Fraîche et vive." },
      botIntro: "Un cocktail à base de rhum, de cola et de lime.",
      bots: ["Rhum", "Cola", "Lime"],
      serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Rhum & Cola", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Lime", q: "garniture" }], steps: ["Verser sur un verre de glace.", "Garnir d'un quartier de lime.", "Servir aussitôt."] }
    },
    "na-mojito": {
      brand: "Cherry River", house: "cr", pill: "Mojito", abv: "0 % vol.",
      chips: ["0 % alc./vol", "355 ml", "Sans alcool", "Prêt à boire"],
      eyebrow: "Sans alcool · Mojito", nameMain: "Mojito", nameAccent: "sans alcool",
      title: "Mocktail Mojito", short: "Menthe & lime",
      origine: "Magog, Québec", caption: "Mocktail prêt-à-boire · 355 ml",
      description: "Toute la fraîcheur d'un mojito, sans alcool : menthe et lime pétillantes. Rafraîchissant et léger, prêt à savourer.",
      notes: { nez: "Menthe et lime vives.", bouche: "Pétillante et fraîche, désaltérante.", finale: "Nette et légère." },
      botIntro: "Une limonade pétillante à saveur de menthe et de lime.",
      bots: ["Eau pétillante", "Menthe", "Lime", "Sucre de canne"],
      serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Mojito sans alcool", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Menthe & lime", q: "garniture" }], steps: ["Verser sur glace.", "Garnir de menthe et de lime.", "Servir aussitôt."] }
    },
    "na-melon": {
      brand: "Cherry River", house: "cr", pill: "Melon d'eau & Lime", abv: "0 % vol.",
      chips: ["0 % alc./vol", "355 ml", "Sans alcool", "Prêt à boire"],
      eyebrow: "Sans alcool · Melon d'eau & lime", nameMain: "Melon", nameAccent: "d'eau",
      title: "Mocktail Melon d'eau & Lime", short: "Melon d'eau & lime",
      origine: "Magog, Québec", caption: "Mocktail prêt-à-boire · 355 ml",
      description: "Un mocktail estival melon d'eau et lime, pétillant et juteux. Zéro alcool, toute la saveur — prêt à savourer bien froid.",
      notes: { nez: "Melon d'eau et lime, fraîcheur estivale.", bouche: "Juteuse et pétillante, douce et acidulée.", finale: "Fraîche et nette." },
      botIntro: "Une limonade pétillante à saveur de melon d'eau et de lime.",
      bots: ["Eau pétillante", "Melon d'eau", "Lime", "Sucre de canne"],
      serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Melon d'eau & Lime", q: "1 canette" }, { name: "Glace", q: "au goût" }, { name: "Melon d'eau", q: "garniture" }], steps: ["Verser sur glace.", "Garnir d'un cube de melon d'eau.", "Servir aussitôt."] }
    },
    "na-margarita": {
      brand: "Cherry River", house: "cr", pill: "Margarita", abv: "0 % vol.",
      chips: ["0 % alc./vol", "355 ml", "Sans alcool", "Prêt à boire"],
      eyebrow: "Sans alcool · Margarita", nameMain: "Marga", nameAccent: "rita",
      title: "Mocktail Margarita", short: "Lime & agave",
      origine: "Magog, Québec", caption: "Mocktail prêt-à-boire · 355 ml",
      description: "La margarita sans alcool : lime et agave, franche et ensoleillée. Prête à verser sur glace, bord de sel en option.",
      notes: { nez: "Lime et agave.", bouche: "Vive et franche, acidulée.", finale: "Sèche et fraîche." },
      botIntro: "Une limonade pétillante à saveur de lime et d'agave.",
      bots: ["Eau pétillante", "Lime", "Agave"],
      serve: { meta: "Bien froid · 1 min", name: "Sur", nameAccent: "glace", ing: [{ name: "Margarita sans alcool", q: "1 canette" }, { name: "Sel", q: "bord de verre" }, { name: "Lime", q: "garniture" }], steps: ["Givrer le bord de sel.", "Verser sur glace.", "Garnir de lime."] }
    },
    "rhum-ambre": {
      brand: "Cherry River", house: "cr", pill: "Ambré",
      eyebrow: "Rhum · Ambré", nameMain: "Rhum", nameAccent: "Ambré",
      title: "Rhum Ambré", short: "Rhum ambré",
      origine: "Magog, Québec", caption: "Assemblé & embouteillé à Magog, QC",
      chips: ["40 % alc./vol", "750 ml", "Vieilli en fût", "Petits lots"],
      description: "Un rhum ambré tout en rondeur, patiemment reposé en fût de chêne. Nougat, vanille et raisin s'y déploient — le fruit d'un travail de maître assembleur.",
      notes: { nez: "Vanille, nougat et bois de chêne, une pointe de raisin sec.", bouche: "Ronde et enveloppante, caramel et épices douces sur une trame boisée.", finale: "Longue et chaleureuse, persistante sur le fût et la vanille." },
      botIntro: "Assemblé à partir de rhums choisis puis reposé en fût, il gagne en profondeur avec le temps.",
      bots: ["Canne à sucre", "Fût de chêne", "Vanille", "Nougat", "Raisin", "Épices douces", "Caramel"],
      serve: { meta: "Servi sur glace · 3 min", name: "Le Old", nameAccent: "Fashioned", ing: [{ name: "Rhum Ambré", q: "60 ml" }, { name: "Sirop d'érable", q: "10 ml" }, { name: "Amers aromatiques", q: "2 traits" }, { name: "Zeste d'orange", q: "1" }, { name: "Gros glaçon", q: "1" }], steps: ["Déposer un gros glaçon dans un verre à old fashioned.", "Verser le rhum, le sirop et les amers, puis remuer lentement.", "Exprimer le zeste d'orange au-dessus du verre et garnir."] }
    },
    "rhum-epice": {
      brand: "Cherry River", house: "cr", pill: "Épicé",
      eyebrow: "Rhum · Épicé", nameMain: "Rhum", nameAccent: "Épicé",
      title: "Rhum Épicé", short: "Rhum épicé",
      origine: "Magog, Québec", caption: "Assemblé & embouteillé à Magog, QC",
      chips: ["40 % alc./vol", "750 ml", "Épices boréales", "Petits lots"],
      description: "Un rhum épicé, habile métissage de rondeur et d'audace. Myrique baumier, thé du Labrador, vanille et muscade s'entrelacent pour une signature boréale et gourmande.",
      notes: { nez: "Vanille, muscade et cannelle, souffle boréal de myrique baumier.", bouche: "Épicée et enveloppante, le thé du Labrador rehausse une base ronde.", finale: "Chaleureuse et longue, boisée et délicatement poivrée." },
      botIntro: "Un métissage d'épices et de botaniques boréales, marié à un rhum reposé en fût.",
      bots: ["Canne à sucre", "Fût de chêne", "Vanille", "Muscade", "Cannelle", "Myrique baumier", "Thé du Labrador"],
      serve: { meta: "Servi long · 3 min", name: "Le Rhum", nameAccent: "& Cola", ing: [{ name: "Rhum Épicé", q: "45 ml" }, { name: "Cola", q: "120 ml" }, { name: "Jus de lime frais", q: "10 ml" }, { name: "Quartier de lime", q: "1" }, { name: "Glace", q: "au goût" }], steps: ["Remplir un grand verre de glace.", "Verser le rhum et la lime, puis allonger de cola.", "Remuer et garnir d'un quartier de lime."] }
    },
    "vodka-averse": {
      brand: "Averse", house: "averse", pill: "Averse Premium",
      eyebrow: "Vodka · Supérieure premium", nameMain: "Vodka", nameAccent: "Averse",
      title: "Vodka Averse Premium", short: "Supérieure premium",
      origine: "Magog, Québec", caption: "Distillée & embouteillée à Magog, QC",
      description: "Une vodka supérieure d'une pureté cristalline, distillée avec soin pour une texture soyeuse et une neutralité parfaite. La base idéale des grands cocktails.",
      notes: { nez: "Net et discret, une pureté minérale, soupçon de céréale douce.", bouche: "Soyeuse et ronde, d'une propreté remarquable, sans agressivité.", finale: "Nette et fraîche, élégante et sans amertume." },
      botIntro: "Une vodka pensée pour la pureté : peu d'éléments, une exécution irréprochable.",
      bots: ["Grain québécois", "Eau de source", "Distillation multiple", "Filtration sur charbon", "Sans sucre ajouté"],
      serve: { meta: "Servi sur glace · 3 min", name: "Le Moscow", nameAccent: "Mule", ing: [{ name: "Vodka Averse", q: "45 ml" }, { name: "Bière de gingembre", q: "120 ml" }, { name: "Jus de lime frais", q: "15 ml" }, { name: "Quartier de lime", q: "1" }, { name: "Glace", q: "au goût" }], steps: ["Remplir une tasse de cuivre de glace.", "Verser la vodka et la lime, allonger de bière de gingembre.", "Remuer et garnir d'un quartier de lime."] }
    },
    "vodka-erable": {
      brand: "Cherry River", house: "cr", pill: "Érable", abv: "41 % vol.",
      eyebrow: "Vodka · Aromatisée à l'érable", nameMain: "Vodka", nameAccent: "Érable",
      title: "Vodka Érable", short: "Aromatisée à l'érable",
      origine: "Magog, Québec", caption: "Distillée & embouteillée à Magog, QC",
      chips: ["41 % alc./vol", "750 ml", "Érable du Québec", "Petits lots"],
      description: "Une vodka aromatisée à l'érable du Québec — la douceur boisée du sirop rencontre la pureté d'une vodka supérieure. Un réconfort nordique en bouteille.",
      notes: { nez: "Érable franc, beurre et bois doux, soupçon de vanille.", bouche: "Douce et ronde, l'érable enveloppe sans jamais écœurer.", finale: "Chaleureuse et gourmande, sur une note boisée." },
      botIntro: "Une vodka supérieure mariée à l'érable pur du Québec, sans arôme artificiel.",
      bots: ["Grain québécois", "Érable du Québec", "Distillation multiple", "Eau de source", "Filtration sur charbon"],
      serve: { meta: "Frappé · 4 min", name: "L'Érable", nameAccent: "Sour", ing: [{ name: "Vodka Érable", q: "50 ml" }, { name: "Jus de citron frais", q: "25 ml" }, { name: "Sirop d'érable", q: "10 ml" }, { name: "Blanc d'œuf (option.)", q: "1" }, { name: "Glace", q: "au goût" }], steps: ["Frapper vigoureusement tous les ingrédients avec de la glace.", "Filtrer dans un verre rafraîchi.", "Garnir d'un trait d'amers ou d'une feuille."] }
    },
    "tequila-silver": {
      brand: "Cherry River", house: "cr", pill: "Silver",
      eyebrow: "Tequila · Silver", nameMain: "Tequila", nameAccent: "Silver",
      title: "Tequila Silver", short: "100 % agave",
      origine: "Jalisco, Mexique", caption: "Faite au Mexique · Choisie par Cherry River",
      chips: ["40 % alc./vol", "750 ml", "100 % agave", "Fait au Mexique"],
      description: "Une tequila silver 100 % agave bleu, vive et cristalline. Élaborée au Mexique, choisie pour la création de cocktails — fraîcheur d'agave et éclat végétal.",
      notes: { nez: "Agave frais, notes végétales et poivrées, zeste d'agrume.", bouche: "Vive et nette, l'agave éclate sur une trame minérale.", finale: "Fraîche et sèche, légèrement poivrée." },
      botIntro: "100 % agave bleu de Jalisco, non vieillie pour préserver l'éclat de l'agave.",
      bots: ["Agave bleu", "Terroir de Jalisco", "Cuisson lente", "Double distillation", "Non vieillie"],
      serve: { meta: "Frappé · 5 min", name: "La", nameAccent: "Margarita", ing: [{ name: "Tequila Silver", q: "50 ml" }, { name: "Triple sec", q: "20 ml" }, { name: "Jus de lime frais", q: "25 ml" }, { name: "Sel & glace", q: "au goût" }], steps: ["Givrer le bord du verre de sel.", "Frapper la tequila, le triple sec et la lime avec de la glace.", "Filtrer dans le verre et garnir d'une tranche de lime."] }
    },
    berries: {
      brand: "Cherry River", house: "cr", pill: "Petits fruits & basilic",
      eyebrow: "Gin · Petits fruits & basilic",
      nameMain: "Gin Petits Fruits", nameAccent: "& Basilic",
      title: "Gin Petits Fruits & Basilic", short: "Petits fruits & basilic",
      origine: "Magog, Québec", caption: "Distillé & embouteillé à Magog, QC",
      description: "Un gin vibrant où le genièvre rencontre les petits fruits des champs et le basilic frais cueilli à la main. Distillé en petits lots à Magog, il capture l'éclat d'un été québécois.",
      notes: {
        nez: "Genièvre net, éclats de fraise et de framboise, une pointe herbacée de basilic frais.",
        bouche: "Ronde et juteuse, les petits fruits s'ouvrent sur une trame d'agrumes et d'épices douces.",
        finale: "Longue et fraîche, le basilic signe un final vif, sec et résolument estival."
      },
      botIntro: "Chaque botanique est sélectionnée pour sa fraîcheur, puis distillée séparément afin d'en préserver l'expression la plus pure.",
      bots: ["Genièvre", "Fraise des champs", "Framboise", "Basilic frais", "Zeste d'agrume", "Coriandre", "Angélique"],
      serve: {
        meta: "Servi sur glace · 5 min", name: "Le Spritz", nameAccent: "Basilic",
        ing: [
          { name: "Gin Petits Fruits & Basilic", q: "45 ml" },
          { name: "Eau pétillante", q: "90 ml" },
          { name: "Jus de pamplemousse frais", q: "30 ml" },
          { name: "Sirop simple", q: "15 ml" },
          { name: "Basilic frais & glace", q: "au goût" }
        ],
        steps: [
          "Remplir un grand verre de glace et froisser quelques feuilles de basilic.",
          "Verser le gin, le jus de pamplemousse et le sirop, puis remuer.",
          "Allonger d'eau pétillante et garnir d'un bouquet de basilic."
        ]
      }
    },
    framboiselime: {
      brand: "Cherry River", house: "cr", pill: "Framboise & lime",
      eyebrow: "Gin · Framboise & lime",
      nameMain: "Gin Framboise", nameAccent: "& Lime",
      title: "Gin Framboise & Lime", short: "Framboise & lime",
      origine: "Magog, Québec", caption: "Distillé & embouteillé à Magog, QC",
      description: "Un gin rosé et gourmand où la framboise mûre s'unit à la fraîcheur zestée de la lime. Distillé en petits lots à Magog, il éclate de fruit sans jamais renier sa colonne de genièvre.",
      notes: {
        nez: "Framboise mûre et bonbon acidulé, zeste de lime vif, genièvre en trame de fond.",
        bouche: "Gourmande et juteuse, la framboise se tend sur l'acidité franche de la lime.",
        finale: "Nette et tonique, elle laisse une fraîcheur rose et désaltérante."
      },
      botIntro: "Framboise et lime sont distillées avec le genièvre pour un gin fruité, jamais sucré — l'équilibre exact entre gourmandise et vivacité.",
      bots: ["Genièvre", "Framboise", "Lime", "Zeste de lime", "Baies roses", "Coriandre", "Angélique"],
      serve: {
        meta: "Servi sur glace · 5 min", name: "Le Framboise", nameAccent: "Fizz",
        ing: [
          { name: "Gin Framboise & Lime", q: "45 ml" },
          { name: "Jus de lime frais", q: "20 ml" },
          { name: "Sirop de framboise", q: "15 ml" },
          { name: "Soda", q: "90 ml" },
          { name: "Framboises fraîches & glace", q: "au goût" }
        ],
        steps: [
          "Dans un verre rempli de glace, déposer quelques framboises fraîches.",
          "Verser le gin, le jus de lime et le sirop de framboise, puis remuer.",
          "Allonger de soda et garnir d'une lime et de framboises."
        ]
      }
    },
    limegingembre: {
      brand: "Cherry River", house: "cr", pill: "Lime & gingembre",
      eyebrow: "Gin · Lime & gingembre",
      nameMain: "Gin Lime", nameAccent: "& Gingembre",
      title: "Gin Lime & Gingembre", short: "Lime & gingembre",
      origine: "Magog, Québec", caption: "Distillé & embouteillé à Magog, QC",
      description: "La vivacité de la lime rencontre la chaleur du gingembre frais dans un gin tonique et épicé. Un profil audacieux, distillé en petits lots à Magog.",
      notes: {
        nez: "Lime zestée et gingembre piquant, genièvre franc, souffle poivré.",
        bouche: "Vive et épicée, la lime éclate sur une chaleur montante de gingembre.",
        finale: "Sèche et tonifiante, une longueur épicée qui réveille le palais."
      },
      botIntro: "Lime et gingembre frais sont distillés au cœur des botaniques pour un gin nerveux, épicé et résolument désaltérant.",
      bots: ["Genièvre", "Lime", "Gingembre frais", "Citronnelle", "Cardamome", "Coriandre", "Angélique"],
      serve: {
        meta: "Servi long · 5 min", name: "Le Gin", nameAccent: "Mule",
        ing: [
          { name: "Gin Lime & Gingembre", q: "45 ml" },
          { name: "Bière de gingembre", q: "90 ml" },
          { name: "Jus de lime frais", q: "15 ml" },
          { name: "Quartier de lime", q: "1" },
          { name: "Glace concassée", q: "au goût" }
        ],
        steps: [
          "Remplir une tasse de cuivre ou un verre de glace concassée.",
          "Verser le gin et le jus de lime, puis allonger de bière de gingembre.",
          "Remuer brièvement et garnir d'un quartier de lime."
        ]
      }
    },
    pamplemousse: {
      brand: "Cherry River", house: "cr", pill: "Pamplemousse rose",
      eyebrow: "Gin · Pamplemousse rose",
      nameMain: "Gin Pamplemousse", nameAccent: "Rose",
      title: "Gin Pamplemousse Rose", short: "Pamplemousse rose",
      origine: "Magog, Québec", caption: "Distillé & embouteillé à Magog, QC",
      description: "Le pamplemousse rose, juteux et délicatement amer, habille ce gin d'une fraîcheur élégante. Distillé en petits lots à Magog pour un apéritif tout en finesse.",
      notes: {
        nez: "Pamplemousse rose éclatant, fleur d'agrume, genièvre délicat.",
        bouche: "Juteuse et soyeuse, l'amertume fine du pamplemousse s'appuie sur les baies roses.",
        finale: "Fraîche et légèrement amère, d'une élégance tout en retenue."
      },
      botIntro: "Le pamplemousse rose est distillé avec le genièvre et les baies roses pour un gin d'apéritif, frais et délicatement amer.",
      bots: ["Genièvre", "Pamplemousse rose", "Zeste d'agrume", "Baies roses", "Cardamome", "Coriandre", "Angélique"],
      serve: {
        meta: "Servi sur glace · 5 min", name: "Le Paloma", nameAccent: "Rosé",
        ing: [
          { name: "Gin Pamplemousse Rose", q: "45 ml" },
          { name: "Jus de pamplemousse rose", q: "60 ml" },
          { name: "Jus de lime frais", q: "10 ml" },
          { name: "Soda", q: "60 ml" },
          { name: "Pincée de sel & glace", q: "au goût" }
        ],
        steps: [
          "Givrer le bord du verre de sel et le remplir de glace.",
          "Verser le gin, le jus de pamplemousse et la lime, puis remuer.",
          "Allonger de soda et garnir d'une tranche de pamplemousse."
        ]
      }
    },
    boreal: {
      brand: "Opémiska", house: "ope", pill: "Boréal",
      eyebrow: "Gin boréal · Édition Opémiska",
      nameMain: "Gin", nameAccent: "Boréal",
      title: "Opémiska Gin Boréal", short: "Épinette & forêt boréale",
      origine: "Forêt boréale, QC", caption: "Signé Opémiska · Distillé au Québec",
      description: "Né de la forêt boréale québécoise, ce gin puise dans l'épinette noire et les botaniques sauvages du Nord. Signé Opémiska, distillé en petits lots — une ode au territoire.",
      notes: {
        nez: "Forêt fraîche : épinette noire, résine douce et genièvre profond.",
        bouche: "Boisée et vive, notes de conifère, de thé du Labrador et de poivre sauvage.",
        finale: "Longue et minérale, une signature boréale sèche et élégante."
      },
      botIntro: "Des botaniques cueillies au cœur de la forêt boréale rejoignent le genièvre pour un gin de terroir, sauvage et racé.",
      bots: ["Genièvre", "Épinette noire", "Thé du Labrador", "Myrique baumier", "Comptonie voyageuse", "Poivre des dunes", "Angélique"],
      serve: {
        meta: "Servi long · 5 min", name: "Le Boréal", nameAccent: "Tonic",
        ing: [
          { name: "Opémiska Gin Boréal", q: "45 ml" },
          { name: "Tonic de qualité", q: "120 ml" },
          { name: "Brin de romarin", q: "1" },
          { name: "Twist de citron", q: "1" },
          { name: "Glace", q: "au goût" }
        ],
        steps: [
          "Remplir un grand verre à gin de glace bien froide.",
          "Verser le gin puis allonger doucement de tonic.",
          "Garnir d'un brin de romarin et d'un twist de citron."
        ]
      }
    }
  };
