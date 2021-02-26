---
title: The lifetime of a script
date: 2020-10-31T13:21:31.324Z
---

When web browser loads a webpage, a document is created, parsed, until it is fully loaded. During these phases, the javascript programs are first synchrounously loaded and excuted and then transit into an event-handling asynchrounous execution. 


## Step 1: Loading the document
Before the web browser starts parsing a web page, it will first creates a document object. ***the browser set document.readyState property to be loading***. As the parser scan through the webpage, dom element objects will be added to the document object in the order that the parser encounters them. 

When the HTML parser encounters a \<script\> tag. There are a few scenarios might happen during this phase:


### 1. inline script
If it is an inline \<script\> tag or \<script\ src=""> tag without async, defer, or type="module" attributes, the script element will be added to document just like any other dom elements. It will also be exectued synchronously in the same order the parser encounters them. The script will have access to its own \<script\> tag and document content that comes before itself. Before the script is fully loaded and excuted, the Html parser cannot proceed the dom construction. Because the script can call document.write() function which would totally change the whole document structure, which renders the dom parser work totally pointless.

### 2. async script
When the parser encounters a \<script\> that has async attribute set, it begin downloading the script text and continues parsing the rest of document. After the script content is downloaded, it will be executed. Once it is downloaded they behave pretty much the same as inline \<script\> tag.

*Do note that it is highly possible that the parser might already parsed the whole document by the time the async script is downloaded (might happen in step 2 or even step 3), in which case, the (async) script will have the whole access to the whole document object.*

### 3. module script

a module script is a script with type="module" attribute set. It behaves the same as async script, with one difference that when the browser begins downloading the script, it will also download all of the script’s dependencies. while the parser continues to parsing the document.


## Step 2: document is parsed

When the document is completely parsed, ***the document.readyState property
changes to “interactive.”***

At this phase, any script with defer attribute set (along with any module scripts that do not have an async attribute) are executed in the order in which they appeared in the document.Deferred scripts have access to the complete document.


## Step 3: document is ready

The browser fires a “DOMContentLoaded” event on the Document object. ***This
marks the transition from synchronous script-execution phase to the
asynchronous, event-driven phase of program execution***. Only async script might still haven't be exectued at this phase (might because of slow internet speed or script file too large so it takes too long to download)

The browser may still be waiting for additional content, such as images, to load. When all such content finishes loading, and when all async scripts have loaded and executed, ***the document.readyState property changes to “complete” and the web browser fires
a “load” event on the Window object***.

From this point on, event handlers are invoked asynchronously in response to
user input events, network events, timer expirations, and so on.


Reference: Javascript: The Definitive Guide, 7th Edition