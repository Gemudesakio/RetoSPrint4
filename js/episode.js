let urlApi = "https://rickandmortyapi.com/api/episode"

const { createApp } = Vue
const appEPisodios = createApp({
    data() {
        return {
            episodes: [],
            episodesBK: [],
            allEpisodes: [],
            selectedEpisode: null,
            characters: [],
            info: {},
            textoBuscador: "",
            temporadas: [],
            temporadaSeleccionada: "",
            favoritos:[]
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
                    this.allEpisodes = [...this.allEpisodes, ...data.results]
                    this.info = data.info
                    this.categorias()
                })
                .catch(error => console.error(error))
        },
        fetchCharacters(episode) {
            this.selectedEpisode = episode
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
        categorias() {
            let categorias = [...new Set(this.allEpisodes.map(episode => {
                let seasonNumber = episode.episode.split('E')[0].replace('S', '')
                return seasonNumber
            }))]
            this.temporadas = categorias
        },
        filterButton(season) {
            this.temporadaSeleccionada = season
            this.updateEpisodes()
        },
        resetFilter() {
            this.temporadaSeleccionada = ""
            this.updateEpisodes()
        },
        updateEpisodes() {
            let filtered = this.episodesBK
            if (this.temporadaSeleccionada) {
                filtered = filtered.filter(episodio => episodio.episode.includes(this.temporadaSeleccionada))
            }
            this.episodes = filtered
        },
        agregarFavorito(favorito){
            if(!this.favoritos.includes(favorito)){
                this.favoritos.push(favorito)
                localStorage.setItem('favortios', JSON.stringify(this.favoritos))
                console.log(this.favoritos);
            }
          
            
        },
        eliminarFavorito(favorito){
          this.favoritos.splice(favorito,1)
          localStorage.setItem('favortios', JSON.stringify(this.favoritos))

        }
    },
    computed: {
        filteredEpisodes() {
            if (this.textoBuscador.trim() === "") {
                return this.episodes
            }
            return this.episodes.filter(episode =>
                episode.name.toLowerCase().includes(this.textoBuscador.toLowerCase())
            )
        }
    },
    watch: {
        textoBuscador() {
          
        },
        temporadaSeleccionada() {
            this.updateEpisodes()
        }
    }
}).mount('#appEpisodios')
