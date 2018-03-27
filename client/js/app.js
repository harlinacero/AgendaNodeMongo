'use strict';

class EventManager {
    constructor() {
        this.urlBase = "/events";
        this.obtenerDataInicial();
        this.inicializarFormulario();
        this.guardarEvento();
    }

	//cargar todos los eventos del usuario, se carga desde los datos enviados por el servidor
    obtenerDataInicial() {
        let url = this.urlBase + "/all";
        $.get(url, (response) => {
            if (typeof(response) == "string")
                window.location.href = '/';
            else
                this.inicializarCalendario(response);
        });
    }

	//se envia a la dirección update de events, los parámetros nuevos y el id del evento para modificar
    actualizarEvento(evento) {
        $.post('/events/update/' + evento._id, {ini: evento.start.format(), fin: evento.end.format(), id: evento._id}, (response) => {
            console.log(response);
			alert(response);
        });
    }

	//se envía a la dirección delete el id del evento para eliminar
    eliminarEvento(evento) {
        let eventId = evento._id;
        $.post('/events/delete/' + eventId, { id: eventId }, (response) => {
           // alert(parseInt(response.n) > 0 ? "Evento borrado...": "Error al grabar");
		   alert(response);
        });
    }

	//al presionar el botón agregar, se envían los parámetros del formulario a la dirección del servidor
    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault();
            let start = $('#start_date').val(),
                title = $('#titulo').val(),
                end = '',
                start_hour = '',
                end_hour = '';

            if (!$('#allDay').is(':checked')) {//verificación del campo: todo el dia, si está activo inhabilita los demás campos del formulario
                end = $('#end_date').val();
                start_hour = $('#start_hour').val();
                end_hour = $('#end_hour').val();
                if (start_hour !== "") 
                    start = start + 'T' + start_hour;
                if (end_hour !== "")
                    end = end + 'T' + end_hour  ;
            }
            let url = this.urlBase + "/new";//dirección del servidor donde se ejecutará la acción
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end
                };
                $.post(url, ev, (response) => {
                    this.inicializarFormulario();
                    ev._id = response.id;
                    $('.calendario').fullCalendar('renderEvent', ev);
                    alert(parseInt(response.total) > 0 ? "Registro grabado correctamente...": "Error al grabar");
                });
            } else {
                alert("Complete los campos obligatorios para el evento");
            }
        });
    }

    inicializarFormulario() {//iniciar los valores del formulario, selectores de fecha y hora
        $('#start_date, #titulo, #end_date, #start_hour, #end_hour').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function () {
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled");
            } else {
                $('.timepicker, #end_date').removeAttr("disabled");
            }
        });
    }

    inicializarCalendario(eventos) {//iniciarlizar lib de calendario
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: new Date(),//mostrar por defecto la fecha actual
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {//escucha el movimiento de un evento
                this.actualizarEvento(event);
            },
            events: eventos,//pinta los eventos traidos de la lista
            eventDragStart: (event, jsEvent) => {//activa el ícono de la caneca para eliminar el evento
                $('.delete').find('img').attr('src', "img/trash-open.png");
                $('.delete').css('background-color', '#a70f19');
            },
            eventDragStop: (event, jsEvent) => {//reconoce movimiento del evento hacia la sección de eliminar
                $('.delete').find('img').attr('src', "img/delete.png");
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                    this.eliminarEvento(event);//activa la función eliminar
                    $('.calendario').fullCalendar('removeEvents', event._id);//actualiza el calendario
                }
            }
        });
    }
}

const Manager = new EventManager();
