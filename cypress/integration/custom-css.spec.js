describe.only("Custom CSS injection", () => {
  before(function() {
    indexedDB.deleteDatabase("_pouch_sessions");
  });

  it("injects style tag", () => {
    cy.visit(
      "/survey.html?survey=test.json&mode=online&css=body{display:none}"
    ).find("#ssas_enketo_custom_css_stlye");
  });
});
