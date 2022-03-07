
let matkad = []
async function loeMatkad() {
    let response = await fetch('/api/matk')
    matkad = await response.json()
    naitaMatkadeMenyyd(matkad)
    naitaOsalejaid(0)
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

    const matkadMenyyElement = document.getElementById("matkad-menyy")
    matkadMenyyElement.innerHTML = vastus
}

async function naitaOsalejaid(matkaIndeks) {
    console.log("matk: " + matkaIndeks)
    //TDOO: loe fetc käskluse abil matkal osalejad 
    let response = await fetch('/api/matkaja/' + matkaIndeks)
    const osalejad = await response.json() 
    console.log(osalejad)
    // Kasuta matkad[matkaIndeks] objekti matka info näitamiseks
    //Kasuta fetch päringu tulemust konkreetse matka tulemuste näitamiseks
    
    let matk = matkad[matkaIndeks]

    let vastus = ''
    vastus += `
    <div class="pb-2">
        ${matk.kirjeldus}
    </div>
    <div class="row">
        <div class="col-4">Nimi</div>
        <div class="col-8">Email</div>
    </div>
    `
    for ( i in osalejad ) {
        const osaleja = osalejad[i]
        vastus += `
        <div class="row">
            <div class="col-4">${osaleja.nimi}</div>
            <div class="col-8">${osaleja.email}</div>
            <div class="col-12">
                ${osaleja.markus}
                <a href="#" class="btn btn-link" onclick="kustutaOsaleja('${osaleja._id}')">
                    Kustuta
                </a>
            </div>
        </div>
        `
    }
    const matkajadElement = document.getElementById("matka-andmed")
    matkajadElement.innerHTML = vastus
}

async function kustutaOsaleja(id) {
    console.log("Kustuta: " + id)
    let response = await fetch('/api/osaleja/' + id, {method: 'DELETE'})
    tulemus = await response.json()
    console.log(tulemus)
    loeMatkad()
}

loeMatkad()