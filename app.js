class myCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }
    static get observedAttributes() {
        return ['img'];
    }
    attributeChangedCallback(attr, oldVal, newVal) {
        if (oldVal !== newVal) {
            this[attr] = newVal;
        }
    }
    getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="card__header">
                <h1>
                    <slot name="brand"></slot>
                </h1>
                <img src=${this.img} alt="la imagen de un tenis kike"/>
            </div>
            <div class="card__info-container">
                <div class="info__title">
                    <h2><slot name="title"></slot></h2>
                    <span><slot name="kind-of-shoes"></slot></span>
                </div>
                <p class="collection">COLLECTION</p>
                <p class="info__description">
                    <slot name="description"></slot>
                </p>
                <div class="info__footer">
                    <p> 
                        $ <slot name="price"></slot>
                    </p>
                    <button>BUY NOW</button>
                </div>
            </div>
        ${this.getStyles()}`;
        return template;
    }
    getStyles(){
        return `<style>
            :host {
                --primary-blue: #4957a0;
                --primary-grey: #aba9ab;
                --secondary-grey: #939394;
                --width-primary: 400px;
                --height-down: 320px;
                --height-up: 300px;
                --width-card: auto;
                --rotate-primary: 0deg;
                --padding-left-p: 0px;
                display: block;
                min-width: 430px;
                max-width: 550px;
                margin: 0;
                height: auto;
                display: flex;
                flex-direction: column;
            }
            .card__header {
                background: var(--primary-blue);
                display: flex;
                flex-direction: column;
                position: realitve;
                height: var(--height-up);
                width: var(--width-card);
            }
            .card__header h1 {
                font-size: 8.5rem;
                font-weight: bold;
                margin: 5px 0 0 10px;
                box-sizing: border-box;
                opacity: 0.2;
            }


            .card__header img{
                width: var(--width-primary);
                align-self: center;
                margin: -60px 0 0 -120px;
                transform: rotate(var(--rotate-primary));
            }
            .card__info-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: var(--width-card);
                height: var(--height-down);
                background: white;
                padding: 0 15px;
                box-sizing: border-box;
            }
            .card__info-container .info__title {
                display: flex;
                margin-top: 30px;
                align-items: center;
                height: auto;
            }
            .card__info-container .info__title h2{
                margin: 0 10px 0 0;
                font-size: 1.8rem;
                font-weight: bold;
            }
            .card__info-container .info__title span,
            .card__info-container .collection {
                font-weight: bold;
                letter-spacing: 3px;
                color: var(--primary-grey);
            }
            .card__info-container .info__description {
                font-size: 0.9rem;
                font-family: sans-serif;
                padding-left: var(--padding-left-p);
            }
            .card__info-container .info__footer {
                display: flex;
                height: 55px;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 5px;
            }
            .card__info-container .info__footer p{
                margin: 0;
                font-size: 1.8rem;
                font-weight: bold;
                opacity: 0.4;
            }
            .card__info-container .info__footer button {
                padding: 12px 12px;
                background: var(--primary-blue);
                color: white;
                font-weight: bold;
                border: none;
                border-radius: 15px;
                cursor: pointer;
            }
        </style>`;
    }
    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
    connectedCallback() {
        this.render();
    }
}
customElements.define('my-card',myCard);