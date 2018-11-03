# Exercise 2 - React Components

:book: Ok, so this "exercise" is a big wall of text. We don't like it anymore than you do, but at some point you got to learn React, right? So take a deep breath and go through everything in order, step by step. (We hired some cats for morale boost!)

## In this exercise you will learn about:

- Basic React components
- Basic JSX syntax
- Prop Types

## 2.1 - React components

:book: There are two ways to define a React component:

a) As a class that extends the `Component` base class from React (going to call these _class components_ from now on).  
b) As a pure function that take _props_ as input parameter and returns a view (going to call these _pure components_ from now on).

There are some major differences between the two approaches:

- A class component can have _internal state_, a pure component cannot.
- A class component can have _lifecycle hooks/methods_, a pure component cannot.
- A class component _must_ have a `render` method. This method _must_ return a view. A pure component is itself the render function and must also return a view.
- A pure component is only a simple function that takes data in and returns a view.
- A pure component is faster and simpler to reason about. It's faster because the React algorithm that tries to make smart decisions about what components has changed since the last render cycle and must be swapped, can make a lot of assumptions about how the component might and might not have changed. The runtime can make a lot fewer checks and safeguards to reach it's conclusion.
- We prefer pure components over class components wherever possible, as they are simpler to understand, faster at runtime, and less code to write. Class components are not bad or undesirable, just not as lightweight and elegant.

### Components in code

:book: In the simplest terms, _a React component is a function which takes data as its input parameter and returns a view_. The most common way to write a _view_ in React is using `JSX` syntax, which _looks_ like HTML but really isn't. In most cases you can write HTML as you know it and React will scream in your face when you mess up and have to adjust to JSX syntax.

> :bulb: JSX is just a standard - a specification. It's not part of the React framework. We could write markup in JSX in other SPA (Single Page Application) frameworks as well, but it's most commonly used with React.

#### Notable differences between HTML and JSX

- `className` instead of `class` to specify CSS classes.
- All items in a list must have a `key` prop which must be unique.
- Minor differences such as the HTML `<label for="id" />` being `<label htmlFor="id" />` in JSX.
- Callback functions for events such as clicking a button are always in the form of `onFooEvent`, i.e.: `onClick`, `onMouseLeave`, etc.

> :bulb: JSX is just syntax sugar on top of React's DOM API. In plain JavaScript you can write `document.createElement(name, children)` to create HTML elements in code. React elements are really written as `React.createElement(name, children)`, but because this is tedious and complicated to write, JSX abstracts this away and we can write `<div />` instead of `React.createElement('div', null)`.

> :bulb: You might need a plugin/extension for your text editor/IDE for it to understand and format JSX correctly.

#### JSX examples

:book: A simple React component, written as a pure component may look like this:

```jsx
const Checkout = props => (
  <div>
    <p>Total sum: {props.totalAmount}</p>
  </div>
);
```

:book: If the above function syntax looks funny to you, here's a more familiar version of the same:

```jsx
function Checkout (props) {
  return (
    <div>
      <p>Total sum: {props.totalAmount}</p>
    </div>
  );
}
```

:book: We do prefer the first version though, as it's less ceremony to write, and `const` promotes immutability which makes our code easier to reason about and trust. A good tip is to use `const` wherever you used to use `var` in JavaScript - for all assignments (functions and variables).

The same component written as a _class component_:

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

- We receive `props` as a parameter in both cases. When written as a pure component, we receive props as the first (and only) function argument. When written as a class component, we get props as a object on `this.props`.

:book: Props are the values/data sent in to our component from the parent component. For example here we pass `totalAmount` and `address` as props to our inner _Summary_ component:

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

> :bulb: The `render()` method is a mandatory convention. All React class components _must_ have a `render()` method. If your component does not render a view (which is sometimes the case), render can return `null`, but it must be implemented and return something. When writing pure components, the whole component is itself the render function and it must return a JSX view (or null).

Still with us? Sure hope so!

Found a precise enactment of what it feels like getting through this exercise:

![](../images/cats/cat2.gif)

#### Internal state

