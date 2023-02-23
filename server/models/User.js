const {Schema, model} = require("mongoose")

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String},
    image: String,
    card: [{ type: Schema.Types.ObjectId, ref: "Card"}],
    incomeCategory: [{ type: Schema.Types.ObjectId, ref: "IncomeCategory"}],
    RateCategory: [{ type: Schema.Types.ObjectId, ref: "RateCategory"}]
}, {
    timestamps: true
})

module.exports = model("User", schema)