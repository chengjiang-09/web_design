const util_template = (datas, id, index) => {

    let template = $(`#${id}`)

    let re = /{{\s*([a-zA-Z0-9_-]+)\s*}}/

    if (index) {
        let newBookStr = ""
        let activeBookStr = ""
        let commonBookStr = ""

        $.each(datas, function (index, obj) {
            if (obj.bookstatus == 0) {
                newBookStr += init_template(template,obj,re)
            } else if (obj.bookstatus == 1) {
                activeBookStr += init_template(template,obj,re)
            } else if (obj.bookstatus == 2) {
                commonBookStr += init_template(template,obj,re)
            }
        })

        return [newBookStr,activeBookStr,commonBookStr]
    } else {
        let str = ""

        $.each(datas, function (index, obj) {
            str += init_template(template,obj,re)
        })

        return str
    }
}

const init_template = (template,obj,re) => {

    let templateStr = template.html()
    let dataStr = ""

    while (dataStr = re.exec(templateStr)) {
        templateStr = templateStr.replace(dataStr[0], obj[dataStr[1]])
    }

    return templateStr
}

