class MSNMessengerStatusbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get styles() {
        return /*css*/`
            .container {
                width: 100%;
                height: 100%;
                border-radius:0 0 var(--border-radius) var(--border-radius);
                border-top: 1px solid #505E67;
                background: #FDFDFF;


            }
        `;
    }
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
        <style>${MSNMessengerStatusbar.styles}</style>
        <div class="container">

        </div>
        `;
    }
}

customElements.define("msn-messenger-statusbar", MSNMessengerStatusbar);
