import Mock from "mockjs"

Mock.setup({
    timeout: '100-200'
})
Mock.mock("/data", {
    "data": {
        'number1|20-28.1': 1,
        'number2|40-50.1': 1,
        'number3|1-5.1': 1,
        'number4|1-5.1': 1,
        'number5|500-1000': 1,
        'number6|20-28.1': 1,
        'number7|20-28.1': 1,
        'number8|20-25.1': 1,
        'number9':"24",
        'number10':"45",
        'number11':"22",
        'theBtn|1':true,
    }
})
