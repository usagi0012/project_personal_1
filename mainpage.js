const searchBtn = document.getElementById('searchBtn');
const searchForm = document.getElementById('searchForm');
const searchSpan = document.getElementById('searchSpan');
let $cardLists = document.querySelector(".movieCards");
let searchInput = document.getElementById("searchInput");
let moovieLogo = document.getElementById("moovieLogo");
searchBtn.addEventListener("click", loadCard);
moovieLogo.addEventListener("click", function(){
  location.href = 'index.html';
});

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDYxNWZmZjZlZWM1N2NiOGZjYWRkMDc3MDM0YTcyMiIsInN1YiI6IjY1MzIxZWY2OWFjNTM1MDg3ODY5ZWZhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JkOng7EGAIUuhC8sLpLMCygz9HAt3XlNXK7lMIk8Pxo'
  }
};

function loadCard (e) {
  if (e != null) {
    e.preventDefault();
}
  let searchWord = (searchInput.value).toLowerCase();
  $cardLists.innerHTML = "";
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    console.log(response);
    
    
      response.results.filter(movie => {
        return movie.title.toLowerCase().includes(searchWord);
      }).forEach(movie => {
        let $movieCard = document.createElement("div");
        $movieCard.className = "card";
        $movieCard.innerHTML = `
        <div class="movie_img_div">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie_img">
        </div>
        <div class="name">
        ${movie.title}
        </div>
        <div class="rate">
        ⭐${movie.vote_average}
       </div>
        <div class="summary">
        ${movie.overview}
        </div>`;
        $movieCard.addEventListener('click', () => {
          alert(`ID : ${movie.id}`);
        })
        $cardLists.appendChild($movieCard);
      })
    })
    .catch(err => console.error(err));
};
loadCard();

searchBtn.addEventListener('mousemove', (e) => {
  e.preventDefault();
  searchForm.classList.add("opened");
});

searchSpan.addEventListener('mouseleave', (e) => {
  e.preventDefault();
  searchForm.classList.remove("opened");
});