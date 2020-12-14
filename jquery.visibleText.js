/*!
 * jQuery VisibleText plugin v0.1.2
 *
 * Copyright 2012-2015 Timo Tijhof https://github.com/Krinkle/jquery-visibleText
 *
 * This plugin is based on Sizzle.getText from Sizzle.js
 * Copyright 2012 jQuery Foundation and other contributors http://jquery.org/license
 */
/* global jQuery */
(function ($) {
  /**
   * Get a string of all aggregated visible text nodes.
   *
   * @static
   * @method
   * @param {Array|jQuery|HTMLElement|NodeList} elem
   * @return {string}
   */
  var getVisibleText = $.getVisibleText = function (elem) {
    var node;
    var i;
    var ret = '';
    var nodeType = elem.nodeType;

    if (nodeType) {
      if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // ELEMENT_NODE, DOCUMENT_NODE, DOCUMENT_FRAGMENT_NODE
        ret += $.expr.filters.hidden(elem)
          ? ''
          // Traverse the children
          : getVisibleText(elem.childNodes);
      } else if (nodeType === 3 || nodeType === 4) {
        // TEXT_NODE, CDATA_SECTION_NODE
        // Leaf node, use directly
        return elem.nodeValue;
      }
    } else {
      // If no nodeType, this is expected to be array-like
      for (i = 0; (node = elem[i]); i++) {
        ret += getVisibleText(node);
      }
    }
    return ret;
  };

  /**
   * See #getVisibleText.
   *
   * @method
   * @return {string}
   */
  $.fn.visibleText = function () {
    return getVisibleText(this);
  };
}(jQuery));
