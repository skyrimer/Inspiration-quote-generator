import Lenis from "@studio-freight/lenis";
import VanillaTilt from "vanilla-tilt";
import { qs, qsa } from "./utils";
import { currentQuoteInfo } from "./generator";
import { tl } from "./onscroll";
const lenis = new Lenis({
  smoothWheel: true,
  lerp: 0.09,
});

const raf = (time) => {
  lenis.raf(time);
  requestAnimationFrame(raf);
};

requestAnimationFrame(raf);

if (window.versions) {
  qs("[data-node]").textContent = `Node v${window.versions.node()}`;
  qs("[data-chrome]").textContent = `Chrome v${window.versions.chrome()}`;
  qs("[data-electron]").textContent = `Electron v${window.versions.electron()}`;
}

[qs(".burger-wrapper"), ...qsa("nav#menu a")].forEach((toggler) => {
  toggler.addEventListener("click", () => {
    if (document.body.classList.contains("checked")) {
      document.body.classList.remove("checked");
      lenis.start();
    } else {
      document.body.classList.add("checked");
      lenis.stop();
    }
  });
});

qsa('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    lenis.scrollTo(link.hash, {
      duration: 2,
    });
  });
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./serviceWorker.js");
}
