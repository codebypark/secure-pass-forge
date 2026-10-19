import ViewCl from "./view";

class oldKeysCl extends ViewCl {
  _parentElement = document.querySelector(".previous__key__container");

  /**
   * Built with textContent (not markup) so characters like "&" are never
   * parsed as HTML entities.
   */
  render(entries) {
    if (entries.length === 0) return;
    // Reversed array so that it would display correctly for user
    const elements = entries
      .map((entry) => {
        const p = document.createElement("p");
        p.className = "first-letter:text-[#802BB1]";
        p.textContent = `> ${entry}`;
        return p;
      })
      .reverse();
    this._parentElement.replaceChildren(...elements);
  }
}

export default new oldKeysCl();
