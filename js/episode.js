let urlApi = "https://rickandmortyapi.com/api/episode"

const { createApp } = Vue
const appEPisodios = createApp({
    data() {
        return {
            episodes: [],
            episodesBK: [],
            selectedEpisode: null,
            characters: [],
            info: {},
            textoBuscador: "",
            temporadas: [],
            temporadaSeleccionada: "",
            favoritos: []
        }
    },
    created() {
        this.traerData(urlApi)
        let dataLocal = JSON.parse(localStorage.getItem('favortios')) 
        if(dataLocal){
            this.favoritos = dataLocal
        }
    },
    methods: {
        traerData(url) {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.episodes = data.results
                    this.episodesBK = data.results
                    this.info = data.info
                    this.categorias

                    


                })
                .catch(error => console.error(error))
        },
        fetchCharacters(episode) {
            this.selectedEpisode = episode

           

            console.log(episode)
            this.characters = []
            const characterPromises = episode.characters.map(url =>
                fetch(url).then(res => res.json())
            )
            Promise.all(characterPromises)
                .then(data => {
                    this.characters = data
                })
                .catch(error => console.error(error))
        },
        nextPage() {
            if (this.info.next) {
                this.traerData(this.info.next)
            }
        },
        prevPage() {
            if (this.info.prev) {
                this.traerData(this.info.prev)
            }
        },
        filterButton(season) {
            this.temporadaSeleccionada = season
        },
        resetFilter() {
            this.temporadaSeleccionada = ""
        },
        agregarFavorito(favorito) {
            if (!this.favoritos.includes(favorito)) {
                this.favoritos.push(favorito)
                localStorage.setItem('favortios', JSON.stringify(this.favoritos))
                console.log(this.favoritos)
            }
        },
        eliminarFavorito(favorito) {
            this.favoritos.splice(favorito, 1)
            localStorage.setItem('favortios', JSON.stringify(this.favoritos))
        }
    },
    computed: {
        filteredEpisodes() {
            let filtered = this.episodesBK

            if (this.temporadaSeleccionada) {
                filtered = filtered.filter(episodio =>
                    episodio.episode.includes(this.temporadaSeleccionada)
                )
            }

            if (this.textoBuscador.trim() !== "") {
                filtered = filtered.filter(episode =>
                    episode.name.toLowerCase().includes(this.textoBuscador.toLowerCase())
                )
            }

            return filtered
        }
    }
}).mount('#appEpisodios')
