document.addEventListener('DOMContentLoaded', function () {
  // Baselines for cube rotation
  var rotations = {
    x : 0.01,
    y : 0.01,
    z : 0.01,
    cubes : 0.1
  };

  ['x', 'y', 'z', 'cubes'].forEach(function (axis) {
    var input = document.getElementById('rotate-' + axis);
    input.value = rotations[axis];

    // Debounce, only changing after a short time
    var timer;
    input.addEventListener('change', function (e) {
      // If we're already pending, reset
      if (timer) { clearTimeout(timer); }

      // Set our new timer to update axis rotation
      // in roughly a quarter-second, clearing out
      // the timer value when it happens.
      timer = setTimeout(function () {
        rotations[axis] = parseFloat(input.value);
        timer = null;
      }, 250);
    });
  });

  // ThreeJS stuff
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('canvas').appendChild(renderer.domElement);

  var x, y, z;
  var count = 5;
  var cubes = [];

  // Magical ratios determined by dorking around in console
  camera.position.x = count * 0.8;
  camera.position.y = count * 0.8;
  camera.position.z = 4 * count;

  var geometry, material, color, cube;

  /*
  var axisHelper = new THREE.AxisHelper(10 * count);
  scene.add(axisHelper);
  */

  // Cube of Cubes!
  var cubeOfCubes = new THREE.Object3D();

  // Eww
  for (x = 0; x < count; x++) {
    for (y = 0; y < count; y++) {
      for (z = 0; z < count; z++) {
        geometry = new THREE.BoxGeometry(1, 1, 1);
        color = new THREE.Color(x/count, y/count, z/count);
        material = new THREE.MeshLambertMaterial({
          color: color
        });

        cube = new THREE.Mesh(geometry, material);
        cube.position.x = x * 2;
        cube.position.y = y * 2;
        cube.position.z = z * 2;

        cubes.push(cube);

        //scene.add(cube);
        cubeOfCubes.add(cube);
      }
    }
  }
  scene.add(cubeOfCubes);

  // Light
  // All light are things I've seen used in other demos,
  // and I have no idea what I'm doing here.
  var ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  // directional lighting
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(10, 10, 10).normalize();
  scene.add(directionalLight);

  var directionalLight2 = new THREE.DirectionalLight(0xffffff);
  directionalLight2.position.set(-10, -10, -10).normalize();
  scene.add(directionalLight2);

  /*
  var pointLight = new THREE.PointLight(0xffffff, 1, 100);
  scene.add(pointLight);

  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( -40, 60, -10 );
  scene.add( spotLight );
  */

  window.renderer = renderer;
  window.scene = scene;
  window.camera = camera;
  window.cubes = cubes;
  window.cubeOfCubes = cubeOfCubes;

  var render = function () {
    requestAnimationFrame(render);

    // Rotate the individuals
    var cube;
    for (var i = 0, l = cubes.length; i < l; i++) {
      cube = cubes[i];
      cube.rotation.x += rotations.cubes;
      cube.rotation.y += rotations.cubes;
      cube.rotation.z += rotations.cubes;
    }

    cubeOfCubes.rotation.x += rotations.x;
    cubeOfCubes.rotation.y += rotations.y;
    cubeOfCubes.rotation.z += rotations.z;

    renderer.render(scene, camera);
  };

  render();
});
