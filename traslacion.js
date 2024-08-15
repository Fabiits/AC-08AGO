
        		// Manejar los botones de traslado
		moveLeftButton.addEventListener('click', () => {
			if (selectedShapeIndex !== null) {
				shapes[selectedShapeIndex].x -= 10;
				drawShapes();
			}
		});

		moveRightButton.addEventListener('click', () => {
			if (selectedShapeIndex !== null) {
				shapes[selectedShapeIndex].x += 10;
				drawShapes();
			}
		});

		moveUpButton.addEventListener('click', () => {
			if (selectedShapeIndex !== null) {
				shapes[selectedShapeIndex].y -= 10;
				drawShapes();
			}
		});

		moveDownButton.addEventListener('click', () => {
			if (selectedShapeIndex !== null) {
				shapes[selectedShapeIndex].y += 10;
				drawShapes();
			}
		});