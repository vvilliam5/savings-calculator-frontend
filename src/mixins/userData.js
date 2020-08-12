export const userData = {
    data() {
        return {
            userTotalSaved: [],
            userTotalIncoem: [],
            userTotalExp: []
        }
    },
    methods: {
        //extract records by type
        getTotalType(userDetails, type) {
            if (type == 'income') {
                return userDetails.filter(record => record.type == 'inc')
            } else if (type == 'expense') {
                return userDetails.filter(record => record.type == 'exp')
            } else if (type == 'savings') {
                return userDetails.filter(record => record.type == 'sav')
            } else {
                return []
            }
        },
        getTotalNumber(userDetails, total) {
            let totalAmt = 0;
            if (!total || total > userDetails.length) {
                userDetails.map(record => totalAmt = record.amount + totalAmt);
                return totalAmt;
            } else {
                userDetails.slice(-total).map(record => totalAmt = record.amount + totalAmt);
                return totalAmt;
            }
        },
        updateSavingsTotal() {
            this.savingsAmount = this.getTotalNumber(
                this.userTotalSaved,
                this.savingsRecordtoShow
            );
        },
        updateIncomeTotal() {
            this.incomeAmount = this.getTotalNumber(
                this.userTotalIncome,
                this.incomeRecordtoShow
            );
        },
        updateExpenseTotal() {
            this.expAmount = this.getTotalNumber(
                this.userTotalExp,
                this.expRecordtoShow
            );
        }
    },
}