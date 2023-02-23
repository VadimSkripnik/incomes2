const {Schema, model} = require("mongoose")

const schema = new Schema({
    id: {
        type: String
    },
    data: {
        type: String
    },
    category: {
        type: String
    },
    sourceOfIncome: {
        type: String
    },
    color: {
        type: String
    },
    nameCardReceipt: {
        type: String
    },
    profit: {
        type: Number
    },
    cardId: {type: String},
    userId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = model("Receipt", schema)