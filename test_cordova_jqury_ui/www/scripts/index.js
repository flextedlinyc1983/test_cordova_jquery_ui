// 如需空白範本的簡介，請參閱下列文件: 
// http://go.microsoft.com/fwlink/?LinkID=397704
// 若要針對在 Ripple 或 Android 裝置/模擬器上載入的頁面，偵錯程式碼: 請啟動您的應用程式，設定中斷點，
// 然後在 JavaScript 主控台中執行 "window.location.reload()"。
var app = {
    self: null,

    // Application Constructor
    initialize: function () {
        self = this;
        self.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');

        document.addEventListener('pause', self.onPause, false);
        document.addEventListener('resume', self.onResume, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        //alert('deviceReady');
    },

    onPause: function () {
        // TODO: 這個應用程式已暫停。請在這裡儲存應用程式狀態。
        alert('onPause');
    },

    onResume: function () {
        // TODO: 這個應用程式已重新啟動。請在這裡還原應用程式狀態。
        alert('onResume');
    }
};

app.initialize();

// End boilerplate code.

app.testController = new TestIt.TestController();



$(document).on("pagecontainerbeforeshow", function (event, ui) {
    if (typeof ui.toPage == "object") {
        switch (ui.toPage.attr("id")) {
            case "page-signup":
                // Reset the signup form.
                app.signupController.resetSignUpForm();
                break;
            case "page-test":
                // Reset the signup form.
                app.testController.resetSignUpForm();
                break;
            case "page-test2":
                // Reset the signup form.
                break;
            case "buttons":
                // Reset the signup form.
                break;
        }
    }
});


$(document).on('pageloadfailed', function (event) {
    //event.preventDefault();
    /* Act on the event */
    alert('pageloadfailed');
});


//$(document).on('pagebeforeload', function (event) {
//    //event.preventDefault();
//    /* Act on the event */
//    alert('pagebeforeload');
//});

$(document).on('pageload', function (event) {
    //event.preventDefault();
    /* Act on the event */
    alert('pageload');
});




$(document).delegate("#buttons", "pagebeforecreate", function () {


    //var buttons = $("div[data-role='page']");
    //var buttons = $("div:jqmData(role='page')");

    //var currentPageId = $.mobile.activePage.attr('id');
    //var currentPageId = $(".selector").pagecontainer("getActivePage");


    //$.mobile.changePage($("#" + currentPageId));

    app.testController.init();
    //app.testController.$btnTest.off("tap").on("tap", function () {
    //    app.testController.onTestCommand();
    //});
    //alert('buttons');

});


var allPages = $("div:jqmData(role='page')");

$("div:jqmData(role='page')").bind('pagebeforecreate', function (event) {
    /* Act on the event */
    alert('all page pagebeforecreate');
});


$(document).delegate("#popup", "pagebeforecreate", function () {


    alert('popup');

});