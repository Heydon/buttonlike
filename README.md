buttonlike
==========

A jQuery plugin for making clickable elements more accessible. Buttonlike.js&hellip;

* Defines elements as buttons with role="button"
* Gives them tabindex="0" so they are focusable
* While focused, triggers the faux buttons' click events on ENTER and SPACE keydown events
* Allows you to optionally define relationships between the "button" and the element(s) it affects using aria-controls
* Allows you to optionally make the button a "toggle" using aria-pressed (true / false)


A quick example
---------------

Let's turn a span with a class of <code>.controller-span</code> into a workable button. In this example, the span is a "toggle" (exists in on or off states) and is used to control the state of a <code>&lt;div&gt;</code> with an ID of "contolled-div". One would include the plugin, then write the following initialization code:

    $('.contoller-span').buttonlike({'pressed': false, 'controls':'controlled-div'});

Since we are using <code>aria-pressed</code> (via the "pressed" option) we must choose an initial state. In the above example, this is set to false. If the button is not a "toggle", simply leave this option to default to <code>null</code>. This example button only controls the one element (<code>#controlled-div</code>) but it is possible to control multiple elements by entering a value for the "controls" option as a space separated list.

The generated markup for our <code>&lt;span&gt;</code> will look like the following. Naturally, the <code>aria-pressed</code> attribute toggles between true and false per click.

    <span role="button" aria-controls="controlled-div" aria-pressed="false">click me!</span>
	
For more examples, refer to my blog post on the plugin: <a href="http://www.heydonworks.com/article/accessible-buttons-jquery-plugin">Accessible Buttons JQuery Plugin</a>.

Options
---------------

There are only two options. All "buttonlike" buttons receive focus and keyboard control as standard. These options both default to null:

    pressed: null,
	controls: null

Bad elements
---------------

Some elements really shouldn't be made into "buttons" at all. Of these, the most obvious are the grouping elements <code>ul, ol, menu, dl</code> and <code>table</code>. If you try to use buttonlike.js with these, it will refuse and write an error to the console. So there.