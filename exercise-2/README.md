# Exercise 2 - React Components

## In this exercise you will learn to:

- Understand basic React and JSX syntax.
- Create React components using classes that extends a React base class.
- Implement the various lifecycle hooks React exposes
- Create React components using pure functions
- Use Prop Types to be explicit about what data types and shape your component is expecting as _props_.

## 2.1 - React

There are two ways to define a React component:

a) As a class that extends the `Component` base class from React (going to call these _class components_ from now on).  
b) As a pure function that take _props_ as input parameter and returns a view (going to call these _pure components_ from now on).

There are some major differences between the two approaches:

- A class component can have _internal state_, a pure component cannot.
- A class component can have _lifecycle hooks/methods_, a pure component cannot.
- A class component _must_ have a `render` method. This method _must_ return a view. A pure component is itself the render function and must also return a view.
- A pure component is only a simple function that takes data in and returns a view.
- A pure component is faster and simpler to reason about. It's faster because the React algorithm that tries to make smart decisions about what components has changed since the last render cycle and must be swapped, can make a lot of assumptions about how the component might and might not have changed. The runtime can make a lot fewer checks and safeguards to reach it's conclusion.
- We prefer pure components over class components wherever possible, as they are simpler to understand, faster, and less code to write. Class components are not bad or undesirable, just not as ideal and lightweight for simple scenarios.

### Components in code

In the simplest way, _a React component is a function which takes data as its input parameter and returns a view_. The most common way to write a _view_ in React is using `jsx` syntax, which _looks_ like HTML, but is not really HTML. In most cases you can write HTML as you know it and React will scream in your face when you mess up.

The most notable differences between JSX and HTML are:

* `className` instead of `class` to specify CSS classes.
* All items in a list must have a `key` prop which must be unique.
* Minor differneces such as `<label for="id" />` being `<label htmlFor="id" />`
* Callback functions for events such as clicking a button are always in the form of `onFooEvent`, i.e.: `onClick`, `onMouseLeave`, etc.

> JSX is just syntax sugar on top of React's DOM API. In regular HTML you can write `document.createElement(name, children)`. React elements are really written as `React.createElement(name, children)`, but because this is tedious to write, JSX abstracts this away and we can write `<div />` instead of `React.createElement('div', null)`.

> You might need a plugin to your text editor/IDE for it to understand and format JSX correctly.

A simple React component, written as a pure component may look like this:

```jsx
const Checkout = props => (
  <div>
    <p>Total sum: {props.totalAmount}</p>
  </div>
);
```

The same component written as a class component:

```jsx
class Checkout extends Component {
  render() {
    return (
      <div>
        <p>Total sum: {this.props.totalAmount}</p>
      </div>
    );
  }
}
```

* We receive `props` as a parameter in both cases. When written as a pure component, we receive props as the first (and only) function argument. When written as a class component, we get props as a object on `this.props`. Props are the values/data sent in to our component from the parent component. For example here we pass `totalAmount` and `address` as props to our inner component:

```jsx
class Checkout extends Component {
  render() {
    const amount = calculateTotalAmount(this.props.orderItems);
    return (
      <Summary totalAmount={amount} address={this.props.customer.address} />
    );
  }
}
```

The `Summary` component will now be able to read these values from `this.props.totalAmount` and `this.props.address`.

> The `render()` method is a mandatory convention. All React class components _must_ have a `render()` method. If your component does not render a view (which is sometimes the case), render can return `null`, but it must be implemented and return something. When writing pure components, the whole component is itself the render function and it must return a JSX view (or null).

#### Internal state

Class components can have _internal state_ in addition to having props sent in. Knowing when to use internal state vs outside state via state containers such as Redux is one of the challenges when you're new to React.

Here's an example where we have the state of a counter as internal state:

```jsx
class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };

    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div>
        <span>The counter is: {this.state.count}</span>
        <br />
        <button value="Increment" onClick={this.incrementCounter} />
      </div>
    );
  }
}
```

