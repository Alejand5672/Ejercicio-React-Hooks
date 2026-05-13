# Luis AleJandro Hernández Márquez (241424)
# Sistemas y tecnologías Web
# Prof. Ludwing Cano
# Pomodoro Timer - React

Este proyecto es una aplicación web de temporizador Pomodoro desarrollada con React.

El objetivo principal del proyecto es practicar el uso de hooks como `useState`, `useEffect` y `useRef`, aplicándolos en un temporizador funcional con sesiones de trabajo, descanso, historial, estadísticas y persistencia en el navegador.

---

## Descripción del proyecto

La aplicación permite al usuario utilizar un temporizador Pomodoro para organizar sesiones de trabajo y descanso.

El proyecto está dividido en tres niveles de dificultad. Cada nivel agrega nuevas funcionalidades al temporizador, empezando desde una versión básica hasta una versión más completa.

En el primer nivel se implementa un temporizador básico.

En el segundo nivel se agregan modos de trabajo y descanso junto con un historial de sesiones.

En el tercer nivel se agregan configuraciones personalizadas, barra de progreso, sonido, sesiones parciales, estadísticas y almacenamiento en `localStorage`.

---

## Tecnologías utilizadas

- React
- JavaScript
- HTML
- CSS
- Vite
- Hooks de React
- localStorage

---

## Funcionalidades principales

- Temporizador Pomodoro de trabajo.
- Botón para iniciar y pausar el temporizador.
- Botón para reiniciar el temporizador.
- Cambio automático entre modo trabajo y modo descanso.
- Registro de sesiones completadas.
- Configuración personalizada de minutos de trabajo y descanso.
- Barra de progreso visual.
- Sonido al finalizar una sesión.
- Guardado de sesiones en `localStorage`.
- Estadísticas de sesiones de trabajo y descanso.
- Opción para guardar sesiones parciales.

---

## Niveles del proyecto

---

## Nivel 1: Temporizador básico

En este nivel se implementa la funcionalidad principal del Pomodoro.

El temporizador inicia con 25 minutos, equivalentes a 1500 segundos. El usuario puede iniciar, pausar y reiniciar el contador.

En este nivel se utiliza `useState` para guardar el tiempo restante y para controlar si el temporizador está corriendo o pausado.

También se utiliza `useEffect` para manejar la cuenta regresiva del temporizador. Este efecto permite que el tiempo disminuya cada segundo mientras el temporizador está activo.

Además, se utiliza `useRef` para guardar la referencia del intervalo y poder limpiarlo correctamente. Esto evita que se acumulen varios intervalos al mismo tiempo.

### Características del nivel 1

- Temporizador de 25 minutos.
- Botón para iniciar.
- Botón para pausar.
- Botón para reiniciar.
- Formato de tiempo en minutos y segundos.
- Limpieza del intervalo para evitar errores.

---

## Nivel 2: Trabajo, descanso e historial

En este nivel se mejora el Pomodoro agregando dos modos principales: trabajo y descanso.

El modo de trabajo dura 25 minutos y el modo de descanso dura 5 minutos. Cuando una sesión de trabajo termina, el temporizador cambia automáticamente al modo descanso.

También se agrega un historial de sesiones completadas. Cada vez que termina una sesión de trabajo, se guarda información como el tipo de sesión, la duración y la hora en que se completó.

En este nivel se sigue utilizando `useState` para manejar el tiempo restante y si el temporizador está activo. Además, se agregan nuevos estados para controlar el modo actual y el historial de sesiones.

El `useEffect` principal se encarga de la cuenta regresiva, mientras que otro efecto detecta cuando el tiempo llega a cero para cambiar automáticamente entre trabajo y descanso.

### Características del nivel 2

- Modo trabajo.
- Modo descanso.
- Cambio automático entre modos.
- Registro de sesiones completadas.
- Lista visual del historial.
- Reinicio completo del temporizador y sesiones.

---

## Nivel 3: Pomodoro avanzado

El usuario puede modificar la duración del tiempo de trabajo y del tiempo de descanso mediante inputs. También se agrega una barra de progreso que muestra visualmente cuánto ha avanzado la sesión actual.

Además, se guarda el historial de sesiones en `localStorage`, por lo que los datos no se pierden al recargar la página.

También se agregan estadísticas para mostrar el total de sesiones, los minutos trabajados y los minutos descansados.

Otra funcionalidad importante es la opción de guardar sesiones parciales. Esto permite registrar una sesión aunque todavía no haya terminado completamente.

Por último, se agrega un sonido que se reproduce cuando el temporizador llega a cero.

En este nivel se utiliza `useState` para manejar el tiempo, el modo, las sesiones, los minutos personalizados de trabajo y descanso. También se usa `useEffect` para manejar la cuenta regresiva, cambiar de modo, sincronizar los inputs, reproducir sonido y guardar las sesiones en el navegador.

### Características del nivel 3

- Tiempo de trabajo configurable.
- Tiempo de descanso configurable.
- Barra de progreso.
- Sonido al finalizar una sesión.
- Historial de sesiones.
- Sesiones parciales.
- Estadísticas generales.
- Persistencia de datos con `localStorage`.

---

## Uso de hooks en el proyecto

Este proyecto utiliza hooks de React para manejar la lógica del temporizador.

### useState

`useState` se utiliza para guardar datos que cambian en la aplicación.

En este proyecto se usa para manejar:

- El tiempo restante.
- Si el temporizador está activo o pausado.
- El modo actual, ya sea trabajo o descanso.
- El historial de sesiones.
- Los minutos configurables de trabajo.
- Los minutos configurables de descanso.

El useStates es para actualizar la interfaz automaticamente
### useEffect

useEffect es para ejecutar acciones cuando cambia algún estado.

En este proyecto se usa para:

- Hacer que el temporizador disminuya cada segundo.
- Detectar cuando el tiempo llega a cero.
- Cambiar automáticamente entre trabajo y descanso.
- Actualizar el tiempo cuando el usuario cambia la duración.
- Reproducir sonido al finalizar una sesión.
- Guardar las sesiones en `localStorage`.

Entonces useEfecct deja que se cambien las acciones según el estado
### useRef

useRef se utiliza para guardar la referencia del intervalo creado por el temporizador.

Esto permite detener y limpiar correctamente el intervalo cuando sea necesario.

Se usa useRef porque la referencia del intervalo no necesita mostrarse en pantalla ni causar una actualización visual.

---

## Persistencia con localStorage

En el nivel avanzado se utiliza `localStorage` para guardar el historial de sesiones.

Esto permite que las sesiones completadas permanezcan guardadas aunque el usuario recargue la página.

Cuando la aplicación inicia, revisa si existen sesiones guardadas en el navegador. Si existen, las carga automáticamente. Si no existen, empieza con un historial vacío.

---

## Instalación y ejecución

Para ejecutar este proyecto localmente, sigue estos pasos:

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Entrar a la carpeta del proyecto

```bash
cd nombre-del-proyecto
```

### 3. Instalar dependencias

Con npm:

```bash
npm install
```

Con bun:

```bash
bun install
```

### 4. Ejecutar el proyecto

Con npm:

```bash
npm run dev
```

Con bun:

```bash
bun run dev
```

### 5. Abrir en el navegador

Normalmente el proyecto se ejecuta en:

```txt
http://localhost:5173
```
## Link del Video
https://youtu.be/e_2PjB0JUec