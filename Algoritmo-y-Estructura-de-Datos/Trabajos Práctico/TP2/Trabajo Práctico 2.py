from Funciones_TP2 import *

print('='*79)
print('\t'*6, 'EL JUEGO DE LOS DADOS [2.0]')
print('='*79, '\n¡Bienvenidos!')
print('Por favor, coloque la información requerida para iniciar el juego')
print('-'*79)

# Inicializa las variables para los nombres de los jugadores
jugador1 = input('Ingrese el nombre del Jugador 1: ')

jugador2 = input('Ingrese el nombre del Jugador 2: ')

# Inicializa las variables para llevar el control de los puntajes totales de los jugadores
puntaje_objetivo = int(input('\nIngrese el Puntaje Objetivo (mayor a 10): '))

puntaje_j1, puntaje_j2 = 0, 0


# Inicializa la variable para  contar la cantidad de jugadas
cantidad_jugadas = 0

# Inicializa las variables para guardar si los jugadores empataron algun turno
jugada_empatada = False

# Inicializa las variables para llevar la cuenta de la cantidad de aciertos de cada jugador
aciertos_j1, aciertos_j2 = 0, 0

# Inicializa las variables para llevar la cuenta de la cantidad de jugadas ganadas de cada jugador
jugadas_ganadas_j1, jugadas_ganadas_j2 = 0, 0

# Inicializa las variables para saber si algun jugador gano 3 jugadas seguidas
turnos_seguidosj1, turnos_seguidosj2, gano3_jugadas = 0, 0, False


# Valida que el puntaje objetivo ingresado sea mayor a 10
while puntaje_objetivo <= 10:
    print('\n"ERROR: El Puntaje Objetivo debe ser un valor mayor a 10"')
    puntaje_objetivo = int(input('\tIngrese de nuevo el Puntaje Objetivo: '))


# Este ciclo de instrucciones se va a repetir hasta que alguno de los jugadores supere a el puntaje objetivo
while puntaje_j1 < puntaje_objetivo and puntaje_j2 < puntaje_objetivo:

    # Cuenta la cantidad de jugadas realizadas
    cantidad_jugadas += 1

    # Juega el jugador 1
    print('\n', '¬'*79, '\n', sep='')
    print(jugador1, end=' ')
    apuesta_j1 = int(input('ingrese la opción que desee para apostar...\n'
                           '1 - Par \n'
                           '2 - Impar \n'
                           'Apuesta: '))

    while apuesta_j1 != 1 and apuesta_j1 != 2:
        print(' ')
        print('\t"ERROR: Ingresó una apuesta inválida"\n'
              '\tPor favor, intente nuevamente\n')
        print(jugador1, end=' ')
        apuesta_j1 = int(input('ingrese la opción que desee para apostar...\n'
                               '1 - Par \n'
                               '2 - Impar \n'
                               'Apuesta: '))

    # Guarda el puntaje obtenido por el j1 y los dados que tiro
    puntaje_ronda1, d1, d2, d3 = ronda2(apuesta_j1)

    # Suma el puntaje obtenido en la ronda del j1, a su puntaje total
    puntaje_j1 += puntaje_ronda1

    # Imprime los resultados de la ronda del jugador 1
    print('\n[Valores de los dados]'
          '\n\tDado 1 =', d1,
          '\n\tDado 2 =', d2,
          '\n\tDado 3 =', d3)

    print('\nEl puntaje obtenido en esta ronda es: ', puntaje_ronda1)

    print('\t||Su puntaje actual es: ', puntaje_j1, '||', sep='')

    # Juega el jugador 2
    print('\n', '¬'*79, '\n', sep='')
    print(jugador2, end=' ')

    apuesta_j2 = int(input('ingrese la opción que desee para apostar...\n'
                           '1 - Par \n'
                           '2 - Impar \n'
                           'Apuesta: '))

    while apuesta_j2 != 1 and apuesta_j2 != 2:
        print(' ')
        print('\t"ERROR: Ingresó una apuesta inválida"\n'
              '\tPor favor, intente nuevamente\n')
        print(jugador2, end=' ')

        apuesta_j2 = int(input('ingrese la opción que desee para apostar...\n'
                               '1 - Par \n'
                               '2 - Impar \n'
                               'Apuesta: '))

    # Guarda el puntaje obtenido por el j2 y los dados que tiro
    puntaje_ronda2, d1, d2, d3 = ronda2(apuesta_j2)

    # Suma el puntaje obtenido en la ronda del j2, a su puntaje total
    puntaje_j2 += puntaje_ronda2

    # Imprime los resultados de la ronda del jugador 2
    print('\n[Valores de los dados]'
          '\n\tDado 1 =', d1,
          '\n\tDado 2 =', d2,
          '\n\tDado 3 =', d3)

    print('\nEl puntaje obtenido en esta ronda es: ', puntaje_ronda2)

    print('\t||Su puntaje actual es: ', puntaje_j2, '||\n', sep='')
    print('*'*79, '\n')

    # Se evalua quien obtuvo mas puntaje parcial en la ronda
    if puntaje_ronda1 > puntaje_ronda2:

        print('\t'*6, '<', jugador1, ' ganó la ronda>', sep='')

        jugadas_ganadas_j1 += 1

        turnos_seguidosj1 += 1

        turnos_seguidosj2 = 0

    elif puntaje_ronda2 > puntaje_ronda1:

        print('\t'*6, '<', jugador2, ' ganó la ronda>', sep='')

        jugadas_ganadas_j2 += 1

        turnos_seguidosj1 = 0

        turnos_seguidosj2 += 1

    else:
        print('\t'*6, '<Los jugadores empataron>')

        jugada_empatada = True

    # Cuenta si los jugadores acertaron a su apuesta
    if puntaje_ronda1 > 0:

        aciertos_j1 += 1

    if puntaje_ronda2 > 0:

        aciertos_j2 += 1

    # Ver si algun jugador lleva 3 jugadas ganadas
    if turnos_seguidosj1 == 3 or turnos_seguidosj2 == 3:

        gano3_jugadas = True


