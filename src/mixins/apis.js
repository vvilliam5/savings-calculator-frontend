export const apiRequests = {
    methods: {
        getData: async (url) => {
            const response = await fetch(url, {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                },
                // redirect: 'follow', // manual, *follow, error
                // referrerPolicy: 'no-referrer', // no-referrer, *client
                // body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        },
        postData: async (url, data) => {
            // Default options are marked with *
            // console.log(data)
            const response = await fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                },
                // redirect: 'follow', // manual, *follow, error
                // referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        },
    }
}