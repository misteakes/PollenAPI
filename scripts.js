window.addEventListener('load', ()=> {

    let long;
    let lat;

    let pollenvalue = document.querySelector('.pollen-value');
    let plantcategory = document.querySelector('.plant-category');

    if(navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {

            long = position.coords.longitude;
            lat = position.coords.latitude;

            console.log(lat);
            console.log(long);

            api_key = '920cef3469524873afd9f8c244e2136d';
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';

            const api = `${proxy}https://api.breezometer.com/pollen/v2/current-conditions?lat=48.857456&lon=2.354611&key=${api_key}`;
            //const api = `${proxy}https://api.breezometer.com/pollen/v2/current-conditions?lat=${lat}&lon=${long}&key=${api_key}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    // creating variables from the data from the api, we need one for the pollen value, and the plant category

                    let pollen_value_data = data.data.types.tree.index.value;
                    let plant_category_data = data.data.types.tree.index.category;

                    //set DOM element values with values from the API

                    pollenvalue.textContent = pollen_value_data;
                    plantcategory.textContent = plant_category_data;
                });

        });

    }

});