# Determina el ganador del juego
ganador = 0

if puntaje_j1 > puntaje_j2:
    ganador = jugador1

elif puntaje_j2 > puntaje_j1:
    ganador = jugador2

else:
    if aciertos_j1 > aciertos_j2:
        ganador = jugador1

    elif aciertos_j2 > aciertos_j1:
        ganador = jugador2


# Imprime los resultados finales
print('\n', '='*79, sep='')
print('\t'*7, 'FIN DEL JUEGO')
print('='*79)

# Estadisticas
print('\nESTADÍSTICAS')
print('\n..Cantidad de jugadas realizadas: ', cantidad_jugadas)

# Imprime si los jugadores empataron al menos una vez
if jugada_empatada:
    print('\n..Los jugadores empataron al menos una jugada')
else:
    print('\n..Los jugadores no empataron ninguna jugada')


# Imprime el puntaje promedio de cada jugador
print('\n..El puntaje promedio obtenido por jugada de', jugador1, 'es:', round(puntaje_j1/cantidad_jugadas, 2))

print('\n..El puntaje promedio obtenido por jugada de', jugador2, 'es:', round(puntaje_j2/cantidad_jugadas, 2))

# Imprime el porcentaje de aciertos
porcentaje_aciertosj1 = aciertos_j1 * 100 / cantidad_jugadas

porcentaje_aciertosj2 = aciertos_j2 * 100 / cantidad_jugadas

print('\n..El porcentaje de aciertos de ', jugador1, ' es: ', round(porcentaje_aciertosj1, 2), '%', sep='')

print('\n..El porcentaje de aciertos de ', jugador2, ' es: ', round(porcentaje_aciertosj2, 2), '%', sep='')

# Imprime si alguienganó tres veces segudidas
if gano3_jugadas:
    print('\n..Algún jugador ganó 3 veces seguidas\n')
else:
    print('\n..Ningún jugador ganó 3 veces seguidas\n')

# Imprime si el ganador tuvo la mayor cantidad de aciertos
if (ganador == jugador1 and porcentaje_aciertosj1 > porcentaje_aciertosj2) or (
        ganador == jugador2 and porcentaje_aciertosj1 < porcentaje_aciertosj2):
    mensaje = ' obtuvo el mayor porcentaje de aciertos'
else:
    mensaje = ' no obtuvo el mayor porcentaje de aciertos'

# Imprime al ganador
print('#'*79, '\n')
if ganador == 0:
    print('\t'*6, '<<LOS JUGADORES EMPATARON>>\n')
else:
    print('\t'*6, '<<EL GANADOR ES: ', ganador, '>>\n', sep='')
    print('\t'*3, ganador, mensaje, '\n', sep='')


print('#' * 79)
print('.\n.\n¡Gracias por jugar!\nEspero que lo hayan disfrutado')
