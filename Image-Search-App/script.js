const apiKey = "EVjO17vDzFWH_nKWupVThVYlpu7hxsOWu5pYBFOy88g";

const formEle = document.querySelector("form");
const searchInputEle = document.getElementById("searchInput");
const searchResultsEle = document.querySelector(".searchResults");
const showMoreBtnEle = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEle.value;
  // console.log(inputData);

  const url = `https://api.unsplash.com/search/photos?${page}&query=${inputData}&client_id=${apiKey}`;
  
  //console.log(url);

  const response = await fetch(url);
  const data = await response.json();
  //  console.log(data);
  if (page === 1) {
    searchResultsEle.innerHTML = "";
  }
  
  const results = data.results;
  //console.log(results);
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("searchResult");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    // console.log(result);
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEle.appendChild(imageWrapper);
  });

  page++;


  if (page > 1) {
    showMoreBtnEle.style.display = "block"; //it make string bcause it is not a variable
  }
  // console.log(results);
}

formEle.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtnEle.addEventListener("click", ()=> {
  searchImages();
});   //we can click 1000times on showmore btn permit by api