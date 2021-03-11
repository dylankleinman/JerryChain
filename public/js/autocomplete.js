// autoComplete.js input eventListener for search results event
document.querySelector("#autoComplete").addEventListener("results", (event) => {
    // console.log(event);
});

// The autoComplete.js Engine instance creator
const autoCompleteJS = new autoComplete({
    name: "food & drinks",
    data: {
        src: async function () {
            // Loading placeholder text
            // document
            //     .querySelector("#autoComplete")
            //     .setAttribute("placeholder", "Loading...");
            // Fetch External Data Source
            const source = await fetch(
                "https://api.coingecko.com/api/v3/coins/list?includ_platform=false"
            );
            const data = await source.json();
            // Post loading placeholder text
            // document
            //     .querySelector("#autoComplete")
            //     .setAttribute("placeholder", "Coins");
            // Returns Fetched data
            return data;
        },
        key: ["name","symbol"],
        results: (list) => {
            // Filter duplicates
            const filteredResults = Array.from(
                new Set(list.map((value) => value.match))
            ).map((food) => {
                return list.find((value) => value.match === food);
            });

            return filteredResults;
        }
    },
    // trigger: {
    //     event: ["input", "focus"]
    // },
    placeHolder: "Search Available Coins",
    searchEngine: "strict",
    highlight: true,
    maxResults: 100,
    resultItem: {
        content: (data, element) => {
            // Modify Results Item Style
            element.style = "display: flex; justify-content: space-between;";
            // Modify Results Item Content
            element.innerHTML = `<span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        ${data.match}</span>
        <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
      ${data.key}</span>`;
        }
    },
    noResults: (dataFeedback, generateList) => {
        // Generate autoComplete List
        generateList(autoCompleteJS, dataFeedback, dataFeedback.results);
        // No Results List Item
        const result = document.createElement("li");
        result.setAttribute("class", "no_result");
        result.setAttribute("tabindex", "1");
        result.innerHTML = `<span style="display: flex; align-items: center; font-weight: 100; color: rgba(0,0,0,.2);">Found No Results for "${dataFeedback.query}"</span>`;
        document
            .querySelector(`#${autoCompleteJS.resultsList.idName}`)
            .appendChild(result);
    },
    onSelection: (feedback) => {
        addData(feedback.selection.value.id);
    }
});