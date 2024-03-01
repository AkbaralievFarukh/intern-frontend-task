document.addEventListener('DOMContentLoaded', function () {
    const userListContainer = document.querySelector('#userListContainer');
    const refreshButton = document.querySelector('#refreshButton');
    const sortSelect = document.querySelector('#sortSelect');
    const filterInput = document.querySelector('#filterInput');

    let usersData = [];

    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            usersData = await response.json();
            displayUsers(usersData);
        } catch (error) {
            handleFetchError(error);
        }
    }

    function displayUsers(users) {
        userListContainer.innerHTML = '';
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'userCard';
            userCard.innerHTML = `
                <h3><i class='bx bx-user'></i>${user.name}</h3>
                <p><i class='bx bx-envelope'></i>Email: ${user.email}</p>
                <p><i class='bx bx-phone'></i>Phone: ${user.phone.split(' ')[0]}</p>
            `;
            userListContainer.appendChild(userCard);
        });
    }

    function handleFetchError(error) {
        userListContainer.innerHTML = `<p class="error-message"><i class='bx bx-error' ></i>Error fetching data: ${error.message}</p>`;
    }

    refreshButton.addEventListener('click', fetchUsers);

    const sortOptions = ['Name', 'Email'];
    sortOptions.forEach(option => {
        const sortOption = document.createElement('option');
        sortOption.value = option.toLowerCase();
        sortOption.textContent = option;
        sortSelect.appendChild(sortOption);
    });

    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;
        if (sortBy) {
            const sortedUsers = sortUsers(usersData, sortBy);
            displayUsers(sortedUsers);
        }
    });

    filterInput.addEventListener('input', () => {
        const filterValue = filterInput.value.toLowerCase();
        const filteredUsers = filterUsers(usersData, filterValue);
        displayUsers(filteredUsers);
    });

    fetchUsers();
});

function sortUsers(users, property) {
    return users.slice().sort((a, b) => a[property].localeCompare(b[property]));
}

function filterUsers(users, filterValue) {
    return users.filter(user => user.name.toLowerCase().includes(filterValue));
}
