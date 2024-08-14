let urlCharacters = "https://rickandmortyapi.com/api/character/";
let urlLocations = "https://rickandmortyapi.com/api/location/";
let urlEpisodes = "https://rickandmortyapi.com/api/episode/";

const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            characters: [],
            topTenC: [],
            species: [],
            speciesImage: ["../assets/imagenes/Human.webp", "../assets/imagenes/Animal.webp", "../assets/imagenes/Alien.webp", "../assets/imagenes/Poopybutthole.webp", "../assets/imagenes/Humanoid.webp", "../assets/imagenes/Crononbergs.webp", "../assets/imagenes/Mythological Creature.webp", "../assets/imagenes/unknown.avif", "../assets/imagenes/Robot.webp", "../assets/imagenes/Disease.webp"],
            Humans: [],
            Aliens: [],
            Humanoids: [],
            Poopybuttholes: [],
            Robots: [],
            Cronenbergs: [],
            Diseases: [],
            UnknownsS: [],
            Mythologicals: [],
            Animals: [],
            totales: [],
            gender: [],
            male: [],
            female: [],
            genderless: [],
            UnknownsG: [],

            locations: [],
            typeLocations: [],
            topTenL: [],
            topTenLImage: ["../assets/imagenes/earth.webp", "../assets/imagenes/Citadel_reconstruction.webp", "../assets/imagenes/cable.jpg", "../assets/imagenes/C-137.webp", "../assets/imagenes/Story_train.webp", "../assets/imagenes/Snake_planet.webp", "../assets/imagenes/Anatomy_Park_7.webp", "../assets/imagenes/Nuptia4.webp", "../assets/imagenes/Planet Squanch.webp", "../assets/imagenes/narnia.webp"],
            currentResidents: [],
            currentLocationName: null,

            episodes: [],
            episodesSorted: [],
            seasons: [],
            season1: [],
            season2: [],
            season3: [],
            season4: [],
            season5: [],
            topTenE: [],
            topTenEImage: ["../assets/imagenes/epi1.webp", "../assets/imagenes/epi2.webp", "../assets/imagenes/epi3.webp", "../assets/imagenes/epi4.webp", "../assets/imagenes/epi5.webp", "../assets/imagenes/epi6.webp", "../assets/imagenes/epi7.webp", "../assets/imagenes/epi8.webp", "../assets/imagenes/epi9.webp", "../assets/imagenes/epi10.webp"],

            selectedStat: "Characters",
        }
    },
    created() {
        this.traerCharacters(urlCharacters);
        this.traerLocations(urlLocations);
        this.traerEpisodes(urlEpisodes);
    },
    methods: {
        traerCharacters(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let currentPage = 1;
                    let totalPages = data.info.pages;
                    let requests = [];
                    while (currentPage <= totalPages) {
                        let request = fetch(`${url}?page=${currentPage}`)
                            .then(response => response.json())
                            .then(data => {
                                this.characters.push(...data.results);
                            })
                            .catch(error => console.error(error));
                        currentPage++;
                        requests.push(request);
                    }
                    Promise.all(requests).then(() => {
                        this.topTenC = this.characters.sort((a, b) => b.episode.length - a.episode.length).slice(0, 10);
                        this.species = [...new Set(this.characters.map(character => character.species))];
                        this.Humans = this.characters.filter(character => character.species === "Human");
                        this.Aliens = this.characters.filter(character => character.species === "Alien");
                        this.Humanoids = this.characters.filter(character => character.species === "Humanoid");
                        this.Poopybuttholes = this.characters.filter(character => character.species === "Poopybutthole");
                        this.Robots = this.characters.filter(character => character.species === "Robot");
                        this.Cronenbergs = this.characters.filter(character => character.species === "Cronenberg");
                        this.Diseases = this.characters.filter(character => character.species === "Disease");
                        this.UnknownsS = this.characters.filter(character => character.species === "unknown");
                        this.Mythologicals = this.characters.filter(character => character.species === "Mythological Creature");
                        this.Animals = this.characters.filter(character => character.species === "Animal");
                        this.totales = [this.Humans.length, this.Animals.length, this.Aliens.length, this.Poopybuttholes.length, this.Humanoids.length, this.Cronenbergs.length, this.Mythologicals.length, this.UnknownsS.length, this.Robots.length, this.Diseases.length];
                        this.gender = [...new Set(this.characters.map(character => character.gender))];
                        this.male = this.characters.filter(character => character.gender === "Male");
                        this.female = this.characters.filter(character => character.gender === "Female");
                        this.genderless = this.characters.filter(character => character.gender === "Genderless");
                        this.UnknownsG = this.characters.filter(character => character.gender === "unknown");
                    })
                        .catch(error => console.error(error));
                })
                .catch(error => console.error(error));
        },
        traerLocations(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let currentPage = 1;
                    let totalPages = data.info.pages;
                    let requests = [];
                    while (currentPage <= totalPages) {
                        let request = fetch(`${url}?page=${currentPage}`)
                            .then(response => response.json())
                            .then(data => {
                                this.locations.push(...data.results);
                            })
                            .catch(error => console.error(error));
                        requests.push(request);
                        currentPage++;
                    }
                    Promise.all(requests).then(() => {
                        this.typeLocations = [...new Set(this.locations.map(location => location.type))];
                        this.topTenL = this.locations.sort((a, b) => b.residents.length - a.residents.length).slice(0, 10);
                        if (this.topTenL.length > 0) {
                            this.setResidents(this.topTenL[0]);
                        }
                    });
                })
                .catch(error => console.error(error));
        },
        traerEpisodes(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let currentPage = 1;
                    let totalPages = data.info.pages;
                    let requests = [];
                    while (currentPage <= totalPages) {
                        let request = fetch(`${url}?page=${currentPage}`)
                            .then(response => response.json())
                            .then(data => {
                                this.episodes.push(...data.results);
                            })
                            .catch(error => console.error(error));
                        requests.push(request);
                        currentPage++;
                    }
                    Promise.all(requests).then(() => {
                        this.seasons = this.episodes.map(episode => episode.episode.slice(0, 3));
                        this.seasons = [...new Set(this.seasons)];
                        this.season1 = this.episodes.filter(episode => episode.episode.slice(0, 3) === "S01");
                        this.season2 = this.episodes.filter(episode => episode.episode.slice(0, 3) === "S02");
                        this.season3 = this.episodes.filter(episode => episode.episode.slice(0, 3) === "S03");
                        this.season4 = this.episodes.filter(episode => episode.episode.slice(0, 3) === "S04");
                        this.season5 = this.episodes.filter(episode => episode.episode.slice(0, 3) === "S05");
                        this.topTenE = this.episodes.sort((a, b) => b.characters.length - a.characters.length).slice(0, 10);
                    });
                })
                .catch(error => console.error(error));
        },
        showStats(stat) {
            this.selectedStat = stat;
        },
        setResidents(location) {
            this.currentResidents = this.characters.filter(character => location.residents.includes(character.url));
            this.currentLocationName = location.name;
        },
        showResidents(location) {
            this.setResidents(location);
        }
    },
    computed: {
        getResidents() {
            return this.currentResidents;
        }
    }
}).mount('#app');