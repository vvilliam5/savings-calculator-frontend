export const createRecord = {
    data() {
        return {
            userDetails: this.getUserDetails(),
            currentMonth: this.getMonthName(this.getCurrentMonth())
        }
    },
    methods: {
        async createMonthlyRecord(income, expense, savings) {
            // console.log('creating record')
            let incomeBody = {
                "userEmail": this.userDetails.email,
                "month": this.currentMonth,
                "year": 2020,
                "type": 'inc',
                "amount": income
            }
            let expenseBody = {
                "userEmail": this.userDetails.email,
                "month": this.currentMonth,
                "year": 2020,
                "type": 'exp',
                "amount": expense
            }
            let savingsBody = {
                "userEmail": this.userDetails.email,
                "month": this.currentMonth,
                "year": 2020,
                "type": 'sav',
                "amount": savings
            }
            // console.log(incomeBody, savingsBody, expenseBody)
            let ires = await this.postData(process.env.VUE_APP_API_BASE_URL + 'records', incomeBody)
            if (ires.status == 'success') {
                // console.log('income created')
                let eres = await this.postData(process.env.VUE_APP_API_BASE_URL + 'records', expenseBody)
                if (eres.status == 'success') {
                    // console.log('expense created')
                    let sres = await this.postData(process.env.VUE_APP_API_BASE_URL + 'records', savingsBody)
                    return sres;
                }
            }
        }
    },
}