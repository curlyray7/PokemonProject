document.addEventListener('DOMContentLoaded', function() {
    // Récupère le tableau HTML et le corps du tableau
    const table = document.getElementById('pokemonTable');
    const tbody = table.querySelector('tbody');
    // Définit les en-têtes de colonne
    const headers = [ 'ID', 'Name', 'Generation', 'Types', 'Stamina', 'Attack', 'Defense', 'Image'];

    // Fonction pour afficher les Pokémons en fonction de la page actuelle
    function displayPokemons() {
        tbody.innerHTML = ''; // Efface le corps du tableau avant d'ajouter de nouveaux Pokémons

        const pokemonsToDisplay = Object.values(all_pokemons.all_pokemons);

        // Ajout des en-têtes de colonne
        const headerRow = table.insertRow();
        headers.forEach(headerText => {
            const th = document.createElement('th');
            if (headerText === 'ID' || headerText === 'Generation' || headerText === 'Stamina') {
                th.classList.add('entete-a-cacher'); // Ajout d'une classe pour cacher l'en-tête
            } else {
                th.classList.add('header-cell');
            }
            const text = document.createTextNode(headerText);
            th.appendChild(text);
            headerRow.appendChild(th);
        });

        // Ajout des lignes avec les données du Pokémon
        pokemonsToDisplay.forEach(pokemon => {
            const row = document.createElement('tr');
            row.classList.add('clickable-row'); // Ajout d'une classe pour le style

            const td = document.createElement('td');
            td.innerHTML = pokemon.id;
            td.classList.add('ligne-a-cacher');// Ajout d'une classe pour cacher la ligne
            row.appendChild(td);

            row.innerHTML += `
                <td>${pokemon.name}</td>
            `;

            const td2 = document.createElement('td');
            td2.innerHTML = pokemon.generation;
            td2.classList.add('ligne-a-cacher');// Ajout d'une classe pour cacher la ligne
            row.appendChild(td2);

            const tdx = document.createElement('td');
            tdx.innerHTML = ``;
            // Ajout des types du Pokémon sous forme d'images
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
    }

    // Affichage initial des Pokémons lors du chargement de la page
    displayPokemons();

});