* Note there is some boilerplate ceremony necessary in the constructor now.
* The initial `count` state is set in the constructor.
* We are only ever allowed to change the state by using React's `this.setState(newState)` method. If we did another `this.state = { count: this.state + 1 }` in the `incrementCounter` method we'd get an error.
* In the view we get the count value by accessing `this.state.count`.
* We hook the button up to our `incrementCounter` method when it's clicked.

### JSX in a hurry

We'll touch on more JSX goodies as we go along, but here's a few things you'll need to know:

* We can write plain JavaScript by wrapping it in `{ }` inside of any jsx code block. We use this quite frequently to do conditional checks and write data to the screen.
* We iterate over lists like this:

```jsx
const TodoList = props => (
  <ul>
    {props.todoItems.map(todoItem => (
      <li>{todoItem.description}</li>
    ))}
  </ul>
);
```

* We do conditional checks like this:

```jsx
const Checkout = props => (
  <div>
    {props.isOlderThanMinAgeLimit &&
      <p>You may buy this product</p>
    }
    {!props.isOlderThanMinAgeLimit &&
      <p>You may NOT buy this product</p>
    }
  </ul>
);
```

Or like this:

```jsx
const Checkout = props => {
  const message = props.isOlderThanMinAgeLimit
    ? <p>You may buy this product</p>
    : <p>You may NOT buy this product</p>;

  return (
    <div>
      {message}
    </ul>
  );
};
```

This syntax might look... _different_ (~~cough cough ugly cough cough~~) but as you get used to reading it's quite declarative and easy to reason about.

As a footnote before moving on, we typically [_destruct_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the `props` object to avoid having to write `props.blah`. It just reads cleaner.

So instead of:

```jsx
const TodoList = props => <div>{props.todoItems.length}</div>;
```

We'd write:

```jsx
const TodoList = ({ todoItems }) => <div>{todoItems.length}</div>;
```

[Object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) is a JavaScript language feature and not React.

## 2.2 - Let's make a thing!

In this workshop we'll make a simple Todo application.

![](../images/todo-app.png)

The basic functionality will be very simple, but it can be expanded into a complex, usable app if you want to.

**Header**

* There will be an `h1` header for the name of this glorious app
* There will be a sub-header with slightly emphasized text stating how many total tasks there are and how many of those are completed.

**Adding a task**

* There will be a textbox where a user can enter the description of a task
* There will be an "Add" button which will add the task to the list of existing tasks/todos.

**Listing todos**

* There will be a list of todo items. Each todo item will consist of:
  * A checkbox with the description of the todo
  * An delete button which will remove the todo item permanently

### Planning React components

Above, we listed a series of demands for our application - we might call this our _specification_ or _spec_.

Like any developers, we want to create this app with as little effort as possible. To make sure we spend as little time as possible being confused about what we need to code, maximize code re-use, and have a common understanding of how we're going to implement this app, let's spend a few calories on planning how we're going to structure our React compments. Speaking of React components, this phrase has been mentioned a few times by now but not discussed properly yet.


### React components in our Todo app

Now that we know a tiny bit about React components, let's attempt to sketch out a plan. We suggest the following:

![](../images/todo-app-components.png)

(The dotted lines represent component boundaries).

(No need to create all components right now, we'll get to that).

1. `App`. Will contain the header text and the sub-components.
1. `Summary`. Will contain the total number of tasks and show how many of those are completed.
1. `AddTodo`. Will contain the textbox and Add-button.
1. `TodoList`. Will contain the list for all todo items.
1. `TodoItem`. Will contain a checkbox that marks a task as In Progress or Done, and a Delete button.

Each component will be in separate files with a `.jsx` extension. I.e. the `AddTodo`-component will be in a file called exactly `AppTodo.jsx`.



# TEMP
- skisse av Todo app med inntegna områder som illustrerer komponentene vi må lage
- Lage en class component (m/prop types, forklare det)
- Bruke lifecycle hooks
- Lage en pure component (m/prop types)
