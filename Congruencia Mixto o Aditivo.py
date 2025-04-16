import sys
import os
from PySide6.QtWidgets import QApplication, QWidget, QVBoxLayout
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtCore import QUrl, Qt
from PySide6.QtGui import QIcon
from Backend.Backend import Backend
from PySide6.QtWebChannel import QWebChannel
from Backend.Interceptor import Interceptor

#Obcional dependiendo del equipo
#os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = "--disable-gpu-process-crash-reporting --enable-webgl --ignore-gpu-blacklist"

if getattr(sys, 'frozen', False):
    ruta_base = sys._MEIPASS
else:
    ruta_base = os.path.dirname(os.path.abspath(__file__))

ruta_res = os.path.join(ruta_base, "icono.res")
ruta_html = os.path.join(ruta_base, "templates/index.html")

# Clase del navegador PySide6
class MiNavegador(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Congruencia Mixto o Aditivo")
        self.setWindowIcon(QIcon(ruta_res.replace('\\', '/')))

        self.webview = QWebEngineView()
        self.webview.setUrl(QUrl(f"{ruta_html.replace('\\', '/')}"))

        # Agregar el interceptor de URLs
        self.interceptor = Interceptor(self)
        self.webview.page().profile().setUrlRequestInterceptor(self.interceptor)

        # Crear un Backend para la comunicación
        self.backend = Backend()

        # Crear un QWebChannel
        self.channel = QWebChannel()
        self.channel.registerObject("backend", self.backend)

        # Asignar el canal a la página web
        self.webview.page().setWebChannel(self.channel)

        # Desactivar el menú contextual
        self.webview.setContextMenuPolicy(Qt.NoContextMenu)

        layout = QVBoxLayout()
        layout.addWidget(self.webview)
        self.setLayout(layout)

        self.setWindowFlags(Qt.WindowCloseButtonHint | Qt.WindowMinimizeButtonHint | Qt.FramelessWindowHint)
        self.showMaximized()

# Iniciar la aplicación PySide6
app = QApplication(sys.argv)
ventana = MiNavegador()
ventana.show()
app.exec()
