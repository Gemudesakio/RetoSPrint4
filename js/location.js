let urlApi = "https://rickandmortyapi.com/api/location"

const { createApp } = Vue;

const app = createApp({
    data() {
        //Declaración de variables para almacenar los datos de la API
        return {
            countTotal: 0,
            countTypes: 0,
            countDimensions: 0,
            pages: 0,
            locations: [],
            locationsBackup: [],
            types: [],
            dimensions: [],
            locationResidents: [],
            residents: [],
            filterText: "",
            filterDimension: [],
            favoritesLocations: [], // Ubicaciones favoritas
            showFavoritesModal: false, // Controla la visibilidad del modal
            showLocationModal: false, // Controla la visibilidad del modal

            locationsImages: 
            [
                { "name": "Dimension C-137", "url": "https://static.wikia.nocookie.net/rickandmorty/images/4/45/C-137_season_6.png" },
                { "name": "unknown", "url": "https://static.wikia.nocookie.net/rickandmorty/images/e/e3/No_Image.png" },
                { "name": "Post-Apocalyptic Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/f/f4/Post-Apocalyptic_World.png" },
                { "name": "Replacement Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/e/ed/WayneReplacementDimension.png" },
                { "name": "Cronenberg Dimension", "url": "https://i.ytimg.com/vi/O8oY11NOxp8/maxresdefault.jpg" },
                { "name": "Fantasy Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/d/df/Fantasyplanet.png" },
                { "name": "Dimension 5-126", "url": "https://static.wikia.nocookie.net/rickandmorty/images/a/a4/Original_universe.jpg" },
                { "name": "Testicle Monster Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/b/b7/Screen_Shot_2014-04-16_at_11.03.29.png" },
                { "name": "Cromulon Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/e/ed/Cromulon_Dimension.png" },
                { "name": "Dimension C-500A", "url": "https://static.wikia.nocookie.net/rickandmorty/images/2/20/C500A_copy.jpg" },
                { "name": "Dimension K-83", "url": "https://static.wikia.nocookie.net/rickandmorty/images/6/6b/Pubescent_Rick.png" },
                { "name": "Dimension J19ζ7", "url": "https://www.korosenai.es/wp-content/uploads/2018/07/rick-tolai.jpg.webp" },
                { "name": "Eric Stoltz Mask Dimension", "url": "https://pyxis.nymag.com/v1/imgs/944/538/85db72a5b0b407da762fd88ccbe97dac83-22-rick-and-morty.rhorizontal.w700.jpg" },
                { "name": "Evil Rick's Target Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/2/23/S1e10_unknown_universe.png" },
                { "name": "Giant Telepathic Spiders Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/e/e5/Giant_Court.png" },
                { "name": "Unknown dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/2/2d/Season6-cronenberg-dimension.png" },
                { "name": "Dimension K-22", "url": "https://static.wikia.nocookie.net/rickandmorty/images/f/fb/Parmesan_dimension_better_quality.png" },
                { "name": "Dimension D-99", "url": "https://static.wikia.nocookie.net/rickandmorty/images/f/fd/Dimension_C-4499.png" },
                { "name": "Dimension D716", "url": "https://i.redd.it/5nli504qzgq91.png" },
                { "name": "Dimension D716-B", "url": "https://i0.wp.com/www.thewrap.com/wp-content/uploads/2017/08/rick-and-morty.png?resize=1024%2C578&ssl=1" },
                { "name": "Dimension D716-C", "url": "https://static.wikia.nocookie.net/rickandmorty/images/7/77/S4e4_2019-12-10-14h42m25s871.png" },
                { "name": "Dimension J-22", "url": "https://static.wikia.nocookie.net/rickandmorty/images/9/91/Screen_Shot_2017-09-12_at_1.31.30_PM.png" },
                { "name": "Dimension C-35", "url": "https://static.wikia.nocookie.net/rickandmorty/images/0/00/S1e1_dimension_35C.png" },
                { "name": "Pizza Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/1/12/Pizza_Dimension.png" },
                { "name": "Phone Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/e/e7/2_-_One_large_sofa_chair_with_extra_chair_please.png" },
                { "name": "Chair Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/c/cd/Furniture.png" },
                { "name": "Fascist Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/6/62/Rick_and_Morty_Issue_29_Dimension.png" },
                { "name": "Fascist Shrimp Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/2/2d/FourFascistDimensions.png" },
                { "name": "Fascist Teddy Bear Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/e/eb/S4e1_teddy_bear_rick.png" },
                { "name": "Wasp Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/f/f1/S4e1_2019-11-13-12h56m54s682.png" },
                { "name": "Tusk Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/5/5a/S4e3_2019-11-28-13h16m58s807.png" },
                { "name": "Magic Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/f/f6/Hoovy-World-Village.png" },
                { "name": "Merged Dimension", "url": "https://static.wikia.nocookie.net/rickandmorty/images/3/32/A346FA1A-2CA1-42DA-B806-C1D3D33AEB3B.png" },
                { "name": "", "url": "https://static.wikia.nocookie.net/rickandmorty/images/e/e3/No_Image.png" }
            ],
            modalImageUrl: '' // URL de la imagen del modal

        }
    },
    created() {
        //Funciones que se ejecutan al inicio
        this.traerData(urlApi);

        let favoritesLocationsLocal = JSON.parse(localStorage.getItem("favoritesLocations"));

        if (favoritesLocationsLocal) {
            this.favoritesLocations = favoritesLocationsLocal
        }

        
    },
    methods: {
        async traerData(urlApi) {
            try {
                const response = await fetch(urlApi);
                const data = await response.json();

                this.countTotal = data.info.count;
                this.pages = data.info.pages;

                // Obtener todas las ubicaciones
                let fetchPromisesLocations = [];
                for (let i = 1; i <= this.pages; i++) {
                    fetchPromisesLocations.push(fetch(urlApi + "?page=" + i).then(response => response.json()));
                }
                let allLocations = (await Promise.all(fetchPromisesLocations)).flatMap(data => data.results);
                this.locations = allLocations;
                this.locationsBackup = allLocations;

                // Obtener todos los tipos únicos
                let fetchPromisesTypes = [];
                for (let i = 1; i <= this.pages; i++) {
                    fetchPromisesTypes.push(fetch(urlApi + "?page=" + i).then(response => response.json()));
                }
                let allTypes = (await Promise.all(fetchPromisesTypes)).flatMap(data => data.results.map(location => location.type));
                this.types = [...new Set(allTypes)];

                // Obtener todas las dimensiones únicas
                let fetchPromisesDimensions = [];
                for (let i = 1; i <= this.pages; i++) {
                    fetchPromisesDimensions.push(fetch(urlApi + "?page=" + i).then(response => response.json()));
                }
                let allDimensions = (await Promise.all(fetchPromisesDimensions)).flatMap(data => data.results.map(location => location.dimension));
                this.dimensions = [...new Set(allDimensions)];

                console.log(this.dimensions);



            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        async loadResidents(residentsUrls) {
            this.residents = []; // Limpiar datos anteriores
            try {
                let fetchPromises = residentsUrls.map(url => fetch(url).then(response => response.json()));
                this.residents = await Promise.all(fetchPromises);
            } catch (error) {
                console.error('Error loading residents:', error);
            }
        },

        addFavorite(location) {
            if (!this.favoritesLocations.includes(location)) {
                this.favoritesLocations.push(location);
                localStorage.setItem("favoritesLocations", JSON.stringify(this.favoritesLocations));
            }
        },

        removeFavorite(location) {
            this.favoritesLocations = this.favoritesLocations.filter(fav => fav !== location);

            localStorage.setItem("favoritesLocations", JSON.stringify(this.favoritesLocations));
        },

        openLocationModal(location) {
            this.selectedLocation = location;  // Establece la ubicación seleccionada
            this.showLocationModal = true;     // Muestra el modal
            this.modalImageUrl = this.getImageUrl(location.dimension); // Establece la URL de la imagen del modal


            // Cargar los datos de los residentes para la ubicación seleccionada
            this.loadResidents(location.residents);
        },

        closeModal() {
            this.showLocationModal = false;  // Oculta el modal
            this.selectedLocation = null;    // Limpia la ubicación seleccionada
            this.residents = [];             // Limpia los datos de residentes
        },

        getImageUrl(dimensionName) {
            const image = this.locationsImages.find(img => img.name === dimensionName);
            return image ? image.url : 'https://static.wikia.nocookie.net/rickandmorty/images/e/e3/No_Image.png';
        },
    }
    ,
    computed: {
        //Eventos escuchadores
        superFiltro() {
            //Filtrar por tipo o nombre
            let text = this.locationsBackup.filter(location =>
                location.name.toLowerCase().includes(this.filterText.toLowerCase())
                ||
                location.type.toLowerCase().includes(this.filterText.toLowerCase())
            );

            if (this.filterDimension.length == 0) {
                this.locations = text;
            } else {
                this.locations = text.filter(location => this.filterDimension.includes(location.dimension));
            }
        },
        modalBackgroundUrl() {
            return this.selectedLocation ? this.getImageUrl(this.selectedLocation.dimension) : '';
          }
    }
}).mount("#app");

//mostrar locationsImages
console.log(app.locationsImages);
