/**
 * jQuery Mobile React Example
 *
 * Main application script.
 * For variety, this example is written in 100% JSHint-compliant JavaScript, not in JSX.
 *
 * Component structure:
 *
 * - App
 *   |-- JQueryMobilePage (one)
 *   |   |-- JQueryMobileHeader
 *   |   |-- JQueryMobileContent
 *   |   |   |-- PageOneContent
 *   |   |       |-- JQueryMobileButton
 *   |   |-- JQueryMobileFooter
 *   |-- JQueryMobilePage (two)
 *   |   |-- JQueryMobileHeader
 *   |   |-- JQueryMobileContent
 *   |   |   |-- PageTwoContent
 *   |   |       |-- JQueryMobileButton
 *   |   |-- JQueryMobileFooter
 *   |-- JQueryMobilePage (popup)
 *       |-- JQueryMobileHeader
 *       |-- JQueryMobileContent
 *       |   |-- PagePopUpContent
 *       |       |-- JQueryMobileButton
 *       |-- JQueryMobileFooter
 */

 /* global document, React */

'use strict';




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

        //webSQLDatabase();
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

$(document).on('pageload', function (event) {
    //event.preventDefault();
    /* Act on the event */
    alert('pageload');
});

$(document).delegate("#two", "pagebeforecreate", function () {
    alert('two pagebeforecreate');
});

$(document).delegate("#pageTemplate", "pagebeforecreate", function () {
    alert('pageTemplate pagebeforecreate');
});

$(document).delegate('#pageTemplate', 'pageinit', function (event) {
    alert('pageTemplate pageinit');

    $("#pageTemplate").on('swiperight', goToOne);


    $("#pageTemplate").on('tap', pageTemplateTap);

    
    $("#pageTemplate li a").removeClass("ui-state-persist ui-btn-active");
    $("#pageTemplate #footer-pageTemplate").addClass("ui-state-persist ui-btn-active");
});

$(document).delegate('#login', 'pageinit', function (event) {


    var m_str = '';
    for (var i = 0; i < 100; i++) {
        m_str += "<li><a>Test" + i + "</a></li>";
    }
    $("nav#menu ul").html(m_str);

    alert('login pageinit' + ' items:' + $('nav#menu li').length);

    //$('#menu  ul.mm-listview').length
    
    var m_str = '';
    m_str += "<li class='ui-li-has-count ui-li-has-thumb'><a id='1' class='cars ui-btn ui-btn-icon-right ui-icon-carat-r'><img src='https://s.yimg.com/ja/ap/tw/store/f/p0409103844478.jpg'><hx>Test1</hx><p>$2.00</p><span class='ui-li-count ui-body-inherit'>3</span></a></li>";
    m_str += "<li class='ui-li-has-count ui-li-has-thumb'><a id='1' class='cars ui-btn ui-btn-icon-right ui-icon-carat-r'><img src='file:///D:/ted_visualstudio_demo/test_cordova_jqury_ui/test_cordova_jqury_ui/www/images/listview/localfile.jpg'><hx>Test1</hx><p>$2.00</p><span class='ui-li-count ui-body-inherit'>3</span></a></li>";
    for (var i = 0; i < 20; i++) {
        m_str += "<li data-role='list-divider'>" + "Group" + i ;
        //m_str += "  <ul data-role='listview' class='nested-listview-1'>";
        for (var j = 1; j < 7; j++) {
            m_str += "<li><a id='" + j + "' class='cars'><img src='images/listview/" + j + ".jpg'><hx>Test" + j + "</hx>" +
                "<p>$"+ 2*j + ".00</span></p><span class='ui-li-count'>"+ 3*j +"</span></a></li>";
        }
        //m_str += "  </ul>";
        m_str += "</li>";
    }
    alert($("#pageTemplate ul").length);
    $("#pageTemplate ul.nested-listview-0").html(m_str);
    //$("#pageTemplate .nested-listview-0").listview('refresh');
    //$("#pageTemplate .nested-listview-1").listview('refresh');

    $("#footer-home").addClass("ui-state-persist");
    

});

