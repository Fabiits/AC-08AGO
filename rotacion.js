		// Manejar la rotación de la figura seleccionada
		rotateButton.addEventListener('click', () => {
			if (selectedShapeIndex !== null) {
				shapes[selectedShapeIndex].rotation += Math.PI / 4; // Rotar 45 grados
				drawShapes();
			}
		});