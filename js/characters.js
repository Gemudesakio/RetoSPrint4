let urlApi = "https://rickandmortyapi.com/api/character";

const { createApp } = Vue;
const appCharacter = createApp({
  data() {
    return {
      character: [],
      characterBk: [],
      info: {}, // Para manejar la información de paginación
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
  },
  
  computed: {},
}).mount("#appCharacters");