function pageTemplateTap() {
    console.log("pageTemplateTap ok");
};

function goToOne() {
    $.mobile.changePage("#one", { reverse: true });
    $("#pageTemplate").unbind('swiperight', goToOne);
};

$(document).delegate('#two', 'pageinit', function (event) {
    alert('two pageinit');
});


$(document).delegate('#popup', 'pageinit', function (event) {
    alert($(".header").length);
    $("#popup div.header").remove();
    $("#popup div.ui-navbar").remove();
});

$(window).bind("orientationchange", function (orientation) {
    if (orientation.orientation == 'landscape') {
        alert('landscape');
    } else {
        alert('portrait');
    }
});


/** Main application component. */
var App = React.createClass({
  displayName: 'App',

  render: function() {
      return React.DOM.div({ className: 'app' },
      JQueryMobilePage({ id: 'login' }, LoginContent(null)),
      JQueryMobilePage({ id: 'home' }, HomeContent(null)),
      JQueryMobilePage({ id: 'two' }, PageTwoContent(null)),
      JQueryMobilePage({id:'one'}, PageOneContent(null)),
      JQueryMobilePage({id:'popup', headerTheme:'b'}, PagePopUpContent(null)),
      JQueryMobilePage({ id: 'pageTemplate' }, PageTemplateContent(null)),
      JQueryMobilePage({ id: 'sessions' }, sessionsContent(null))
    );
  }
});
App = React.createFactory(App);

/** jQuery Mobile button component. */
var JQueryMobileButton = React.createClass({
  displayName: 'JQueryMobileButton',

  getDefaultProps: function() {
    return {className:'ui-btn ui-shadow ui-corner-all'};
  },

  render: function() {
    return React.DOM.p(null,
      React.DOM.a(this.props, this.props.children)
    );
  }
});
JQueryMobileButton = React.createFactory(JQueryMobileButton);

/** jQuery Mobile page content component. */
var JQueryMobileContent = React.createClass({
  displayName: 'JQueryMobileContent',

  render: function() {
    return React.DOM.div({role:'main', className:'ui-content'},
      this.props.children
    );
  }
});
JQueryMobileContent = React.createFactory(JQueryMobileContent);

/** jQuery Mobile menu component. */
var JQueryMobileMenu = React.createClass({
    displayName: 'JQueryMobileMenu',

    render: function () {
        return React.DOM.nav({ 'id': 'menu' },
          React.DOM.ul(null, 
           React.DOM.li(null, React.DOM.a(null,'Home')),
           React.DOM.li(null, React.DOM.a(null,'About us'))));
    }
});
JQueryMobileMenu = React.createFactory(JQueryMobileMenu);

/** jQuery Mobile footer component. */
var JQueryMobileFooter = React.createClass({
  displayName: 'JQueryMobileFooter',

  render: function() {
    return React.DOM.div({'data-role':'footer', 'data-position':'fixed'},
      React.DOM.div({ 'data-role': 'navbar' },
         React.DOM.ul(null,
            React.DOM.li(null, React.DOM.a({'id':'footer-home','href':'#login','class':'ui-btn-active'},'Home')),
            React.DOM.li(null, React.DOM.a({ 'id': 'footer-pageTemplate', 'href': '#pageTemplate' }, 'pageTemplate')),
            React.DOM.li(null, React.DOM.a({'href':'#sessions'},'Sessions')),
            React.DOM.li(null, React.DOM.a({'href':'#'},'News'))
            )
        )
    );
  }
});
JQueryMobileFooter = React.createFactory(JQueryMobileFooter);

/** jQuery Mobile header component. */
var JQueryMobileHeader = React.createClass({
  displayName: 'JQueryMobileHeader',

  render: function() {
    return React.DOM.div({'data-role':'header', 'data-theme':this.props.headerTheme, 'data-position':'fixed'},
      React.DOM.h1(null, this.props.title),
      //menu
      React.DOM.div({className:'header'}, React.DOM.a({'href':'#menu'},''))
    );
  }
});
JQueryMobileHeader = React.createFactory(JQueryMobileHeader);

