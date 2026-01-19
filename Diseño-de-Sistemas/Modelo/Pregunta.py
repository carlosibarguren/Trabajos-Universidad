
class Pregunta():

    def __init__(self, pregunta, respuesta):
        self.pregunta = pregunta,
        self.respuesta = respuesta

    def getDescripcion(self):
        return self.pregunta

    def setPregunta(self, valor):
        self.pregunta = valor

    def getRespuesta(self):
        return self.respuesta

    def setRespuesta(self, valor):
        self.respuesta = valor

