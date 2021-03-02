function app(canvas, Delaunay, window) {
    function debounce(interval, fn) {
        let prev = Date.now();
        let desc = null;
        return (...args) => {
            const next = Date.now();
            const diff = next - prev;
            prev = next;
            clearTimeout(desc);

            if (diff < interval) {
                desc = setTimeout(() => fn(...args), interval);
                return;
            }

            fn(...args);
        };
    }

    function keepInside(l, x, r) {
        const delta = (x < l)
            ? r
            : (x > r)
                ? -r
                : 0;
        return x + delta;
    }

    const createUpdater = ({getSizeInfo, context}) => (particles, cursor) => {
        const {width, height} = getSizeInfo();
        const scaledParticles = particles.map(([x, y, ...tail]) => ([
            (x * width),
            (y * height),
            ...tail,
        ]));
        const delaunay = new Delaunay.from(scaledParticles);
        const voronoi = delaunay.voronoi([0.5, 0.5, width - 0.5, height - 0.5]);

        // context.clearRect(0, 0, width, height);

        context.fillStyle = "#402e21";
        context.fillRect(0, 0, width, height);

        context.beginPath();
        voronoi.render(context);
        voronoi.renderBounds(context);
        context.strokeStyle = "#75543c";
        context.stroke();

        context.beginPath();
        delaunay.renderPoints(context);
        context.fillStyle = "#fff";
        context.fill();

        const cells = Array.from(voronoi.cellPolygons());
        context.beginPath();
        cells[0].forEach(([x, y]) => context.lineTo(x, y));
        context.closePath();
        context.fillStyle = "#75543c";
        context.fill();
    };

    function setupCanvasSize(canvas, context, getSizeInfo) {
        const {scale, width, height} = getSizeInfo();
        // Set display size (css pixels).
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        // Set actual size in memory (scaled to account for extra pixel density).
        canvas.width = width * scale;
        canvas.height = height * scale;

        // scale draw context
        context.scale(scale, scale);
    }

    function getSizeInfo() {
        return {
            height: window.innerHeight,
            width: window.innerWidth,
            scale: window.devicePixelRatio,
        };
    }

    return {
        run() {
            const n = 128;
            const context = canvas.getContext("2d", {alpha: false});
            const particles = Array.from({length: n}, () => [Math.random(), Math.random(), 0, 0]);

            const randomWalk = (ref) => {
                ref[0] = keepInside(0, ref[0] + ref[2], 1);
                ref[1] = keepInside(0, ref[1] + ref[3], 1);

                const randX = 0.00003 * (Math.random() - 0.5);
                const randY = 0.00003 * (Math.random() - 0.5);
                ref[2] += randX - 0.005 * ref[2];
                ref[3] += randY - 0.005 * ref[3];
                return ref;
            };

            setupCanvasSize(canvas, context, getSizeInfo);

            const update = createUpdater({context, getSizeInfo});

            let cursor = [0, 0];
            canvas.ontouchmove = canvas.onmousemove = (event) => {
                event.preventDefault();
                cursor = [event.layerX, event.layerY];
            };

            // let evenFrame = true;
            window.requestAnimationFrame(function step() {
                const {width, height} = getSizeInfo();
                const [x, y] = cursor;
                if (x + y > 0) {
                    particles[0] = [x / width, y / height, 0, 0];
                }
                particles.forEach(randomWalk);
                update(particles, cursor);
                // evenFrame = !evenFrame;
                // if (evenFrame) {
                // }
                window.requestAnimationFrame(step);
            });

            window.addEventListener(
                'resize',
                debounce(300, () => setupCanvasSize(canvas, context, getSizeInfo)),
                false
            );
        }
    };
}