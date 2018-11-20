import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Service | modelos", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    let modelos = this.owner.lookup("service:modelos");
    assert.ok(modelos);
  });

  test("interpreta una lista vacía de archivos", function(assert) {
    let modelos = this.owner.lookup("service:modelos");
    assert.deepEqual(modelos.interpretar_modelos_desde_archivos([]), []);
  });

  test("interpreta una lista de un solo archivo", function(assert) {
    let modelos = this.owner.lookup("service:modelos");
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
      `
      }
    ];

    let resultado_esperado = [
      {
        etiqueta: "Perfil",
        atributos: ["nombre", "apellido"],
        relaciones: []
      }
    ];

    assert.deepEqual(
      modelos.interpretar_modelos_desde_archivos(datos_de_entrada),
      resultado_esperado
    );
  });

  test("interpreta una lista de dos modelos, con relaciones entre sí", function(assert) {
    let modelos = this.owner.lookup("service:modelos");
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
        ruta: "electronica/models/user.py",
        contenido: `
        class User(model):
          username = models.CharField()
          email = models.CharField()
        `
      }
    ];

    let resultado_esperado = [
      {
        etiqueta: "Perfil",
        atributos: ["nombre", "apellido"],
        relaciones: [
          {
            a: "User",
            tipo: "uno_a_uno"
          }
        ]
      },
      {
        etiqueta: "User",
        atributos: ["username", "email"],
        relaciones: []
      }
    ];

    assert.deepEqual(
      modelos.interpretar_modelos_desde_archivos(datos_de_entrada),
      resultado_esperado
    );
  });
});
