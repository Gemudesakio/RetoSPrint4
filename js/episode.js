let urlApi = "https://rickandmortyapi.com/api/episode"

const { createApp } = Vue
const appEPisodios = createApp({
    data() {
        //toda la data que se va a manejar en la app
        return {
            episodes: [],
            selectedEpisode: null,
            characters: [],
        }
    },
    created() {
        //todas las funciones que se deben ejecutar al iniciar la app
        this.traerData(urlApi)
    },
    methods: {
        // funciones y procedimientos de toda la app
        traerData(url) {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.episodes = data.results
                })
                .catch(error => console.error(error))
        },

        //funcion para acceder a cada episodio
        fetchCharacters(episode) {
            this.selectedEpisode = episode;  
            this.characters = [];  // Limpiar la lista antes de llenarla
            const characterPromises = episode.characters.map(url =>
                fetch(url).then(res => res.json())
            );
        
            Promise.all(characterPromises)
                .then(data => {
                    this.characters = data;  // Solo se asigna cuando todas las peticiones han terminado
                })
                .catch(error => console.error(error))
        }
        
        
    },
    computed: {
        // funciones y procedimientos que atienden eventos
    }
}).mount('#appEpisodios')
