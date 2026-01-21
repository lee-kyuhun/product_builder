class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <h1>Lotto Number Generator</h1>
      <div class="lotto-numbers"></div>
      <button>Generate Numbers</button>
    `;

    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        text-align: center;
        padding: 2rem;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 15px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        color: white;
      }

      .lotto-numbers {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 1rem;
        flex-wrap: wrap;
      }

      .lotto-number {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: white;
        color: #333;
        font-size: 1.5rem;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }

      button {
        margin-top: 1.5rem;
        padding: 10px 20px;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        background-color: #ffc107;
        color: #333;
        cursor: pointer;
        transition: background-color 0.3s;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }

      button:hover {
        background-color: #ffca2c;
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    shadow.querySelector('button').addEventListener('click', () => {
      this.generateNumbers();
    });
  }

  generateNumbers() {
    const numbersContainer = this.shadowRoot.querySelector('.lotto-numbers');
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    for (const number of [...numbers].sort((a, b) => a - b)) {
      const numberElement = document.createElement('div');
      numberElement.classList.add('lotto-number');
      numberElement.textContent = number;
      numbersContainer.appendChild(numberElement);
    }
  }
}

customElements.define('lotto-generator', LottoGenerator);