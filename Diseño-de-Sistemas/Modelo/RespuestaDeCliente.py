from datetime import *

class RespuestaDeCliente():

    def __init__(self, respuestaSeleccionada, fechaEncuesta):
        self.respuestaSeleccionada = respuestaSeleccionada
        self.fechaEncuesta = fechaEncuesta

    def getRespuestaSeleccionada(self):
        return self.respuestaSeleccionada

    def setRespuestaSeleccionada(self, valor):
        self.respuestaSeleccionada = valor

    def getFechaDeEncuesta(self):
        return self.fechaEncuesta

    def setFechaDeEncuesta(self, valor):
        self.fechaEncuesta = valor

    def getDescripcionRta(self):
        return self.respuestaSeleccionada.getDescripcionRta()

    def getDescPreguntaAsociada(self):
        return self.respuestaSeleccionada.getDescPreguntaAsociada()
