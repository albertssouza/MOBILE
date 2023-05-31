const params = new URLSearchParams(window.location.search)
const rideId = params.get("id")
const ride = getRideRecord(rideId)

document.addEventListener("DOMContentLoaded",async()=>{


const fisrtPosition = ride.data[0]
const firstLocationData = await getLocationData(fisrtPosition.latitude,fisrtPosition.longitude)




    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d- flex flex-column "

     const cityDiv = document.createElement("div")
     cityDiv.innerText = `${firstLocationData.cit} -${firstLocationData.countryCode}`
     cityDiv.className ="text-primary mb-2"

     const maxSpeedDiv = document.createElement("div")
     maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} Km/h`
     maxSpeedDiv.className = "h5"

     const distanceDiv = document.createElement("div")
     distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`

     const durationDiv = document.createElement("div")
     durationDiv.innerText = ` Duration: ${getDuration(ride)}`
     

     const dateDiv = document.createElement("div")
     dateDiv.innerText = getStartDate(ride)
     durationDiv.className ="text-secondary mt-2"

     
     dataElement.appendChild(cityDiv)
     dataElement.appendChild(maxSpeedDiv)
     dataElement.appendChild(distanceDiv)
     dataElement.appendChild(durationDiv)
     dataElement.appendChild(dateDiv)

     document.querySelector("#data").appendChild(dataElement)

     const deleteButton = document.querySelector("#deleteBtn")
     deleteButton.addEventListener("click",()=>{
        deleteRide(rideId)
        window.location.href = "./"
     })

     const map = L.map("mapdetail")
     map.setView([fisrtPosition.latitude,fisrtPosition.longitude],13)
     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
       
        minZoom: 5,
        maxZoom: 16,
       
    }).addTo(map);

    const positionsArray = ride.data.map((position=>{
        return[position.latitude,position.longitude]
    }))
    const polyLine = L.polyLine(positionsArray, {color: "#F00"})
    polyLine.addTo(map)
    map.fitBounds(polyLine.getBounds())

    
  

    })





