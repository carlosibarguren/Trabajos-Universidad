
class Estado():


    def __init__(self, nombre):
        self.nombre = nombre

    def getNombre(self):
        return self.nombre

    def setNombre(self, valor):
        self.nombre = valor

    def esIniciada(self):
        return self.nombre == "Iniciada"

    def esFinalizada(self):
         return self.nombre == "Finalizada"
