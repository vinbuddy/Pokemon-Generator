const url = 'https://pokeapi.co/api/v2/pokemon/'
const card = document.querySelector('.card')
const btn = document.querySelector('.generate')

// Theme của các hệ pokemon
const typeColor = {
    bug: '#26de81',
    dragon: '#ffeaa7',
    electric: '#fed330',
    fairy: '#ff0069',
    fighting: '#30336b',
    fire: '#f0932b',
    flying: '#81ecec',
    grass: '#00b894',
    ground: '#efb549',
    ghost: '#a55eea',
    ice: '#74b9ff',
    normal: '#95afc0',
    poison: '#6c5ce7',
    pyschic: '#a29bfe',
    rock: '#2d3436',
    water: '#0190ff'
}

var getPokeData = () => {
    // Random từ 1 -> 150 pokemon
    let id = Math.floor(Math.random() * 150) + 1

    // Kết hợp id Poke vs Url
    const finalUrl = url + id

    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {
            // Khi nhận data xong sẽ truyền data vào hàm để render ra Pokemon
            generatePoke(data)
        })
}

function generatePoke(data) {
    // Lấy dữ liệu cần thiết để render ra html
    const hp = data.stats[0].base_stat
    const pokeImg = data.sprites.other.dream_world.front_default
    // In hoa chữ đầu cho tên poke
    const pokeName = data.name
    const attack = data.stats[1].base_stat
    const defense = data.stats[2].base_stat
    const speed = data.stats[5].base_stat

    // render ra html 
    card.innerHTML = `
        <p   class="card__hp"><span>HP</span> ${hp}</p>
        <img src="${pokeImg}" alt="" class="card__img">

        <h2 class="card__name"> ${pokeName}</h2>

        <div class="card__type">

        </div>

        <div class="card__stats">
            <div class="card__attack">
                <h3>${attack}</h3>
                <p>Attack</p>
            </div>

            <div class="card__defense">
                <h3>${defense}</h3>
                <p>Defense</p>
            </div>

            <div class="card__Speed">
                <h3>${speed}</h3>
                <p>Speed</p>
            </div>
        </div>
    `

    // Truyền hệ pokemon 
    appendTypes(data.types)

    // Truyền màu của hệ pokemon tương ứng với tên hệ
    const themeColor = typeColor[data.types[0].type.name]
    setTheme(themeColor)
}

function appendTypes(types) {
    types.forEach((item) => {
        let span = document.createElement('span')
        span.innerText = item.type.name

        // Thêm node vào 1 node khác
        document.querySelector('.card__type').appendChild(span)
    })
}

function setTheme(color) {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 41%, #fff 36%)`

    const typeTags = document.querySelectorAll('.card__type span')
    typeTags.forEach((typeTag) => {
        typeTag.style.backgroundColor = color
    })
}


btn.addEventListener('click', getPokeData) 
window.addEventListener('load', getPokeData) 
 