// define custom element named for ResponsiveIframe
class ResponsiveIframe extends HTMLElement {
    // watch width and height attribute
    // get method will return an array of attribute names to watch when they are changed
    // [300px, 300px]
    static get observedAttributes() {
        return ['width', 'height'];
    }

    constructor() {
        super(); // call super constructor
        this.attachShadow({ mode: 'open' }); // create shadow DOM
    }

    // observation callback with name, old value and new value
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'width' || name === 'height') {
            this.render(); // if width or height attribute changed, re-render the component
        }
    }

    // if iframe element exists, set iframe width same with custom element width
    connectedCallback() {
        const iframe = this.querySelector('iframe'); // select iframe element
        if (iframe) {
            const width = parseInt(iframe.width, 10) || 1;
            const height = parseInt(iframe.height, 10) || 1;

            this.width = `${width}`; // make iframe width same with custom element width
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            this.render(); // re-render the component
            return;
        } else {
            this.render(); // render the component
        }
    }

    // render method
    render() {
        const width = this.getAttribute('width') || '100%'; //get custom width value
        const height = this.getAttribute('height') || 'auto'; //get custom height value
        const padding =
            height !== 'auto' ? `padding-bottom: ${height};` : 'padding-bottom: 56.25%;'; // padding bottom for responsive iframe base on height

        // update shadow DOM
        this.shadowRoot.innerHTML = `
                        <style>
                            :host {
                                display: block;
                                position: relative;
                                width: ${width};
                                ${padding}
                                overflow: hidden;
                            }
                            ::slotted(iframe) {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: ${width} !important;
                                min-width: auto !important;
                                height: 100%;
                                border: 0;
                            }
        
                        </style>
                        <slot></slot> 
                        `;
    }
}

// register the custom element
customElements.define('responsive-iframe', ResponsiveIframe);
