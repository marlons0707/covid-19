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
	.catch(err => {
		console.log('Error paises: '+err);
	});

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
		listarGuateStats(datos.response);
	})
	.catch(err => {
		console.log('Error Guatemala Stats: '+err);
	});

	//Traemos información histórica de Guatemala
	fetch("https://covid-193.p.rapidapi.com/history?country=Guatemala", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid-193.p.rapidapi.com",
			"x-rapidapi-key": "487e9c6602mshfe0920390d958dep11c592jsn3c1ead90861d"
		}
	})
	.then(res => res.json())
	.then(datos => {
		listarGuateHist(datos.response);
	})
	.catch(err => {
		console.log('Error Guatemala Hist: '+err);
	});

})

var contenido = document.querySelector('#contenido');

var listarGuateStats = function (dataApi) {

	// console.log(dataApi);
	
	contenido.innerHTML = '';

	for(let valor of dataApi) {
		contenido.innerHTML += `
			<tr>
				<th scope="row">${ valor.country }</th>
				<td>${ (valor.cases.new == null) ? '0' : valor.cases.new }</td>
				<td>${ valor.cases.active }</td>
				<td>${ valor.cases.recovered }</td>
				<td>${ valor.cases.critical }</td>
				<td>${ valor.deaths.total }</td>
				<td>${ valor.cases.total }</td>
				<td>${ valor.tests.total }</td>
				
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
					display: false,
					text: 'Cantidad de casos de covid-19 en Guatemala'
				}
			}
		});

	}

}

var listarGuateHist = function (dataApi) {
	// console.log(dataApi);
	var fechas = [];
	var nuevos = [];
	var activos = [];
	var recuperados = [];
	var criticos = [];
	var muertes = [];

	for(let valor of dataApi) {
		// console.log(valor);
		fechas.push(valor.day.substr(5));

		let news = (valor.cases.new == null) ? '+0' : valor.cases.new;
		nuevos.push(parseInt(news.substr(1)));

		let actives = (valor.cases.active == null) ? 0 : valor.cases.active;
		activos.push(actives);
		
		let recovers = (valor.cases.recovered == null) ? 0 : valor.cases.recovered;
		recuperados.push(recovers);
		
		let criticals = (valor.cases.critical == null) ? 0 : valor.cases.critical;
		criticos.push(criticals);

		let deaths = (valor.deaths.total == null) ? 0 : valor.deaths.total;
		muertes.push(deaths);

	}

	fechas.reverse();
	nuevos.reverse();
	activos.reverse();
	recuperados.reverse();
	criticos.reverse();
	muertes.reverse();

	new Chart(document.getElementById("line-chart"), {
		type: 'line',
		data: {
			labels: fechas,
			datasets: [
				{
					data: nuevos,
					label: "Nuevos",
					borderColor: "#ffee58",
					fill: false
				},
				{ 
					data: activos,
					label: "Activos",
					borderColor: "#546e7a",
					fill: false
				},
				{
					data: recuperados,
					label: "Recuperados",
					borderColor: "#4caf50",
					fill: false
				},
				{ 
					data: criticos,
					label: "Críticos",
					borderColor: "#d32f2f",
					fill: false
				},
				{ 
					data: muertes,
					label: "Muertes",
					borderColor: "#000000",
					fill: false
				}
			]
		},
		options: {
			title: {
				display: true,
				text: 'Avance de COVID-19 en Guatemala'
			}
		}
	});

}

var listarPaises = function(dataApi) {
	
	let i=0;
	for(dato of dataApi) {
		country = dataApi[i].country; 
		if (country == 'World') {
			// console.log('lo encontre en '+i);
			dataApi.splice(i,i);
		}
		i++;
	}

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
					return (row.country == 'All' || row.country == 'World') ? 'Todos' : row.country; 
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

var reloadTable = function() {
	$('#table_paises').DataTable().ajax.reload();
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


