from abc import ABC, abstractmethod
from typing import List
from Iterator import IIterator

class IAgregado(ABC):

    @abstractmethod
    def crearIterador(self, elementos:List[object]) -> IIterator:
        pass

