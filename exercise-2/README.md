# Exercise 2 - React Components

## In this exercise you will learn to:

- Create React components using classes that extends a React base class.
- Implement the various lifecycle hooks React exposes
- Create React components using pure functions
- Use Prop Types to be explicit about what data types and shape your component is expecting as _props_.

## 2.0 - Let's make a thing!

In this workshop we'll make a simple Todo application.

## 2.1 - Creating a React component as a class

There are two ways to define a React component:

a) As a class that extends the `Component` base class from React (going to call these _class components_ from now on).
b) As a pure function that take _props_ as input parameter and returns a view (going to call these _pure components_ from now on).

There are some major differences between the two approaches:

- A class component can have _internal state_, a pure component cannot.
- A class component can have _lifecycle hooks/methods_, a pure component cannot.
- A pure component is only a simple function that takes data in and returns a view.
- A pure component is faster and simpler to reason about. It's faster because the React algorithm that tries to make smart decisions about what components has changed and must be swapped can make a lot of assumptions about how the component might've changed. The runtime can make a lot fewer checks and safeguards to reach it's conclusions.
- We prefer pure components over class components wherever possible, as they are simpler, faster, and less code to write. Class components are not bad or undesirable, just not as ideal for simple scenarios.



# TEMP
- skisse av Todo app med inntegna områder som illustrerer komponentene vi må lage
- Lage en class component (m/prop types, forklare det)
- Bruke lifecycle hooks
- Lage en pure component (m/prop types)
