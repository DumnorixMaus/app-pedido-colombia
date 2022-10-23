import { Component, ElementRef, Input, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from 'src/app/services/datos.service';
import { DispositivoService } from 'src/app/services/dispositivo.service';
import {
  GoogleMap,
  MapInfoWindow,
  MapGeocoder,
  MapGeocoderResponse,
} from '@angular/google-maps';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss'],
})
export class FormClienteComponent implements OnInit {
  @Input() titulo: string;
  @Input() cliente: any;

  registroForm: FormGroup;
  nuevo = true;
  idactualiza: any;

  //maps opciones

  address = '';
  latitude!: any;
  longitude!: any;
  zoom = 16;
  maxZoom = 16;
  minZoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
  };
  markers = [] as any;

  constructor(private fb: FormBuilder,
              public dats: DatosService,
              public dis: DispositivoService,
              private geoCoder: MapGeocoder) {
                this.registroForm = this.fb.group({
                  nombre: ['',[Validators.required]],
                  apellidos: ['', [Validators.required]],
                  telefono: ['', [Validators.required]],
                  correo: [''],
                  direccion: [''],
                  latitud: [''],
                  longitud: [''],
                  estatus: [true]
                });

  }

  ngOnInit() {
    if(this.cliente){
      setTimeout(() => {
        this.editarFormulario(this.cliente);
      }, 500);
    }else{
      this.position();

    }
  }


  limpiarFormulario(){
    this.nuevo = true;
    this.idactualiza = null;
    this.registroForm = this.fb.group({
      nombre: ['',[Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: [''],
      direccion: [''],
      latitud: [''],
      longitud: [''],
      estatus: [true]
    });
  }


  editarFormulario(data: any){
    this.nuevo = false;
    this.idactualiza = data.id_cliente;

    this.registroForm = this.fb.group({
      nombre: [data.nombre,[Validators.required]],
      apellidos: [data.apellidos, [Validators.required]],
      telefono: [data.telefono, [Validators.required]],
      correo: [data.correo],
      direccion: [data.direccion],
      latitud: [data.latitud],
      longitud: [data.longitud],
      estatus: [data.estatus]
    });

    this.setMarkerPosition(parseFloat(data.latitud), parseFloat(data.longitud));
    this.center = {
      lat: parseFloat(data.latitud),
      lng: parseFloat(data.longitud),
    };
  }


  itemGuardarEditar(){
    if (this.registroForm.invalid) {
      return;
    }
    console.log('registroForm', this.registroForm.value);

    if(this.nuevo){

      this.dats.nuevoCliente(this.registroForm.value).subscribe((res: any) => {
        console.log('se guardo: ',res);

        if(res.error){
          console.log('Error',res.mensaje);
          this.dis.vibrar();
          this.dis.toastMensaje(res.mensaje, 'danger');

        }else{
          console.log('Correcto',res.mensaje);
          this.dis.toastMensaje(res.mensaje);

          this.limpiarFormulario();
        }

      }, err => {
        this.dis.vibrar();
        this.dis.toastMensaje('Problemas con el servidor', 'danger');
        console.log('Error',err);

      });

    }else{

      this.dats.actualizarCliente(this.registroForm.value,this.idactualiza).subscribe((res: any) => {
        console.log('se actualizo: ',res);
        if(res.error){
          console.log('Error',res.mensaje);
          this.dis.vibrar();
          this.dis.toastMensaje(res.mensaje, 'danger');

        }else{
          console.log('Correcto',res.mensaje);
          this.dis.toastMensaje(res.mensaje);


        }
      }, err => {
        this.dis.vibrar();
        this.dis.toastMensaje('Problemas con el servidor', 'danger');
        console.log('Error',err);

      });

    }

  }


  position() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      // Set marker position
      this.setMarkerPosition(this.latitude, this.longitude);
    });
  }

  setMarkerPosition(latitude: any, longitude: any) {
    console.log('latitude', latitude);
console.log('longitude', longitude);
    // Set marker position
    this.markers = [
      {
        position: {
          lat: latitude,
          lng: longitude,
        },
        options: {
          animation: google.maps.Animation.DROP,
          draggable: true,
        },
      },
    ];
  }

  eventHandler(event: any, name: string) {
    switch (name) {
      case 'mapDragend':
        this.getAddress(event.latLng.lat(), event.latLng.lng());
      break;

      default:
      break;
    }
  }

  getAddress(latitude: any, longitude: any) {


    this.geoCoder
      .geocode({ location: { lat: latitude, lng: longitude } })
      .subscribe((addr: MapGeocoderResponse) => {
        if (addr.status === 'OK') {
          if (addr.results[0]) {
            this.zoom = 16;
            this.address = addr.results[0].formatted_address;
            this.registroForm.get('direccion')?.setValue(this.address);
            this.registroForm.get('latitud')?.setValue(latitude);
            this.registroForm.get('longitud')?.setValue(longitude);

          } else {
            this.address = null;
            this.dis.toastMensaje('No results found', 'info');

          }

        } else {
          this.address = null;
          this.dis.toastMensaje('Geocoder failed due to: ' + addr.status, 'danger');

        }
      });
  }

}
