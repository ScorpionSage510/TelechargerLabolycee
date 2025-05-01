// ^ uBlockOrigin
// icone labolycée
// faire bouton afficher téléchargement (icone) au cas où
// clear loadingIndicator.id = 'loadingIndicator';
// bouton cliqué : ne pas refresh les boutons télécharger (if)
// Sélectionne tous les éléments contenant la classe spécifique.
// sélectionner ce que nous voulons marquer (cartes mentales => rouge, sans correction, tag => pH métrique)
// ne pas mettre bouton télécharger pour cartes
// si logiciel et mode automatique lancé, automatique si non, afficher tous les sujets et l'utilisateur doit appuyer sur un bouton (3 threads)


// Injecter le HTML pour les emojis dans la page
const emojiContainer = document.createElement('div');
emojiContainer.id = 'emojiContainer';
emojiContainer.style.position = 'fixed';
emojiContainer.style.bottom = '20px';
emojiContainer.style.left = '20px';
emojiContainer.style.fontSize = '24px'; // Taille des emojis
emojiContainer.innerHTML = `
    <span id="connectionStatus">❌</span> <!-- Émoji de connexion -->
    <!-- <span id="retryStatus" style="display: none;">🔄</span>  Émoji de réessai -->
`;

document.body.appendChild(emojiContainer); // Ajouter le conteneur au corps de la page


// const socket = new WebSocket('ws://localhost:6789');

// socket.onopen = () => {
//     console.log('Connexion établie avec le serveur.');
// };
// socket.onmessage = (event) => {
//     document.getElementById('response').innerText = event.data;
//     console.log('Réponse du serveur:', event.data);
// };

let socket;
let reconnectInterval = 5000; // 5 secondes

function connect() {
    socket = new WebSocket('ws://localhost:6789');

    socket.onopen = () => {
        console.log('Connexion établie avec le serveur.');
        document.getElementById('connectionStatus').innerText = '✓'; // Afficher émoji de connexion réussie
        // document.getElementById('retryStatus').innerText = ''; // Effacer émoji de réessai
    };

    try{
    socket.onmessage = (event) => {
      console.log('Réponse du serveur:', event.data);
      if (event.data=="fichier telecharge avec succes"){
        const indicator = document.getElementById('loadingIndicator');
        console.log(indicator);
        indicator.textContent = '✅';
        setTimeout(() => {
          loadingIndicator.remove();
      }, 1000); 
        
      }
        // document.getElementById('response').innerText = event.data;
    };
  } catch(e){}
  
    socket.onclose = (event) => {
      console.log('Connexion fermée. Tentative de reconnexion...');
      document.getElementById('connectionStatus').innerText = '❌'; // Afficher émoji de connexion échouée
      // document.getElementById('retryStatus').style.display = 'inline'; // Afficher émoji de réessai
      
      // Démarrer la reconnexion après l'intervalle
      setTimeout(() => {
          connect();
          // document.getElementById('retryStatus').style.display = 'none'; // Cacher l'émoji de réessai après la tentative de reconnexion
      }, reconnectInterval); // Attendre 5 secondes avant de tenter de se reconnecter
  };

//   if (socket && socket.readyState === WebSocket.OPEN) {
// try{
//     // socket.onerror = (error) => {
//     //     console.error('Erreur de WebSocket:', error);
//     //     document.getElementById('connectionStatus').innerText = '❌'; // Afficher émoji de connexion échouée
//     //     document.getElementById('retryStatus').innerText = '🔄'; // Afficher émoji de réessai
//     // };
//   } catch(e){}
// }
}

// Appeler la fonction connect pour établir la connexion
connect();

