// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const starfield = document.getElementById('starfield');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    starfield.appendChild(canvas);

    const stars = 1000; // Number of stars in the starfield
    const starArray = [];

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * canvas.width;
            this.o = '0.' + Math.floor(Math.random() * 99) + 1;
        }

        move() {
            this.z -= 0.2;
            if (this.z <= 0) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = canvas.width;
            }
        }

        show() {
            let x, y, rad;
            x = (this.x - canvas.width / 2) * (canvas.width / this.z);
            x = x + canvas.width / 2;
            y = (this.y - canvas.height / 2) * (canvas.width / this.z);
            y = y + canvas.height / 2;
            rad = canvas.width / this.z;

            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 255, 255, ' + this.o + ')';
            ctx.arc(x, y, rad, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create star objects and push them into the starArray
    for (let i = 0; i < stars; i++) {
        starArray.push(new Star());
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trail effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        starArray.forEach(star => {
            star.move();
            star.show();
        });
    }

    animate();

    // Event to resize the canvas when the window is resized
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});