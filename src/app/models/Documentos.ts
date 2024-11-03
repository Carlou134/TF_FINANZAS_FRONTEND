import { Cartera } from "./Cartera"
import { Deudores } from "./Deudores"

export class Documentos {
  id: number=0
  cartera: Cartera = new Cartera()
  deudor: Deudores = new Deudores()
  tipo: string=""
  numero_documento: string=""
  valor_nominal: number = 0.0
  fecha_emision:Date=new Date(Date.now())
  fecha_vencimiento:Date=new Date(Date.now())
  moneda: string = ""
  tasa_descuento: number = 0.0
  tipo_tasa: string = ""
  dias_descuento: number = 0
  periodo_capitalizacion: string = ""
  tasa_efectiva_calculada: number = 0.0
  portes: number = 0.0
  comision_estudios: number = 0.0
  comision_desembolso: number = 0.0
  comision_cobranza: number = 0.0
  igv: number = 0.0
  valor_neto: number = 0.0
  estado: string = ""
}