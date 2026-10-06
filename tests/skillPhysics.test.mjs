import test from 'node:test';
import assert from 'node:assert/strict';
import { createCategoryCenters, createSkillBodies, slingshotVelocity, stepSkillBodies } from '../src/components/skillPhysics.js';

const bounds = { width: 22, height: 10 };
const ball = (props = {}) => ({ radius: .6, x: 0, y: 0, vx: 0, vy: 0, ...props });

test('gravity accelerates a released skill downward', () => {
  const bodies = [ball()];
  stepSkillBodies(bodies, bounds, 1 / 120);
  assert.ok(bodies[0].vy < 0);
  assert.ok(bodies[0].y < 0);
});
test('approaching balls separate and exchange momentum', () => {
  const bodies = [ball({ x: -.5, vx: 2 }), ball({ x: .5, vx: -2 })];
  stepSkillBodies(bodies, bounds, 0);
  assert.ok(bodies[0].vx < 0 && bodies[1].vx > 0);
  assert.ok(bodies[1].x - bodies[0].x >= 1.2 - 1e-9);
});
test('dragged balls stay under the cursor when other balls collide', () => {
  const bodies = [ball(), ball({ x: .5, vx: -2 })];
  stepSkillBodies(bodies, bounds, 1 / 120, { dragged: 0 });
  assert.equal(bodies[0].x, 0);
  assert.equal(bodies[0].y, 0);
  assert.ok(Math.hypot(bodies[1].x, bodies[1].y) >= 1.2 - 1e-9);
});
test('fast throws remain inside the field and rebound from its walls', () => {
  const bodies = [ball({ x: 10.3, vx: 12 }), ball({ x: -5, y: -4.4, vy: -5 })];
  stepSkillBodies(bodies, bounds, .05);
  assert.ok(bodies[0].x <= 10.4 && bodies[0].vx < 0);
  assert.ok(bodies[1].y >= -4.4 && bodies[1].vy > 0);
});
test('a full skill field stays finite and bounded through prolonged collisions', () => {
  const groups = [{ genre: 'Skills', themeColor: '#ef3946', items: Array.from({ length: 40 }, (_, i) => ({ title: `Skill ${i}` })) }];
  const bodies = createSkillBodies(groups, bounds);
  for (let step = 0; step < 3600; step++) stepSkillBodies(bodies, bounds, 1 / 120);
  bodies.forEach(body => {
    assert.ok([body.x, body.y, body.vx, body.vy].every(Number.isFinite));
    assert.ok(Math.abs(body.x) <= bounds.width / 2 - body.radius + 1e-9);
    assert.ok(Math.abs(body.y) <= bounds.height / 2 - body.radius + 1e-9);
  });
});

test('each category attracts its own skills toward its own center', () => {
  const centers = [{ x: -5, y: 0, radius: .8 }, { x: 5, y: 0, radius: .8 }];
  const bodies = [ball({ categoryIndex: 0, x: -1 }), ball({ categoryIndex: 1, x: 1 })];
  stepSkillBodies(bodies, bounds, 1 / 120, { centers });
  assert.ok(bodies[0].vx < 0);
  assert.ok(bodies[1].vx > 0);
});
test('slingshots launch opposite the pull, with a bounded launch speed', () => {
  const launch = slingshotVelocity({ x: 4, y: -3 }, { x: 0, y: 0 });
  assert.equal(launch.x, -14);
  assert.ok(launch.y > 0 && launch.y <= 14);
});
test('category gravity keeps a released skill attached to its cluster', () => {
  const groups = [{ genre: 'Languages', themeColor: '#3b82f6', items: [{ title: 'Java' }] }, { genre: 'AI', themeColor: '#10b981', items: [{ title: 'GPT' }] }];
  const centers = createCategoryCenters(groups, bounds);
  const bodies = createSkillBodies(groups, bounds);
  bodies[0].x = 0;
  bodies[0].vx = 10;
  for (let step = 0; step < 3600; step++) stepSkillBodies(bodies, bounds, 1 / 120, { centers });
  const distance = Math.hypot(bodies[0].x - centers[0].x, bodies[0].y - centers[0].y);
  assert.ok(distance < 2.8);
});
