
let matkad = []
async function loeMatkad() {
    let response = await fetch('/api/matk')
    matkad = await response.json()
    naitaMatkadeMenyyd(matkad)
}

function naitaMatkadeMenyyd(matkad) {
    let vastus = ''
    for (let i in matkad) {
       vastus += `
       <button class="btn btn-link" onclick="naitaOsalejaid(${matkad[i].id})">
          ${matkad[i].nimetus}
       </button>
       ` 
    }

    const menyyElement = document.getElementById("matkad-menyy")
    menyyElement.innerHTML = vastus
}

function naitaOsalejaid(matkaIndeks) {
    console.log("matk: " + matkaIndeks)
    //TDOO: loe fetc käskluse abil matkal osalejad 
    //let response = await fetch('/api/matkaja/' + matkaIndeks)
    // Kasuta matkad[matkaIndeks] objekti matka info näitamiseks
    //Kasuta fetch päringu tulemust konkreetse matka tulemuste näitamiseks
}

loeMatkad()
console.log("test1")