fetch('https://rickandmortyapi.com/api/episode').then(res => res.json()).then(data =>{
    const episodios = data.results
    console.log(episodios);
    
})