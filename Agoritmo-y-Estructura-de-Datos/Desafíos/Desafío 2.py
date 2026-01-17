def calculo(a):
    n = [a]
    b = a
    while b != 1:
        if b % 2 == 0:
            b //= 2
            n.append(b)
        else:
            b = b * 3 + 1
            n.append(b)
    return n


def analisis(a):
    primero = True
    mayor = acu = 0
    n = len(a)
    for i in range(n):
        if primero:
            mayor = a[i]
            primero = False
        elif a[i] > mayor:
            mayor = a[i]
        acu += a[i]
    pro = round((acu / n), 1)
    return mayor, pro


def codigo():
    n = int(input('Ingrese un numero (mayor a 1):'))
    while n <= 1:
        print('\n-ERROR: El número debe ser mayor a 1-')
        n = int(input('\nIngrese nuevamente un numero (mayor a 1):'))
    a = calculo(n)
    print('<< Orbita del ' + str(n) + ' (incluyendo al ' + str(n) + ' y al 1):', a, '>>')
    lon = len(a)
    print('<< La longitud de la orbita es:', lon, '>>')
    b, c = analisis(a)
    print('<< El promedio de todos los valores es:', c, '>>')
    print('<< El mayor número de la orbita es:', b, '>>')


if __name__ == '__main__':
    codigo()