let items = document.querySelectorAll(".masonry-item.col-md-6.col-xl-4.cols-sm-12.pt-0.px-0.px-md-2.pb-3.views-row");
let totalItems = items.length;
if(totalItems>0){
  let redCount = 0;

  console.log(`Total d'éléments trouvés: ${totalItems}`);

  items.forEach((item, index) => {
    if (item.textContent.includes("Correction non disponible") || item.textContent.includes("Corrigés non disponi") || item.textContent.includes("Corrigé non disponi")) {
      item.style.backgroundColor = "red"; // Change la couleur de fond de l'élément en rouge.
      // item.style.color = "white"; // Change la couleur du texte pour plus de lisibilité.
      redCount++;
      console.log(`Élément ${index + 1} sur ${totalItems} mis en rouge.`);
    }
  });

  // Affiche le nombre total d'éléments modifiés en rouge.
  console.log(`Nombre total d'éléments mis en rouge: ${redCount}`);


  // Fonction pour ajouter une icône de téléchargement et vérifier le texte
  function addDownloadIconsAndCheckCorrections() {
      // Sélectionne tous les éléments avec les classes spécifiques
      const elements = document.querySelectorAll(".masonry-item.col-md-6.col-xl-4.cols-sm-12.pt-0.px-0.px-md-2.pb-3.views-row");

      // Variable pour savoir si des corrections non disponibles sont trouvées
      let hasNoCorrection = false;

      // Parcours chaque élément et ajoute une icône de téléchargement
      elements.forEach((element) => {
          const iconContainer = document.createElement('span');
          iconContainer.style.position = 'absolute';
          iconContainer.style.top = '10px'; // Positionne l'icône en haut
          iconContainer.style.right = '10px'; // Positionne à droite
          iconContainer.style.zIndex = '10';

          // Crée l'élément pour l'icône de téléchargement
          const downloadIcon = document.createElement('span');
          downloadIcon.textContent = '📥'; // Icône de téléchargement
          downloadIcon.style.backgroundColor = 'lightgray';
          downloadIcon.className = 'download-icon';
          downloadIcon.style.padding = '5px'; // Espace autour de l'icône
          downloadIcon.style.borderRadius = '10%';
          downloadIcon.style.cursor = 'pointer';

          iconContainer.appendChild(downloadIcon);
          // Ajoute le conteneur dans l'élément masonry
          element.style.position = 'absolute'; // S'assure que l'élément a une position relative pour l'icône absolue
          element.appendChild(iconContainer);

          downloadIcon.addEventListener('click', async () => {
            const linkElement = element.querySelector('a'); // Trouve le premier <a> dans l'élément

            if (linkElement) {
                // Récupère l'attribut href
                const href = linkElement.getAttribute('href');
                console.log("URL trouvée :", href);

                if(await telecharger("https://www.labolycee.org"+ href)){
                  const loadingIndicator = document.createElement('span');
                  loadingIndicator.id = 'loadingIndicator';
                  loadingIndicator.textContent = '⏳'; // Icône de chargement
                  loadingIndicator.style.marginRight = '10px'; // Espace à droite du bouton
                  loadingIndicator.style.fontSize = '16px';
  
                  // Ajoute l'indicateur de chargement juste après le bouton
                  downloadIcon.parentNode.insertBefore(loadingIndicator, downloadIcon.nextSibling);
  
                  // Supprime l'indicateur de chargement après 1 seconde
                  setTimeout(() => {
                      loadingIndicator.remove();
                      
                    loadingIndicator.textContent = "échoué";
                  }, 10000); 
                } else {
                  const loadingIndicator = document.createElement('span');
                  loadingIndicator.id = 'loadingIndicator';
                  loadingIndicator.textContent = '❌'; // Icône de chargement
                  loadingIndicator.style.marginRight = '10px'; // Espace à droite du bouton
                  loadingIndicator.style.fontSize = '16px';
  
                  // Ajoute l'indicateur de chargement juste après le bouton
                  downloadIcon.parentNode.insertBefore(loadingIndicator, downloadIcon.nextSibling);
  
                  // Supprime l'indicateur de chargement après 1 seconde
                  setTimeout(() => {
                      loadingIndicator.remove();
                      
                    loadingIndicator.textContent = "échoué";
                  }, 1000); //*copier coller ça autre part. Faire en sorte 1 modification affecte tout (fonctions)
                }
                // const loadingIndicator = document.createElement('span');
                // loadingIndicator.id = 'loadingIndicator';
                // loadingIndicator.textContent = '⏳' + href; // Icône de chargement
                // loadingIndicator.style.marginRight = '10px'; // Espace à droite du bouton
                // loadingIndicator.style.fontSize = '16px';

                // // Ajoute l'indicateur de chargement juste après le bouton
                // downloadIcon.parentNode.insertBefore(loadingIndicator, downloadIcon.nextSibling);

                // // Supprime l'indicateur de chargement après 1 seconde
                // setTimeout(() => {
                //     loadingIndicator.remove();
                // }, 10000);
            } else {
                console.log("Aucun lien trouvé dans cet élément.");
                const loadingIndicator = document.createElement('span');
                loadingIndicator.id = 'loadingIndicator';
                loadingIndicator.textContent = '❌'; // Icône de chargement
                loadingIndicator.style.marginRight = '10px'; // Espace à droite du bouton
                loadingIndicator.style.fontSize = '16px';

                // Ajoute l'indicateur de chargement juste après le bouton
                downloadIcon.parentNode.insertBefore(loadingIndicator, downloadIcon.nextSibling);

                // Supprime l'indicateur de chargement après 1 seconde
                setTimeout(() => {
                    loadingIndicator.remove();
                    
                    loadingIndicator.textContent = "échoué";
                }, 1000); 
            }
            
        });

          // Ajoute l'icône à l'élément
          // element.appendChild(downloadIcon);

          if (element.textContent.includes("Correction non disponible") || element.textContent.includes("Corrigés non disponi") || element.textContent.includes("Corrigé non disponi")) {
              hasNoCorrection = true; // Change l'état si trouvé
          }
      });

      // Si des corrections non disponibles sont trouvées, les afficher à la fin de la page
      // if (hasNoCorrection) {
      //     const messageDiv = document.createElement('div');
      //     messageDiv.textContent = "Correction non disponible"; // Message à afficher
      //     messageDiv.style.color = 'red'; // Change la couleur du texte
      //     messageDiv.style.marginTop = '20px'; // Ajoute un peu d'espace au-dessus
      //     messageDiv.style.fontWeight = 'bold'; // Met le texte en gras

      //     // Ajoute le message à la fin du corps de la page
      //     document.body.appendChild(messageDiv);
      // }
  }










} else {
  let pdfIframes = document.querySelectorAll('iframe.pdf');
  console.log("Nombre d'iframes trouvés :", pdfIframes.length);
  pdfIframes.forEach((iframe, index) => {
      console.log(`Iframe ${index + 1} :`, iframe);
});
if(pdfIframes.length>0){
  console.log("DETECTÉ");
  let targetElement = document.evaluate(
    // '//*[@id="block-labolycee-content"]/div/div[3]/div/p[3]/span',
    '//*[@id="block-labolycee-page-title"]/div/h1/span',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
).singleNodeValue;

// Vérifie que l'élément a été trouvé
if (targetElement) {
    // Crée le bouton de téléchargement
    const downloadButton = document.createElement('span');
    downloadButton.textContent = '📥'; // Icône de téléchargement
    downloadButton.style.cursor = 'pointer';
    downloadButton.className = 'download-icon';
    downloadButton.style.backgroundColor = 'lightgray'; // Fond lightgray pour le style
    downloadButton.style.padding = '5px';
    downloadButton.style.borderRadius = '10%';
    downloadButton.style.marginLeft = '10px'; // Espace de 10px à droite du texte cible

    // Ajoute un événement de clic pour le bouton de téléchargement
    downloadButton.addEventListener('click', () => {
        // Action de téléchargement ou popup
        telecharger(window.location.href);
        const loadingIndicator = document.createElement('span');
        loadingIndicator.id = 'loadingIndicator';
        loadingIndicator.textContent = '⏳'; // Icône de chargement
        loadingIndicator.style.marginLeft = '10px'; // Espace à droite du bouton
        loadingIndicator.style.fontSize = '16px';

        // Ajoute l'indicateur de chargement juste après le bouton
        downloadButton.parentNode.insertBefore(loadingIndicator, downloadButton.nextSibling);

        // Supprime l'indicateur de chargement après 1 seconde
        setTimeout(() => {
            loadingIndicator.remove();
            
            loadingIndicator.textContent = "échoué";
        }, 10000);
    });

    // Insère le bouton de téléchargement juste après l'élément cible
    targetElement.parentNode.insertBefore(downloadButton, targetElement.nextSibling);
}
}

}
function telecharger(url) {
//   chrome.storage.local.set({ savedText: url }, function() {
//     // console.log('Texte enregistré :', text);
//     // alert('Texte enregistré avec succès !');
// });


          // socket.send(url);
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(url);
            return true;
        } else {
            // console.warn('La connexion WebSocket n\'est pas ouverte.');
            return false;
        }
          
}


