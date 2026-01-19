def generar_elementos(n):
    p = []
    for i in range(n):
        a = Libro('Atributo ' + str(i))
        add_orden(a, p)
    return p


def add_orden(libro, arreglo):
    izq, der, pos = 0, len(arreglo) - 1, len(arreglo)

    while izq <= der:
        med = (izq + der) // 2
        if arreglo[med].isbn == libro.isbn:
            pos = med
            break

        if arreglo[med].isbn < libro.isbn:
            izq += 1
        if arreglo[med].isbn > libro.isbn:
            der -= 1

    if izq > der:
        pos = izq

    arreglo[pos:pos] = [libro]


# Valida que el atributo que se carga sea unico, es decir, no se repita
# ATENCION esta funcion la podes mejorar, si lo que te piden es que valides
# un atributo del cual ya hiciste una funcion de busqueda, usa la funcion de busqueda
# este esta hecho para validar un atributo que no tenga una funcion de bisqueda previa
def validar_unico_atributo(vector, atributo):
    for e in vector:
        if e != 0:
            if e.isbn == atributo:
                return False
    return True
