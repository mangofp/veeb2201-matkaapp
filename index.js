const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const matk1 = {
  id: 0,
  nimetus: "Rattamakt Jõgevamaal",
  kirjeldus: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore minima, nemo tempora rem corrupti sequi architecto eius fuga magnam temporibus dolor quam et, omnis illum officia fugit voluptatum perspiciatis! Est.",
  pildiUrl: "/assets/rattamatk.jpg",
  osalejad: []
}

const matk2 = {
  id: 1,
  nimetus: "Süstamatk Kõrvemaal",
  kirjeldus: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore minima, nemo tempora rem corrupti sequi architecto eius fuga magnam temporibus dolor quam et, omnis illum officia fugit voluptatum perspiciatis! Est.",
  pildiUrl: "/assets/syst1.jpg",
  osalejad: []
}

const matkad = [
  matk1, 
  matk2,
  {
    id: 2,
    nimetus: "Matk Vändra metsades",
    kirjeldus: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore minima, nemo tempora rem corrupti sequi architecto eius fuga magnam temporibus dolor quam et, omnis illum officia fugit voluptatum perspiciatis! Est.",
    pildiUrl: "/assets/matkaja.png",  
    osalejad: []  
  }
]

let uudised = [
  {
    id:0,
    pealkiri: "Uudis 1",
    kokkuvote: 'Lühike tekst',
    tekst: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quas dolore fugiat earum cum libero exercitationem fugit facere voluptatibus incidunt, illo iste eos. Facilis veritatis quos molestias dicta itaque rerum!",
    pildiUrl: "/assets/syst_krabi.jpg",
  },
  {
    id:1,
    pealkiri: "Uudis 2",
    kokkuvote: 'Lühike tekst',
    tekst: `
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      </p>
      <p>
        Laudantium quas dolore fugiat earum cum 
        libero <strong>exercitationem fugit</strong> facere voluptatibus incidunt, 
        illo iste eos. Facilis veritatis quos molestias dicta 
      </p>
      <h4>
        Tavaline alapealkiri
      </h4>
      <p>
        itaque rerum!
      </p>  
        `
      ,
    pildiUrl: "/assets/syst1.jpg",
  },
  {
    id:3,
    pealkiri: "Uudis 3",
    kokkuvote: 'Lühike tekst',
    tekst: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quas dolore fugiat earum cum libero exercitationem fugit facere voluptatibus incidunt, illo iste eos. Facilis veritatis quos molestias dicta itaque rerum!",
    pildiUrl: "/assets/syst_krabi.jpg",
  }
]

let matkajad = []

function naitaRegistreerimist(req, res) {
  const index = parseInt(req.params.matk)
  console.log("valitud matk " + index)
  console.log(matkad[index])
  res.render('pages/registreerumine', {matk: matkad[index]})
}

function registreeriOsaleja(req, res) {
  console.log("Serverisse saadeti parameetrid:")
  console.log(req.query)

  if (!req.query.nimi) {
    return res.end("Matkaja nimi peab olemas olema")
  }

  if (!req.query.matkaId) {
    return res.end("Matka identifikaator puudub")
  }

  const matk = matkad[req.query.matkaId]

  if (!matk) {
    return res.send("Matka indeks on vale")
  }

  const uusMatkaja = {
    nimi: req.query.nimi,
    email: req.query.email,
    markus: req.query.markus,
    id: req.query.matkaId,
    matkNimetus: matk.nimetus
  }

  matkajad.push(uusMatkaja)
  matk.osalejad.push(uusMatkaja.email)

  console.log("Kõik matkajad:")
  console.log(matkajad)
  res.render("pages/reg-kinnitus", {matk: matk})
}

function tagastaMatkad(req, res) {
    res.send(matkad)
}

function tagastaOsalejad(req, res) {
  let matkaIndeks = req.params.matk
  let vastusMassiiv = []
  for (i in matkajad) {
    const osaleja = matkajad[i]
    if (osaleja.id == matkaIndeks) {
      vastusMassiiv.push(osaleja)
    } 
  }
  res.send(vastusMassiiv)
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', {matkad: matkad}))
  .get('/kontakt', (req, res) => res.render('pages/kontakt'))
  .get("/uudised", (req, res) => res.render("pages/uudised", { uudised: uudised }))
  .get('/registreerumine/:matk', naitaRegistreerimist) 
  .get('/kinnitus', registreeriOsaleja) // req.query.matkaId
  .get('/api/matk', tagastaMatkad)
  .get('/api/matkaja/:matk', tagastaOsalejad)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
