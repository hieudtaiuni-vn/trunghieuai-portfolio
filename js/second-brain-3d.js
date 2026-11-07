/**
 * Second Brain 3D Interactive Console (Fullscreen Immersive Engine)
 * Mô hình 3D chi tiết 1 Second Brain & Luồng kết nối dữ liệu với 10 AI Agents đang hoạt động
 * Chiếm toàn màn hình, tối ưu cho máy tính & điện thoại
 * Bảng Agent hiển thị gọn gàng 1 bên với độ trong suốt cao, không che thông tin
 * Kiến trúc sư: Dương Trung Hiếu - Học viện Công nghệ AIUNI
 * Engine: Three.js r128
 */

(function () {
  'use strict';

  // 1. Dữ liệu 10 AI Agents chuyên biệt trong hệ sinh thái
  const AI_AGENTS_DATA = [
    {
      id: "A01",
      name: "AI Strategy & Leadership",
      title: "Điều phối Chiến lược AI & Quản trị",
      icon: "🎯",
      color: "#38bdf8", // Sky blue
      desc: "Hoạch định kiến trúc AI tổng thể, lộ trình ứng dụng GenAI và chuyển đổi số cho cơ quan, trường học và doanh nghiệp.",
      stream: "3.8 GB/s",
      latency: "6 ms",
      protocol: "C-Level Graph / LangGraph",
      link: "#expertise",
      linkText: "Xem Năng Lực Chiến Lược ↗"
    },
    {
      id: "A02",
      name: "Edu-Curriculum 5512",
      title: "Soạn Giáo Án Chuẩn 5512 & Học Liệu",
      icon: "📚",
      color: "#818cf8", // Indigo
      desc: "Tự động hóa xây dựng Kế hoạch bài dạy Chuẩn 5512/BGDĐT, ma trận đặc tả đề thi, phiếu học tập và ngân hàng câu hỏi phân hóa.",
      stream: "4.2 GB/s",
      latency: "9 ms",
      protocol: "Prompt Engineering / GDPT 2018",
      link: "#training",
      linkText: "Xem Khung Đào Tạo GD ↗"
    },
    {
      id: "A03",
      name: "Gov & Public Admin",
      title: "Trợ Lý Hành Chính Công & Đảng Vụ",
      icon: "🏛️",
      color: "#f59e0b", // Amber
      desc: "Hỗ trợ soạn thảo văn bản hành chính theo Nghị định 30/2020/NĐ-CP, báo cáo Đảng vụ, tra cứu TTHC và hỗ trợ Tổ CNS cộng đồng.",
      stream: "2.9 GB/s",
      latency: "8 ms",
      protocol: "Nghị định 30 / Đảng vụ AI",
      link: "#projects",
      linkText: "Xem Dự Án Cơ Quan ↗"
    },
    {
      id: "A04",
      name: "SME Ops & Automation",
      title: "Tự Động Hóa Vận Hành SME Tinh Gọn",
      icon: "⚡",
      color: "#10b981", // Emerald
      desc: "Thiết kế luồng quy trình nghiệp vụ tự động, tích hợp AI vào vận hành bán hàng, quản trị kho vận và tối ưu chi phí doanh nghiệp.",
      stream: "3.5 GB/s",
      latency: "7 ms",
      protocol: "Make / n8n / Webhook RPA",
      link: "#expertise",
      linkText: "Xem Giải Pháp SME ↗"
    },
    {
      id: "A05",
      name: "Legal & AI Compliance",
      title: "Thẩm Định Pháp Lý & Tuân Thủ Luật AI",
      icon: "⚖️",
      color: "#ec4899", // Pink
      desc: "Rà soát điều khoản hợp đồng kinh tế, đánh giá rủi ro pháp lý theo Luật Trí tuệ nhân tạo 2025 và Nghị định 142/2026/NĐ-CP.",
      stream: "2.1 GB/s",
      latency: "11 ms",
      protocol: "Legal AI RAG / Decree 142",
      link: "#projects",
      linkText: "Xem Pháp Lý & Thẩm Định ↗"
    },
    {
      id: "A06",
      name: "Financial & Data Analytics",
      title: "Phân Tích BCTC & Dữ Liệu Kinh Doanh",
      icon: "📊",
      color: "#06b6d4", // Cyan
      desc: "Bóc tách báo cáo tài chính doanh nghiệp, phân tích chỉ số Du-Pont, dòng tiền tự do, định giá DCF và cảnh báo rủi ro vốn.",
      stream: "3.1 GB/s",
      latency: "10 ms",
      protocol: "Du-Pont / DCF / Pandas AI",
      link: "#about",
      linkText: "Xem Nền Tảng Tài Chính ↗"
    },
    {
      id: "A07",
      name: "Customer Care & Zalo Bot",
      title: "Bot Thư Ký SI CSKH & Zalo CRM 24/7",
      icon: "💬",
      color: "#22c55e", // Light Green
      desc: "Tương tác tư vấn bán hàng tự động 24/7, xử lý từ chối và khiếu nại theo khung L.A.S.T & H.E.A.T, đồng bộ CRM Google Sheet.",
      stream: "5.0 GB/s",
      latency: "4 ms",
      protocol: "Zalo OA / TeleBot / Sheet API",
      link: "#projects",
      linkText: "Xem Bot Thư Ký SI ↗"
    },
    {
      id: "A08",
      name: "Media & Press Studio",
      title: "Sáng Tạo Nội Dung & Báo Chí Số",
      icon: "📢",
      color: "#f97316", // Orange
      desc: "Tạo lập thông cáo báo chí, bài truyền thông cổng thông tin điện tử, loa phát thanh địa phương và kịch bản video đa kênh.",
      stream: "3.6 GB/s",
      latency: "8 ms",
      protocol: "Multimodal / Content Engine",
      link: "#press",
      linkText: "Xem 37+ Kênh Báo Chí ↗"
    },
    {
      id: "A09",
      name: "AI Competition Judge",
      title: "Chấm Thi AI & Đánh Giá Rubric Dự Án",
      icon: "🏆",
      color: "#eab308", // Yellow
      desc: "Thiết kế thể lệ cuộc thi Công dân số, ngân hàng tiêu chí Rubric chấm điểm tự động và nhận xét dự án sáng tạo AI của học sinh/sinh viên.",
      stream: "2.4 GB/s",
      latency: "9 ms",
      protocol: "Rubric Scoring Engine v2",
      link: "#projects",
      linkText: "Xem Các Cuộc Thi AI ↗"
    },
    {
      id: "A10",
      name: "Master Thesis & Research",
      title: "Nghiên Cứu Khoa Học & Hội Đồng Luận Văn",
      icon: "🎓",
      color: "#a855f7", // Purple
      desc: "Hỗ trợ xây dựng Map of Content (MOC), quản trị tài liệu nghiên cứu thạc sĩ, biên bản hội đồng và trích dẫn chuẩn học thuật.",
      stream: "2.7 GB/s",
      latency: "12 ms",
      protocol: "Obsidian Second Brain / APA",
      link: "#training",
      linkText: "Xem Đào Tạo Giảng Viên ↗"
    }
  ];

  // Helper tạo Text Sprite 3D sắc nét
  function makeTextSprite(text, color = '#38bdf8', fontSize = 32) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;
    ctx.font = `bold ${fontSize}px Inter, -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
    ctx.shadowBlur = 10;
    ctx.fillText(text.toUpperCase(), 256, 64);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(1.9, 0.48, 1);
    return sprite;
  }

  // 2. Main Initializer
  function initSecondBrain3D() {
    const container = document.getElementById('brain-3d-stage');
    const canvas = document.getElementById('second-brain-canvas');
    if (!container || !canvas || typeof THREE === 'undefined') {
      console.warn('[SecondBrain3D] Container or Three.js missing, aborting 3D initialization.');
      return;
    }

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // A. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Master World Group (cho phép xoay và dịch chuyển toàn cảnh 3D)
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // B. Lighting
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 1.8);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 6, 8);
    scene.add(dirLight);

    const brainCoreLight = new THREE.PointLight(0x38bdf8, 3.2, 14);
    brainCoreLight.position.set(0, 0, 0);
    worldGroup.add(brainCoreLight);

    const backFillLight = new THREE.PointLight(0x818cf8, 2.0, 16);
    backFillLight.position.set(-5, 2, -4);
    worldGroup.add(backFillLight);

    // ==========================================
    // C. MÔ HÌNH 3D CHI TIẾT 1 SECOND BRAIN (CORE)
    // ==========================================
    const brainGroup = new THREE.Group();
    worldGroup.add(brainGroup);

    // 1. Point Cloud Vỏ Não 2 Bán Cầu (Cerebral Cortex Point Cloud & Sulci/Gyri)
    const brainPointsCount = 1450;
    const brainPositions = [];
    const brainColors = [];
    const colorCyan = new THREE.Color('#38bdf8');
    const colorIndigo = new THREE.Color('#818cf8');
    const colorPurple = new THREE.Color('#c084fc');
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < brainPointsCount; i++) {
      const isLeft = (i % 2 === 0);
      const hemiSign = isLeft ? 1 : -1;

      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 0.94 + 0.06;
      const phi = (v * 0.88 + 0.06) * Math.PI;

      let rx = 0.85 * Math.sin(phi) * Math.sin(theta);
      let ry = 0.95 * Math.cos(phi);
      let rz = 1.28 * Math.sin(phi) * Math.cos(theta);

      const bump = 0.09 * Math.sin(7 * theta) * Math.cos(6 * phi)
                 + 0.05 * Math.cos(11 * theta + 2 * phi)
                 + 0.035 * Math.sin(14 * phi);

      if (ry < -0.25) ry *= 0.82;
      if (rz > 0.35) rx *= 0.92;

      const factor = 1 + bump;
      const x = (rx * factor + 0.12) * hemiSign;
      const y = ry * factor + 0.08;
      const z = rz * factor;

      brainPositions.push(x, y, z);

      let c;
      if (Math.random() < 0.08) {
        c = colorWhite;
      } else if (isLeft) {
        c = colorCyan.clone().lerp(colorIndigo, Math.abs(y));
      } else {
        c = colorPurple.clone().lerp(colorCyan, Math.abs(z / 1.5));
      }
      brainColors.push(c.r, c.g, c.b);
    }

    const brainGeometry = new THREE.BufferGeometry();
    brainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(brainPositions, 3));
    brainGeometry.setAttribute('color', new THREE.Float32BufferAttribute(brainColors, 3));

    const brainMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending
    });

    const brainPointsMesh = new THREE.Points(brainGeometry, brainMaterial);
    brainGroup.add(brainPointsMesh);

    // 2. Mạng Lưới Sợi Synapse Kết Nối Nơ-ron
    const synapseLinePositions = [];
    const maxSynapseDistance = 0.24;
    const posArr = brainPositions;
    const ptCount = posArr.length / 3;

    for (let i = 0; i < ptCount; i += 3) {
      const x1 = posArr[i * 3];
      const y1 = posArr[i * 3 + 1];
      const z1 = posArr[i * 3 + 2];
      let connCount = 0;

      for (let j = i + 1; j < ptCount && connCount < 2; j += 2) {
        const x2 = posArr[j * 3];
        const y2 = posArr[j * 3 + 1];
        const z2 = posArr[j * 3 + 2];
        const distSq = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;

        if (distSq < maxSynapseDistance ** 2) {
          synapseLinePositions.push(x1, y1, z1, x2, y2, z2);
          connCount++;
        }
      }
    }

    const synapseGeometry = new THREE.BufferGeometry();
    synapseGeometry.setAttribute('position', new THREE.Float32BufferAttribute(synapseLinePositions, 3));
    const synapseMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending
    });
    const synapseLines = new THREE.LineSegments(synapseGeometry, synapseMaterial);
    brainGroup.add(synapseLines);

    // 3. Nhân Tri Thức Crystalline Phản Quang (Second Brain Physical Core)
    const coreShellGeo = new THREE.IcosahedronGeometry(0.72, 3);
    const coreShellMat = new THREE.MeshPhysicalMaterial({
      color: 0x78d9ed,
      metalness: 0.25,
      roughness: 0.15,
      transmission: 0.52,
      thickness: 1.1,
      clearcoat: 1,
      emissive: 0x087ba7,
      emissiveIntensity: 0.65,
      transparent: true,
      opacity: 0.88
    });
    const coreShellMesh = new THREE.Mesh(coreShellGeo, coreShellMat);
    brainGroup.add(coreShellMesh);

    // Inner Glowing Wireframe Nucleus
    const innerWireGeo = new THREE.IcosahedronGeometry(0.48, 2);
    const innerWireMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.4,
      roughness: 0.2,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.9,
      wireframe: true
    });
    const innerWireMesh = new THREE.Mesh(innerWireGeo, innerWireMat);
    brainGroup.add(innerWireMesh);

    // Core Backside Halo Glow
    const coreGlowGeo = new THREE.SphereGeometry(1.05, 32, 32);
    const coreGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const coreGlowMesh = new THREE.Mesh(coreGlowGeo, coreGlowMat);
    brainGroup.add(coreGlowMesh);

    // 3D Core Holographic Sprite Label
    const coreLabel = makeTextSprite('SECOND BRAIN CORE', '#38bdf8', 36);
    coreLabel.position.set(0, -1.35, 0);
    coreLabel.scale.set(2.4, 0.6, 1);
    brainGroup.add(coreLabel);

    // 4. Các Vòng Quỹ Đạo Tri Thức Vector (Holographic Orbital Memory Rings)
    const ringGroup = new THREE.Group();
    brainGroup.add(ringGroup);

    function createOrbitalRing(radius, tiltX, tiltY, colorHex, opacity) {
      const ringGeo = new THREE.TorusGeometry(radius, 0.012, 8, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: opacity
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = tiltX;
      ring.rotation.y = tiltY;
      ringGroup.add(ring);
      return ring;
    }

    const memoryRing1 = createOrbitalRing(1.65, Math.PI / 3, 0.25, 0x38bdf8, 0.45);
    const memoryRing2 = createOrbitalRing(2.05, -Math.PI / 4, 0.5, 0x818cf8, 0.38);
    const memoryRing3 = createOrbitalRing(2.45, Math.PI / 6, -0.4, 0x06b6d4, 0.32);

    // Ambient floating data dust particles (500 particles)
    const dustCount = 450;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const r = 2.0 + Math.random() * 4.2;
      const a = Math.random() * Math.PI * 2;
      dustPositions[i * 3] = Math.cos(a) * r;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
      dustPositions[i * 3 + 2] = Math.sin(a) * r;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.038,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const dustMesh = new THREE.Points(dustGeo, dustMat);
    worldGroup.add(dustMesh);

    // ==========================================
    // D. 10 AI AGENTS XUNG QUANH ĐANG HOẠT ĐỘNG
    // ==========================================
    const agentNodes = [];
    const agentMeshesForRaycast = [];
    const connectionCurves = [];
    const dataPackets = [];

    const agentCount = AI_AGENTS_DATA.length; // 10 agents
    const orbitRadius = 3.35;

    AI_AGENTS_DATA.forEach((data, idx) => {
      const angle = (idx / agentCount) * Math.PI * 2 - Math.PI / 2;
      const elevation = Math.sin(idx * 1.35) * 0.85;
      const radiusOffset = 0.25 * Math.cos(idx * 2);

      const ax = Math.cos(angle) * (orbitRadius + radiusOffset);
      const ay = elevation;
      const az = Math.sin(angle) * (orbitRadius + radiusOffset);

      const agentGroup = new THREE.Group();
      agentGroup.position.set(ax, ay, az);
      worldGroup.add(agentGroup);

      const agentColor = new THREE.Color(data.color);

      // 1. Vỏ ngoài Icosahedron Crystalline (Faceted Glass Shell)
      const shellGeo = new THREE.IcosahedronGeometry(0.32, 2);
      const shellMat = new THREE.MeshPhysicalMaterial({
        color: agentColor,
        metalness: 0.2,
        roughness: 0.16,
        transmission: 0.45,
        thickness: 0.8,
        clearcoat: 1,
        emissive: agentColor,
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.92
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      agentGroup.add(shellMesh);

      // 2. Nhân năng lượng bên trong (Inner Glowing Nucleus)
      const innerNucleusGeo = new THREE.IcosahedronGeometry(0.18, 1);
      const innerNucleusMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: agentColor,
        emissiveIntensity: 0.95,
        roughness: 0.2
      });
      const innerNucleusMesh = new THREE.Mesh(innerNucleusGeo, innerNucleusMat);
      innerNucleusMesh.userData = { agentIndex: idx, agentData: data };
      agentGroup.add(innerNucleusMesh);
      agentMeshesForRaycast.push(innerNucleusMesh);
      agentMeshesForRaycast.push(shellMesh);
      shellMesh.userData = { agentIndex: idx, agentData: data };

      // 3. Vành đai Hologram Gimbal
      const haloGeo = new THREE.TorusGeometry(0.44, 0.012, 8, 48);
      const haloMat = new THREE.MeshBasicMaterial({
        color: agentColor,
        transparent: true,
        opacity: 0.65
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = 0.65;
      agentGroup.add(haloMesh);

      // 4. Vòng xung nhịp Beacon Pulse
      const pulseGeo = new THREE.RingGeometry(0.28, 0.42, 24);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: agentColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      agentGroup.add(pulseMesh);

      // 5. 3D Text Billboard Label dưới Agent Node
      const labelSprite = makeTextSprite(`${data.id} · ${data.name.split(' ')[0]}`, data.color, 28);
      labelSprite.position.set(0, -0.62, 0);
      labelSprite.scale.set(1.6, 0.4, 1);
      agentGroup.add(labelSprite);

      agentNodes.push({
        group: agentGroup,
        shellMesh: shellMesh,
        innerMesh: innerNucleusMesh,
        haloMesh: haloMesh,
        pulseMesh: pulseMesh,
        data: data,
        index: idx,
        basePos: new THREE.Vector3(ax, ay, az),
        pulseTimer: idx * 0.25
      });

      // ==========================================
      // E. LUỒNG KẾT NỐI DỮ LIỆU (DATA STREAMS)
      // ==========================================
      const pStart = new THREE.Vector3(0, 0, 0);
      const pEnd = new THREE.Vector3(ax, ay, az);
      const pControl = new THREE.Vector3(
        ax * 0.48,
        ay * 0.5 + (ay >= 0 ? 0.35 : -0.35),
        az * 0.48
      );

      const curve = new THREE.QuadraticBezierCurve3(pStart, pControl, pEnd);
      connectionCurves.push(curve);

      const curvePoints = curve.getPoints(36);
      const streamGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const streamMat = new THREE.LineBasicMaterial({
        color: agentColor,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const streamLine = new THREE.Line(streamGeo, streamMat);
      worldGroup.add(streamLine);

      // Mạng liên kết chéo giữa các Agent lân cận
      if (idx % 2 === 0) {
        const nextIdx = (idx + 1) % agentCount;
        const nextAngle = (nextIdx / agentCount) * Math.PI * 2 - Math.PI / 2;
        const nextElevation = Math.sin(nextIdx * 1.35) * 0.85;
        const nextPos = new THREE.Vector3(
          Math.cos(nextAngle) * orbitRadius,
          nextElevation,
          Math.sin(nextAngle) * orbitRadius
        );
        const crossGeo = new THREE.BufferGeometry().setFromPoints([pEnd, nextPos]);
        const crossMat = new THREE.LineBasicMaterial({
          color: 0x818cf8,
          transparent: true,
          opacity: 0.22,
          blending: THREE.AdditiveBlending
        });
        worldGroup.add(new THREE.Line(crossGeo, crossMat));
      }

      // Gói tin dữ liệu chuyển động (Data Packets)
      const packetsPerCurve = 6;
      for (let p = 0; p < packetsPerCurve; p++) {
        const isOutbound = (p % 2 === 0);
        dataPackets.push({
          curveIndex: idx,
          t: p / packetsPerCurve,
          speed: 0.0035 + (idx % 3) * 0.0008,
          isOutbound: isOutbound,
          color: isOutbound ? '#38bdf8' : data.color
        });
      }
    });

    // Master Buffer Geometry cho Data Packets
    const totalPackets = dataPackets.length;
    const packetPositions = new Float32Array(totalPackets * 3);
    const packetColors = new Float32Array(totalPackets * 3);

    dataPackets.forEach((pkt, i) => {
      const c = new THREE.Color(pkt.color);
      packetColors[i * 3] = c.r;
      packetColors[i * 3 + 1] = c.g;
      packetColors[i * 3 + 2] = c.b;
    });

    const packetGeometry = new THREE.BufferGeometry();
    packetGeometry.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
    packetGeometry.setAttribute('color', new THREE.BufferAttribute(packetColors, 3));

    const packetMaterial = new THREE.PointsMaterial({
      size: 0.095,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });

    const packetPointsMesh = new THREE.Points(packetGeometry, packetMaterial);
    worldGroup.add(packetPointsMesh);

    // ==========================================
    // F. DOM OVERLAYS & AGENT PIN LABELS
    // ==========================================
    const pinsContainer = document.getElementById('brain-agent-pins');
    const quickSelector = document.getElementById('agent-quick-selector');
    const inspector = document.getElementById('brain-inspector-hud');
    const inspectorClose = document.getElementById('inspector-close');

    const pinElements = [];
    if (pinsContainer) {
      pinsContainer.innerHTML = '';
      AI_AGENTS_DATA.forEach((agent, i) => {
        const pin = document.createElement('div');
        pin.className = 'agent-3d-pin';
        pin.setAttribute('data-index', i);
        pin.innerHTML = `
          <span class="pin-icon">${agent.icon}</span>
          <span class="pin-id">${agent.id}</span>
          <span class="pin-pulse"></span>
        `;
        pin.addEventListener('click', () => selectAgent(i));
        pinsContainer.appendChild(pin);
        pinElements.push(pin);
      });
    }

    if (quickSelector) {
      quickSelector.innerHTML = '';
      AI_AGENTS_DATA.forEach((agent, i) => {
        const pill = document.createElement('button');
        pill.className = `agent-quick-pill ${i === 0 ? 'active' : ''}`;
        pill.setAttribute('data-index', i);
        pill.innerHTML = `<span>${agent.icon}</span> <strong>${agent.id}</strong>`;
        pill.title = `${agent.id}: ${agent.name}`;
        pill.addEventListener('click', () => selectAgent(i));
        quickSelector.appendChild(pill);
      });
    }

    // Bảng chi tiết Inspector HUD (Nằm gọn 1 bên, trong suốt, không che thông tin)
    function showInspector(agent) {
      if (!inspector) return;
      document.getElementById('inspector-icon').textContent = agent.icon;
      document.getElementById('inspector-code').textContent = `AGENT ${agent.id} • ONLINE`;
      document.getElementById('inspector-title').textContent = agent.title;
      document.getElementById('inspector-desc').textContent = agent.desc;
      document.getElementById('inspector-stream').textContent = agent.stream;
      document.getElementById('inspector-latency').textContent = agent.latency;
      document.getElementById('inspector-protocol').textContent = agent.protocol;

      const linkBtn = document.getElementById('inspector-link');
      if (linkBtn) {
        linkBtn.href = agent.link;
        linkBtn.textContent = agent.linkText;
      }

      inspector.classList.add('visible');

      if (quickSelector) {
        const pills = quickSelector.querySelectorAll('.agent-quick-pill');
        pills.forEach((p, idx) => {
          if (idx === parseInt(agent.id.replace('A', ''), 10) - 1) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      }
    }

    if (inspectorClose) {
      inspectorClose.addEventListener('click', () => {
        if (inspector) inspector.classList.remove('visible');
      });
    }

    // ==========================================
    // G. TƯƠNG TÁC CHUỘT / CẢM ỨNG & CONTROLS
    // ==========================================
    let isAutoSpin = true;
    let dataSpeedMultiplier = 1.0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0.12;
    let targetRotationY = 0.45;
    let currentRotationX = 0.12;
    let currentRotationY = 0.45;
    let targetZoom = 8.6;
    let currentZoom = 8.6;

    // Responsive layout tuning cho máy tính vs điện thoại
    function updateResponsiveLayout() {
      const isSmallMobile = window.innerWidth < 600;
      const isMobile = window.innerWidth < 992;

      // Căn giữa hoàn toàn Second Brain trong không gian toàn màn hình
      worldGroup.position.set(0, 0, 0);
      targetZoom = isSmallMobile ? 11.2 : (isMobile ? 9.8 : 8.4);
    }
    updateResponsiveLayout();

    const btnToggleSpin = document.getElementById('btn-toggle-spin');
    const btnToggleSpeed = document.getElementById('btn-toggle-speed');
    const btnResetView = document.getElementById('btn-reset-view');
    const btnToggleFullscreen = document.getElementById('btn-toggle-fullscreen');

    if (btnToggleSpin) {
      btnToggleSpin.addEventListener('click', () => {
        isAutoSpin = !isAutoSpin;
        btnToggleSpin.classList.toggle('active', isAutoSpin);
      });
    }

    if (btnToggleSpeed) {
      btnToggleSpeed.addEventListener('click', () => {
        dataSpeedMultiplier = (dataSpeedMultiplier === 1.0) ? 2.5 : 1.0;
        btnToggleSpeed.classList.toggle('active', dataSpeedMultiplier > 1.0);
      });
    }

    if (btnResetView) {
      btnResetView.addEventListener('click', () => {
        targetRotationX = 0.12;
        targetRotationY = 0.45;
        updateResponsiveLayout();
        isAutoSpin = true;
        if (btnToggleSpin) btnToggleSpin.classList.add('active');
        if (inspector) inspector.classList.remove('visible');
      });
    }

    // Toggle Toàn Màn Hình (Fullscreen Mode)
    if (btnToggleFullscreen) {
      btnToggleFullscreen.addEventListener('click', () => {
        const heroSec = document.getElementById('hero-section');
        if (!document.fullscreenElement) {
          if (heroSec.requestFullscreen) {
            heroSec.requestFullscreen();
          } else if (heroSec.webkitRequestFullscreen) {
            heroSec.webkitRequestFullscreen();
          }
          btnToggleFullscreen.classList.add('active');
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
          btnToggleFullscreen.classList.remove('active');
        }
      });
    }

    // Mouse drag for 3D Orbiting (trên toàn bộ stage)
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.006;
      targetRotationX += deltaY * 0.006;
      targetRotationX = Math.max(-1.1, Math.min(1.1, targetRotationX));
    });

    // Touch events for mobile
    let touchStartDist = 0;
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        targetRotationX = Math.max(-1.1, Math.min(1.1, targetRotationX));
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = (dist - touchStartDist) * 0.01;
        targetZoom = Math.max(5.5, Math.min(14.0, targetZoom - delta));
        touchStartDist = dist;
      }
    }, { passive: true });

    container.addEventListener('touchend', () => {
      isDragging = false;
    });

    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      targetZoom += e.deltaY * 0.004;
      targetZoom = Math.max(5.5, Math.min(14.0, targetZoom));
    }, { passive: false });

    // Raycaster detection
    const raycaster = new THREE.Raycaster();
    const mouse2D = new THREE.Vector2();

    function onPointerDownRaycast(event) {
      const rect = canvas.getBoundingClientRect();
      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const clientY = event.clientY || (event.touches && event.touches[0].clientY);
      if (!clientX || !clientY) return;

      mouse2D.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse2D.y = -(((clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse2D, camera);
      const intersects = raycaster.intersectObjects(agentMeshesForRaycast, true);

      if (intersects.length > 0) {
        let hitObj = intersects[0].object;
        while (hitObj && !hitObj.userData.agentData && hitObj.parent) {
          hitObj = hitObj.parent;
        }
        if (hitObj && hitObj.userData && typeof hitObj.userData.agentIndex === 'number') {
          selectAgent(hitObj.userData.agentIndex);
        }
      }
    }

    container.addEventListener('click', onPointerDownRaycast);

    function selectAgent(index) {
      const node = agentNodes[index];
      if (!node) return;

      const angle = (index / agentCount) * Math.PI * 2 - Math.PI / 2;
      targetRotationY = -angle;
      targetRotationX = -node.basePos.y * 0.22;

      showInspector(node.data);

      node.group.scale.set(1.3, 1.3, 1.3);
      setTimeout(() => {
        node.group.scale.set(1.0, 1.0, 1.0);
      }, 400);
    }

    window.select3DAgent = selectAgent;
    // showInspector(AI_AGENTS_DATA[0]); - Clean full-screen on load

    // ==========================================
    // H. RESIZE & INTERSECTION OBSERVER
    // ==========================================
    function onResize() {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateResponsiveLayout();
    }

    window.addEventListener('resize', onResize);

    let isVisible = true;
    const heroObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible) {
        requestAnimationFrame(renderLoop);
      }
    }, { threshold: 0.05 });

    const heroSection = document.getElementById('hero-section');
    if (heroSection) heroObserver.observe(heroSection);

    // ==========================================
    // I. ANIMATION RENDER LOOP (60 FPS)
    // ==========================================
    let clock = new THREE.Clock();

    function renderLoop() {
      if (!isVisible) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (isAutoSpin && !isDragging) {
        targetRotationY += 0.0028;
      }

      currentRotationX += (targetRotationX - currentRotationX) * 0.07;
      currentRotationY += (targetRotationY - currentRotationY) * 0.07;
      currentZoom += (targetZoom - currentZoom) * 0.07;

      worldGroup.rotation.x = currentRotationX;
      worldGroup.rotation.y = currentRotationY;
      camera.position.z = currentZoom;

      // 2. Chuyển động Second Brain Core
      const corePulse = 1.0 + Math.sin(time * 2.5) * 0.06;
      coreShellMesh.scale.set(corePulse, corePulse, corePulse);
      coreShellMesh.rotation.y += 0.005;
      coreShellMesh.rotation.x = Math.sin(time * 0.5) * 0.08;

      innerWireMesh.rotation.y -= 0.008;
      innerWireMesh.rotation.z += 0.005;

      brainCoreLight.intensity = 2.4 + Math.sin(time * 3.8) * 0.8;

      memoryRing1.rotation.z += 0.006;
      memoryRing2.rotation.z -= 0.005;
      memoryRing3.rotation.x += 0.005;
      dustMesh.rotation.y = time * 0.02;

      synapseMaterial.opacity = 0.25 + Math.sin(time * 2.8) * 0.12;

      // 3. Chuyển động 10 AI Agents
      agentNodes.forEach((node, i) => {
        const floatY = Math.sin(time * 1.6 + i) * 0.07;
        node.group.position.y = node.basePos.y + floatY;

        node.shellMesh.rotation.y = time * 0.25 + i * 0.4;
        node.haloMesh.rotation.z = time * 0.35 + i;

        node.pulseTimer += delta;
        if (node.pulseTimer > 1.8) node.pulseTimer = 0;
        const pulseProgress = node.pulseTimer / 1.8;
        const pulseScale = 1.0 + pulseProgress * 1.6;
        node.pulseMesh.scale.set(pulseScale, pulseScale, 1);
        node.pulseMesh.material.opacity = Math.max(0, 0.45 * (1 - pulseProgress));
        node.pulseMesh.lookAt(camera.position);

        const pinEl = pinElements[i];
        if (pinEl) {
          const worldPos = new THREE.Vector3();
          node.group.getWorldPosition(worldPos);
          worldPos.project(camera);

          if (worldPos.z < 1.0) {
            const screenX = (worldPos.x * 0.5 + 0.5) * width;
            const screenY = (-(worldPos.y * 0.5) + 0.5) * height;
            pinEl.style.transform = `translate3d(${screenX}px, ${screenY}px, 0)`;
            pinEl.style.display = 'flex';
          } else {
            pinEl.style.display = 'none';
          }
        }
      });

      // 4. Luồng photon dữ liệu (Data Streams)
      const positions = packetGeometry.attributes.position.array;
      dataPackets.forEach((pkt, i) => {
        const curve = connectionCurves[pkt.curveIndex];
        if (!curve) return;

        pkt.t += pkt.speed * dataSpeedMultiplier;
        if (pkt.t > 1.0) pkt.t -= 1.0;

        const travelT = pkt.isOutbound ? pkt.t : (1.0 - pkt.t);
        const point = curve.getPoint(travelT);

        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
      });
      packetGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(renderLoop);
    }

    requestAnimationFrame(renderLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSecondBrain3D);
  } else {
    initSecondBrain3D();
  }
})();
