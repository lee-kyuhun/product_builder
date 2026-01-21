class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --background: linear-gradient(135deg, #667eea, #764ba2);
          --text-color: white;
          --button-bg: #ffc107;
          --button-text: #333;
          --number-bg: white;
          --number-text: #333;
          display: block;
          text-align: center;
          padding: 2rem;
          background: var(--background);
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
          color: var(--text-color);
          transition: background 0.3s, color 0.3s;
        }

        :host([theme="dark"]) {
          --background: #2c3e50;
          --text-color: #ecf0f1;
          --button-bg: #3498db;
          --button-text: white;
          --number-bg: #34495e;
          --number-text: #ecf0f1;
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
          background-color: var(--number-bg);
          color: var(--number-text);
          font-size: 1.5rem;
          font-weight: bold;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: background-color 0.3s, color 0.3s;
        }

        button {
          margin-top: 1.5rem;
          padding: 10px 20px;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          background-color: var(--button-bg);
          color: var(--button-text);
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        button:hover {
          opacity: 0.9;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .theme-toggle {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: 1px solid var(--text-color);
          color: var(--text-color);
          padding: 0.5rem;
          border-radius: 5px;
        }
      </style>
      <div>
        <button class="theme-toggle">Toggle Theme</button>
        <h1>Lotto Number Generator</h1>
        <div class="lotto-numbers"></div>
        <button class="generate">Generate Numbers</button>
      </div>
    `;

    this.shadowRoot.querySelector('.generate').addEventListener('click', () => this.generateNumbers());
    this.shadowRoot.querySelector('.theme-toggle').addEventListener('click', () => this.toggleTheme());
  }

  connectedCallback() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setAttribute('theme', savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }

  toggleTheme() {
    const currentTheme = this.getAttribute('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setAttribute('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
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