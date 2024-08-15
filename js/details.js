let urlApi = "https://rickandmortyapi.com/api/character"

const { createApp } = Vue;

const app = createApp({
    data() {
        //Declaración de variables para almacenar los datos de la API
        return {
            characterData: [],
            characters: [],
            episodes: [],
            countTotalEpisodios: 0,
            countTotalLocaiones: 0,
            episodesCharacter: [],
            locationCharacter:"",
            locationDetails: [],
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

                let fetchPromisesLocations = [];
                for (let i = 1; i <= this.pages; i++) {
                    fetchPromisesLocations.push(fetch(urlApi + "?page=" + i).then(response => response.json()));
                }
                let allCharacters = (await Promise.all(fetchPromisesLocations)).flatMap(data => data.results);
                this.characters = allCharacters;

                this.characterDetails();

                this.episodesCharacter = this.characterData.episode;


                
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

            this.episodesCharacter = this.characterData.episode;
            this.locationCharacter = this.characterData.location.url;

            console.log(this.locationCharacter);


            this.getEpisodes(this.episodesCharacter);
            this.getLocation(this.locationCharacter);



        },
        getStatusClass(status) {
            switch (status) {
              case 'alive':
                return 'status-alive';
              case 'dead':
                return 'status-dead';
              default:
                return 'status-unknown';
            }
          },
          getGenderClass(gender) {
            switch (gender) {
              case 'male':
                return 'gender-male';
              case 'female':
                return 'gender-female';
              case 'unknown':
                return 'gender-unknown';
              default:
                return 'gender-unknown';
            }
          },

        //Función para obtener los episodios de un personaje
        async getEpisodes(episodesCharacter) {
            try {
                let fetchPromisesEpisodes = [];
                episodesCharacter.forEach(episode => {
                    fetchPromisesEpisodes.push(fetch(episode).then(response => response.json()));
                });

                this.episodes = await Promise.all(fetchPromisesEpisodes);
                this.countTotalEpisodios = this.episodes.length;

            } catch (error) {
                console.error('Error fetching data:', error);
            }

          
        },
        //Función para obtener las locaciones de un personaje
        async getLocation(locationCharacter) {
            try {
                const response = await fetch(locationCharacter);
                const data = await response.json();

                this.locationDetails = data;

            } catch (error) {
                console.error('Error fetching data:', error);
            }
           
        }


        
    }
    ,
    computed: {
       
    }
}).mount("#app");
