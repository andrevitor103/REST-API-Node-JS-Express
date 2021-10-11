module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Óla mundo Node JS");
  });

  app.get("*", (req, res) => {
    res.redirect("/");
  });
};
