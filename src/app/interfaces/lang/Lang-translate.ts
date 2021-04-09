export interface LangTranslate {
    'home'?: Home;
    'navbar'?: Navbar;
    languajeTranslate: string;
    languajeReqIdbMovie: string;
    
}

export interface Home {
    'btnFilmVisitado': string;
    'cartelera': string;
    'peliculas': string
}

export interface Navbar {
    'linkPeliculas': string;
    'inputBuscar': string;
    'btnBuscar': string;
}
