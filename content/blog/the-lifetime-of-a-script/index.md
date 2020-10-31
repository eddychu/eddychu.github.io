---
title: The lifetime of a script
date: 2020-10-31T13:21:31.324Z
---

## Step 1: Loading the document
Before the web browser starts parsing a web page, it will first creates a Document object. ***the document.readyState property is set to be loading***. As the parser scan through the webpage, Dom Element objects will be added the the document object. 

When the HTML parser encounters a \<script\> tag. Something interesting will happen here:


### 1. inline script
If it is an inline \<script\> tag or \<script\ src=""> tag without async, defer, or type="module" attributes, the script element are added to document just like any other dom element. It will also be exectued synchronously in the same order the parser encounters them. The script will have access to its own \<script\> tag and document content that comes before itself.

### 2. async script
When the parser encounters a \<script\> that has async attribute set, it begin downloading the script text and continues parsing the rest of document. After the script content is downloaded, it will be exectued. once it is downloaded they behave the same as the first scenario.

*Do note that it is highly possible that the parser might already parsed the whole document (might happen in step 2 or even step 3) by the time the async script is downloaded, in which case, the async script will have the whole access to the whole document object.*

### 3. module script
a module script is a script with type="module" attribute set. it behaves the same as async script, with one difference that when the browser begins downloading the script, it will also download all of the script’s dependencies. while the parser continues to parsing the document.


## Step 2: document is parsed

When the document is completely parsed, ***the document.readyState property
changes to “interactive.”***

At this phase, any script with defer attribute set (along with any module scripts that do not have an async attribute) are executed in the order in which they appeared
in the document.Deferred
scripts have access to the complete document


## Step 3: document is ready

The browser fires a “DOMContentLoaded” event on the Document object. This
marks the transition from synchronous script-execution phase to the
asynchronous, event-driven phase of program execution. only async script might still haven't be exectued at this phase (might because of slow internet speed or script file too large so it takes too long to download)

the browser may still be waiting for additional content, such as images, to load. When all such content finishes loading, and when all async scripts have loaded and executed, ***the document.readyState property changes to “complete” and the web browser fires
a “load” event on the Window object***.

From this point on, event handlers are invoked asynchronously in response to
user input events, network events, timer expirations, and so on.


Reference: [Javascript: The Definitive Guide, 7th Edition](https://www.amazon.com/JavaScript-Definitive-Most-Used-Programming-Language/dp/1491952024/ref=pd_lpo_14_t_0/147-6956387-2659531?_encoding=UTF8&pd_rd_i=1491952024&pd_rd_r=ba515d71-5770-45a4-95cb-debc06f12656&pd_rd_w=XdFMf&pd_rd_wg=yZNnf&pf_rd_p=7b36d496-f366-4631-94d3-61b87b52511b&pf_rd_r=1RMRR4BBTQVBXHWKGHXF&psc=1&refRID=1RMRR4BBTQVBXHWKGHXF)