import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }

  // Unidad de medida

  unidadmedidas(payload: any = null) {
    return this.http.post(`${environment.url}/catalogos/unidad_medidas`,payload);
  }

  nuevoUnidadMedida(payload: any) {
    return this.http.post(`${environment.url}/catalogos/new/unidad_medida`,payload);
  }

  actualizarUnidadMedida(payload: any, id: any) {
    return this.http.put(`${environment.url}/catalogos/update/unidad_medida/${id}`,payload);
  }

  eliminarUnidadMedida(id: any) {
    return this.http.delete(`${environment.url}/catalogos/delete/unidad_medida/${id}`);
  }
  // Proveedor

  proveedors(payload: any = null) {
    return this.http.post(`${environment.url}/catalogos/proveedors`,payload);
  }

  nuevoProveedor(payload: any) {
    return this.http.post(`${environment.url}/catalogos/new/proveedor`,payload);
  }

  actualizarProveedor(payload: any, id: any) {
    return this.http.put(`${environment.url}/catalogos/update/proveedor/${id}`,payload);
  }

  eliminarProveedor(id: any) {
    return this.http.delete(`${environment.url}/catalogos/delete/proveedor/${id}`);
  }

  // Categoria producto
  catproductos(payload: any = null) {
    return this.http.post(`${environment.url}/catalogos/cat_productos`,payload);
  }

  nuevoCatProducto(payload: any) {
    return this.http.post(`${environment.url}/catalogos/new/cat_producto`,payload);
  }

  actualizarCatProducto(payload: any, id: any){
    return this.http.put(`${environment.url}/catalogos/update/cat_producto/${id}`,payload);
  }

  eliminarCatProducto(id: any) {
    return this.http.delete(`${environment.url}/catalogos/delete/cat_producto/${id}`);
  }

  // Producto
   productos(payload: any = null) {
    return this.http.post(`${environment.url}/catalogos/productos`,payload);
  }

  nuevoProducto(payload: any) {
    return this.http.post(`${environment.url}/catalogos/new/producto`,payload);
  }

  actualizarProducto(payload: any, id: any) {
    return this.http.put(`${environment.url}/catalogos/update/producto/${id}`,payload);
  }

  eliminarProducto(id: any) {
    return this.http.delete(`${environment.url}/catalogos/delete/producto/${id}`);
  }

  // Clientes

  clientes(payload: any = null) {
    return this.http.post(`${environment.url}/cliente/clientes`,payload);
  }

  nuevoCliente(payload: any) {
    return this.http.post(`${environment.url}/cliente/new/cliente`,payload);
  }

  actualizarCliente(payload: any, id: any) {
    return this.http.put(`${environment.url}/cliente/update/cliente/${id}`,payload);
  }

  eliminarCliente(id: any) {
    return this.http.delete(`${environment.url}/cliente/delete/cliente/${id}`);
  }


  // Pedidos

  pedidos(payload: any = null) {
    return this.http.post(`${environment.url}/pedido/pedidos`,payload);
  }

  nuevoPedido(payload: any) {
    return this.http.post(`${environment.url}/pedido/new/pedido`,payload);
  }

  actualizarPedido(payload: any, id: any) {
    return this.http.put(`${environment.url}/pedido/update/pedido/${id}`,payload);
  }

  eliminarPedido(id: any) {
    return this.http.delete(`${environment.url}/pedido/delete/pedido/${id}`);
  }

}
