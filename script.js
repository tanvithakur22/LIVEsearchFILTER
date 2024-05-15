const result = document.getElementById('result');
    const filter = document.getElementById('filter');
    let listItems = []; 

    filter.addEventListener('input', debounce(() => filterData(filter.value), 300));

    async function getData() {
      try {
        const res = await fetch('https://randomuser.me/api?results=500');
        const { results } = await res.json();
        console.log('Data fetched:', results); 

        listItems = results.map(user => ({
          userName: `${user.name.first} ${user.name.last}`,
          location: `${user.location.country}`,
          picture: user.picture.large, 
          gender: `${user.gender}`
        }));

        renderList(listItems); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    function renderList(items) {
      result.innerHTML = ''; 

      if (items.length === 0) {
        result.innerHTML = '<p>No results found.</p>';
      } else {
        items.forEach(item => {
          const userBox = document.createElement('div');
          userBox.classList.add('user-box');
          userBox.classList.add("bg-black");
          userBox.classList.add("square");
          userBox.classList.add("p-3");
          userBox.classList.add("mb-3");
          userBox.classList.add("shadow-sm");
          userBox.innerHTML = `
            <div class="user-info d-flex align-items-center flex-wrap max-height-4  0 gap-3">
              <img class="square mr-3 mb-3" style="width: 60px; height: 60px;" src="${item.picture}" alt="${item.userName}">
              <div>
                <h4>${item.userName}</h4>
                <p>${item.location}</p>
                <p>Gender: ${item.gender}</p>
              </div>
            </div>
          `;
          result.appendChild(userBox); 
        });
      }
    }

    function filterData(searchTerm) {
      console.log('Filtering with term:', searchTerm); 
      const lowerCaseTerm = searchTerm.toLowerCase();

      const filteredItems = listItems.filter(item => {
        const userName = item.userName.toLowerCase();
        const location = item.location.toLowerCase();
        const gender = item.gender.toLowerCase();
        if (lowerCaseTerm === 'male' || lowerCaseTerm === 'female') {
          return gender === lowerCaseTerm;
        } else {
          return userName.includes(lowerCaseTerm) || location.includes(lowerCaseTerm);
        }
      });

      renderList(filteredItems); 
    }

    function debounce(func, timeout) {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }

    getData();


    