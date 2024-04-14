document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments HTML
    const table = document.getElementById('pokemonTable');
    const tbody = table.querySelector('tbody');
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const headers = [ 'ID', 'Name', 'Generation', 'Types', 'Stamina', 'Attack', 'Defense', 'Image'];

    // Nombre de Pokémons par page
    const pokemonsPerPage = 25;
    // Récupération du numéro de la page courante à partir du localStorage ou initialisation à 1
    let currentPage = localStorage.getItem('currentPage') ? parseInt(localStorage.getItem('currentPage')) : 1;

    // Fonction pour afficher les Pokémons en fonction de la page actuelle
    function displayPokemons(page) {
        tbody.innerHTML = ''; // Efface le corps du tableau avant d'ajouter de nouveaux Pokémons

        const startIdx = (page - 1) * pokemonsPerPage; // Index de départ pour la tranche de Pokémons à afficher
        const endIdx = startIdx + pokemonsPerPage; // Index de fin pour la tranche de Pokémons à afficher
        const pokemonsToDisplay = Object.values(all_pokemons.all_pokemons).slice(startIdx, endIdx); // Tableau des Pokémons à afficher

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

            // Ajout des autres données du Pokémon
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

            if (pokemon.id <= 809){
                // Ajout de l'image du Pokémon
                row.innerHTML += `
                    <td><img src="${pokemon.sprites}" alt="${pokemon.name}"></td>
                `;
            }
            else{
                row.innerHTML += `
                    <td><img src="../images/sprites_inconnu.jpg" alt="${pokemon.name}"></td>
                `;
            }


            tbody.appendChild(row);
        });

        // Mise à jour de l'info de la page courante
        pageInfo.textContent = `Page ${currentPage} / ${Math.ceil(Object.keys(all_pokemons.all_pokemons).length / pokemonsPerPage)}`;
        prevBtn.disabled = currentPage === 1; // Désactivation du bouton "Précédent" si on est sur la première page
        nextBtn.disabled = currentPage === Math.ceil(Object.keys(all_pokemons.all_pokemons).length / pokemonsPerPage); // Désactivation du bouton "Suivant" si on est sur la dernière page

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
