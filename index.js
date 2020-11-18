/*
------------------------- PASOS A SEGUIR -------------------------

0) Buscar en la tienda
1) Obtener resultados ordenados por el más barato
2) Coger la url del primero y obtener sus datos
3) Coger el precio del producto

*/

// -------------------------
// Paso 0: Importar paquetes
// -------------------------

const request = require("request")
const cheerio = require("cheerio")

// ---------------------------
// Paso 1: Buscar en la tienda
// ---------------------------

// ---------- 1.1. Configurar la petición de búsqueda ----------

//https://www.pccomponentes.com/buscar/?query=sony+playstation+4

let urlShop = "https://www.pccomponentes.com"
let searchParams = "/buscar/?query="
let keywords = "sony+playstation+4"
let options = "" // Sin opciones de búsqueda
//let options = "#pg-0&or-price-asc" // Primero el más barato

let optionsSearch = {
  url: urlShop + searchParams + keywords + options,
  headers: {}
}

// ---------- 1.2. Lanzar la petición de búsqueda ----------

request(optionsSearch, (error, response, body) => {
  
  // Si todo va bien...
  if (!error && response.statusCode == 200) {
    
    // Interpretar ("parsear") el código HTML
    const $ = cheerio.load(body)
    
    // Mostrar el HTML interpretado por consola
    //console.log(body)
    
// ------------------------------------------
// Paso 2: Obtener datos finales del producto
// ------------------------------------------

// ------ 2.1. Capturar ("scrapear") el enlace del producto ------

    let urlProduct = $("#articleListContent").find("a").attr("href")

    //console.log(urlProduct)

// ------ 2.2. Configurar la petición de obtener producto ------

    let optionsProduct = {
      url: urlShop + urlProduct,
      headers: {}
    }

// ------ 2.3. Lanzar la petición de obtener producto ------

    request(optionsProduct, (error, response, body) => {

      // Si todo va bien...
      if (!error && response.statusCode == 200) {

        // Interpretar ("parsear") el código HTML
        const $ = cheerio.load(body)

        // Mostrar el HTML interpretado por consola
        //console.log(body)

  // ------ 2.4. Capturar ("scrapear") el precio del producto ------

        let costProduct = $("#precio-main").attr("data-price")
        //let costProduct = $("#precio-main > span.baseprice").text()

        // Mostrar el precio por consola
        console.log(costProduct)
      }
    })
  }
})