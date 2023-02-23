const {Schema, model} = require("mongoose")

const schema = new Schema({
    id: {
        type: String
    },
    data: {
        type: String
    },
    sourceOfIncome: {
        type: String
    },
    color: {
        type: String
    },
    cardId: {type: String},
    userId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = model("RateCategory", schema)