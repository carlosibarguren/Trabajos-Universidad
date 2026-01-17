import random

# DATOS

print('JUEGO DE DADOS')
print('=' * 60)

jugador1 = input('Nombre del jugador 1: ')

jugador2 = input('Nombre del jugador 2: ')


# RONDA 1

print('.' * 60)
print('COMIENZA LA PRIMERA RONDA')
print('.' * 60)

# jugador 1

print('Es el turno del primer jugador', jugador1)

print('ingresar listo para comenzar tu intento')

listo = input('¿Estas listo?')

dado1 = random.randint(1, 6)

dado2 = random.randint(1, 6)

dado3 = random.randint(1, 6)

print('Valores de los dados: \n'
      'dado 1 =', dado1, '\n'
      'dado 2 =', dado2, '\n'
      'dado 3 =', dado3)

puntaje_jugador1 = 0

if dado1 == dado2 and dado1 == dado3:
    puntaje_jugador1 += 6

if dado1 != dado2 and dado1 != dado3:
    puntaje_jugador1 += 0

if dado1 == dado2 and dado1 != dado3:
    dado3a = random.randint(1, 6)
    print('Vuelve a tirar dado 3')
    print('Dado 3=', dado3a)

    if dado1 == dado2 == dado3a:
        puntaje_jugador1 += 6
    else:
        puntaje_jugador1 += 3

if dado1 == dado3 and dado1 != dado2:
    dado2a = random.randint(1, 6)
    print('Vuelve a tirar dado 2')
    print('Dado 2=', dado2a)

    if dado1 == dado2a == dado3:
        puntaje_jugador1 += 6
    else:
        puntaje_jugador1 += 3

if dado2 == dado3 and dado2 != dado1:
    dado1a = random.randint(1, 6)
    print('Vuelve a tirar dado 1')
    print('Dado 1=', dado1a)

    if dado1a == dado2 == dado3:
        puntaje_jugador1 += 6
    else:
        puntaje_jugador1 += 3

print('El puntaje de', jugador1, 'en la primera ronda es:', puntaje_jugador1, '\n')

# jugador 2

print('Es el turno del segundo jugador ', jugador2)

print('ingresar listo para comenzar tu intento ')

listo = input('¿Estás listo?')

dado1 = random.randint(1, 6)

dado2 = random.randint(1, 6)

dado3 = random.randint(1, 6)

print('Valores de los dados: \n'
      'dado 1 =', dado1, '\n'
      'dado 2 =', dado2, '\n'
      'dado 3 =', dado3)

puntaje_jugador2 = 0

if dado1 == dado2 == dado3:
    puntaje_jugador2 += 6

if dado1 != dado2 and dado1 != dado3:
    puntaje_jugador2 += 0

if dado1 == dado2 and dado1 != dado3:
    dado3a = random.randint(1, 6)
    print('se vuelve a tirar el dado 3')
    print('dado 3=', dado3a)

    if dado1 == dado2 == dado3a:
        puntaje_jugador2 += 6
    else:
        puntaje_jugador2 += 3

if dado1 == dado3 and dado1 != dado2:
    dado2a = random.randint(1, 6)
    print('se vuelve a tirar el dado 2')
    print('Dado 2=', dado2a)

    if dado1 == dado2a == dado3:
        puntaje_jugador2 += 6
    else:
        puntaje_jugador2 += 3

if dado2 == dado3 and dado2 != dado1:
    dado1a = random.randint(1, 6)
    print('se vuelve a tirar el dado 1')
    print('Dado 1=', dado1a)

    if dado1a == dado2 == dado3:
        puntaje_jugador2 += 6
    else:
        puntaje_jugador2 += 3

print('el puntaje de', jugador2, 'en la primera ronda es:', puntaje_jugador2)


# SEGUNDA RONDA

print('.' * 60)
print('SEGUNDA RONDA')
print('.' * 60)

# jugador 1

print('Es el turno de', jugador1)

apuesta = int(input('ingrese la opción que desee para apostar\n '
                    '\t 1 - par\n'
                    '\t 2 - impar\n'
                    'Apuesta ='))

dado1 = random.randint(1, 6)

dado2 = random.randint(1, 6)

dado3 = random.randint(1, 6)

print('Valores de los dados: \n'
      'dado 1 =', dado1, '\n'
      'dado 2 =', dado2, '\n'
      'dado 3 =', dado3, '\n')

suma = dado1 + dado2 + dado3

dadogrande = max(dado1, dado2, dado3)

dadochiquito = min(dado1, dado2, dado3)

par = suma % 2 == 0

impar = suma % 2 != 0

if par and apuesta == 1:
    puntaje_jugador1 += dadogrande

    if dado1 % 2 == 0 and dado2 % 2 == 0 and dado3 % 2 == 0:
        puntaje_jugador1 *= 2

if impar and apuesta == 2:
    puntaje_jugador1 += dadogrande

    if dado1 % 2 != 0 and dado2 % 2 != 0 and dado3 % 2 != 0:
        puntaje_jugador1 *= 2

if par and apuesta == 2:
    puntaje_jugador1 -= dadochiquito

if impar and apuesta == 1:
    puntaje_jugador1 -= dadochiquito

if apuesta == 1:
    apuesta1 = 'par'
else:
    apuesta1 = 'impar'

print(jugador1, 'apostó por ', apuesta1, 'y la suma de los dados es ', suma, '\n')

# jugador 2

print('Es el turno de', jugador2)

apuesta = int(input('ingrese la opción que desee para apostar\n'
                    '\t 1 - par\n'
                    '\t 2 - impar\n'
                    'Apuesta ='))

dado1 = random.randint(1, 6)

dado2 = random.randint(1, 6)

dado3 = random.randint(1, 6)

print('Valores de los dados: \n'
      'dado 1 =', dado1, '\n'
      'dado 2 =', dado2, '\n'
      'dado 3 =', dado3, '\n')

suma = dado1 + dado2 + dado3

dadogrande = max(dado1, dado2, dado3)

dadochiquito = min(dado1, dado2, dado3)

par = (suma % 2) == 0

impar = (suma % 2) != 0

if par and apuesta == 1:
    puntaje_jugador2 += dadogrande

    if dado1 % 2 == 0 and dado2 % 2 == 0 and dado3 % 2 == 0:
        puntaje_jugador2 *= 2

if impar and apuesta == 2:
    puntaje_jugador2 += dadogrande

    if dado1 % 2 != 0 and dado2 % 2 != 0 and dado3 % 2 != 0:
        puntaje_jugador2 *= 2

if par and apuesta == 2:
    puntaje_jugador2 -= dadochiquito

if impar and apuesta == 1:
    puntaje_jugador2 -= dadochiquito

if apuesta == 1:
    apuesta1 = 'par'
else:
    apuesta1 = 'impar'

print(jugador2, 'apostó por ', apuesta1, 'y la suma de los dados es ', suma)

# FINAL DEL JUEGO

if puntaje_jugador1 == puntaje_jugador2:
    mensaje = jugador1 + ' y ' + jugador2 + ' empataron'

elif puntaje_jugador1 > puntaje_jugador2:
    mensaje = 'GANADOR ' + jugador1
else:
    mensaje = 'GANADOR ' + jugador2

print('.' * 60)
print('PUNTAJES FINALES: \n'
      '\t', jugador1, 'tu puntaje es: ', puntaje_jugador1, '\n'
      '\t', jugador2, 'tu puntaje es: ', puntaje_jugador2)

print('-' * 30)
print(mensaje)
print('-' * 30)
