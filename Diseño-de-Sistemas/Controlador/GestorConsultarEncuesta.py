import csv
import sys
from typing import List


from Iterator.IteratorBuscarLlamadas import IteratorBuscarLlamadas
from Iterator.IAgregado import IAgregado
from Modelo.Llamada import Llamada


class GestorConsultarEncuesta(IAgregado):

    fechaFin = None
    fechaInicio = None
    llamadaSeleccionada = None
    csvOImpresion = None
    csv = None
    nombreCliente = None
    estadoActual = None
    duracion = None
    respuestas = None
    preguntas = None
    encuesta = None
    descripcionEncuesta = None


    ## Esto lo modificamos para los iterator
    def crearIterador(self, elementos:List[Llamada]) -> IteratorBuscarLlamadas:
        periodo = [self.fechaInicio, self.fechaFin]
        iterator = IteratorBuscarLlamadas(elementos, periodo)
        return iterator

    def nuevaConsulta(self, pantalla, arrayLlamadas, arrayEncuestas, pantallaCsv):
        pantalla.pedirFechasDelPeriodoAFiltrar(self)
        llamadasFiltradas = self.buscarLlamadasDelPeriodo(arrayLlamadas)
        pantalla.mostrarLlamadasFiltradas(llamadasFiltradas, self)
        if len(llamadasFiltradas) > 0:
            pantalla.pedirSeleccionDeLlamada(llamadasFiltradas, self)
            self.buscarDatosDeLlamadaSeleccionada(self.llamadaSeleccionada, arrayEncuestas)
            pantalla.mostrarDatosDeLlamada(self.nombreCliente, self.estadoActual, self.duracion, self.respuestas, self.preguntas, self.descripcionEncuesta)
            pantalla.pedirSeleccionCsvOImpresion(self)
            if self.csvOImpresion == 1:
                archivoCsv = self.generarCSV()
                pantallaCsv.visualizarCsv(archivoCsv, self)

    def tomarFechasDelPeriodo(self, pantalla, fechaInicio, fechaFin):
        if self.validarFechas(fechaInicio, fechaFin):
            self.fechaInicio = fechaInicio
            self.fechaFin = fechaFin
        else:
            return False

    def validarFechas(self, fechaInicio, fechaFin):
        return fechaInicio <= fechaFin

    def buscarLlamadasDelPeriodo(self, llamadas):
        llamadasFiltradas = []
        iterator = self.crearIterador(llamadas)
        iterator.primero()
        ## ACA cambiamos con el iterator
        while not iterator.haTerminado():
            llamada = iterator.actual()
            if llamada != None:
                llamadasFiltradas.append(llamada)
            iterator.siguiente()



        return llamadasFiltradas

    def tomarSeleccionDeLlamada(self, llamadaSelec):
        self.llamadaSeleccionada = llamadaSelec

    def buscarDatosDeLlamadaSeleccionada(self, llamada, encuestas):
        nombreCliente = llamada.getNombreClienteDeLlamada()
        estadoActual = llamada.obtenerEstadoActual()
        duracion = llamada.getDuracion()
        respuestas, preguntas = llamada.obtenerDescripcionDeRespuestasYPreguntas()
        print("RESPUESTAS")
        print(respuestas)
        print("PREGUNTAS")
        print(preguntas)
        encuesta = self.buscarEncuestaDeLlamada(preguntas, encuestas)
        if encuesta is not None:
            descripcionEncuesta = encuesta.getDescripcionEncuesta()
            # Resto del código...
        else:
            descripcionEncuesta = None

        self.nombreCliente = nombreCliente
        self.estadoActual = estadoActual
        self.duracion = duracion
        self.respuestas = respuestas
        self.preguntas = preguntas
        self.encuesta = encuesta
        self.descripcionEncuesta = descripcionEncuesta

    def buscarEncuestaDeLlamada(self, preguntas, encuestas):
        for encuesta in encuestas:
            if encuesta.esEncuestaConPreguntas(preguntas):
                return encuesta

        return None

    def tomarSeleccionCsvOImpresion(self, codigo):
        self.csvOImpresion = codigo

    def generarCSV(self):
        archivoCsv = 'llamada.csv'

        with open(archivoCsv, 'w', newline='') as archivo:
            escritorCsv = csv.writer(archivo)

            escritorCsv.writerow(['Cliente', 'Estado de la llamada', 'Duración de la llamada'])

            escritorCsv.writerow([self.nombreCliente, self.estadoActual, self.duracion])

            escritorCsv.writerow([])

            for pregunta, respuesta in zip(self.preguntas, self.respuestas):
                escritorCsv.writerow([pregunta + ' || ', respuesta])

        return archivoCsv

    def cancelarCU(self, ventana):
        ventana.destroy()
        sys.exit()

    def finCU(self, ventana):
        ventana.destroy()
        sys.exit()



