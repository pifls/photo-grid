let IMAGES_ALL = [];
let IMAGES_FILTERED = [];
let IMAGES_LOADED = 0;
const EVERY_N_IMAGES = 10;
const IMAGES_URL = 'https://api.myjson.com/bins/13gy0j'

const primaryColorLight = '#077187';
const textColorLight = '#ffffff';

const fetchImages = () => {
    fetch(IMAGES_URL)
    .then(res => res.json())
    .then(data => {
        IMAGES_ALL = data.images;
        })
    .then(() => {
        filterImages('show all');
    })
}

const filterImages = category => {
    IMAGES_LOADED = 0;
    IMAGES_FILTERED = [];
    document.querySelector('.images').innerHTML = '';
    for(let i = 0; i < IMAGES_ALL.length; i++){
        if(IMAGES_ALL[i].site === category || category === 'show all'){
            IMAGES_FILTERED.push(IMAGES_ALL[i]);
        }
    }
    showImages(IMAGES_FILTERED, EVERY_N_IMAGES, IMAGES_LOADED);
}

const showImages = (images, images_to_load, images_loaded) => {

    for(let i = images_loaded; i < images_to_load; i++){
        if(images[i]){
            document.querySelector('.images').innerHTML += `<div class="image" style="background-image: url(${images[i].url})"></div>`;
            IMAGES_LOADED++;
        }
    }
    IMAGES_LOADED >= IMAGES_FILTERED.length ?
        document.querySelector('.more-images-btn').style.display = 'none' :
        document.querySelector('.more-images-btn').style.display = 'block'
}

const moreImages = () => {
    showImages(IMAGES_FILTERED, IMAGES_LOADED + EVERY_N_IMAGES, IMAGES_LOADED);
}

const filters = document.getElementsByClassName('filter-btn')
for(let i = 0; i < filters.length; i++){
    filters[i].addEventListener("click", e => {
        let filters = document.getElementsByClassName("filter-btn");
        for(let i = 0; i < filters.length; i++){
                filters[i].style.backgroundColor = textColorLight;
                filters[i].style.color = primaryColorLight;
        }
        filterImages(e.target.value);
        e.target.style.backgroundColor = primaryColorLight;
        e.target.style.color = textColorLight;
    })
}

document.querySelector('.more-images-btn').addEventListener("click", function(){
    moreImages();
});

fetchImages();