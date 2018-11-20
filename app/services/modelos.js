import Service from "@ember/service";

const expresion_clase = /class (\w+)\(/;
const expresion_relacion_uno_a_uno = /\s*(\w+).*OneToOneField\((\w+)/;
const expresion_relacion_uno_a_muchos = /\s*(\w+).*ForeignKey\((\w+)/;
const expresion_relacion_muchos_a_muchos = /\s*(\w+).*ManyToMany\((\w+)/;
const expresion_atributo = /\s*(\w+).*Field/;

export default Service.extend({
  interpretar_modelos_desde_archivos(lista_de_archivos) {
    let modelos = [];

    for (let i = 0; i < lista_de_archivos.length; i++) {
      let archivo = lista_de_archivos[i];

      let lineas_del_archivo = archivo.contenido.split("\n");

      /* Para extraer el contenido del modelo, se recorren todas las lineas, y
         se asume que los nombres de clases son modelos, y lo que está dentro
      */

      let definiendo_clase = false;
      let modelo_actual = {
        etiqueta: "",
        atributos: [],
        relaciones: []
      };

      for (let j = 0; j < lineas_del_archivo.length; j++) {
        let linea = lineas_del_archivo[j];

        if (expresion_clase.exec(linea)) {
          definiendo_clase = true;
          let clase = expresion_clase.exec(linea)[1];
          modelo_actual.etiqueta = clase;
        }

        if (definiendo_clase) {
          if (expresion_relacion_uno_a_uno.exec(linea)) {
            let tmp = expresion_relacion_uno_a_uno.exec(linea);

            modelo_actual.relaciones.pushObject({
              a: tmp[2],
              tipo: "uno_a_uno"
            });
            continue;
          }

          if (expresion_relacion_uno_a_muchos.exec(linea)) {
            let tmp = expresion_relacion_uno_a_muchos.exec(linea);

            modelo_actual.relaciones.pushObject({
              a: tmp[2],
              tipo: "uno_a_muchos"
            });
            continue;
          }

          if (expresion_relacion_muchos_a_muchos.exec(linea)) {
            let tmp = expresion_relacion_muchos_a_muchos.exec(linea);

            modelo_actual.relaciones.pushObject({
              a: tmp[2],
              tipo: "muchos_a_muchos"
            });
            continue;
          }

          if (expresion_atributo.exec(linea)) {
            let tmp = expresion_atributo.exec(linea);
            modelo_actual.atributos.pushObject(tmp[1]);
            continue;
          }
        }
      }

      if (definiendo_clase) {
        definiendo_clase = false;
        modelos.pushObject(modelo_actual);
        modelo_actual = {
          etiqueta: "",
          atributos: [],
          relaciones: []
        };
      }
    }

    return modelos;
  }
});
