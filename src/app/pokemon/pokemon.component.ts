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
    //this.pokemonService.ValIngCanal()
    this.cargando=true
    //this.cargaInicial(0)
    this.ListaPokemon()
    //this.perfil.idProducto=0
  }

  async ListaPokemon() {
    this.cargando = true;
    await this.pokemonService.GetLista().toPromise()
    .then((res) => {
      this.pokemones=res //.datos
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
      this.pokemones=res //.datos
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
    this.pockemon.id = item.id
    this.pockemon.name = item.name
    this.pockemon.image = item.image
    this.pockemon.attack = item.attack
    this.pockemon.defense = item.defense
    await this.pokemonService.GetLista().toPromise()
    .then((res) => {
      this.pokemones=res //.datos
      this.pokecopia=res
      //console.log(this.pokemones)
    });
  }

  filtrar() {
    this.pokemones = this.pokecopia.filter((x:any) => x.name.includes(this.filtro) )
    //this.pokemones = this.pokecopia.filter(this.pokecopia.includes(this.filtro))
    console.log("mm",this.pokemones);
    
  }

  editar(item:any) {
    this.itemSel = item
    //this.nProySel = item.proy    
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
    /*var j = this.lEjecutivo.findIndex((x:any) => x.identAsignacion == nInd)   
    this.lEjecutivo[j].proy = this.nProySel
    this.Actualiza(nInd, this.nProySel, 0 )*/
    const modal:any = document.querySelector("#modal")
    modal.close()
  }


  

}
