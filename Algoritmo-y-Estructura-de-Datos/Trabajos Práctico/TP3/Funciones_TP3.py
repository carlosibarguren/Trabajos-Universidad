import random


class Libro:

    # Función Constructora
    def __init__(self, codigo, titulo, genero, idioma, precio):
        self.codigo = codigo
        self.titulo = titulo
        self.genero = genero
        self.idioma = idioma
        self.precio = precio


# Función que genera ISBN, utilizada en la función siguiente
def generar_codigo():
    codigo_final = '0'
    while not codigo_valido(codigo_final):
        codigo_int = random.randint(1111111111, 9999999999)
        p_g1 = random.randint(1, 7)
        p_g2 = random.randint(p_g1+1, 8)
        p_g3 = random.randint(p_g2+1, 9)
        codigo_tupla = str(codigo_int)
        codigo_final = ''
        for i in range(len(codigo_tupla)):
            if i == p_g1 or i == p_g2 or i == p_g3:
                codigo_final += '-'
            codigo_final += codigo_tupla[i]
    return codigo_final


# Generar Libros automaticamente (Opción 1)
def generar_libros(n):
    libros = [None]*n
    for i in range(n):
        codigo = generar_codigo()

        while comprobar_cod_unico(codigo, libros):
            codigo = generar_codigo()

        libros[i] = Libro(codigo, 'Libro ' + str(i+1), random.randint(0, 9), random.randint(1, 5),
                          random.randint(1000, 9999))

    return libros


# Verifica la validez de un ISBN (Opción 1, 5 y 7)
def codigo_valido(codigo_str):
    num_depurado = ''
    cantidad_guion = 0
    guion_seguido = guion_final_principio = False
    for i in range(len(codigo_str)):
        if codigo_str[i] != '-':
            num_depurado += codigo_str[i]
        else:
            cantidad_guion += 1
            if not guion_seguido:
                guion_seguido = (codigo_str[i] == codigo_str[i-1])
            if i == 0 or i == (len(codigo_str)-1):
                guion_final_principio = True
    if cantidad_guion != 3 or guion_seguido or guion_final_principio:
        return False
    if len(num_depurado) != 10:
        return False
    numero_vector = []
    for c in num_depurado:
        numero_vector.append(int(c))
    valor_final = 0
    multiplicador = len(numero_vector)
    for i in range(len(numero_vector)):
        valor_final += numero_vector[i]*multiplicador
        multiplicador -= 1
    return valor_final % 11 == 0


# Comprueba que los codigos sean unicos (Opción 1)
def comprobar_cod_unico(code, v):
    existe_codigo = False
    if len(v) > 0:
        for e in v:
            if e is not None:
                existe_codigo = e.codigo == code
    return existe_codigo


# Ordena los libros según el título (Opción 2)
def ordenar_libros(libros):
    for i in range(len(libros)):
        for j in range(len(libros) - 1):
            if libros[j].titulo > libros[i].titulo:
                libros[i], libros[j] = libros[j], libros[i]
    return libros


# Retorna el género del libro (Opción 2, 3, 5 y 6)
def imprimir_genero(posicion):
    generos = ('Autoayuda', 'Arte', 'Ficción', 'Computación', 'Economía', 'Escolar', 'Sociedad', 'Gastronomía',
               'Infantil', 'Otros')
    gn = generos[posicion]
    return gn


# Retorna el idioma del libro (Opción 2, 5 y 6)
def imprimir_idioma(posicion):
    idiomas = ('Español', 'Inglés', 'Francés', 'Italiano', 'Otros')
    idi = idiomas[posicion]
    return idi


# Cuenta los libros por genero e identifica el más popular (Opción 3 y 6)
def libros_por_generos(libros):
    primero = True
    mayor = mayornum = 0
    cont = [0] * 10
    n = len(libros)
    for h in range(n):
        cont[libros[h].genero] += 1
    for i in range(10):
        if primero:
            primero = False
            mayor = cont[i]
            mayornum = i
        elif cont[i] > mayor:
            mayor = cont[i]
            mayornum = i
    return cont, mayornum


# Identifica los libros más caros según su idioma (Opción 4)
def precio_idioma(x, libros):
    a = c = ''
    b = 0
    primero = False
    n = len(libros)
    for i in range(n):
        if libros[i].idioma == x:
            if primero:
                primero = False
                a = libros[i].titulo
                b = libros[i].precio
                c = libros[i].codigo
            elif b < libros[i].precio:
                a = libros[i].titulo
                b = libros[i].precio
                c = libros[i].codigo
    return a, b, c


# Busca libros que tengan un cierto ISBN (Opción 5 y 7)
def isbn(libros, sbn):
    for p in range(len(libros)):
        if sbn == libros[p].codigo:
            return p
    return -1


# Ordena a los libros según su precio (Opción 6)
def ordenar_libros_precio(libros):
    for i in range(len(libros)):
        for j in range(len(libros) - 1):
            if libros[j].precio < libros[i].precio:
                libros[i], libros[j] = libros[j], libros[i]
    return libros


if __name__ == '__main__':
    pass
