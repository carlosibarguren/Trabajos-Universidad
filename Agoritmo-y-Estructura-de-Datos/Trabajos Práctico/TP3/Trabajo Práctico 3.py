import Funciones_TP3


def principal():
    libros = []

    # Elegir la opción para el menu
    print(':'*31, 'MENU DE OPCIONES', ':'*31)
    print('0- Salir del programa'
          '\n1- Generar o cargar los libros en la base de datos'
          '\n2- Mostrar los libros generados'
          '\n3- Contar la cantidad de libros según el género'
          '\n4- Buscar libro más caro según el idioma'
          '\n5- Buscar libro por ISBN'
          '\n6- Mostrar los libros del género más popular'
          '\n7- Consultar precio de un grupo de libros')
    print('_'*79)
    opcion = int(input('Elija una opcion: '))
    print('*'*79)

    while opcion != 0:

        # Error por si la opción ingresada es mayor a siete o menor a cero
        if 0 > opcion or opcion > 7:
            print('\n\t\t\t- ERROR: La opción que ingresó no es válida -\n')

        # Código de opción 1
        elif opcion == 1:

            # Indicar como generar el libro
            print('Indique la manera de generar los libros'         
                  '\n1-Automática'
                  '\n2-Manual')
            carga = int(input('\tSeleccione: '))

            if carga != 1 and carga != 2:
                print('\n\t\t\t- ERROR: La opción ingresada no es válida -\n')
                print('Indique la manera de generar los libros'         
                      '\n1-Automática'
                      '\n2-Manual')
                carga = int(input('\tSeleccione: '))

            # Indicar cuantos libros se quieren generar
            print('"'*79)
            n = int(input('Cuantos libros desea ingresar: '))
            while n < 1:
                print('\n\t\t\t- ERROR: El número debe ser mayor a cero -\n')
                n = int(input('Cuantos libros desea ingresar: '))
            print('"'*79)
            libros = [] * n

            # Carga automatica
            if carga == 1:

                # Genera el libro
                libros = Funciones_TP3.generar_libros(n)

                # Mensaje
                print('\t\t\t¡Que bien! Los libros se han agregado correctamente\n')

            # Carga Manual
            else:
                cont = 0

                # Secuencia para cada libro
                for i in range(n):
                    cont += 1
                    print('N°', cont)

                    # Ingresar ISBN
                    codigo = input('Ingrese un codigo válido (Con guiones): ')
                    while not Funciones_TP3.codigo_valido(codigo):
                        print('\n\t\t\t- ERROR: El código que ingresó no es válido -\n')
                        codigo = input('Ingrese un codigo válido (Con guiones): ')

                    # Chequear que sea unico
                    while Funciones_TP3.comprobar_cod_unico(codigo, libros):
                        print('\n\t\t\t- ERROR: El codigo ya existe en un libro cargado -\n')
                        codigo = input('Ingrese un codigo válido (Con guiones): ')
                        while not Funciones_TP3.codigo_valido(codigo):
                            print('\n\t\t\t- ERROR: El código que ingresó no es válido -\n')
                            codigo = input('Ingrese un codigo válido (Con guiones): ')
                    print('.'*79)

                    # Ingresar Título
                    titulo = input('Ingrese un título: ')

                    # Chequear que sea unico
                    while Funciones_TP3.comprobar_cod_unico(titulo, libros):
                        print('\n\t\t\t- ERROR: El Título ya se ha ingresado -\n')
                        titulo = input('Ingrese un título: ')
                    print('.'*79)

                    # Ingresar Género
                    print('Ingrese un género...'
                          '\n0- Autoayuda'
                          '\n1- Arte'
                          '\n2- Ficción'
                          '\n3- Computación'
                          '\n4- Economía'
                          '\n5- Escolar'
                          '\n6- Sociedad'
                          '\n7- Gastronomía'
                          '\n8- Infantil'
                          '\n9- Otros')
                    genero = int(input('\tSeleccion: '))

                    while genero < 0 or genero > 9:
                        print('\n\t\t\t- ERROR: El género ingresado no es válido -\n')
                        print('Ingrese un género...'
                              '\n0- Autoayuda'
                              '\n1- Arte'
                              '\n2- Ficción'
                              '\n3- Computación'
                              '\n4- Economía'
                              '\n5- Escolar'
                              '\n6- Sociedad'
                              '\n7- Gastronomía'
                              '\n8- Infantil'
                              '\n9- Otros')
                        genero = int(input('\tSeleccion: '))
                    print('.'*79)

                    # Ingresar Idioma
                    print('Ingrese un idioma:'
                          '\n1- Español'
                          '\n2- Inglés'
                          '\n3- Francés'
                          '\n4- Italiano'
                          '\n5- Otros')
                    idioma = int(input('\tSeleccion: '))

                    while idioma < 1 or idioma > 5:
                        print('\n\t\t\t- ERROR: El idioma ingresado no es válido -\n')
                        print('Ingrese un idioma:'
                              '\n1- Español'
                              '\n2- Inglés'
                              '\n3- Francés'
                              '\n4- Italiano'
                              '\n5- Otros')
                        idioma = int(input('\tSeleccion: '))
                    print('.'*79)

                    # Insertar Precio
                    precio = float(input('Ingrese el precio: $ '))

                    while precio <= 0:
                        print('\n\t\t\t- ERROR: El precio debe ser mayor a $0 -\n')
                        precio = float(input('Ingrese el precio: $ '))
                    print('"'*79)

                    # Agregado de Libro
                    libros.append(Funciones_TP3.Libro(codigo, titulo, genero, idioma, precio))

                # Mensaje
                print('\t\t\t¡Que bien! Los libros se han agregado correctamente\n')

        # Verificar que se hayan generado libros antes
        elif len(libros) != 0:

            # Código de opción 2
            if opcion == 2:

                # Ordenar los libros según su título
                libros = Funciones_TP3.ordenar_libros(libros)

                # Mostrar los libros generados
                for i in range(len(libros)):
                    gn = Funciones_TP3.imprimir_genero(libros[i].genero)
                    idi = Funciones_TP3.imprimir_idioma(libros[i].idioma - 1)
                    print('{:<25}'.format('Codigo:' + libros[i].codigo) +
                          '{:<25}'.format('Titulo:' + libros[i].titulo) +
                          '{:<25}'.format('Genero:' + gn) +
                          '{:<25}'.format('Idioma:' + idi) +
                          '{:<25}'.format('Precio:' + str(libros[i].precio)))

            # Código de opción 3
            elif opcion == 3:

                # Contar géneros
                a, b = Funciones_TP3.libros_por_generos(libros)

                # Mostrar cantidad de libros por género
                for i in range(10):
                    gn1 = Funciones_TP3.imprimir_genero(i)
                    if a[i] == 1:
                        print('El genero', gn1, 'tiene:', a[i], 'libro')
                    else:
                        print('El genero', gn1, 'tiene:', a[i], 'libros')

                # Mostrar el género con más libros
                gn2 = Funciones_TP3.imprimir_genero(b)
                print('='*79)
                print('<< El genero con mayor cantidad de libros es:', gn2, '>>')

            # Código de opción 4
            elif opcion == 4:

                # Indicar el idioma a analizar
                print('Ingrese el valor del idioma que quiera analizar...'
                      '\n...1- Español'
                      '\n...2- Ingles'
                      '\n...3- Francés'
                      '\n...4- Italiano'
                      '\n...5- Otros')
                idioma_analizar = int(input('\tSeleccione: '))

                while idioma_analizar > 5 or idioma_analizar < 1:
                    print('\n\t\t\t- ERROR: El valor del idioma tiene que ser entre 1 y 5 -\n')
                    print('\nIngrese el valor del idioma que quiera analizar...'
                          '\n...1- Español'
                          '\n...2- Ingles'
                          '\n...3- Francés'
                          '\n...4- Italiano'
                          '\n...5- Otros')
                    idioma_analizar = int(input('\tSeleccione: '))

                # Según su idioma, sacar el libro más caro
                carolibro, caroprecio, carocodigo = Funciones_TP3.precio_idioma(idioma_analizar, libros)

                # Mostrar el libro más caro del idioma
                print('='*79)
                if carolibro == '':
                    print('<< No hay libros registrados en aquel idioma >>')
                else:
                    print('<< El libro más caro en ese idioma es:', carolibro,
                          ', y su ISBN es:', carocodigo, '>>')

            # Código de opción 5
            elif opcion == 5:

                # Ingresar un ISBN para buscar
                isbn = input('Ingrese un ISBN para poder buscar: ')

                while not Funciones_TP3.codigo_valido(isbn):
                    print('\n\t\t\t- ERROR: El ISBN ingresado no es válido -\n')
                    isbn = input('Ingrese un ISBN para poder buscar: ')
                print('='*79)

                # Mostrar si es que se encontró un libro con el ISBN
                if Funciones_TP3.isbn(libros, isbn) != -1:
                    p = Funciones_TP3.isbn(libros, isbn)
                    gn = Funciones_TP3.imprimir_genero(libros[p].genero)
                    idi = Funciones_TP3.imprimir_idioma(libros[p].idioma - 1)
                    libros[p].precio *= 1.1
                    print('¡Felicidades! si hubo una coincidencia en su busqueda...')
                    print('-'*79)
                    print('Titulo:', libros[p].titulo,
                          '\nGenero:', gn,
                          '\nIdioma:', idi,
                          '\nPrecio: $', round(libros[p].precio, 2))

                # Mostrar si es que no se encontró un libro con el ISBN
                else:
                    print('<< No hubo coincidencias con su busqueda >>')

            # Código de opción 6
            elif opcion == 6:
                vector = []
                cont = 0

                # Identificar el género con más libros
                a, b = Funciones_TP3.libros_por_generos(libros)

                # Sumar cada libro que tenga el mismo género buscado
                for i in range(len(libros)):
                    if libros[i].genero == b:
                        vector.append(libros[i])

                # Ordenar aquellos libros por su precio
                vector = Funciones_TP3.ordenar_libros_precio(vector)

                # Mostrar los datos de aquellos libros
                gn = Funciones_TP3.imprimir_genero(b)
                print('Del Genero', gn, ', sus libros son...')
                for f in range(len(vector)):
                    idi = Funciones_TP3.imprimir_idioma(vector[f].idioma - 1)
                    cont += 1
                    print('-'*79)
                    print('N°', cont)
                    print('Codigo:', vector[f].codigo, '\t\tTitulo:', vector[f].titulo,
                          '\t\tIdioma:', idi, '\t\tPrecio: $', vector[f].precio)

            # Código de opción 7
            else:
                precio = 0

                # Ingresar cantidad de códigos a analizar
                num = int(input('Ingrese la cantidad de codigos a buscar: '))

                while num < 1:
                    print('\n\t\t\t- ERROR: La cantidad ingresada debe ser mayor a cero -\n')
                    num = int(input('Ingrese la cantidad de codigos a buscar: '))
                print('='*79)

                # Secuencia de analisis para hacer
                for i in range(num):

                    # Insertar ISBN para buscar
                    isbn = input('Ingrese un ISBN para poder buscar: ')

                    while not Funciones_TP3.codigo_valido(isbn):
                        print('\n\t\t\t- ERROR: El ISBN ingresado no es válido -\n')
                        isbn = input('Ingrese un ISBN para poder buscar: ')
                    print('_'*79)

                    # Buscar libros con aquel ISBN
                    p = Funciones_TP3.isbn(libros, isbn)

                    # Si es que hay un libro con ese ISBN
                    if p != -1:
                        print('¡Felicidades! si hubo una coincidencia en su busqueda...')
                        print('-'*79)
                        print('Nombre: ', libros[p].titulo)
                        print('$', libros[p].precio)
                        precio += libros[p].precio

                    # Si es que no hay un libro con ese ISBN
                    else:
                        print('No se encontró el libro con el código: ', isbn)
                        print('-'*79)

                # Mostrar el precio final
                print('El precio total a pagar es: $', precio)

        # Condicón si es que no se generaron libros antes
        else:
            print('\n\t\t\t- ERROR: Primero debes generar o cargar libros (opción 1) -\n')

        # Otra vez las opciones para poder repetir el proceso
        print('#'*79)
        print(':'*31, 'MENU DE OPCIONES', ':'*31)
        print('0- Salir del programa'
              '\n1- Generar o cargar los libros en la base de datos'
              '\n2- Mostrar los libros generados'
              '\n3- Contar la cantidad de libros según el género'
              '\n4- Buscar libro más caro según el idioma'
              '\n5- Buscar libro por ISBN'
              '\n6- Mostrar los libros del género más popular'
              '\n7- Consultar precio de un grupo de libros')
        print('_'*79)
        opcion = int(input('Elija una opcion: '))
        print('*'*79)
    print('.\n'*3, '¡Gracias por utilizar nuestro programa! Por favor intentelo de nuevo más tarde')


if __name__ == '__main__':
    principal()
