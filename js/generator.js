import { qs, qsa } from "./utils";
import { toBlob, toPng } from "html-to-image";
import { mojs } from "@mojs/core";
import { computePosition, flip, offset, shift } from "@floating-ui/dom";
// Utility functions
export let currentQuoteInfo = {};
export let likeCurrentQuote = false;
localStorage.clear();

const isLiked = (quote = currentQuoteInfo) => {
  return !!localStorage.getItem(quote._id);
};

const getRandomQuote = async () => {
  return fetch(
    "https://api.quotable.io/quotes/random?minLength=60&tags=Wisdom|Business|Character|Freedom|Inspirational|Knowledge|Life"
  )
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson[0];
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const generateQuote = async () => {
  card.classList.add("hidden");
  setTimeout(async () => {
    currentQuoteInfo = await getRandomQuote();
    likeCurrentQuote = isLiked(currentQuoteInfo);
    quote.textContent = currentQuoteInfo.content;
    author.textContent = currentQuoteInfo.author;
    card.classList.remove("hidden");
    iconWrapper.classList.toggle("liked", likeCurrentQuote);
  }, 300);
};
const setToClipboard = async (blob) => {
  const data = [new ClipboardItem({ [blob.type]: blob })];
  await navigator.clipboard.write(data);
};
const filter = (node) => {
  return !node.classList?.contains("btn-wrapper");
};
const shareOrDownload = async (blob, fileName, title, text) => {
  // Using the Web Share API.
  if (webShareSupported) {
    const data = {
      files: [
        new File([blob], fileName, {
          type: blob.type,
        }),
      ],
      title,
      text,
    };
    if (navigator.canShare(data)) {
      try {
        await navigator.share(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.name, err.message);
        }
      } finally {
        return;
      }
    }
  }
  // Fallback implementation.
  const a = document.createElement("a");
  a.download = fileName;
  a.style.display = "none";
  a.href = URL.createObjectURL(blob);
  a.addEventListener("click", () => {
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 1000);
  });
  document.body.append(a);
  a.click();
};

// Like
const iconWrapper = document.querySelector("[data-like]");
const icon = iconWrapper.querySelector("svg");
const iconHeight = icon.clientHeight;
const accentColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--clr-tertiary"
);
iconWrapper.addEventListener("click", () => {
  if (likeCurrentQuote) {
    localStorage.removeItem(currentQuoteInfo._id);
    likeCurrentQuote = false;
    iconWrapper.classList.remove("liked");
    return;
  }
  localStorage.setItem(currentQuoteInfo._id, JSON.stringify(currentQuoteInfo));
  likeCurrentQuote = true;
  iconWrapper.classList.add("liked");
  const RADIUS = iconHeight;
  const circle = new mojs.Shape({
    parent: iconWrapper,
    stroke: { transparent: accentColor },
    strokeWidth: { [1.005 * RADIUS]: 0 },
    fill: "none",
    scale: { 0: 1, easing: "quad.out" },
    radius: RADIUS,
    duration: 600,
  })
    .generate()
    .play();
  const burst = new mojs.Burst({
    parent: iconWrapper,
    count: 10,
    degree: 360,
    radius: { [RADIUS / 2]: [RADIUS * 2] },
    speed: 6,
    angle: 45,

    children: {
      shape: "line",
      stroke: { accentColor: accentColor },
      strokeDasharray: "100%",
      strokeDashoffset: { "-100%": "100%" },
      easing: "quad.out",
      fill: "null",
      radius: 3,
      scale: { 2: 1 },
      angle: 0,
      speed: 2,
      duration: 600,
    },
  })
    .generate()
    .play();
  Notification.requestPermission().then((permission) => {
    if (permission == "granted") {
      toBlob(qs("section#quote")).then(async (blob) => {
        await setToClipboard(blob);
      });
      new Notification("Dragon Quotes copied the quote", {
        body: `Thanks a lot for using our service! The quote that you have copied is "${currentQuoteInfo.content}" by ${currentQuoteInfo.author}`,
        icon: "./icons/logo.svg",
        silent: true,
        lang: "en",
        tag: "Dragon Quotes quote copied",
      });
    }
  });
});

// Share
const webShareSupported = "canShare" in navigator;

qs("[data-share]").addEventListener("click", async () => {
  toBlob(qs("section#quote"), { filter: filter }).then(async (blob) => {
    await shareOrDownload(
      blob,
      "Dragon Quotes - Quote.png",
      "An amazing quote",
      "Just and amazing quote generated by Dragon Quotes"
    );
  });
});

// Save
qs("[data-save]").addEventListener("click", () => {
  toPng(qs("section#quote"), {
    filter: filter,
  }).then((dataUrl) => {
    let link = document.createElement("a");
    link.download = "Dragon Quotes.png";
    link.href = dataUrl;
    link.click();
  });
});

// Generate
const quote = qs("[data-quote]");
const author = qs("[data-quote-author]");
const card = qs("[data-quote-container]");
window.onload = generateQuote;
const generateButton = qs("[data-generate]");
const generateIcon = qs("svg", generateButton);
let generateButtonRotationAngle = 360;
generateButton.addEventListener("click", async () => {
  generateIcon.style.rotate = `${generateButtonRotationAngle}deg`;
  generateButtonRotationAngle += 360;
  generateQuote();
});

// Tooltips

// qsa(".btn-wrapper > .tooltip-wrapper").forEach((tooltipWrapper) => {
//   computePosition(
//     tooltipWrapper.firstElementChild,
//     tooltipWrapper.lastElementChild,
//     {
//       placement: "bottom",
//       middleware: [offset(10), flip(), shift()],
//     }
//   ).then(({ x, y }) => {
//     Object.assign(tooltipWrapper.lastElementChild.style, {
//       left: `${x}px`,
//       top: `${y}px`,
//     });
//   });
// });