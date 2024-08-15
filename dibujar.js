// Obtener referencias a los elementos
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const shapeSelect = document.getElementById('shape');
const rotateButton = document.getElementById('rotate');
const scaleSlider = document.getElementById('scale');
const clearButton = document.getElementById('clear');
const moveLeftButton = document.getElementById('moveLeft');
const moveRightButton = document.getElementById('moveRight');
const moveUpButton = document.getElementById('moveUp');
const moveDownButton = document.getElementById('moveDown');

let currentShape = 'rectangle';
let shapes = [];
let selectedShapeIndex = null;

// Manejar la selección de formas
shapeSelect.addEventListener('change', (e) => {
    currentShape = e.target.value;
});

// Manejar el clic en el canvas para dibujar formas
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Comprobar si se hizo clic en una figura existente para seleccionarla
    selectedShapeIndex = null;
    for (let i = shapes.length - 1; i >= 0; i--) {
        if (isPointInShape(x, y, shapes[i])) {
            selectedShapeIndex = i;
            scaleSlider.value = shapes[i].scale; // Sincronizar el slider con la escala de la figura seleccionada
            break;
        }
    }

    // Si no se seleccionó ninguna figura, agregar una nueva
    if (selectedShapeIndex === null) {
        let shape;
        if (currentShape === 'rectangle') {
            shape = { type: 'rectangle', x, y, width: 100, height: 50, rotation: 0, scale: 1 };
        } else if (currentShape === 'circle') {
            shape = { type: 'circle', x, y, radius: 50, rotation: 0, scale: 1 };
        } else if (currentShape === 'triangle') {
            shape = { type: 'triangle', x, y, width: 100, height: 100, rotation: 0, scale: 1 };
        } else if (currentShape === 'star') {
            shape = { type: 'star', x, y, spikes: 5, outerRadius: 50, innerRadius: 25, rotation: 0, scale: 1 };
        }
        shapes.push(shape);
        selectedShapeIndex = shapes.length - 1;
    }
    drawShapes();
});

// Función para comprobar si un punto está dentro de una figura
function isPointInShape(x, y, shape) {
    ctx.save();
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.rotation);
    ctx.scale(shape.scale, shape.scale);
    ctx.beginPath();
    let isInShape = false;

    if (shape.type === 'rectangle') {
        ctx.rect(-shape.width / 2, -shape.height / 2, shape.width, shape.height);
        isInShape = ctx.isPointInPath(x - shape.x, y - shape.y);
    } else if (shape.type === 'circle') {
        ctx.arc(0, 0, shape.radius, 0, Math.PI * 2);
        isInShape = ctx.isPointInPath(x - shape.x, y - shape.y);
    } else if (shape.type === 'triangle') {
        ctx.moveTo(0, -shape.height / 2);
        ctx.lineTo(-shape.width / 2, shape.height / 2);
        ctx.lineTo(shape.width / 2, shape.height / 2);
        ctx.closePath();
        isInShape = ctx.isPointInPath(x - shape.x, y - shape.y);
    } else if (shape.type === 'star') {
        const spikes = shape.spikes;
        const outerRadius = shape.outerRadius;
        const innerRadius = shape.innerRadius;
        let rot = Math.PI / 2 * 3;
        let posX = 0;
        let posY = 0;
        let step = Math.PI / spikes;

        ctx.moveTo(0, -outerRadius);
        for (let i = 0; i < spikes; i++) {
            posX = Math.cos(rot) * outerRadius;
            posY = Math.sin(rot) * outerRadius;
            ctx.lineTo(posX, posY);
            rot += step;

            posX = Math.cos(rot) * innerRadius;
            posY = Math.sin(rot) * innerRadius;
            ctx.lineTo(posX, posY);
            rot += step;
        }
        ctx.closePath();
        isInShape = ctx.isPointInPath(x - shape.x, y - shape.y);
    }

    ctx.restore();
    return isInShape;
}

// Función para dibujar todas las formas en el canvas
function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape, index) => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.scale(shape.scale, shape.scale);

        ctx.beginPath();
        if (shape.type === 'rectangle') {
            ctx.rect(-shape.width / 2, -shape.height / 2, shape.width, shape.height);
        } else if (shape.type === 'circle') {
            ctx.arc(0, 0, shape.radius, 0, Math.PI * 2);
        } else if (shape.type === 'triangle') {
            ctx.moveTo(0, -shape.height / 2);
            ctx.lineTo(-shape.width / 2, shape.height / 2);
            ctx.lineTo(shape.width / 2, shape.height / 2);
            ctx.closePath();
        } else if (shape.type === 'star') {
            const spikes = shape.spikes;
            const outerRadius = shape.outerRadius;
            const innerRadius = shape.innerRadius;
            let rot = Math.PI / 2 * 3;
            let x = 0;
            let y = 0;
            let step = Math.PI / spikes;

            ctx.moveTo(0, -outerRadius);
            for (let i = 0; i < spikes; i++) {
                x = Math.cos(rot) * outerRadius;
                y = Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;

                x = Math.cos(rot) * innerRadius;
                y = Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }
            ctx.closePath();
        }

        ctx.fillStyle = 'rgba(252, 75, 8, 0.3)';
        ctx.fill();
        ctx.strokeStyle = index === selectedShapeIndex ? 'red' : 'black';
        ctx.stroke();

        ctx.restore();
    });
}

// Manejar el botón de limpiar
clearButton.addEventListener('click', () => {
    shapes = [];
    selectedShapeIndex = null;
    drawShapes();
});
