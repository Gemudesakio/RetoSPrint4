let urlApi = "https://rickandmortyapi.com/api/character";

const { createApp } = Vue;
const appCharacter = createApp({
  data() {
    return {
      character: [],
      characterBk: [],
      info: {}, // Para manejar la información de paginación
      favoritos: [],
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
      if(!this.favoritos.includes(favorito)){
          this.favoritos.push(favorito)
          localStorage.setItem('favortios', JSON.stringify(this.favoritos))
          console.log(this.favoritos);
      }
    
      
  },
  eliminarFavorito(favorito){
    this.favoritos.splice(favorito,1)
    /* this.favoritesLocations = this.favoritesLocations.filter(fav => fav !== location); */
    localStorage.setItem('favortios', JSON.stringify(this.favoritos))

  }
  },
  
  computed: {},
}).mount("#appCharacters");
