import http from 'k6/http';
import { check, group } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:7142';
const TEST_USERNAME = __ENV.TEST_USERNAME || 'testuser';
const TEST_PASSWORD = __ENV.TEST_PASSWORD || 'TestPassword123!';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m', target: 100 },
    { duration: '2m', target: 100 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 200 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500', 'p(99)<3000'],
    http_req_failed: ['rate<0.10'],
  },
};

export default function () {
  group('Stress Test - Login', () => {
    const loginPayload = JSON.stringify({
      username: TEST_USERNAME,
      password: TEST_PASSWORD,
    });

    const res = http.post(`${BASE_URL}/api/usuarios/login`, loginPayload, {
      headers: { 'Content-Type': 'application/json' },
      tags: { name: 'LoginStressTest' },
    });

    check(res, {
      'Status 200/401 (aceptable en estrés)': (r) => r.status === 200 || r.status === 401,
      'Tiempo respuesta < 2s': (r) => r.timings.duration < 2000,
      'Respuesta es JSON': (r) => r.headers['Content-Type'].includes('application/json'),
    });
  });
}
