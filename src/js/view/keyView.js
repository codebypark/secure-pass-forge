import ViewCl from "./view";

class keyViewCl extends ViewCl {
  _parentElement = document.querySelector(".key__input__container");
  _input = this._parentElement.querySelector("input");

  /**
   * Show key in the input. Assigned via .value (not markup) so characters
   * like "&" are never parsed as HTML entities.
   */
  render(key) {
    this._input.value = key;
    this._input.placeholder = key ? "" : "Select at least one character set";
  }

  selectKeyText() {
    this._input.select();
  }
}

export default new keyViewCl();
