class Libro:
    def __init__(self, titulo, revisiones, anio, idioma, rating, isbn):
        self.anio = anio
        self.rating = rating
        self.idioma = idioma
        self.revisiones = revisiones
        self.titulo = titulo
        self.isbn = isbn


def insertion_sort(v):
    n = len(v)
    for j in range(1, n):
        y = v[j].isbn
        k = j - 1
        while k >= 0 and y < v[k].isbn:
            v[k+1] = v[k]
            k -= 1
        v[k+1].isbn = y


# Devuelve la posicion del valor buscado en el vector ORDENADO
def busqueda_binaria(isbn, libros):
    izq, der = 0, len(libros) - 1

    while izq <= der:
        med = izq + der // 2

        if libros[med].isbn == isbn:
            return med

        elif libros[med].isbn < isbn:
            izq += 1

        elif libros[med].isbn > isbn:
            der -= 1

    return -1


# Busca el valor de un arreglo que no esta ordenado
def busqueda_secuencial(titulo, libros):
    for i in range(len(libros)):
        if libros[i].titulo == titulo:
            return i
    return -1


def to_string(libro):
    cadena = '| {:^75} | {:^10} | {:^10} | {:^18} | {:^10} | {:^10} |\n' \
             '{:<125}'
    print(cadena.format(libro.titulo, libro.revisiones, libro.anio, codigo_idioma(libro.idioma),
                        libro.rating, libro.isbn, '-' * 152))


def encabezado():
    cadena = '{:<125}\n' \
             '| {:^75} | {:^10} | {:^10} | {:^18} | {:^10} | {:^10} |\n' \
             '{:<125}'
    print(cadena.format('*' * 152, 'Título', 'Revisiones', 'Año Publ.', 'Idioma', 'Rating', 'ISBN', '*' * 152))


def crear_matriz(a, b):
    matriz = [[None] * b for _ in range(a)]
    return matriz


def decada_libros(i):
    decada = ''
    if i == 0:
        decada = '1900 - 1910'
    elif i == 1:
        decada = '1910 - 1920'
    elif i == 2:
        decada = '1920 - 1930'
    elif i == 3:
        decada = '1930 - 1940'
    elif i == 4:
        decada = '1940 - 1950'
    elif i == 5:
        decada = '1950 - 1960'
    elif i == 6:
        decada = '1960 - 1970'
    elif i == 7:
        decada = '1970 - 1980'
    elif i == 8:
        decada = '1980 - 1990'
    elif i == 9:
        decada = '1990 - 2000'
    return decada


def codigo_idioma(a):
    idiomas = 'Ingles', 'Chino mandarín', 'Hindi', 'Español', 'Francés', 'Árabe', 'Bengalí', 'Ruso', 'Portugués', \
              'Indonesio', 'Urdu', 'Alemán', 'Japonés', 'Suajili', 'Maratí', 'Telugú', 'Turco', 'Chino cantonés', \
              'Tamil', 'Panyabí occidental', 'Chino Wu', 'Vietnamita', 'Hausa', 'Javanés', 'Árabe egipcio', 'Italiano' \
              'Guyarati'
    return idiomas[a-1]


if __name__ == '__main__':
    pass
