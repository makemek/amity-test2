# Eko Delivery Service

## Installation

```
$ npm install
$ npm run build
```

Start the app

```
$ npm run start:prod
```

The app will start listening for connections at port 3000.
Go to http://localhost:3000

## How to use

![alt text](https://i.ibb.co/2d56BhQ/Screenshot-20210112-141947.png 'Screenshot')

Input the route inside `Routes` field.

### Input case 1

`Calcualte delivery cost` section deals with input case 1.
Enter route such as `A-B-E` and click `Calculate`.
It will display the number below.

### Input case 2

`Calcualte possible delivery routes` section deals with input case 2.
Input fields below and click `Calculate`.
It will display the number below.

Fields

- Source (required) - Town name to start
- Destination (required) - Town name to stop
- Maximum Visit (optional) - How many revisit allow for each towns
- Max stop (optional) - Maximum hops allowed before reaching the destination.
  If number of hops exceed, App will dismiss the route.
- Maximum Cost (optional) - Maximum cost allowed before reaching the destination.

## Development

```
$ npm start
```

## Testing

```
$ npm test
```

## FYI

I think this problem focuses extensively on algorithms too much.
React is just a sprinkle on top.
If you know nothing about graph theory, you're pretty much doom from the start.
You don't even need to know react to solve this problem.
Removing react out, the context remains the same.
It also requires production-like project workflow and code which takes a decent time to setup.
The problem can be solved within expected two days if solution concepts are laid out.
The only thing left is the implementation, and working on it full-time.

It would be better if there are some more details on what routes are, rather than displaying them as number only.
I can't verify the solution.
