import aux_numeros as aux
import registro
import pickle
import os


def menu():
    opcion = aux.comprobar_entre(0, 7,
                                 ':::::::::::::::::::::::::::::::::::MENU DE OPCIONES:::::::::::::::::::::::::::::::::::'
                                 '\n0- Salir del programa\n'
                                 '1- Cargar vector ordenado por ISBN\n'
                                 '2- Buscar libro y sumar la revisión\n'
                                 '3- Descripción del libro con mayor revisiones\n'
                                 '4- Generar una matriz acerca del rating de unos ciertos libros\n' 
                                 '5- Numerar la cantidad de publicaciones que hay por decada\n'
                                 '6- Guardar contenido de matriz en un archivo\n'
                                 '7- Mostrar el archivo como lista\n'
                                 '------------------------'
                                 '\nElija una opcion: ')

    return opcion


def cargar_vector_libros():
    m = open('libros.csv', mode='rt', encoding='utf8')
    libros = []
    print('\t'*9, 'Cargando....')
    coso = m.readlines()
    for line in coso:
        atributo = line.split(',')
        if atributo[1] != 'Revisiones':
            isbn = atributo[5].strip()
            libro = registro.Libro(atributo[0], int(atributo[1]), int(atributo[2]), int(atributo[3]),
                                   float(atributo[4]), isbn)

            libros.append(libro)

    aux.shell_sort(libros)
    m.close()
    return libros


def buscar_mayor_revisiones(libros):
    may = 0
    pos = -1
    for i in range(len(libros)):
        if libros[i].revisiones > may:
            may = libros[i].revisiones
            pos = i
    return pos


