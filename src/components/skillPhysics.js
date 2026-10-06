export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function createCategoryCenters(groups, bounds) {
  const rows = Math.ceil(groups.length / 3);
  return groups.map((group, index) => {
    const row = Math.floor(index / 3);
    const columns = Math.min(3, groups.length - row * 3);
    return {
      title: group.genre, color: group.themeColor, radius: .86,
      x: (index % 3 - (columns - 1) / 2) * bounds.width / 3.1,
      y: (rows === 1 ? 0 : .5 - row / (rows - 1)) * bounds.height * .5,
    };
  });
}

export function createSkillBodies(groups, bounds) {
  const centers = createCategoryCenters(groups, bounds);
  return groups.flatMap((group, categoryIndex) => group.items.map((item, index) => {
    const angle = index / group.items.length * Math.PI * 2 + categoryIndex * .4;
    const orbit = 1.85 + index % 2 * .25;
    return {
      title: item.title, color: group.themeColor, category: group.genre, categoryIndex,
      radius: item.title.length > 13 ? .58 : .49,
      x: centers[categoryIndex].x + Math.cos(angle) * orbit,
      y: centers[categoryIndex].y + Math.sin(angle) * orbit,
      vx: -Math.sin(angle) * .7, vy: Math.cos(angle) * .7, z: 0,
    };
  }));
}

// Fixed simulation steps keep throws and contacts stable across frame rates.
export function stepSkillBodies(bodies, bounds, dt, { dragged = -1, mouse = null, centers = [] } = {}) {
  const halfWidth = bounds.width / 2;
  const halfHeight = bounds.height / 2;
  bodies.forEach((body, index) => {
    if (index === dragged) return;
    const center = centers[body.categoryIndex];
    if (center) {
      const dx = center.x - body.x;
      const dy = center.y - body.y;
      const distance = Math.max(Math.hypot(dx, dy), .01);
      // Every category has its own gravity well and a gentle orbital current.
      const force = (distance - 1.85) * 2.3;
      body.vx += (dx / distance * force + dy / distance * .22) * dt;
      body.vy += (dy / distance * force - dx / distance * .22) * dt;
    } else body.vy -= .8 * dt;
    if (mouse && dragged < 0) {
      const dx = body.x - mouse.x;
      const dy = body.y - mouse.y;
      const distance = Math.hypot(dx, dy);
      if (distance > .05 && distance < 1.8) {
        const force = (1.8 - distance) * 3;
        body.vx += dx / distance * force * dt;
        body.vy += dy / distance * force * dt;
      }
    }
    body.vx *= Math.exp(-(center ? .45 : .075) * dt);
    body.vy *= Math.exp(-(center ? .45 : .025) * dt);
    body.x += body.vx * dt;
    body.y += body.vy * dt;
    if (body.x < -halfWidth + body.radius || body.x > halfWidth - body.radius) {
      body.x = clamp(body.x, -halfWidth + body.radius, halfWidth - body.radius);
      body.vx *= -.86;
    }
    if (body.y < -halfHeight + body.radius) {
      body.y = -halfHeight + body.radius;
      // A soft upward pulse keeps the low-gravity field floating.
      body.vy = Math.max(Math.abs(body.vy) * .86, 2.5 + index % 5 * .18);
    } else if (body.y > halfHeight - body.radius) {
      body.y = halfHeight - body.radius;
      body.vy = -Math.abs(body.vy) * .86;
    }
  });
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i];
      const b = bodies[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distance = Math.hypot(dx, dy);
      const separation = a.radius + b.radius;
      if (distance >= separation) continue;
      const nx = distance > .00001 ? dx / distance : 1;
      const ny = distance > .00001 ? dy / distance : 0;
      const overlap = separation - distance;
      const aWeight = i === dragged ? 0 : j === dragged ? 1 : .5;
      const bWeight = j === dragged ? 0 : i === dragged ? 1 : .5;
      a.x -= nx * overlap * aWeight;
      a.y -= ny * overlap * aWeight;
      b.x += nx * overlap * bWeight;
      b.y += ny * overlap * bWeight;
      const relativeVelocity = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (relativeVelocity < 0) {
        const impulse = -relativeVelocity * 1.82;
        a.vx -= impulse * nx * aWeight;
        a.vy -= impulse * ny * aWeight;
        b.vx += impulse * nx * bWeight;
        b.vy += impulse * ny * bWeight;
      }
    }
  }
  // Category cores are solid; skills orbit rather than falling through them.
  bodies.forEach((body, index) => {
    if (index === dragged) return;
    centers.forEach(center => {
      const dx = body.x - center.x;
      const dy = body.y - center.y;
      const distance = Math.hypot(dx, dy);
      const minimum = center.radius + body.radius;
      if (distance >= minimum) return;
      const nx = distance > .00001 ? dx / distance : 1;
      const ny = distance > .00001 ? dy / distance : 0;
      body.x = center.x + nx * minimum;
      body.y = center.y + ny * minimum;
      const inward = body.vx * nx + body.vy * ny;
      if (inward < 0) { body.vx -= inward * nx * 1.6; body.vy -= inward * ny * 1.6; }
    });
  });
  bodies.forEach(body => {
    body.x = clamp(body.x, -halfWidth + body.radius, halfWidth - body.radius);
    body.y = clamp(body.y, -halfHeight + body.radius, halfHeight - body.radius);
    body.vx = clamp(body.vx, -12, 12);
    body.vy = clamp(body.vy, -12, 12);
  });
}

export function slingshotVelocity(body, origin) {
  return { x: clamp((origin.x - body.x) * 4.2, -14, 14), y: clamp((origin.y - body.y) * 4.2, -14, 14) };
}
