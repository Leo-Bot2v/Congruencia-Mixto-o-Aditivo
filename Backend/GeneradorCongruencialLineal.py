class GeneradorCongruencialLineal:
    def __init__(self, a, c, m, xo, usar_hasta=False, hasta=None):
        self.a = a
        self.c = c
        self.m = m
        self.xo = xo
        self.xn = xo
        self.i = 0
        self.usar_hasta = usar_hasta
        self.hasta = hasta
        self.valores_generados = set()
        self.resultados = []

    def generar(self):
        while True:
            if self.usar_hasta and self.i >= self.hasta:
                break

            # Fórmula para el siguiente valor (xn+1)
            xn1 = (self.a * self.xn + self.c) % self.m
            uniforme = xn1 / self.m

            if not self.usar_hasta:
                if xn1 in self.valores_generados:
                    break  # Si ya se repite, rompemos

            # Registramos el valor generado
            self.valores_generados.add(xn1)

            # Almacenamos los resultados
            self.resultados.append({
                'i': self.i,
                'xo': self.xo,
                'xn1': xn1,
                'uniforme': uniforme
            })
            
            self.xo = xn1
            self.xn = xn1
            self.i += 1

        return self.resultados

#Prueba de funcionamiento   
#generador = GeneradorCongruencialLineal(a=1, c=3, m=1024, xo=11, usar_hasta=False)
#resultados = generador.generar()
#print(resultados)