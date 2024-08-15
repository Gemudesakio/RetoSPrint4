let urlApi =
  "https://rickandmortyapi.com/api/character";


const { createApp } = Vue
const appCharacter = createApp({
  data() {
    return {
      character: [],
      characterBk: [],
      info: {},
      favoritosCharacters: [],
      textoBuscador: "",
      estadoSeleccionado: "",
      status: [],
      filterStatus: [],
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
          let pages = data.info.pages
          let allCharacteres = [];

          for (let i = 1; i <= pages; i++) {
            fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
              .then((res) => res.json())
              .then((data) => {
                allCharacteres = [...allCharacteres, ...data.results]
                if (i === pages) {
                  this.character = allCharacteres;
                  this.characterBk = allCharacteres;
                  this.status = [...new Set(allCharacteres.map(char => char.status))]
                }
              })
              .catch((error) => console.error(error))
          }

          this.info = data.info
        })
        .catch((error) => console.error(error))
    },

    agregarFavorito(favorito) {
      if (!this.favoritosCharacters.includes(favorito)) {
        this.favoritosCharacters.push(favorito)
        localStorage.setItem(
          "favoritosCharacters",
          JSON.stringify(this.favoritosCharacters)
        )
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
    },

  },
  computed: {
    superFiltro() {
      //Filtrar por tipo o nombre
      let text = this.characterBk.filter(char =>
        char.name.toLowerCase().includes(this.textoBuscador.toLowerCase())
      );

      if (this.filterStatus.length == 0) {
        this.character = text;
      } else {
        this.character = text.filter(char => this.filterStatus.includes(char.status));
      }
    },
  },
}).mount("#appCharacters");
