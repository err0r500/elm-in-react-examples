# 01 - Simple example with basic Elm

The simpleCounter component will initialize an elm script and will use ports to communicate with elm.

Notice :
- how each `simpleCounter` is isolated from the other.
- that after calling the elm module once, the counter will have the value from the elm model (with a default at 0 instead of 12 in the component state) 
- the `elmPorts()` function is called once, and will instantiate a new `incDecHandler` function in the component so the button's `onClick` can call it directly