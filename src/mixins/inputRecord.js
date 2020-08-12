export const inputRecord = {
    data() {
        return {
            userCurrentMonthData: []
        }
    },
    methods: {
        runInputRecord() {
            //get curent monnth
            let currentMonth = this.getCurrentMonth()
            currentMonth = this.getMonthName(currentMonth)
            this.userCurrentMonthData = this.isMonthDataSubmitted(currentMonth, this.userRecords)
        },
        isMonthDataSubmitted(currentMonth, userDetails) {
            let details = userDetails.filter(record => record.month == currentMonth);
            if (details.length > 0) {
                return details
            } else {
                return null
            }
        },
        getCurrentMonth() {
            let month = new Date()
            return month.getMonth()
        },
        getMonthName(monthNumber) {
            switch (monthNumber + 1) {
                case 1:
                    return 'january'
                case 2:
                    return "febuary"
                case 3:
                    return 'march'
                case 4:
                    return "april"
                case 5:
                    return 'may'
                case 6:
                    return "june"
                case 7:
                    return 'july'
                case 8:
                    return "august"
                case 9:
                    return 'september'
                case 10:
                    return "october"
                case 11:
                    return 'november'
                case 12:
                    return "december"
                default:
                    return null
            }
        }
    },
}