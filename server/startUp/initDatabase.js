const Card = require("../models/Card")
const DailyExpense = require("../models/DailyExpense")
const IncomeCategory = require("../models/IncomeCategory")
const RateCategory = require("../models/RateCategory")
const Rate = require("../models/Rate")
const Receipt = require("../models/Receipt")
const User = require("../models/User")


const dailyExpensesMock = require("../mock/dailyExpenses.json")



module.exports = async () => {
    const dailyExpenses= await DailyExpense.find()
    if (dailyExpenses.length !== dailyExpensesMock.length) {
        await createInitialEntity(DailyExpense, dailyExpensesMock)
    }

}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
     return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
     )
}