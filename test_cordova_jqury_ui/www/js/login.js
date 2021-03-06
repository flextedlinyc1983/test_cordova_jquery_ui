﻿var userHandler = {
    username: '',
    status: ''
}

$(document).on('pagebeforechange', function (event, data) {
    var url = $.mobile.path.parseUrl(data.toPage).hash;

    alert(url);


    if (url != undefined && url.substring(0, 5) == "#home") {
        alert(url.substring(0, 5));

        $("#pageTemplate h1.content").html("<a href='#two' class='ui-btn ui-shadow ui-corner-all'>Show page 'two'</a>");

        $.mobile.changePage($("#pageTemplate"));

        event.preventDefault();
    }
});

$(document).on('pagecontainershow', function (e, ui) {
    var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    if (activePage.attr('id') === 'login') {

        $("ul.mm-listview").append("<li><a class='ui-link'>Test</a></li>");

        $(document).on('click', '#submit', function () { // catch the form's submit event
            if ($('#username').val().length > 0 && $('#password').val().length > 0) {

                userHandler.username = $('#username').val();

                // Send data to server through the Ajax call
                // action is functionality we want to call and outputJSON is our data
                $.ajax({
                    url: 'http://192.168.0.90:7500/login',
                    //url: 'http://localhost:1337/login',
                    //data: { name: $('#username').val().trim(), pass: $('#password').val().trim() },
                    //data: { user: $('#check-user').serialize() },
                    //data: $('#check-user').serialize(),
                    //data: JSON.stringify($('#check-user').serialize()),
                    data: { mobile:"true", name: $('#username').val().trim(), pass: $('#password').val().trim() },
                    
                    //data: {username:  $('#username').val().trim() },
                    crossDomain: true,
                    type: 'post',
                    async: 'true',
                    withCredentials: true,
                    //dataType: 'json',
                    beforeSend: function () {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function () {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful
                        if (result.status == 'success') {
                            userHandler.status = result.status;
                            $.mobile.changePage("#home");
                        } else {
                            alert('Logon unsuccessful!');
                        }
                    },
                    error: function (request, error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!');
                    }
                });
            } else {
                alert('Please fill all necessary fields');
            }
            return false; // cancel original event to prevent form submitting
        });
    } else if (activePage.attr('id') === 'home') {
        //activePage.find('.ui-content').text('Wellcome ' + userHandler.username);
        activePage.find('#h2-welcome').text('Wellcome ' + userHandler.username);
    }





});

$(document).on('pagecontainerbeforechange', function (e, ui) {
    var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    //if (activePage.attr('id') === 'home' || activePage.attr('id') === 'pageTemplate') {
        var to = ui.toPage;

        if (typeof to === 'string') {
            var u = $.mobile.path.parseUrl(to);
            to = u.hash || '#' + u.pathname.substring(1);

            if (to === '#login' && userHandler.status === 'success') {
                alert('You cant open a login page while youre still logged on!');
                e.preventDefault();
                e.stopPropagation();

                // remove active status on a button if a transition was triggered with a button
                $('#back-btn').removeClass('ui-btn-active ui-shadow').css({ 'box-shadow': '0 0 0 #3388CC' });


                $("#" + activePage.attr('id') + " li a").removeClass("ui-state-persist ui-btn-active");
                //$("#"  + activePage.attr('id') + " #footer-pageTemplate").addClass("ui-state-persist ui-btn-active");
            }
        }
    //}
});



$(document).on("pagecontainerbeforeshow", function (event, ui) {
    var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    var activePageID = activePage.attr('id');
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
            case "home":
                // Reset the signup form.
                break;
        }
    }
});


$(document).delegate("#entryPost", "pageinit", function (event) {
    var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    if (activePage.attr('id') === 'sessions') {
        $(document).on('click', '#entryPost #post-new-submit', function () {        
            $.ajax({
                url: 'http://192.168.0.90:7500/login',
                //url: 'http://localhost:1337/post',
                data: { mobile: "true", title: $('#title').val().trim(), body: $('#body').val().trim() },
                //data: {
                //    entry: { title: $('#entryPost #title').val().trim(), 'body': $('#entryPost #body').val().trim() }
                //},
                crossDomain: true,
                type: 'post',
                async: 'true',
                withCredentials: true,
                //dataType: 'json',
                beforeSend: function () {
                    // This callback function will trigger before data is sent
                    $.mobile.loading('show'); // This will show Ajax spinner
                },
                complete: function () {
                    // This callback function will trigger on data sent/received complete   
                    $.mobile.loading('hide'); // This will hide Ajax spinner
                },
                success: function (result) {
                    // Check if authorization process was successful
                    if (result.status == 'postsuccess') {
                        $.mobile.changePage("#sessions");
                    } else {
                        alert('Post new unsuccessful!');
                    }
                },
                error: function (request, error) {
                    // This callback function will trigger on unsuccessful action               
                    alert('Network error has occurred please try again!');
                }
            });
        });
    }
});

$(document).delegate("#home", "pagebeforecreate", function (event, ui) {
    var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    var activePageID = activePage.attr('id');
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
            case "home":
                // Reset the signup form.
                break;
        }
    }


});

$(document).delegate("#sessions", "pageshow", function (event, ui) {
    alert('sessions pageshow')

    if (window.localStorage != undefined) {
        if (window.localStorage.getItem("data") != undefined &&
                window.localStorage.getItem("data") != null) {

        } else {
            $("#console").html("Downloading session data...(No Data)");
        }

    } else {
        $("#console").html("Downloading session data...(No localStorage)");
    }

    // var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    // var activePageID = activePage.attr('id');
    // if (typeof ui.toPage == "object") {
    //     switch (ui.toPage.attr("id")) {
    //         case "page-signup":
    //             // Reset the signup form.
    //             app.signupController.resetSignUpForm();
    //             break;
    //         case "page-test":
    //             // Reset the signup form.
    //             app.testController.resetSignUpForm();
    //             break;
    //         case "page-test2":
    //             // Reset the signup form.
    //             break;
    //         case "home":
    //             // Reset the signup form.
    //             break;
    //     }
    // }

    $('#sessions #post-new-btn').click(function () {
        $.mobile.changePage($("#entryPost"));
    });


    var i_page = '1';
    loadSessionAjax(i_page);
    $('#next-btn').click(function () {        
        i_page = (parseInt(i_page) + 1).toString();
        loadSessionAjax(i_page);

        $('#prev-btn').show();
    });

    $('#prev-btn').click(function () {
        i_page = (parseInt(i_page) - 1).toString();
        loadSessionAjax(i_page);

        if (i_page == '1')
        {
            $(this).hide();
        }
    });

    $('#prev-btn').hide();


});