
window.addEventListener('load', () => {
	
	// Traemos información de los países, sin filtro
	fetch("https://covid-193.p.rapidapi.com/statistics", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid-193.p.rapidapi.com",
			"x-rapidapi-key": "487e9c6602mshfe0920390d958dep11c592jsn3c1ead90861d"
		}
	})
	.then(res => res.json())
	.then(datos => {
		listarPaises(datos.response);
	})

	// Traemos información de Guatemala
	fetch("https://covid-193.p.rapidapi.com/statistics?country=Guatemala", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid-193.p.rapidapi.com",
			"x-rapidapi-key": "487e9c6602mshfe0920390d958dep11c592jsn3c1ead90861d"
		}
	})
	.then(res => res.json())
	.then(datos => {
		listarGuate(datos.response);
	})

})

var contenido = document.querySelector('#contenido');

var listarGuate = function (dataApi) {
	// console.log(dataApi);

	// console.log(datos);
	contenido.innerHTML = '';

	for(let valor of dataApi) {
		// console.log(valor.country);
		contenido.innerHTML += `
			<tr>
				<th scope="row">${ valor.country }</th>
				<td>${ valor.cases.new }</td>
				<td>${ valor.cases.active }</td>
				<td>${ valor.cases.recovered }</td>
				<td>${ valor.cases.critical }</td>
				<td>${ valor.deaths.total }</td>
				<td>${ valor.cases.total }</td>
			</tr>
		`

		// Bar chart
		new Chart(document.getElementById("bar-chart"), {
			type: 'bar',
			data: {
			labels: ["Nuevos", "Activos", "Recuperados", "Críticos", "Muertes"],
			datasets: [
				{
					label: "Número de casos",
					backgroundColor: ["#ffee58", "#546e7a", "#4caf50", "#d32f2f", "#000000"],
					data: [
						valor.cases.new,
						valor.cases.active,
						valor.cases.recovered,
						valor.cases.critical,
						valor.deaths.total
					]
				}
			]
			},
			options: {
			legend: { display: false },
			title: {
				display: true,
				text: 'Casos de COVID-19 en Guatemala'
			}
			}
		});

	}

}

var reloadTable = function() {
	$('#table_paises').DataTable().ajax.reload();
}

var listarPaises = function(dataApi) {

	table = $("#table_paises").DataTable({
		"destroy": true,
		"fixedHeader": {
			"header": true,
			"footer": true,
			"headerOffset": $('#fixed').height()
		},

		"order": [[ 1, "desc" ]],

		data: dataApi,
        "columns": [
			// { title: "", data: "country", className: "style_class" },
			{
				title: "",
				render: function(data,type, row, meta) {
					return (row.country == 'All') ? 'Todos' : row.country; 
				},
				className: 'style_class' 
			},
			{ title: "Total", data: "cases.total" },
			{ title: "Nuevos", data: "cases.new" },
			{ title: "Activos", data: "cases.active" },
			{ title: "Recuperados", data: "cases.recovered" },
			{ title: "Críticos", data: "cases.critical" },
			{ title: "Muertes", data: "deaths.total" }
		],
		
		"lengthMenu": [
			[5, 10, 25, 100, -1],
			[5, 10, 25, 100, "Todos"]
		],
		"iDisplayLength": 10,	
		"responsive": true,
		"language": idioma_espanol
	});
	
	$("select").formSelect();
	
}

var idioma_espanol = {
	"sProcessing": "<div class='preloader-wrapper small active'><div class='spinner-layer spinner-blue-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>",
	"sLengthMenu": "MOSTRANDO _MENU_ ",
	"sZeroRecords": "No se encontraron resultados",
	"sEmptyTable": "Ningún dato disponible en esta tabla",
	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
	"sInfoEmpty": "Mostrando del 0 al 0 de 0 registros",
	"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
	"sInfoPostFix": "",
	"sSearch": "BUSCAR ",
	"sUrl": "",
	"sInfoThousands": ",",
	"sLoadingRecords": "<div class='preloader-wrapper small active'><div class='spinner-layer spinner-blue-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>",
	"oPaginate": {
		"sFirst": "Primero",
		"sLast": "Último",
		"sNext": "Siguiente",
		"sPrevious": "Anterior"
	}
}


