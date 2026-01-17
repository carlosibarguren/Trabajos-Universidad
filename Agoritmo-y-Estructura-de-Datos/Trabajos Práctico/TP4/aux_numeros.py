import pickle
import os


def comprobar_entre(min, max, mensaje):
    opcion = int(input(mensaje))
    while opcion < min or opcion > max:
        print('- ' * 60)
        print('* ' * 15 + ' ERROR: Debe estar entre ' + str(min) + ' y ' + str(max) + ' ' + '* ' * 15)
        print('- ' * 60)
        opcion = int(input(mensaje))

    return opcion


def ordenar_porCosa(v):
    n = len(v)
    for i in range(n):
        for j in range(n - 1):
            if v[i].cosa < v[j].cosa:
                v[i], v[j] = v[j], v[i]


def comprobar_mayor(min, mensaje):
    opcion = int(input(mensaje))
    while opcion <= min:
        print('- ' * 60)
        print('* ' * 15 + ' ERROR: Debe ser mayor a ' + str(min) + '* ' * 15)
        print('- ' * 60)
        opcion = int(input(mensaje))

    return opcion


# funciones para mostrar matrices por consola
def encabezado():
    mensaje = '{:<70}\n' \
              '|{:<20}||{:<20}||{:<20}|\n' \
              '{:<80}'
    mensaje = mensaje.format('=' * 70, 'Cosa 1', 'Cosa 2', 'Cosa 3', '=' * 70)
    print(mensaje)


def mostrar_matriz(matriz):
    encabezado()
    for fila in range(len(matriz)):
        linea = '  '
        for columna in range(len(matriz[fila])):
            linea += '{:<22}'.format(matriz[fila][columna])
        print(linea)


# para generar matrices
def generar_matriz(fila, columna):
    matriz = [[0] * columna for i in range(fila)]
    return matriz


# para crear un archivo a partir de un arreglo
def crear_archivo(vector, nombre):
    m = open(nombre, 'wb')
    for e in vector:
        pickle.dump(e, m)
    m.close()


# para obtener un arreglo a partir de un archivo
def obtener_vector(archivo):
    if not os.path.exists(archivo):
        return -1
    else:
        m = open("libros.csv", mode="rt", encoding="utf8")
        size = os.path.getsize(archivo)
        vector = []
        texto = len(m.read())

        m.close()
        return vector


def shell_sort(v):
    n = len(v)
    h = 1
    while h <= n // 9:
        h = 3*h + 1

    while h > 0:
        for j in range(h, n):
            z = v[j]
            y = v[j].isbn
            k = j - h
            while k >= 0 and y < v[k].isbn:
                v[k+h] = v[k]
                k -= h
            v[k+h] = z
        h //= 3

