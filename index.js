function createEmployeeRecord(employeeArray) {
    let employeeObj = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeObj
};

function createEmployeeRecords(arrayOfArrays) {
    let arrayOfEmployeeObjs = []
    arrayOfArrays.forEach(employeeArray => {
        arrayOfEmployeeObjs.push(createEmployeeRecord(employeeArray))
    })
    return arrayOfEmployeeObjs
};

function createTimeInEvent(date) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: Number(date.slice(11)),
        date: date.slice(0, 10),
    })
    return this
};

function createTimeOutEvent(date) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(date.slice(11)),
        date: date.slice(0, 10),
    })
    return this
};

function hoursWorkedOnDate(searchDate) {
    let timeIn
    let timeOut
    this.timeInEvents.forEach(timeInObj => {
        if (timeInObj.date === searchDate) {
            timeIn = timeInObj.hour
        }
    })
    this.timeOutEvents.forEach(timeOutObj => {
        if (timeOutObj.date === searchDate) {
            timeOut = timeOutObj.hour
        }
    })
    return (timeOut - timeIn)/100
};

function wagesEarnedOnDate(date) {
    return (hoursWorkedOnDate.call(this, date) * this.payPerHour)
};

function findEmployeeByFirstName(srcArray, searchFirstName) {
    let foundEmployee
    srcArray.forEach(employeeObj => {
        if (employeeObj.firstName === searchFirstName) {
            foundEmployee = employeeObj
        }
    })
    return foundEmployee
};

function calculatePayroll(arrayOfEmployeeObjs) {
    return arrayOfEmployeeObjs.reduce((accumulator, initialValue) => {
        return accumulator + allWagesFor.call(initialValue)
    }, 0)
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
};

