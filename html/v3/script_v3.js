document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments HTML nécessaires
    const table = document.getElementById('pokemonTable');
    const tbody = table.querySelector('tbody');
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const headers = [ 'ID', 'Name', 'Generation', 'Types', 'Stamina', 'Attack', 'Defense', 'Image'];

    // Nombre de Pokémons affichés par page
    const pokemonsPerPage = 25;
    // Numéro de la page courante, récupéré depuis le localStorage ou initialisé à 1
    let currentPage = localStorage.getItem('currentPage') ? parseInt(localStorage.getItem('currentPage')) : 1;

    // Sélection des modals et des boutons de fermeture
    const editModal = document.getElementById('editModal');
    const editModal2 = document.getElementById('editModal2');
    const editModal3 = document.getElementById('editModal3');
    const closeModalButtons = document.querySelectorAll('.modal .close');

    // Fonction pour afficher un modal
    function showModal(modal) {
        modal.style.display = 'block';
    }

    // Fonction pour fermer un modal
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Ajout d'un écouteur d'événement sur les boutons de fermeture des modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Fonction pour afficher le premier popup avec les informations du Pokémon sélectionné
    function showFirstPopup(pokemon) {
        const modalBody = document.querySelector('.modal-body');

        // Création du contenu du modal avec les informations du Pokémon
        modalBody.innerHTML = `
            <p><img src="${pokemon.image}" alt="${pokemon.name}"></p>
            <p><strong>${pokemon.name}</strong></p>
        `;

        // Ajout des attaques rapides et chargées du Pokémon dans le modal
        const attacksContainer = document.createElement('div');
        attacksContainer.classList.add('attacks-container');

        const ul = document.createElement('ul');
        ul.textContent = `Fast moves :`;
        ul.classList.add('fast-moves');
        for (const attack of pokemon.fast_moves) {
            const li = document.createElement('li');
            li.textContent = attack.name;
            li.classList.add('fast-move');
            ul.appendChild(li);
        }
        attacksContainer.appendChild(ul);

        const ul2 = document.createElement('ul');
        ul2.textContent = `Charged moves :`;
        ul2.classList.add('charged-moves');
        for (const attack of pokemon.charged_moves) {
            const li2 = document.createElement('li');
            li2.textContent = attack.name;
            li2.classList.add('charged-move');
            ul2.appendChild(li2);
        }
        attacksContainer.appendChild(ul2);

        modalBody.appendChild(attacksContainer);

        // Affichage du modal
        showModal(editModal);
    }

    // Fonction pour afficher le second popup avec les détails de l'attaque sélectionnée
    function showSecondPopup(pokemon, selectedMove) {
        const modalBody2 = document.querySelector('.modal-body-2');

        // Création du contenu du modal avec les détails de l'attaque
        modalBody2.innerHTML = `
            <p><img src="${pokemon.image}" alt="${pokemon.name}"></p>
            <p><strong>${pokemon.name}</strong></p>
            <p><strong>Attack name :</strong> ${selectedMove.name}</p>
            <p><strong>Duration :</strong> ${selectedMove.duration}</p>
            <p><strong>energyDelta :</strong> ${selectedMove.energyDelta}</p>
            <p><strong>ID :</strong> ${selectedMove.id}</p>
            <p><strong>power :</strong> ${selectedMove.power}</p>
            <p><strong>staminaLossScaler :</strong> ${selectedMove.staminaLossScaler}</p>
            <p><strong>type :</strong> ${selectedMove.type}</p>
        `;

        // Affichage du modal
        showModal(editModal2);
    }

    // Fonction pour afficher le troisième popup avec l'image du Pokémon sélectionné
    function showThirdPopup(pokemon){
        const modalBody3 = document.querySelector('.modal-body-3');
        modalBody3.innerHTML = `
            <p><img data-related-target="#editModal3" src="${pokemon.thumbnail}" alt="${pokemon.name}"></p>
        `;
        showModal(editModal3);
    }

    // Fonction pour afficher les Pokémons en fonction de la page actuelle
    function displayPokemons(page) {
        tbody.innerHTML = ''; // Efface le corps du tableau avant d'ajouter de nouveaux Pokémons

        // Calcul des index de début et de fin pour la tranche de Pokémons à afficher
        const startIdx = (page - 1) * pokemonsPerPage;
        const endIdx = startIdx + pokemonsPerPage;
        const pokemonsToDisplay = Object.values(all_pokemons.all_pokemons).slice(startIdx, endIdx);

        // Ajout des en-têtes de colonnes
        const headerRow = table.insertRow();
        headers.forEach(headerText => {
            const th = document.createElement('th');
            if (headerText === 'ID' || headerText === 'Generation' || headerText === 'Stamina') {
                th.classList.add('entete-a-cacher'); // ajout d'une classe pour cacher l'entête
            } else {
                th.classList.add('header-cell');
            }
            const text = document.createTextNode(headerText);
            th.appendChild(text);
            headerRow.appendChild(th);
        });

        // Ajout des lignes avec les données des Pokémons
        pokemonsToDisplay.forEach(pokemon => {
            const row = document.createElement('tr');
            row.classList.add('clickable-row'); // Adding class for styling

            // Ajout des cellules avec les données du Pokémon
            const td = document.createElement('td');
            td.innerHTML = pokemon.id;
            td.classList.add('ligne-a-cacher');// ajout d'une classe pour cacher la ligne
            row.appendChild(td);

            row.innerHTML += `
                <td>${pokemon.name}</td>
            `;

            const td2 = document.createElement('td');
            td2.innerHTML = pokemon.generation;
            td2.classList.add('ligne-a-cacher');// ajout d'une classe pour cacher la ligne
            row.appendChild(td2);

            // Ajout des types du Pokémon
            const tdx = document.createElement('td');
            tdx.innerHTML = ``;
            pokemon.getTypes().map(type => {
                switch (type.name){
                    case('Bug'):
                        tdx.innerHTML += `<img src="../images/type_insecte.png" alt="Bug">`;
                        break;
                    case('Dark'):
                        tdx.innerHTML += `<img src="../images/type_tenebre.png" alt="Dark">`;
                        break;
                    case('Dragon'):
                        tdx.innerHTML += `<img src="../images/type_dragon.png" alt="Dragon">`;
                        break;
                    case('Electric'):
                        tdx.innerHTML += `<img src="../images/type_eclair.png" alt="Electric">`;
                        break;
                    case('Fairy'):
                        tdx.innerHTML += `<img src="../images/type_fee.png" alt="Fairy">`;
                        break;
                    case('Fighting'):
                        tdx.innerHTML += `<img src="../images/type_combat.png" alt="Fighting">`;
                        break;
                    case('Fire'):
                        tdx.innerHTML += `<img src="../images/type_feu.png" alt="Fire">`;
                        break;
                    case ('Flying'):
                        tdx.innerHTML += `<img src="../images/type_vol.png" alt="Flying">`;
                        break;
                    case('Ghost'):
                        tdx.innerHTML += `<img src="../images/type_spectre.png" alt="Ghost">`;
                        break;
                    case('Grass'):
                        tdx.innerHTML += `<img src="../images/type_plante.png" alt="Grass">`;
                        break;
                    case('Ground'):
                        tdx.innerHTML += `<img src="../images/type_sol.png" alt="Ground">`;
                        break;
                    case('Ice'):
                        tdx.innerHTML += `<img src="../images/type_glace.png" alt="Ice">`;
                        break;
                    case('Normal'):
                        tdx.innerHTML += `<img src="../images/type_normal.png" alt="Normal">`;
                        break;
                    case('Poison'):
                        tdx.innerHTML += `<img src="../images/type_poison.png" alt="Poison">`;
                        break;
                    case('Psychic'):
                        tdx.innerHTML += `<img src="../images/type_psy.png" alt="Psychic">`;
                        break;
                    case('Rock'):
                        tdx.innerHTML += `<img src="../images/type_roche.png" alt="Rock">`;
                        break;
                    case('Steel'):
                        tdx.innerHTML += `<img src="../images/type_acier.png" alt="Steel">`;
                        break;
                    case('Water'):
                        tdx.innerHTML += `<img src="../images/type_eau.png" alt="Water">`;
                        break;
                }
            });
            row.appendChild(tdx);

            // Ajout des cellules avec les statistiques du Pokémon
            const td3 = document.createElement('td');
            td3.innerHTML = `${pokemon.stamina} <img src="../images/stamina.png" alt="Stamina">`;
            td3.classList.add('ligne-a-cacher-td');
            td3.classList.add('ligne-a-cacher');
            row.appendChild(td3);

            const td4 = document.createElement('td');
            td4.innerHTML = `${pokemon.attack} <img src="../images/epee.png" alt="Attaque">`;
            td4.classList.add('ligne-a-cacher-td');
            row.appendChild(td4);

            const td5 = document.createElement('td');
            td5.innerHTML = `${pokemon.defense} <img src="../images/bouclier.png" alt="defense">`;
            td5.classList.add('ligne-a-cacher-td');
            row.appendChild(td5);

            // Ajout de la cellule avec l'image du Pokémon
            const td6 = document.createElement('td');

            if (pokemon.id <= 809){
                // Ajout de l'image du Pokémon
                td6.innerHTML = `<img src="${pokemon.sprites}" alt="${pokemon.name}">`;
            }
            else{
                td6.innerHTML = `<img src="../images/sprites_inconnu.jpg" alt="${pokemon.name}">`;
            }

            td6.classList.add('image-modif'); //classe pour popup lors du survol
            row.appendChild(td6);

            // Ajout de la ligne au tableau
            tbody.appendChild(row);
        });

        // Mise à jour de l'info-bulle de la pagination
        pageInfo.textContent = `Page ${currentPage} / ${Math.ceil(Object.keys(all_pokemons.all_pokemons).length / pokemonsPerPage)}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === Math.ceil(Object.keys(all_pokemons.all_pokemons).length / pokemonsPerPage);

        // Gestionnaire d'événements pour les lignes cliquables du tableau
        const clickableRows = document.querySelectorAll('.clickable-row');
        clickableRows.forEach(row => {
            row.addEventListener('click', function() {
                const pokemon = pokemonsToDisplay[Array.from(clickableRows).indexOf(row)];
                showFirstPopup(pokemon);

                // Gestionnaire d'événements pour les attaques chargées
                const chargedMoves = document.querySelectorAll('.charged-move');
                chargedMoves.forEach(move => {
                    move.addEventListener('click', function() {
                        const selectedMove = pokemon.charged_moves.find(move => move.name === this.textContent);
                        showSecondPopup(pokemon, selectedMove);
                    });
                });

                // Gestionnaire d'événements pour les attaques rapides
                const fastMoves = document.querySelectorAll('.fast-move');
                fastMoves.forEach(move => {
                    move.addEventListener('click', function() {
                        const selectedMove = pokemon.fast_moves.find(move => move.name === this.textContent);
                        showSecondPopup(pokemon, selectedMove);
                    });
                });
            });

            // Gestionnaire d'événements pour l'affichage du troisième popup avec l'image du Pokémon
            const imgElement = row.querySelector('.image-modif');
            const pokemon = pokemonsToDisplay[Array.from(clickableRows).indexOf(row)];

            imgElement.addEventListener('mouseover', function() {
                showThirdPopup(pokemon);
            });

            imgElement.addEventListener('mouseout', function(event) {
                closeModal(editModal3);
            });
        });
    }

    // Gestionnaire d'événements pour le bouton précédent
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            localStorage.setItem('currentPage', currentPage); // Enregistrer currentPage
            displayPokemons(currentPage);
        }
    });

    // Gestionnaire d'événements pour le bouton suivant
    nextBtn.addEventListener('click', function() {
        if (currentPage < Math.ceil(Object.keys(all_pokemons.all_pokemons).length / pokemonsPerPage)) {
            currentPage++;
            localStorage.setItem('currentPage', currentPage); // Enregistrer currentPage
            displayPokemons(currentPage);
        }
    });

    // Affichage initial des Pokémons lors du chargement de la page
    displayPokemons(currentPage);

});
