document.addEventListener("touchend", (e) => {
  for (let tooltip of document.getElementsByClassName("tooltip")) {
    let isTarget = e.target === tooltip;

    if (isTarget === false) {
      tooltip.childNodes.forEach((child) => {
        if (child === e.target) {
          isTarget = true;
        }
      });
    }

    if (!isTarget) {
      let tooltipText = tooltip.getElementsByClassName("tooltiptext")[0];
      tooltipText.style.visibility = "hidden";
      tooltipText.style.opacity = "0";
    }
  }
});

// document.getElementById("t").chil

for (let tooltip of document.getElementsByClassName("tooltip")) {
  tooltip.addEventListener("touchend", (e) => {
    let tooltipText = tooltip.getElementsByClassName("tooltiptext")[0];
    if (tooltipText.style.visibility !== "visible") {
      tooltipText.style.visibility = "visible";
      tooltipText.style.opacity = "1";
    }
  });
}
