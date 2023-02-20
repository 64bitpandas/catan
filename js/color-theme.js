let theme = "light"; //default to light

//local storage is used to override OS theme settings
if (localStorage.getItem("theme")) {
  if (localStorage.getItem("theme") == "dark") {
    theme = "dark";
  }
} else if (!window.matchMedia) {
  //matchMedia method not supported
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //OS theme setting detected as dark
  theme = "dark";
}

//dark theme preferred, set document with a `data-theme` attribute
if (theme == "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}

const toggleTheme = (newTheme) => {
  if(newTheme === undefined) {
    if(theme == "light") theme = "dark";
    else theme = "light";
  }

  theme = newTheme;
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

export { toggleTheme };
