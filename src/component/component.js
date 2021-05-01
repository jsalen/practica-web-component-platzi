class ItemCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["image", "itemtitle", "collection", "description", "price"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    this[attr] = newVal;
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
        <article class="container">
          <div class="top">
            <h1>Nike</h1>
            <img src="${this.image}" />
          </div>
          <div class="bottom">
            <div class="bottom__container">
              <div class="bottom__container--title">
                <h2>${this.itemtitle}</h2><span>${this.collection}</span>
              </div>
              <div class="bottom__container--description">
                <p>${this.description}</p>
              </div>
              <div class="footer__container">
                <div class="footer__container--price">
                  <span>${formatPrice(this.price)}</span>
                </div>
                <div class="footer__container--btn">
                  <button class="buy-btn"></strong>Buy Now</strong></button>
                </div>
              </div>
            </div>
          </div>
        </article>
        ${this.getStyles()}
        `;

    return template;
  }

  getStyles() {
    return `
        <style>
        :host {
          --primary-background: #5a6cb2;
          --secondary-background: #fefefe;
          --primary-color: #232323;
          --blur-color: #4e3d659e;
          --price-color: #693fff;
            width: 80%;
            max-height: 100%;
            max-width: 320px;
            min-width: 280px;
            margin: 0 auto;
        }

        article {
          height: 80vh;
          max-width: 320px;
          min-width: 280px;
          width: 320px;
          color: var(--primary-color);
        }

        h1, h2 {
          margin: 0;
        }

        h1 {
          position: absolute;
          top: 40px;
          left: 25px;
          font-size: 72px;
          color: var(--blur-color);
        }

        .top {
          width: 100%;
          height: 40vh;
          position: relative;
          background-color: var(--primary-background)
        }

        .bottom {
          background-color: var(--secondary-background);
          height: 40vh;
          margin-top: 0
        }

        img {
          width: 260px;
          position: absolute;
          top: calc(100% - 140px);
          left: calc(50% - 130px);
        }

        .bottom__container {
          width: 280px;
          height: 50%;
          margin: 0 auto;
        }

        .bottom__container--title {
          min-width: 280px;
          display: flex;
        }

        .bottom__container--title h2 {
          margin-top: 24px;
        }
        .bottom__container--title span {
          margin-left: 8px;
          margin-top: 24px;
        } 

        .bottom__container--description {
          margin: 30px auto;
          text-align: justify;
        }

        .footer__container--price {
          font-size: 26px;
          margin: auto 0;
          color: var(--price-color);
        }

        .footer__container {
          margin: 30px auto;
          display: flex;
          justify-content: space-between
        }

        .buy-btn {
          height: 30px;
          width: 82px;
          background-color: var(--primary-background);
          border: 0;
          border-radius: 12px;
          color: #fefefe;
          text-transform: uppercase;
        }

        @media (min-width: 768px) {
          article {
            display: flex;
            width: 80vw;
            max-width: 1024px;
            height: 80vh;
            color: #fefefe;
            margin: 40px 80px;
            color: var(--primary-color);
          }

          .top {
            width: 50%;
            height: 100%;
          }

          img {
            width: 460px;
            position: absolute;
            top: calc(50% - 154px);
            left: calc(50% - 260px);
            transform: rotate(-35deg);
          }

          .bottom {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          .bottom__container--description {
            margin-left: 30px;
          }
        }

        </style>
        `;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }
}

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return newPrice;
};

export default customElements.define("item-card", ItemCard);
