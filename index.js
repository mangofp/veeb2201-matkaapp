const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const matk1 = {
  id: 0,
  nimetus: "Rattamakt Jõgevamaal",
  kirjeldus: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore minima, nemo tempora rem corrupti sequi architecto eius fuga magnam temporibus dolor quam et, omnis illum officia fugit voluptatum perspiciatis! Est.",
  pildiUrl: "./assets/rattamatk.jpg",
  osalejad: ['mati@matkaja.ee', 'kati@matkaja.ee']
}

const matk2 = {
  id: 1,
  nimetus: "Süstamatk Kõrvemaal",
  kirjeldus: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore minima, nemo tempora rem corrupti sequi architecto eius fuga magnam temporibus dolor quam et, omnis illum officia fugit voluptatum perspiciatis! Est.",
  pildiUrl: "./assets/syst1.jpg",
  osalejad: ['klaabu@suurmeri.ee']
}

const matkad = [
  matk1, 
  matk2,
  {
    id: 3,
    nimetus: "Matk Vändra metsades",
    kirjeldus: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore minima, nemo tempora rem corrupti sequi architecto eius fuga magnam temporibus dolor quam et, omnis illum officia fugit voluptatum perspiciatis! Est.",
    pildiUrl: "./assets/matkaja.png",  
    osalejad: []  
  }
]

function naitaRegistreerimist(req, res) {
  const index = parseInt(req.params.matk)
  console.log("valitud matk" + index)
  console.log(matkad[index])
  res.render('pages/registreerumine', {matk: matkad[index]})
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', {matkad: matkad}))
  .get('/kontakt', (req, res) => res.render('pages/kontakt'))
  .get('/regist/:matk', naitaRegistreerimist)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
