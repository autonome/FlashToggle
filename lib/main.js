function toggleFlash(callback) {
  const { Cu } = require("chrome");
  Cu.import("resource://gre/modules/AddonManager.jsm", this);
  AddonManager.getAddonsByTypes(["plugin"], function(addons) {
    for (let i = 0; i < addons.length; i++) {
      if (addons[i].name == "Shockwave Flash") {
        addons[i].userDisabled = !addons[i].userDisabled;
        callback(addons[i].userDisabled);
        break;
      }
    }
  });
}

let flashLogoURL = require("self").data.url("flash-logo.jpg");
require("widget").Widget({
  label: "Toggle Flash",
  contentURL: flashLogoURL,
  onClick: function() {
    toggleFlash(function(disabled) {
      let message = "Flash is now " + (disabled ? "disabled" : "enabled") + ".";
      require("notifications").notify({
        title: message,
        iconURL: flashLogoURL
      });
    });
  }
});
