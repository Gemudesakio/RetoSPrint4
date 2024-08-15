let urlApi = "https://rickandmortyapi.com/api/character"

const { createApp } = Vue
const appCharacter = createApp({
  data() {
    return {
      character: [],
      characterBk: [],
      info: {},
      favoritosCharacters: [],
      textoBuscador: "",
      estadoSeleccionado: ""
    }
  },
  created() {
    this.traerData(urlApi)
    let dataLocal = JSON.parse(localStorage.getItem('favoritosCharacters'))
    if (dataLocal) {
      this.favoritosCharacters = dataLocal
    }
  },
  methods: {
    traerData(url) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.character = data.results
          this.characterBk = data.results
          this.info = data.info
        })
        .catch((error) => console.error(error))
    },
    prevPage() {
      if (this.info.prev) {
        this.traerData(this.info.prev)
      }
    },
    nextPage() {
      if (this.info.next) {
        this.traerData(this.info.next)
      }
    },
    filterButton(estado) {
      this.estadoSeleccionado = estado
    },
    resetFilter() {
      this.estadoSeleccionado = ""
    },
    agregarFavorito(favorito) {
      if (!this.favoritosCharacters.includes(favorito)) {
        this.favoritosCharacters.push(favorito)
        localStorage.setItem(
          "favoritosCharacters",
          JSON.stringify(this.favoritosCharacters)
        )
        console.log(this.favoritosCharacters)
      }
    },
    eliminarFavorito(favorito) {
      this.favoritosCharacters = this.favoritosCharacters.filter(
        (char) => char.id !== favorito.id
      )
      localStorage.setItem(
        "favoritosCharacters",
        JSON.stringify(this.favoritosCharacters)
      )
    },
    getStatusClass(status) {
      switch (status.toLowerCase()) {
        case 'alive':
          return 'status-alive';
        case 'dead':
          return 'status-dead';
        default:
          return 'status-unknown';
      }
    },
    getGenderClass(gender) {
      switch (gender.toLowerCase()) {
          case 'male':
              return 'gender-male';
          case 'female':
              return 'gender-female';
          case 'unknown':
              return 'gender-unknown';
          default:
              return 'gender-unknown';
      }
  }
  },
  computed: {
    filteredCharacters() {
      let filtered = this.characterBk

      if (this.estadoSeleccionado) {
        filtered = filtered.filter(char =>
          char.status.includes(this.estadoSeleccionado)
        )
      }

      if (this.textoBuscador.trim() !== "") {
        filtered = filtered.filter(char =>
          char.name.toLowerCase().includes(this.textoBuscador.toLowerCase())
        )
      }

      return filtered
    }
  }
}).mount("#appCharacters")
