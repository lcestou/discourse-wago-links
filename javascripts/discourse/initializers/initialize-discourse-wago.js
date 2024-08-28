import { withPluginApi } from "discourse/lib/plugin-api";
export default {
  name: "initialize-wago-onebox",
  initialize() {
    withPluginApi("0.8.7", (api) => {
      api.decorateCookedElement(this.createWagoOnebox, {
        id: "wago-onebox",
      });
    });
  },

  createWagoOnebox(element) {
    const oneboxes = element.querySelectorAll(
      ".onebox"
    );
    oneboxes.forEach((onebox) => {
      const link = onebox.querySelector(".source a");
      if (!link) {
        return;
      }

      const href = link.getAttribute("href");
      const wago = href.match(
        /https:\/\/wago\.io\/.*/
      );
      if (!wago) {
        return;
      }
      if (wago) {
        const x = onebox.querySelector("article");
        const p = x.querySelector("p");
        let div = document.createElement("div");
        div.classList.add("wago-embed-placeholder");
        div.setAttribute("data-embed-type", "copyBtn");
        div.setAttribute("data-embed-id", "1337");
        p.parentNode.insertBefore(div, p.nextSibling);
        let script = document.createElement("script");
        script.setAttribute("src", wago + "/embed.js?style=dark");
        div.parentNode.insertBefore(script, div.nextSibling);
      }
    });
  },
};