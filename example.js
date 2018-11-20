const carlo = require("carlo");
const fs = require("fs");
const os = require("os");

(async () => {
  // Launch the browser.
  const app = await carlo.launch();

  // Tell carlo where your web files are located.
  app.serveFolder('dist');

  // Expose 'env' function in the web environment.
  await app.exposeFunction("env", _ => process.env);

  console.log("comenzando...");

  // Navigate to the main page of your app.
  await app.load("index.html");
})();
