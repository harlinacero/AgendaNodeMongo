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
		events: function(){
			cargarEventos()			
		},
		eventDrop: function(event){
            actualizarEvento(event)		
        },
		eventDragStart: (event,jsEvent) => {
            $('.delete-btn').find('img').attr('src', "img/trash-open.png");
            $('.delete-btn').css('background-color', '#a70f19')

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
      },error: function(error){
		  console.log(error);
	  }
    })
}

function actualizarEvento(evento){
	let id = evento._id,
		title = evento.title,
		start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
		end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
		form_data = new FormData(),
		start_date,
		end_date,
		start_hour,
		end_hour

	start_date = start.substr(0,10)
	end_date = end.substr(0,10)
	start_hour = start.substr(11,8)
	end_hour = end.substr(11,8)


	form_data.append('id', id)
	form_data.append('title', title)
	form_data.append('start_date', start_date)
	form_data.append('end_date', end_date)
	form_data.append('start_hour', start_hour)
	form_data.append('end_hour', end_hour)
		
	console.log(id);
		
	$.ajax({
	  url: 'eventos/actulizar_evento',
	  datatype: "json",
	  cache: false,
	  processdata: false,
	  contenttype: false,
	  data: {
		  id: id
	  },
	  type: 'get',
	  success: function(response){
		alert(response)
	  },
	  error: function(error){
		alert("error en la comunicación con el servidor");
	  }
    })
		
}
	