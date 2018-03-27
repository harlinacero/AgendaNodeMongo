'use strict';

$(function() {
    $('#logout').on('click', function() {//cierra sesión enviando a la página del login
        window.location.href = '/';
    });
});