/* global QUnit, $ */
QUnit.module('jquery.visibleText', {
  beforeEach: function () {
    var style = document.createElement('style');
    style.innerHTML = '.jvt-hide { display: none; }';
    document.getElementById('qunit-fixture').appendChild(style);
  }
});

$.each({
  'Plain text': null,
  '  Space\n\ttext.': null,
  '&nbsp;': ' ',
  ' ': ' ',
  ' Hello <!--\n HTML comment here -->\n World.': ' Hello \n World.',
  '\nX <span class="jvt-hide">Hidden <em>nested</em></span> <em>Nested <span class="jvt-hide">hidden</span></em>Y': '\nX  Nested Y',
  '\nX <span style="display: none;">Hidden <em>nested</em></span> <em>Nested <span style="display: none;">hidden</span></em>Y': '\nX  Nested Y'
}, function (html, visibleText) {
  QUnit.test('jQuery.getVisibleText( HTMLelement ) - ' + html, function (assert) {
    var el = document.createElement('div');
    $('#qunit-fixture').append(el);
    el.innerHTML = html;
    assert.equal($.getVisibleText(el), visibleText === null ? html : visibleText);
  });
});

QUnit.test('.visibleText()', function (assert) {
  assert.equal($('<div>Plain</div> <div>text</div>').appendTo('#qunit-fixture').visibleText(), 'Plain text');
});
