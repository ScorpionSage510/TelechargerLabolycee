# Télécharger Labolycee 🚀

Cet outil, composé d'une application Python et d'une extension navigateur, simplifie le téléchargement des sujets et de leurs corrigés depuis le site [Labolycee.org](https://www.labolycee.org/). Il met également en évidence les sujets pour lesquels un corrigé n'est pas disponible.

[![Version](https://img.shields.io/github/v/release/ScorpionSage510/TelechargerLabolycee)](https://github.com/ScorpionSage510/TelechargerLabolycee/releases/latest)

## Table des Matières

*   [Fonctionnalités](#fonctionnalités-)
*   [Comment ça marche ?](#comment-ça-marche-)
*   [Prérequis](#prérequis-)
*   [Installation](#installation-)
    *   [Option 1 : Application Exécutable ](#option-1--application-exécutable-recommandé-)
    *   [Option 2 : Depuis le Code Source (Python)](#option-2--depuis-le-code-source-python-)
    *   [Installation de l'Extension Navigateur (Obligatoire)](#installation-de-lextension-navigateur-obligatoire-)
*   [Utilisation](#utilisation-)
*   [Capture d'écran](#capture-décran-)
*   [Outil Complémentaire](#outil-complémentaire-)
*   [Limitations et Problèmes Connus](#limitations-et-problèmes-connus-)
*   [Contribuer](#contribuer-)
*   [Licence](#licence-)

## Fonctionnalités ✨

*   **Téléchargement Facile :** Un clic sur une icône ⬇️ ajoutée directement sur Labolycee.org pour télécharger le sujet et son corrigé.
*   **Fusion Automatique :** Le sujet et son corrigé sont automatiquement fusionnés en un seul fichier PDF.
*   **Indicateur Visuel :** Une icône ✔ confirme que l'application et l'extension fonctionnent correctement. L'icône ⬇️ n'apparaît que si le sujet *et* son corrigé sont disponibles.
*   **Organisation :** Les fichiers PDF téléchargés sont sauvegardés dans un dossier `Téléchargements` créé à l'emplacement de l'application.

## Comment ça marche ? 🤔

L'outil se compose de deux parties :

1.  **L'application (Python ou Exécutable) :** Tourne en arrière-plan, écoute les requêtes de l'extension et effectue le téléchargement et la fusion des PDF.
2.  **L'extension Navigateur :** Modifie la page de Labolycee.org pour ajouter les icônes de statut (✔/❌) et de téléchargement (⬇️). Lorsque vous cliquez sur ⬇️, elle envoie une requête à l'application locale.

## Prérequis 📋

*   **Pour l'option Exécutable :** Un système d'exploitation compatible (Windows, `.exe`).
*   **Pour l'option Code Source :**
    *   [Python](https://www.python.org/downloads/) (version 3.x recommandée)
    *   [pip](https://pip.pypa.io/en/stable/installation/) (généralement inclus avec Python)
*   **Navigateur Web :** Un navigateur compatible avec les extensions (ex: Chrome, Firefox, Edge).

## Installation 🛠️

Vous devez installer **l'application** (Option 1 ou 2) **ET** **l'extension navigateur**.

### Option 1 : Application Exécutable (Recommandé)

Idéal si vous ne souhaitez pas installer Python ou manipuler le code source.

1.  Téléchargez le fichier `.exe` depuis la [dernière release](https://github.com/ScorpionSage510/TelechargerLabolycee/releases/latest).
2.  Passez à l'[Installation de l'Extension Navigateur](#installation-de-lextension-navigateur-obligatoire-).

### Option 2 : Depuis le Code Source (Python)

Pour les utilisateurs à l'aise avec Python et la ligne de commande.

1.  **Téléchargez ou Clonez le Code :**
    *   Soit téléchargez le fichier ZIP du code source (`Source code (zip)`) depuis la [dernière release](https://github.com/ScorpionSage510/TelechargerLabolycee/releases/latest) et décompressez-le.
    *   Soit clonez le dépôt :
        ```bash
        git clone https://github.com/ScorpionSage510/TelechargerLabolycee.git
        cd TelechargerLabolycee
        ```
2.  **Installez les dépendances :**
    Ouvrez un terminal ou une invite de commande dans le dossier du projet et exécutez :
    ```bash
    pip install -r requirements.txt
    ```
3.  Passez à l'[Installation de l'Extension Navigateur](#installation-de-lextension-navigateur-obligatoire-). L'application sera lancée plus tard avec `python main.py`.

### Installation de l'Extension Navigateur (Obligatoire)

1.  Téléchargez le code source (ZIP) s'il n'est pas déjà fait (voir Option 2, étape 1 ou dans [Release](https://github.com/ScorpionSage510/TelechargerLabolycee/releases/latest)).
2.  Décompressez l'archive ZIP dans un dossier stable (ne supprimez pas ce dossier après l'installation). Repérez le sous-dossier contenant les fichiers de l'extension nommé `Extension` (il devrait y avoir un fichier `manifest.json` à l'intérieur).
3.  **Ouvrez votre navigateur** et allez à la page de gestion des extensions :
    *   Chrome/Edge : `chrome://extensions`
4.  **Activez le "Mode Développeur"** (souvent un interrupteur en haut à droite).
5.  **Chargez l'extension :**
    *   Chrome/Edge : Cliquez sur "Charger l'extension non empaquetée" et sélectionnez le dossier `extension_labolycee`.
6.  L'icône de l'extension devrait apparaître dans la barre d'outils de votre navigateur.

## Utilisation 🖱️

1.  **Lancez l'application locale :**
    *   Si vous utilisez l'**exécutable** : Double-cliquez sur le fichier `.exe`. Une fenêtre de terminal pourrait s'ouvrir et rester active.
    *   Si vous utilisez le **code source** : Ouvrez un terminal dans le dossier du projet et exécutez :
        ```bash
        python main.py
        ```
        Laissez ce terminal ouvert pendant que vous utilisez l'outil.
2.  **Vérifiez l'installation :** Assurez-vous que l'extension est activée dans votre navigateur.
3.  **Rendez-vous sur [Labolycee.org](https://www.labolycee.org/).**
4.  **Vérifiez l'icône de statut :** Une icône ✔ devrait apparaître quelque part sur la page (souvent près du logo ou ajoutée par l'extension), indiquant que l'extension communique bien avec l'application locale. Si vous voyez ❌, vérifiez que l'application est bien lancée et que l'extension est correctement installée et activée.
5.  **Téléchargez les sujets :** Naviguez vers les pages listant les sujets. Sur chaque sujet disposant d'un corrigé, une icône ⬇️ devrait apparaître. Cliquez dessus.
6.  **Retrouvez vos fichiers :** Le sujet et son corrigé seront téléchargés, fusionnés en un seul PDF, et sauvegardés dans un dossier nommé `Téléchargements` situé dans le même répertoire que celui où vous avez exécuté `main.py` ou l'exécutable.

## Capture d'écran 🖼️

![Exemple d'utilisation sur Labolycee.org](https://raw.githubusercontent.com/ScorpionSage510/Images/refs/heads/main/Labolycee.jpeg)



Nous vous conseillons d'utiliser [AssemblerNumeroterPDF](https://github.com/ScorpionSage510/AssemblerNumeroterPDF) pour fusionner vos sujets téléchargés.

⚠️ Des bugs peuvent survenir.  

L'application est très simple, des optimisations et des fonctionnalités supplémentaires seraient les bienvenues.