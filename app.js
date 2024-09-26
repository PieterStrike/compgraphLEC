// Wait for the page to load
window.onload = function() {
    const canvas = document.getElementById('glCanvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser may not support it.');
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vsSource = `
        attribute vec4 aVertexPosition;
        void main() {
            gl_Position = aVertexPosition;
        }
    `;

    let fsSource = `
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `;

    let shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [];
    for (let i = 0; i < 360; i++) {
        const angle = i * Math.PI / 180;
        positions.push(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5);
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);

    gl.useProgram(shaderProgram);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, positions.length / 2);

    document.getElementById('merah').addEventListener('click', function() {
        fsSource = `
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `;
        shaderProgram = initShaderProgram(gl, vsSource, fsSource);
        gl.useProgram(shaderProgram);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, positions.length / 2);
    });

    document.getElementById('hijau').addEventListener('click', function() {
        fsSource = `
            void main() {
                gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
            }
        `;
        shaderProgram = initShaderProgram(gl, vsSource, fsSource);
        gl.useProgram(shaderProgram);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, positions.length / 2);
    });

    document.getElementById('biru').addEventListener('click', function() {
        fsSource = `
            void main() {
                gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
            }
        `;
        shaderProgram = initShaderProgram(gl, vsSource, fsSource);
        gl.useProgram(shaderProgram );
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, positions.length / 2);
    });

    document.getElementById('reset').addEventListener('click', function() {
        fsSource = `
            void main() {
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
        `;
        shaderProgram = initShaderProgram(gl, vsSource, fsSource);
        gl.useProgram(shaderProgram);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, positions.length / 2);
    });
};

function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}
