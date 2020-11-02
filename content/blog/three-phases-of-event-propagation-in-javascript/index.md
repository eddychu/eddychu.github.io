---
title: Three phases of event propagation in javascript
date: 2020-11-02T08:50:36.785Z
---


Javascript programs use an asynchronous event-driven programming model. When something happens on the webpage, the browser will generate a event for it, a special function called event handler then gets called. If there are more than one event handler binded, they will be exectued in the same order as they were added.

To understand how events are handled in javascript (client side), we have to understand the three phase of event propagation.

## First: Capturing phase

Before a event on a target object is invoked, the event is in the so called capturing phase. Recall that addEventListener() takes an optional third argument. If that argument is true ,or {capture:true}, then the event handler is registered as a capturing event handler
for invocation during this first phase of event propagation.

During this phase, the capturing handlers of the Window object are invoked first, then the capturing handler of the Document object, then of the body object, and so on down the DOM tree until the capturing event handlers of the parent of the event target. 

```html
    <div id="box">
        <button id="button">Button</button>
    </div>
    <div id="other">

    </div>

    <script>
        const button = document.getElementById("button");
        const box = document.getElementById("box");
        const other = document.getElementById("other");
        button.addEventListener("click", () => {
            console.log("hello from button");
        })
        box.addEventListener("click", () => {
            console.log("hello from box");
        })
        box.addEventListener("click", (e) => {
            console.log("hello from box, capture");
        }, {capture: true})

    </script>
```
because the capturing phase happens before the target event handler gets called, the last capture event handler will be called first. and then the button object's event handler gets called before it bubbles up to the parent object again.

if we add event.stopPropagation() in the capture event handler, then the button click event will be canceled, hence the first two event listeners will be pointless.


## Invocation of the target object

After the capturing phase ends, the event handlers of the event target object are invocated. Most of the time, as programmer we only care about what happens in this phase. 

One thing to note is that handlers are invoked with the target as their this value, even when registered using addEventListener() .

```javascript
    button.onclick = function() {
        console.log(this);
        // this is the button object
    }

    button.addEventListener("click", function() {
        console.log(this);
        // same, this is the button object
    })
    
    button.addEventListener("click", () => {
        console.log(this); 
        // alert, this will be the environment where button is defined. typically window object.
    })
```


## Bubbling phase

After the event handlers registered on the target element are invoked, most events "bubble" up the DOM tree.

```html
    <div id="box">
        <button id="button">Button</button>
    </div>
    <div id="other">
    </div>
    <script>
        const button = document.getElementById("button");
        const box = document.getElementById("box");
        const other = document.getElementById("other");
        button.addEventListener("click", () => {
            console.log("hello from button");
        })
        box.addEventListener("click", () => {
            console.log("hello from box");
        })
        other.addEventListener("click", () => {
            console.log("i won't be called ever");
        })
    </script>
```
when different dom elements need event handlers, you can utilise this default bubbling behavior, by registering a single handler on a common ancestor element and handle events there. you can use event.target property to check which child element fired the specific event.

Do note that a few event types don't follow this bubbling rule, such as "focus", "blur", "scroll".

An event target may have more than one event handler registered for a particular
type of event. When an event of that type occurs, the browser invokes all of the han‐
dlers in the order in which they were registered.