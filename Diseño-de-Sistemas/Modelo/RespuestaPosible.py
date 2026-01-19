
class RespuestaPosible():

    def __init__(self, descripcion, valor):
        self.descripcion = descripcion
        self.valor = valor
        self.preguntaAsociada = None

    def getDescripcionRta(self):
        return self.descripcion

    def setDescripcionRta(self, valor):
        self.descripcion = valor

    def getValor(self):
        return self.valor

    def setValor(self, valor):
        self.valor = valor

    def setPreguntaAsociada(self, valor):
        self.preguntaAsociada = valor

    def getPreguntaAsociada(self):
        return self.preguntaAsociada

    def getDescPreguntaAsociada(self):
        print("Pregunta")
        print(self.preguntaAsociada)
        return self.preguntaAsociada.getDescripcion()
