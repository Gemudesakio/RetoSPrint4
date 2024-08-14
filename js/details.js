let urlApi = "https://rickandmortyapi.com/api/character"

const { createApp } = Vue;

const app = createApp({
    data() {
        //Declaración de variables para almacenar los datos de la API
        return {
            characterData: [],
            characters: [],
        }
    },
    created() {
        //Funciones que se ejecutan al inicio
        this.traerData(urlApi);
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
                let allCharacters = (await Promise.all(fetchPromisesLocations)).flatMap(data => data.results);
                this.characters = allCharacters;

                this.characterDetails();


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        //Función para obtener los detalles de un personaje
        characterDetails() {
            const urlParams = new URLSearchParams(window.location.search);

            console.log(urlParams);

            const id = urlParams.get('id');
            console.log(id);

            this.characterData = this.characters.find(character => character.id == id);

            console.log(this.characterData);

        }

        
    }
    ,
    computed: {
       
    }
}).mount("#app");
