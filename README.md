# The Date Format Selector

This is a small utility application for easily configuring date format options.
It contains a series of form inputs that correspond to different properties of
the parameters passed to `Date.toLocaleString()`.

## Usage

This repository is hosted with GitHub Pages. You can access the application at
https://nicholas-wilcox.github.io/date-format-selector/.

Alternatively, you can download a copy of the source code and open the
`index.html` file locally in your browser. (Please refer to
[GitHub's documentation](https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives)
for guidance on how to download source code.)

### Date Input

The first form input is a date selector (`<input type="datetime-local">`) loaded
with the current time. This selector might appear as a text input on older
browsers, in which case you must provide a string that is valid input to the
`Date` constructor.

You may optionally toggle the "Use Current Time" checkbox to automatically
increment the computed `Date` value by updating it to the current time once per
second. Turning this options on automatically clears the manual `datetime-local`
input, and manually inputting a date will turn this option off.

#### Locales and Time Zone Options

The options to specify locales and a time zone are given in regular text inputs,
next to (or below) the date input. You can enter multiple language tags in a
comma-separated list (whitespace optional, e.g. `"es-MX, en-CA, ..."`).

**Note:**
[ECMA 402](https://tc39.es/ecma402/#sec-intl.datetimeformat-internal-slots)
specifies 3 Unicode extension keys that can be appended to a language tag: `nu`
(numbering system), `ca` (calendar), and `hc` (hour cycle). You can use them
with the `-u` subtag prefix (e.g. `"en-UK-u-ca-indian"`). For more information
on language tags, see
[this W3C article](https://www.w3.org/International/articles/language-tags/#rfc)
and
[the MDN documentation for these extensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters).

The time zone input accepts valid
[IANA time zone names](https://www.iana.org/time-zones). Both this input and the
locales input will have a red outline when given invalid values that are not
recognized. You can reset to your browser's default value by clearing out the
text inputs.

### Format Options

Each property in
[Table 6 of the ECMA-402 draft](https://tc39.es/ecma402/#table-datetimeformat-components)
is exposed with a radio button group. These options are split into "Date
Options" and "Time Options". The `dateStyle` and `timeStyle` properties are also
configurable.

It is specified that setting any of the options from Table 6 in addition to
`dateStyle` or `timeStyle` is invalid and will produce an error
([source](https://tc39.es/ecma402/#sec-initializedatetimeformat)). Therefore,
this application will automatically unset options as appropriate.

Refer to the
[MDN documentation for `DateTimeFormat` parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters)
for more information.

### Omitted Options

The locale options that are configurable via Unicode extension keys as described
above can also be given as object properties, similar to the date-time
formatting options. However, those properties are omitted from this utility
application for simplicity.

Three other format options are not included in this project:

- `localeMatcher`: Used for resolving and supplementing the locale arguments.
- `formatMatcher`: Used for deciding how different subsets of format options are
  formatted.
- `hour12`: An override for `hourCycle`.

## Developer Notes

This small codebase is both an interactive demo for the `Date.toLocaleString()`
function and also an example of using vanilla JavaScript to create custom web
components.

In summary, this involves:

1. creating `<template>` elements in `index.html` and a custom `RadioGroup`
   class that extends `HTMLElement`,
2. implementing lifecycle methods for `RadioGroup` to add the templated content
   to its own "shadow DOM", and
3. calling `customElements.define("radio-group", RadioGroup)` to link the
   component to a custom tag name.

The `<radio-group>` component uses data attributes to fill out its DOM with
radio inputs that all share the same `name` attribute. It also forwards the
events from the inputs to handlers defined in `main.js`.

Please see the
[MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) for
more information on developing and using standardized web components.

`main.js` also has some other state variables, form inputs, and event listeners.
Overall, the code is meant to be small, lightly commented, and self-documenting,
but feel free to reach out if you have any questions.
