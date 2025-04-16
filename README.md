# Congruencia Mixto o Aditivo

Este proyecto es una aplicación de escritorio desarrollada utilizando **PySide6** que permite calcular la congruencia mixta o aditiva, una técnica matemática utilizada para generar secuencias de números pseudoaleatorios. La aplicación cuenta con una interfaz gráfica donde el usuario puede ingresar varios parámetros y visualizar los resultados.

## Características

- **Interfaz gráfica**: Desarrollada con **PySide6** (Qt para Python), ofreciendo una experiencia de usuario intuitiva.
- **Cálculo de secuencias pseudoaleatorias**: Basado en la técnica de congruencia mixta o aditiva.
- **Interacción con HTML y JavaScript**: Utilizando un `QWebEngineView` para mostrar la interfaz en un navegador dentro de la aplicación de escritorio.

## Tecnologías utilizadas

- **Backend**: Python con **PySide6** y **QtWebEngine** para la creación de la aplicación de escritorio.
- **Frontend**: HTML, CSS y JavaScript, utilizados en la vista web incrustada en la aplicación mediante **QWebEngineView**. El frontend incluye tecnologías como:
  - **Bootstrap**: para el diseño responsivo.
  - **SweetAlert2**: para notificaciones atractivas.
  - **Three.js y GLTFLoader**: para la visualización de gráficos 3D y modelos.
- **Interacción**: Comunicación entre el frontend (HTML, CSS, JavaScript) y el backend (Python) mediante **QWebChannel**.

## Instalación

### Requisitos

1. Python 3.6+(3.12 usada en la pruebas).
2. PySide6: Puedes instalarlo utilizando pip:

```bash
pip install pyside6
