import random


def tirada():
    dado1 = random.randint(1, 6)

    dado2 = random.randint(1, 6)

    dado3 = random.randint(1, 6)

    return dado1, dado2, dado3


def calculo_parcial(dado1, dado2, dado3, apuesta):
    suma = dado1 + dado2 + dado3
    puntaje_jugador = 0

    if suma % 2 == 0 and apuesta == 1:
        puntaje_jugador += max(dado1, dado2, dado3)

        if dado1 % 2 == 0 and dado2 % 2 == 0 and dado3 % 2 == 0:
            puntaje_jugador *= 2

    if suma % 2 != 0 and apuesta == 2:
        puntaje_jugador += max(dado1, dado2, dado3)

        if dado1 % 2 != 0 and dado2 % 2 != 0 and dado3 % 2 != 0:
            puntaje_jugador *= 2

    if suma % 2 == 0 and apuesta == 2:
        puntaje_jugador -= min(dado1, dado2, dado3)

    if suma % 2 != 0 and apuesta == 1:
        puntaje_jugador -= min(dado1, dado2, dado3)

    return puntaje_jugador


def ronda2(apuesta_j1):
    # Turno J1

    d1, d2, d3 = tirada()

    puntaje_ronda = calculo_parcial(d1, d2, d3, apuesta_j1)

    return puntaje_ronda, d1, d2, d3


def prueba():
    print(tirada())
    print(calculo_parcial(2, 6, 3, 1))
    print(ronda2(2))


if __name__ == '__main__':
    prueba()
