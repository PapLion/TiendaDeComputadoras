//Establecemos q la sección actual es la numero 0; Si la sección actual pasa a ser mayor a 0 se lo toma como si estuvieramos bajando, y si es menor a 0 se lo toma como si estuvieramos subiendo
let currentSection = 0;

        //Como el codigo es exclusivamente para movernos entre secciones llamamos a seleccionar a todos los sections
        const sections = document.querySelectorAll("section");

        //Agregamos un escuchador de eventos "wheel" para saber cuando el usuario usa el scroll y dentro creamos una funcion que verifica la condición q planteamos anteriormente;
        window.addEventListener("wheel", function (event) {
            if (event.deltaY > 0) {
                // Scroll hacia abajo
                moveDown();
            } else {
                // Scroll hacia arriba
                moveTop();
            }
        });

        //Funciones para movernos entre secciones
        function moveDown() {
            if (currentSection < sections.length - 1) {
                currentSection++;
                sections[currentSection].scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }

        function moveTop() {
            if (currentSection > 0) {
                currentSection--;
                sections[currentSection].scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
