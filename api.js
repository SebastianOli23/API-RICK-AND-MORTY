const searchInput = document.getElementById('searchInput');
const genderSelect = document.getElementById('genderSelect');
const statusSelect = document.getElementById('statusSelect');
const speciesSelect = document.getElementById('speciesSelect');
const cardContainer = document.getElementById('cardContainer');
let currentPage = 1; // Agrega esta línea

// Obtener datos de la API
async function getCharacters(page = 1) {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
  const data = await response.json();
  return data.results;
}

// Función para aplicar filtros
function applyFilters(characters) {
  const searchTerm = searchInput.value.toLowerCase();
  const genderValue = genderSelect.value.toLowerCase();
  const statusValue = statusSelect.value.toLowerCase();
  const speciesValue = speciesSelect.value.toLowerCase();
  
  return characters.filter(character => {
    const name = character.name.toLowerCase();
    const gender = character.gender.toLowerCase();
    const status = character.status.toLowerCase();
    const species = character.species.toLowerCase();
    
    if (searchTerm && !name.includes(searchTerm)) return false;
    if (genderValue && gender !== genderValue) return false;
    if (statusValue && status !== statusValue) return false;
    if (speciesValue && species !== speciesValue) return false;
    
    return true;
  });
}

// Función para mostrar los personajes filtrados
function showCharacters(characters) {
  cardContainer.innerHTML = '';
  const firstTwelveCharacters = characters.slice(0, 12);
  firstTwelveCharacters.forEach(character => {
    const card = document.createElement('div');
    card.className = 'col mb-4';
    card.innerHTML = `
      <div class="card">
        <img src="${character.image}" class="card-img-top" alt="${character.name}">
        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <p class="card-text"><b>Especie: </b>${character.species}</p>
          <p class="card-text"><b>Estado: </b>${character.status}</p>
          <p class="card-text"><b>Genero: </b>${character.gender}</p>
        </div>
      </div>
    `;
    cardContainer.appendChild(card);
  });
}

// Función para manejar la búsqueda y los filtros
async function searchCharacters(page = 1) {
  const characters = await getCharacters(page);
  const filteredCharacters = applyFilters(characters);
  showCharacters(filteredCharacters);
}

// Función para buscar una página específica
function goToPage() {
    const pageInput = document.getElementById('pageInput');
    const page = parseInt(pageInput.value);
    searchCharacters(page);
    document.getElementById('currentPage').textContent = page;
    pageInput.value = page;
  }
  
  // Funciones para navegar entre páginas
  async function nextPage() {
    currentPage++;
    await searchCharacters(currentPage);
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('pageInput').value = currentPage;
  }
  
  async function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      await searchCharacters(currentPage);
      document.getElementById('currentPage').textContent = currentPage;
      document.getElementById('pageInput').value = currentPage;
    }
  }
  
  // Manejar la búsqueda y los filtros cuando se carga la página
  searchCharacters();
  
  // Agregar event listener para buscar al presionar Enter
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      searchCharacters();
    }
  });

  document.getElementById('currentPage').textContent = currentPage;




  






  
  
  

