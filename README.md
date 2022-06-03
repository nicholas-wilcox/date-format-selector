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

### Design Overview

The primary source material for this utility is ECMA-402,
specifically section [11: DateTimeFormat Objects](https://tc39.es/ecma402/#datetimeformat-objects).
We begin with the [specification for the `Intl.DateTimeFormat` constructor](https://tc39.es/ecma402/#sec-intl.datetimeformat):

> 3. Perform ? InitializeDateTimeFormat(dateTimeFormat, locales, options).

In `InitializeDateTimeFormat`...

> 2. Set options to ? ToDateTimeOptions(options, "any", "date").

`ToDateTimeOptions(options, required, defaults)` (section [11.5.1](https://tc39.es/ecma402/#sec-todatetimeoptions)) is where
things get interesting.
For our purposes, the algorithm does the following:

1. Let *needDefaults* be **true**.

2. Check the *required* argument (which was given as **"any"**).
   There exists a pair of lists of different property names, which apply to either **"date"** options or **"time"** options.
   If the value of *required* applies to one or both of these types, then *options* will be indexed with each of the property names.
   If any of these properties is defined in *options*, then *needDefaults* is set to **false**.

   | *required*       | *options* property                                                          |
   |------------------|-----------------------------------------------------------------------------|
   | **"date"/"any"** | **weekday**, **year**, **month**, **day**                                   |
   | **"time"/"any"** | **dayPeriod**, **hour**, **minute**, **second**, **fractionalSecondDigits** |

3. If **dateStyle** or **timeStyle** are defined in *options*, then let *needDefault* be **false**.

4. Throw a **TypeError** exception if *required* is **"date"** and **timeStyle** is defined,
   or vice-versa with **"time"** and **dateStyle**.

5. If *needDefaults* is **true**, then check *defaults* (either **"date"**, **"time"**, or **"all"**).
   Set the following properties to **"numeric"** in each case that applies:

   | *defaults*       | *options* property               |
   |------------------|----------------------------------|
   | **"date"/"all"** | **year**, **month**, **day**     |
   | **"time"/"all"** | **hour**, **minute**, **second** |

6. Return *options*.