def principal():
    opcion = -1
    libros = []
    matriz = []
    nombre_archivo = 'populares.dat'
    while opcion != 0:
        opcion = menu()
        print('='*86)

        if opcion == 1:
            libros = cargar_vector_libros()
            print('-'*86)
            print('¡Genial! Los libros se han cargado correctamente')

        elif len(libros) > 0 or opcion == 0:
            if opcion == 2:
                op_2 = aux.comprobar_entre(1, 2, '¿De que manera quiere realizar la busqueda?\n'
                                                 '1- ISBN\n'
                                                 '2- Titulos\n'
                                                 '......................\n'
                                                 'Ingrese su opcion: ')
                # Busqueda por isbn
                print('_'*86)
                if op_2 == 1:
                    isbn = input('Ingrese el ISBN a buscar: ')
                    if len(isbn) != 10:
                        print('#'*18, '- ERROR: El ISBN tiene que contener 10 digitos -', '#'*18)
                    else:
                        pos = registro.busqueda_binaria(isbn, libros)
                        print('´'*86)
                        if pos != -1:
                            libros[pos].revisiones += 1
                            registro.encabezado()
                            registro.to_string(libros[pos])
                        else:
                            print('Lo siento, no hay ninguna coincidencia con tu busqueda')

                # Busqueda por titulo
                elif op_2 == 2:
                    titulo = input('Ingrese el titulo del libro que desea buscar: ')
                    pos = registro.busqueda_secuencial(titulo, libros)
                    print('´'*86)
                    if pos != -1:
                        libros[pos].revisiones += 1
                        registro.encabezado()
                        registro.to_string(libros[pos])
                    else:
                        print('Lo siento, no hay ninguna coincidencia con tu busqueda')

            elif opcion == 3:
                pos = buscar_mayor_revisiones(libros)
                idioma = libros[pos].idioma
                acumulador = 0
                contador = 0

                for i in range(len(libros)):
                    if libros[i].idioma == idioma:
                        acumulador += libros[i].rating
                        contador += 1

                promedio_rating = round(acumulador / contador, 2)
                print('El libro con mayor revisiones es', libros[pos].titulo, 'con un total de',
                      libros[pos].revisiones, 'revisiones')
                print('.'*86)
                if libros[pos].rating > promedio_rating:
                    print('El rating del libro es mayor al promedio de los libros con el idioma',
                          registro.codigo_idioma(libros[pos].idioma))
                elif libros[pos].rating < promedio_rating:
                    print('El rating del libro es menor al promedio de los libros con el idioma',
                          registro.codigo_idioma(libros[pos].idioma))
                else:
                    print('Tiene igual rating que el promedio de los libros con el idioma',
                          registro.codigo_idioma(libros[pos].idioma))

            elif opcion == 4:
                print('\t'*6, 'Cargando, Esto puede demorar unos segundos...')
                matriz = registro.crear_matriz(27, 21)

                for j in range(1, 27):
                    for k in range(20):
                        may = 0
                        pos = -1
                        for i in range(len(libros)):
                            if libros[i].rating > may and libros[i].idioma == j and libros[i].anio == (k+2000):
                                may = libros[i].rating
                                pos = i
                        if pos == -1:
                            pass
                        else:
                            matriz[j-1][k] = libros[pos]
                print('.'*86)
                print('¡Genial! La matriz se ha generado correctamente')

            elif opcion == 5:
                maximo = 0
                pos = ''
                primero = True
                v2 = [0] * 10  # (o decadas desde el 1900 al 2000)
                for libro in libros:
                    if 1900 <= libro.anio < 1910:
                        v2[0] += 1
                    elif 1910 <= libro.anio < 1920:
                        v2[1] += 1
                    elif 1920 <= libro.anio < 1930:
                        v2[2] += 1
                    elif 1930 <= libro.anio < 1940:
                        v2[3] += 1
                    elif 1940 <= libro.anio < 1950:
                        v2[4] += 1
                    elif 1950 <= libro.anio < 1960:
                        v2[5] += 1
                    elif 1960 <= libro.anio < 1970:
                        v2[6] += 1
                    elif 1970 <= libro.anio < 1980:
                        v2[7] += 1
                    elif 1980 <= libro.anio < 1990:
                        v2[8] += 1
                    elif 1990 <= libro.anio < 2000:
                        v2[9] += 1

                for i in range(len(v2)):
                    if v2[i] != 0:
                        print('La década', registro.decada_libros(i), 'tiene un total de', v2[i], 'publicaciones')
                    if v2[i] > maximo:
                        maximo = v2[i]
                        pos = str(i)
                    elif v2[i] == maximo:
                        pos += str(i)
                print('_'*86)
                if len(pos) == 1:
                    print('La década con más publicaciones es:', registro.decada_libros(int(pos)))
                else:
                    print('Hay más de una década con la mayor cantidad de publicaciones...')
                    for i in range(len(pos)):
                        if primero:
                            primero = False
                            print('Una de esas décadas es:', registro.decada_libros(int(pos[i])))
                        else:
                            print('Otra de esas décadas es:', registro.decada_libros(int(pos[i])))

            elif opcion == 6:
                if len(matriz) != 0:
                    contador = 0
                    archivo = open(nombre_archivo, 'wb')
                    for v in range(len(matriz)):
                        for b in range(len(matriz[v])):
                            if matriz[v][b] is not None:
                                pickle.dump(matriz[v][b], archivo)
                                contador += 1
                    print('¡Genial! Se ha generado el archivo correctamente')
                    print('.'*86)
                    print('La cantidad de registros grabados son:', contador)
                    archivo.close()
                else:
                    print('#'*15, '- ERROR: Debe primero generar la matriz (Opción 4) -', '#'*15)

            elif opcion == 7:
                contador = 0
                archivo = open(nombre_archivo, 'rb')
                size = os.path.getsize(nombre_archivo)
                if size == 0:
                    print('#'*16, '- ERROR: Primero debes crear un archivo (Opción 6) -', '#'*16)
                else:
                    while archivo.tell() < size:
                        registros = pickle.load(archivo)
                        contador += 1
                        print(str(contador) + '.')
                        print(registro.to_string(registros))

                archivo.close()
        else:
            print(' - ERROR: Para poder utilizar la opción ingresada, debe generar el vector (Opción1) - ')
        if opcion != 0:
            print('='*86, '\n')

    print('.\n'*3, '¡Gracias por utilizar nuestro programa!')


if __name__ == '__main__':
    principal()
