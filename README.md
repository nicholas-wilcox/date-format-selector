# The Date Format Selector

This is a small utility application that allows a JavaScript developer to easily configure date format options.
It contains a series of form selectors that correspond to different properties of the parameters passed to `Date.toLocaleString()`.
In fact, it renders all of the ECMA supported (as of writing) `/to.*String/` functions for the `Date` object:

- `toString()`
- `toDateString()`
- `toTimeString()`
- `toISOString()`
- `toUTCString()`
- `toLocaleString()`
- `toLocaleDateString()`
- `toLocaleTimeString()`

There are ways to selectively show different sets of these functions (see below).

## Usage

Upon opening `index.html` in your browser, you'll see three forms:

### Date Input

The first form input is a date selector (`<input type="datetime-local">`) loaded with the current time.
This selector might appear as a text input on older browsers, in which case you must provide a string
that is valid input to the `Date` constructor.

You may optionally check the "Use Current Time" checkbox to automatically increment the computed `Date` value.

### Output Visibility

You may or may not already be aware that the non-`Locale` functions do *not* actually accept format options,
or any arguments for that matter.
I still chose to include them by default.
There are two pairs of radio buttons that each hide certain rows of functions that might be uninteresting to the user:

- Show/Hide non-Locale output
- Show/Hide redundant Date/Time

Additionally, each row has a code that can be used in a query parameter `s` to specify a custom preferred set of rows:

| Function name      | Code |
|--------------------|------|
| toString           | ts   |
| toDateString       | tds  |
| toTimeString       | tts  |
| toISOString        | tis  |
| toUTCString        | tus  |
| toLocaleString     | tls  |
| toLocaleDateString | tlds |
| toLocaleTimeString | tlts |

So, if you wanted to see only the ISO string in addition to the complete locale string,
you could add `?s=tis&s=tls` to the URL for `index.html`.
Using the radio buttons will override any selection made by query parameters,
but you can always refresh the page to utilize the same query again.

### Format Options

#### dateStyle

- full
- long
- medium
- short

#### timeStyle

- full
- long
- medium
- short
