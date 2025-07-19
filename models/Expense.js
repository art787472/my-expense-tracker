export default class Expense {
    constructor({dateTime, price, category, reason, account, picture, user}) {
        this.dateTime = dateTime
        this.price = price
        this.category = category
        this.reason = reason
        this.account = account
        this.picture = picture
        this.user = user
    }
}