# SandFeathers
Universal Data Sanitation for Feathers.js

SandFeathers implements data sanitation for Feathers.js by using Sandhands. To see how to define a format please visit [https://github.com/L1lith/Sandhands](https://github.com/L1lith/Sandhands). 

## Basic Usage
To use SandFeathers you must first instantiate a SandFeathers object by providing it the format and the SandFeathers options

messages.format.js
```js
// SandFeathers is the class used to instantiate your sanitation rules
// The ObjectID Format can be used inside of your format 
const {SandFeathers, ObjectID } = require('sand-feathers')

module.exports = new SandFeathers(/* The Sandhands Format Object*/ {content: String, author: ObjectID}) 
// Now we have our SandFeathers object we can get the hooks from it and register it to the corresponding service
```

messages.service.js (modified from the feathers.js template app)
```js
const { Messages } = require('./messages.class');
const createModel = require('../../models/messages.model');
const hooks = require('./messages.hooks');
const format = require('./messages.format')

module.exports = function (app) {(format.hooks)
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  app.use('/messages', new Messages(options, app));

  const service = app.service('messages');

  service.hooks(format.hooks) // Register the data sanitization
  // This is done before registering the rest of the hooks so it gets priority
  service.hooks(hooks)
}
```

To see the full working example, see [here](https://github.com/L1lith/Sand-Feathers/tree/main/feathers-test-app/src/services/messages)