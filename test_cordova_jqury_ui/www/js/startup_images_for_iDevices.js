(function () {
    var a;
    if (navigator.platform === "iPad") {
        a = window.orientation !== 90 || window.orientation === -90 ? "images/startup-tablet-landscape.png" : "images/startup-tablet-portrait.png"
    } else {
        a = window.devicePixelRatio === 2 ? "images/startup-retina.png" : "images/startup.png"
    }
    document.write('<link rel="apple-touch-startup-image" href="' + a + '"/>')
})()