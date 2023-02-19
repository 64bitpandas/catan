let theme = "light"; //default to light

//local storage is used to override OS theme settings
if (localStorage.getItem("theme")) {
  if (localStorage.getItem("theme") == "dark") {
    theme = "dark";
  }
} else if (!window.matchMedia) {
  //matchMedia method not supported
  return false;
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //OS theme setting detected as dark
  theme = "dark";
}

//dark theme preferred, set document with a `data-theme` attribute
if (theme == "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}

const toggleTheme = () => {
  if (theme == "light") {
    theme = "dark";
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    theme = "light";
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}
