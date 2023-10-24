// Define custom element named for ResponsiveIframe
class ResponsiveIframe extends HTMLElement {
    // Property declarations
    private width: string | undefined;
    private height: string | undefined;

    // Watch width and height attribute
    static get observedAttributes(): string[] {
        return ['width', 'height'];
    }

    constructor() {
        super(); // Call super constructor
        this.attachShadow({ mode: 'open' }); // Create shadow DOM
    }

    // Observation callback with name, old value, and new value
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'width' || name === 'height') {
            this.render(); // If width or height attribute changed, re-render the component
        }
    }

    // If iframe element exists, set iframe width same with custom element width
    connectedCallback(): void {
        const iframe = this.querySelector('iframe'); // Select iframe element
        if (iframe) {
            const width = parseInt(iframe.getAttribute('width') || '', 10) || 1;
            const height = parseInt(iframe.getAttribute('height') || '', 10) || 1;

            this.width = `${width}`; // Make iframe width same with custom element width
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            this.render(); // Re-render the component
            return;
        } else {
            this.render(); // Render the component
        }
    }

    // Render method
    private render(): void {
        const width = this.getAttribute('width') || '100%'; // Get custom width value
        const height = this.getAttribute('height') || 'auto'; // Get custom height value
        const padding =
            height !== 'auto' ? `padding-bottom: ${height};` : 'padding-bottom: 56.25%;'; // Padding bottom for responsive iframe base on height

        // Update shadow DOM
        this.shadowRoot!.innerHTML = `
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

// Register the custom element
customElements.define('responsive-iframe', ResponsiveIframe);
