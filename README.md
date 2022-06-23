# The Date Format Selector

This is a small utility application that allows a JavaScript developer to easily configure date format options.
It contains a series of form selectors that correspond to different properties of the parameters passed to `Date.toLocaleString()`.

## Usage

Upon opening `index.html` in your browser, you'll see the following:

### Date Input

The first form input is a date selector (`<input type="datetime-local">`) loaded with the current time.
This selector might appear as a text input on older browsers, in which case you must provide a string
that is valid input to the `Date` constructor.

You may optionally check the "Use Current Time" checkbox to automatically increment the computed `Date` value
by updating it to the current time once per second.
Turning this options on automatically clears the manual `datetime-local` input,
and manually inputting a date will turn this option off.

### Format Options

Each property in [Table 6 of the ECMA-402 draft](https://tc39.es/ecma402/#table-datetimeformat-components) is
exposed with a radio button group.
These options are split into "Date Options" and "Time Options".
The `dateStyle` and `timeStyle` properties are also configurable.

It is [specified](https://tc39.es/ecma402/#sec-initializedatetimeformat) that setting any of the options from Table 6
in addition to `dateStyle` or `timeStyle` is invalid and will produce an error.
Therefore, this application will automatically unset options as appropriate.

Refer to the [MDN documentation for `DateTimeFormat` parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters)
for more information.

### Note on Language Tags

https://www.w3.org/International/articles/language-tags/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
https://tc39.es/ecma402/#sec-intl.datetimeformat-internal-slots
