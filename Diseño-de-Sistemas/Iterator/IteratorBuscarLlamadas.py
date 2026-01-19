from typing import List
from Modelo.Llamada import Llamada
from Iterator.IIterator import IIterator

class IteratorBuscarLlamadas(IIterator):
    
    elementoActual = None

    def __init__(self, elementos, filtros):
        self.elementos = elementos
        self.filtros = filtros


    def primero(self) -> None:
        self.elementoActual = 0

    
    def siguiente(self) -> None:
        self.elementoActual += 1

    
    def actual(self) -> 'Llamada':
        if self.cumpleFiltro(self.elementos[self.elementoActual]):
               return self.elementos[self.elementoActual]
        else:
                return None


    def haTerminado(self) -> bool:
        if self.elementoActual >= len(self.elementos):
            return True
        else:
            return False

    
    def cumpleFiltro(self, llamada: 'Llamada') -> bool:
        return llamada.tieneRespuestas and llamada.esDePeriodo(self.filtros[0], self.filtros[1])

