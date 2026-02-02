export function initMouseInteraction() {
    const shapes = document.querySelectorAll(".floating-shape");

    if (shapes.length === 0) return () => {};

    const shapePositions = new Map();

    shapes.forEach((shape) => {
        const computedStyle = getComputedStyle(shape);
        const rect = shape.getBoundingClientRect();
        const topValue = computedStyle.top;
        const leftValue = computedStyle.left;
        const rightValue = computedStyle.right;

        let x, y;

        if (leftValue && leftValue !== "auto") {
            x = (parseFloat(leftValue.replace("%", "")) * window.innerWidth) / 100;
        } else if (rightValue && rightValue !== "auto") {
            x = window.innerWidth - (parseFloat(rightValue.replace("%", "")) * window.innerWidth) / 100 - rect.width;
        } else {
            x = rect.left;
        }

        if (topValue && topValue !== "auto") {
            y = (parseFloat(topValue.replace("%", "")) * window.innerHeight) / 100;
        } else {
            y = rect.top;
        }

        shapePositions.set(shape, { x, y });

        shape.style.position = "fixed";
        shape.style.left = `${x}px`;
        shape.style.top = `${y}px`;
        shape.style.right = "auto";
    });

    function handleMouseMove(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        shapes.forEach((shape) => {
            const currentPos = shapePositions.get(shape);
            const rect = shape.getBoundingClientRect();
            const shapeCenterX = rect.left + rect.width / 2;
            const shapeCenterY = rect.top + rect.height / 2;

            const deltaX = mouseX - shapeCenterX;
            const deltaY = mouseY - shapeCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            const threshold = 120;

            if (distance < threshold) {
                const force = (threshold - distance) / threshold;
                const pushStrength = 2;
                const pushX = -deltaX * force * pushStrength;
                const pushY = -deltaY * force * pushStrength;

                currentPos.x += pushX;
                currentPos.y += pushY;

                const padding = 50;
                currentPos.x = Math.max(padding, Math.min(window.innerWidth - rect.width - padding, currentPos.x));
                currentPos.y = Math.max(padding, Math.min(window.innerHeight - rect.height - padding, currentPos.y));

                shape.style.left = `${currentPos.x}px`;
                shape.style.top = `${currentPos.y}px`;
                shape.style.transition = "left 0.1s ease-out, top 0.1s ease-out";
            }
        });
    }

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
        document.removeEventListener("mousemove", handleMouseMove);
    };
}
