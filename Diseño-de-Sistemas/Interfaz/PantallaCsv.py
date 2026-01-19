import tkinter as tk
import csv


class PantallaCsv:

    def __init__(self):
        self.ventanaCsv = None

    def visualizarCsv(self, archivo_csv, gestor):
        datos = []

        with open(archivo_csv, 'r') as archivo:
            lector_csv = csv.reader(archivo)
            for fila in lector_csv:
                datos.append(fila)

        self.ventanaCsv = tk.Tk()
        self.ventanaCsv.title("Datos del archivo CSV")
        self.ventanaCsv.geometry("800x250")

        tabla = tk.Frame(self.ventanaCsv)
        tabla.pack()

        boton_cerrar = tk.Button(self.ventanaCsv, font=("Cascadia Code", 12), relief="ridge", width=15, text="Cerrar",
                                 fg="white", bg="#E87B0E", command=lambda: gestor.finCU(self.ventanaCsv))
        boton_cerrar.pack(expand=True)

        encabezados = datos[0]
        for i, encabezado in enumerate(encabezados):
            etiqueta = tk.Label(tabla, text=encabezado, padx=10, pady=5, font=("Arial", 14))
            etiqueta.grid(row=0, column=i)

        for fila_idx, fila_datos in enumerate(datos[1:], start=1):
            for columna_idx, dato in enumerate(fila_datos):
                etiqueta = tk.Label(tabla, text=dato, padx=10, pady=5, font=("Arial", 12))
                etiqueta.grid(row=fila_idx, column=columna_idx)

        self.ventanaCsv.mainloop()
