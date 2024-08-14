let urlApi = "https://rickandmortyapi.com/api/character";

const { createApp } = Vue;
const appCharacter = createApp({
  data() {
    return {
      character: [],
      characterBk: [],
      info: {}, // Para manejar la información de paginación
      favoritosCharacters: [],
    };
  },
  created() {
    this.traerData(urlApi);
  },
  methods: {
    traerData(url) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.character = data.results;
          this.characterBk = data.results;
          this.info = data.info; // Guardamos la información de paginación
          console.log(this.characterBk);
        })
        .catch((error) => console.error(error));
    },
    prevPage() {
      if (this.info.prev) {
        this.traerData(this.info.prev);
      }
    },
    nextPage() {
      if (this.info.next) {
        this.traerData(this.info.next);
      }
    },
    agregarFavorito(favorito){
      if(!this.favoritosCharacters.includes(favorito)){
          this.favoritosCharacters.push(favorito)
          localStorage.setItem('favoritosCharacters', JSON.stringify(this.favoritosCharacters))
          console.log(this.favoritosCharacters);
      }
    
      
  },
  eliminarFavorito(favorito){
    this.favoritosCharacters.splice(favorito,1)
    /* this.favoritesLocations = this.favoritesLocations.filter(fav => fav !== location); */
    localStorage.setItem('favoritosCharacters', JSON.stringify(this.favoritosCharacters))

  }
  },
  
  computed: {},
}).mount("#appCharacters");