:book: Class components can have _internal state_ in addition to having props sent in. Knowing when to use _internal state_ vs _having state passed into the component from the outside via props_ (for example via state containers such as Redux, which we're going to use) is one of the challenges when you're new to React.

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

- Note there is some boilerplate ceremony necessary in the constructor now.
- The initial `count` state is set in the constructor.
- We are only ever allowed to change the state by using React's `this.setState(newState)` method. If we did another `this.state = { count: this.state + 1 }` in the `incrementCounter` method we'd get an error.
- In the `render()` method we access the `count` value by using `this.state.count`.
- We hook the button up to our `incrementCounter` method when it's clicked.

#### Prop Types

:book: Prop Types are React's "poor man's type checking".

Let's say you have the following component:

```jsx
import React from 'react';

const Checkout = props => (
  <div>
    <p>Total sum: {props.totalAmount}</p>
  </div>
);

export default Checkout;
```

As the author of this component, you expect `totalAmount` to be a number. You can't, however, be sure you actually get a number and not a string or null, so you end up guarding against garbage input. After a (short) while, this gets quite tedious and complicated.

Here's the same component with prop types applied:

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Checkout = props => (
  <div>
    <p>Total sum: {props.totalAmount}</p>
  </div>
);

Checkout.propTypes = {
  totalAmount: PropTypes.number.isRequired,
};

export default Checkout;
```

Now `totalAmount` is declared as a number within the React ecosystem, and it's set as _required_, meaning React will throw an error at us if the received value is ever not a number or null or undefined. This also serves as great documentation for other developers trying to understand the component and how to use it.

If `totalAmount` was not required, we'd be forced to also set `defaultProps` which would explicitly state the prop's _default value_ when the prop is not set by the caller.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Checkout = props => (
  <div>
    <p>Total sum: {props.totalAmount}</p>
  </div>
);

Checkout.propTypes = {
  totalAmount: PropTypes.number,        <------ not required
};

Checkout.defaultProps = {
  totalAmount: 0,
};

export default Checkout;
```

If `totalAmount` is not set by the caller, we can now be certain its value will be `0` and not `undefined` when we try to access it through `props.totalAmount`.

We'll explore Prop Types more as we go along.

Oh by the way - here's you, writing React code on the next exercise!

<img src="../images/cats/cat1.gif" width="400" />

#### Destructuring props

As a footnote before moving on, we typically [_destruct_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the `props` object to avoid having to write `props.blah`. It just reads cleaner and gives less boilerplate code.

So instead of:

```jsx
const TodoList = props => <div>{props.todoItems.length}</div>;
```

We'd write:

```jsx
const TodoList = ({ todoItems }) => <div>{todoItems.length}</div>;
```

A component with many props would be formatted like this:

```jsx
const TodoList = ({
  todoItems,
  listName,
  maxNrOfItems,
  onItemAdded,
  onItemDeleted,
}) => (
  <div>
    <h1>{listName}</h1>
    <ul>
      {todoItems.map(item => (
        <li>{item.description}</li>
      ))}
    </ul>
    /* ... */
  </div>
);
```

[Object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) is a JavaScript language feature and not React.

### JSX in a hurry

:book: We'll touch on more JSX goodies as we go along, but here's a few things you'll need to know:

- We can write plain JavaScript by wrapping it in `{ }` inside of any jsx code block. We use this quite frequently to do conditional checks and write data to the screen.
- We iterate over lists like this:

```jsx
const TodoList = props => (
  <ul>
    {props.todoItems.map(todoItem => (
      <li>{todoItem.description}</li>
    ))}
  </ul>
);
```

- We do conditional checks like this:

```jsx
const Checkout = props => (
  <div>
    {props.isOlderThanMinAgeLimit &&
      <p>You may buy this product</p>
    }
    {!props.isOlderThanMinAgeLimit &&
      <p>You may NOT buy this product</p>
    }
  </div>
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
    </div>
  );
};
```

This syntax might look... _different_ (~~cough cough ugly cough cough~~) but as you get used to reading it, you'll discover it's actually quite declarative and easy to reason about. It may not be pretty, but it's quite expressive.

## 2.2 - Let's make a thing!

In this workshop we'll make a simple Todo application.

![](../images/todo-app.png)

### Header

- There will be an `h1` header for the name of this glorious app
- There will be a sub-header with slightly emphasized text stating how many total tasks there are and how many of those are completed.

### Adding a task

- There will be a textbox where a user can enter the description of a task
- There will be an "Add" button which will add the task to the list of existing tasks/todos.

### Listing todos

- There will be a list of todo items. Each todo item will consist of:
  - A checkbox with the description of the todo
  - An delete button which will remove the todo item permanently

### Planning React components

Above, we listed a series of demands for our application - we might call this our _specification_ or _spec_.

Like most developers, we want to create this app with as little effort as possible. To make sure we spend as little time as possible being confused about our work at hand, maximize code re-use, and have a common understanding of how we're going to implement this app, let's spend a few minutes on planning how we're going to structure our React compments.

### React components in our Todo app

![](../images/todo-app-components.png)

(The dotted lines represent component boundaries).

(No need to create all components right now, we'll get to that).

1. `App`. Will contain the header text and the sub-components. Represents the _root component_ of our app.
1. `Summary`. Will contain the total number of tasks and show how many of those are completed.
1. `AddTodo`. Will contain the textbox and Add-button.
1. `TodoList`. Will contain the list for all todo items.
1. `TodoItem`. Will contain a checkbox that marks a task as In Progress or Done, and a Delete button.

Each component will be in separate files with a `.jsx` extension. I.e. the `AddTodo`-component will be in a file called exactly `AppTodo.jsx`.

Phew! That was too much text in one go! If you made it through without detouring to the internet, have a cookie (if you brought any)!

![](../images/cats/cat3.gif)

### [Go to exercise 3 :arrow_right:](../exercise-3/README.md)
