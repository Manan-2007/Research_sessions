const themes = {
  light: {
    background: "#e8f0ff",
    text: "#003366",
    nav: "#cfe0ff",
    hero: "#dce8ff",
    card: "#f0f6ff",
    palette: ["#4d79ff", "#80aaff", "#b3ccff"]
  },

  dark: {
    background: "#181818",
    text: "#ffffff",
    nav: "#222222",
    hero: "#333333",
    card: "#2a2a2a",
    palette: ["#555555", "#777777", "#999999"]
  },

  tropical: {
    background: "#fff4e0",
    text: "#b35400",
    nav: "#ffd8a8",
    hero: "#ffe5c2",
    card: "#fff0db",
    palette: ["#ff8c42", "#ffa75e", "#ffc799"]
  }
};

function setTheme(mode) {
  const theme = themes[mode];
  if (!theme) return;

  document.body.style.background = theme.background;
  document.body.style.color = theme.text;

  const nav = document.querySelector("nav");
  if (nav) {
    nav.style.background = theme.nav;
    nav.style.color = theme.text;
  }

  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.background = theme.hero;
    hero.style.color = theme.text;
  }

  const cards = document.querySelectorAll(".feature-card");
  cards.forEach(card => {
    card.style.background = theme.card;
    card.style.color = theme.text;
  });

  const [box1, box2, box3] = [
    document.querySelector(".box1"),
    document.querySelector(".box2"),
    document.querySelector(".box3")
  ];

  if (box1) box1.style.background = theme.palette[0];
  if (box2) box2.style.background = theme.palette[1];
  if (box3) box3.style.background = theme.palette[2];
}
