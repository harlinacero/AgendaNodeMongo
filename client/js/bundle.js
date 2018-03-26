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
      events: {
        url: 'users/cargar_eventos',
        error: function() {
          $('#script-warning').show();
        }
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
        //console.log(nom+"  "+pas);
        $.post('/users/agregar_evento',{titulo:tit,fechai:sda,fechaf:eda,hi:sho,hf:eho}, function(response) {
            alert(response);
            window.location.reload(true);
        })
    })
	
	
	
  });