from PySide6.QtCore import QObject, Signal
from PySide6.QtCore import Slot
import json
from Backend.GeneradorCongruencialLineal import GeneradorCongruencialLineal
class Backend(QObject):
    message_received = Signal(str)

    def __init__(self):
        super().__init__()

    @Slot(str)
    def recibir_mensaje(self, mensaje_json):
        # Aquí se procesa el mensaje recibido
        datos = json.loads(mensaje_json)

        a = datos.get("a")
        xo = datos.get("xo")
        c = datos.get("c")
        m = datos.get("m")
        hasta = datos.get("hasta")
        
        if hasta:
            CL = GeneradorCongruencialLineal(a, c, m, xo, usar_hasta= True, hasta = hasta)
        else:
            CL = GeneradorCongruencialLineal(a, c, m, xo)

        resultado = CL.generar()
        resultado_json = json.dumps(resultado)
        
        # Aquí se puede enviar un mensaje de respuesta
        self.message_received.emit(resultado_json)

