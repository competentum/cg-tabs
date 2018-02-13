# cg-tabs

> JavaScript Accessible Tabs Component by [Competentum Group](http://competentum.com/).
  Exported as a [UMD](https://github.com/umdjs/umd) module.

[![NPM][npm-image]][npm-url]

## Contents
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
    - [Static properties](#static-properties)
    - [Constructor](#constructor)
    - [Instance properties](#instance-properties)
    - [Instance methods](#instance-methods)


## Installation
Component can be installed with npm:
```
npm install --save cg-tabs
```

## Usage
```javascript
import CgTabs from 'cg-tabs'; // This line can be omitted if component was added via script tag

const settings = {
  container: '#id-container', // Element Selector or DOM element
  tabs: [
    {
      title: 'Tab 1', // String or Element Selector
      content: 'Panel 1' // Text or DOM Element
    },
    {
      title: 'Tab 2',
      content: 'Panel 2'
    }
  ]
};
                 
const tabs = new CgTabs(settings);
```

## API

### Static properties
- `EVENTS` *{Object}* Events which tabs can emit.
    - `SELECT` - Emits when tab is selected.
    
See [tabs.on](#method_on) method to know how to use events.

<a name="constructor"></a>
### new CgTabs(settings) - constructor
- `settings` *{Object}* Set of configurable options to set on the tabs. Can have the following fields:
    - `container` *{Element | String}* DOM Element or element selector in which tabs instance should be rendered. 
        This property can be omitted. In this case new DOM element will be created and can be accessed via `tabsInstance.container`
    - `selected` *{Number}* Number of initial selected tab. Default = `0`.
    - `tabs` *{Array\<Tab>}* Array of tabs settings
      - `title` *{String}* Tab's title or element selector. Default = `''`.
      - `content` *{String}* Tab's content or DOM element.

### Instance properties
#### `.container` *{Element}*
DOM element which contains the tabs.
If it was not set through constructor's settings it can be added to the document after initialization.

#### `.selected` *{Number}*
Index of selected tab

#### `tab.title` *{String}*
The Tab's title

#### `tab.content` *{String | Element}*
The Tab's content

### Instance methods
#### `.addTab(options, position)`
- `options` *{Object}* Tab's options.
- `position` *{Number}* Position where new tab should be inserted. This property can be omitted. In this case the new tab will be added at the end.
   
 Add new Tab in position
   
#### `.selectTab(index)`
- `index` *{Number}* Number from 0 to the number of tabs - 1.

Select Tab

#### `.removeTab(tab)`
- `tab` *{Number | Tab}* Number from 0 to the number of tabs - 1 or Tab instance.

Remove tab

<a name="method_on"></a>
#### `.on(eventName, listener)`
- `eventName` *{string}* The name of the event.
- `listener` *{Function}* The callback function.

Adds the `listener` function to the end of the listeners array for the event named `eventName`. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

```javascript
tabs.on(CgTabs.EVENTS.SELECT, function () {
    console.log('selected new tab');
});
```

> Current class extends Node.js EventEmitter. More information about working with events you can get [here](https://nodejs.org/api/events.html).



[npm-url]: https://www.npmjs.com/package/cg-tabs
[npm-image]: https://img.shields.io/npm/v/cg-tabs.svg?style=flat-square