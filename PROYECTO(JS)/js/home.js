document.addEventListener('DOMContentLoaded', function() {
    const user_logged = JSON.parse(localStorage.getItem('user_logged'));
    if (user_logged == null) {
        window.location.href = 'login.html';
    }

    const checkFlatFavorite = (id) => {
        const flats_favorites = JSON.parse(localStorage.getItem('flats_favorites'));
        if (flats_favorites != null) {
            return flats_favorites.some((item) => item.idFlat === id);
        }
        return false;
    };

    const toggleFavorite = (id, e) => {
        const user_logged = JSON.parse(localStorage.getItem('user_logged'));
        if (!user_logged) {
            alert('You must be logged in to add a favorite');
            return;
        }

        const email = user_logged.email;
        const favorite = { idFlat: id, emailUser: email };
        let flats_favorites = JSON.parse(localStorage.getItem('flats_favorites')) || [];

        const existIndex = flats_favorites.findIndex((item) => item.idFlat === id);
        if (existIndex === -1) {
            flats_favorites.push(favorite);
            e.target.textContent = 'Remove';
        } else {
            flats_favorites.splice(existIndex, 1);
            e.target.textContent = 'Add';
        }
        localStorage.setItem('flats_favorites', JSON.stringify(flats_favorites));
    };

    const fillTable = () => {
        const favorites = JSON.parse(localStorage.getItem('flats_favorites'));
        const flats = JSON.parse(localStorage.getItem('flats'));
        const tbody = document.querySelector('#flats-table tbody');
        tbody.innerHTML = '';

        if (favorites && Array.isArray(favorites)) {
            const filteredFavorites = favorites.filter((item) => item.emailUser === user_logged.email);
            const flatsTable = filteredFavorites.map((item) => flats.find((flat) => flat.id === item.idFlat)).filter(Boolean);

            if (flatsTable.length > 0) {
                flatsTable.forEach((flat) => {
                    const tr = document.createElement('tr');

                    const tdCity = document.createElement('td');
                    tdCity.innerText = flat.city;
                    tr.appendChild(tdCity);

                    const tdStreetName = document.createElement('td');
                    tdStreetName.innerText = flat.streetName;
                    tr.appendChild(tdStreetName);

                    const tdStreetNumber = document.createElement('td');
                    tdStreetNumber.innerText = flat.streetNumber;
                    tr.appendChild(tdStreetNumber);

                    const tdHasAc = document.createElement('td');
                    tdHasAc.innerText = flat.hasAc;
                    tr.appendChild(tdHasAc);

                    const tdAreaSize = document.createElement('td');
                    tdAreaSize.innerText = flat.areaSize;
                    tr.appendChild(tdAreaSize);

                    const tdPrice = document.createElement('td');
                    tdPrice.innerText = flat.price;
                    tr.appendChild(tdPrice);

                    const tdDateAvailable = document.createElement('td');
                    tdDateAvailable.innerText = flat.dateAvailable;
                    tr.appendChild(tdDateAvailable);

                    const tdYearBuilt = document.createElement('td');
                    tdYearBuilt.innerText = flat.yearBuilt;
                    tr.appendChild(tdYearBuilt);

                    const tdAction = document.createElement('td');
                    const button = document.createElement('button');
                    button.onclick = (e) => toggleFavorite(flat.id, e);
                    button.innerText = checkFlatFavorite(flat.id) ? 'Remove' : 'Add';
                    tdAction.appendChild(button);
                    tr.appendChild(tdAction);

                    tbody.appendChild(tr);
                });
            } else {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.colSpan = 9;
                td.innerText = 'No existen Favoritos';
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    };

    fillTable();
});

