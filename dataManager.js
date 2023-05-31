

async function getLocationData(latitude,longitude){
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en`

    const response = await fetch(url)

    return await response.json()
}

function getMaxSpeed(positions){

    let maxSpeed = 0
    if(positions.speed != null && positions.speed > maxSpeed)
    maxSpeed = positions.speed
    
    return  (maxSpeed * 3.6).toFixed(1)

}

function getDistance(positions){
    const earthRadiusKm = 6371
    let totalDistance = 0
    for(let i = 0; i < positions.length -1; i++){
        const p1 = { latitude:[i].latitude, longitude:positions[i].longitude
        }
        const p2 = { latitude:[i + 1].latitude, longitude:positions[i + 1].longitude
        }
        const deltaLatitude = toRad(p2.latitude - p1.latitude)
        const deltaLongitude = toRad(p2.longitude - p1.longitude)

        const a = Math.sin(deltaLatitude / 2) * 
        Math.sin(deltaLatitude / 2) + 
        Math.sin(deltaLongitude/2) *
        Math.sin(deltaLongitude/2) *
        Math.cos(toRad(p1.latitude)) * 
        Math.cos(toRad(p2.latitude))

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

        const distance = earthRadiusKm * c

        totalDistance += distance

        
    }

    function toRad(degree){
        return degree * Math.PI / 180
    }

    return totalDistance.toFixed(2)
    

   }

   function getDuration(ride){

    function format ( number, digits){
        return String(number.toFixed(0)).padStart(2, '0')
    }

    const interval = (ride.stopTime - ride.stratTime) / 1000

    const minutes = Math.trunc(interval / 60)
    const seconds = interval % 60
    
    return `${format(minutes,2)}:${format(seconds,2)}`

   }

   function getStartDate(ride){
    console.log(ride)
    const d = new Date(ride.stratTime)
    const day = d.toLocaleString("en-Us", {day: "numeric"})
    const month = d.toLocaleString("en-Us", {month: "numeric"})
    const year = d.toLocaleString("en-Us", {year: "numeric"})

    const hour = d.toLocaleString("en-Us", {hour: "2-digit", hour12: false})
    const minute = d.toLocaleString("en-Us", {minute: "2-digit"})

    return `${hour}:/${minute} - ${month} ${day}, ${year}`

   }

