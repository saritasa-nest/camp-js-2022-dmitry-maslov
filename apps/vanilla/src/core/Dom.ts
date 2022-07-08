
// TODO: add a normal comments

/** */
export class Dom<T extends HTMLElement= HTMLElement> {
  /**
   * Dom element.
   */
  public $el: T;

  public constructor(selector: string | T) {
    const el = typeof selector === 'string' ?
      document.querySelector<T>(selector) :
      selector;

    if (el === null) {
      throw new Error('No selector');
    } else {
      this.$el = el;
    }
  }

  /**
   * Clear element children.
   * @returns This Dom instance for chaining.
   */
  public clear(): Dom<T> {
    this.$el.innerHTML = '';
    return this;
  }

  /**
   * Append node in element.
   * @param node {HTMLElement} Dom node.
   * @returns This Dom instance for chaining.
   */
  public append(...node: Dom[]): Dom<T> {
    node.forEach($node => {
      this.$el.append($node.$el);
    });
    return this;
  }

  /**
   * Are there child HTML elements.
   * @returns
   */
  public hasChild(): boolean {
    return Boolean(this.$el.hasChildNodes());
  }

  /**
   * Create clone Dom instance.
   * @returns This Dom clone.
   */
  public cloneNode(): Dom<T> {
    return $(this.$el.cloneNode(true) as T);
  }

  /**
   * Set text content.
   * @param text {string}.
   * @returns This Dom instance for chaining.
   */
  public setTextContent(text: string): Dom<T> {
    this.$el.textContent = text.trim();
    return this;
  }

  /**
   * Get TextContent in html.
   */
  public getTextContent(): string {
    const text = this.$el.textContent;

    if (text === null) {
      return '';
    }

    return text;
  }

}

/**
 *
 * @param selector {Element | string}.
 * @returns Dom instance.
 */
export function $<T extends HTMLElement>(selector: string | T): Dom<T> {
  return new Dom<T>(selector);
}

// $.create = function<T extends HTMLElement>(tagName: keyof HTMLElementTagNameMap, classes?: string): Dom<T> {
//   const el = document.createElement(tagName);

//   if (classes !== undefined) {
//     el.classList.add(classes);
//   }

//   return $<T>(el);
// };

$.create = function<T extends HTMLElement = HTMLElement>(tagName: keyof HTMLElementTagNameMap, classes?: string): Dom<T> {
  const el = document.createElement(tagName);

  if (classes !== undefined) {
    classes.split(' ').forEach(elClass => {
      if (elClass) {
        el.classList.add(elClass);
      }
  });
  }

  return $(el as T);
};
