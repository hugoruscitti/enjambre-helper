VERSION=$(shell git describe --tags)
NOMBRE="enjambre-helper"

N=[0m
G=[01;32m
Y=[01;33m
B=[01;34m


comandos:
	@echo ""
	@echo "${B}Comandos disponibles para ${Y}${NOMBRE}${N} (versión: ${VERSION})"
	@echo ""
	@echo "  ${Y}Generales de la aplicación${N}"
	@echo ""
	@echo "    ${G}iniciar${N}           Instala todas las dependencias."
	@echo "    ${G}ejecutar${N}          Ejecuta la aplicación de forma local."
	@echo "    ${G}test${N}              Ejecuta los tests."
	@echo "    ${G}version${N}           Incrementa la versión y ejecuta el deploy en circle.ci"
	@echo "    ${G}lanzar${N}            Ejecuta la aplicación de forma nativa."
	@echo ""


iniciar:
	yarn install

test:
	yarn test

ejecutar:
	yarn start

compilar:
	yarn compilar

lanzar:
	yarn lanzar

version:
	yarn release
