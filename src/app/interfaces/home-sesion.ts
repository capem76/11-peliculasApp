import { Movie } from "./cartelera-response";

export interface HomeSession {
    movies?: Movie[];
    positionScroll?: number;    
    ultimaPagina?: number;
    movieIndexClick?: number;
}