from Modelo.CambioDeEstado import CambioDeEstado
from Modelo.Cliente import Cliente
from Modelo.Encuesta import Encuesta
from Modelo.Estado import Estado
from Modelo.Llamada import Llamada
from Modelo.Pregunta import Pregunta
from Modelo.RespuestaDeCliente import RespuestaDeCliente
from Modelo.RespuestaPosible import RespuestaPosible
from datetime import date



##Este archivo fue creado para contener todos los datos necesarios y que el gestor pueda acceder a ellos
estadoIniciado = Estado("Iniciada")
estadoFinalizado = Estado("Finalizada")

cambiosEstados1 = CambioDeEstado(date(2023, 12, 31), estadoIniciado)
cambiosEstados2 = CambioDeEstado(date(2023, 12, 31), estadoFinalizado)

cliente1 = Cliente("Carlos Ibarguren", 44482349, 3512395504)
cliente2 = Cliente("Bautista Mandrilli", 44193438, 3513063982)
cliente3 = Cliente("Valentina Sanchez", 44274625, 3516633663)



    # Crear instancias de la clase RespuestaDeCliente
respuesta1 = RespuestaPosible("Muy Insatisfactorio", 1)
respuesta2 = RespuestaPosible("Insatisfactorio", 2)
respuesta3 = RespuestaPosible("Masculino", 1)
respuesta4 = RespuestaPosible("Femenino", 2)
respuesta5 = RespuestaPosible("Prefiero no decirlo", 3)
respuesta6 = RespuestaPosible("Si", 1)
respuesta7 = RespuestaPosible("No", 2)
respuesta8 = RespuestaPosible("Satisfactorio", 3)
respuesta9 = RespuestaPosible("Muy bueno", 4)
respuesta10 = RespuestaPosible("Excelente", 5)

    # Crear una instancia de la clase Pregunta
pregunta1 = Pregunta("¿Que te parecio el servicio?", [respuesta1, respuesta2, respuesta8, respuesta9, respuesta10])
pregunta2 = Pregunta("¿Cuál es tu género?", [respuesta3, respuesta4, respuesta5])
pregunta3 = Pregunta("¿Te pudimos ayudar en lo que necesitabas?", [respuesta6, respuesta7])


    # Asignar pregunta a respuesta
respuesta1.setPreguntaAsociada(pregunta1)
respuesta2.setPreguntaAsociada(pregunta1)
respuesta8.setPreguntaAsociada(pregunta1)
respuesta9.setPreguntaAsociada(pregunta1)
respuesta10.setPreguntaAsociada(pregunta1)
respuesta3.setPreguntaAsociada(pregunta2)
respuesta4.setPreguntaAsociada(pregunta2)
respuesta5.setPreguntaAsociada(pregunta2)
respuesta6.setPreguntaAsociada(pregunta3)
respuesta7.setPreguntaAsociada(pregunta3)

    # Crear una instancia de la clase Encuesta
encuesta1 = Encuesta("Encuesta Sobre el Servicio 1", date(2023, 12, 31), [pregunta1, pregunta2])
encuesta2 = Encuesta("Encuesta Sobre el Servicio 2", date(2023, 12, 31), [pregunta2, pregunta3])


respuestaCliente1 = RespuestaDeCliente(respuesta9, date(2023, 12, 31))
respuestaCliente11 = RespuestaDeCliente(respuesta3, date(2023, 12, 31))
respuestaCliente2 = RespuestaDeCliente(respuesta4, date(2023, 12, 31))
respuestaCliente21 = RespuestaDeCliente(respuesta6, date(2023, 12, 31))
respuestaCliente3 = RespuestaDeCliente(respuesta8, date(2023, 12, 31))
respuestaCliente31 = RespuestaDeCliente(respuesta3, date(2023, 12, 31))

llamada1 = Llamada(cambiosEstados1, None, None, 100, True, None, cliente1, respuestaCliente31)
llamada2 = Llamada(cambiosEstados2, None, None, 100, True, None, cliente2, respuestaCliente21)
llamada3 = Llamada(cambiosEstados1, None, None, 100, True, None, cliente3, respuestaCliente1)

llamada1.setRespuestaDeCliente(respuestaCliente1)
llamada1.setRespuestaDeCliente(respuestaCliente11)
llamada2.setRespuestaDeCliente(respuestaCliente2)
llamada2.setRespuestaDeCliente(respuestaCliente21)
llamada3.setRespuestaDeCliente(respuestaCliente3)
llamada3.setRespuestaDeCliente(respuestaCliente31)

llamadas = [llamada1, llamada2, llamada3]

encuestas = [encuesta1, encuesta2]

