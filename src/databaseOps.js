var fire = require('./fire');
var emergencyAlert = false;

const database = fire.database();

function getEvents() {
    return database.ref('/events/').once('value');
}

function getConfig() {
    return database.ref('/config/').once('value');
}

function getRegions(eventID) {
    return database.ref('/events/' + eventID + "/regions").once('value');
}

function updateEmergency(lat, lon, eventID) {
    getRegions(eventID).then(snapshot => {
        let emergencyColor = "#ff0000"
        snapshot.forEach(region => {
            if (region.val()["latne"] > lat &&
                region.val()["lonne"] > lon &&
                region.val()["latsw"] < lat &&
                region.val()["lonsw"] < lon) {
                database.ref('/events/' + eventID + "/regions/" + region.key).update({
                    color: emergencyColor
                })
            }
        })
    })
}

function updateRegionBlink(eventID) {
    if (!emergencyAlert) {
        getRegions(eventID).then(snapshot => {
            snapshot.forEach(region => {
                if (region.val()["color"] != "#000000") {
                    console.log('/events/' + eventID + "/regions/" + region.key)
                    database.ref('/events/' + eventID + "/regions/" + region.key).update({
                        color: "#000000"
                    })
                } else {
                    database.ref('/events/' + eventID + "/regions/" + region.key).update({
                        color: "#ffffff"
                    })
                }
            })
        })
    }
}

function postConfig(config) {
    database.ref('/config').set({
        patternName: config.patternName,
        availablePatterns: config.availablePatterns
    })
}

function createEvent(latsw, lonsw, latne, lonne, description, eventID) {
    database.ref('/events/' + eventID).set({
        latsw: latsw,
        lonsw: lonsw,
        latne: latne,
        lonne: lonne,
        description: description
    })

    var latDelta = (latne - latsw) / 30
    var lonDelta = (lonne - lonsw) / 30

    for (var latI = 0; latI < 30; latI++) {
        for (var lonI = 0; lonI < 30; lonI++) {
            var r = (lonI * 10) % 255
            database.ref('/events/' + eventID + '/regions').push({
                color: "rgb(" + '0' + "," + '0' + "," + '0' + ")",
                latsw: latsw + latDelta * (latI - 1),
                lonsw: lonsw + lonDelta * (lonI - 1),
                latne: latne + latDelta * latI,
                lonne: lonne + lonDelta * lonI
            })
        }
    }
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function grid(lat, lon, eventID) {
    return getRegions(eventID).then(snapshot => {
        let color = "#ffffff"
        snapshot.forEach(region => {
            if (region.val()["latne"] > lat &&
                region.val()["lonne"] > lon &&
                region.val()["latsw"] < lat &&
                region.val()["lonsw"] < lon) {
                color = region.val()["color"]
            } else {}
        })
        return color
    })
}


function rainbow(lat, lon, eventId) {
    return new Promise((resolve, reject) => {
        resolve("hsl(" + mod(lat * 150000, 100) / 100 * 360 + ", 100%, 50%)")
    })
}

function circularRainbow(lat, lon, centerLat, centerLon, eventId) {
    return new Promise((resolve, reject) => {
        var distance = Math.pow(Math.pow((lat-centerLat),2)+Math.pow((lon-centerLon),2),0.5)
        var factor = 1.0
        resolve("hsl(" + distance*factor + ", 100%, 50%)")
    })
}

function getColorFunction(patternName) {
    switch(patternName) {
        case "grid":
            return grid
        case "rainbow":
            return rainbow
        case "alert":
            return grid
        case "circularRainvow":
            return circularRainbow
        default:
            return grid
    } 
}

module.exports = {
    getColorFunction: getColorFunction,
    getEvents: getEvents,
    createEvent: createEvent,
    getConfig: getConfig,
    updateRegionBlink: updateRegionBlink,
    updateEmergency: updateEmergency,
    postConfig: postConfig,
}