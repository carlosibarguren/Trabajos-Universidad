-- Punto 1
esDivisible :: Integer -> Integer -> Bool
esDivisible nro exp  
 |(nro `rem` exp) == 0 = True
 |otherwise = False

-- Punto 2
listaFactoresDivisiblesDe :: Integer -> [Integer]
listaFactoresDivisiblesDe 0 = [0]
listaFactoresDivisiblesDe 1 = [1]
listaFactoresDivisiblesDe num = funcAux num num 

funcAux :: Integer -> Integer -> [Integer]
funcAux num div
  |div == 1 = [1]  
  |esDivisible num div = div: lista
  |otherwise = lista
    where
     lista = funcAux num (div - 1)   
                       
          
-- Punto 3
esPrimo :: Integer -> Bool
esPrimo num 
  |num == 2 = True
  |even num == True = False
  |otherwise = funcAux2 num 3
  

funcAux2 :: Integer -> Integer -> Bool
funcAux2 num div 
    |div == num = True
    |esDivisible num div == True = False
    |otherwise = funcAux2 num (div + 2)   

-- Punto 4     

listadoPrimosMenoresOIgualesQue :: Integer -> [Integer]
listadoPrimosMenoresOIgualesQue 0 = []
listadoPrimosMenoresOIgualesQue 1 = []
listadoPrimosMenoresOIgualesQue 2 = [2]
listadoPrimosMenoresOIgualesQue num = funcAux3 num num

funcAux3 :: Integer -> Integer -> [Integer]
funcAux3 num nPrim
 |nPrim == 2 = [2]
 |esPrimo nPrim = nPrim: lista2
 |otherwise = lista2
   where
    lista2 = funcAux3 num (nPrim - 1)

-- Punto 5
expansion :: [(Integer, Integer)] -> Integer
expansion [(base, exp)] = base ^ exp
expansion (tupla1 : tupla) = (base ^ exp) * expansion tupla
 where
   base = fst tupla1
   exp = snd tupla1
   
  
