const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    phone: {type: String, match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/},
    email: {type: String, required: true, unique: true, 
        validate: {validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email address format',
      }
    },
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);


module.exports = mongoose.model("UserModel", userSchema);