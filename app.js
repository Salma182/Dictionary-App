const url='https://api.dictionaryapi.dev/api/v2/entries/en/';
const result = document.getElementById('result');
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');
const toggleBtn = document.getElementById('toggle');
const container = document.querySelector('.container');
const input = document.querySelector('.search input');
const dark = document.getElementById('dark');
const body = document.body;
const fontBtn = document.getElementById('fontfamily');
const dropdownlist=document.getElementById('dropdownlist');
const arrow = document.getElementById('arrow');
let font= document.getElementById('fontfamily');
const serif=document.getElementById('serif');
const sans=document.getElementById('sans-serif');
const monospace =document.getElementById('monospace');

// dropDown list
function toggledropdown(){
    dropdownlist.classList.toggle('show');
    arrow.classList.toggle('arrow');
}

fontBtn.addEventListener('click', toggledropdown);

//change font Family from the dropdown list
serif.addEventListener('click', () => { container.style.fontFamily= 'serif'; toggledropdown();})
sans.addEventListener('click', () => { container.style.fontFamily= 'sans-serif'; toggledropdown();})
monospace.addEventListener('click', () => { container.style.fontFamily= 'monospace'; toggledropdown();})

//toggle between dark Mode and light mode
dark.addEventListener('click', function(){
    this.classList.toggle('bxs-sun');

    if(this.classList.toggle('bxs-moon')){
        container.style.background= 'white';
        container.style.color= 'black';
        fontBtn.style.color='black';
        input.style.color='black';
    } else {
        container.style.background= 'black';
        container.style.color= 'white';
        fontBtn.style.color='white';
        input.style.color='white';
    }
});

//fetch api 
btn.addEventListener('click', () => {
const inpWord =document.getElementById('inp-word').value;

    fetch(`${url} ${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
    console.log(data);
    result.innerHTML= `<div class="word">
        <h3>${inpWord}</h3>
        <button onclick= 'playSound()'>
            <i class="fa-solid fa-volume-high"></i>
        </button>
    </div>

    <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p> ${data[0].phonetic}</p>
    </div>

    <p class="word-meaning"> 
       ${data[0].meanings[0].definitions[0].definition}
    </p>

    <p class="word-example"> 
       ${data[0].meanings[0].definitions[0].example || ''}
    </p>`
    sound.setAttribute('src', `${data[0].phonetics[0].audio}`);
    console.log(sound); 
    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
});

function playSound() {
    sound.play();
}