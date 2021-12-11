import "./MSNMessengerToolbars.js";
import "./MSNMessengerRemoteUser.js";
import "./MSNMessengerLocalUser.js";
import "./MSNMessengerStatusbar.js";

const nudgeSound = new Audio("sounds/nudge.mp3");

class MSNMessengerWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /*css*/ `
        :host {
        --width: 475px;
        --height: 400px;
        --border-radius: 6px;
      }
      .container {
        width: var(--width);
        height: var(--height);
        background: #D7E4F5 url(ui/main-background.png) bottom 20px right no-repeat;
        display: grid;
        grid-template-rows: 60px 1fr 140px 24px;
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow:
          2px 2px 5px #0009,
          5px 5px 10px #000c;
        position: relative;
        transform: translate(var(--x, 0), var(--y, 0));
      }
      .container::after{
        content:"";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image:
          url(ui/main-corner-left.png),
          url(ui/main-corner-right.png),
          url(ui/main-left.png),
          url(ui/main-right.png),
          url(ui/main-bottom.png);
        background-repeat: no-repeat, no-repeat, repeat-y, repeat-y, repeat-x;
        background-position: bottom left, bottom -1px right, bottom left, bottom right , bottom;
        clip-path: polygon(0 14.5%, 100% 5%, 100% 100%, 0 100% );
        pointer-events: none;
      }
        `;
  }
  move() {
    const x = -4 + ~~(Math.random() * 8);
    const y = -4 + ~~(Math.random() * 8);
    this.style.setProperty("--x", `${x}px`);
    this.style.setProperty("--y", `${y}px`);
  }
  moveWindow() {
    const times = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750];
    times.forEach(time => setTimeout(() => this.move(), time));
    nudgeSound.play();

  }

  connectedCallback() {
    this.render();
    this.addEventListener("nudge", () => this.moveWindow());
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>${MSNMessengerWindow.styles}</style>
        <div class="container">
        <msn-messenger-toolbars></msn-messenger-toolbars>
            <msn-messenger-remoteuser></msn-messenger-remoteuser>
            <msn-messenger-localuser></msn-messenger-localuser>
            <msn-messenger-statusbar></msn-messenger-statusbar>
            <div class="border-window"></div>
        </div>
        `;
  }
}

customElements.define("msn-messenger-window", MSNMessengerWindow);
