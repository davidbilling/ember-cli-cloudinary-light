/**
 * Escapes HTML special characters in a string.
 * Replacement for deprecated Ember.Handlebars.Utils.escapeExpression.
 *
 * @param {*} value - The value to escape
 * @returns {string} The escaped string
 */
export default function escapeHtml(value) {
  if (value == null) {
    return '';
  }

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
