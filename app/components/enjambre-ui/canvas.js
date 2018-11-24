/* global dagreD3, d3 */
import Component from "@ember/component";

const colores_de_relaciones = [
  "#94AE89",
  "#A8BCA1",
  "#C0DA74",
  "#BEEDAA",
  "#832232"
];

export default Component.extend({
  tagName: "",
  width: 1000,
  height: 1000,

  didInsertElement() {
    this.dibujar(this.datos);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    console.log(this.get("clases"));
  },

  dibujar() {
    var g = new dagreD3.graphlib.Graph().setGraph({});
    let etiquetas = [];

    // Dibuja cada una de las cajas de modelos.
    this.datos.map(modelo => {
      let atributos_como_texto = modelo.atributos.join("\n");

      /* Solo dibuja la clase si está declarada entre las que se quieren dibujar
         o no hay ningún filtro aplicado. */
      if (this.clases.indexOf(modelo.etiqueta) > -1 || this.clases === []) {
        g.setNode(modelo.etiqueta, {
          label: `${modelo.etiqueta}\n_______\n \n${atributos_como_texto}`,
          style: "fill: #efefef"
        });

        etiquetas.pushObject(modelo.etiqueta);
      }
    });

    // Genera las relaciones.

    this.datos.map(modelo => {
      modelo.relaciones.map(relacion => {
        let desde = modelo.etiqueta;
        let hasta = relacion.a;

        if (etiquetas.indexOf(desde) === -1) {
          console.log("Ojo, no se encontró ", desde);
          g.setNode(desde, {
            label: `${desde}`,
            style: "fill: #fff"
          });
        }

        if (etiquetas.indexOf(hasta) === -1) {
          console.log("Ojo, no se encontró ", hasta);
          g.setNode(hasta, {
            label: `${hasta}`,
            style: "fill: #fff"
          });
        }

        if (relacion.tipo === "uno_a_muchos") {
          let tmp = desde;
          desde = hasta;
          hasta = tmp;
        }

        let color_al_azar =
          colores_de_relaciones[
            Math.floor(Math.random() * colores_de_relaciones.length)
          ];

        g.setEdge(desde, hasta, {
          label: relacion.tipo.replace(/_/gi, " "),
          curve: d3.curveBasis,
          style: `stroke: ${color_al_azar}`,
          labelStyle: `fill: ${color_al_azar}`,
          arrowheadStyle: `fill: ${color_al_azar}`,
          arrowhead:
            relacion.tipo === "muchos_a_muchos" ? "undirected" : "normal"
        });
      });
    });

    let render = new dagreD3.render();
    let svg = d3.select("svg");
    let inner = svg.append("g");

    render(inner, g);

    if (this.datos.length > 0) {
      var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
      inner.attr("transform", "translate(" + xCenterOffset + ", 20)");
      svg.attr("height", g.graph().height + 40);
    }
  }
});
