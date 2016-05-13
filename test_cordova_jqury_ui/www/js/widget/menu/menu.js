$(function () {
    $('nav#menu').mmenu({
        extensions: ['effect-slide-menu', 'pageshadow'],
        searchfield: true,
        counters: true,
        navbar: {
            title: 'Advanced menu'
        },
        navbars: [
            {
                position: 'top',
                content: ['searchfield']
            }, {
                position: 'top',
                content: [
                    'prev',
                    'title',
                    'close'
                ]
            }, {
                position: 'bottom',
                content: [
                    '<a href="http://mmenu.frebsite.nl/wordpress-plugin.html" target="_blank">WordPress plugin</a>'
                ]
            }
        ]
    });
});