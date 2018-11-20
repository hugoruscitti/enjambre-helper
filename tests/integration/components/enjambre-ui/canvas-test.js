import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | enjambre-ui/canvas", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("datos", []);
    await render(hbs`{{enjambre-ui/canvas datos=datos}}`);
    assert.equal(this.element.textContent.trim(), "");
  });
});
