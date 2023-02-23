const {Schema, model} = require("mongoose")

const schema = new Schema({
    id: {
        type: String
    },
    data: {
        type: String
    },
    nameCard: {
        type: String
    },
    proceeds: {
        type: Number
    },
    name: {
        type: String
    },
    userId: {type: String},
    incomeCategorys: [],
    rateCategorys: []
}, {
    timestamps: true
})

module.exports = model("Card", schema)