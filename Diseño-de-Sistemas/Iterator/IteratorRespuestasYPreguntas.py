from typing import List
from Modelo.RespuestaDeCliente import RespuestaDeCliente
from Iterator.IIterator import IIterator

class IteratorRespuestasYPreguntas(IIterator):
    
    elementoActual: int

    def __init__(self, elementos: List[RespuestaDeCliente]):
        self.elementos = elementos
    
    def primero(self) -> None:
        self.elementoActual = 0

    
    def siguiente(self) -> None:
        self.elementoActual += 1

    
    def actual(self) -> 'RespuestaDeCliente':
        return self.elementos[self.elementoActual]


    
    def haTerminado(self) -> bool:
        if self.elementoActual >= len(self.elementos):
            return True
        else:
            return False

    
    
    def cumpleFiltro(self, elemento: 'RespuestaDeCliente') -> bool:
        pass
