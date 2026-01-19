

class Encuesta():
    def __init__(self, descripcion, fechaFinVigencia, preguntas):
        self.descripcion = descripcion
        self.fechaFinVigencia = fechaFinVigencia
        self.preguntas = preguntas

    def getDescripcionEncuesta(self):
        return self.descripcion

    def setDescripcion(self, valor):
        self.descripcion = valor

    def getFechaFinVigencia(self):
        return self.fechaFinVigencia

    def setFechaFinVigencia(self, valor):
        self.fechaFinVigencia = valor

    def getPregunta(self):
        return self.preguntas

    def setPregunta(self, valor):
        self.preguntas = valor

    def esEncuestaConPreguntas(self, preguntas):

        for preg in self.preguntas:
            descripcion = preg.getDescripcion()

            if descripcion not in preguntas:
                return False

        return True

