import Component from "@ember/component";

const colores_de_relaciones = [
  "#94AE89",
  "#A8BCA1",
  "#C0DA74",
  "#BEEDAA",
  "#832232"
];

export default Component.extend({
  didInsertElement() {
    this.dibujar(this.datos);
  },

  dibujar() {
    /*global dagreD3 d3 */
    var g = new dagreD3.graphlib.Graph().setGraph({});

    // Dibuja cada una de las cajas de modelos.
    this.datos.map(modelo => {
      let atributos_como_texto = modelo.atributos.join("\n");

      g.setNode(modelo.etiqueta, {
        label: `${modelo.etiqueta}\n_______\n \n${atributos_como_texto}`,
        style: "fill: #efefef"
      });
    });

    // Genera las relaciones.
    this.datos.map(modelo => {
      modelo.relaciones.map(relacion => {
        let desde = modelo.etiqueta;
        let hasta = relacion.a;

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

    /*
    g.setNode("User", {

      label: "User label\n_______\nid\nnombre\n",
      style: "fill: #afa"
    });
    g.setNode("Perfil", {
      label: "Perfil\n_______\n \nid\nemail\n",
      style: "fill: #efefef"
    });
    g.setNode("Evento", {
      label: "Evento\n_____\n \nid\nlugar\n",
      style: "fill: #afa"
    });

    g.setEdge("User", "Perfil", {
      label: "User tiene muchos Perfiles",
      curve: d3.curveBasis,
      style: "stroke: #f66",
      labelStyle: "fill: #f66",
      arrowheadStyle: "fill: #f66"
    });

    g.setEdge("Perfil", "Evento", {
      label: "uno a muchos",
      curve: d3.curveBasis,
      style: "stroke: #66f",
      labelStyle: "fill: #66f",
      arrowheadStyle: "fill: #66f"
    });

    g.setEdge("Perfil", "User", {
      label: "cualquiera",
      curve: d3.curveBasis,
      arrowheadClass: "arrowhead"
    });

    // Fill node "A" with the color green
    g.setNode("A", { style: "fill: #afa" });

    // Make the label for node "B" bold
    g.setNode("B", { labelStyle: "font-weight: bold" });

    // Double the size of the font for node "C"
    g.setNode("C", { labelStyle: "font-size: 2em" });

    g.setNode("D", {});

    g.setNode("E", {});

    // Make the edge from "A" to "B" red, thick, and dashed
    g.setEdge("A", "B", {
      label: "papanamericado",
      style:
        "stroke: #f66; stroke-width: 3px; color: blue; stroke-dasharray: 5, 5;",
      labelStyle: "fill: red;",
      arrowheadStyle: "fill: #f66"
    });

    // Make the label for the edge from "C" to "B" italic and underlined
    g.setEdge("C", "B", {
      label: "A to C",
      labelStyle: "font-style: italic; text-decoration: underline;"
    });

    // Make the edge between A and D smoother.
    // see available options for lineInterpolate here: https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate
    g.setEdge("A", "D", {
      label: "line interpolation different",
      curve: d3.curveBasis
    });

    g.setEdge("E", "D", {});

    // Make the arrowhead blue
    g.setEdge("A", "E", {
      label: "Arrowhead class",
      arrowheadClass: "arrowhead"
    });
    */

    let render = new dagreD3.render();
    let svg = d3.select(this.$("svg")[0]);
    let inner = svg.append("g");

    render(inner, g);

    if (this.datos.length > 0) {
      var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
      inner.attr("transform", "translate(" + xCenterOffset + ", 20)");
      svg.attr("height", g.graph().height + 40);
    }
  }
});