// Appelle la fonction au chargement initial de la page
window.addEventListener('load', addDownloadIconsAndCheckCorrections);















// // Crée le conteneur de la popup
// const popupContainer = document.createElement('div');
// popupContainer.style.position = 'fixed';
// popupContainer.style.top = '0';
// popupContainer.style.left = '0';
// popupContainer.style.width = '100vw';
// popupContainer.style.height = '100vh';
// popupContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
// popupContainer.style.display = 'flex';
// popupContainer.style.alignItems = 'center';
// popupContainer.style.justifyContent = 'center';
// popupContainer.style.zIndex = '100';

// // Contenu de la popup
// const popupContent = document.createElement('div');
// popupContent.style.backgroundColor = 'white';
// popupContent.style.padding = '20px';
// popupContent.style.borderRadius = '8px';
// popupContent.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
// popupContent.textContent = 'Téléchargement en cours...';

// // Bouton pour fermer la popup
// const closeButton = document.createElement('button');
// closeButton.textContent = 'Fermer';
// closeButton.style.marginTop = '10px';
// closeButton.addEventListener('click', () => {
//     document.body.removeChild(popupContainer); // Ferme la popup en cliquant sur le bouton
// });
// setTimeout(() => {
//   document.body.removeChild(popupContainer);
// }, 100);

