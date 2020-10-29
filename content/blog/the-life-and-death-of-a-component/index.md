---
title: The life and death of a react component
date: 2020-10-29T05:58:11.637Z
---

If you were confused by React's life cycle method, I hope this article will help you understand it better.

there are three phases in the whole lifecyle of a react component, namely mounting, updating and unmounting.

Try it on [codesandbox](https://codesandbox.io/s/component-lifecycle-j0jtn)

## Mounting : The birth of a React component

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

when react start to render our Message component, the constructor is the first method to be called. Then a static function getDerivedStateFromProps is called to give us a chance to change the state based on initial props. after the render function, the dom element is finally added to the dom, then react calls componentDidMount() function, after this step the dom element is finally accessible.

## Updating: A change of state

```javascript
class Message extends Component {
  // ...
  handleClick() {
    this.setState({ message: "goodbye!" });
    console.log("state changed, we need update now !!!!");
  }

  shouldComponentUpdate() {
    console.log("4: shouldComponentUpdate");
    return true;
  }

  render() {
    console.log("5: render");
    return (
      <div onClick={this.handleClick} id="message">
        {this.state.message}
      </div>
    );
  }

  componentDidUpdate() {
    console.log("6: componentDidUpdate");
  }
}
```

After we click the component, handleClick function changes the message state. shouldComponentUpdate is called the next step. If this function returns false, nothing would be updated. If it returns true, render function will be called with the updated state.

## Unmounting: Time to say goodbye

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

when show is toggled off, the last life cycle method componentWillUnmount will be called. <Message /> component then will be removed from the DOM tree.
