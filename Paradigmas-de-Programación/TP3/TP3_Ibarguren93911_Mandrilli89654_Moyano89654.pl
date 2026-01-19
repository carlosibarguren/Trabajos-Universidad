
accidentes(1, 'AA582GE', fecha(05, 11, 2021), horario(09, 15), clima(1, 8.00), 1, 28965856,[36253654, 56324569, 25412563]).
accidentes(2, 'AB745HF', fecha(15, 08, 2020), horario(10, 22), clima(2, 0.00), 3, 27365895, [27365895,44652698]).
accidentes(3, 'AA582GE', fecha(15, 08, 2020),  horario(08, 32), clima(1, 4.75), 4, 20356987, [35698236]).
accidentes(4, 'AA582GE', fecha(12, 05, 2021), horario(23, 47), clima(3, 8.23), 1, 48555785, []).
accidentes(5, 'AE458JK', fecha(11, 06, 2019), horario(22, 35), clima(3, 4.95), 3,28965856, []).
accidentes(6, 'AC569LK', fecha(21, 12, 2020), horario(23, 12), clima(4, 0.00), 2, 20356987, [20356987, 45236874, 36521452]).

condicionClimatica(1, lluvia).
condicionClimatica(2, nieve).
condicionClimatica(3, tormenta).
condicionClimatica(4, niebla).

datosConductor(28965856 , 'juan perez', fecha(12, 01, 1982)).
datosConductor(20356987, 'blanca nieves', fecha(15, 03, 2006)).
datosConductor(27365895, 'jose garcia', fecha(22, 06, 2000)).
datosConductor(48555785, 'ana crisol', fecha(21, 05, 2005)).

%Punto 1
% V= Valor de la severidad del accidente, X= Valor de la severidad del
% accidente ingresada por teclado
punto1(X):-(accidentes(_, _, fecha(_, M, A), _, _, V, _, _)), A =:= 2020, M=\=10, M>=8, 12>=M, V<X.

%Punto 2
%MM = Milimetros de precipitaciones, A = Año, M= Mes, D=Dia
edad(DiaAct, MesAct, AnioAct, DiaNac, MesNac, AnioNac, Edad) :- A is AnioAct-AnioNac, M is MesNac-MesAct, D is DiaNac-DiaAct, ((M<0, Edad is A); (0<M, Edad is A-1);(D=<0, M=0, Edad is A); (D>0,M=0, Edad is (A-1))).

punto2(Cantidad):-findall(ID,
                                      (   accidentes(ID, _, _,_, clima(_, MM), _, DNI, _), datosConductor(DNI, _, fecha(D, M, A)), edad(26, 10, 2022, D, M, A, Edad), Edad<18, MM=<5.55)
                                     , NuevaLista), length(NuevaLista, Cantidad).
%Punto 3
punto3(DNI, Dia, Mes, Anio):- accidentes(_,_,fecha(Dia,Mes,Anio), _, _,_,DNI,[]).

%punto4
punto4(Lista):- findall(Nom,
                        (   accidentes(_,_,fecha(_,Mes,_),_,_,_,DNI,Lista), datosConductor(DNI, Nom,_),((Mes=6) ; (Mes=:=5,Lista==[]))),
                            NuevaLista), sort(NuevaLista, Lista).
%punto5
%CantL = Cantidad Lesionados, ListaL= Lista Lesionados
punto5(Patentes, Lista ):-findall((ID, NumPatente, CantL),
    (   accidentes(ID, NumPatente,_,_,_,_,_,ListaL), member(NumPatente, Patentes), length(ListaL, CantL)),
        Lista).
