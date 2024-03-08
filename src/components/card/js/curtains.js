import { Curtains, Plane, Vec2 } from "curtainsjs";

window.addEventListener("load", () => {
  // track the mouse positions to send it to the shaders
  const mousePosition = new Vec2();

  // mouse movement strength/delta
  const deltas = {
    max: 0,
    applied: 0,
  };

  // set up our WebGL context and append the canvas to our wrapper
  const curtain = new Curtains({
    container: "curtain",
    watchScroll: true,
    pixelRatio: Math.min(1.5, window.devicePixelRatio), // limit pixel ratio for performance
  });

  // handling errors
  curtain
    .onError(() => {
      // we will add a class to the document body to display original content
      document.body.classList.add("no-curtains");
    })
    .onContextLost(() => {
      // on context lost, try to restore the context
      curtain.restoreContext();
    });

  // get our plane element
  const planeElements = document.getElementsByClassName("curtains-plane");

  // some basic parameters
  const params = {
    vertexShader,
    fragmentShader,
    widthSegments: 20,
    heightSegments: 20,
    uniforms: {
      time: {
        // time uniform that will be updated at each draw call
        name: "uTime",
        type: "1f",
        value: 0,
      },
      mousePosition: {
        // our mouse position
        name: "uMousePosition",
        type: "2f", // again an array of floats
        value: new Vec2(),
      },
      mouseMoveStrength: {
        // the mouse move strength
        name: "uMouseMoveStrength",
        type: "1f",
        value: 0,
      },
    },
  };

  [...planeElements].forEach(registerPlane);

  window.addEventListener("mousemove", handleMovement);
  window.addEventListener("touchmove", handleMovement, { passive: true });

  // if there has been an error during init, simplePlane will be null
  function registerPlane(planeElement) {
    const plane = new Plane(curtain, planeElement, params);

    plane
      .onReady(() => {
        // set a fov of 35 to reduce perspective (we could have used the fov init parameter)
        plane.setPerspective(35);
      })
      .onRender(() => {
        // increment our time uniform
        plane.uniforms.time.value++;

        // decrease both deltas by damping : if the user doesn't move the mouse, effect will fade away
        deltas.applied += (deltas.max - deltas.applied) * 0.02;
        deltas.max += (0 - deltas.max) * 0.01;

        // send the new mouse move strength value
        plane.uniforms.mouseMoveStrength.value = deltas.applied;

        plane.uniforms.mousePosition.value =
          plane.mouseToPlaneCoords(mousePosition);
      })
      .onError(() => {
        // we will add a class to the document body to display original images
        document.body.classList.add("no-curtains");
      });
  }

  // handle the mouse move event
  function handleMovement(e) {
    // update mouse last pos
    const mouseLastPosition = new Vec2();
    mouseLastPosition.copy(mousePosition);

    const mouse = new Vec2();

    // touch event
    if (e.targetTouches) {
      mouse.set(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    }
    // mouse event
    else {
      mouse.set(e.clientX, e.clientY);
    }

    // lerp the mouse position a bit to smoothen the overall effect
    mousePosition.set(
      curtain.lerp(mousePosition.x, mouse.x, 0.3),
      curtain.lerp(mousePosition.y, mouse.y, 0.3)
    );

    // calculate the mouse move strength
    if (mouseLastPosition.x && mouseLastPosition.y) {
      let delta =
        Math.sqrt(
          Math.pow(mousePosition.x - mouseLastPosition.x, 2) +
            Math.pow(mousePosition.y - mouseLastPosition.y, 2)
        ) / 30;
      delta = Math.min(4, delta);
      // update max delta only if it increased
      if (delta >= deltas.max) {
        deltas.max = delta;
      }
    }
  }
});

const vertexShader = `
precision mediump float;

// default mandatory variables
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

// our texture matrix uniform
uniform mat4 simplePlaneTextureMatrix;

// custom variables
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

uniform float uTime;

uniform vec2 uMousePosition;
uniform float uMouseMoveStrength;


void main() {
    vec3 vertexPosition = aVertexPosition;

    // get the distance between our vertex and the mouse position
    float distanceFromMouse = distance(uMousePosition, vec2(vertexPosition.x, vertexPosition.y));

    // calculate our wave effect
    float waveSinusoid = cos(5.0 * (distanceFromMouse - (uTime / 75.0)));

    // attenuate the effect based on mouse distance
    float distanceStrength = (0.4 / (distanceFromMouse + 0.4));

    // calculate our distortion effect
    float distortionEffect = distanceStrength * waveSinusoid * uMouseMoveStrength;

    // apply it to our vertex position
    vertexPosition.z += distortionEffect / 30.0;
    vertexPosition.x += (distortionEffect / 30.0 * (uMousePosition.x - vertexPosition.x));
    vertexPosition.y += distortionEffect / 30.0 * (uMousePosition.y - vertexPosition.y);

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

    // varyings
    vTextureCoord = (simplePlaneTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
    vVertexPosition = vertexPosition;
}`;

const fragmentShader = `
precision mediump float;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

uniform sampler2D simplePlaneTexture;

void main() {
    // apply our texture
    vec4 finalColor = texture2D(simplePlaneTexture, vTextureCoord);

    // fake shadows based on vertex position along Z axis
    finalColor.rgb -= clamp(-vVertexPosition.z, 0.0, 1.0);
    // fake lights based on vertex position along Z axis
    finalColor.rgb += clamp(vVertexPosition.z, 0.0, 1.0);

    // handling premultiplied alpha (useful if we were using a png with transparency)
    finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);

    gl_FragColor = finalColor;
}`;
