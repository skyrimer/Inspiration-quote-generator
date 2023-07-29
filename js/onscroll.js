import anime from "animejs/lib/anime.es.js";
import { qsa } from "./utils";

const duration = 1500;

const tl = anime.timeline({
  easing: "easeInOutCubic",
  duration: duration,
});

tl.add({
  targets: "h1 span:first-child",
  translateY: ["-50%", "0%"],
  opacity: [0, 1],
})
  .add(
    {
      targets: "h1 span:last-child",
      translateY: ["-50%", "0%"],
      opacity: [0, 1],
    },
    "-=500"
  )
  .add(
    {
      targets: [".burger-wrapper", ".chevron-container"],
      opacity: [0, 1],
    },
    "-=500"
  );

const slideInElements = document.querySelectorAll(".benefit, .technology");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          translateY: ["-20%", "0%"],
          opacity: [0, 1],
          duration: duration,
        });
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "-10%" }
);
slideInElements.forEach((toAnimate) => {
  observer.observe(toAnimate);
});
