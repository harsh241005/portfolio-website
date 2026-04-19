document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Data-like particle clouds
    const geometry = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const color1 = new THREE.Color(0x3b82f6); // Accent 1 Blue
    const color2 = new THREE.Color(0x8b5cf6); // Accent 2 Purple
    const color3 = new THREE.Color(0xeeeeee); // Data white

    for (let i = 0; i < count; i++) {
        // Random point on a sphere surface or inside
        // Let's create a dual structure - an outer sphere and an inner nucleus
        let radius, theta, phi;
        
        if (Math.random() > 0.3) {
            // Outer network
            radius = 3.5 + Math.random() * 2;
        } else {
            // Inner core
            radius = Math.random() * 2;
        }

        theta = Math.random() * 2 * Math.PI;
        phi = Math.acos(Math.random() * 2 - 1);
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        positions[i*3] = x;
        positions[i*3+1] = y;
        positions[i*3+2] = z;

        // Mix colors
        let mixedColor;
        const randColor = Math.random();
        if (randColor < 0.4) mixedColor = color1;
        else if (randColor < 0.8) mixedColor = color2;
        else mixedColor = color3;

        colors[i*3] = mixedColor.r;
        colors[i*3+1] = mixedColor.g;
        colors[i*3+2] = mixedColor.b;
        
        sizes[i] = Math.random() * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader for point size based on depth or custom attribute might be needed 
    // but PointsMaterial works fine generally.
    const material = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Analytical connections (Wireframe globe/network)
    const sphereGeometry = new THREE.IcosahedronGeometry(4, 2);
    const wireframe = new THREE.LineSegments(
        new THREE.WireframeGeometry(sphereGeometry),
        new THREE.LineBasicMaterial({ 
            color: 0x3b82f6, 
            transparent: true, 
            opacity: 0.08,
            blending: THREE.AdditiveBlending
        })
    );
    scene.add(wireframe);
    
    const innerSphereGeo = new THREE.IcosahedronGeometry(2, 1);
    const innerWireframe = new THREE.LineSegments(
        new THREE.WireframeGeometry(innerSphereGeo),
        new THREE.LineBasicMaterial({
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        })
    );
    scene.add(innerWireframe);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();

        // Slow rotation of the particle system
        particles.rotation.y = elapsedTime * 0.05;
        particles.rotation.z = elapsedTime * 0.02;

        wireframe.rotation.y = elapsedTime * -0.03;
        wireframe.rotation.x = elapsedTime * 0.02;

        innerWireframe.rotation.y = elapsedTime * 0.06;
        innerWireframe.rotation.z = elapsedTime * -0.04;

        // Make particles slightly undulate
        const positions = particles.geometry.attributes.position.array;
        for(let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Add slight movement on the y axis based on time and their x pos
            const x = positions[i3];
            // We'll leave this out to keep it performant, rely on rotation
        }

        // Mouse Parallax effect
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        particles.rotation.x += 0.05 * (targetY - particles.rotation.x);
        particles.rotation.y += 0.05 * (targetX - particles.rotation.y);

        camera.position.x += (mouseX * 0.002 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.002 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    
    animate();
});
