let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let name = form.name.value.toUpperCase().substring(0,1)+form.name.value.toLowerCase().substring(1)
  for(let i = 0; i < kittens.length; i++){
    if(name == kittens[i].name){
      form.reset()
      alert('Kitten cannot have a name that another kitten already has!')
      return
    }
  }
  
  kittens.push({
    id: generateId(),
    name: name,
    mood: {title:"tolerant", class:'tolerant'},
    affection: 5,
    img: "cat"+Math.floor(Math.random()*5)+".png"
})
  form.reset()
  saveKittens()
  drawKittens()
}

function removeKitten(id){
  let index = kittens.findIndex(kitten => kitten.id == id)
  kittens.splice(index, 1)
  saveKittens()
  drawKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  if(localStorage.getItem("kittens")){
    kittens = JSON.parse(localStorage.getItem("kittens"))
  }
  drawKittens()
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let draft = ""
  for(let i = 0; i < kittens.length; i++){
    const kitten = kittens[i]
    draft += 
    `
    <div id="${kitten.id}" class="${kitten.mood.class} card kitten">
      <img class="cat-icon" src="images/${kitten.img}" alt="a cat">
      <i class="fa fa-trash-o fa-2x" style="pointer-events: all;" onClick="removeKitten('${kitten.id}')" aria-hidden="true"></i>
      <p id="name">${kitten.name}</p>
      <div class="d-flex space-between">
      <button onclick="catnip('${kitten.id}')">Feed</button>
        <p>
          <span id="mood">${kitten.mood.title}</span>
        </p>
        <button onclick="pet('${kitten.id}')">Pet</button>
      </div>
    </div>
    `
  };
  document.getElementById("kittens").innerHTML = draft

}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens[kittens.findIndex(kitten => kitten.id == id)]
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .1 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kitten = findKittenById(id)
  if(Math.random()>.5){
    if(kitten.affection == 10)return
    kitten.affection++
  }else{
    kitten.affection--
  }
  setKittenMood(id)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  kitten.affection = 5
  setKittenMood(id)
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(id) {
  let kitten = findKittenById(id)
  let moods = [
    {title:"Gone", class:"gone"}, 
    {title:"Very Angry", class:"angry"},
    {title:"Angry", class:"angry"},
    {title:"Mad", class:"angry"},
    {title:"Pouty", class:"tolerant"},
    {title:"Tolerant", class:"tolerant"},
    {title:"Cooperative", class:"tolerant"},
    {title:"Happy", class: "happy"},
    {title:"Big Happy", class: "happy"},
    {title:"Joyous", class: "happy"},
    {title:"Overjoyed", class: "happy"},
  ]
  kitten.mood = moods[kitten.affection]
  

  drawKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens = []
  saveKittens()
  drawKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
