const snowElements = document.getElementsByName("snow");
const snowWrapper = document.getElementsByClassName("snow-wrapper")[0];
setTimeout(() => {
  for (let index = 0; index < 200; index++) {
    snowFall();
  }
}, 0);
function snowFall() {
  let snowElement = document.createElement("i");
  snowElement.classList.add("snow");
  snowElement.classList.add("fas");
  snowElement.classList.add("fa-snowflake");
  snowWrapper.appendChild(snowElement);
  x = Math.random() * (snowWrapper.offsetWidth - 15);
  y = -30;
  console.log(snowWrapper.offsetHeight);
  let snow = new Snow(snowElement, x, y);
  snow.fall();
  snow.disapear();
}
class Snow {
  constructor(snowElement, x, y) {
    this.snowElement = snowElement;
    this.x = x;
    this.y = y;
    this.snowElement.style.left = `${this.x}px`;
    this.snowElement.style.top = `${this.y}px`;
  }

  fall() {
    let loop = setInterval(() => {
      this.prevX = this.x;
      this.prevY = this.y;
      this.x = (Math.random() * 2 - 1) * 100 + this.prevX;
      this.y = Math.random() * 50 + this.prevY;
      if (this.y > snowWrapper.offsetHeight) {
        // snowWrapper.removeChild(this.snowElement);
        // this.snowElement.remove();
        snowFall();
        clearInterval(loop);
        return;
      }
      if (this.x > snowWrapper.offsetWidth - 15 || this.x < 0) {
        this.x = this.prevX;
      }
      this.snowElement.style.left = `${this.x}px`;
      this.snowElement.style.top = `${this.y}px`;
    }, 100 + Math.random() * 1000);
  }
  disapear() {
    setTimeout(() => {
      this.snowElement.remove();
    }, 25000 + Math.random() * 25000);
  }
}