/** jQuery Mobile page component. */
var JQueryMobilePage = React.createClass({
  displayName: 'JQueryMobilePage',

  getDefaultProps: function() {
    return {'data-role':'page', 'data-theme':'a', headerTheme:'a'};
  },

  render: function() {
    var props = {};
    for (var key in this.props) {
      props[key] = this.props[key];
    }
    return React.DOM.div(props,
      JQueryMobileHeader({title:'Page ' + this.props.id, headerTheme:this.props.headerTheme}),
      JQueryMobileContent(null, this.props.children),
      //JQueryMobileMenu(null),
      JQueryMobileFooter(null)
    );
  }
});
JQueryMobilePage = React.createFactory(JQueryMobilePage);

/** Application page login component. */
var HomeContent = React.createClass({
    displayName: 'HomeContent',

    render: function () {
        return React.DOM.div(null,
          React.DOM.h2({ "id": "h2-welcome" }, 'Wellcome '),
          JQueryMobileButton({ href: '#login' }, 'Login'),
          JQueryMobileButton({ href: '#two' }, 'Show page "two"'));
    }
});
HomeContent = React.createFactory(HomeContent);


/** Application page login component. */
var LoginContent = React.createClass({
    displayName: 'LoginContent',

    render: function () {
        return React.DOM.form({"id":"check-user","class":"ui-body ui-body-a ui-corner-all", "data-ajax": "false"},
          React.DOM.fieldset(null,  
            React.DOM.div({"data-role":"fieldcontain"},
                React.DOM.label({"for":"username"},"Enter your name:"),
                React.DOM.input({ "type": "text", "name": "user[name]", "id": "username", placeholder: "Enter your name:" })),
          React.DOM.div({"data-role":"fieldcontain"},
                React.DOM.label({"for":"password"},"Enter your password:"),
                React.DOM.input({ "type": "password", "name": "user[pass]", "id": "password"})),
            React.DOM.input({ "type": "button","data-theme":"b",name:"submit", id:"submit", value:"Submit" }))
        );
        
        //return React.DOM.div(null,
        //  React.DOM.h2(null, 'One'),
          
        //  React.DOM.p(null,
        //    'I have an ',
        //    React.DOM.code(null, 'id'),
        //    ' of "one" on my page container. I\'m first in the source order so I\'m shown when the page loads.'
        //  ),
        //  React.DOM.p(null, 'This is a multi-page boilerplate template that you can copy to build your first jQuery Mobile page. This template contains multiple "page" containers inside, unlike a single page template that has just one page within it.'),
        //  React.DOM.p(null, 'Just view the source and copy the code to get started. All the CSS and JS is linked to the jQuery CDN versions so this is super easy to set up. Remember to include a meta viewport tag in the head to set the zoom level.'),
        //  React.DOM.p(null,
        //    'You link to internal pages by referring to the ',
        //    React.DOM.code(null, 'id'),
        //    ' of the page you want to show. For example, to ',
        //    React.DOM.a({ href: '#two' }, 'link'),
        //    ' to the page with an ',
        //    React.DOM.code(null, 'id'),
        //    ' of "two", my link would have a ',
        //    React.DOM.code(null, 'href="#two"'),
        //    ' in the code.'
        //  ),
        //  React.DOM.h3(null, 'Show internal pages:'),
        //  JQueryMobileButton({ href: '#two' }, 'Show page "two"'),
        //  JQueryMobileButton({ href: '#popup', 'data-rel': 'dialog', 'data-transition': 'pop' }, 'Show page "popup" (as a dialog)')
        //);
    }
});
LoginContent = React.createFactory(LoginContent);

