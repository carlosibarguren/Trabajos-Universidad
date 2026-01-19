

class Cliente():


    def __init__(self, dni, nombreCompleto, nroCelular):
        self.dni = dni
        self.nombreCompleto = nombreCompleto
        self.nroCelular = nroCelular

    def getDni(self):
        return self.dni

    def setDni(self, valor):
        self.dni = valor

    def getNombre(self):
        return self.nombreCompleto

    def setNombreCompleto(self, valor):
        self.nombreCompleto = valor

    def getNroCelular(self):
        return self.nroCelular

    def setNroCelular(self, valor):
        self.nroCelular = valor



