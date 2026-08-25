import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

class GlbSpin extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    this.style.display = 'flex';
    this.style.alignItems = 'center';
    this.style.justifyContent = 'center';
    this.style.width = '100%';
    this.style.height = '100%';
    requestAnimationFrame(() => this._start());
  }
  _start() {
    const w = this.clientWidth || (this.parentElement && this.parentElement.clientWidth) || 300;
    const h = this.clientHeight || (this.parentElement && this.parentElement.clientHeight) || 380;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.style.display = 'block';
    this.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.5;
    const cam = new THREE.PerspectiveCamera(30, w / h, 0.01, 10);
    const key = new THREE.DirectionalLight(0xffffff, 0.95);
    key.position.set(1.5, 2, 2.5);
    scene.add(key, new THREE.AmbientLight(0xffffff, 0.28));
    new GLTFLoader().load(this.getAttribute('src'), (g) => {
      const obj = g.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const c = box.getCenter(new THREE.Vector3()), s = box.getSize(new THREE.Vector3());
      obj.position.sub(c);
      const pivot = new THREE.Group();
      pivot.add(obj);
      scene.add(pivot);
      const maxD = Math.max(s.x, s.y, s.z);
      cam.position.set(0, maxD * 0.1, maxD * 2.55);
      cam.lookAt(0, 0, 0);
      this._pivot = pivot;
    });
    const tick = () => {
      this._raf = requestAnimationFrame(tick);
      if (this._pivot) this._pivot.rotation.y += 0.011;
      renderer.render(scene, cam);
    };
    tick();
    this._cleanup = () => { cancelAnimationFrame(this._raf); renderer.dispose(); };
  }
  disconnectedCallback() {
    if (this._cleanup) this._cleanup();
    this._init = false;
    this.textContent = '';
  }
}
if (!customElements.get('glb-spin')) customElements.define('glb-spin', GlbSpin);
