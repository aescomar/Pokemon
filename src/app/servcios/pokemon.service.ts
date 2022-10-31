import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  readonly pokemonUrl = environment.pokemonUrl;
  private token = "";
  private httpOptions = {
    headers: new HttpHeaders({ Authorization: this.token }),
  };

  constructor( private http: HttpClient){};

  public GetLista(): Observable<any> {
    return this.http.get<any>(this.pokemonUrl + "?idAuthor=1" );
  }

  public Agregar(body:any): Observable<any> {
    return this.http.post<any>(this.pokemonUrl, body, this.httpOptions );
  }

  public Borrar(id:any): Observable<any> {
    return this.http.delete<any>(this.pokemonUrl + id );
  }

  public Editar(body:any): Observable<any> {
    console.log('jjj',body)
    return this.http.put<any>(this.pokemonUrl + body.id, body );
  }
}

