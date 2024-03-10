const searchBtn = document.getElementById('search-button');
const genderSymbolMap = {
      '♀': '-f',
      '♂': '-m'
};

searchBtn.addEventListener("click", async () => {
  try {
    let inputValue = document.getElementById('search-input').value;
    if (isNaN(Number(inputValue))) {
      inputValue = inputValue.toLowerCase().replace(/[^a-zA-Z♀♂ ]/g, "")
    }
    if (inputValue === "red") {
      alert('Pokémon not found');
    }
    for (let symbol in genderSymbolMap) {
      if (inputValue.includes(symbol)) {
        inputValue = inputValue.replace(symbol, genderSymbolMap[symbol]);
      }
    }
    let response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputValue}`);
    let result = await response.json();
    updateData(result);
  } catch (error) {
    console.error(error)
  }
})

function updateData(data) {
  document.getElementById('types').innerHTML = '';
  document.getElementById('pokemon-name').innerText = data.name.toUpperCase()
  document.getElementById('pokemon-id').innerText = `#${data.id}`
  document.getElementById('weight').innerText = `Weight: ${data.weight}`
  document.getElementById('height').innerText = `Height: ${data.height}`
  for (let type in data.types) {
    document.getElementById('types').innerHTML += `<p>${data.types[type].type.name.toUpperCase()}</p>`
  }
  document.getElementById('hp').innerText = `HP: ${data.stats[0].base_stat}`
  document.getElementById('attack').innerText = `ATK: ${data.stats[1].base_stat}`
  document.getElementById('defense').innerText = `DEF: ${data.stats[2].base_stat}`
  document.getElementById('special-attack').innerText = `SPECIAL ATK: ${data.stats[3].base_stat}`
  document.getElementById('special-defense').innerText = `SPECIAL DEF: ${data.stats[4].base_stat}`
  document.getElementById('speed').innerText = `SPEED: ${data.stats[5].base_stat}`
  document.getElementById('sprite').src = data.sprites.front_default
}