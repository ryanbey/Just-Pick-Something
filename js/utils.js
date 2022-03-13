// Fetches premade JSON file
export function getJSON(url) {
    return fetch(url)
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            // console.log(response.json());
            return response.json();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}