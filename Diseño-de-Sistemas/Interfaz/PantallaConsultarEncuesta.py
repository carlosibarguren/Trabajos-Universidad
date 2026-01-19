import tkinter as tk
from datetime import datetime
from tkinter import ttk
from tkcalendar import Calendar

class PantallaConsultarEncuesta:
    def __init__(self):
        self.ventana = tk.Tk()
        self.lblTitulo = tk.Label(self.ventana, text="Consultar Encuesta", font=("Cascadia Code Bold", 30), fg="#204561")

        self.imagen = tk.PhotoImage(file="D:\\Users\\Usuario\\PycharmProjects\\3ER AÑO\\PPAI-GRUPO3-ENTREGA3\\Recursos\\IVR.gif")
        self.imagenRedimensionada = self.imagen.subsample(2, 2)
        self.imagenRedimensionada2 = self.imagen.subsample(4, 4)
        self.lblImagen = tk.Label(self.ventana, image=self.imagenRedimensionada)
        self.lblImagen2 = tk.Label(self.ventana, image=self.imagenRedimensionada2)
        self.listaLlamadas = tk.Listbox(self.ventana, width=50, font=("Arial", 12))
        self.scrollbar = tk.Scrollbar(self.ventana, orient=tk.VERTICAL)
        self.lblDatosLlamada = tk.Label(self.ventana, text="Datos de la llamada", font=("Cascadia Code Light", 12))
        self.calInicio = Calendar(self.ventana, selectmode='day', year=2023, month=11, day=11, showweeknumbers=False, showothermonthdays=False)
        self.calFin = Calendar(self.ventana, selectmode='day', year=2023, month=11, day=11, showweeknumbers=False, showothermonthdays=False)

        self.lblSeleccionFechas = tk.Label(self.ventana, text="Seleccione las fechas", font=("Cascadia Code Semilight", 19))
        self.lblFechaInicio = tk.Label(self.ventana, text="Fecha inicio:", font=("Candara", 13))
        self.lblFechaFin = tk.Label(self.ventana, text="Fecha fin:", font=("Candara", 13))
        self.btnAceptarFechasPeriodo = tk.Button(self.ventana, text="Aceptar", width=15, fg="white", bg="#E87B0E", font=("Cascadia Code", 12), relief="ridge")
        self.btnCancelar = tk.Button(self.ventana, text="Cancelar", width=15, font=("Cascadia Code", 12), bg="#DE1010", fg="white", relief="ridge")
        self.lblLlamadasFiltradas = tk.Label(self.ventana, text="Llamadas del periodo seleccionado:", font=("Cascadia Code Semilight", 15))
        self.lblLamadas = tk.Label(self.ventana)
        self.lblSinLlamadas = tk.Label(self.ventana, text="No se encontraron llamadas del periodo", font=("Cascadia Code Semilight", 14))
        self.lblSeleccionLlamada = tk.Label(self.ventana, text="Seleccione una llamada:", font=("Cascadia Code Light", 12))
        self.cmbOpcionesLlamadas = ttk.Combobox(self.ventana, foreground="white", background="#204561", font=("Candara", 12))
        self.lblLlamadasNick = tk.Label(self.ventana)
        self.btnAceptarSeleccionLlamada = tk.Button(self.ventana, text="Aceptar", width=15, fg="white", bg="#E87B0E", font=("Cascadia Code", 12), relief="ridge")
        self.lblNombreCliente = tk.Label(self.ventana, font=("Candara", 12))
        self.lblEstadoActual = tk.Label(self.ventana, font=("Candara", 12))
        self.lblDuracion = tk.Label(self.ventana, font=("Candara", 12))
        self.lblDescripcionEncuesta = tk.Label(self.ventana, font=("Candara", 12))
        self.lblPreguntasYRespuestas = tk.Label(self.ventana, text="Preguntas y Respuestas ", font=("Candara", 12))
        self.lblPregunta = tk.Label(self.ventana)
        self.lblSeleccioneOpcionCsvOImpresion = tk.Label(self.ventana, text="Seleccione una opción:", font=("Cascadia Code Semilight", 12))
        self.cmbCsvOImpresion = ttk.Combobox(self.ventana, values=["Imprimir", "Generar CSV"], font=("Candara", 12))
        self.btnConfirmar = tk.Button(self.ventana, font=("Cascadia Code", 12), width=15, text="Confirmar", fg="white", bg="#E87B0E", relief="ridge")

    def opcionConsultarEncuesta(self, gestor, arrayLlamadas, arrayEncuestas, pantallaCsv):
        self.habilitarVentana()
        gestor.nuevaConsulta(self, arrayLlamadas, arrayEncuestas, pantallaCsv)
        # es parte del tkinter
        self.ventana.mainloop()

    def habilitarVentana(self):
        self.ventana.title("Consultar Encuesta")
        self.ventana.geometry("1100x450")

    def pedirFechasDelPeriodoAFiltrar(self, gestor):

        self.lblImagen.place(x=200, y=100)
        self.lblTitulo.place(x=80, y=300)
        self.lblSeleccionFechas.place(x=620, y=30)
        self.lblFechaInicio.place(x=630, y=80)
        self.calInicio.place(x=575, y=115)
        self.lblFechaFin.place(x=900, y=80)
        self.calFin.place(x=825, y=115)

        btnAceptarClickeado = tk.Variable(self.ventana, value=False)

        btnAceptarFechasPeriodo = self.btnAceptarFechasPeriodo
        btnAceptarFechasPeriodo.config(command=lambda: btnAceptarClickeado.set(True))
        btnAceptarFechasPeriodo.place(x=750, y=300)

        btnCancelar = self.btnCancelar
        btnCancelar.config(command=lambda: btnAceptarClickeado.set(False))
        btnCancelar.place(x=900, y=350)

        self.ventana.wait_variable(btnAceptarClickeado)

        if btnAceptarClickeado.get():
            fechaInicio = self.tomarFechaInicioPeriodo(self.calInicio.get_date())
            fechaFin = self.tomarFechaFinPeriodo(self.calFin.get_date())
            gestor.tomarFechasDelPeriodo(self, fechaInicio, fechaFin)
        else:
            gestor.cancelarCU(self.ventana)

    def tomarFechaInicioPeriodo(self, fechaInicio):
        fecha = datetime.strptime(fechaInicio, "%m/%d/%y").date()
        return fecha

    def tomarFechaFinPeriodo(self, fechaFin):
        fecha = datetime.strptime(fechaFin, "%m/%d/%y").date()
        return fecha

    def mostrarLlamadasFiltradas(self, llamadas, gestor):
        widgetsDestruir = [self.lblSeleccionFechas, self.lblFechaInicio, self.lblFechaFin, self.calInicio,
                           self.calFin, self.btnAceptarFechasPeriodo, self.lblImagen]
        for widget in self.ventana.winfo_children():
            if widget in widgetsDestruir:
                widget.destroy()

        contador = 0

        if len(llamadas) > 0:
            self.lblImagen2.place(x=250, y=20)
            self.lblTitulo.place(x=400, y=30)
            self.lblLlamadasFiltradas.place(x=180, y=150)


            for k, llamada in enumerate(llamadas):
                nombre_llamada = f"Llamada {k+1}"  # Nombre personalizado para cada elemento
                self.listaLlamadas.insert(tk.END, nombre_llamada)

            self.listaLlamadas.config(height=10)

            # Configurar el scroll para la lista
            self.scrollbar.config(command=self.listaLlamadas.yview)
            self.listaLlamadas.config(yscrollcommand=self.scrollbar.set)


            # Empacar la lista y la barra de desplazamiento
            self.listaLlamadas.place(x=150, y=200)
            self.scrollbar.place(x=620, y=200, height=195)


        else:
            self.lblImagen2.place(x=250, y=40)
            self.lblTitulo.place(x=400, y=50)
            self.lblSinLlamadas.place(x=400, y=200)
            btnCancelarClickeado = tk.Variable(self.ventana, value=False)

            btnCancelar = self.btnCancelar
            btnCancelar.config(command=lambda: btnCancelarClickeado.set(False))
            btnCancelar.place(x=550, y=300)

            self.ventana.wait_variable(btnCancelarClickeado)

            gestor.cancelarCU(self.ventana)

    def pedirSeleccionDeLlamada(self, llamadasFiltradas, gestor):

        self.lblSeleccionLlamada.place(x=760, y=150)

        seleccion = tk.StringVar(self.ventana)
        seleccion.set("Seleccione Una Llamada")  # Establece el primer elemento como valor inicial

        lblLlamadasNick = [f"Llamada {i + 1}" for i in range(len(llamadasFiltradas))]

        cmbOpcionesLlamadas = self.cmbOpcionesLlamadas
        cmbOpcionesLlamadas['state'] = 'readonly'
        cmbOpcionesLlamadas.config(textvariable=seleccion, values=lblLlamadasNick)
        cmbOpcionesLlamadas.place(x=770, y=200)

        btnSeleccionarLlamadaClickeado = tk.Variable(self.ventana, value=False)

        btnAceptarSeleccionLlamada = self.btnAceptarSeleccionLlamada
        btnAceptarSeleccionLlamada.config(command=lambda: btnSeleccionarLlamadaClickeado.set(True))
        btnAceptarSeleccionLlamada.place(x=800, y=250)

        btnCancelar = self.btnCancelar
        btnCancelar.config(command=lambda: btnSeleccionarLlamadaClickeado.set(False))
        btnCancelar.place(x=900, y=350)

        self.ventana.wait_variable(btnSeleccionarLlamadaClickeado)

        if btnSeleccionarLlamadaClickeado.get():
            punteroLlamada = self.tomarSeleccionDeLlamada(llamadasFiltradas, seleccion)
            gestor.tomarSeleccionDeLlamada(punteroLlamada)
        else:
            gestor.cancelarCU(self.ventana)


    def tomarSeleccionDeLlamada(self, llamadasFiltradas, seleccion):
        llamadaSeleccionada = seleccion.get()
        contador = 0
        punteroLlamada = None
        for llamada in llamadasFiltradas:
            contador += 1
            if str(contador) in llamadaSeleccionada:
                punteroLlamada = llamada
        return punteroLlamada

    def mostrarDatosDeLlamada(self, nombreCliente, estadoActual, duracion, respuestas, preguntas, descripcionEncuesta):
        widgetsNoDestruir = [self.lblTitulo, self.lblNombreCliente, self.lblEstadoActual, self.lblDuracion, self.lblDescripcionEncuesta, self.btnCancelar,
                             self.lblPreguntasYRespuestas, self.lblPregunta, self.lblSeleccioneOpcionCsvOImpresion, self.cmbCsvOImpresion,
                             self.btnConfirmar, self.lblImagen2, self.lblDatosLlamada]

        for widget in self.ventana.winfo_children():
            if widget not in widgetsNoDestruir:
                widget.destroy()

        self.lblDatosLlamada.place(x=150, y=140)

        lblNombreCliente = self.lblNombreCliente
        lblNombreCliente.config(text="Nombre del cliente:  " + nombreCliente)
        lblNombreCliente.place(x=150, y=175)

        lblEstadoActual = self.lblEstadoActual
        lblEstadoActual.config(text="Estado actual:  " + estadoActual)
        lblEstadoActual.place(x=150, y=200)

        lblDuracion = self.lblDuracion
        lblDuracion.config(text="Duración:  " + str(duracion) + " minutos")
        lblDuracion.place(x=150, y=225)

        lblDescripcionEncuesta = self.lblDescripcionEncuesta
        lblDescripcionEncuesta.config(text="Descripción de la encuesta:  " + descripcionEncuesta)
        lblDescripcionEncuesta.place(x=150, y=250)

        self.lblPreguntasYRespuestas.place(x=150, y=300)
        contador = 325

        for pregunta, respuesta in zip(preguntas, respuestas):
            lblPregunta = tk.Label(self.ventana, text=pregunta + "  -  " + respuesta, font=("Candara", 12))
            lblPregunta.place(x=200, y=contador)
            contador += 25

    def pedirSeleccionCsvOImpresion(self, gestor):

        self.lblSeleccioneOpcionCsvOImpresion.place(x=700, y=170)

        cmbCsvOImpresion = self.cmbCsvOImpresion
        cmbCsvOImpresion['state'] = 'readonly'
        cmbCsvOImpresion.place(x=700, y=200)

        btnConfirmarClickeado = tk.Variable(self.ventana, value=False)

        btnConfirmar = self.btnConfirmar
        btnConfirmar.config(command=lambda: btnConfirmarClickeado.set(True))
        btnConfirmar.place(x=725, y=240)

        btnCancelar = self.btnCancelar
        btnCancelar.config(command=lambda: btnConfirmarClickeado.set(False))
        btnCancelar.place(x=900, y=350)

        self.ventana.wait_variable(btnConfirmarClickeado)

        if btnConfirmarClickeado.get():
            codigo = self.tomarSeleccionCsvOImpresion(cmbCsvOImpresion.get())
            gestor.tomarSeleccionCsvOImpresion(codigo)
            self.ventana.destroy()
        else:
            gestor.cancelarCU(self.ventana)

    def tomarSeleccionCsvOImpresion(self, seleccion):
        if seleccion == "Imprimir":
            codigo = 2
        elif seleccion == "Generar CSV":
            codigo = 1
        else:
            codigo = 3
        return codigo
