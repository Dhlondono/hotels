import { hotelData } from "./api.js"

const main = document.querySelector("main")
const checkIn = document.getElementById("checkIn")
const checkOut = document.getElementById("checkOut")
const priceRooms = document.getElementById("filter-prices")
const buttonClear = document.getElementById("button_clear")

buttonClear.addEventListener("click", (_) => {
  location.reload();
})

const today = new Date()
console.log(today.getTime())
const day = today.getDate()
console.log(day)
const month = today.getMonth() + 1
const year = today.getFullYear()

let datecheckIn = year + "-" + putZero(month) + "-" + putZero(day)
// console.log(datecheckIn)
let datecheckout = year + "-" + putZero(month) + "-" + putZero(day + 1)
// console.log(datecheckout)

checkIn.setAttribute("min", datecheckIn)
checkOut.setAttribute("min", datecheckout)



function putZero(date) {
  let toText = "" + date
  if (toText.length === 1) {
    return "0" + date
  } else {
    return date
  }
}

let hotalData = []
let filterData = []




function filterHotel() {

  let filter = hotalData.filter(hotel => validHotel(hotel)
  );
  main.innerHTML = ""
  filter.forEach(hotel => {
    const cardHotel = document.createElement("div");
    cardHotel.className = "card";
    cardHotel.innerHTML = `
    <img src=${hotel.photo} alt="${hotel.name}" class="hotel-image">
    <h2 class="hotel-name">${hotel.name}</h2>
    <p class="nameCountry">${hotel.country}</p>
    <p class="numberOfRooms">${hotel.rooms} Rooms - </p>
    <p class="priceRooms">${"$".repeat(hotel.price)}</p>
    <p class="hotel_Description">${hotel.description}</p>
    <button class="button_book">Book It</button>`
    main.appendChild(cardHotel);
  })

}



function validHotel(hotel) {
  let dateIn = (new Date(checkIn.value).getTime()) + 86400000
  let dateOut = (new Date(checkOut.value).getTime()) + 86400000
  let todayfrom = today.getTime() + hotel.availabilityFrom - 86400000
  let todayto = todayfrom + hotel.availabilityTo  + 86400000
  // console.log("datein",new Date(dateIn))
  // console.log("todayfrom", new Date(todayfrom), "sum", hotel.availabilityFrom / 1000 / 3600 / 24)
  // console.log("dateout", new Date(dateOut))
  // console.log("todayto", new Date(todayto), "start", new Date(todayfrom), "sum",  hotel.availabilityTo / 1000 / 3600 / 24)
  // console.log((checkIn.value === "" || todayfrom >= parseInt(dateIn)) &&
  //   (checkOut.value === "" || todayto <= parseInt(dateOut)) &&
  //   (priceRooms.value === "" || hotel.price === parseInt(priceRooms.value)),
  //   'checkIn.value === ""',
  //   checkIn.value === "",
  //   'todayfrom >= parseInt(dateIn)',
  //   todayfrom >= parseInt(dateIn),
  //   'checkOut.value === ""',
  //   checkOut.value === "",
  //   'todayto <= parseInt(dateOut)',
  //   todayto <= parseInt(dateOut),
  //   'priceRooms.value === ""',
  //   priceRooms.value === "",
  //   'hotel.price === parseInt(priceRooms.value)',
  //   hotel.price === parseInt(priceRooms.value))
  console.log('todayfrom, dateIn', new Date(todayfrom), new Date(dateIn))
  console.log('todayto, dateOut',new Date(todayto), new Date(dateOut))
  return (checkIn.value === "" || todayfrom <= dateIn) &&
    (checkOut.value === "" || todayto >= dateOut) &&
    (priceRooms.value === "" || hotel.price === parseInt(priceRooms.value))
}

checkIn.addEventListener("change", filterHotel)
checkOut.addEventListener("change", filterHotel)
priceRooms.addEventListener("change", filterHotel)

async function hotelCards() {
  const respuesta = await hotelData();
  hotalData = await respuesta.json();
  filterData = hotalData.slice()
  main.innerHTML = ""
  // filterHotel(2, 10,0)
  printCards()
};

function printCards() {
  main.innerHTML = ""
  let pricesHotel = []
  filterData.forEach((hotel) => {
    const cardHotel = document.createElement("div");
    cardHotel.className = "card";
    main.appendChild(cardHotel);

    const imagenHotel = document.createElement("img");
    imagenHotel.setAttribute("src", hotel.photo);
    imagenHotel.setAttribute("alt", hotel.name);
    imagenHotel.className = "hotel-image";
    cardHotel.appendChild(imagenHotel);

    const nombreHotel = document.createElement("h2");
    nombreHotel.innerText = hotel.name;
    nombreHotel.className = "hotel-name";
    cardHotel.appendChild(nombreHotel);

    const countryname = document.createElement("p")
    countryname.innerText = hotel.country
    countryname.className = "nameCountry"
    cardHotel.appendChild(countryname)

    const numberRooms = document.createElement("p")
    numberRooms.innerText = hotel.rooms + " Rooms - "
    numberRooms.className = "numberOfRooms"
    cardHotel.appendChild(numberRooms)

    const pricetype = document.createElement("p")
    pricetype.className = "priceRooms"
    pricetype.innerText = "$".repeat(hotel.price)
    pricesHotel.push("$".repeat(hotel.price))
    cardHotel.appendChild(pricetype)

    const hotelDescription = document.createElement("p")
    hotelDescription.innerText = hotel.description
    hotelDescription.className = "hotel_Description"
    cardHotel.appendChild(hotelDescription)

    const buttonBook = document.createElement("button")
    buttonBook.innerText = "Book It"
    buttonBook.className = "button_book"
    cardHotel.appendChild(buttonBook)
  });

  const priceNoDuplicate = pricesHotel.filter((price, index) => pricesHotel.indexOf(price) === index).sort((priceFirst, priceSecond) => priceFirst.length - priceSecond.length)
  priceNoDuplicate.forEach(filterPrice => {
    const optionprice = document.createElement("option")
    optionprice.innerText = filterPrice
    optionprice.setAttribute("value", filterPrice.length)
    priceRooms.appendChild(optionprice)
  })
}

hotelCards()