/** Application page one component. */
var sessionsContent = React.createClass({
    displayName: 'sessionsContent',

    render: function () {
        return React.DOM.div(null,          
          React.DOM.p({ 'id': 'console' }, null),
          React.DOM.ul({'data-role':'list-view', 'data-inset':'true', 'id':'slots'}, null),
          React.DOM.div({ 'data-role': 'controlgroup', 'data-type': 'horizontal' },
            React.DOM.a({ 'id': 'prev-btn', 'data-role': 'button' }, 'prev'),
			React.DOM.a({ 'id': 'next-btn', 'data-role': 'button' }, 'next')
	        )//,
          //React.DOM.div({ 'class': "ui-grid-a ui-responsive" },
          //  React.DOM.div({ 'class': "ui-block-a" },
          //          React.DOM.a({'data-role': 'button', 'data-inline': 'true' }, 'test1')
          //      ),
          //  React.DOM.div({'class':"ui-block-b"},
		  //          React.DOM.a({'data-role': 'button', 'data-inline':'true' }, 'test2')		
		  //      )
	      //  ),
          //React.DOM.div({ 'class': "ui-grid-solo" },
          //  React.DOM.div({ 'class': "ui-block-a" },
          //          React.DOM.a({ 'data-role': 'button', 'class':"ui-btn ui-shadow ui-corner-all"}, 'Grid Solo' )
          //      )
	      //  )
        );
    }
});
sessionsContent = React.createFactory(sessionsContent);

/** Application page one component. */
var PageTemplateContent = React.createClass({
    displayName: 'PageTemplateContent',

    render: function () {
        return React.DOM.div(null,
          React.DOM.h1({ className: 'content' }, 'Template'),
          React.DOM.div({ className: 'content', 'data-role': 'content'},
            React.DOM.ul({ 'data-filter':'true', className:'nested-listview-0', 'data-role': 'listview','data-inset':'true' }, 'Template'))
        );
    }
});
PageTemplateContent = React.createFactory(PageTemplateContent);

/** Application page one component. */
var PageOneContent = React.createClass({
  displayName: 'PageOneContent',

  render: function() {
    return React.DOM.div(null,
      React.DOM.h2(null, 'One'),
      React.DOM.p(null,
        'I have an ',
        React.DOM.code(null, 'id'),
        ' of "one" on my page container. I\'m first in the source order so I\'m shown when the page loads.'
      ),
      React.DOM.p(null, 'This is a multi-page boilerplate template that you can copy to build your first jQuery Mobile page. This template contains multiple "page" containers inside, unlike a single page template that has just one page within it.'),
      React.DOM.p(null, 'Just view the source and copy the code to get started. All the CSS and JS is linked to the jQuery CDN versions so this is super easy to set up. Remember to include a meta viewport tag in the head to set the zoom level.'),
      React.DOM.p(null,
        'You link to internal pages by referring to the ',
        React.DOM.code(null, 'id'),
        ' of the page you want to show. For example, to ',
        React.DOM.a({href:'#two'}, 'link'),
        ' to the page with an ',
        React.DOM.code(null, 'id'),
        ' of "two", my link would have a ',
        React.DOM.code(null, 'href="#two"'),
        ' in the code.'
      ),
      React.DOM.h3(null, 'Show internal pages:'),
      JQueryMobileButton({href:'#two'}, 'Show page "two"'),
      JQueryMobileButton({href:'#popup', 'data-rel':'dialog', 'data-transition':'pop'}, 'Show page "popup" (as a dialog)')
    );
  }
});
PageOneContent = React.createFactory(PageOneContent);

/** Application page two component. */
var PageTwoContent = React.createClass({
  displayName: 'PageTwoContent',

  render: function() {
    return React.DOM.div(null,
      React.DOM.h2(null, 'Two'),
      React.DOM.p(null, 'I have an id of "two" on my page container. I\'m the second page container in this multi-page template.'),
      React.DOM.p(null, 'Notice that the theme is different for this page because we\'ve added a few ',
        React.DOM.code(null, 'data-theme'),
        ' swatch assigments here to show off how flexible it is. You can add any content or widget to these pages, but we\'re keeping these simple.'),
      JQueryMobileButton({href:'#one', 'data-direction':'reverse', className:'ui-btn ui-shadow ui-corner-all ui-btn-b'}, 'Back to page "one"')
    );
  }
});
PageTwoContent = React.createFactory(PageTwoContent);

