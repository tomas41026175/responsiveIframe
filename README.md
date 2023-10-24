# responsiveIframe

## Introduction
responsiveIframe is a web component designed specifically to address the responsiveness issues associated with iframes. With this component, you can seamlessly integrate iframes from platforms like Facebook, Instagram, or YouTube into your web page, ensuring that they adapt gracefully across various screen sizes. The component provides customizable width and height options. If the height is not set or is specified as "auto", the component will utilize a default padding-bottom to maintain responsive behavior for the iframe.

## Tech Stack
Web Component

## Installation
To integrate the responsiveIframe component into your project, you can either import it directly or introduce it via the src attribute of a <script> tag.

## Parameters
width: Defines the custom width of the iframe, e.g., "300px".

height: Specifies the custom height of the iframe. If set to "auto" or left unset, a default padding-bottom value will be applied.

## Usage Example
```js
<responsive-iframe width="300px" height="300px">
    {iframe content}
</responsive-iframe>
```
* Note: Replace {iframe content} with your iframe code. 