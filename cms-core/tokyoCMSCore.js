const baseApiUrl = 'http://localhost:3000'

async function getDynamicLabels() {
    let query = getUrlQuery({
        websiteId: 'websiteId',
        apiKey: 'apiKey',
        lang: 'en',
    })
    let apiEndpoint = 'getLabels'
    let url = `${baseApiUrl}/${apiEndpoint}?${query}`
    let response = await fetch(url)
    let data = await response.json()
    return data
}

async function populateLabels() {
    let labels = await getDynamicLabels()
    let labelElements = document.querySelectorAll('.tCMS-label')
    labelElements.forEach(element => {
        let labelId = element.dataset.labelid
        let labelContent = labels[labelId]
        element.innerHTML = labelContent
    });
}

function getUrlQuery(jsonParams) {
    var esc = encodeURIComponent;
    var query = Object.keys(jsonParams)
        .map(key => esc(key) + '=' + esc(jsonParams[key]))
        .join('&');
    return query
}


populateLabels()