/** Application popup page component. */
var PagePopUpContent = React.createClass({
  displayName: 'PagePopUpContent',

  render: function() {
    return React.DOM.div(null,
      React.DOM.h2(null, 'Popup'),
      React.DOM.p(null, 'I have an id of "popup" on my page container and only look like a dialog because the link to me had a ',
        React.DOM.code(null, 'data-rel="dialog"'),
        ' attribute which gives me this inset look and a ',
        React.DOM.code(null, 'data-transition="pop"'),
        ' attribute to change the transition to pop. Without this, I\'d be styled as a normal page.'),
      JQueryMobileButton({href:'#one', 'data-rel':'back', className:'ui-btn ui-shadow ui-corner-all ui-btn-inline ui-icon-back ui-btn-icon-left'}, 'Back to page "one"')
    );
  }
});
PagePopUpContent = React.createFactory(PagePopUpContent);

// Render application.
ReactDOM.render(App(null), document.getElementById('content'));
ReactDOM.render(JQueryMobileMenu(null), document.getElementById('div-menu'));

var allPages = $("div:jqmData(role='page')");

var db;




function webSQLDatabase() {
    try {
        alert((!window.openDatabase) ? "WEBSQL" : "local");

        db = window.openDatabase('mydb', '1.0', 'first db', 2 * 1024 * 1024);

        db.transaction(function (tx) {
            tx.executeSql('Select * from employees', [], function (tx, results) {
                var len = results.rows.length, i;
                for (i = 0; i < len; i++) {
                    alert(results.rows.item(i).firstName);
                }
            },null);
        });
    } catch (e) {
        alert(e.message);
    }

    if (!db) {
        alert('Can not connect to webSQLDatabse');
    } else {
        alert('webSQLDatabse ok');
    }
}


function loadSessionAjax(page) {
    $.ajax({
        url: 'http://192.168.0.90:7500/api/entries/'+ page,
        type: 'GET',
        dataType: 'json'
        // data: {param1: 'value1'}
    }).done(function (data, textStatus, xhr) {
        alert("sessions success");
        if (window.localStorage != undefined) {
            if (window.localStorage.getItem("data") != undefined &&
                    window.localStorage.getItem("data") != null) {

                if(xhr.responseText == window.localStorage.getItem("data")){
                    $("#console").html("Schedule is updated");
                    showSessions(xhr.responseText);
                }else {
                    //if (confirm("Do you want to load it??")) {
                    //    showSessions(xhr.responseText);
                    //} else {
                    //    $("#console").html("Schedule will be updated later");
                    //}

                        showSessions(xhr.responseText);
                }

            } else {
                $("#console").html("Schedule is updated");
                showSessions(xhr.responseText);
            }

        } else {
            $("#console").html("Schedule is updated");
            showSessions(xhr.responseText);
        }

    }).fail(function () {
        alert("sessions error");
    }).always(function () {
        alert("sessions complete");
    });
}

var data;
var isFirstLoad = true;

function showSessions(string) {
    if (window.JSON != undefined) {
        data = JSON.parse(string);
    } else {
        data = eval("(" + string + ")");
    }
    if (window.localStorage != undefined) {
        window.localStorage.setItem("data", string);
    }

    $('#sessions #slots').html('');

    var html = '';
    for (var i = 0; i < data.length; i++) {
        if(data[i].body != null){
            html += "<li data-role='list-divider' data-groupingtheme='e'>" + data[i].username + ": " + data[i].title + "   " + "<pre style='white-space:pre-wrap; word-wrap:break-word'>" + data[i].body + "</pre>" + "</li>";
        } else {
            html += '';
        }
    }

    $('#sessions #slots').html(html);
    
    if(isFirstLoad){
        $('#sessions #slots').listview();
        isFirstLoad = false;
    } else {
        $('#sessions #slots').listview('refresh');
    }


}