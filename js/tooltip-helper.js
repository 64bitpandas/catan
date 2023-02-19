for(tooltip of document.getElementsByClassName("tooltip")) {
  tooltip.addEventListener("touchend", (e) => {
    console.log("hi")
    let tooltipText = tooltip.getElementsByClassName("tooltiptext")[0];

    console.log(tooltipText.style.visibility)
    if(tooltipText.style.visibility === "visible") {
      tooltipText.style.visibility = "hidden";
      tooltipText.style.opacity = "0";
    } else {
      tooltipText.style.visibility = "visible";
      tooltipText.style.opacity = "1";
    }
  });
};