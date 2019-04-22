import React from 'react'
import { component, useState, html } from 'haunted';

function Counter() {
  const [count, setCount] = useState(0);

  return html`
    <div id="count">${count}</div>
    <button type="button" @click=${() => setCount(count + 1)}>Increment</button>
  `;
}

console.log('window')
customElements.define('my-counter', component(Counter));

