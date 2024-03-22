function procesarDatos() {
  const datos = document.getElementById('datos').value;
  const lineas = datos.split('\n');
  const resultadosBody = document.getElementById('resultadosBody');
  
  resultadosBody.innerHTML = '';

  lineas.forEach(linea => {
    const partes = linea.split('\t');
    const numeroExpediente = partes[0];
    const estado = 'EN PROCESO';
    const fecha = obtenerFecha(linea);
    const nombre = obtenerNombre(linea, fecha);
    const nombreAbreviado = abreviarNombre(nombre);
    const intervencion = obtenerIntervencion(linea);

    // Formatear el número de expediente en XXXX/XX
    const numeroExpedienteFormateado = numeroExpediente.replace(/^(\d{4})(\d{2})$/, '$1/$2');

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${numeroExpedienteFormateado}</td>
      <td>${estado}</td>
      <td>EXPEDIENTE DE ${nombreAbreviado}</td>
      <td>${intervencion}</td>
      <td>${fecha}</td>
    `;
    resultadosBody.appendChild(fila);
  });
}

function obtenerFecha(linea) {
  const fechaRegex = /\d{2}\/\d{2}\/\d{4}/;
  const coincidencia = linea.match(fechaRegex);
  return coincidencia ? coincidencia[0] : '';
}

function obtenerNombre(linea, fecha) {
  const nombreInicio = linea.indexOf(fecha) + fecha.length + 1;
  let nombre = '';
  for (let i = nombreInicio; i < linea.length; i++) {
    if (linea[i].match(/\d/) && linea[i + 1].match(/\d/)) {
      break; // Si encontramos dos números consecutivos, terminamos el nombre
    }
    nombre += linea[i];
  }
  return nombre.trim();
}

function abreviarNombre(nombreCompleto) {
  const partesNombre = nombreCompleto.split(' ');
  let abreviatura = '';
  partesNombre.forEach(part => {
    abreviatura += part[0].toUpperCase() + '.';
  });
  return abreviatura;
}

function obtenerIntervencion(linea) {
  const intervenciones = ['PIBA', 'P.I.B.A', 'T.B.B.P', 'SATISFACTORES COTIDIANOS', 'SASTIFACTORES COTIDIANOS', 'I.M.B.F', 'I.B.M.F' , 'IBMF', 'T.B.U.M.', 'TBUM', 'T.B.U.M',
'PREVENCION DE RECAIDAS', 'CONSEJO BREVE', 'OTRAS INTERVENCIONES', 'NO CONSUMIDORES', 'PERSONA EN CONTACTO', 'T.B.U.C'];
  const texto = linea.toUpperCase();
  const encontradas = [];
  intervenciones.forEach(intervencion => {
    if (texto.includes(intervencion)) {
      encontradas.push(intervencion);
    }
  });
  return encontradas.join(', ');
}
function obtenerIntervencion(linea) {
  const intervenciones = {
    'PIBA': 'ESTE EXPEDIENTE CONTIENE EL PIBA ',
    'P.I.B.A': 'ESTE EXPEDIENTE CONTIENE EL PIBA ',
    'T.B.B.P': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE INTERVENCIÓN BREVE DE ALCOHOL ',
    'SATISFACTORES COTIDIANOS': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE INTERVENCIÓN BREVE DE SATISFACTORES COTIDIANOS ',
    'SASTIFACTORES COTIDIANOS': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE INTERVENCIÓN BREVE DE SATISFACTORES COTIDIANOS ',
    'I.M.B.F': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE INTERVENCIÓN BREVE DE TABACO ',
    'I.B.M.F': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE INTERVENCIÓN BREVE DE TABACO ',
    'IBMF': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE INTERVENCIÓN BREVE DE TABACO ',
    'T.B.U.M.': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE INTERVENCIÓN BREVE DE CANNABINOIDES ',
    'TBUM': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE INTERVENCIÓN BREVE DE CANNABINOIDES ',
    'T.B.U.M': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE INTERVENCIÓN BREVE DE CANNABINOIDES ',
    'PREVENCION DE RECAIDAS': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE OTRAS INTERVENCIONES ',
    'CONSEJO BREVE': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE INTERVENCIÓN DE CONSEJERIA BREVE ',
    'OTRAS INTERVENCIONES': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE OTRAS INTERVENCIONES ',
    'NO CONSUMIDORES': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE OTRAS INTERVENCIONES ',
    'PERSONA EN CONTACTO': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE OTRAS INTERVENCIONES ',
    'T.B.U.C': 'ESTE EXPEDIENTE CONTIENE EL PROGRAMA DE INTERVENCIÓN BREVE DE COCAINA '
  };

  let texto = linea.toUpperCase();
  let encontradas = [];

  for (let intervencion in intervenciones) {
    if (texto.includes(intervencion)) {
      encontradas.push(intervenciones[intervencion] + 'DEL USUARIO ' + obtenerInicialesNombre(linea));
    }
  }

  return encontradas.join(', ');
}

function obtenerInicialesNombre(linea) {
  const fechaRegex = /\d{2}\/\d{2}\/\d{4}/;
  const nombreInicio = linea.indexOf(obtenerFecha(linea)) + obtenerFecha(linea).length + 1;
  let nombre = '';
  for (let i = nombreInicio; i < linea.length; i++) {
    if (linea[i].match(/\d/) && linea[i + 1].match(/\d/)) {
      break; // Si encontramos dos números consecutivos, terminamos el nombre
    }
    nombre += linea[i];
  }

  return abreviarNombre(nombre.trim());
}