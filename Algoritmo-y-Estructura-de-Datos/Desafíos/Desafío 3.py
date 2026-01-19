import soporte_DSF3


def principal():
    num = []
    conteo = []
    v = soporte_DSF3.vector_unknown_range(300000)
    for i in range(len(v)):
        z = soporte_DSF3.conteo(v[i], num)
        if z == -1:
            num.append(v[i])
            conteo.append(1)
        else:
            conteo[z] += 1

    print('-'*100)
    print('<< La cantidad de numeros distintos es:', str(len(num)), '>>')

    print('-'*100)
    x = soporte_DSF3.valor_modal(num, conteo)
    if x == 0:
        print('<< No hay valor modal >>')
    else:
        print('<< El valor modal es:', num[x], '>>')
        print('<< Su frecuencia de aparición es:', conteo[x], '>>')


"""
def principal():
    contador = 0
    conteo = [0] * 300000
    v = soporte_DSF3.vector_known_range(300000)
    for i in range(len(v)):
        conteo[v[i]] += 1
    for j in range(300000):
        if conteo[j] != 0:
            contador += 1

    print('-'*79)
    print('<< La cantidad de números diferentes son:', contador, '>>')

    x, z = soporte_DSF3.valor_modal2(conteo)
    print('-'*79)
    if x == -1:
        print('<< No hay valor modal >>')
    else:
        print('<< El valor modal es:', x, '>>')
        print('<< Su frecuencia es:', z, '>>')
"""


if __name__ == '__main__':
    principal()
