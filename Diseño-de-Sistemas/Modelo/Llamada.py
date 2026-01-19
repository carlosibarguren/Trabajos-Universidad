
from typing import List
from Iterator.IAgregado import IAgregado
from Iterator.IteratorRespuestasYPreguntas import IteratorRespuestasYPreguntas
from Modelo.RespuestaDeCliente import RespuestaDeCliente

class Llamada():

    def __init__(self, cliente, descripcionOperador, detalleAccionRequerida,duracion,
                 encuestaEnviada, observacionAuditor, cambioDeEstado, respuestaDeCliente):
        self.cliente = cliente
        self.descripcionOperador = descripcionOperador
        self.detalleAccionRequerida = detalleAccionRequerida
        self.duracion = duracion
        self.encuestaEnviada = encuestaEnviada
        self.observacionAuditor = observacionAuditor
        self.cambioDeEstado = cambioDeEstado
        self.respuestaDeCliente = respuestaDeCliente

    ## Esto agregamos con el iterator
    def crearIterador(self, elementos: List[RespuestaDeCliente]) -> IteratorRespuestasYPreguntas:
        return IteratorRespuestasYPreguntas(elementos)

    def getDescripcionOperador(self):
        return self.descripcionOperador

    def setDescripcionOperador(self, valor):
        self.descripcionOperador = valor

    def getDetalleAccionRequerida(self):
        return self.detalleAccionRequerida

    def setDetalleAccionRequerida(self, valor):
        self.detalleAccionRequerida = valor

    def getDuracion(self):
        return self.duracion

    def setDuracion(self, valor):
        self.duracion = valor

    def getEncuestaEnviada(self):
        return self.encuestaEnviada

    def setEncuestaEnviada(self, valor):
        self.encuestaEnviada = valor

    def getObservacionAuditor(self):
        return self.observacionAuditor

    def setObservacionAuditor(self, valor):
        self.observacionAuditor = valor

    def getCambioDeEstado(self):
        return self.cambioDeEstado

    def setCambioDeEstado(self, valor):
        self.cambioDeEstado = valor

    def getRespuestaDeCliente(self):
        return self.respuestaDeCliente

    def setRespuestaDeCliente(self, valor):
        self.respuestaDeCliente = valor

    def esDePeriodo(self, fechaInicio, fechaFin):
        fechaLlamada = self.obtenerFechaInicio()
        return fechaInicio <= fechaLlamada <= fechaFin

    def obtenerFechaInicio(self):
        fechaInicio = None
        for cambioEstado in self.cambioDeEstado:
            fecha = cambioEstado.getFechaHoraInicio()
            if fechaInicio is None or fecha < fechaInicio:
                fechaInicio = fecha

        return fechaInicio

    def tieneRespuestas(self):
        return len(self.respuestaDeCliente) > 0

    def getNombreClienteDeLlamada(self):
        return self.cliente.getNombre()

    def obtenerEstadoActual(self):
        cambioEstadoActual = None
        ultimaFecha = None
        for cambioEstado in self.cambioDeEstado:
            fecha = cambioEstado.getFechaHoraInicio()
            if ultimaFecha is None:
                cambioEstadoActual = cambioEstado
                ultimaFecha = fecha
            else:
                if fecha > ultimaFecha:
                    cambioEstadoActual = cambioEstado
                    ultimaFecha = fecha
        return cambioEstadoActual.getNombreEstado()

    def obtenerDescripcionDeRespuestasYPreguntas(self):
        respuestas = []
        preguntas = []
        iterator = self.crearIterador(self.respuestaDeCliente)
        # Esto cambiamos con el iterator
        iterator.primero()
        while not iterator.haTerminado():
            respuestaCliente = iterator.actual()
            respuestas.append(respuestaCliente.getDescripcionRta())
            preguntas.append(respuestaCliente.getDescPreguntaAsociada())
            iterator.siguiente()

        return respuestas, preguntas




