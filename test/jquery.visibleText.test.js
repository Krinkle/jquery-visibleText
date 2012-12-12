(function ($, QUnit) {

	QUnit.module('jquery.visibleText', {
		setup: function () {
			var style = document.createElement('style');
			style.innerHTML = '.jvt-hide { display: none; }';
			document.getElementById('qunit-fixture').appendChild(style);
		}
	});

	QUnit.test('jQuery.getVisibleText( HTMLelement )', function (assert) {
		var el, cases = {
			'Plain text': null,
			'  Space\n	text.': null,
			'&nbsp;': ' ',
			' ': ' ',
			' Hello <!--\n HTML comment here -->\n World.': ' Hello \n World.',
			'\nX <span class="jvt-hide">Hidden <em>nested</em></span> <em>Nested <span class="jvt-hide">hidden</span></em>Y': '\nX  Nested Y',
			'\nX <span style="display: none;">Hidden <em>nested</em></span> <em>Nested <span style="display: none;">hidden</span></em>Y': '\nX  Nested Y'
		};

		QUnit.expect(Object.keys(cases).length);

		el = document.createElement('div');
		$('#qunit-fixture').append(el);

		$.each(cases, function (html, visibleText) {
			el.innerHTML = html;
			assert.equal($.getVisibleText(el), visibleText === null ? html : visibleText);
		});
	});

	QUnit.test('.visibleText()', 1, function (assert) {

		assert.equal($('<div>Plain</div> <div>text</div>').appendTo('#qunit-fixture').visibleText(), 'Plain text');

	});

}(jQuery, QUnit));
