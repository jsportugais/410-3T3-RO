// Tirage aléatoire d'une question difficile — séance 12, bloc 3.
//
// Chaque tirage choisit au hasard, à chances égales, une des questions qui
// n'ont pas encore été tirées. Les questions tirées sont mémorisées dans le
// navigateur : elles ne reviennent pas, même après un rechargement de la page,
// tant que personne ne clique sur « Recommencer le tirage ».

(function () {
  "use strict";

  var BANQUE = [
    {
      type: "La question hostile",
      consigne: "Posez cette question d’un ton sec, sans être impoli ou impolie.",
      questions: [
        "Honnêtement, qu’est-ce qui vous donne la compétence pour défendre cette idée?",
        "Votre idée centrale me paraît évidente. Pourquoi faudrait-il une présentation entière pour la défendre?",
        "Je ne vois pas en quoi cette idée nous concerne. Pourquoi devrait-on s’y intéresser?",
        "Votre idée me semble naïve. Avez-vous pensé aux personnes qui ne sont pas d’accord avec vous?",
        "Avez-vous choisi cette idée parce qu’elle vous intéresse, ou seulement parce qu’elle était facile?",
        "On a entendu cette idée cent fois. Qu’est-ce que vous apportez de nouveau?",
        "Votre idée repose sur une opinion personnelle. Pourquoi devrait-on vous croire?",
        "Ce que vous dites contredit tout ce que j’ai entendu jusqu’ici. Avez-vous vraiment vérifié?",
        "Franchement, votre idée ne tient pas debout. Qu’est-ce que vous répondez à ça?",
        "Ne trouvez-vous pas que votre idée simplifie beaucoup trop la réalité?",
        "Vos sources disent exactement ce que vous vouliez entendre. Les avez-vous choisies pour ça?",
        "Si vous vous trompez, des gens vous auront cru pour rien. Ça ne vous dérange pas?",
        "Votre idée ne me convainc pas du tout. Que pouvez-vous dire pour me faire changer d’avis?"
      ]
    },
    {
      type: "La question longue et confuse",
      consigne: "Lisez cette question lentement, avec des hésitations, comme si vous la cherchiez en parlant.",
      questions: [
        "Quand vous dites… en fait, je me demandais, parce que j’ai déjà lu quelque chose là-dessus, pas exactement pareil, mais si on prend votre idée, est-ce que ça veut dire que finalement tout dépend du contexte, ou est-ce que c’est plus général?",
        "J’ai une question, mais c’est un peu compliqué. Disons que quelqu’un dans ma situation, ou en fait dans une autre situation, voulait se fier à votre idée, est-ce que ça marcherait aussi, ou pas vraiment, ou dans certains cas seulement?",
        "Votre idée, est-ce qu’elle vaut pour tout le monde, ou pour certaines personnes, mais aussi peut-être à certains moments, parce que les choses changent, et si on regarde les causes, et peut-être les conséquences, est-ce que ce serait encore vrai?",
        "J’ai peut-être mal compris, mais votre idée, quand vous la dites, on dirait qu’elle veut dire une chose, puis quand j’y repense, on dirait qu’elle en veut dire une autre, alors je me demande laquelle des deux c’est, ou si c’est moi qui n’ai pas suivi.",
        "Moi, ce que je me demande, c’est, bon, peut-être que ça n’a pas rapport, mais mon cousin m’a déjà parlé de quelque chose comme ça, et lui disait que c’était plutôt l’inverse, alors est-ce que c’est lui qui se trompe, ou bien ça dépend?",
        "Si on prend votre idée, et qu’on la met à côté d’une autre idée, pas nécessairement contraire, mais différente, disons plus large, est-ce qu’elles pourraient fonctionner ensemble, ou il faudrait choisir, ou peut-être les deux?",
        "Est-ce que votre idée, au départ, vous la pensiez déjà, ou ça a changé en cours de route, parce que moi, souvent, quand je fais une recherche, je change d’avis, et je me demande si c’est normal ou si ça veut dire que l’idée n’est pas solide?",
        "Dans le fond, ce que vous dites, est-ce que c’est plus une question de chiffres, ou de valeurs, ou d’opinion, ou peut-être de tout ça à la fois, mais si on devait en choisir un, ce serait lequel, et pourquoi pas les autres?",
        "Votre idée m’a fait penser à un film que j’ai vu, je ne me souviens plus du titre, mais c’était à peu près le même genre de situation, alors est-ce que ça va dans le même sens que vous, ou pas du tout?",
        "Est-ce que votre idée, c’est vrai partout, ou seulement ici, ou plutôt pour certaines personnes, parce qu’il me semble que ce n’est pas pareil pour tout le monde, mais en même temps, peut-être que oui, je ne sais pas?",
        "Je voulais savoir, parce que c’est un peu flou pour moi, votre idée, est-ce que c’est quelque chose qu’on devrait faire, ou plutôt quelque chose qu’on devrait comprendre, ou les deux, et dans ce cas, lequel en premier?",
        "Si jamais, dans quelques années, la situation change, ce qui pourrait arriver, ou pas, est-ce que votre idée serait encore valable, ou est-ce qu’il faudrait la revoir, et à ce moment-là, qui devrait s’en occuper?"
      ]
    },
    {
      type: "La question dont on ignore la réponse",
      consigne: "Posez cette question avec assurance, comme si la réponse allait de soi.",
      questions: [
        "Que disent les études les plus récentes, celles publiées cette année?",
        "Quel pourcentage de la population partage votre position, selon les derniers sondages?",
        "Qui a été la première personne à défendre cette idée?",
        "Que pensait-on de cette question il y a cinquante ans?",
        "Existe-t-il une étude qui contredit votre idée? Laquelle?",
        "Qui a financé les recherches sur lesquelles vos sources s’appuient?",
        "Quand votre principale source a-t-elle été mise à jour pour la dernière fois?",
        "Combien d’études ont été publiées sur cette question depuis dix ans?",
        "Quelle est la source la plus citée sur cette question?",
        "Quels spécialistes s’opposent à votre idée, et comment s’appellent-ils ou elles?",
        "Dans combien de pays votre position est-elle majoritaire?",
        "Quel est le chiffre le plus important à connaître sur cette question, et d’où vient-il?",
        "Comment cette question est-elle présentée dans les manuels scolaires d’aujourd’hui?"
      ]
    },
    {
      type: "L’enchaînement de questions",
      consigne: "Posez la première question, puis enchaînez les suivantes sans laisser la parole aux autres.",
      questions: [
        ["Pourquoi avez-vous choisi cette idée?", "Et pourquoi pas une autre?", "Mais vous ne trouvez pas que…?", "Une dernière, promis."],
        ["Sur quoi appuyez-vous votre idée?", "Et c’est récent?", "Vous avez vérifié ailleurs?", "Où, exactement?"],
        ["Que devrait-on retenir de votre idée?", "Seulement ça?", "Et pourquoi est-ce important?", "Donc, au fond, ça ne change rien pour nous?"],
        ["Croyez-vous vraiment à votre idée?", "Depuis quand?", "Qu’est-ce qui vous ferait changer d’avis?", "Laissez-moi vous poser une autre question."],
        ["Qui n’est pas d’accord avec vous?", "Pourquoi, selon vous?", "Ces personnes ont-elles tort?", "Toutes?"],
        ["Quelle est votre meilleure preuve?", "Et la deuxième?", "Laquelle est la plus faible?", "Alors pourquoi la garder?"],
        ["Qu’est-ce qui pourrait prouver que vous avez tort?", "Est-ce déjà arrivé?", "Comment le savez-vous?", "Et si ça arrivait demain?"],
        ["Avez-vous changé d’avis pendant votre recherche?", "Sur quel point?", "Pourquoi?", "Et maintenant, pourriez-vous changer encore?"],
        ["Qu’avez-vous appris de plus étonnant?", "Pourquoi est-ce étonnant?", "Vous ne vous y attendiez pas?", "Et votre entourage, qu’en pense-t-il?"],
        ["Qu’arrive-t-il si les gens ne vous croient pas?", "Pour qui est-ce grave?", "Vraiment?", "Et vous, ça vous inquiète?"],
        ["Quel mot de votre idée centrale est le plus important?", "Pourquoi celui-là?", "Et si on le retirait?", "Votre idée tiendrait-elle encore?"],
        ["Comment avez-vous trouvé cette idée?", "Quelqu’un vous l’a suggérée?", "Vous en aviez d’autres?", "Pourquoi ne pas les avoir choisies?"]
      ]
    }
  ];

  var TOTAL = BANQUE.reduce(function (somme, t) { return somme + t.questions.length; }, 0);

  var CLE = "tirage-questions-seance-12";

  function hasard(n) {
    return Math.floor(Math.random() * n);
  }

  // Identifiants « type-question » des questions déjà tirées. Le navigateur
  // peut refuser le stockage (navigation privée, données bloquées) : le tirage
  // fonctionne alors quand même, mais seulement jusqu'au rechargement.
  function lire() {
    try {
      var valeur = JSON.parse(localStorage.getItem(CLE) || "[]");
      return Array.isArray(valeur) ? valeur : [];
    } catch (e) {
      return [];
    }
  }

  function ecrire(tirees) {
    try {
      localStorage.setItem(CLE, JSON.stringify(tirees));
    } catch (e) {
      // Stockage indisponible : la mémoire se limite à la page ouverte.
    }
  }

  function initialiser(racine) {
    var bouton = racine.querySelector("[data-tirage-bouton]");
    var boutonZero = racine.querySelector("[data-tirage-zero]");
    var resultat = racine.querySelector("[data-tirage-resultat]");
    var champType = racine.querySelector("[data-tirage-type]");
    var champConsigne = racine.querySelector("[data-tirage-consigne]");
    var champQuestion = racine.querySelector("[data-tirage-question]");
    var champCompte = racine.querySelector("[data-tirage-compte]");

    var tirees = lire();

    function restantes() {
      var liste = [];
      BANQUE.forEach(function (t, i) {
        t.questions.forEach(function (_, j) {
          var id = i + "-" + j;
          if (tirees.indexOf(id) === -1) {
            liste.push([i, j]);
          }
        });
      });
      return liste;
    }

    function etat() {
      var reste = TOTAL - tirees.length;
      bouton.disabled = reste === 0;
      bouton.textContent = reste === 0
        ? "Toutes les questions ont été tirées"
        : (tirees.length === 0 ? "Tirer une question" : "Tirer une autre question");
      boutonZero.hidden = tirees.length === 0;
    }

    function afficher(t, j) {
      var question = BANQUE[t].questions[j];
      champType.textContent = BANQUE[t].type;
      champConsigne.textContent = BANQUE[t].consigne;
      champQuestion.textContent = "";

      if (Array.isArray(question)) {
        var ol = document.createElement("ol");
        question.forEach(function (q) {
          var li = document.createElement("li");
          li.textContent = q;
          ol.appendChild(li);
        });
        champQuestion.appendChild(ol);
      } else {
        var p = document.createElement("p");
        p.textContent = question;
        champQuestion.appendChild(p);
      }

      champCompte.textContent = "Question " + tirees.length + " sur " + TOTAL;
      resultat.hidden = false;
    }

    function tirer() {
      var liste = restantes();
      if (liste.length === 0) {
        etat();
        return;
      }
      var choix = liste[hasard(liste.length)];
      tirees.push(choix[0] + "-" + choix[1]);
      ecrire(tirees);
      afficher(choix[0], choix[1]);
      etat();
    }

    function recommencer() {
      tirees = [];
      ecrire(tirees);
      resultat.hidden = true;
      etat();
      bouton.focus();
    }

    etat();
    bouton.addEventListener("click", tirer);
    boutonZero.addEventListener("click", recommencer);
  }

  document.querySelectorAll("[data-tirage]").forEach(initialiser);
})();
