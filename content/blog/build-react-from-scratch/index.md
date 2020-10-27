---
title: Build the worst React from scratch
date: 2020-10-27T03:09:20.631Z
tags:
    - React
---

I'm building a toy react library to learn more about how it works under the hood. All the code here can be found in this github [repository](https://github.com/eddychu/simple-react).

## React.createElement

```
function createElement (type,props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(item => 
                typeof item === "object" ? item : createTextNode(item)   
            )
        }
    }
}

function createTextNode (value) {
    return {
        type: "TEXT",
        props: {
            nodeValue: value,
            children: []
        }
    }
}

```

when building react apps, we don't use createElement function itself. Instead we describe UI component by using a language called "JSX". But under the hood the JSX transpiler would call createElement function, which returns the React element object exactly like the code above.


### ReactDOM.render

```
function createDom(element) => {
    const {type, props} = element;
    const {children} = props;
    const isDomElement = typeof type === "string";
    let dom;
    if(isDomElement) {
        const isTextElement = type === "TEXT";
        dom = isTextElement
            ? document.createTextNode(props.nodeValue)
            : document.createElement(type);
        Object.keys(props)
            .filter(isEvent)
            .forEach(name => {
                const eventType = name.toLowerCase().substring(2);
                dom.addEventListener(eventType, props[name]);
            })
        children.map(child => dom.appendChild(createDom(child)))
        return dom;
    } else {
        let element = type(props);
        return createDom(element)
    }
}

function render(element, container) => {
    let dom = createDom(element);
    container.appendChild(dom);
}
```

with this render function implemented. we can manage to create a basic static hello world component and render it in the document. (you need babel to transpile jsx syntax, to simplicify stuff. you can use parcel bundler which do the transpilation automatically.)

```
const App = () => (<div>Hello World</div>)

```

### React.useState

A static webpage with nothing changes wouldn't be exciting. We need to enable state to make the component dynamic.

```
    let allStates = [];
    let currentStateIndex = 0;
    const useState = (initialValue) => {
        if(currentStateIndex === allStates.length) {
            const state = {
                value: initialValue,
                setState(newValue) {
                    state.value = newValue;
                    currentStateIndex = 0;
                }
            }
            allStates.push(state);
        }
        const currentState = allStates[currentStateIndex];
        currentStateIndex += 1;
        return [currentState.value, currentState.setState]
    }
```

Now we are able to create a simple counter component to count how many times have we clicked it.

```
    const Counter = () => {
    const [state, setState] = React.useState(0);
    const handleClick = (e) => {
        setState(state + 1);
    }
    return <h1 onClick={handleClick}>{state}</h1>
}
```

That's all we need to implement a simplified version of React.
