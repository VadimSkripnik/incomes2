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
    itemName: {
        type: String
    },
    sourceOfRate: {
        type: String
    },
    color: {
        type: String
    },
    position: {
        type: String
    },
    sum: {
        type: Number
    },
    quantity: {
        type: Number
    },
    cardId: {
        type: String
    },
    // user: { type: Schema.Types.ObjectId, ref: "User"},
    userId: {type: String}
}, {
    timestamps: true
})

module.exports = model("Rate", schema)