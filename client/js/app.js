$(document).ready(function() {
	
    $("#start_date").datepicker();
    $("#end_date").datepicker();
    $("#start_hour").timepicker({
      timeFormat: 'h:mm p',
      interval: 60,
      minTime: '10',
      maxTime: '6:00pm',
      defaultTime: '11',
      startTime: '10:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true
	});
	$("#end_hour").timepicker({
      timeFormat: 'h:mm p',
      interval: 60,
      minTime: '10',
      maxTime: '6:00pm',
      defaultTime: '11',
      startTime: '10:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true
	});

    $('.calendario').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listWeek'
		},
		defaultDate: new Date(),
		editable: true,
		droppable: true,
		navLinks: true, // can click day/week names to navigate views
		eventLimit: true, // allow "more" link when too many events
		// events: function(){
			// //cargarEventos()			
			// url: 'users/cargarEventos',
			
		// },
		eventSources:{
			url:'eventos/cargarEventos',
		},
		eventDrop: function(event){
            actualizarEvento(event)		
        },
		eventDragStart: (event,jsEvent) => {
            $('.delete-btn').find('img').attr('src', "img/trash-open.png");
            $('.delete-btn').css('background-color', '#a70f19');
			eliminarEvento(event);
          },
		loading: function(bool) {
			$('#loading').toggle(bool);
		}

    });
	
	$('#save').on('click', function(event) {
		
        var tit = $('#titulo').val();
        var sda = $('#start_date').val();
        var eda = $('#end_date').val();
        var sho = $('#start_hour').val();
        var eho = $('#end_hour').val();
        AgregarEvento(tit, sda, eda, sho, eho);
    })
	
	
	
	$('.logout-container').on('click', function(event){
		alert("Está saliendo de la aplicación");
		location.href = "index.html";
	})
	
});


function cargarEventos(){
	$.ajax({
      url: 'eventos/cargarEventos',
      method: 'GET',
      data: {},
      success: function(data) {
        console.log(data)
      }
    })
}

function AgregarEvento(titulo, fechaInicial, fechaFinal, horaInicial, horaFinal){
	var id = titulo.trim() + Math.floor(Math.random(0),100) + 1;
	$.ajax({
      url: 'eventos/agregarEvento',
      method: 'POST',
      data: {
		id:id,
		title:titulo,
		start:fechaInicial,
		end:fechaFinal,
		hstart: horaInicial,
		hend: horaFinal
	  },
      success: function(data) {
        alert(data);
		location.reload();
      },error: function(error){
		  console.log(error);
	  }
    })
}

function actualizarEvento(evento){
	let id = evento.id,
		title = evento.title,
		date_start = moment(evento.start).format('DD/MM/YYYY'),
		date_end = moment(evento.end).format('DD/MM/YYYY');
		hour_start = moment(evento.hstart).format('HH:mm:ss'),
		hour_end = moment(evento.hend).format('HH:mm:ss');
		
	$.ajax({
	  url: 'eventos/actulizarEvento',
	  datatype: "json",
	  cache: false,
	  method: 'POST',
	  processdata: false,
	  contenttype: false,
	  data: {
		  id: id,
		  title:title,
		  start:date_start,
		  end: date_end,
		  hstart: hour_start,
		  hend: hour_end
	  },
	  success: function(response){
		alert(response)
	  },
	  error: function(error){
		alert(error);
	  }
    })
		
}

function eliminarEvento(evento){
	var id = evento._id;
	console.log(id);
}
	