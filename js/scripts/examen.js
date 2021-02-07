/* global Api */
var examen1 = (function () {
  //variables globales
  var codigo;
  var colegio;
  var clectivo;
  var datosInscripcion = {
    colegio: 0,
    codigo: 0,
    turno: "",
    curso: "",
    materia: "",
    condicion: "",
    turno_examen: 0,
    fecha: "",
    docente: 0,
    codigo_seguridad: "",
  };
  var datosConstancia = {
    colegio: "",
    alumno: "",
    materia: "",
    fecha: "",
    hora: "",
    docente: "",
    codigo_materia: "",
    turno: "",
  };
  var preincripcion = [];

  //metodos privados
  var inicializacionDeComponentes = function () {
    colegio = localStorage.getItem("colegio");
    codigo = localStorage.getItem("alumno_codigo");
    clectivo = localStorage.getItem("clectivo");
    var objeto = {
      colegio: colegio,
      codigo: codigo,
      clectivo: clectivo,
    };
    Api.getStudentData(
      objeto,
      "VER_MATERIAS_RENDIR",
      examen1.cargarMateriasParaRendir
    );
    HoldOnOn();

    $(".btnInscribir").click(function () {
      var nombre = $(this).attr("nombre");
      var materia = $(this).attr("materia");
      var curso = $(this).attr("curso");
      var condicion = $(this).attr("condicion");

      $("#modNombreMateria").text(nombre);

      var objeto = {
        colegio: colegio,
        codigo: codigo,
        curso: curso,
        materia: materia,
        condicion: condicion,
        clectivo: clectivo,
      };
      
      $(".btnInscribirMod").attr("condicion", condicion);
      Api.getStudentData(
        objeto,
        "VERIFICAR_INSCRIPCION_EXAMEN",
        examen1.cargarMateriasParaInscribir
      );
      HoldOnOn();
      $("#modalInscripcion").modal();
    });

    $(".btnInscribirMod").click(function () {
      var docente = $("#selectDocenteMod").val();
      var condicion = $(this).attr("condicion");

      if (docente !== null) {
        var seguridad = generanCodigoSeguridad();
        var objeto = {
          colegio: datosInscripcion.colegio,
          codigo: datosInscripcion.codigo,
          curso: datosInscripcion.curso,
          materia: datosInscripcion.materia,
          condicion: condicion,
          turno_examen: datosInscripcion.turno_examen,
          docente: docente,
          codigo_seguridad: seguridad,
        };

        datosConstancia.colegio = $("#colegioPerfil").text();
        datosConstancia.alumno = $("#alumnoPerfilNombre").text();
        datosConstancia.turno = $("#modTurno").text();
        datosConstancia.materia = $("#modNombreMateria").text();
        datosConstancia.fecha = $("#modFecha").text();
        datosConstancia.hora = $("#modHora").text();
        datosConstancia.docente = $("#selectDocenteMod").text();
        datosConstancia.codigo_materia = seguridad;

        Api.setStudentData(objeto, "INSCRIBIR_EXAMEN", examen1.examenOk);

        HoldOnOn();
      } else {
        swal("debe seleccionar docente para realizar la inscripcion ");
      }
    });
  };

  var mostrarMateriasParaRendir = function (datos) {
    if (datos["mensajeFecha"] == undefined) {
      if (datos["mensajeValidacion"] == undefined) {
        var contenedor = $("#examenes");
        var itemPadre = $("#cardExamen");
        if (datos.length > 0) {
          $.each(datos, function (key, d) {
            if (
              d.condicion == "LIB." &&
              d.dictado == "T" &&
              d.colegio == "0016"
            ) {
            } else {
              var item = itemPadre.clone(true, true);
              item.attr("id", "row" + (key + 1));
              item.removeClass("hide");
              item.find(".nombreMateria").text(d.nombre);
              item.find(".condicion").text(d.condicion);
              item.find(".curso").text(d.nivel);
              item.find(".c_lectivo").text(d.c_lectivo);
              item.find(".btnInscribir").attr("nombre", d.nombre);
              item.find(".btnInscribir").attr("curso", d.curso);
              item.find(".btnInscribir").attr("materia", d.materia);
              item.find(".btnInscribir").attr("condicion", d.condicion);
              contenedor.append(item);
            }
          });
        } else {
          contenedor.html("<p>No hay fechas de examenes disponibles </p>");
        }
      } else {
        //$('#mensaje').text(datos["mensajeValidacion"]);
        swal(datos["mensajeValidacion"]);
      }
    } else {
      //$('#mensaje').text(datos["mensajeFecha"]);
      swal(datos["mensajeFecha"]);
    }
  };

  var mostrarMateriasParaInscribir = function (datos) {
    console.log(datos);
    $(".materiaInscripcion").addClass("hide");
    $(".mostrarMensaje").addClass("hide");
    $(".btnInscribirMod").attr("disabled", "disabled");

    if (datos.mensajeValidacion === "null") {
      $(".materiaInscripcion").removeClass("hide");
      $(".btnInscribirMod").removeAttr("disabled");

      $("#modTurno").text(datos.fechaExamen.nombre);
      

      if (datos.fechaHora.length > 0) {
        var fecha = invertirFechaVista(datos.fechaHora[0].fecha);
        $("#modFecha").text(fecha);
        $("#modHora").text(datos.fechaHora[0].hora.substring(0, 5));
      }

      $("#selectDocenteMod").children().remove();
      $("#selectDocenteMod").append(
        $("<option>  </option>").attr("value", " ")
      );
      $.each(datos.docente, function (index, value) {
        $("#selectDocenteMod").append(
          $("<option></option>").attr("value", value.codigo).text(value.nombre)
        );
      });

      datosInscripcion.codigo = localStorage.getItem("alumno_codigo");
      datosInscripcion.colegio = localStorage.getItem("colegio");
      datosInscripcion.curso = datos.curso;
      datosInscripcion.materia = datos.materia;
      datosInscripcion.condicion = $(this).attr("condicion");
      datosInscripcion.turno_examen = datos.fechaExamen.turnoActual;
      datosInscripcion.docente = $("#selectDocenteMod").val("value");

      $(".btnInscribirMod").attr("curso", datos.curso);
      $(".btnInscribirMod").attr("turnoExamen", datos.turnoExamen);
      $(".btnInscribirMod").attr("materia", datos.materia);
      $(".btnInscribirMod").attr("docente", datos.docente);
    } else {
      $(".mostrarMensaje").removeClass("hide");
      $(".mod-mje").text(datos.mensajeValidacion);
    }
  };
  //metodos publicos
  return {
    //main function to initiate the module
    init: function () {
      inicializacionDeComponentes();
    },
    cargarMateriasParaRendir: function (respuesta) {
      HoldOnOff();
      if (respuesta.estado) {
        mostrarMateriasParaRendir(respuesta.objeto);
      } else {
        swal(respuesta.mensaje);
      }
    },
    cargarMateriasParaInscribir: function (respuesta) {
      HoldOnOff();
      if (respuesta.estado) {
        mostrarMateriasParaInscribir(respuesta.objeto);
      } else {
        swal(respuesta.mensaje);
      }
    },
    examenOk: function (respuesta) {
      HoldOnOff();
      if (respuesta.estado) {
        //swal("Registro con exito!");
        $("#modalInscripcion").modal("hide");

        swal({
          title: "Registro con exito",
          text: "Deseas descargar la constancia?",
          icon: "success",
          buttons: true,
          dangerMode: false,
        }).then((descargar) => {
          if (descargar) {
            swal("En breve se descargará la constancia", {
              icon: "success",
            });
            Api.getPathFile(datosConstancia, "CONSTANCIA_EXAMEN");
          } else {
          }
        });
      } else {
        swal("Atención!");
      }
    },
  };
})();
