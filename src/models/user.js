// External Dependancies
const mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , bcrypt = require('bcrypt')
    , saltRounds = 10

const userSchema = new Schema({
  firstname:    { type: String, required: true },
  lastname:     { type: String, required: true },
  email:        { type: String, unique: true, required: true },
  password:     { type: String, required: true },
  role:         { type: Number, default: 3 }, // 0 - SuperAdmin, 1 - Admin, 2 - User with permissions, 3 - user without permissions
  active:       { type: Boolean, default: false },
  token:        { type: String },
  deviceid:     { type: String }, // only for push notifications
  created_date: { type: Date, default: Date.now }
})

userSchema.methods.generateHash = function(cb) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(saltRounds), cb);
}

userSchema.methods.validPassword = function(password, hash) {
    bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('User', userSchema)
