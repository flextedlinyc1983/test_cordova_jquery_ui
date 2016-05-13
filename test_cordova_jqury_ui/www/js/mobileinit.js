$(document).on("mobileinit", function (event, ui) {
    //$.mobile.defaultPageTransition = "slide";
    //$.mobile.defaultPageTransition = "fade";

    //$.mobile.ns = "firt";

    //$.mobile.page.prototype.options.addBackBtn = true;
    //$.mobile.page.prototype.options.BackBtnTheme = "e";

    //$.mobile.defaultPageTransition = "fade";

    //$.mobile.touchOverflowEnabled = true;

    //$.mobile.changePage($("#buttons"), {
    //    transition: "fade",
    //    reverse: true
    //});

    //alert('mobileinit');


    //$("#index").bind("swiperight", goBackToPage1);

    
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    $.mobile.changePage.defaults.changeHash = false;
});


//function goBackToPage1() {
//    alert('goBackToPage1');
//}

