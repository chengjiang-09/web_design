const util_template = (datas, id) => {

    let template = $(`#${id}`)

    let re = /{{\s*([a-zA-Z0-9_-]+)\s*}}/

    let str = ""

    $.each(datas, function (index, obj) {
        let templateStr = template.html()
        let dataStr = ""

        while (dataStr = re.exec(templateStr)) {
            templateStr = templateStr.replace(dataStr[0], obj[dataStr[1]])
        }

        str += templateStr
    })

    return str
}

