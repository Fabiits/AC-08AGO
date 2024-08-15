		// Manejar el escalado de la figura seleccionada
		scaleSlider.addEventListener('input', () => {
			if (selectedShapeIndex !== null) {
				shapes[selectedShapeIndex].scale = parseFloat(scaleSlider.value);
				drawShapes();
			}
		});