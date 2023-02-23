// const {Schema, model} = require("mongoose")

// const schema = new Schema({
//     data: {
//         type: String
//     },
//     quantityRate: [{type: String}],
//     spent: {
//         type: Number
//     },
//     budget: {
//         type: Number
//     },
//     balance: {
//         type: Number
//     },
//     cardId: [{type: String}],
//     // user: { type: Schema.Types.ObjectId, ref: "User"}
//     userId: {type: String}
// }, {
//     timestamps: true
// })

// module.exports = model("DailyExpense", schema)

const {Schema, model} = require("mongoose")

const schema = new Schema({
    id: {
        type: String
    },
    data: {
        type: String
    },
    // quantityRate: [{type: String}],
    quantityRate: [],
    // quantityRate: [{ type: Schema.Types.ObjectId, ref: "Rate"}],
    // incomeCategory: [{ type: Schema.Types.ObjectId, ref: "IncomeCategory"}],
    spent: {
        type: Number
    },
    budget: {
        type: Number
    },
    balance: {
        type: Number
    },
    cardId: [],
    // cardId: [{type: String}],
    // user: { type: Schema.Types.ObjectId, ref: "User"}
    userId: {type: String}
}, {
    timestamps: true
})

module.exports = model("DailyExpense", schema)