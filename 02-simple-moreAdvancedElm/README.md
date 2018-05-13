# 02 - Simple example with a more advanced Elm module

This project shows : 
- how to share elm ports all over an app using a `react Context`
- how to pass an initial state to the elm module using flags

Notice :
- how the flags are sanitize using elm `Json.Decode`, this is not mandatory but obviously a good practice.
- incDecHandler & count are added to the app `state` then passed to the context so they can be used everywhere in the context. 
