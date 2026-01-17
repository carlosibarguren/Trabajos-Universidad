# Datos
s = int(input('Ingresar cantidad de segundos:'))
# Procedimientos
ha = s//3600
h = str(ha)
ma = s % 3600
mb = ma//60
m = str(mb)
sa = ma % 60
sb = str(sa)
t = h + ':' + m + ':' + sb
# Resultados
print('Tiempo total:', t)

# Datos 2
print('\nEscribir el siguiente tiempo en formato "hh/mm/ss", incluyendo los ceros')
tiempo = input('Ingresar tiempo completo:')
# Procesos 2
hora_a = tiempo[0] + tiempo[1]
hora_b = int(hora_a)
hora = hora_b*3600
minutos_a = tiempo[3] + tiempo[4]
minutos_b = int(minutos_a)
minutos = minutos_b*60
segundo_a = tiempo[6] + tiempo[7]
segundos = int(segundo_a)
tiempo_segundos = hora + minutos + segundos
# Resultados
print('Tiempo total en segundos:', tiempo_segundos, 'segundos')
