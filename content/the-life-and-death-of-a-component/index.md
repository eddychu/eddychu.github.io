---
title: The life and death of a React Class Component
date: 2020-10-29T05:58:11.637Z
---


If you were confused by React (Class) Component's life cycle methods, I hope this article will help you understand it better.

With a component approach, React turns frontend development to a simple question: render view based on current state. To acheive this, React provides us with a few methods to facilitate state and view management. These methods are the socalled life cycle method. They will be called by React runtime one after the other during the life cyle (mounting, updating, unmounting) of a React ClassComponent. 

I will try to explain this with a few examples. you can also try it on [codesandbox](https://codesandbox.io/s/component-lifecycle-j0jtn)

## Mounting : The birth of a React component

Mounting is the first phase of the life cycle. It starts with the constructor of a component gets called. 

```javascript
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "hello world" };
    console.log("1: Message Constructor");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("2: getDerivedStateFromProps");
    return null;
  }

  render() {
    console.log("3: render");
    return <div id="message">{this.state.message}</div>;
  }

  componentDidMount() {
    console.log("4: componentDidMount");
    // console.log(document.getElementById("message"))
  }
}
```

In this example, the Message class constructor is the first method to be called. Then a static function getDerivedStateFromProps is called automatically to give us a chance to change the state based on initial props. With the execution of the render() function, the dom element gets added to the dom. Then React calls componentDidMount() function. After this, the real dom element created by Message is finally accessible.

## Updating: A change of state

Updating phase starts when the state changes, through this.setState() function. 

```javascript
class Message extends Component {
  // ...
  handleClick() {
    this.setState({ message: "goodbye!" });
    console.log("state changed, we need update now !!!!");
  }

  shouldComponentUpdate() {
    console.log("5: shouldComponentUpdate");
    return true;
  }

  render() {
    console.log("6: render");
    return (
      <div onClick={this.handleClick} id="message">
        {this.state.message}
      </div>
    );
  }

  componentDidUpdate() {
    console.log("7: componentDidUpdate");
  }
}
```

After we click the component, handleClick function changes the message state. shouldComponentUpdate is called the next step. Notice that if this function returns false, the subsequent render would be canceled. Only when it returns true, render function gets called with the updated state. 

## Unmounting: Time to say goodbye

In unmounting phase, React component is destroyed and and removed from the dom tree. 

```javascript
class Message extends Component {
  componentWillUnmount() {
    console.log("7: unmount");
  }
}

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      {show && <Message />}
      <button onClick={() => setShow((show) => !show)}>toggle Message</button>
    </div>
  );
};

render(<App />, document.getElementById("root"));
```

in the code above, when show is set to be false, the last life cycle method componentWillUnmount will be called. <Message /> component then will be removed from the DOM tree.

As you can see, with a few life cycle methods, we have full control of a class component from birth to death. But if you were to start a new react project today, functional component is a much better choice. Because with in a functional component, these life cycle methods are replaced with a few even simpler "hooks". I guess that will be our next topic. 

