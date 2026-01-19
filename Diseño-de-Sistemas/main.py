from Controlador.GestorConsultarEncuesta import GestorConsultarEncuesta
from Interfaz.PantallaConsultarEncuesta import PantallaConsultarEncuesta
from Interfaz.PantallaCsv import PantallaCsv
from datos import *

gestor = GestorConsultarEncuesta()
pantalla = PantallaConsultarEncuesta()
pantallaCsv = PantallaCsv()


pantalla.opcionConsultarEncuesta(gestor, llamadas, encuestas, pantallaCsv)

