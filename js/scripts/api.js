/* global moment, URL */

var Api = function () {
    //variables globales

    var urlBase = 'https://www.univac.com.ar/apiMiCarrera'; //servidor
    //var urlBase = 'https://www.univac.com.ar/apiMiCarreraDesarrollo'; //servidor desarrollo
    // var urlBase = "http://localhost:8000";       //Local
    //var urlBase = "http://localhost/ProyectoMiCarrera/apiMiCarrera"; //wamp
    //    var token = "";
    //metodos privados

    var login = function (alumno, contrasenia, callback) {
        var respuesta;
        var url = urlBase + '/alumno/login';
        $.ajax({
            url: url,
            headers: {
                "codigo": alumno,
                "contrasenia": contrasenia
            },
            dataType: 'json',
            async: true,
            crossDomain: true,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            method: 'POST',
            success: function (data) {

                if (!data.error) {
                    console.log(data);
                    console.log(data.datos.codigo);
                    respuesta = new Response(!data.error, "Login");
                  //if (!isEmpty( data.datosAlumno)) {
                    //if (data.datosAlumno.length > 0) {
                    localStorage.setItem('dni', data.datos.codigo);
                  
                    localStorage.setItem('carreras', JSON.stringify(data.datosAlumno));

                    localStorage.setItem('nombre', data.datosAlumno[0].nombre);
                    localStorage.setItem('alumno_codigo', data.datosAlumno[0].codigo);
                    localStorage.setItem('colegio', data.datosAlumno[0].colegio);
                    localStorage.setItem('nombreColegio', data.datosAlumno[0].nombreColegio);
                    localStorage.setItem('nombreCarrera', data.datosAlumno[0].nombreCarrera);
                    localStorage.setItem('clave', data.datosAlumno[0].clave);
                    localStorage.setItem('clectivo', data.datosAlumno[0].clectivo);
                    callback(respuesta);
                 /* }else {
                    respuesta = new Response(false, "Ocurrio un problema con su cuenta, comuniquese con la institucion para saber en el estado academico en el que se encuentra");
                    callback(respuesta);
                    
                  }*/
                   
                } else {
                    respuesta = new Response(!data.error, data.mensaje);
                    callback(respuesta);
                }

            },
            error: function (xhr, status) {

                console.log(status);
                respuesta = new Response(false, "Ocurrio un problema en el server.");
                callback(respuesta);
            }//,

        });
    };


    //    var recuperarContrasenia = function (email, callback) {
    //        var respuesta;
    //        var url = urlBase + '/usuario/vinculoContrasenia';
    //        var formData = new FormData();
    //        formData.append('correo_electronico', email);
    //        $.ajax({
    //            url: url,
    //            "async": true,
    //            "crossDomain": true,
    //            cache: false,
    //            contentType: false,
    //            processData: false,
    //            method: 'POST',
    //            type: 'POST',
    //            data: formData,
    //            dataType: 'json',
    //            success: function (data) {
    //                if (!data.error) {
    //                    //se envio el mensaje
    //                    respuesta = new Response(true, data.mensaje);
    //                    callback(respuesta);
    //                } else {
    //                    //no se envio
    //                    respuesta = new Response(false, data.mensaje);
    //                    callback(respuesta);
    //                }
    //            },
    //            error: function (xhr, status) {
    //                console.log(status);
    //                respuesta = new Response(false, "Ocurrio un problema en el server.");
    //                callback(respuesta);
    //            }//,
    //
    //        });
    //    };

    //    var resetContrasenia = function (email, contrasenia, codigo, callback) {
    //        var respuesta;
    //        var url = urlBase + '/usuario/restablecerContrasenia';
    //        var formData = new FormData();
    //        formData.append('correo_electronico', email);
    //        formData.append('codigo', codigo);
    //        formData.append('contrasenia', contrasenia);
    //        $.ajax({
    //            url: url,
    //            "async": true,
    //            "crossDomain": true,
    //            cache: false,
    //            contentType: false,
    //            processData: false,
    //            method: 'POST',
    //            type: 'POST',
    //            data: formData,
    //            dataType: 'json',
    //            success: function (data) {
    //                if (!data.error) {
    //                    //se envio el mensaje
    //                    respuesta = new Response(true, data.mensaje);
    //                    callback(respuesta);
    //                } else {
    //                    //no se envio
    //                    respuesta = new Response(false, data.mensaje);
    //                    callback(respuesta);
    //                }
    //
    //            },
    //            error: function (xhr, status) {
    //                console.log(status);
    //                respuesta = new Response(false, "Ocurrio un problema en el server.");
    //                callback(respuesta);
    //            }//,
    //
    //        });
    //    };


    //METODOS GENERICOS PARA MINIMIZAR LA CANTIDAD DE METODOS
    //GUARDAR IMAGEN 

    var obtenerDatos = function (path_ws, callback) {
        var respuesta;
        var url = urlBase + path_ws;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/x-www-form-urlencoded',
            //            headers: {
            //                Authorization: getToken()
            //            },
            success: function (data) {
                respuesta = new Response(true, "");
                respuesta.objeto = data.datos;
                callback(respuesta);
            },
            error: function (data) {
                console.log(data);
                respuesta = new Response(false, 'Ocurrio un problema en el servidor.');
                callback(respuesta);
            }
        });
    };

	     var obtenerDatosArchivos = function (path_ws, callback) {
        var url = urlBase + path_ws;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/x-www-form-urlencoded',
            //            headers: {
            //                Authorization: getToken()
            //            },
            success: function (data) {
                 window.open(data.url);
                 console.log(data.url); 
                callback(respuesta);
            },
            error: function (data) {
                console.log(data);
            }
        });
    };														  
    var guardarDatos = function (objetoPorGuardar, fd, ws, callback) {
        var respuestaJson;
        var url = urlBase + ws;

        for (var pair of fd.entries()) {
            if (typeof pair[1] === 'object') {
                console.log(pair[0] + ', ' + JSON.stringify(pair[1]));
            } else {
                console.log(pair[0] + ', ' + pair[1]);
            }
        }

        $.ajax({
            url: url,
            "async": true,
            "crossDomain": true,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST',
            data: fd,
            dataType: 'json',
            success: function (data) {
                if (!data.error) {
                    //se gaurdo la data
                    respuestaJson = new Response(true, data.mensaje);
                    if (data.hasOwnProperty('datos')) {
                        respuestaJson.objeto = data.datos;
                    } else {
                        if (data.hasOwnProperty('id')) {
                            respuestaJson.objeto = data.id;
                        } else {
                            respuestaJson.objeto = objetoPorGuardar;
                        }
                    }
                    callback(respuestaJson);
                } else {
                    //no se guardo
                    respuestaJson = new Response(true, data.mensaje);
                    callback(respuestaJson);
                }

            },
            error: function (xhr, status) {
                console.log(status);
                respuestaJson = new Response(false, "Ocurrio un problema en el server.");
                callback(respuestaJson);
            }

        });
    };

    var guardarDatosJSON = function (objetoPorGuardar, ws, callback) {
        var respuestaJson;
        var url = urlBase + ws;
        console.log(objetoPorGuardar);
        objetoPorGuardar = JSON.stringify(objetoPorGuardar);

        $.ajax({
            url: url,
            async: true,
            crossDomain: true,
            cache: false,
            contentType: 'application/x-www-form-urlencoded',
            processData: false,
            method: 'POST',
            type: 'POST',
            data: objetoPorGuardar,
            //            headers: {
            //                Authorization: getToken()
            //            },
            success: function (data) {
                console.log(data);
                data = JSON.parse(data);
                if (!data.error) {
                    //se gaurdo la data
                    respuestaJson = new Response(true, data.mensaje);
                    if (data.hasOwnProperty('datos')) {
                        respuestaJson.objeto = data.datos;
                    }
                    if (data.hasOwnProperty('id')) {
                        respuestaJson.objeto = data.id;
                    }
                    callback(respuestaJson);
                } else {
                    //no se guardo
                    respuestaJson = new Response(false, data.mensaje);
                    callback(respuestaJson);
                }

            },
            error: function (xhr, status) {

                console.log(status);
                respuestaJson = new Response(false, "Ocurrio un problema en el server.");
                callback(respuestaJson);
            }

        });
    };

    var obtenerArchivo = function (path_ws) {
        var url = urlBase + path_ws;
        window.open(url, '_blank', 'fullscreen=yes');
    };



    //FIN METODOS GENERICOS

    //metodos publicos
    return {
        init: function () {

        },
        ingresar: function (alumno, contrasenia, callback) {
            login(alumno, contrasenia, callback);
        },
        getUrlApi: function (tipo) {
            if (tipo === 'TESTING') {
                return urlTesting;
            }
            if (tipo === 'PRODUCCION') {
                return urlProduccion;
            }
            if (tipo === 'ELABORACION') {
                return urlElaboracion;
            }
            if (tipo === 'ACTUAL') {
                return urlBase;
            }
        },
        getStudentData: function (objeto, tipo, callback) {
            var ws;
            switch (tipo) {
                case 'VERIFICAR_CUENTA':
                    ws = '/alumno/verificar-cuenta' +
                        '?codigo=' + objeto.codigo +
                        '&colegio=' + objeto.colegio;
                    break;
                case 'VERIFICAR_CUENTA':
                    ws = '/alumno/verificar-cuenta' +
                        '?codigo=' + objeto.codigo +
                        '&colegio=' + objeto.colegio;
                    break;

                case 'PERFIL':
                    ws = '/alumno/perfil-alumno' +
                        '?codigo=' + objeto.dni +
                        '&colegio=' + objeto.colegio;
                    break;

                case 'ESTADO_CUENTA':
                    ws = '/estadoCuenta/obtenerListadoEstadoCuenta' +
                        '?codigo=' + objeto.codigo;
                    break;

                case 'VER_TURNO_EXAMEN':
                    ws = '/examen/ver-turno-examen-activo' +
                        '?colegio=' + objeto.colegio +
                        '&clectivo=' + objeto.clectivo;
                    break;


                case 'VER_MATERIAS_RENDIR':
                    ws = '/materia/obtener-materias-para-rendir1' +
                        '?codigo=' + objeto.codigo +
                        '&colegio=' + objeto.colegio;
                    break;

                case 'VER_MATERIAS_INSCRIBIR':
                    ws = '/materia/prematriculacion' +
                        '?codigo=' + objeto.codigo +
                        '&colegio=' + objeto.colegio;
                    break;

                case 'VER_DATOS_PERSONAS':
                    ws = '/materia/datosPersonaPrematriculacion' +
                        '?codigo=' + objeto.codigo +
                        '&colegio=' + objeto.colegio;
                    break;

                case 'VERIFICAR_INSCRIPCION_EXAMEN':
                    ws = '/examen/validacion-fecha-examen' +
                        '?colegio=' + objeto.colegio +
                        '&codigo=' + objeto.codigo +
                        '&curso=' + objeto.curso +
                        '&materia=' + objeto.materia +
                        '&clectivo=' + objeto.clectivo;
                    break;


                case 'VER_CURSADO':
                    ws = '/materia/mostrar-materias-cursando' +
                        '?colegio=' + objeto.colegio +
                        '&codigo=' + objeto.codigo;
                    break;

                case 'PLAN_ESTUDIO':
                    ws = '/materia/mostrar-plan-estudio' +
                        '?codigo=' + objeto.codigo +
                        '&colegio=' + objeto.colegio;
                    break;

                case 'ANALITICO':
                    ws = '/materia/mostrar-analitico' +
                        '?colegio=' + objeto.colegio +
                        '&codigo=' + objeto.codigo;
                    break;

                case 'VER_CONFIGURACION':
                    ws = '/alumno/alumno-configuracion' +
                        '?codigo=' + objeto.codigo +
                        '&dni=' + objeto.dni;
                    break;

                case 'MENSAJES':
                    ws = '/mensaje/obtener-mensaje' +
                        '?codigo=' + objeto.codigo +
                        '&colegio=' + objeto.colegio;
                    break;
                case 'PREMATRICULACIONPRUEBA':
                    ws = '/materia/pruebaPrematriculacion' +
                        '?colegio=' + objeto.colegio +
                        '&codigo=' + objeto.codigo +
                        '&clectivo=' + objeto.clectivo +
                        '&materias=' + objeto.materias;
                    break;
                    /******************************** */

                    case 'OBTENER_CARRERAS_CURSANDO':
                    ws = '/alumno/obtener-informacion-alumno' +
                        '?codigo=' + objeto.codigo ;
                    break;
                    /******************************** */

                default:
                    alert('No existe ws');
                    break;
            }
            obtenerDatos(ws, callback);
        },
        getSchoolData: function (objeto, tipo, callback) {
            var ws;
            switch (tipo) {
                case 'VER_NOMBRE_ESTABLECIMIENTO':
                    ws = '/colegio/obtenerColegiosParaSelect';
                    break;

                default:
                    alert('No existe ws');
                    break;
            }

            ///////////////////PRUEBA////////////////////////////
            obtenerDatos(ws, callback);
        },
        setStudentData: function (objeto, tipo, callback) {
            var ws;
            var formData = new FormData();
            var isFormData = false;
            switch (tipo) {
                case 'CREAR_USUARIO':
                    ws = '/alumno/nuevoUsuario';
                    formData.append('codigo', objeto.codigo);
                    formData.append('password', objeto.password);
                    formData.append('correo', objeto.correo);
                    isFormData = true;
                    break;

                case 'VINCULO_CONTRASENIA':
                    ws = '/alumno/vinculoContrasenia';
                    formData.append('correo_electronico', objeto.correo_electronico);
                    formData.append('codigo', objeto.codigo);
                    isFormData = true;
                    break;

                case 'RESTABLECER_CONTRASENIA':
                    ws = '/alumno/restablecerContrasenia';
                    formData.append('correo_electronico', objeto.correo_electronico);
                    formData.append('codigo', objeto.codigo);
                    formData.append('contrasenia', objeto.contrasenia);
                    formData.append('id', objeto.id);
                    isFormData = true;
                    break;

                case 'INSCRIBIR_EXAMEN':
                    ws = '/examen/inscripcion-examen';
                    formData.append('colegio', objeto.colegio);
                    formData.append('codigo', objeto.codigo);
                    formData.append('curso', objeto.curso);
                    formData.append('materia', objeto.materia);
                    formData.append('condicion', objeto.condicion);
                    formData.append('turno_examen', objeto.turno_examen);
                    formData.append('docente', objeto.docente);
                    formData.append('codigo_seguridad', objeto.codigo_seguridad)
                    isFormData = true;
                    break;

                case 'PREINSCRIBIR_MATERIAS':
                    ws = '/materia/incripcionPrematriculacion';
                    formData.append('colegio', objeto.colegio);
                    formData.append('codigo', objeto.codigo);
                    formData.append('clectivo', objeto.clectivo);
                    formData.append('direccion', objeto.direccion);
                    formData.append('codigoPostal', objeto.codigoPostal);
                    formData.append('telefono', objeto.telefono);
                    formData.append('materias', objeto.materias);
                    isFormData = true;
                    break;

                case 'MODIFICAR_CORREO':
                    ws = '/alumno/modificar-correo';
                    formData.append('correo_electronico', objeto.correo_electronico);
                    formData.append('codigo', objeto.codigo);
                    isFormData = true;
                    break;

                case 'MODIFICAR_TELEFONO':
                    ws = '/alumno/modificar-telefono';
                    formData.append('telefono', objeto.telefono);
                    formData.append('codigo', objeto.codigo);
                    formData.append('colegio', objeto.colegio);
                    isFormData = true;
                    break;

                case 'MODIFICAR_CONTRASENIA':
                    ws = '/alumno/modificar-contrasenia';
                    formData.append('codigo', objeto.codigo);
                    formData.append('contrasenia', objeto.contrasenia);
                    formData.append('contraseniaNueva', objeto.contraseniaNueva);
                    isFormData = true;
                    break;

                default:
                    MensajeAdvertencia('FALTA WS');
                    return;
            }
            if (isFormData) {
                guardarDatos(objeto, formData, ws, callback);
            } else {
                guardarDatosJSON(objeto, ws, callback);
            }

        },
		getPathFile: function (objeto, tipo) {
            var callback = function(data) {
                window.open(data.url, '_blank', 'fullscreen=yes');
            };
            
            var ws;
            switch (tipo) {
                case 'CONSTANCIA_EXAMEN':
                    ws = '/examen/obtener-constancia' +
                        '?colegio=' + objeto.colegio +
                        '&alumno=' + objeto.alumno +
                        '&materia=' + objeto.materia +
                        '&fecha=' + objeto.fecha +
                        '&hora=' + objeto.hora +
                        '&docente=' + objeto.docente +
                        '&codigoMateria=' + objeto.codigo_materia +
                        '&turno=' + objeto.turno;

                    break;

                case 'CONSTANCIA_PREINSCRIPCION':
                    ws = '/examen/obtener-constancia-preinscripcion' +
                        '?colegio=' + objeto.colegio +
                        '&alumno=' + objeto.alumno +
                        '&materias=' + objeto.materias;
                    break;

                case 'ANALITICO':
                        ws = '/materia/obtener-analitico' +
                            '?codigo=' + objeto.codigo +
                            '&colegio=' + objeto.colegio +
                            '&nombre=' + objeto.nombre +
                            '&carrera=' + objeto.carrera +
                            '&dni=' + objeto.dni;
                   break;
                   
                case 'PLAN_ESTUDIO_PDF':
                    ws = '/materia/obtener-plan-estudio-pdf' +
                        '?colegio=' + objeto.colegio +
                        '&codigo=' + objeto.codigo +
                        '&carrera=' + objeto.carrera;
                    break;  

                default:
                    alert('No existe ws');
                    break;
            }
            obtenerDatosArchivos(ws, callback);
        },									  
        getFile: function (objeto, tipo) {
            var ws;
            switch (tipo) {
                case 'CONSTANCIA_EXAMEN':
                    ws = '/examen/obtener-constancia' +
                        '?colegio=' + objeto.colegio +
                        '&alumno=' + objeto.alumno +
                        '&materia=' + objeto.materia +
                        '&fecha=' + objeto.fecha +
                        '&hora=' + objeto.hora +
                        '&docente=' + objeto.docente +
                        '&codigoMateria=' + objeto.codigo_materia +
                        '&turno=' + objeto.turno;

                    break;

                case 'CONSTANCIA_PREINSCRIPCION':
                    ws = '/examen/obtener-constancia-preinscripcion' +
                        '?colegio=' + objeto.colegio +
                        '&alumno=' + objeto.alumno +
                        '&materias=' + objeto.materias;
                    break;

                case 'ANALITICO':
                        ws = '/materia/obtener-analitico' +
                            '?codigo=' + objeto.codigo +
                            '&colegio=' + objeto.colegio +
                            '&nombre=' + objeto.nombre +
                            '&carrera=' + objeto.carrera +
                            '&dni=' + objeto.dni;
                   break;  
                
                case 'PLAN_ESTUDIO_PDF':
                    ws = '/materia/obtener-plan-estudio-pdf' +
                        '?colegio=' + objeto.colegio +
                        '&codigo=' + objeto.codigo +
                        '&carrera=' + objeto.carrera;
                    break;  

                default:
                    alert('No existe ws');
                    break;
            }
            obtenerArchivo(ws);
        },
    };


}();
