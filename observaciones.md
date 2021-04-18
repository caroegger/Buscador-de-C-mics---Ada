Querida Caro, 

Felicitaciones por tan hermoso trabajo. Me impresiona el nivel de detalle y atencion que pusiste en el maquetado: es dificil distinguir tu web del modelo a primera vista. Se que el tiempo no estuvo de tu lado en este TP y me alegra que hayas priorizado entregar un trabajo funcional a agregar funcionalidades que no pudiste terminar y que quedaran a medias. 

A nivel visual, tu web se ve impecable. Como siempre, la calidad con la que maquetas y haces las webs hablan de un nivel de compromiso y talento muy por encima de lo que tu experiencia sugiere. El unico comentario que te haria es que el responsive no funciona bien en celulares chicos (tenes la famosa barra blanca en el lateral). En este caso, es porque la imagen-info-comic tiene un max-width: 350px y un margin-right: 50px: es decir, la suma de 400px es mas grande que los celulares mas pequeños. Te recomiendo arreglar eso. 
En components la idea es poner un archivo de scss por componente, es decir: uno para el footer, uno para el header, uno para las tarjetas, uno para detalle del personaje, etc. 

A nivel comportamiento, hay varias cositas que faltan, pero insisto en que al privilegiar entregarme algo funcional, esta falta no se siente a menos que estemos buscandolas. Me parece bien esta decision si queres compartir este trabajo (deberias compartirlo en tus redes y agregarlo a tu portfolio!). Algunas de las cosas que noto que se deberian arreglar son:

- En la descripcion del comic, si la descripcion es faltante aparece como "null". Fijate de anticipar estos faltantes en la API con la logica del tipo: si no hay descripcion, entonces agrego un `<p>` que diga "no hay descripcion", etc. 
- La seccion de detalle de un personaje tiene muchos faltantes. 
- No se ven los personajes en el detalle de un comic, ni los comics en el detalle de un personaje. Esto implica otro fetch, y era uno de los puntos mas ambiciosos del TP: te recomendaria encararlo cuando tengas tiempo ya que vas a aprender mucho haciendolo.
- Si me meto al detalle de un comic, luego al de un personaje, voy a ver ambos detalles. Estas secciones deberian ocultarse a medida que aparecen otras. 
- Los botones de "prox pagina" siguen estando en el detalle de un personaje o de un comic, y si los oprimo voy a ver la busqueda ademas del detalle. 

No se bien si comentarte una o varias de estas cosas en mas detalle. Tengo entendido que lo que te faltó fue tiempo, y no que no pudieras hacer estas cosas, pero en caso de que hayas tenido una traba de tipo tecnico para poder resolver estas cosas, no dejes de consultarme. 

A nivel codigo, 

Tu HTML esta muy bien. Usas buen las etiquetas semanticas, la accesibilidad esta aceptable. Usaste bien las clases. Noto quiza cierta dependencia de algunas soluciones del maquetado de Ada. Usas correctamente SASS, hay muy buena aplicacion de las variables, mixins y anidados, y demostras haber comprendido bien como usarlo. La arquitectura esta muy bien, auque quiza hubiese preferido que estuviera todo dentro de una carpeta /styles. 

Tu JS esta muy bien. Usas correctamente los conocimientos vistos a lo largo del modulo, tu codigo en general es prolijo y bien funcionalizado. 

Con respecto a tu github, celebro que hayas ido trabajando correctamente commit a commit y que tengas varias branches. Quiza quieras mencionar tambien que el usuario va a tener que tener LiveServer para ejecutarlo en local. 

Tengo que ponerte una nota "no tan buena", a pesar de que tu codigo esta excelente, por las funcionalidades que faltan. Pero la calidad de tu codigo es altisima: tengo en claro que lo que te limita es la falta de tiempo y no de talento, ganas o capacidad. Felicitaciones nuevamente por este hermoso trabajo. 

 
  ✔️ Respeta la consigna
  ✅ Respeta el diseño dado
  ✔️ Respeta el funcionamiento
  ✔️ Responsive funciona correctamente

  ✅ HTML semántico
  ✅ Código bien indentado
  ✅ Buenos nombres de clases
  ✅ Buenos nombres de funciones y variables
  ✅ Uso de variables (SASS)

  ✅  Buena estructura y separación de archivos (SASS)
  ✅ Correcto uso de estilos anidados (SASS)
  ✅  Nombres de branchs adecuados

  ✔️ Componentización de estilos (SASS)
  ✅ Funciones pequeñas
  ✅ Lógica clara y simple
  ✅ Separación clara de manejo de datos y visualización

  ✅ Reutilización de lógica / funciones
  ✅ Commits con mensajes adecuados
  ✅ Un PR por funcionalidad, fix o mejora
  ✅ PRs con buenos títulos

Nota final: **7**