// // Ajoute le bouton dans le contenu de la popup
// popupContent.appendChild(closeButton);
// popupContainer.appendChild(popupContent);

// // Ajoute la popup au corps du document
// document.body.appendChild(popupContainer);



// Fonction pour ajouter les icônes de téléchargement
function addDownloadIcons() {
  // console.log('addDownloadIcons: Début de l\'ajout des icônes de téléchargement');

  const elements = document.querySelectorAll(".masonry-item.col-md-6.col-xl-4.cols-sm-12.pt-0.px-0.px-md-2.pb-3.views-row");
  console.log(`addDownloadIcons: Nombre d'éléments trouvés: ${elements.length}`); // remet par dessus

  elements.forEach((element, index) => {
      // Vérifie si l'icône est déjà ajoutée
      if (!element.querySelector('.download-icon')) {
          // console.log(`addDownloadIcons: Ajout d'une icône à l'élément ${index + 1}`);
          const iconContainer = document.createElement('span');
          iconContainer.style.position = 'absolute';
          iconContainer.style.top = '10px'; // Positionne l'icône en haut
          iconContainer.style.right = '10px'; // Positionne à droite
          iconContainer.style.zIndex = '10';

          // Crée l'élément pour l'icône de téléchargement
          const downloadIcon = document.createElement('span');
          downloadIcon.textContent = '📥'; // Icône de téléchargement
          downloadIcon.style.backgroundColor = 'lightgray';
          downloadIcon.className = 'download-icon';
          downloadIcon.style.padding = '5px'; // Espace autour de l'icône
          downloadIcon.style.borderRadius = '10%';
          downloadIcon.style.cursor = 'pointer';

          iconContainer.appendChild(downloadIcon);
          element.style.position = 'absolute'; // S'assure que l'élément a une position relative pour l'icône absolue
          element.appendChild(iconContainer);
          // console.log(`addDownloadIcons: Icône ajoutée à l'élément ${index + 1}`);

          downloadIcon.addEventListener('click', () => {
            const linkElement = element.querySelector('a'); // Trouve le premier <a> dans l'élément

            if (linkElement) {
                // Récupère l'attribut href
                const href = linkElement.getAttribute('href');
                console.log("URL trouvée :", href);

                telecharger("https://www.labolycee.org"+ href); // Appelle la fonction de popup lors du clic
                const loadingIndicator = document.createElement('span');
                loadingIndicator.id = 'loadingIndicator';
                
                loadingIndicator.textContent = '⏳' ; // + href
                loadingIndicator.style.marginRight = '10px'; // Espace à droite du bouton
                loadingIndicator.style.fontSize = '16px';

                // Ajoute l'indicateur de chargement juste après le bouton
                downloadIcon.parentNode.insertBefore(loadingIndicator, downloadIcon.nextSibling);

                // Supprime l'indicateur de chargement après 1 seconde
                setTimeout(() => {
                    loadingIndicator.remove();
                    loadingIndicator.textContent = "échoué";
                }, 10000); 
            }})
      } else {
          // console.log(`addDownloadIcons: Icône déjà présente pour l'élément ${index + 1}`);
      }
  });

  // console.log('addDownloadIcons: Fin de l\'ajout des icônes de téléchargement');
}
function pasDeCorrige(){
  let items = document.querySelectorAll(".masonry-item.col-md-6.col-xl-4.cols-sm-12.pt-0.px-0.px-md-2.pb-3.views-row");
  let totalItems = items.length;
  if(totalItems>0){
    let redCount = 0;

    console.log(`Total d'éléments trouvés: ${totalItems}`);

    items.forEach((item, index) => {
      if (item.textContent.includes("Correction non disponible") || item.textContent.includes("Corrigés non disponi") || item.textContent.includes("Corrigé non disponi")) {
        item.style.backgroundColor = "red"; // Change la couleur de fond de l'élément en rouge.
        // item.style.color = "white"; // Change la couleur du texte pour plus de lisibilité.
        redCount++;
        console.log(`Élément ${index + 1} sur ${totalItems} mis en rouge.`);
      }
    });

    console.log(`Nombre total d'éléments mis en rouge: ${redCount}`);
  }
}

