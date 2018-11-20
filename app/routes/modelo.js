import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  modelos: service(),
  model() {
    let datos_de_entrada = [
      {
        archivo: "perfil.py",
        ruta: "electronica/models/perfil.py",
        contenido: `
          class Perfil(model):
            def demo(self):
              pass

            nombre = models.CharField(null=False)
            apellido = models.CharField(null=False)
            user = models.OneToOneField(User, on_delete=models.CASCADE)
          `
      },
      {
        archivo: "user.py",
        ruta: "electronica/models/perfil.py",
        contenido: `
          class User(model):
            def demo(self):
              pass

            username = models.CharField(null=False)
          `
      },
      {
        archivo: "evento.py",
        ruta: "electronica/models/evento.py",
        contenido: `
          class Evento(model):
            def demo(self):
              pass

            direccion = models.CharField(null=False)
            perfil = models.ForeignKey(Perfil, related_name="eventos", default=None, null=True, on_delete=models.CASCADE)
          `
      },
      {
        archivo: "invitado.py",
        ruta: "electronica/models/invitado.py",
        contenido: `
          class Invitado(model):
            def demo(self):
              pass

            dni = models.CharField(null=False)
            evento = models.ManyToMany(Evento, related_name="invitados", default=None, null=True, on_delete=models.CASCADE)
          `
      }
    ];

    return this.modelos.interpretar_modelos_desde_archivos(datos_de_entrada);
  }
});
