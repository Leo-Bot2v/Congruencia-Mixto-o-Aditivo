from PySide6.QtGui import QDesktopServices
from PySide6.QtWebEngineCore import QWebEngineUrlRequestInterceptor
from PySide6.QtCore import QUrl
from PySide6.QtWidgets import QApplication

# Interceptor de solicitudes en el navegador
class Interceptor(QWebEngineUrlRequestInterceptor):
    def __init__(self, webview):
        super().__init__()
        self.webview = webview
    def interceptRequest(self, info):
        url = info.requestUrl().toString()
        
        # URLs permitidas para abrir en navegador externo
        if url in ["http://creativecommons.org/licenses/by/4.0/", "https://skfb.ly/6yS7Q", "https://fonts.google.com/knowledge/using_type/licensing"]:
            QDesktopServices.openUrl(QUrl(url))
            #self.webview.setUrl(QUrl("file:///templates/index.html"))
        elif "break.close" in url:
            QApplication.instance().quit()
        elif "minizise.hide" in url:
            self.webview.showMinimized()