let block = true
// Observer les changements dans le DOM
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // const loadingIndicatorTester = document.getElementById('loadingIndicator');
        //     if (mutation.target === loadingIndicatorTester) {
        //         // Ignorez les changements sur cet élément
        //         continue; // Ne pas exécuter le code ci-dessous pour ce cas
        //     }
          // console.log('Changement détecté dans le DOM: ', mutation);
          // console.log("det");
          if(block==true){
          addDownloadIcons();
          block=false;
          setTimeout(() => {
            addDownloadIcons();
            pasDeCorrige();
          }, 3000);
          setTimeout(() => {
            block=true;
          }, 5000);
      }
            // const targetNodes = mutation.addedNodes;
            // for (let i = 0; i < targetNodes.length; i++) {
            //     if (targetNodes[i].nodeType === Node.ELEMENT_NODE) {
            //         // Vérifie si la classe ou le texte contient "taxonomy"
            //         if (targetNodes[i].classList && Array.from(targetNodes[i].classList).some(cls => cls.includes('taxonomy'))) {
            //             console.log('Ajout d\'un élément lié à taxonomy détecté.');
            //             addDownloadIcons(); // Appelle la fonction pour ajouter des icônes
            //         }
            //         // Vérifie également les descendants
            //         const taxonomyElements = targetNodes[i].querySelectorAll('[class*="taxonomy"]');
            //         if (taxonomyElements.length > 0) {
            //             console.log('Éléments descendants liés à taxonomy détectés.');
            //             addDownloadIcons(); // Appelle la fonction pour ajouter des icônes
            //         }
            //     }
            // }
          // let items2 = document.querySelectorAll(".masonry-item.col-md-6.col-xl-4.cols-sm-12.pt-0.px-0.px-md-2.pb-3.views-row");
          // console.log(`Nombre d'éléments trouvés après changement: ${items2.length} et ${items}`);
          

          // Appelle addDownloadIcons() seulement s'il y a des éléments trouvés
          // if (items2.length > items) {
              // addDownloadIcons();
              // items = items2;
              //^ tester si les sujets du bas (pas update par les items) + EFFACER LES COMMENTAIRES + CONSOLE
          // } else {
              // console.log('Aucun élément correspondant trouvé après le changement.');
          // }
      } 
  }
});

// Configuration de l'observateur
const config = { childList: true, subtree: true, attributes: true, attributeOldValue: true };

setTimeout(() => {
  observer.observe(document.body, config);
  console.log('MutationObserver: Observation du DOM démarrée');

}, 3000);
// Démarre l'observation sur le document

// Appel initial de la fonction pour s'assurer que les icônes sont ajoutées au chargement
// addDownloadIcons();
