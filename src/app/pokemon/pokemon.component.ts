import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
//import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PokemonService } from '../servcios/pokemon.service';
import { Observable } from 'rxjs'
//import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
//import Swal from 'sweetalert2'

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  titleHead: string = "Tipo de Perfil"
  public pockemon = {
    "id": 0,
    "name" : "angel",
    "image": "https://unite.pokemon.com/images/home/community/gengar.png",
    "attack": 20,
    "defense": 30,
    "hp": 90,
    "type":"water",
    "idAuthor": 1
  }

  perfils  : any[]=[]
  itemSel: any
  pokemones: any[]=[]
  pokecopia: any[]=[]
  cargando=false
  paginateList: any[]=[];
  currentPage = 1; 
  maxSize = 20; 
  itemsPerPage = 20;
  totalItems = 0;  
  filaIndex = 1
  filtro=''
  name = ''
  image = ''
  attack = 0
  defense = 0
  id = 0

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.ListaPokemon()
  }

  async ListaPokemon() {
    this.cargando = true;
    await this.pokemonService.GetLista().toPromise()
    .then((res) => {
      this.pokemones=res 
      this.pokecopia= this.pokemones
      this.limpiar()
    });
  }

  async borrar(id: any) {
    if(!confirm("Seguro de Borrar")) {
      return
    }
    this.cargando = true;
    await this.pokemonService.Borrar(id).toPromise()
    .then((res) => {
      this.pokemones=res 
      this.ListaPokemon()
    });
  }

  async nuevo(body: any) {
    console.log('bb',body)
    this.pockemon.name = this.name
    this.pockemon.image = this.image
    this.pockemon.attack = this.attack
    this.pockemon.defense = this.defense
    await this.pokemonService.Agregar(this.pockemon).toPromise()
    .then((res) => {
      this.ListaPokemon()
      this.cerrarModal(0)
    });
  }

  async modificar(item: any) {
    console.log('ooo',item)
    this.pockemon.id = item.id
    this.pockemon.name = this.name
    this.pockemon.image = this.image
    this.pockemon.attack = this.attack
    this.pockemon.defense = this.defense
    await this.pokemonService.Editar(this.pockemon).toPromise()
    .then((res) => {
      this.ListaPokemon()
      this.cerrarModal(0)
    });
  }

  filtrar(e: any) {
    const buscar: string = e.target.value
    this.pokemones = this.pokecopia.filter((x:any) => { return x.name.toLowerCase().includes(buscar.toLowerCase())} )
  }

  editar(item:any) {
    this.itemSel = item    
    this.id = this.itemSel.id
    this.name = this.itemSel.name
    this.image = this.itemSel.image
    this.attack = this.itemSel.attack
    this.defense = this.itemSel.defense
    const modal:any = document.querySelector("#modal")
    modal.showModal()   
  }

  limpiar() {
    this.id = 0
    this.name =""
    this.image = ""
    this.attack = 0
    this.defense = 0
  }

  cerrarModal(nInd:number) {
    const modal:any = document.querySelector("#modal")
    modal.close()
  }


  

}
